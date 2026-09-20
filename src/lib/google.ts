import { signPayload, verifyToken } from "./auth-core";

const COOKIE = "quorum_google";

export type GoogleTokens = {
  access_token: string;
  refresh_token?: string;
  expiry: number;
  email?: string;
};

export function googleConfigured(): boolean {
  return Boolean(process.env.GOOGLE_CLIENT_ID && process.env.GOOGLE_CLIENT_SECRET);
}

export function googleRedirectUri(origin: string): string {
  return process.env.GOOGLE_REDIRECT_URI || `${origin}/api/google/callback`;
}

export function googleAuthUrl(origin: string, state: string): string {
  const params = new URLSearchParams({
    client_id: process.env.GOOGLE_CLIENT_ID || "",
    redirect_uri: googleRedirectUri(origin),
    response_type: "code",
    access_type: "offline",
    prompt: "consent",
    scope: [
      "https://www.googleapis.com/auth/calendar.readonly",
      "https://www.googleapis.com/auth/userinfo.email",
    ].join(" "),
    state,
  });
  return `https://accounts.google.com/o/oauth2/v2/auth?${params.toString()}`;
}

export async function signGoogleState(next: string): Promise<string> {
  return signPayload(JSON.stringify({ next, t: Date.now() }));
}

export async function readGoogleState(state: string): Promise<{ next: string } | null> {
  const raw = await verifyToken(state);
  if (!raw) return null;
  try {
    const data = JSON.parse(raw) as { next?: string; t?: number };
    if (!data.next || !data.t) return null;
    if (Date.now() - data.t > 15 * 60 * 1000) return null;
    return { next: data.next };
  } catch {
    return null;
  }
}

export async function exchangeCode(origin: string, code: string): Promise<GoogleTokens> {
  const body = new URLSearchParams({
    code,
    client_id: process.env.GOOGLE_CLIENT_ID || "",
    client_secret: process.env.GOOGLE_CLIENT_SECRET || "",
    redirect_uri: googleRedirectUri(origin),
    grant_type: "authorization_code",
  });
  const res = await fetch("https://oauth2.googleapis.com/token", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body,
  });
  if (!res.ok) throw new Error("Google token exchange failed.");
  const json = (await res.json()) as {
    access_token: string;
    refresh_token?: string;
    expires_in: number;
  };
  const email = await fetchEmail(json.access_token);
  return {
    access_token: json.access_token,
    refresh_token: json.refresh_token,
    expiry: Date.now() + json.expires_in * 1000,
    email,
  };
}

async function fetchEmail(access: string): Promise<string | undefined> {
  const res = await fetch("https://www.googleapis.com/oauth2/v2/userinfo", {
    headers: { Authorization: `Bearer ${access}` },
  });
  if (!res.ok) return undefined;
  const json = (await res.json()) as { email?: string };
  return json.email;
}

export async function refreshTokens(tokens: GoogleTokens): Promise<GoogleTokens> {
  if (!tokens.refresh_token) return tokens;
  if (tokens.expiry > Date.now() + 60_000) return tokens;
  const body = new URLSearchParams({
    client_id: process.env.GOOGLE_CLIENT_ID || "",
    client_secret: process.env.GOOGLE_CLIENT_SECRET || "",
    refresh_token: tokens.refresh_token,
    grant_type: "refresh_token",
  });
  const res = await fetch("https://oauth2.googleapis.com/token", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body,
  });
  if (!res.ok) throw new Error("Google token refresh failed.");
  const json = (await res.json()) as { access_token: string; expires_in: number };
  return {
    ...tokens,
    access_token: json.access_token,
    expiry: Date.now() + json.expires_in * 1000,
  };
}

export async function encodeTokens(tokens: GoogleTokens): Promise<string> {
  return signPayload(JSON.stringify(tokens));
}

export async function decodeTokens(cookie: string | undefined): Promise<GoogleTokens | null> {
  const raw = await verifyToken(cookie);
  if (!raw) return null;
  try {
    const data = JSON.parse(raw) as GoogleTokens;
    if (!data.access_token) return null;
    return data;
  } catch {
    return null;
  }
}

export { COOKIE as GOOGLE_COOKIE };

export type GoogleEvent = {
  id: string;
  summary?: string;
  description?: string;
  hangoutLink?: string;
  htmlLink?: string;
  location?: string;
  start?: { dateTime?: string; date?: string };
  end?: { dateTime?: string; date?: string };
  attendees?: { email?: string; displayName?: string }[];
  conferenceData?: { entryPoints?: { entryPointType?: string; uri?: string }[] };
};

export async function listUpcomingEvents(accessToken: string): Promise<GoogleEvent[]> {
  const now = new Date();
  const later = new Date(now.getTime() + 14 * 24 * 60 * 60 * 1000);
  const params = new URLSearchParams({
    timeMin: now.toISOString(),
    timeMax: later.toISOString(),
    singleEvents: "true",
    orderBy: "startTime",
    maxResults: "20",
    conferenceDataVersion: "1",
  });
  const res = await fetch(`https://www.googleapis.com/calendar/v3/calendars/primary/events?${params}`, {
    headers: { Authorization: `Bearer ${accessToken}` },
  });
  if (!res.ok) throw new Error("Could not load Google Calendar events.");
  const json = (await res.json()) as { items?: GoogleEvent[] };
  return json.items ?? [];
}

export function detectMeet(event: GoogleEvent): { platform: "meet" | "zoom" | "teams"; url?: string } | null {
  const hangout = event.hangoutLink;
  const conf = event.conferenceData?.entryPoints?.find((e) => e.uri)?.uri;
  const blob = `${event.location ?? ""} ${event.description ?? ""} ${hangout ?? ""} ${conf ?? ""}`;
  if (hangout || /meet\.google\.com/i.test(blob)) {
    return { platform: "meet", url: hangout || conf || blob.match(/https:\/\/meet\.google\.com\/[^\s]+/)?.[0] };
  }
  if (/zoom\.us/i.test(blob)) {
    return { platform: "zoom", url: blob.match(/https:\/\/[^\s]*zoom\.us\/[^\s]+/)?.[0] };
  }
  if (/teams\.microsoft\.com/i.test(blob)) {
    return { platform: "teams", url: blob.match(/https:\/\/teams\.microsoft\.com\/[^\s]+/)?.[0] };
  }
  return null;
}

export function eventDuration(event: GoogleEvent): number {
  const start = event.start?.dateTime || event.start?.date;
  const end = event.end?.dateTime || event.end?.date;
  if (!start || !end) return 1800;
  return Math.max(300, Math.round((new Date(end).getTime() - new Date(start).getTime()) / 1000));
}
