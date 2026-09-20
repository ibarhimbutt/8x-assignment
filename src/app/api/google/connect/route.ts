import { NextResponse, type NextRequest } from "next/server";
import { googleAuthUrl, googleConfigured, signGoogleState } from "@/lib/google";
import { getSession } from "@/lib/auth";

export const runtime = "nodejs";

export async function GET(req: NextRequest) {
  const session = await getSession();
  if (!session) return NextResponse.redirect(new URL("/login", req.url));
  if (!googleConfigured()) {
    const next = new URL("/calendar", req.url);
    next.searchParams.set("google", "not_configured");
    return NextResponse.redirect(next);
  }
  const dest = req.nextUrl.searchParams.get("next") || "/calendar";
  const safe = dest.startsWith("/") ? dest : "/calendar";
  const origin = req.nextUrl.origin;
  const state = await signGoogleState(safe);
  return NextResponse.redirect(googleAuthUrl(origin, state));
}
