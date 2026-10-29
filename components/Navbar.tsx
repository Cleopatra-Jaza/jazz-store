import Link from "next/link";
import CartButton from "@/components/CartButton";

interface NavbarProps {
  menuOpen: boolean;
  onMenuToggle: () => void;
}

export default function Navbar({ menuOpen, onMenuToggle }: NavbarProps) {
  return (
    <nav className="sticky top-0 z-50 w-full border-b border-border bg-background/80 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
        <Link href="/" className="font-bold text-xl tracking-widest text-foreground">
          JAZZ
        </Link>

        <div className="hidden md:flex items-center gap-3">
          <Link
            href="/products"
            className="text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            Shop
          </Link>
          <CartButton />
        </div>

        <div className="flex md:hidden items-center gap-3">
          <CartButton />
          <button
            type="button"
            onClick={onMenuToggle}
            aria-expanded={menuOpen}
            aria-label="Open menu"
            className="flex h-9 w-9 items-center justify-center rounded-full border border-border text-foreground hover:bg-surface focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-surface focus-visible:outline-none"
          >
            <span className="sr-only">Open menu</span>
            <span className="block w-5 h-0.5 bg-foreground" />
            <span className="block w-5 h-0.5 bg-foreground" />
            <span className="block w-5 h-0.5 bg-foreground" />
          </button>
        </div>
      </div>
    </nav>
  );
}