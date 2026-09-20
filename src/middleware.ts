import { NextResponse, type NextRequest } from "next/server";
import { parseSession, SESSION_COOKIE } from "@/lib/auth-core";

const PUBLIC_PREFIXES = ["/", "/login", "/signup", "/share", "/s", "/api"];
const AUTH_PAGES = new Set(["/login", "/signup"]);
const APP_PREFIXES = [
  "/dashboard",
  "/meetings",
  "/action-items",
  "/highlights",
  "/search",
  "/calendar",
  "/settings",
  "/ask",
  "/capture",
  "/onboarding",
  "/shared",
];

function isPublic(path: string): boolean {
  if (path === "/") return true;
  return PUBLIC_PREFIXES.some((p) => p !== "/" && (path === p || path.startsWith(`${p}/`)));
}

function isApp(path: string): boolean {
  return APP_PREFIXES.some((p) => path === p || path.startsWith(`${p}/`));
}

export async function middleware(req: NextRequest) {
  const path = req.nextUrl.pathname;
  const session = await parseSession(req.cookies.get(SESSION_COOKIE)?.value);

  if (session && AUTH_PAGES.has(path)) {
    const dest = session.onboarded ? "/dashboard" : "/onboarding";
    return NextResponse.redirect(new URL(dest, req.url));
  }

  if (session && path === "/") {
    return NextResponse.redirect(new URL(session.onboarded ? "/dashboard" : "/onboarding", req.url));
  }

  if (!session && isApp(path)) {
    const url = new URL("/login", req.url);
    url.searchParams.set("next", path);
    return NextResponse.redirect(url);
  }

  if (session && !session.onboarded && isApp(path) && path !== "/onboarding") {
    return NextResponse.redirect(new URL("/onboarding", req.url));
  }

  if (session?.onboarded && path === "/onboarding") {
    return NextResponse.redirect(new URL("/dashboard", req.url));
  }

  if (!session && !isPublic(path) && !isApp(path) && path !== "/") {
    // static and unknown stay as-is
  }

  return NextResponse.next();
}

export const runtime = "nodejs";

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};
