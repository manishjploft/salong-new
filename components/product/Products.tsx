'use client'
import React from "react";
import ProductCard from "./ProductCard";

export default function Products({productsList, cartItems, customerGroup}: any) {

  return (
    <section className="overflow-hidden">
      <div className="py-7 md:py-14 px-4">
        <div className="flex flex-wrap -m-4">
          {productsList?.map((item: any, i: number) => {
            return (
              <div key={i} className="w-full md:w-1/2 lg:w-1/3 2xl:w-1/4 p-4">
                <ProductCard cart={cartItems?.find((cart:any) => cart.product_id === item.product_id) ?? null} product={item} customerGroups={customerGroup} />
              </div>
            )
          })}
        </div>
      </div>
    </section>
  );
}
