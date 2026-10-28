import Hero from "@/components/Hero";
import Marquee from "@/components/Marquee";
import FeaturedProducts from "@/components/FeaturedProducts";
import CategoryTiles from "@/components/CategoryTiles";
import WhyJazz from "@/components/WhyJazz";

export default function Home() {
  return (
    <main className="flex flex-1 bg-background">
      <Hero />
      <Marquee />
      <FeaturedProducts />
      <CategoryTiles />
      <WhyJazz />
    </main>
  );
}