"use client";
import React, { useState } from "react";
import { MdOutlineShoppingBag } from "react-icons/md";

export default function ProductHoverButton({ product }: any) {
  const [isHovered, setIsHovered] = useState(false);
  return (
    <div
      className="w-full"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Conditionally render the divs based on hover state */}
      {!isHovered ? (
        <div className="w-full mb-2 bg-background rounded-full px-7 py-3 inline-flex items-center h-14 justify-between gap-2">
          <p className="inline-flex text-black items-center text-sm font-light">
            Utsalgspris til kunde
          </p>
          <p className="inline-flex text-black items-center text-lg font-normal">
            {product.costPrice},-
          </p>
        </div>
      ) : (
        <div
          // Uncomment the line below if you want to handle click events
          // onClick={addToCart}
          className="w-full cursor-pointer bg-primary text-white mb-2 border-primary border rounded-full focus:ring-4 focus:ring-gray-200 font-semibold px-7 py-4 h-14 inline-flex items-center justify-center gap-2"
        >
          <MdOutlineShoppingBag size={25} />
          <span>Legg til i handlekurv</span>
        </div>
      )}
    </div>
  );
}
