import { Metadata } from "next";
import Breadcrumbs from "@/components/Breadcrumbs";
import RelatedProducts from "@/components/product/RelatedProducts";
import React from "react";
import { fetchProductDetail } from '@/features/products/products.action';
import { fetchCartItems } from '@/features/cart/cart.action';
import AddToCartButton from "@/components/product/AddToCartButton";
import { fetchCustomerGroup } from "@/features/customer/customer.action";
import ProductDetailVariant from "./_components/ProductDetailVariant";
import ProductDetailPrice from "./_components/ProductDetailPrice";
import ProductGallery from "./_components/ProductGallery";


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
  const { slug } = params;
  const cartItem = await fetchCartItems();
  const customerGroups = await fetchCustomerGroup();
  const products = await fetchProductDetail(slug);

  
  let breadcrumbs: any = [];

  if (products?.category) {
    breadcrumbs = [
      {
        id: 1,
        text: products?.category?.category_name,
        link: `/kategori/${products?.category?.slug}`,
      },
      {
        id: 2,
        text: "",
        link: "",
      },
    ];
  }

  if (products?.sub_category) {
    breadcrumbs = [
      {
        id: 1,
        text: products?.category?.category_name,
        link: `/kategori/${products?.category?.slug}`,
      },
      {
        id: 2,
        text: products?.sub_category?.category_name,
        link: `/kategori/${products?.category?.slug}/${products?.sub_category?.slug}`,
      },
      {
        id: 3,
        text: "",
        link: "",
      },
    ];
  }

  if (products?.child_sub_category) {
    breadcrumbs = [
      {
        id: 1,
        text: products?.category?.category_name,
        link: `/kategori/${products?.category?.slug}`,
      },
      {
        id: 2,
        text: products?.sub_category?.category_name,
        link: `/kategori/${products?.category?.slug}/${products?.sub_category?.slug}`,
      },
      {
        id: 3,
        text: products?.child_sub_category?.category_name,
        link: `/kategori/${products?.category?.slug}/${products?.sub_category?.slug}/${products?.child_sub_category?.slug}`,
      },
      {
        id: 4,
        text: "",
        link: "",
      },
    ];
  }




  return (
    <>
      {products === 404 ? <h5>404</h5> :
        <section className="pt-6 pb-24 px-2 md:px-6 w-full bg-background">
          <div className="container2 mx-auto w-full flex gap-2 p-2 sm:p-4">
            <Breadcrumbs items={breadcrumbs} />
          </div>

          <div className="container2 bg-white rounded-xl mt-4 shadow-md mx-auto flex flex-wrap -m-4 mb-20 py-10 md:py-10">
            <ProductGallery products={products} images={products.images} mainImage={products.product_image} />
            <div className="w-full lg:w-1/2 p-1 lg:p-4">
              <div className="p-2 sm:p-4 md:p-10">
                <div className="flex flex-row gap-2">
                  {products?.isNew && (
                    <div className="w-auto flex">
                      <p className="font-base uppercase text-white bg-secondary rounded-full px-3 mb-4 py-1 text-sm sm:text-sm md:text-base">
                        NYHET
                      </p>
                    </div>
                  )}
                  {/*
                {specialPrice && (
                  <div className="w-auto flex">
                    <p className="font-base uppercase text-white bg-primary rounded-xl px-3 mb-4 py-1 text-sm sm:text-base md:text-lg">
                      TILBUD
                    </p>
                  </div>
                )}
                */}
                </div>
                <h3 className="text-lg lg:text-xl font-bold">{products.brand_name}</h3>
                <h2 className="font-heading font-light text-2xl sm:text-2xl md:text-3xl lg:text-5xl mb-8 max-w-2xl">
                  {products.product_name}
                </h2>
                <ProductDetailPrice
                  initialVariant={products?.variants?.length > 0 ? products?.variants[0] : null}
                  detail={products}
                  customerGroups={customerGroups}
                />

                {products?.variants?.length > 0 &&
                  <div className="flex flex-wrap gap-6 items-center mb-8">
                    {/* HERE WE NEED TO DISABLE VARIANT OUT OF STOCK, ALSO HAVE TO CLICK ONE TO ADD TO CART THAT TYPE, STANDARD FIRST VARIANT */}
                    <div className="flex flex-wrap gap-4">
                      <ProductDetailVariant variants={products?.variants} productName={products.product_name} />
                    </div>
                  </div>
                }

                <AddToCartButton cart={cartItem.find((cart:any) => cart.product_id === products.product_id) ?? null} product={products}
                
                
                />

                <div className="mt-10">
                  <p className="text-gray-500 text-base md:text-lg lg:text-xl font-base mb-8 max-w-2xl">
                    {products?.description}
                  </p>
                </div>
              </div>
            </div>
          </div>
          {products?.realetedProducts?.length > 0 &&
            <RelatedProducts cartItem={cartItem} products={products.realetedProducts} customerGroups={customerGroups} />
          }
        </section>
      }
    </>
  );
};
