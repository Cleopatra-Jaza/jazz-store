import Link from "next/link";
import Image from "next/image";
import { products } from "@/data/products";
import Reveal from "@/components/Reveal";

interface Tile {
  category: string;
  count: number;
  image: string;
}

const tiles: Tile[] = Array.from(
  new Set(products.map((p) => p.category))
)
  .map((category) => {
    const items = products.filter((p) => p.category === category);
    if (items.length === 0) return null;
    return {
      category,
      count: items.length,
      image: items[0].variants[0].image,
    };
  })
  .filter((t): t is Tile => t !== null);

export default function CategoryTiles() {
  return (
    <section className="py-16 md:py-24">
      <div className="max-w-6xl mx-auto px-4">
        <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-8 font-display">
          Shop by category
        </h2>
        <Reveal>
          <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
            {tiles.map((tile) => (
              <Link
                key={tile.category}
                href="/products"
                className="group relative rounded-3xl overflow-hidden border border-border bg-surface"
              >
                <div className="relative aspect-[4/3] overflow-hidden">
                  <Image
                    src={tile.image}
                    alt={tile.category}
                    fill
                    sizes="(max-width: 768px) 50vw, 33vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
                </div>
                <div className="absolute bottom-0 left-0 right-0 px-4 py-3">
                  <p className="text-foreground font-semibold">
                    {tile.category}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {tile.count} products
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}