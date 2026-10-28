"use client";

import { useState, useMemo } from "react";
import ProductCard from "@/components/ProductCard";
import Button from "@/components/ui/Button";
import { products } from "@/data/products";

interface ProductGridProps {
  products: typeof products;
}

export default function ProductGrid({ products: allProducts }: ProductGridProps) {
  const [category, setCategory] = useState<string>("All");
  const [gender, setGender] = useState<string>("All");

  const categories = useMemo(
    () => ["All", ...Array.from(new Set(allProducts.map((p) => p.category)))],
    [allProducts]
  );

  const genders = useMemo(
    () => ["All", ...Array.from(new Set(allProducts.map((p) => p.gender)))],
    [allProducts]
  );

  const filtered = useMemo(
    () =>
      allProducts.filter(
        (p) =>
          (category === "All" || p.category === category) &&
          (gender === "All" || p.gender === gender)
      ),
    [allProducts, category, gender]
  );

  const hasFilter = category !== "All" || gender !== "All";

  const pill = (active: boolean) =>
    `rounded-full px-3 py-1.5 text-sm font-medium transition-all ${
      active
        ? "bg-accent text-white"
        : "border border-border text-muted-foreground hover:bg-surface hover:text-foreground"
    }`;

  return (
    <div className="space-y-10">
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2">
          <span className="text-lg font-semibold text-foreground">
            {filtered.length} products
          </span>
          {hasFilter && (
            <Button variant="ghost" size="sm" onClick={() => { setCategory("All"); setGender("All"); }}>
              Clear filters
            </Button>
          )}
        </div>

        <div className="flex flex-wrap gap-2">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setCategory(cat)}
              className={pill(category === cat)}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      <div className="flex flex-wrap gap-2">
        {genders.map((gen) => (
          <button
            key={gen}
            onClick={() => setGender(gen)}
            className={pill(gender === gen)}
          >
            {gen}
          </button>
        ))}
      </div>

      {filtered.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-24 text-center">
          <p className="text-muted-foreground">No products match your filters.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filtered.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
}
