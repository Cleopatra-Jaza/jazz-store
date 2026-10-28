import Link from "next/link";
import Button from "@/components/ui/Button";

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
          <Link href="/cart">
            <Button variant="secondary" size="sm">
              Cart
            </Button>
          </Link>
        </div>
      </div>
    </nav>
  );
}
