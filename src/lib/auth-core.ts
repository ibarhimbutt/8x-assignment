export const SESSION_COOKIE = "quorum_session";
export const USERS_COOKIE = "quorum_users";
const SECRET = process.env.AUTH_SECRET || "quorum-assignment-demo-secret";

export const DEMO_USER = {
  id: "u-maya",
  name: "Maya Chen",
  email: "maya@quorum.demo",
  password: "quorum-demo",
};

export type SessionUser = {
  id: string;
  name: string;
  email: string;
  onboarded: boolean;
};

export type StoredUser = { id: string; name: string; email: string; hash: string };

function bytesToB64url(bytes: Uint8Array): string {
  let bin = "";
  for (const b of bytes) bin += String.fromCharCode(b);
  return btoa(bin).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
}

export function b64urlEncode(s: string): string {
  return bytesToB64url(new TextEncoder().encode(s));
}

export function b64urlDecode(s: string): string {
  const pad = s.replace(/-/g, "+").replace(/_/g, "/");
  const padded = pad + "=".repeat((4 - (pad.length % 4)) % 4);
  const bin = atob(padded);
  const bytes = new Uint8Array(bin.length);
  for (let i = 0; i < bin.length; i++) bytes[i] = bin.charCodeAt(i);
  return new TextDecoder().decode(bytes);
}

async function hmac(message: string): Promise<string> {
  const key = await crypto.subtle.importKey(
    "raw",
    new TextEncoder().encode(SECRET),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"],
  );
  const sig = await crypto.subtle.sign("HMAC", key, new TextEncoder().encode(message));
  return bytesToB64url(new Uint8Array(sig));
}

export async function signPayload(payload: string): Promise<string> {
  const body = b64urlEncode(payload);
  const sig = await hmac(body);
  return `${body}.${sig}`;
}

export async function verifyToken(token: string | undefined | null): Promise<string | null> {
  if (!token || !token.includes(".")) return null;
  const [body, sig] = token.split(".");
  if (!body || !sig) return null;
  const expected = await hmac(body);
  if (expected.length !== sig.length) return null;
  let ok = 0;
  for (let i = 0; i < expected.length; i++) ok |= expected.charCodeAt(i) ^ sig.charCodeAt(i);
  if (ok !== 0) return null;
  try {
    return b64urlDecode(body);
  } catch {
    return null;
  }
}

export async function hashPassword(password: string): Promise<string> {
  const buf = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(`${SECRET}:${password}`));
  return bytesToB64url(new Uint8Array(buf));
}

export async function parseSession(token: string | undefined | null): Promise<SessionUser | null> {
  const raw = await verifyToken(token);
  if (!raw) return null;
  try {
    const data = JSON.parse(raw) as SessionUser;
    if (!data?.id || !data?.email || !data?.name) return null;
    return data;
  } catch {
    return null;
  }
}

export function validEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}
