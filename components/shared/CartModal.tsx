"use client";
import Link from "next/link";
import React, { useEffect, useRef, useState } from "react";
import FreeShippingProgress from "../FreeShippingProgress";
import { MdClose } from "react-icons/md";
import { fetchCartItems } from "@/features/cart/cart.action";
import { fetchCustomerGroup } from "@/features/customer/customer.action";
import {
  calculateProductPrice,
  calculateProductPriceByShowPrice,
  getCustomerGroupDiscount,
} from "@/utils/price.util";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { fetchSetting } from "@/features/setting/setting.action";
import CartItem from "@/features/cart/components/CartItem";

export const dynamic = "force-dynamic";

interface CartModalProps {
  visible: boolean;
  onClose: () => void;
}
//fixed top-0 right-0 w-full h-full bg-black bg-opacity-20 z-50
const CartModal: React.FC<CartModalProps> = ({ visible, onClose }) => {
  const modalRef = useRef<HTMLDivElement>(null);
  const [carts, setCarts] = useState<any[]>([]); // Replace `any` with the actual cart item type if available.
  const [loading, setLoading] = useState(true);
  const [totalAmount, setTotalAmount] = useState(0);
  const [customerGroups, setCustomerGroup] = useState([]);
  const [setting, setSetting] = useState<any>({});

  useEffect(() => {
    const fetchCustomerGroupData = async () => {
      const fetchedCustomertGroup = await fetchCustomerGroup();
      setCustomerGroup(fetchedCustomertGroup);
    };

    fetchCustomerGroupData();
  }, []);

  useEffect(() => {
    if (visible) {
      fetchloadCartItems();
    }
  }, [visible]);

  const fetchloadCartItems = async () => {
    try {
      const fetchedCarts = await fetchCartItems();

      setCarts(fetchedCarts);

      const fetchedSetting: any = await fetchSetting();

      setSetting(fetchedSetting);
    } catch (error) {
      console.error("Error fetching cart items:", error);
    } finally {
      setLoading(false);
    }
  };

  const loadCartItems = async () => {
    try {
      const fetchedCarts = await fetchCartItems();

      setCarts(fetchedCarts);
    } catch (error) {
      console.error("Error fetching cart items:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    let total = 0;

    carts.forEach((item) => {
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

      // Get the discount for the current product based on the customer group
      // const discount = getCustomerGroupDiscount(
      //   customerGroups,
      //   item.product.product_id,
      //   item.product.category_id
      // );

      // // Calculate the product prices based on the special price and discount
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

      // Add the final special price to the total amount
      if (productData.pricelist.length > 0 && productData.has_pricelist) {
        if (customer_group_name === "") {
          total +=
            item.quantity *
            (shouldShowSpecialPrice ? finalSpecialPrice : finalNormalPrice);
        } else {
          total += item.quantity * discountedPrice;
        }
      } else {
        total +=
          item.quantity *
          (shouldShowSpecialPrice ? finalSpecialPrice : finalNormalPrice);
      }
    });

    // Set the total amount
    setTotalAmount(total);
  }, [carts, customerGroups]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        modalRef.current &&
        !modalRef.current.contains(event.target as Node)
      ) {
        onClose(); // Close the modal if clicked outside
      }
    };

    if (visible) {
      document.addEventListener("mousedown", handleClickOutside); // Attach event listener
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside); // Clean up on unmount
    };
  }, [visible, onClose]);

  const formatNumber = (num: any) => {
    return new Intl.NumberFormat("nb-NO").format(num); // 'nb-NO' for Norwegian locale
  };

  if (!visible) return null;

  return (
    <>
      <div className="fixed top-0 right-0 w-full bg-black bg-opacity-25 h-full z-50">
        <div ref={modalRef} className="ml-auto w-5/6 h-full max-w-sm">
          <div className="relative p-8 w-full h-full bg-white overflow-y-auto flex flex-col ">
            <div className="flex w-full justify-between">
              <h1 className="font-heading font-light text-3xl mb-8">
                Handlekurv
              </h1>
              <div onClick={onClose} className="text-black p-2 cursor-pointer">
                <MdClose size={24} />
              </div>
            </div>
            <div className="flex h-full flex-col justify-between">
              {loading ? (
                <>
                  <div>
                    {Array.from({ length: 3 }).map((_, i) => (
                      <div
                        key={i}
                        className="pb-6 border-b border-gray-50 flex gap-5 items-center justify-start flex-wrap mb-6"
                      >
                        {/* Image Skeleton */}
                        <div>
                          <Skeleton height={70} width={70} />
                        </div>

                        {/* Content Skeleton */}
                        <div className="flex-1">
                          <div className="flex justify-between flex-wrap mb-4">
                            <Skeleton width={120} height={20} />
                            <Skeleton width={60} height={20} />
                          </div>
                          <div className="flex items-center justify-between flex-wrap">
                            <Skeleton width={100} height={20} />
                            <Skeleton width={60} height={20} />
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="pt-5 border-t border-gray-100">
                    <Skeleton height={20} width="75%" className="mb-4 ml-4" />
                    <br />

                    <div className="flex items-center justify-between flex-wrap mb-6">
                      <p className="text-xl font-semibold">
                        <Skeleton width={100} />
                      </p>
                      <p className="text-xl font-semibold text-black">
                        <Skeleton width={100} />
                      </p>
                    </div>

                    <button className="bg-primary rounded-md text-gray-100 text-sm font-semibold mb-3 hover:bg-primary/75 focus:ring-4 focus:ring-gray-200 h-12 w-full inline-flex items-center justify-center transition duration-200">
                      <Skeleton width="100%" height={48} />
                    </button>

                    <button className="bg-gray-200 rounded-md text-sm font-semibold hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 w-full h-12 inline-flex items-center justify-center transition duration-200">
                      <Skeleton width="100%" height={48} />
                    </button>
                  </div>
                </>
              ) : carts.length === 0 ? (
                <div className="text-gray-500 text-center py-40">
                  <p className="text-xl">Handlekurven din er tom 🛒</p>
                  <p className="text-sm mt-2">
                    Bla gjennom produkter og legg til varer i handlekurven
                  </p>
                </div>
              ) : (
                <>
                  <div className="product-list">
                    {carts.map((item) => {
                      return (
                        <>
                          <CartItem
                            item={item}
                            customerGroups={customerGroups}
                            loadCartItems={() => loadCartItems()}
                          />
                        </>
                      );
                    })}
                  </div>

                  <div className="pt-5 border-t border-gray-100">
                    <FreeShippingProgress
                      free_shipping_above={setting.free_shipping_above}
                      cartSum={totalAmount}
                    />
                    <br />
                    <div className="flex items-center justify-between flex-wrap mb-6">
                      <p className="text-xl font-semibold">Totalt</p>
                      <p className="text-xl font-semibold text-gray-900">
                        kr {formatNumber(totalAmount)},-
                      </p>
                    </div>
                    <Link
                      href="/handlekurv"
                      onClick={onClose}
                      className="bg-primary rounded-full text-gray-100 text-sm font-semibold mb-3 hover:bg-primary/75 focus:ring-4 focus:ring-gray-200 h-12 w-full inline-flex items-center justify-center transition duration-200"
                    >
                      Gå til handlekurv
                    </Link>
                    <Link
                      href="/bestilling"
                      onClick={onClose}
                      className="bg-gray-50 rounded-full text-sm font-semibold hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 w-full h-12 inline-flex items-center justify-center transition duration-200"
                    >
                      Fortsett å handle
                    </Link>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CartModal;
