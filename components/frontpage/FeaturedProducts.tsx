import React from "react";
import ProductCard from "../product/ProductCard";
import { fetchFeaturedProducts } from "../../features/products/products.action";
import { products } from "@/utils/store";
import { fetchCustomerGroup } from "@/features/customer/customer.action";
import { fetchCartItems } from "@/features/cart/cart.action";

export const dynamic = "force-dynamic";

export default async function FeaturedProducts() {
  const cartItem = await fetchCartItems();
  const customerGroup = await fetchCustomerGroup();
  const products = await fetchFeaturedProducts();
  //console.log("products", products);

  // const producttest = products.find((p) => p.id === 1);
  return (
    <>
      <section className="w-full">
        <div className="p-2 xs:px-4 lg:px-10 container mx-auto w-full pt-12 pb-20">
          <h1 className="font-light text-5xl md:text-6xl text-center mb-2">
            Utforsk våre nyheter
          </h1>
          <p className="text-gray-500 text-center text-lg mb-12">
            Vi utvider stadig vårt allerede brede utvalg produkter, se våre
            nyeste produkter her
          </p>
          <div className="flex flex-wrap -m-4">
            {products?.map((item: any, i: number) => (
              <div key={i} className="w-full md:w-1/2 lg:w-1/2 2xl:w-1/4 p-4">
                <ProductCard
                  cart={
                    cartItem.find(
                      (cart: any) => cart.product_id === item.product_id
                    ) ?? null
                  }
                  product={item}
                  customerGroups={customerGroup}
                />
              </div>
            ))}
            {/* <div className="w-full md:w-1/2 lg:w-1/2 2xl:w-1/4 p-4">
              <ProductCard product={producttest} />
            </div>
            <div className="w-full md:w-1/2 lg:w-1/2 2xl:w-1/4 p-4">
              <ProductCard product={producttest} />
            </div>
            <div className="w-full md:w-1/2 lg:w-1/2 2xl:w-1/4 p-4">
              <ProductCard product={producttest} />
            </div>
            <div className="w-full md:w-1/2 lg:w-1/2 2xl:w-1/4 p-4">
              <ProductCard product={producttest} />
            </div> */}
          </div>
        </div>
      </section>
    </>
  );
}
