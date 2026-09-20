import { cookies } from "next/headers";
import {
  DEMO_USER,
  hashPassword,
  parseSession,
  SESSION_COOKIE,
  signPayload,
  USERS_COOKIE,
  validEmail,
  verifyToken,
  type SessionUser,
  type StoredUser,
} from "./auth-core";

export { DEMO_USER, parseSession, SESSION_COOKIE, type SessionUser };

export async function getSession(): Promise<SessionUser | null> {
  const jar = await cookies();
  return parseSession(jar.get(SESSION_COOKIE)?.value);
}

export async function writeSession(user: SessionUser) {
  const jar = await cookies();
  const token = await signPayload(JSON.stringify(user));
  jar.set(SESSION_COOKIE, token, {
    httpOnly: true,
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 14,
    secure: process.env.NODE_ENV === "production",
  });
}

export async function clearSession() {
  const jar = await cookies();
  jar.delete(SESSION_COOKIE);
}

async function readUsers(): Promise<StoredUser[]> {
  const jar = await cookies();
  const raw = await verifyToken(jar.get(USERS_COOKIE)?.value);
  if (!raw) return [];
  try {
    const parsed = JSON.parse(raw) as StoredUser[];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

async function writeUsers(users: StoredUser[]) {
  const jar = await cookies();
  const token = await signPayload(JSON.stringify(users.slice(0, 8)));
  jar.set(USERS_COOKIE, token, {
    httpOnly: true,
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 30,
    secure: process.env.NODE_ENV === "production",
  });
}

export async function authenticate(email: string, password: string): Promise<SessionUser | { error: string }> {
  const e = email.trim().toLowerCase();
  const p = password.trim();
  if (!validEmail(e) || p.length < 6) return { error: "Check your email and password." };
  if (e === DEMO_USER.email && p === DEMO_USER.password) {
    return { id: DEMO_USER.id, name: DEMO_USER.name, email: DEMO_USER.email, onboarded: true };
  }
  const users = await readUsers();
  const found = users.find((u) => u.email === e);
  if (!found) return { error: "No account for that email." };
  const hash = await hashPassword(p);
  if (hash !== found.hash) return { error: "Check your email and password." };
  return { id: found.id, name: found.name, email: found.email, onboarded: true };
}

export async function register(
  name: string,
  email: string,
  password: string,
): Promise<SessionUser | { error: string }> {
  const n = name.trim();
  const e = email.trim().toLowerCase();
  const p = password.trim();
  if (n.length < 2) return { error: "Name needs at least two characters." };
  if (!validEmail(e)) return { error: "Enter a valid email." };
  if (p.length < 6) return { error: "Password needs at least six characters." };
  if (e === DEMO_USER.email) return { error: "That email is the demo workspace. Sign in instead." };
  const users = await readUsers();
  if (users.some((u) => u.email === e)) return { error: "An account with that email already exists." };
  const user: StoredUser = {
    id: `u-${Date.now()}`,
    name: n,
    email: e,
    hash: await hashPassword(p),
  };
  await writeUsers([...users, user]);
  return { id: user.id, name: user.name, email: user.email, onboarded: false };
}

export async function markOnboarded() {
  const session = await getSession();
  if (!session) return;
  await writeSession({ ...session, onboarded: true });
}
