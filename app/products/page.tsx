import { Metadata } from "next";
import { Suspense } from "react";
import type { Product } from "@/data/products";
import ProductGrid from "@/components/ProductGrid";
import { prisma } from "@/lib/prisma";

export const metadata: Metadata = {
  title: "Shop | Jazz",
};

async function ProductList() {
  const rows = await prisma.product.findMany({
    include: { variants: true },
    orderBy: { id: "asc" },
  });

  const products: Product[] = rows.map((p) => ({
    id: p.id,
    slug: p.slug,
    name: p.name,
    category: p.category,
    gender: p.gender,
    price: Number(p.price),
    sizes: p.sizes,
    description: p.description,
    variants: p.variants.map((v) => ({
      color: v.color,
      hex: v.hex,
      image: v.image,
    })),
  }));

  return <ProductGrid products={products} />;
}

export default function ProductsPage() {
  return (
    <main className="min-h-[85vh] pt-10 pb-20 px-6 lg:px-12">
      <div className="max-w-7xl mx-auto">
        <div className="mb-10">
          <h1 className="text-3xl font-bold text-foreground mb-2 font-display">Shop</h1>
          <p className="text-muted-foreground">
            Motorsport streetwear built for the track and the street.
          </p>
        </div>
        <Suspense
          fallback={<p className="text-muted-foreground">Loading products...</p>}
        >
          <ProductList />
        </Suspense>
      </div>
    </main>
  );
}