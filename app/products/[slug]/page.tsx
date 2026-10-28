import { Metadata } from "next";
import { notFound } from "next/navigation";
import { products, getProductBySlug } from "@/data/products";
import Button from "@/components/ui/Button";
import ProductDetail from "@/components/ProductDetail";

export async function generateStaticParams() {
  return products.map((product) => ({ slug: product.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const product = getProductBySlug(slug);
  return {
    title: product ? `${product.name} | Jazz` : "Product | Jazz",
  };
}

export default async function ProductPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const product = getProductBySlug(slug);
  if (!product) notFound();

  return (
    <main className="min-h-[85vh] pt-10 pb-20 px-6 lg:px-12">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <Button href="/products" variant="ghost" size="sm">
            ← Back to shop
          </Button>
        </div>
        <ProductDetail product={product} />
      </div>
    </main>
  );
}