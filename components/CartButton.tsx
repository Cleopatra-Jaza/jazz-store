"use client";

import { useEffect, useRef } from "react";
import { useCart } from "@/components/CartProvider";

export default function CartButton() {
  const { isOpen, openCart, closeCart, totalCount, bumpKey } = useCart();
  const badgeRef = useRef<HTMLSpanElement>(null);
  const prevBump = useRef(bumpKey);

  useEffect(() => {
    if (prevBump.current !== bumpKey && badgeRef.current) {
      badgeRef.current.classList.remove("animate-cart-bump");
      // force reflow
      void badgeRef.current.offsetWidth;
      badgeRef.current.classList.add("animate-cart-bump");
    }
    prevBump.current = bumpKey;
  }, [bumpKey]);

  return (
    <button
      type="button"
      onClick={() => (isOpen ? closeCart() : openCart())}
      className="relative inline-flex items-center justify-center rounded-full border border-border px-4 py-1.5 text-sm text-foreground transition-colors hover:bg-surface"
      aria-label={`Cart${totalCount ? ` with ${totalCount} items` : ""}`}
    >
      Cart
      {totalCount > 0 && (
        <span
          ref={badgeRef}
          key={bumpKey}
          className="absolute -top-1.5 -right-1.5 flex h-5 min-w-5 items-center justify-center rounded-full bg-accent px-1 text-[10px] font-semibold text-white"
        >
          {totalCount > 99 ? "99+" : totalCount}
        </span>
      )}
    </button>
  );
}