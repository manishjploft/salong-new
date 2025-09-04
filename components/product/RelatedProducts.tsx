import React from "react";
import ProductCard from "./ProductCard";

export default function RelatedProducts({
  cartItem,
  products,
  customerGroups,
}: any) {
  return (
    <div className="w-full container2 xl:px-20 mx-auto">
      <h2 className="font-heading font-light text-4xl px-4 mb-6">
        Relaterte produkter
      </h2>
      <div className="flex flex-wrap gap-y-4 w-full justify-center items-center mx-auto -m-4">
        {products.map((product: any, i: number) => {
          return (
            <div key={i} className="w-full h-full md:w-1/2 xl:w-1/4 xs:p-4">
              <ProductCard
                cart={
                  cartItem.find(
                    (cart: any) => cart.product_id === product.product_id
                  ) ?? null
                }
                product={product}
                customerGroups={customerGroups}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
}
