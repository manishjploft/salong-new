"use client";

import { useEffect } from "react";

import useProductDetailStore from "../store";

export default function ProductDetailVariant({
  variants,
  productName,
}: {
  variants: any;
  productName: string;
}) {
  

  const store = useProductDetailStore((state:any) => state);

  const handleChangeVariant = (slected_id: any) => {
    const variant = variants?.find((v:any) => v.product_id === slected_id);
    const uniquePart = variant?.product_name.replace(productName, "").trim();
    const displayName = uniquePart !== "" ? uniquePart : variant?.product_name;
    store.setSelectedVariant(
      variant ? { ...variant, name: displayName ?? "" } : null
    );
  };

  useEffect(() => {
    if (variants.length && !store.selectedVariant) {
      store.setSelectedVariant(variants[0]);
    }
  }, [variants, store]);
  return (
    variants?.map((variant: any, i: any) => {
      const uniquePart = variant.product_name.replace(productName, "").trim();
      const displayName = uniquePart !== "" ? uniquePart : variant.product_name;


      return (
        <div
          key={i}
          onClick={() => handleChangeVariant(variant?.product_id)}
          className={`flex cursor-pointer shadow-md shadow-black/5 items-center justify-center px-4 py-2 rounded-full border ${variant?.product_id === store?.selectedVariant?.product_id
            ? "bg-tertiary border-gray-200"
            : "bg-white border-gray-200 hover:bg-tertiary"
            } transition duration-200`}
        >
          {displayName}
        </div>
      );
    })
  );
}
