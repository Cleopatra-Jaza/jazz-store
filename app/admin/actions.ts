"use server";

import { redirect } from "next/navigation";
import {
  passwordMatches,
  setAdminCookie,
  clearAdminCookie,
} from "@/lib/admin-auth";

export async function login(
  _prev: string | null,
  formData: FormData
): Promise<string | null> {
  const password = String(formData.get("password") ?? "");
  if (!passwordMatches(password)) {
    await new Promise((r) => setTimeout(r, 800));
    return "Wrong password.";
  }
  await setAdminCookie();
  redirect("/admin");
}

export async function logout(): Promise<void> {
  await clearAdminCookie();
  redirect("/admin/login");
}