export interface Variant {
  color: string;
  hex: string;
  image: string;
}

export interface Product {
  id: string;
  slug: string;
  name: string;
  category: string;
  gender: "men" | "women" | "unisex";
  price: number;
  sizes: string[];
  description: string;
  variants: Variant[];
}

const hexByColor: Record<string, string> = {
  black: "#111111",
  white: "#f5f5f5",
  red: "#dc2626",
  blue: "#2563eb",
  green: "#16a34a",
  yellow: "#facc15",
  pink: "#ec4899",
  beige: "#d6c3a5",
  brown: "#78350f",
  grey: "#6b7280",
  navy: "#1e3a8a",
  purple: "#a855f7",
};

function imagePath(file: string): string {
  return `/images/products/${file}`;
}

export const products: Product[] = [
  {
    id: "1",
    slug: "apex-oversized-tee",
    name: "Apex Oversized Tee",
    category: "T-Shirts",
    gender: "unisex",
    price: 35,
    sizes: ["S", "M", "L", "XL", "XXL"],
    description: "Heavyweight oversized tee with a minimalist apex logo on the chest.",
    variants: [
      { color: "blue", hex: hexByColor.blue, image: imagePath("apex-oversized-tee-blue.jpg") },
      { color: "green", hex: hexByColor.green, image: imagePath("apex-oversized-tee-green.jpg") },
      { color: "white", hex: hexByColor.white, image: imagePath("apex-oversized-tee-white.jpg") },
      { color: "yellow", hex: hexByColor.yellow, image: imagePath("apex-oversized-tee-yellow.jpg") },
    ],
  },
  {
    id: "2",
    slug: "checkered-flag-cap",
    name: "Checkered Flag Cap",
    category: "Accessories",
    gender: "unisex",
    price: 25,
    sizes: ["One Size"],
    description: "Structured cap with a vintage checkered flag patch.",
    variants: [
      { color: "black", hex: hexByColor.black, image: imagePath("checkered-flag-cap-black.jpg") },
      { color: "blue", hex: hexByColor.blue, image: imagePath("checkered-flag-cap-blue.jpg") },
      { color: "pink", hex: hexByColor.pink, image: imagePath("checkered-flag-cap-pink.jpg") },
      { color: "red", hex: hexByColor.red, image: imagePath("checkered-flag-cap-red.jpg") },
    ],
  },
  {
    id: "3",
    slug: "drift-king-tee",
    name: "Drift King Tee",
    category: "T-Shirts",
    gender: "men",
    price: 32,
    sizes: ["S", "M", "L", "XL"],
    description: "Graphic tee inspired by drift culture and track days.",
    variants: [
      { color: "beige", hex: hexByColor.beige, image: imagePath("drift-king-tee-beige.jpg") },
      { color: "black", hex: hexByColor.black, image: imagePath("drift-king-tee-black.jpg") },
      { color: "red", hex: hexByColor.red, image: imagePath("drift-king-tee-red.jpg") },
      { color: "white", hex: hexByColor.white, image: imagePath("drift-king-tee-white.jpg") },
    ],
  },
  {
    id: "4",
    slug: "jazz-keychain",
    name: "Jazz Keychain",
    category: "Accessories",
    gender: "unisex",
    price: 12,
    sizes: ["One Size"],
    description: "Racing-inspired keychain with the Jazz logo.",
    variants: [
      { color: "blue", hex: hexByColor.blue, image: imagePath("keychain-blue.jpg") },
      { color: "brown", hex: hexByColor.brown, image: imagePath("keychain-brown.jpg") },
      { color: "grey", hex: hexByColor.grey, image: imagePath("keychain-grey.jpg") },
      { color: "red", hex: hexByColor.red, image: imagePath("keychain-red.jpg") },
    ],
  },
  {
    id: "5",
    slug: "night-run-zip-hoodie",
    name: "Night Run Zip Hoodie",
    category: "Hoodies",
    gender: "unisex",
    price: 55,
    sizes: ["S", "M", "L", "XL", "XXL"],
    description: "Zip-up hoodie with reflective details for night runs.",
    variants: [
      { color: "blue", hex: hexByColor.blue, image: imagePath("night-run-zip-hoodie-blue.jpg") },
      { color: "green", hex: hexByColor.green, image: imagePath("night-run-zip-hoodie-green.jpg") },
      { color: "grey", hex: hexByColor.grey, image: imagePath("night-run-zip-hoodie-grey.jpg") },
      { color: "pink", hex: hexByColor.pink, image: imagePath("night-run-zip-hoodie-pink.jpg") },
    ],
  },
  {
    id: "6",
    slug: "pit-crew-cap",
    name: "Pit Crew Cap",
    category: "Accessories",
    gender: "unisex",
    price: 22,
    sizes: ["One Size"],
    description: "Classic pit crew cap with embroidered branding.",
    variants: [
      { color: "black", hex: hexByColor.black, image: imagePath("pit-crew-cap-black.jpg") },
      { color: "blue", hex: hexByColor.blue, image: imagePath("pit-crew-cap-blue.jpg") },
      { color: "red", hex: hexByColor.red, image: imagePath("pit-crew-cap-red.jpg") },
      { color: "yellow", hex: hexByColor.yellow, image: imagePath("pit-crew-cap-yellow.jpg") },
    ],
  },
  {
    id: "7",
    slug: "pit-crew-pullover-hoodie",
    name: "Pit Crew Pullover Hoodie",
    category: "Hoodies",
    gender: "unisex",
    price: 48,
    sizes: ["S", "M", "L", "XL"],
    description: "Pullover hoodie built for the pit crew look.",
    variants: [
      { color: "blue", hex: hexByColor.blue, image: imagePath("pit-crew-pullover-hoodie-blue.jpg") },
      { color: "brown", hex: hexByColor.brown, image: imagePath("pit-crew-pullover-hoodie-brown.jpg") },
      { color: "green", hex: hexByColor.green, image: imagePath("pit-crew-pullover-hoodie-green.jpg") },
      { color: "white", hex: hexByColor.white, image: imagePath("pit-crew-pullover-hoodie-white.jpg") },
    ],
  },
  {
    id: "8",
    slug: "jazz-racing-tote-bag",
    name: "Jazz Racing Tote Bag",
    category: "Accessories",
    gender: "unisex",
    price: 28,
    sizes: ["One Size"],
    description: "Durable tote bag for race day gear.",
    variants: [
      { color: "black", hex: hexByColor.black, image: imagePath("racing-tote-bag-black.jpg") },
      { color: "blue", hex: hexByColor.blue, image: imagePath("racing-tote-bag-blue.jpg") },
      { color: "brown", hex: hexByColor.brown, image: imagePath("racing-tote-bag-brown.jpg") },
      { color: "white", hex: hexByColor.white, image: imagePath("racing-tote-bag-white.jpg") },
    ],
  },
  {
    id: "9",
    slug: "redline-graphic-tee",
    name: "Redline Graphic Tee",
    category: "T-Shirts",
    gender: "men",
    price: 34,
    sizes: ["S", "M", "L", "XL"],
    description: "Graphic tee with a redline speedometer design.",
    variants: [
      { color: "black", hex: hexByColor.black, image: imagePath("redline-graphic-tee-black.jpg") },
      { color: "purple", hex: hexByColor.purple, image: imagePath("redline-graphic-tee-purple.jpg") },
      { color: "white", hex: hexByColor.white, image: imagePath("redline-graphic-tee-white.jpg") },
      { color: "yellow", hex: hexByColor.yellow, image: imagePath("redline-graphic-tee-yellow.jpg") },
    ],
  },
  {
    id: "10",
    slug: "track-day-windbreaker-jackets",
    name: "Track Day Windbreaker Jacket",
    category: "Outerwear",
    gender: "unisex",
    price: 65,
    sizes: ["S", "M", "L", "XL", "XXL"],
    description: "Lightweight windbreaker for track day conditions.",
    variants: [
      { color: "black", hex: hexByColor.black, image: imagePath("track-day-windbreaker-jackets-black.jpg") },
      { color: "green", hex: hexByColor.green, image: imagePath("track-day-windbreaker-jackets-green.jpg") },
      { color: "purple", hex: hexByColor.purple, image: imagePath("track-day-windbreaker-jackets-purple.jpg") },
      { color: "white", hex: hexByColor.white, image: imagePath("track-day-windbreaker-jackets-white.jpg") },
    ],
  },
];

export function formatPrice(price: number): string {
  return new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(price);
}

export function getProductBySlug(slug: string): Product | undefined {
  return products.find((product) => product.slug === slug);
}

export function defaultImage(product: Product): string {
  return product.variants[0]?.image ?? "";
}
