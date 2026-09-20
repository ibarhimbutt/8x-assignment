import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { getSession } from "@/lib/auth";
import {
  decodeTokens,
  detectMeet,
  encodeTokens,
  eventDuration,
  GOOGLE_COOKIE,
  googleConfigured,
  listUpcomingEvents,
  refreshTokens,
} from "@/lib/google";
import type { CalendarEvent } from "@/data/types";

export const runtime = "nodejs";

export async function GET() {
  const session = await getSession();
  if (!session) return NextResponse.json({ error: "Sign in first." }, { status: 401 });
  if (!googleConfigured()) {
    return NextResponse.json({ configured: false, events: [] as CalendarEvent[] });
  }
  const jar = await cookies();
  const tokens = await decodeTokens(jar.get(GOOGLE_COOKIE)?.value);
  if (!tokens) return NextResponse.json({ configured: true, connected: false, events: [] as CalendarEvent[] });

  try {
    const fresh = await refreshTokens(tokens);
    if (fresh.access_token !== tokens.access_token) {
      jar.set(GOOGLE_COOKIE, await encodeTokens(fresh), {
        httpOnly: true,
        sameSite: "lax",
        path: "/",
        maxAge: 60 * 60 * 24 * 30,
        secure: process.env.NODE_ENV === "production",
      });
    }
    const items = await listUpcomingEvents(fresh.access_token);
    const events: CalendarEvent[] = items
      .filter((e) => e.start?.dateTime)
      .map((e) => {
        const meet = detectMeet(e);
        const start = e.start?.dateTime || new Date().toISOString();
        return {
          id: e.id,
          title: e.summary || "Untitled event",
          startsAt: start,
          duration: eventDuration(e),
          platform: meet?.platform ?? "none",
          meetingUrl: meet?.url,
          attendees: (e.attendees ?? [])
            .filter((a) => a.email)
            .map((a) => ({ email: a.email as string, name: a.displayName })),
          status: meet ? "ready" : "scheduled",
          source: "google",
        };
      });
    return NextResponse.json({ configured: true, connected: true, events });
  } catch (err) {
    return NextResponse.json({
      configured: true,
      connected: true,
      events: [],
      error: err instanceof Error ? err.message : "Calendar request failed.",
    });
  }
}
