import { NextResponse, type NextRequest } from "next/server";
import { cookies } from "next/headers";
import {
  encodeTokens,
  exchangeCode,
  GOOGLE_COOKIE,
  readGoogleState,
} from "@/lib/google";
import { getSession } from "@/lib/auth";

export const runtime = "nodejs";

export async function GET(req: NextRequest) {
  const session = await getSession();
  const origin = req.nextUrl.origin;
  if (!session) return NextResponse.redirect(new URL("/login", origin));

  const err = req.nextUrl.searchParams.get("error");
  const code = req.nextUrl.searchParams.get("code");
  const state = req.nextUrl.searchParams.get("state") || "";
  const parsed = await readGoogleState(state);
  const dest = parsed?.next || "/calendar";

  if (err || !code) {
    const url = new URL(dest, origin);
    url.searchParams.set("google", "denied");
    return NextResponse.redirect(url);
  }

  try {
    const tokens = await exchangeCode(origin, code);
    const jar = await cookies();
    jar.set(GOOGLE_COOKIE, await encodeTokens(tokens), {
      httpOnly: true,
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 24 * 30,
      secure: process.env.NODE_ENV === "production",
    });
    const url = new URL(dest, origin);
    url.searchParams.set("google", "connected");
    return NextResponse.redirect(url);
  } catch {
    const url = new URL(dest, origin);
    url.searchParams.set("google", "error");
    return NextResponse.redirect(url);
  }
}
