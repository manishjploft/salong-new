import React from "react";
import { FaCheckCircle, FaShippingFast } from "react-icons/fa";
export default function FreeShippingProgress({
  free_shipping_above,
  cartSum,
}: any) {
  //const cartSum = 1576; //1576
  const freeShipping = free_shipping_above;
  const freeShippingLeft = freeShipping - cartSum;
  //const freeShippingPercentage = (freeShippingLeft / freeShipping) * 100;
  let freeShippingPercentage;

  if (cartSum >= freeShipping) {
    freeShippingPercentage = 0; // No percentage left if the cartSum meets or exceeds freeShipping
    console.log("Du har fri frakt!");
  } else if (cartSum < 0) {
    console.log("Invalid sum. Summen kan ikke være negativ.");
  } else {
    freeShippingPercentage = (freeShippingLeft / freeShipping) * 100;
    console.log(
      `Prosent igjen før fri frakt: ${freeShippingPercentage.toFixed(2)}%`
    );
  }
  const coveredPercentage = (cartSum / freeShipping) * 100;

  const formatNumber = (num: any) => {
    return new Intl.NumberFormat("nb-NO").format(num); // 'nb-NO' for Norwegian locale
  };

  return (
    <div className="w-full max-w-md mx-auto px-8">
      <div className="flex flex-row items-center justify-center">
        <FaShippingFast size={20} className="text-gray-500 mr-2" />
        <p className="text-gray-500 text-lg font-light py-2">
          Fri frakt ved kjøp over {formatNumber(free_shipping_above)},-
        </p>
      </div>
      {cartSum < freeShipping ? (
        <>
          <div className="w-full relative rounded-full bg-background h-8">
            <div
              className={`absolute h-full rounded-full left-0 bg-secondary`}
              style={{ width: `${coveredPercentage}%` }}
            />
          </div>
          <p className="text-gray-500 font-light py-2 text-center">
            Du mangler bare {formatNumber(freeShippingLeft)},-
          </p>
        </>
      ) : (
        <div className="flex bg-green-600 rounded-full flex-row items-center justify-center">
          <FaCheckCircle size={20} className="text-white mr-2" />
          <p className="text-white text-lg font-light py-2">Du har fri frakt</p>
        </div>
      )}
    </div>
  );
}
