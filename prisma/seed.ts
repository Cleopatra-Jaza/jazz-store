import "dotenv/config";
import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import { products } from "../data/products";
import { supabaseCa } from "../lib/supabase-ca";

const url = new URL(process.env.DATABASE_URL!);
url.searchParams.delete("sslmode");

const adapter = new PrismaPg({
  connectionString: url.toString(),
   ssl: { ca: supabaseCa }, 
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
            update: {
        name: data.name,
        category: data.category,
        gender: data.gender,
        description: data.description,
        sizes: data.sizes,
        variants: { deleteMany: {}, create: variants },
      },
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