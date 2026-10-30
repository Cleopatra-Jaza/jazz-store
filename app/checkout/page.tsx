"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useCart } from "@/components/CartProvider";
import { formatPrice } from "@/data/products";
import { placeOrder } from "./actions";

const inputClass =
  "w-full rounded-xl border border-border bg-surface px-4 py-3 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-accent";

export default function CheckoutPage() {
  const { items, subtotal, clearCart } = useCart();
  const [mounted, setMounted] = useState(false);
  const [pending, setPending] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [orderId, setOrderId] = useState<string | null>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (pending) return;
    setError(null);
    setPending(true);

    const form = new FormData(e.currentTarget);
    const result = await placeOrder({
      customerName: String(form.get("customerName") ?? ""),
      phone: String(form.get("phone") ?? ""),
      email: String(form.get("email") ?? ""),
      address: String(form.get("address") ?? ""),
      city: String(form.get("city") ?? ""),
      notes: String(form.get("notes") ?? ""),
      items: items.map((i) => ({
        slug: i.slug,
        color: i.color,
        size: i.size,
        quantity: i.quantity,
      })),
    });

    setPending(false);
    if (result.ok) {
      setOrderId(result.orderId);
      clearCart();
    } else {
      setError(result.error);
    }
  }

  if (!mounted) {
    return <main className="min-h-[85vh] pt-10 pb-20 px-6 lg:px-12" />;
  }

  if (orderId) {
    return (
      <main className="min-h-[85vh] pt-10 pb-20 px-6 lg:px-12">
        <div className="max-w-xl mx-auto text-center">
          <h1 className="text-3xl font-bold text-foreground mb-3 font-display">
            Order placed
          </h1>
          <p className="text-muted-foreground mb-2">
            Thank you! We will contact you shortly to confirm your order.
          </p>
          <p className="text-sm text-muted-foreground mb-8">
            Order reference: {orderId.slice(-8).toUpperCase()}
          </p>
          <Link
            href="/products"
            className="inline-flex items-center justify-center rounded-full bg-accent px-6 py-3 text-lg font-medium text-white hover:bg-accent-hover transition-colors"
          >
            Continue shopping
          </Link>
        </div>
      </main>
    );
  }

  if (items.length === 0) {
    return (
      <main className="min-h-[85vh] pt-10 pb-20 px-6 lg:px-12">
        <div className="max-w-xl mx-auto text-center">
          <h1 className="text-3xl font-bold text-foreground mb-3 font-display">
            Your cart is empty
          </h1>
          <Link
            href="/products"
            className="inline-flex items-center justify-center rounded-full bg-accent px-6 py-3 text-lg font-medium text-white hover:bg-accent-hover transition-colors"
          >
            Browse the shop
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-[85vh] pt-10 pb-20 px-6 lg:px-12">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-3xl font-bold text-foreground mb-8 font-display">
          Checkout
        </h1>
        <div className="grid gap-10 lg:grid-cols-[1fr_380px]">
          <form onSubmit={handleSubmit} className="space-y-4">
            <input name="customerName" required placeholder="Full name" className={inputClass} />
            <input name="phone" type="tel" required placeholder="Phone number" className={inputClass} />
            <input name="email" type="email" placeholder="Email (optional)" className={inputClass} />
            <input name="address" required placeholder="Delivery address" className={inputClass} />
            <input name="city" required placeholder="City" className={inputClass} />
            <textarea name="notes" rows={3} placeholder="Notes (optional)" className={inputClass} />
            {error && (
              <p role="alert" className="text-sm text-red-500">
                {error}
              </p>
            )}
            <button
              type="submit"
              disabled={pending}
              className="w-full rounded-full bg-accent px-6 py-3 text-lg font-medium text-white hover:bg-accent-hover transition-colors disabled:opacity-60"
            >
              {pending ? "Placing order..." : "Place order (Cash on Delivery)"}
            </button>
          </form>

          <aside className="rounded-2xl border border-border bg-surface p-5 h-fit">
            <h2 className="text-lg font-semibold text-foreground mb-4">Order summary</h2>
            <ul className="space-y-3 mb-4">
              {items.map((item) => (
                <li key={item.key} className="flex justify-between gap-3 text-sm">
                  <span className="text-foreground">
                    {item.name}
                    <span className="block text-muted-foreground">
                      {item.color} / {item.size} x {item.quantity}
                    </span>
                  </span>
                  <span className="text-foreground">
                    {formatPrice(item.price * item.quantity)}
                  </span>
                </li>
              ))}
            </ul>
            <div className="flex justify-between border-t border-border pt-4 font-semibold text-foreground">
              <span>Subtotal</span>
              <span>{formatPrice(subtotal)}</span>
            </div>
            <p className="mt-2 text-xs text-muted-foreground">
              Final total is confirmed by our server using current prices.
            </p>
          </aside>
        </div>
      </div>
    </main>
  );
}