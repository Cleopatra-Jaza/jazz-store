"use server";

import { prisma } from "@/lib/prisma";

export interface CheckoutItemInput {
  slug: string;
  color: string;
  size: string;
  quantity: number;
}

export interface CheckoutInput {
  customerName: string;
  phone: string;
  email?: string;
  address: string;
  city: string;
  notes?: string;
  items: CheckoutItemInput[];
}

export type CheckoutResult =
  | { ok: true; orderId: string }
  | { ok: false; error: string };

export async function placeOrder(input: CheckoutInput): Promise<CheckoutResult> {
  const customerName = input.customerName?.trim() ?? "";
  const phone = input.phone?.trim() ?? "";
  const email = input.email?.trim() || null;
  const address = input.address?.trim() ?? "";
  const city = input.city?.trim() ?? "";
  const notes = input.notes?.trim() || null;

  if (!customerName || !address || !city) {
    return { ok: false, error: "Please fill in your name, address and city." };
  }
  if (phone.replace(/\D/g, "").length < 9) {
    return { ok: false, error: "Please enter a valid phone number." };
  }
  if (email && !/^\S+@\S+\.\S+$/.test(email)) {
    return { ok: false, error: "Please enter a valid email address." };
  }
  if (
    !Array.isArray(input.items) ||
    input.items.length === 0 ||
    input.items.length > 50
  ) {
    return { ok: false, error: "Your cart is empty." };
  }

  const slugs = [...new Set(input.items.map((i) => i.slug))];
  const products = await prisma.product.findMany({
    where: { slug: { in: slugs } },
    include: { variants: true },
  });
  const bySlug = new Map(products.map((p) => [p.slug, p]));

  const orderItems: {
    productSlug: string;
    name: string;
    color: string;
    size: string;
    unitPrice: number;
    quantity: number;
  }[] = [];
  let subtotal = 0;

  for (const item of input.items) {
    const product = bySlug.get(item.slug);
    if (!product) {
      return { ok: false, error: "An item in your cart is no longer available." };
    }
    if (!product.variants.some((v) => v.color === item.color)) {
      return { ok: false, error: `${product.name}: selected color is unavailable.` };
    }
    if (!product.sizes.includes(item.size)) {
      return { ok: false, error: `${product.name}: selected size is unavailable.` };
    }
    if (
      !Number.isInteger(item.quantity) ||
      item.quantity < 1 ||
      item.quantity > 10
    ) {
      return { ok: false, error: "Invalid quantity in your cart." };
    }

    const unitPrice = Number(product.price);
    subtotal += unitPrice * item.quantity;
    orderItems.push({
      productSlug: product.slug,
      name: product.name,
      color: item.color,
      size: item.size,
      unitPrice,
      quantity: item.quantity,
    });
  }

  try {
    const order = await prisma.order.create({
      data: {
        customerName,
        phone,
        email,
        address,
        city,
        notes,
        subtotal: Math.round(subtotal * 100) / 100,
        items: { create: orderItems },
      },
      select: { id: true },
    });
    return { ok: true, orderId: order.id };
  } catch (e) {
    console.error("placeOrder failed", e);
    return { ok: false, error: "Could not place your order. Please try again." };
  }
}
