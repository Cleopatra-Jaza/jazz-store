import { Suspense } from "react";
import Hero from "@/components/Hero";
import Marquee from "@/components/Marquee";
import FeaturedProducts from "@/components/FeaturedProducts";
import CategoryTiles from "@/components/CategoryTiles";
import WhyJazz from "@/components/WhyJazz";
import { getAllProducts } from "@/lib/products";

async function HomeContent() {
  const products = await getAllProducts();

  return (
    <>
      <Hero products={products} />
      <Marquee />
      <FeaturedProducts products={products} />
      <CategoryTiles products={products} />
      <WhyJazz />
    </>
  );
}

export default function Home() {
  return (
    <main className="flex-1 bg-background">
      <Suspense fallback={<div className="min-h-[85vh]" />}>
        <HomeContent />
      </Suspense>
    </main>
  );
}