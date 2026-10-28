"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Button from "@/components/ui/Button";
import type { Product } from "@/data/products";
import { formatPrice } from "@/data/products";

interface ProductDetailProps {
  product: Product;
}

export default function ProductDetail({ product }: ProductDetailProps) {
  const [selectedVariantIndex, setSelectedVariantIndex] = useState(0);
  const [selectedSize, setSelectedSize] = useState<string | null>(
    product.sizes.length === 1 && product.sizes[0] === "One Size"
      ? "One Size"
      : null
  );
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const selectedVariant = product.variants[selectedVariantIndex];
  const isOneSize = product.sizes.length === 1 && product.sizes[0] === "One Size";
  const sizeRequired = !isOneSize;

  useEffect(
    () => () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    },
    []
  );

  const handleAdd = () => {
    if (sizeRequired && !selectedSize) return;
    setAdded(true);
    if (timerRef.current) clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => setAdded(false), 1500);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-14">
      <div className="flex flex-col gap-4">
        <div className="relative aspect-square rounded-3xl overflow-hidden bg-surface border border-border">
          {product.variants.map((variant, i) => (
            <Image
              key={variant.color}
              src={variant.image}
              alt={`${product.name} — ${variant.color}`}
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className={`absolute inset-0 object-cover transition-opacity duration-500 ${
                i === selectedVariantIndex ? "opacity-100" : "opacity-0"
              }`}
              priority
            />
          ))}
        </div>
        <div className="flex gap-3">
          {product.variants.map((variant, i) => (
            <button
              key={variant.color}
              type="button"
              onClick={() => setSelectedVariantIndex(i)}
              aria-label={`${variant.color} color`}
              aria-pressed={i === selectedVariantIndex}
              className={`relative w-12 h-12 rounded-2xl border border-white/20 transition-transform hover:scale-105 p-1 ${
                i === selectedVariantIndex
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

      <div className="flex flex-col gap-4">
        <p className="text-xs text-muted-foreground uppercase tracking-wider">
          {product.category}
        </p>
        <h1 className="text-3xl lg:text-4xl font-bold text-foreground">
          {product.name}
        </h1>
        <div className="flex items-baseline gap-2">
          <span className="text-accent font-medium text-xl">
            {formatPrice(product.price)}
          </span>
          <span className="text-xs text-muted-foreground capitalize">
            {selectedVariant.color}
          </span>
        </div>
        <p className="text-muted-foreground leading-relaxed">
          {product.description}
        </p>

        <div>
          <span className="text-sm text-muted-foreground">
            Color:{" "}
            <span className="text-foreground capitalize">
              {selectedVariant.color}
            </span>
          </span>
          <div className="flex gap-2 mt-2">
            {product.variants.map((variant, i) => (
              <button
                key={variant.color}
                type="button"
                onClick={() => setSelectedVariantIndex(i)}
                onMouseEnter={() => setSelectedVariantIndex(i)}
                aria-label={`${variant.color} color`}
                aria-pressed={i === selectedVariantIndex}
                className={`relative w-5 h-5 rounded-full border border-white/20 transition-transform hover:scale-110 p-1 ${
                  i === selectedVariantIndex
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

        <div>
          <span className="text-sm text-muted-foreground">Size</span>
          <div className="flex flex-wrap gap-2 mt-2">
            {product.sizes.map((size) => (
              <button
                key={size}
                type="button"
                onClick={() => setSelectedSize(size)}
                className={`rounded-full px-3 py-1.5 text-sm font-medium transition-all ${
                  selectedSize === size
                    ? "bg-accent text-white"
                    : "border border-border text-muted-foreground hover:bg-surface hover:text-foreground"
                }`}
              >
                {size}
              </button>
            ))}
          </div>
        </div>

        <div>
          <span className="text-sm text-muted-foreground">Quantity</span>
          <div className="flex items-center gap-2 mt-2">
            <button
              type="button"
              onClick={() => setQuantity((q) => Math.max(1, q - 1))}
              className="w-9 h-9 rounded-full border border-border text-foreground hover:bg-surface"
            >
              -
            </button>
            <span className="w-9 text-center text-foreground">{quantity}</span>
            <button
              type="button"
              onClick={() => setQuantity((q) => Math.min(10, q + 1))}
              className="w-9 h-9 rounded-full border border-border text-foreground hover:bg-surface"
            >
              +
            </button>
          </div>
        </div>

        <div className="flex flex-col gap-1">
          <Button
            variant="primary"
            size="lg"
            onClick={handleAdd}
            disabled={sizeRequired && !selectedSize}
          >
            {added ? "Added ✓" : "Add to cart"}
          </Button>
          {sizeRequired && !selectedSize && (
            <span className="text-xs text-muted-foreground">Select a size</span>
          )}
        </div>

        <div className="flex flex-wrap gap-2 pt-2">
          {["Free returns", "Island-wide delivery", "Secure checkout"].map(
            (t) => (
              <span
                key={t}
                className="rounded-full border border-border px-3 py-1 text-xs text-muted-foreground"
              >
                {t}
              </span>
            )
          )}
        </div>
      </div>
    </div>
  );
}