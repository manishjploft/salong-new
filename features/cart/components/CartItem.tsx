"use client";
import Image from "next/image";
import React, { FormEvent, useEffect, useState } from "react";
import {
  calculateProductPrice,
  calculateProductPriceByShowPrice,
  getCustomerGroupDiscount,
  roundNumber,
} from "@/utils/price.util";
import { useServerAction } from "zsa-react";
import { removeFromCart, updateCartItem } from "@/features/cart/cart.action";
import toast from "react-hot-toast";

function CartItem({ customerGroups, item, loadCartItems }: any) {
  const removeFromCartAction = useServerAction(removeFromCart);
  const updateCartItemAction = useServerAction(updateCartItem);

  const isPending =
    updateCartItemAction.isPending || removeFromCartAction.isPending;

  console.log("item.product.available_stock", item.product.available_stock);
  console.log("item.quantity", item.quantity);

  const isOutOfStock =
    !item.product.available_stock ||
    (item.product.available_stock &&
      item.quantity > item.product.available_stock);

  const handleDecreaseQuantity = async (
    cartItemId: string,
    quantity: number
  ) => {
    if (quantity === 1) {
      console.log("quantity", quantity);

      await removeFromCartAction.execute({ cartItemId });
      loadCartItems();
    } else {
      await updateCartItemAction.execute({
        cartItemId,
        newQuantity: quantity - 1,
      });
      loadCartItems();
    }
  };

  const handleIncreaseQuantity = async (
    cartItemId: string,
    quantity: number
  ) => {
    // if (item.quantity + quantity > item.product.available_stock) {
    if (item.quantity + 1 > item.product.available_stock) {
      toast.dismiss()
      toast.error(
        `Produktlager kun ${item.product.available_stock} tilgjengelige`
      );
      return;
    }

    const response = await updateCartItemAction.execute({
      cartItemId,
      newQuantity: quantity + 1,
    });
    loadCartItems();
  };

  const handleDelete = async (cartItemId: string) => {
    await removeFromCartAction.execute({ cartItemId });
    loadCartItems();
  };

  // New

  var shouldShowSpecialPrice: boolean = false; // Initialize with a default value
  var finalNormalPrice: number = 0;
  var finalSpecialPrice: number = 0;

  const productData = item.product;

  if (productData.pricelist.length > 0 && productData.has_pricelist) {
    var { discountedPrice, discount, customer_group_name } =
      calculateProductPriceByShowPrice({
        productData,
        customerGroups,
        priceIncVat: productData.price_inc_vat,
        isVAT: false,
      });

    if (customer_group_name === "") {
      var discount: any = getCustomerGroupDiscount(
        customerGroups,
        productData.product_id,
        productData.category_id
      );

      var {
        finalNormalPrice,
        finalSpecialPrice,
        shouldShowSpecialPrice,
        finalDiscount,
      } = calculateProductPrice({
        price: productData.price_inc_vat,
        vatrate: productData.vatrate_percent,
        isVAT: false,
        specialPrice: productData.special_price,
        customerGroupDiscount: discount ?? 0,
      });
    }
  } else {
    var discount: any = getCustomerGroupDiscount(
      customerGroups,
      productData.product_id,
      productData.category_id
    );

    var {
      finalNormalPrice,
      finalSpecialPrice,
      shouldShowSpecialPrice,
      finalDiscount,
    } = calculateProductPrice({
      price: productData.price_inc_vat,
      vatrate: productData.vatrate_percent,
      isVAT: false,
      specialPrice: productData.special_price,
      customerGroupDiscount: discount ?? 0,
    });
  }

  // New

  // const discount = getCustomerGroupDiscount(
  //     customerGroups,
  //     item.product.product_id,
  //     item.product.category_id
  // );
  // // console.log("item.product.special_price", item.product.special_price);

  // const {
  //     finalNormalPrice,
  //     finalSpecialPrice,
  //     shouldShowSpecialPrice,
  //     finalDiscount,
  // } = calculateProductPrice({
  //     price: item.product.price_inc_vat,
  //     vatrate: item.product.vatrate_percent,
  //     isVAT: true,
  //     specialPrice: item.product.special_price,
  //     customerGroupDiscount: discount ?? 0,
  // });

  const formatNumber = (num: any) => {
    return new Intl.NumberFormat("nb-NO").format(num); // 'nb-NO' for Norwegian locale
  };

  return (
    <div className="pb-6 border-b border-gray-50 flex gap-5 flex-wrap mb-6">
      <img
        className="w-20 h-20 object-contain rounded-xl"
        src={
          item.product?.product_image
            ? item.product?.product_image
            : "/assets/placeholder/gray-400-square.png"
        }
        alt="Produktbilde"
      />
      <div className="flex-1">
        <div className="flex justify-between flex-wrap mb-4">
          <p className="text-sm font-semibold w-36">
            {item.product?.product_name}
            {isOutOfStock && (
              <span className="text-red-500"> (ikke på lager)</span>
            )}
          </p>
          {productData.pricelist.length > 0 && productData.has_pricelist ? (
            customer_group_name === "" ? (
              <p className="font-semibold text-gray-900">
                Kr{" "}
                {formatNumber(
                  shouldShowSpecialPrice ? finalSpecialPrice : finalNormalPrice
                )}
                ,-
              </p>
            ) : (
              <p className="font-semibold text-gray-900">
                Kr {formatNumber(discountedPrice)},-
              </p>
            )
          ) : (
            <p className="font-semibold text-gray-900">
              Kr{" "}
              {formatNumber(
                shouldShowSpecialPrice ? finalSpecialPrice : finalNormalPrice
              )}
              ,-
            </p>
          )}
        </div>
        <div className="flex items-center justify-between flex-wrap">
          <div className="flex items-center gap-2">
            <button
              disabled={isPending}
              onClick={() => handleDecreaseQuantity(item._id, item.quantity)}
              className="bg-white border border-gray-200 rounded-full hover:bg-gray-50 focus:ring-4 focus:ring-gray-200 w-6 h-6 flex items-center justify-center transition duration-200"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width={10}
                height={2}
                viewBox="0 0 10 2"
                fill="none"
              >
                <path
                  d="M8.889 0.444458H1.11122C0.963877 0.444458 0.82257 0.50299 0.718383 0.607177C0.614196 0.711363 0.555664 0.852671 0.555664 1.00001C0.555664 1.14736 0.614196 1.28866 0.718383 1.39285C0.82257 1.49704 0.963877 1.55557 1.11122 1.55557H8.889C9.03634 1.55557 9.17765 1.49704 9.28184 1.39285C9.38602 1.28866 9.44455 1.14736 9.44455 1.00001C9.44455 0.852671 9.38602 0.711363 9.28184 0.607177C9.17765 0.50299 9.03634 0.444458 8.889 0.444458Z"
                  fill="#1E2238"
                />
              </svg>
            </button>
            <span className="text-sm font-semibold">{item.quantity}</span>
            <button
              disabled={isPending}
              onClick={() => handleIncreaseQuantity(item._id, item.quantity)}
              className="bg-white border border-gray-200 rounded-full hover:bg-gray-50 focus:ring-4 focus:ring-gray-200 w-6 h-6 flex items-center justify-center transition duration-200"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width={14}
                height={14}
                viewBox="0 0 14 14"
                fill="none"
              >
                <path
                  d="M10.889 6.44443H7.55566V3.1111C7.55566 2.96376 7.49713 2.82245 7.39295 2.71826C7.28876 2.61407 7.14745 2.55554 7.00011 2.55554C6.85277 2.55554 6.71146 2.61407 6.60727 2.71826C6.50308 2.82245 6.44455 2.96376 6.44455 3.1111V6.44443H3.11122C2.96388 6.44443 2.82257 6.50296 2.71838 6.60715C2.6142 6.71134 2.55566 6.85264 2.55566 6.99999C2.55566 7.14733 2.6142 7.28864 2.71838 7.39282C2.82257 7.49701 2.96388 7.55554 3.11122 7.55554H6.44455V10.8889C6.44455 11.0362 6.50308 11.1775 6.60727 11.2817C6.71146 11.3859 6.85277 11.4444 7.00011 11.4444C7.14745 11.4444 7.28876 11.3859 7.39295 11.2817C7.49713 11.1775 7.55566 11.0362 7.55566 10.8889V7.55554H10.889C11.0363 7.55554 11.1776 7.49701 11.2818 7.39282C11.386 7.28864 11.4446 7.14733 11.4446 6.99999C11.4446 6.85264 11.386 6.71134 11.2818 6.60715C11.1776 6.50296 11.0363 6.44443 10.889 6.44443Z"
                  fill="#1E2238"
                />
              </svg>
            </button>
          </div>
          <button
            disabled={isPending}
            onClick={() => handleDelete(item._id)}
            className="group"
          >
            <div className="flex items-center gap-1">
              <div className="text-gray-400 group-hover:text-gray-500 transition duration-200">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width={12}
                  height={14}
                  viewBox="0 0 12 14"
                  fill="none"
                >
                  <path
                    d="M4.66667 11C4.84348 11 5.01305 10.9298 5.13807 10.8048C5.2631 10.6798 5.33333 10.5102 5.33333 10.3334V6.33337C5.33333 6.15656 5.2631 5.98699 5.13807 5.86197C5.01305 5.73695 4.84348 5.66671 4.66667 5.66671C4.48986 5.66671 4.32029 5.73695 4.19526 5.86197C4.07024 5.98699 4 6.15656 4 6.33337V10.3334C4 10.5102 4.07024 10.6798 4.19526 10.8048C4.32029 10.9298 4.48986 11 4.66667 11ZM11.3333 3.00004H8.66667V2.33337C8.66667 1.80294 8.45595 1.29423 8.08088 0.919161C7.70581 0.544088 7.1971 0.333374 6.66667 0.333374H5.33333C4.8029 0.333374 4.29419 0.544088 3.91912 0.919161C3.54405 1.29423 3.33333 1.80294 3.33333 2.33337V3.00004H0.666667C0.489856 3.00004 0.320286 3.07028 0.195262 3.1953C0.0702379 3.32033 0 3.4899 0 3.66671C0 3.84352 0.0702379 4.01309 0.195262 4.13811C0.320286 4.26314 0.489856 4.33337 0.666667 4.33337H1.33333V11.6667C1.33333 12.1971 1.54405 12.7058 1.91912 13.0809C2.29419 13.456 2.8029 13.6667 3.33333 13.6667H8.66667C9.1971 13.6667 9.70581 13.456 10.0809 13.0809C10.456 12.7058 10.6667 12.1971 10.6667 11.6667V4.33337H11.3333C11.5101 4.33337 11.6797 4.26314 11.8047 4.13811C11.9298 4.01309 12 3.84352 12 3.66671C12 3.4899 11.9298 3.32033 11.8047 3.1953C11.6797 3.07028 11.5101 3.00004 11.3333 3.00004ZM4.66667 2.33337C4.66667 2.15656 4.7369 1.98699 4.86193 1.86197C4.98695 1.73695 5.15652 1.66671 5.33333 1.66671H6.66667C6.84348 1.66671 7.01305 1.73695 7.13807 1.86197C7.2631 1.98699 7.33333 2.15656 7.33333 2.33337V3.00004H4.66667V2.33337ZM9.33333 11.6667C9.33333 11.8435 9.2631 12.0131 9.13807 12.1381C9.01305 12.2631 8.84348 12.3334 8.66667 12.3334H3.33333C3.15652 12.3334 2.98695 12.2631 2.86193 12.1381C2.7369 12.0131 2.66667 11.8435 2.66667 11.6667V4.33337H9.33333V11.6667ZM7.33333 11C7.51014 11 7.67971 10.9298 7.80474 10.8048C7.92976 10.6798 8 10.5102 8 10.3334V6.33337C8 6.15656 7.92976 5.98699 7.80474 5.86197C7.67971 5.73695 7.51014 5.66671 7.33333 5.66671C7.15652 5.66671 6.98695 5.73695 6.86193 5.86197C6.7369 5.98699 6.66667 6.15656 6.66667 6.33337V10.3334C6.66667 10.5102 6.7369 10.6798 6.86193 10.8048C6.98695 10.9298 7.15652 11 7.33333 11Z"
                    fill="currentColor"
                  />
                </svg>
              </div>
              <span className="text-gray-400 text-xs font-semibold group-hover:text-gray-500 transition duration-200">
                Fjern
              </span>
            </div>
          </button>
        </div>
      </div>
    </div>
  );
}
export default CartItem;
