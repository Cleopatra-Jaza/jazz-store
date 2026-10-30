import { Metadata } from "next";
import { Suspense } from "react";
import { notFound } from "next/navigation";
import { getAllSlugs, getProductBySlug } from "@/lib/products";
import Button from "@/components/ui/Button";
import ProductDetail from "@/components/ProductDetail";

export async function generateStaticParams() {
  const slugs = await getAllSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const product = await getProductBySlug(slug);
  return {
    title: product ? `${product.name} | Jazz` : "Product | Jazz",
  };
}

async function ProductContent({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const product = await getProductBySlug(slug);
  if (!product) notFound();

  return <ProductDetail product={product} />;
}

export default function ProductPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  return (
    <main className="min-h-[85vh] pt-10 pb-20 px-6 lg:px-12">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <Button href="/products" variant="ghost" size="sm">
            ← Back to shop
          </Button>
        </div>
        <Suspense
          fallback={<p className="text-muted-foreground">Loading product...</p>}
        >
          <ProductContent params={params} />
        </Suspense>
      </div>
    </main>
  );
}