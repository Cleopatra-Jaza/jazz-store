import type { Metadata } from "next";
import { Geist, Geist_Mono, Oswald } from "next/font/google";
import { CartProvider } from "@/components/CartProvider";
import { ToastProvider } from "@/components/ToastProvider";
import CartDrawer from "@/components/CartDrawer";
import NavbarShell from "@/components/NavbarShell";
import Footer from "@/components/Footer";
import AnnouncementBar from "@/components/AnnouncementBar";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const oswald = Oswald({
  variable: "--font-oswald",
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Jazz | Motorsport Apparel",
    template: "%s | Jazz",
  },
  description:
    "Motorsport streetwear built for the track and the street. Premium apparel, fast island-wide delivery.",
  openGraph: {
    siteName: "Jazz",
    type: "website",
    title: "Jazz | Motorsport Apparel",
    description:
      "Motorsport streetwear built for the track and the street. Premium apparel, fast island-wide delivery.",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} ${oswald.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-background text-foreground">
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-50 focus:rounded-full focus:bg-accent focus:px-4 focus:py-2 focus:text-white focus-visible:ring-2 focus-visible:ring-accent"
        >
          Skip to content
        </a>
        <ToastProvider>
          <CartProvider>
            <AnnouncementBar />
            <NavbarShell />
            <main id="main-content" className="flex-1">
              {children}
            </main>
            <Footer />
            <CartDrawer />
          </CartProvider>
        </ToastProvider>
      </body>
    </html>
  );
}