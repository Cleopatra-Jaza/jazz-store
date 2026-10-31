"use server";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { OrderStatus } from "@prisma/client";
import { prisma } from "@/lib/prisma";
import {
  isAdmin,
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

export async function updateOrderStatus(formData: FormData): Promise<void> {
  if (!(await isAdmin())) redirect("/admin/login");

  const orderId = String(formData.get("orderId") ?? "");
  const status = String(formData.get("status") ?? "");

  if (!orderId || !(status in OrderStatus)) return;

  await prisma.order.update({
    where: { id: orderId },
    data: { status: status as OrderStatus },
  });

  revalidatePath("/admin");
}