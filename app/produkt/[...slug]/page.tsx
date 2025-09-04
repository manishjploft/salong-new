import { Metadata } from "next";
import { Suspense } from "react";
import { fetchProductDetail } from '@/features/products/products.action';
import ProductPageContent from "./_components/ProductPageContent";
import ProductPageSkeleton from "./_components/ProductPageSkeleton";

export const dynamic = "force-dynamic";

// Optimized metadata generation - only fetch minimal data needed for SEO
export async function generateMetadata({ params }: { params: { slug: string[] } }): Promise<Metadata> {
  const { slug } = params;
  
  try {
    const productDetail = await fetchProductDetail(slug);

    if (!productDetail || productDetail === 404) {
      return {
        title: 'Product Not Found',
        description: 'The requested product could not be found.',
      };
    }

    return {
      title: productDetail.product_name,
      description: productDetail.description || `${productDetail.brand_name} - ${productDetail.product_name}`,
      openGraph: {
        title: productDetail.product_name,
        description: productDetail.description || `${productDetail.brand_name} - ${productDetail.product_name}`,
        images: productDetail.product_image ? [productDetail.product_image] : [],
      },
      twitter: {
        card: 'summary_large_image',
        title: productDetail.product_name,
        description: productDetail.description || `${productDetail.brand_name} - ${productDetail.product_name}`,
        images: productDetail.product_image ? [productDetail.product_image] : [],
      },
    };
  } catch (error) {
    console.error('Error generating metadata:', error);
    return {
      title: 'Product',
      description: 'Product page',
    };
  }
}

// Main page component - now optimized for streaming
export default async function ProductPage({ params }: { params: { slug: string[] } }) {
  return (
    <section className="pt-6 pb-24 px-2 md:px-6 w-full bg-background">
      <Suspense fallback={<ProductPageSkeleton />}>
        <ProductPageContent slug={params.slug} />
      </Suspense>
    </section>
  );
}