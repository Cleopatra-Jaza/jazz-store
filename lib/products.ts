import { prisma } from "@/lib/prisma";
import type { Product } from "@/data/products";

export async function getAllSlugs(): Promise<string[]> {
  const rows = await prisma.product.findMany({ select: { slug: true } });
  return rows.map((r) => r.slug);
}

export async function getProductBySlug(slug: string): Promise<Product | null> {
  const p = await prisma.product.findUnique({
    where: { slug },
    include: { variants: true },
  });
  if (!p) return null;

  return {
    id: p.id,
    slug: p.slug,
    name: p.name,
    category: p.category,
    gender: p.gender,
    price: Number(p.price),
    sizes: p.sizes,
    description: p.description,
    variants: p.variants.map((v) => ({
      color: v.color,
      hex: v.hex,
      image: v.image,
    })),
  };
}
export async function getAllProducts(): Promise<Product[]> {
  const rows = await prisma.product.findMany({
    include: { variants: true },
    orderBy: { id: "asc" },
  });

  return rows.map((p) => ({
    id: p.id,
    slug: p.slug,
    name: p.name,
    category: p.category,
    gender: p.gender,
    price: Number(p.price),
    sizes: p.sizes,
    description: p.description,
    variants: p.variants.map((v) => ({
      color: v.color,
      hex: v.hex,
      image: v.image,
    })),
  }));
}