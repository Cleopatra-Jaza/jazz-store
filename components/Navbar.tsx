import Link from "next/link";
import CartButton from "@/components/CartButton";

export default function Navbar() {
  return (
    <nav className="sticky top-0 z-50 w-full border-b border-border bg-background/80 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
        <Link href="/" className="font-bold text-xl tracking-widest text-foreground">
          JAZZ
        </Link>
        <div className="flex items-center gap-3">
          <Link
            href="/products"
            className="text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            Shop
          </Link>
          <CartButton />
        </div>
      </div>
    </nav>
  );
}