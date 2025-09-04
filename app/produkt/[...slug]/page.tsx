import { Metadata } from "next";
// import Breadcrumbs from "@/components/Breadcrumbs";
// import RelatedProducts from "@/components/product/RelatedProducts";
import React from "react";
import { fetchProductDetail } from '@/features/products/products.action';
// import { fetchCartItems } from '@/features/cart/cart.action';
// import AddToCartButton from "@/components/product/AddToCartButton";
// import { fetchCustomerGroup } from "@/features/customer/customer.action";
// import ProductDetailVariant from "./_components/ProductDetailVariant";
// import ProductDetailPrice from "./_components/ProductDetailPrice";
// import ProductGallery from "./_components/ProductGallery";
import ProductPageClient from "./_components/ProductPageClient";


export const dynamic = "force-dynamic";

export async function generateMetadata({ params }: { params: { slug: string[] } }): Promise<Metadata> {
  const { slug } = params;
  const productDetail = await fetchProductDetail(slug);

  if (!productDetail) {
    return {};
  }

  const defaultMeta = {
    title: productDetail.product_name,
    description: productDetail.description,
  };
  return {
    ...defaultMeta,
    openGraph: {
      images: productDetail.product_image,
      ...defaultMeta,
    },
  };
}

export default async function ProductPage({ params }: { params: { slug: string[] } }) {
  return <ProductPageClient slug={params.slug} />;
};
