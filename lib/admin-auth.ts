import { createHmac, timingSafeEqual } from "crypto";
import { cookies } from "next/headers";

const COOKIE = "jazz-admin";

function getPassword(): string | null {
  const pw = process.env.ADMIN_PASSWORD;
  return pw && pw.length >= 8 ? pw : null;
}

function sessionToken(pw: string): string {
  return createHmac("sha256", pw).update("jazz-admin-session").digest("hex");
}

export function passwordMatches(input: string): boolean {
  const pw = getPassword();
  if (!pw) return false;
  const a = createHmac("sha256", "cmp").update(input).digest();
  const b = createHmac("sha256", "cmp").update(pw).digest();
  return timingSafeEqual(a, b);
}

export async function setAdminCookie(): Promise<void> {
  const pw = getPassword();
  if (!pw) return;
  const jar = await cookies();
  jar.set(COOKIE, sessionToken(pw), {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 60 * 60 * 8,
  });
}

export async function clearAdminCookie(): Promise<void> {
  const jar = await cookies();
  jar.delete(COOKIE);
}

export async function isAdmin(): Promise<boolean> {
  const pw = getPassword();
  if (!pw) return false;
  const jar = await cookies();
  const value = jar.get(COOKIE)?.value;
  if (!value) return false;
  const a = Buffer.from(value);
  const b = Buffer.from(sessionToken(pw));
  return a.length === b.length && timingSafeEqual(a, b);
}