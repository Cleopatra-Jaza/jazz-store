import { Metadata } from "next";
import { products } from "@/data/products";
import ProductGrid from "@/components/ProductGrid";

export const metadata: Metadata = {
  title: "Shop | Jazz",
};

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
        <ProductGrid products={products} />
      </div>
    </main>
  );
}
