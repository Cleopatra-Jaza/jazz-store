"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import CartButton from "@/components/CartButton";

interface MobileMenuProps {
  open: boolean;
  onClose: () => void;
}

export default function MobileMenu({ open, onClose }: MobileMenuProps) {
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    const original = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    panelRef.current?.focus();
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = original;
    };
  }, [open, onClose]);

  const close = () => onClose();

  return (
    <div
      className={`fixed inset-0 z-40 transition-opacity duration-200 ${
        open ? "opacity-100" : "opacity-0 pointer-events-none"
      }`}
      aria-hidden="true"
    >
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={close}
      />
      <div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-label="Mobile menu"
        tabIndex={-1}
        className={`absolute top-0 right-0 h-full w-72 max-w-[80vw] rounded-l-3xl border-l border-border bg-surface px-6 py-6 transition-transform duration-300 ease-out ${
          open ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between mb-6">
          <span className="font-bold tracking-widest text-foreground">JAZZ</span>
          <button
            type="button"
            onClick={close}
            aria-label="Close menu"
            className="flex h-9 w-9 items-center justify-center rounded-full border border-border text-muted-foreground hover:bg-surface hover:text-foreground focus-visible:ring-2 focus-visible:ring-accent"
          >
            ✕
          </button>
        </div>
        <nav className="flex flex-col gap-1">
          <Link
            href="/"
            onClick={close}
            className="rounded-xl px-3 py-2 text-foreground hover:bg-surface focus-visible:ring-2 focus-visible:ring-accent"
          >
            Home
          </Link>
          <Link
            href="/products"
            onClick={close}
            className="rounded-xl px-3 py-2 text-foreground hover:bg-surface focus-visible:ring-2 focus-visible:ring-accent"
          >
            Shop
          </Link>
        </nav>
        <div className="mt-6 flex justify-end">
          <CartButton />
        </div>
      </div>
    </div>
  );
}