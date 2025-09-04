import { Suspense } from "react";
import Breadcrumbs from "@/components/Breadcrumbs";
import RelatedProducts from "@/components/product/RelatedProducts";
import { fetchProductDetail } from '@/features/products/products.action';
import { fetchCartItems } from '@/features/cart/cart.action';
import { fetchCustomerGroup } from "@/features/customer/customer.action";
import ProductDetailVariant from "./ProductDetailVariant";
import ProductDetailPrice from "./ProductDetailPrice";
import ProductGallery from "./ProductGallery";
import AddToCartButton from "@/components/product/AddToCartButton";
import ProductDetailsSkeleton from "./ProductDetailsSkeleton";
import RelatedProductsSkeleton from "./RelatedProductsSkeleton";

interface ProductPageContentProps {
  slug: string[];
}

// Generate breadcrumbs based on product category structure
function generateBreadcrumbs(products: any) {
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

  return breadcrumbs;
}

// Server component for fetching and rendering product data
async function ProductDetails({ slug }: { slug: string[] }) {
  const [products, cartItem, customerGroups] = await Promise.all([
    fetchProductDetail(slug),
    fetchCartItems(),
    fetchCustomerGroup(),
  ]);

  if (products === 404) {
    return (
      <div className="container2 mx-auto w-full flex gap-2 p-2 sm:p-4">
        <div className="text-center py-20">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">404</h1>
          <p className="text-xl text-gray-600">Product not found</p>
        </div>
      </div>
    );
  }

  const breadcrumbs = generateBreadcrumbs(products);

  return (
    <>
      <div className="container2 mx-auto w-full flex gap-2 p-2 sm:p-4">
        <Breadcrumbs items={breadcrumbs} />
      </div>

      <div className="container2 bg-white rounded-xl mt-4 shadow-md mx-auto flex flex-wrap -m-4 mb-20 py-10 md:py-10">
        <ProductGallery 
          products={products} 
          images={products.images} 
          mainImage={products.product_image} 
        />
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

            {products?.variants?.length > 0 && (
              <div className="flex flex-wrap gap-6 items-center mb-8">
                <div className="flex flex-wrap gap-4">
                  <ProductDetailVariant 
                    variants={products?.variants} 
                    productName={products.product_name} 
                  />
                </div>
              </div>
            )}

            <AddToCartButton 
              cart={cartItem.find((cart: any) => cart.product_id === products.product_id) ?? null} 
              product={products}
            />

            <div className="mt-10">
              <p className="text-gray-500 text-base md:text-lg lg:text-xl font-base mb-8 max-w-2xl">
                {products?.description}
              </p>
            </div>
          </div>
        </div>
      </div>

      {products?.realetedProducts?.length > 0 && (
        <Suspense fallback={<RelatedProductsSkeleton />}>
          <RelatedProducts 
            cartItem={cartItem} 
            products={products.realetedProducts} 
            customerGroups={customerGroups} 
          />
        </Suspense>
      )}
    </>
  );
}

// Main content component with streaming
export default function ProductPageContent({ slug }: ProductPageContentProps) {
  return (
    <Suspense fallback={<ProductDetailsSkeleton />}>
      <ProductDetails slug={slug} />
    </Suspense>
  );
}
