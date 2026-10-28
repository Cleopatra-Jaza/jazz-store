"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import type { Product } from "@/data/products";
import { formatPrice } from "@/data/products";

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const selectedVariant = product.variants[selectedIndex];

  const select = (index: number) => setSelectedIndex(index);

  return (
    <div className="rounded-3xl border border-border bg-surface overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
      <Link href={`/products/${product.slug}`} className="block">
        <div className="relative aspect-square overflow-hidden rounded-2xl group">
          {product.variants.map((variant, i) => (
            <Image
              key={variant.color}
              src={variant.image}
              alt={`${product.name} — ${variant.color}`}
              fill
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              className={`absolute inset-0 object-cover transition-all duration-500 ${
                i === selectedIndex ? "opacity-100" : "opacity-0"
              } group-hover:scale-105`}
            />
          ))}
        </div>
      </Link>

      <div className="px-4 py-3">
        <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">
          {product.category}
        </p>
        <Link href={`/products/${product.slug}`}>
          <h3 className="text-lg font-semibold text-foreground">{product.name}</h3>
        </Link>
        <div className="flex items-baseline gap-1 mt-1">
          <span className="text-accent font-medium">{formatPrice(product.price)}</span>
          <span className="text-xs text-muted-foreground capitalize ml-1">
            {selectedVariant.color}
          </span>
          <span className="text-xs text-muted-foreground">
            {product.variants.length} colors
          </span>
        </div>
        <div className="flex gap-2 mt-3">
          {product.variants.map((variant, i) => (
            <button
              key={variant.color}
              type="button"
              onClick={() => select(i)}
              onMouseEnter={() => select(i)}
              aria-label={`${variant.color} color`}
              aria-pressed={i === selectedIndex}
              className={`relative w-5 h-5 rounded-full border border-white/20 transition-transform hover:scale-110 p-1 ${
                i === selectedIndex
                  ? "ring-2 ring-accent ring-offset-2 ring-offset-surface"
                  : ""
              }`}
              style={{ backgroundColor: variant.hex }}
            >
              <span className="sr-only">{variant.color}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
