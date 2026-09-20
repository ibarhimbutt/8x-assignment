import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { getSession } from "@/lib/auth";
import {
  decodeTokens,
  encodeTokens,
  GOOGLE_COOKIE,
  googleConfigured,
  refreshTokens,
} from "@/lib/google";

export const runtime = "nodejs";

export async function GET() {
  const session = await getSession();
  if (!session) return NextResponse.json({ connected: false }, { status: 401 });
  if (!googleConfigured()) {
    return NextResponse.json({ connected: false, configured: false });
  }
  const jar = await cookies();
  const tokens = await decodeTokens(jar.get(GOOGLE_COOKIE)?.value);
  if (!tokens) return NextResponse.json({ connected: false, configured: true });
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
    return NextResponse.json({ connected: true, configured: true, email: fresh.email });
  } catch {
    jar.delete(GOOGLE_COOKIE);
    return NextResponse.json({ connected: false, configured: true, error: "Google session expired." });
  }
}

export async function DELETE() {
  const jar = await cookies();
  jar.delete(GOOGLE_COOKIE);
  return NextResponse.json({ connected: false, configured: googleConfigured() });
}
