"use client";
import FreeShippingProgress from "@/components/FreeShippingProgress";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useServerAction } from "zsa-react";
import {
  fetchCartItems,
  updateCartItem,
  removeFromCart,
} from "@/features/cart/cart.action";
import {
  calculateProductPrice,
  calculateProductPriceByShowPrice,
  getCustomerGroupDiscount,
} from "@/utils/price.util";
import { fetchCustomerGroup } from "@/features/customer/customer.action";
import Head from "next/head";
import { fetchSetting } from "@/features/setting/setting.action";
import toast from "react-hot-toast";
export const dynamic = "force-dynamic";

const Handlekurv = () => {
  const [carts, setCarts] = useState<any[]>([]); // Replace `any` with the actual cart item type if available.
  const [totalAmount, setTotalAmount] = useState(0);
  const [subTotalAmount, setSubTotalAmount] = useState(0);
  const [subTotalAmountForShipping, setSubTotalAmountForShipping] = useState(0);
  const [totalFinalDicount, setTotalFinalDiscount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [customerGroups, setCustomerGroup] = useState([]);
  const [setting, setSetting] = useState<any>({});
  const [totalShippingCost, setTotalShippingCost] = useState(0);
  const [localQuantities, setLocalQuantities] = useState<{
    [key: string]: number;
  }>({});
  const removeFromCartAction = useServerAction(removeFromCart);
  const updateCartItemAction = useServerAction(updateCartItem);

  const isPending =
    updateCartItemAction.isPending || removeFromCartAction.isPending;

  useEffect(() => {
    // Dynamically set the title and description
    document.title = "Handlekurv"; // Set page title
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute("content", "Handlekurv");
    }
  }, []);

  useEffect(() => {
    const fetchCustomerGroupData = async () => {
      const fetchedCustomertGroup = await fetchCustomerGroup();
      setCustomerGroup(fetchedCustomertGroup);
    };

    fetchCustomerGroupData();
  }, []);

  const fetchLoadCartItems = async () => {
    try {
      const fetchedSetting: any = await fetchSetting();
      setSetting(fetchedSetting);
      const fetchedCarts = await fetchCartItems();
      setCarts(fetchedCarts);
      let total: any = 0;
      let subTotal = 0;
      let totalDiscount = 0;
      // Process each cart item
      fetchedCarts.forEach((item: any) => {
        // Get the discount for the current product based on the customer group

        // New

        var shouldShowSpecialPrice: boolean = false; // Initialize with a default value
        var finalNormalPrice: number = 0;
        var finalSpecialPrice: number = 0;
        var price: number = 0;

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
              price,
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
            price,
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
        //   customerGroups,
        //   item.product.product_id,
        //   item.product.category_id
        // );

        // // Calculate the product prices based on the special price and discount
        // const {
        //   price,
        //   finalNormalPrice,
        //   finalSpecialPrice,
        //   shouldShowSpecialPrice,
        //   finalDiscount,
        // } = calculateProductPrice({
        //   price: item.product.price_inc_vat,
        //   vatrate: item.product.vatrate_percent,
        //   isVAT: true,
        //   specialPrice: item.product.special_price,
        //   customerGroupDiscount: discount ?? 0,
        // });
        // Add the final special price to the total amount
        if (productData.pricelist.length > 0 && productData.has_pricelist) {
          if (customer_group_name === "") {
            total +=
              item.quantity *
              (shouldShowSpecialPrice ? finalSpecialPrice : finalNormalPrice);
            subTotal += item.quantity * price;
            totalDiscount +=
              (price -
                (shouldShowSpecialPrice
                  ? finalSpecialPrice
                  : finalNormalPrice)) *
              item.quantity;
          } else {
            total += item.quantity * discountedPrice;
            subTotal +=
              item.quantity * (discount === 0 ? discountedPrice : discount);
            totalDiscount +=
              ((discount === 0 ? discountedPrice : discount) -
                discountedPrice) *
              item.quantity;
          }
        } else {
          total +=
            item.quantity *
            (shouldShowSpecialPrice ? finalSpecialPrice : finalNormalPrice);
          subTotal += item.quantity * price;
          totalDiscount +=
            (price -
              (shouldShowSpecialPrice ? finalSpecialPrice : finalNormalPrice)) *
            item.quantity;
        }
      });

      if (total < fetchedSetting.free_shipping_above) {
        const shipping_cost_percentage =
          fetchedSetting.shipping_cost_percentage;
        const shipping_cost = shipping_cost_percentage; // Calculate the shipping cost based on the percentage
        const newTotalAmount = parseFloat(total); // Add the shipping cost to the total
        setTotalShippingCost(shipping_cost);
        setTotalAmount(newTotalAmount); // Set the new total amount with the shipping cost added
      } else {
        setTotalShippingCost(0);
        setTotalAmount(total);
      }
      // Set the calculated total amount
      setSubTotalAmount(subTotal);
      setSubTotalAmountForShipping(total);
      setTotalFinalDiscount(totalDiscount);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching cart items:", error);
    }
  };

  const loadCartItems = async () => {
    try {
      const fetchedCarts = await fetchCartItems();
      setCarts(fetchedCarts);
      let total: any = 0;
      let subTotal = 0;
      let totalDiscount = 0;
      // Process each cart item
      fetchedCarts.forEach((item: any) => {
        // Get the discount for the current product based on the customer group
        // const discount = getCustomerGroupDiscount(
        //   customerGroups,
        //   item.product.product_id,
        //   item.product.category_id
        // );
        // // Calculate the product prices based on the special price and discount
        // const {
        //   price,
        //   finalNormalPrice,
        //   finalSpecialPrice,
        //   shouldShowSpecialPrice,
        //   finalDiscount,
        // } = calculateProductPrice({
        //   price: item.product.price_inc_vat,
        //   vatrate: item.product.vatrate_percent,
        //   isVAT: true,
        //   specialPrice: item.product.special_price,
        //   customerGroupDiscount: discount ?? 0,
        // });

        // New

        var shouldShowSpecialPrice: boolean = false; // Initialize with a default value
        var finalNormalPrice: number = 0;
        var finalSpecialPrice: number = 0;
        var price: number = 0;

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
              price,
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
            price,
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

        if (productData.pricelist.length > 0 && productData.has_pricelist) {
          if (customer_group_name === "") {
            total +=
              item.quantity *
              (shouldShowSpecialPrice ? finalSpecialPrice : finalNormalPrice);
            subTotal += item.quantity * price;
            totalDiscount +=
              (price -
                (shouldShowSpecialPrice
                  ? finalSpecialPrice
                  : finalNormalPrice)) *
              item.quantity;
          } else {
            total += item.quantity * discountedPrice;
            subTotal += item.quantity * discount;
            totalDiscount += (discount - discountedPrice) * item.quantity;
          }
        } else {
          total +=
            item.quantity *
            (shouldShowSpecialPrice ? finalSpecialPrice : finalNormalPrice);
          subTotal += item.quantity * price;
          totalDiscount +=
            (price -
              (shouldShowSpecialPrice ? finalSpecialPrice : finalNormalPrice)) *
            item.quantity;
        }

        // Add the final special price to the total amount
        // total += item.quantity * (shouldShowSpecialPrice ? finalSpecialPrice : finalNormalPrice);
        // subTotal += item.quantity * price;
        // totalDiscount += (price - (shouldShowSpecialPrice ? finalSpecialPrice : finalNormalPrice)) * item.quantity;
      });

      if (total < setting.free_shipping_above) {
        const shipping_cost_percentage = setting.shipping_cost_percentage;
        const shipping_cost = shipping_cost_percentage; // Calculate the shipping cost based on the percentage
        const newTotalAmount = parseFloat(total) + parseFloat(shipping_cost); // Add the shipping cost to the total
        setTotalShippingCost(shipping_cost);
        setTotalAmount(newTotalAmount); // Set the new total amount with the shipping cost added
      } else {
        setTotalShippingCost(0);
        setTotalAmount(total);
      }

      // Set the calculated total amount
      setSubTotalAmount(subTotal);
      setSubTotalAmountForShipping(total);
      setTotalFinalDiscount(totalDiscount);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching cart items:", error);
    }
  };

  useEffect(() => {
    fetchLoadCartItems();
  }, [customerGroups]);

  const handleDecreaseQuantity = async (
    cartItemId: string,
    quantity: number
  ) => {
    if (quantity === 1) {
      await removeFromCartAction.execute({ cartItemId });
      fetchLoadCartItems();
    } else {
      await updateCartItemAction.execute({
        cartItemId,
        newQuantity: quantity - 1,
      });
      fetchLoadCartItems();
    }
  };

  const handleIncreaseQuantity = async (
    cartItemId: string,
    quantity: number,
    productQuantity: any,
    cureentQuantity: any,

  ) => {
    if (cureentQuantity + 1 > productQuantity) {
      toast.dismiss()
      toast.error(`Produktlager kun ${productQuantity} tilgjengelige`);
      return;
    }

    await updateCartItemAction.execute({
      cartItemId,
      newQuantity: quantity + 1,
    });
    fetchLoadCartItems();
  };

  const handleDelete = async (cartItemId: string) => {
    await removeFromCartAction.execute({ cartItemId });
    fetchLoadCartItems();
  };

  // const handleUpdateQuantity = async (cartItemId: string) => {

  //   const newQuantity = localQuantities[cartItemId];

  //   if (newQuantity > 0) {
  //     await updateCartItemAction.execute({
  //       cartItemId,
  //       newQuantity,
  //     });
  //     loadCartItems(); // Reload cart items to reflect the changes
  //     toast.success("Handlekurven er oppdatert");
  //   }
  // };

  const handleUpdateQuantity = async () => {
    try {
      // Iterate over the cart items sequentially
      for (const item of carts) {
        const newQuantity = localQuantities[item._id];
        if (newQuantity > 0) {
          // Update the cart item
          await updateCartItemAction.execute({
            cartItemId: item._id,
            newQuantity,
          });
        }
      }
      // Reload cart items after each update
      await fetchLoadCartItems();

      // Optionally, show a toast for each item update
      toast.success(`Handlekurven er oppdatert`);
    } catch (error) {
      console.error("Error updating cart item:", error);
      throw error; // Re-throw the error to handle it in the button's onClick
    }
  };

  const truncateText = (text: string, wordLimit: number) => {
    if (!text) return ""; // Handle undefined or null text
    const words = text.split(" "); // Split the text into words
    return words.length > wordLimit
      ? `${words.slice(0, wordLimit).join(" ")}...` // Join the first `wordLimit` words and add ellipsis
      : text; // Return the full text if it's within the limit
  };

  const formatNumber = (num: any) => {
    return new Intl.NumberFormat("nb-NO").format(num); // 'nb-NO' for Norwegian locale
  };

  return (
    <>
      <Head>
        <title>Handlekurv</title>
        <meta name="description" content="Handlekurv" />
      </Head>
      <section className="w-full bg-white">
        <div className="px-5 md:px-10 pt-10 pb-24 mx-auto container2">
          <h1 className="font-heading font-light text-3xl md:text-4xl xl:text-5xl mb-10">
            Handlekurv
          </h1>
          <div className="border border-gray-200 rounded-2xl w-full px-5 md:px-10 py-10">
            {carts.length === 0 && !loading ? (
              <div className="text-gray-500 text-center py-40">
                <p className="text-xl">Handlekurven din er tom 🛒</p>
                <p className="text-sm mt-2">
                  Bla gjennom produkter og legg til varer i handlekurven
                </p>
              </div>
            ) : (
              <>
                <div className="flex flex-wrap -m-4 items-center mb-20">
                  <div className="w-full lg:w-8/12 p-2 xs:p-4">
                    <div className="overflow-hidden">
                      <div className="overflow-x-auto">
                        <table className="table-auto w-full">
                          <thead>
                            <tr>
                              <th className="whitespace-nowrap pb-4 border-b border-gray-200 text-2xl font-light">
                                Produkt
                              </th>
                              <th className="whitespace-nowrap pb-4 border-b border-gray-200 text-2xl font-light">
                                Pris
                              </th>
                              <th className="whitespace-nowrap pb-4 border-b border-gray-200 text-2xl font-light">
                                Antall
                              </th>
                              <th className="whitespace-nowrap pb-4 border-b border-gray-200 text-2xl font-light">
                                Total
                              </th>
                              <th className="whitespace-nowrap pb-4 border-b border-gray-200 text-2xl font-light"></th>
                            </tr>
                          </thead>
                          <tbody>
                            {carts.map((item, i) => {
                              // const discount = getCustomerGroupDiscount(
                              //   customerGroups,
                              //   item.product.product_id,
                              //   item.product.category_id
                              // );
                              // const {
                              //   finalNormalPrice,
                              //   finalSpecialPrice,
                              //   shouldShowSpecialPrice,
                              //   finalDiscount,
                              // } = calculateProductPrice({
                              //   price: item.product.price_inc_vat,
                              //   vatrate: item.product.vatrate_percent,
                              //   isVAT: true,
                              //   specialPrice: item.product.special_price,
                              //   customerGroupDiscount: discount ?? 0,
                              // });

                              // New

                              var shouldShowSpecialPrice: boolean = false; // Initialize with a default value
                              var finalNormalPrice: number = 0;
                              var finalSpecialPrice: number = 0;

                              const productData = item.product;

                              if (
                                productData.pricelist.length > 0 &&
                                productData.has_pricelist
                              ) {
                                var {
                                  discountedPrice,
                                  discount,
                                  customer_group_name,
                                } = calculateProductPriceByShowPrice({
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

                              const isOutOfStock =
                                !item.product.available_stock ||
                                (item.product.available_stock &&
                                  item.quantity > item.product.available_stock);
                              return (
                                <tr key={i}>
                                  <td className="py-4 border-b border-gray-200 flex items-center gap-10 h-40 pr-4">
                                    <img
                                      className="rounded-2xl object-contain aspect-square"
                                      style={{ height: 130 }}
                                      src={
                                        item?.product?.product_image ||
                                        "/assets/placeholder/gray-400-square.png"
                                      }
                                      alt={item?.product?.product_name}
                                    />
                                    <p className="text-lg font-semibold">
                                      {truncateText(
                                        item?.product?.product_name,
                                        3
                                      )}
                                      {isOutOfStock && (
                                        <span className="text-red-500">
                                          {" "}
                                          (ikke på lager)
                                        </span>
                                      )}
                                    </p>
                                  </td>
                                  <td className="py-4 border-b border-gray-200 h-40 px-4">
                                    {productData.pricelist.length > 0 &&
                                      productData.has_pricelist ? (
                                      customer_group_name === "" ? (
                                        <p className="text-lg font-semibold text-center">
                                          kr{" "}
                                          {formatNumber(
                                            shouldShowSpecialPrice
                                              ? finalSpecialPrice
                                              : finalNormalPrice
                                          )}
                                          ,-
                                        </p>
                                      ) : (
                                        <p className="text-lg font-semibold text-center">
                                          kr {formatNumber(discountedPrice)},-
                                        </p>
                                      )
                                    ) : (
                                      <p className="text-lg font-semibold text-center">
                                        kr{" "}
                                        {formatNumber(
                                          shouldShowSpecialPrice
                                            ? finalSpecialPrice
                                            : finalNormalPrice
                                        )}
                                        ,-
                                      </p>
                                    )}
                                  </td>
                                  <td className="py-4 border-b border-gray-200 h-40 px-4">
                                    <div className="flex items-center justify-center gap-4">
                                      <button
                                        disabled={isPending}
                                        onClick={() =>
                                          handleDecreaseQuantity(
                                            item._id,
                                            item.quantity
                                          )
                                        }
                                        className="bg-white border border-gray-200 rounded-full hover:bg-gray-50 focus:ring-4 focus:ring-gray-200 w-9 h-9 flex items-center justify-center transition duration-200"
                                      >
                                        <svg
                                          xmlns="http://www.w3.org/2000/svg"
                                          width={20}
                                          height={20}
                                          viewBox="0 0 20 20"
                                          fill="none"
                                        >
                                          <path
                                            d="M15.8333 9.16667H4.16659C3.94557 9.16667 3.73361 9.25446 3.57733 9.41074C3.42105 9.56702 3.33325 9.77899 3.33325 10C3.33325 10.221 3.42105 10.433 3.57733 10.5893C3.73361 10.7455 3.94557 10.8333 4.16659 10.8333H15.8333C16.0543 10.8333 16.2662 10.7455 16.4225 10.5893C16.5788 10.433 16.6666 10.221 16.6666 10C16.6666 9.77899 16.5788 9.56702 16.4225 9.41074C16.2662 9.25446 16.0543 9.16667 15.8333 9.16667Z"
                                            fill="#1E2238"
                                          />
                                        </svg>
                                      </button>
                                      <input
                                        disabled
                                        type="number"
                                        value={
                                          localQuantities[item._id] ||
                                          item.quantity
                                        }
                                        min="1"
                                        // onChange={(e) => {
                                        //   const newQuantity = parseInt(
                                        //     e.target.value
                                        //   );
                                        //   if (newQuantity > 0) {
                                        //     setLocalQuantities((prev) => ({
                                        //       ...prev,
                                        //       [item._id]: newQuantity, // Update local state
                                        //     }));
                                        //   }
                                        // }}
                                        className="w-16 text-center border border-gray-200 rounded-md"
                                      />

                                      <button
                                        disabled={isPending}
                                        onClick={() =>
                                          handleIncreaseQuantity(
                                            item._id,
                                            item.quantity,
                                            item.product.available_stock,
                                            item.quantity,
                                            
                                          )
                                        }
                                        className="bg-white border border-gray-200 rounded-full hover:bg-gray-50 focus:ring-4 focus:ring-gray-200 w-9 h-9 flex items-center justify-center transition duration-200"
                                      >
                                        <svg
                                          xmlns="http://www.w3.org/2000/svg"
                                          width={20}
                                          height={20}
                                          viewBox="0 0 20 20"
                                          fill="none"
                                        >
                                          <path
                                            d="M15.8334 9.16667H10.8334V4.16667C10.8334 3.94565 10.7456 3.73369 10.5893 3.57741C10.433 3.42113 10.2211 3.33333 10 3.33333C9.77903 3.33333 9.56707 3.42113 9.41079 3.57741C9.2545 3.73369 9.16671 3.94565 9.16671 4.16667V9.16667H4.16671C3.94569 9.16667 3.73373 9.25446 3.57745 9.41074C3.42117 9.56702 3.33337 9.77899 3.33337 10C3.33337 10.221 3.42117 10.433 3.57745 10.5893C3.73373 10.7455 3.94569 10.8333 4.16671 10.8333H9.16671V15.8333C9.16671 16.0543 9.2545 16.2663 9.41079 16.4226C9.56707 16.5789 9.77903 16.6667 10 16.6667C10.2211 16.6667 10.433 16.5789 10.5893 16.4226C10.7456 16.2663 10.8334 16.0543 10.8334 15.8333V10.8333H15.8334C16.0544 10.8333 16.2663 10.7455 16.4226 10.5893C16.5789 10.433 16.6667 10.221 16.6667 10C16.6667 9.77899 16.5789 9.56702 16.4226 9.41074C16.2663 9.25446 16.0544 9.16667 15.8334 9.16667Z"
                                            fill="#1E2238"
                                          />
                                        </svg>
                                      </button>
                                    </div>
                                  </td>
                                  <td className="py-4 border-b border-gray-200 h-40 px-4">
                                    {productData.pricelist.length > 0 &&
                                      productData.has_pricelist ? (
                                      customer_group_name === "" ? (
                                        <p className="text-lg font-semibold text-center">
                                          kr{" "}
                                          {formatNumber(
                                            item.quantity *
                                            (shouldShowSpecialPrice
                                              ? finalSpecialPrice
                                              : finalNormalPrice)
                                          )}
                                          ,-
                                        </p>
                                      ) : (
                                        <p className="text-lg font-semibold text-center">
                                          kr{" "}
                                          {formatNumber(
                                            item.quantity * discountedPrice
                                          )}
                                          ,-
                                        </p>
                                      )
                                    ) : (
                                      <p className="text-lg font-semibold text-center">
                                        kr{" "}
                                        {formatNumber(
                                          item.quantity *
                                          (shouldShowSpecialPrice
                                            ? finalSpecialPrice
                                            : finalNormalPrice)
                                        )}
                                        ,-
                                      </p>
                                    )}
                                  </td>
                                  <td className="py-4 border-b border-gray-200 h-40 px-4">
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
                                  </td>
                                </tr>
                              );
                            })}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                  <div className="w-full lg:w-4/12 p-2 xs:p-4">
                    <div className="border border-gray-200 rounded-2xl py-10 px-6">
                      <h3 className="font-heading font-light mb-6 text-2xl xs:text-3xl">
                        Ordre sammendrag
                      </h3>
                      <form action="#" className="hidden">
                        <div className="flex flex-wrap gap-4 mb-6">
                          <input
                            className="border border-gray-200 rounded-full py-3 px-4 focus:border-gray-300 focus:ring focus:ring-gray-100 outline-none transition duration-200 flex-1"
                            type="text"
                            placeholder="Rabattkode"
                          />
                          <button
                            type="submit"
                            className="bg-white border border-gray-200 rounded-full hover:bg-gray-50 focus:ring-4 focus:ring-gray-200 px-4 py-3 h-12 text-sm font-semibold inline-block transition duration-200"
                          >
                            Legg til
                          </button>
                        </div>
                      </form>
                      <div className="flex items-center justify-between flex-wrap mb-4">
                        <p className="text-gray-600">Delsum</p>
                        <p className="font-semibold">
                          kr {formatNumber(subTotalAmount)},-
                        </p>
                      </div>
                      {totalFinalDicount > 0 && (
                        <div className="flex items-center justify-between flex-wrap mb-4">
                          <p className="text-gray-600">Rabatt</p>
                          <p className="font-semibold">
                            - kr {formatNumber(totalFinalDicount)},-
                          </p>
                        </div>
                      )}
                      {/* <div className="flex items-center justify-between flex-wrap mb-4">
                    <p className="text-gray-600">Frakt</p>
                    <p className="font-semibold">kr {formatNumber(totalShippingCost)},-</p>
                  </div> */}
                      {/* <div className="flex items-center justify-between flex-wrap pb-4 border-b border-dashed border-gray-300 mb-4">
                    <p className="text-gray-600">MVA</p>
                    <p className="font-semibold">kr 0,-</p>
                  </div> */}
                      <div className="flex items-center justify-between flex-wrap mb-10">
                        <p className="text-gray-600">Total</p>
                        <p className="font-semibold text-lg">
                          kr {formatNumber(totalAmount)},-
                        </p>
                      </div>
                      <div className="flex justify-center">
                        <Link
                          href="/bestilling"
                          className="bg-primary rounded-full hover:bg-primary/75 focus:ring-4 focus:ring-gray-200 h-12 px-4 py-3 text-sm font-semibold text-white inline-flex items-center transition duration-200"
                        >
                          Videre til bestilling
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
                <FreeShippingProgress
                  free_shipping_above={setting.free_shipping_above}
                  cartSum={subTotalAmountForShipping || 0}
                />
                <br />
                <div className="flex justify-center">
                  <button
                    onClick={() => handleUpdateQuantity()}
                    className="bg-white border border-gray-200 rounded-full hover:bg-gray-50 focus:ring-4 focus:ring-gray-200 px-4 py-3 h-12 text-sm font-semibold inline-flex items-center transition duration-200"
                    disabled={isPending}
                  >
                    {isPending ? "oppdatering..." : "Oppdater handlekurv"}
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      </section>
      {loading && (
        <div className="loaderContainer">
          <div className="loader"></div>
        </div>
      )}
    </>
  );
};

export default Handlekurv;
