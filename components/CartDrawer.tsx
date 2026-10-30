"use client";

import { useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { useCart } from "@/components/CartProvider";
import { useToast } from "@/components/ToastProvider";
import Button from "@/components/ui/Button";
import { formatPrice } from "@/data/products";

export default function CartDrawer() {
  const {
    items,
    isOpen,
    totalCount,
    subtotal,
    removeItem,
    updateQuantity,
    clearCart,
    closeCart,
  } = useCart();
  const { showToast } = useToast();

  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeCart();
    };
    document.addEventListener("keydown", onKey);
    const original = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = original;
    };
  }, [isOpen, closeCart]);

  return (
    <>
      <div
        className={`fixed inset-0 z-40 bg-black/60 backdrop-blur-sm transition-opacity duration-300 ${
          isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        onClick={closeCart}
        aria-hidden="true"
      />

      <aside
        role="dialog"
        aria-modal="true"
        aria-label="Shopping cart"
        inert={!isOpen}
        className={`fixed top-0 right-0 z-50 flex h-full w-full max-w-md flex-col border-l border-border bg-surface transition-transform duration-300 ease-out ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between border-b border-border px-5 py-4">
          <h2 className="text-lg font-semibold text-foreground">
            Your cart ({totalCount})
          </h2>
          <button
            type="button"
            onClick={closeCart}
            aria-label="Close cart"
            className="flex h-9 w-9 items-center justify-center rounded-full border border-border text-muted-foreground hover:bg-surface hover:text-foreground"
          >
            ✕
          </button>
        </div>

        {items.length === 0 ? (
          <div className="flex flex-1 flex-col items-center justify-center gap-4 px-5 py-12 text-center">
            <p className="text-muted-foreground">Your cart is empty.</p>
            <Button
              variant="secondary"
              size="md"
              href="/products"
              onClick={closeCart}
            >
              Continue shopping
            </Button>
          </div>
        ) : (
          <div className="flex-1 overflow-y-auto px-5 py-4">
            <div className="flex flex-col gap-4">
              {items.map((item) => (
                <div
                  key={item.key}
                  className="flex gap-3 rounded-2xl border border-border bg-background p-3"
                >
                  <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-xl">
                    <Image
                      src={item.image}
                      alt={item.name}
                      fill
                      sizes="80px"
                      className="object-cover"
                    />
                  </div>
                  <div className="flex flex-1 flex-col gap-2">
                    <div className="flex items-start justify-between gap-2">
                      <div className="flex flex-col">
                        <span className="text-sm font-medium text-foreground">
                          {item.name}
                        </span>
                        <span className="text-xs text-muted-foreground">
                          {item.color} / {item.size}
                        </span>
                      </div>
                      <button
                        type="button"
                        onClick={() => removeItem(item.key)}
                        className="text-xs text-muted-foreground hover:text-foreground"
                      >
                        Remove
                      </button>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <button
                          type="button"
                          onClick={() =>
                            updateQuantity(item.key, item.quantity - 1)
                          }
                          className="flex h-7 w-7 items-center justify-center rounded-full border border-border text-foreground hover:bg-surface"
                        >
                          -
                        </button>
                        <span className="w-6 text-center text-sm text-foreground">
                          {item.quantity}
                        </span>
                        <button
                          type="button"
                          onClick={() =>
                            updateQuantity(item.key, item.quantity + 1)
                          }
                          className="flex h-7 w-7 items-center justify-center rounded-full border border-border text-foreground hover:bg-surface"
                        >
                          +
                        </button>
                      </div>
                      <span className="text-sm font-medium text-accent">
                        {formatPrice(item.price * item.quantity)}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {items.length > 0 && (
          <div className="border-t border-border px-5 py-4">
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">
                Shipping and taxes calculated at checkout
              </span>
              <span className="text-lg font-semibold text-foreground">
                {formatPrice(subtotal)}
              </span>
            </div>
            <div className="mt-3 flex flex-col gap-2">
              <Button variant="primary" size="lg" href="/checkout" onClick={closeCart}>
  Checkout
</Button>
              <button
                type="button"
                onClick={() => {
                  clearCart();
                  showToast("Cart cleared");
                }}
                className="text-xs text-muted-foreground hover:text-foreground"
              >
                Clear cart
              </button>
            </div>
          </div>
        )}
      </aside>
    </>
  );
}