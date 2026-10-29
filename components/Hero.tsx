import Image from "next/image";
import Button from "@/components/ui/Button";
import { products, defaultImage } from "@/data/products";

export default function Hero() {
  const first = products[0];
  const image = first ? defaultImage(first) : "";

  return (
    <section
      className="min-h-[85vh] relative overflow-hidden flex flex-col lg:flex-row items-center justify-between gap-12"
    >
      <div className="max-w-6xl mx-auto px-4 w-full flex flex-col lg:flex-row items-center justify-between gap-12">
        <div className="absolute -inset-4 bg-accent/[0.06] blur-[120px] rounded-full pointer-events-none"></div>

        <div className="lg:w-1/2 flex flex-col gap-6 z-10">
        <span
          className="self-start inline-flex items-center rounded-full bg-accent text-white text-xs font-semibold uppercase tracking-wider px-3 py-1 animate-fade-up"
          style={{ animationDelay: "0s" }}
        >
          NEW SEASON
        </span>
        <h1
          className="text-5xl lg:text-7xl font-bold tracking-tight uppercase text-foreground animate-fade-up font-display"
          style={{ animationDelay: "0.15s" }}
        >
          BUILT FOR SPEED.
        </h1>
        <p
          className="text-lg text-muted-foreground max-w-lg leading-relaxed animate-fade-up"
          style={{ animationDelay: "0.3s" }}
        >
          Motorsport streetwear built for the track and the street.
        </p>
        <div
          className="flex flex-col sm:flex-row gap-4 animate-fade-up"
          style={{ animationDelay: "0.45s" }}
        >
          <Button variant="primary" size="lg" href="/products">
            Shop Now
          </Button>
          <Button variant="secondary" size="lg" href="/products">
            View Collection
          </Button>
        </div>
      </div>

      <div className="lg:w-1/2 relative w-full aspect-[4/5] min-h-[420px] rounded-3xl overflow-hidden border border-border/50 bg-surface animate-slow-zoom">
        <Image
          src={image}
          alt={first?.name ?? "Product"}
          fill
          sizes="(max-width: 768px) 100vw, 50vw"
          className="object-cover"
          priority
        />
      </div>
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 animate-bounce">
        <span className="w-px h-4 bg-accent/[0.4]"></span>
        <span className="text-xs text-muted-foreground uppercase tracking-wider">scroll</span>
      </div>
      </div>
    </section>
  );
}
