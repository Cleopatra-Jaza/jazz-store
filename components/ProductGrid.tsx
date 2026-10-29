"use client";

import { useEffect, useMemo, useState } from "react";
import ProductCard from "@/components/ProductCard";
import Button from "@/components/ui/Button";
import FilterDrawer from "@/components/FilterDrawer";
import { useDebouncedValue } from "@/hooks/useDebouncedValue";
import { products } from "@/data/products";

interface ProductGridProps {
  products: typeof products;
}

type PricePreset = "under3000" | "mid1" | "mid2" | "over10000" | null;

const pricePresets = [
  { id: "under3000" as PricePreset, label: "Under Rs. 3,000", test: (p: number) => p < 3000 },
  { id: "mid1" as PricePreset, label: "Rs. 3,000 - 6,000", test: (p: number) => p >= 3000 && p <= 6000 },
  { id: "mid2" as PricePreset, label: "Rs. 6,000 - 10,000", test: (p: number) => p >= 6000 && p <= 10000 },
  { id: "over10000" as PricePreset, label: "Over Rs. 10,000", test: (p: number) => p > 10000 },
];

export default function ProductGrid({ products: allProducts }: ProductGridProps) {
  const [category, setCategory] = useState<string>("All");
  const [gender, setGender] = useState<string>("All");
  const [search, setSearch] = useState<string>("");
  const debouncedSearch = useDebouncedValue(search, 200);
  const [sort, setSort] = useState<string>("featured");
  const [pricePreset, setPricePreset] = useState<PricePreset>(null);
  const [drawerOpen, setDrawerOpen] = useState(false);

  const categories = useMemo(
    () => ["All", ...Array.from(new Set(allProducts.map((p) => p.category)))],
    [allProducts]
  );

  const genders = useMemo(
    () => ["All", ...Array.from(new Set(allProducts.map((p) => p.gender)))],
    [allProducts]
  );

  const getPriceKey = (p: (typeof allProducts)[number]) => p.price;

  const filtered = useMemo(() => {
    let list = allProducts.filter((p) => {
      const matchesCategory = category === "All" || p.category === category;
      const matchesGender = gender === "All" || p.gender === gender;
      const query = debouncedSearch.toLowerCase();
      const matchesSearch =
        !query ||
        p.name.toLowerCase().includes(query) ||
        p.category.toLowerCase().includes(query);
      const price = getPriceKey(p);
      const matchesPrice = pricePreset
        ? pricePresets.find((pr) => pr.id === pricePreset)?.test(price) ?? true
        : true;
      return matchesCategory && matchesGender && matchesSearch && matchesPrice;
    });

    if (sort === "price-asc") {
      list = [...list].sort((a, b) => getPriceKey(a) - getPriceKey(b));
    } else if (sort === "price-desc") {
      list = [...list].sort((a, b) => getPriceKey(b) - getPriceKey(a));
    } else if (sort === "name-asc") {
      list = [...list].sort((a, b) => a.name.localeCompare(b.name));
    }

    return list;
  }, [allProducts, category, gender, debouncedSearch, pricePreset, sort]);

  const activeCount =
    (category !== "All" ? 1 : 0) +
    (gender !== "All" ? 1 : 0) +
    (search.trim() ? 1 : 0) +
    (pricePreset ? 1 : 0) +
    (sort !== "featured" ? 1 : 0);

  const hasFilter = activeCount > 0;

  const clearAll = () => {
    setCategory("All");
    setGender("All");
    setSearch("");
    setPricePreset(null);
    setSort("featured");
  };

  const pill = (active: boolean) =>
    `rounded-full px-3 py-1.5 text-sm font-medium transition-all ${
      active
        ? "bg-accent text-white"
        : "border border-border text-muted-foreground hover:bg-surface hover:text-foreground"
    }`;

  const FilterSection = () => (
    <div className="flex flex-col gap-6">
      <div>
        <h3 className="text-sm font-semibold text-foreground mb-2">Category</h3>
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
      <div>
        <h3 className="text-sm font-semibold text-foreground mb-2">Gender</h3>
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
      </div>
      <div>
        <h3 className="text-sm font-semibold text-foreground mb-2">Price</h3>
        <div className="flex flex-wrap gap-2">
          {pricePresets.map((pr) => (
            <button
              key={pr.id}
              onClick={() =>
                setPricePreset((p) => (p === pr.id ? null : pr.id))
              }
              className={pill(pricePreset === pr.id)}
            >
              {pr.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );

  return (
    <div className="space-y-10">
      <div className="flex flex-col gap-4">
        <div className="flex flex-col lg:flex-row lg:items-center gap-3">
          <div className="relative flex-1">
            <label htmlFor="product-search" className="sr-only">
              Search products
            </label>
            <svg
              className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="11" cy="11" r="8" />
              <line x1="21" y1="21" x2="16.65" y2="16.65" />
            </svg>
            <input
              id="product-search"
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search products"
              className="w-full rounded-full border border-border bg-surface px-10 py-2 text-sm text-foreground placeholder:text-muted-foreground focus-visible:ring-2 focus-visible:ring-accent focus-visible:outline-none"
            />
            {search.trim() && (
              <button
                type="button"
                onClick={() => setSearch("")}
                aria-label="Clear search"
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
              >
                ✕
              </button>
            )}
          </div>
          <div className="flex items-center gap-2 lg:hidden">
            <button
              type="button"
              onClick={() => setDrawerOpen(true)}
              className="relative rounded-full border border-border px-4 py-1.5 text-sm text-foreground hover:bg-surface"
            >
              Filters
              {activeCount > 0 && (
                <span className="absolute -top-1.5 -right-1.5 flex h-5 min-w-5 items-center justify-center rounded-full bg-accent px-1 text-[10px] font-semibold text-white">
                  {activeCount}
                </span>
              )}
            </button>
            <select
              value={sort}
              onChange={(e) => setSort(e.target.value)}
              className="rounded-full border border-border bg-surface px-4 py-1.5 text-sm text-foreground focus-visible:ring-2 focus-visible:ring-accent focus-visible:outline-none"
            >
              <option value="featured">Featured</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
              <option value="name-asc">Name: A to Z</option>
            </select>
          </div>
        </div>

        <div className="hidden lg:flex flex-wrap items-center gap-3">
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
          <div className="flex flex-wrap gap-2">
            {pricePresets.map((pr) => (
              <button
                key={pr.id}
                onClick={() =>
                  setPricePreset((p) => (p === pr.id ? null : pr.id))
                }
                className={pill(pricePreset === pr.id)}
              >
                {pr.label}
              </button>
            ))}
          </div>
          <select
            value={sort}
            onChange={(e) => setSort(e.target.value)}
            className="rounded-full border border-border bg-surface px-4 py-1.5 text-sm text-foreground focus-visible:ring-2 focus-visible:ring-accent focus-visible:outline-none"
          >
            <option value="featured">Featured</option>
            <option value="price-asc">Price: Low to High</option>
            <option value="price-desc">Price: High to Low</option>
            <option value="name-asc">Name: A to Z</option>
          </select>
          {hasFilter && (
            <Button variant="ghost" size="sm" onClick={clearAll}>
              Clear filters
            </Button>
          )}
        </div>
      </div>

      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2">
        <span className="text-lg font-semibold text-foreground" aria-live="polite">
          {filtered.length} products
        </span>
        {hasFilter && (
          <Button
            variant="ghost"
            size="sm"
            onClick={clearAll}
            className="lg:hidden"
          >
            Clear filters
          </Button>
        )}
      </div>

      {filtered.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-24 text-center">
          <p className="text-muted-foreground">No products match your filters.</p>
          {hasFilter && (
            <div className="mt-4">
              <Button variant="secondary" size="md" onClick={clearAll}>
                Clear filters
              </Button>
            </div>
          )}
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filtered.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}

      <FilterDrawer
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        footer={
          <div className="flex flex-col gap-2">
            <Button
              variant="primary"
              size="lg"
              onClick={() => setDrawerOpen(false)}
            >
              Show {filtered.length} products
            </Button>
            <button
              type="button"
              onClick={() => {
                clearAll();
                setDrawerOpen(false);
              }}
              className="text-sm text-muted-foreground hover:text-foreground"
            >
              Clear
            </button>
          </div>
        }
      >
        <FilterSection />
      </FilterDrawer>
    </div>
  );
}
