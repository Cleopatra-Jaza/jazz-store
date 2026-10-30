import "dotenv/config";
import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import { products } from "../data/products";

const url = new URL(process.env.DATABASE_URL!);
url.searchParams.delete("sslmode");

const adapter = new PrismaPg({
  connectionString: url.toString(),
  ssl: { rejectUnauthorized: false },
});
const prisma = new PrismaClient({ adapter });

async function main() {
  for (const p of products) {
    const data = {
      name: p.name,
      category: p.category,
      gender: p.gender,
      price: p.price,
      description: p.description,
      sizes: p.sizes,
    };
    const variants = p.variants.map((v) => ({
      color: v.color,
      hex: v.hex,
      image: v.image,
    }));

    await prisma.product.upsert({
      where: { slug: p.slug },
      update: { ...data, variants: { deleteMany: {}, create: variants } },
      create: { slug: p.slug, ...data, variants: { create: variants } },
    });
  }
  console.log(`Seeded ${products.length} products`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());