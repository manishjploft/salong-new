"use client";
import Link from "next/link";
import React, { useState } from "react";
import { MdOutlineShoppingBag } from "react-icons/md";
import { useServerAction } from 'zsa-react';
import toast from 'react-hot-toast';
import { useSession } from 'next-auth/react';
import { PiMinus, PiPlus } from "react-icons/pi";
import { useRouter } from 'next/navigation';
import { BiUser } from "react-icons/bi";
import { calculateProductPrice, calculateProductPriceByShowPrice, getCustomerGroupDiscount } from "@/utils/price.util";
import { addToCart } from '@/features/cart/cart.action';

export default function ProductCard({ cart, product, customerGroups }: any) {
  const { isPending, execute } = useServerAction(addToCart);
  const session = useSession();

  const [count, setCount] = useState(1);
  const [isNew, setIsNew] = useState(false);

  const incrementCount = (product: any) => {
 
    if (product?.available_stock <= count) {
      toast.dismiss()
      toast.error(`Produktlager kun ${count} tilgjengelige`);
      return;
    }
    else {
      setCount(count + 1);
    }
  };

  const decrementCount = () => {

    if (count > 1) {
      setCount(count - 1);
    }
  };

  const router = useRouter();

  const stock = product.available_stock || 0;

  const isOutOfStock = !!(
    stock === 0 ||
    (stock && stock <= (cart?.quantity ?? 0))
  );

  const handleAddToCart = async () => {

    if (session.status === "authenticated") {
      if ((cart?.quantity + count) > product.available_stock) {
        toast.error(`Produktlager kun ${product.available_stock} tilgjengelige`);
        return;
      } else if (product?.variants?.length > 0) {
        router.push(`/produkter/${product?.slug}`);
      } else if (product.available_stock < count) {
        toast.error(`Produktlager kun ${product.available_stock} tilgjengelige`);
      } else {

        const [data, err] = await execute({ productId: product.product_id, quantity: count });
        toast.dismiss()
        if (data?.status === '200') {
          toast.success("Produktet er lagt til i handlekurven!");
        } else {
          toast.error(data?.msg);
        }
      }
    } else {
      // Redirect to login page if the user is not authenticated
      router.push('/logg-inn');
    }
  };

  // Function to find the highest discounted variant
  function getVariantWithHighestDiscount() {
    let lowestPrice = Infinity;
    let bestVariant = null;

    product?.variants?.forEach((variant: any) => {
      const price = parseFloat(variant.price_inc_vat);
      if (!isNaN(price) && price < lowestPrice) {
        lowestPrice = price;
        bestVariant = variant;
      }
    });

    return { bestVariant, lowestPrice };
  }


  const { bestVariant, lowestPrice } = getVariantWithHighestDiscount();

  let productData =
    product?.variants?.length > 0
      ? bestVariant
        ? bestVariant
        : product
      : product;

  console.log(product.product_name, bestVariant);


  var shouldShowSpecialPrice: boolean = false; // Initialize with a default value
  var finalNormalPrice: number = 0;
  var finalSpecialPrice: number = 0;

  if (productData.pricelist.length > 0 && productData.has_pricelist) {
    var {
      discountedPrice,
      discount,
      customer_group_name
    } = calculateProductPriceByShowPrice({
      productData,
      customerGroups,
      priceIncVat: productData.price_inc_vat,
      isVAT: false
    })

    if (customer_group_name === "") {

      var discount: any = getCustomerGroupDiscount(
        customerGroups,
        productData.product_id,
        product.category_id
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
      product.category_id
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
  console.log(productData.product_name, productData);


  return (
    <div
      className={`w-full bg-white rounded-2xl shadow-lg shadow-black/10 overflow-hidden max-w-[560px] ${session.status === "authenticated" ? "max-h-[620px]" : "max-h-[580px]"
        }`}
    >
      <div className="group p-6">
        <Link href={`/produkt/${product.slug}`}>
          <div className="overflow-hidden mb-2 relative h-[330px]">
            <img
              className="object-contain w-full h-full transform hover:scale-05 transition duration-200"
              src={product.product_image || product.mainImage}
              alt={product?.product_name}
            />
            {productData.pricelist.length > 0 && productData.has_pricelist ?
              discount &&
              <div className="absolute top-2 right-2">
                <div className="bg-primary text-sm text-white rounded-full px-3 py-1 flex items-center justify-center">
                  TILBUD
                </div>
              </div>
              :
              shouldShowSpecialPrice && (
                <div className="absolute top-2 right-2">
                  <div className="bg-primary text-sm text-white rounded-full px-3 py-1 flex items-center justify-center">
                    TILBUD
                  </div>
                </div>
              )}
            {isNew && (
              <div className="absolute top-2 left-2">
                <div className="bg-secondary text-sm text-white rounded-full uppercase px-3 py-1 flex items-center justify-center">
                  Nyhet
                </div>
              </div>
            )}
          </div>
        </Link>
        <div
          className={`bg-white ${session.status === "authenticated"
            ? //? "group-hover:-translate-y-14 translate-y-[66px]" //ved 700h
            //"group-hover:-translate-y-40 -translate-y-[40px]" //ved 600
            "group-hover:-translate-y-32 -translate-y-[10px]"
            : //"group-hover:-translate-y-0 translate-y-[120px]"//ved 700h
            "group-hover:-translate-y-28 translate-y-[12px]" // ved 580
            } transition duration-300 relative`}
        >
          <div className="w-full group-hover:shadow-lg shadow-white h-3 z-40 rotate-180" />
          <div className="absolute -top-8 opacity-0 group-hover:opacity-100 left-0 w-full duration-300 ease-in-out transition-all bg-gradient-to-t from-white to-transparent h-8" />
          <Link href={`/produkt/${product.slug}`} className="w-full">
            <div className="mb-4">
              <p className="font-semibold min-h-10">{product.brand_name || product.brand}</p>
              <p className="text-lg xs:text-xl font-light line-clamp-2 min-h-14">
                {product.product_name || product.title}
              </p>
            </div>
            <div className="flex items-center justify-between flex-wrap gap-2 pb-6">
              {session.status === "authenticated" && (
                productData.pricelist.length > 0 && productData.has_pricelist ?
                  customer_group_name === "" ?
                    <div className="flex items-center flex-wrap gap-1">
                      {shouldShowSpecialPrice ? (
                        <h3 className="text-primary text-4xl font-heading">
                          kr {finalSpecialPrice},-
                        </h3>
                      ) : (
                        <h3 className="text-primary text-4xl font-heading">
                          kr {finalNormalPrice},-
                        </h3>
                      )}
                      {discount > 0 && (
                        <p className={`text-gray-500 text-sm pl-1 line-through`}>
                          {!shouldShowSpecialPrice ? (
                            <>
                              {finalSpecialPrice},-
                            </>
                          ) : (
                            <>
                              {finalNormalPrice},-
                            </>
                          )}
                        </p>
                      )}
                    </div>
                    :
                    <div className="flex items-center flex-wrap gap-1">
                      <h3 className="text-primary text-4xl font-heading">
                        kr {discountedPrice},-
                      </h3>
                      {discount > 0 &&
                        <p className={`text-gray-500 text-sm pl-1 ${discount && "line-through"
                          }`}>
                          {discount},-
                        </p>
                      }
                    </div>
                  :
                  <div className="flex items-center flex-wrap gap-1">
                    {shouldShowSpecialPrice ? (
                      <h3 className="text-primary text-4xl font-heading">
                        kr {finalSpecialPrice},-
                      </h3>
                    ) : (
                      <h3 className="text-primary text-4xl font-heading">
                        kr {finalNormalPrice},-
                      </h3>
                    )}
                    {/* {shouldShowSpecialPrice && (finalNormalPrice ||
                      +finalNormalPrice === 0) && (
                        <p className={`text-gray-500 text-sm pl-1 ${shouldShowSpecialPrice && "line-through"
                          }`}>
                          {finalNormalPrice},-
                        </p>
                      )} */}
                    {discount > 0 && (
                      <p className={`text-gray-500 text-sm pl-1 line-through`}>
                        {!shouldShowSpecialPrice ? (
                          <>
                            {finalSpecialPrice},-
                          </>
                        ) : (
                          <>
                            {finalNormalPrice},-
                          </>
                        )}
                      </p>
                    )}
                  </div>
              )}
            </div>

            <div className="w-full mb-2 bg-background select-none rounded-full px-7 py-3 inline-flex items-center justify-between gap-2">
              <p className="inline-flex text-black items-center text-sm font-light">
                Utsalgspris til kunde
              </p>
              <p className="inline-flex text-black items-center text-lg font-normal">
                {productData.price_inc_vat || 0},-
              </p>
            </div>
          </Link>
          {/*<ProductHoverButton product={product} />*/}

          {session.status === "authenticated" ? (
            <>
              {product?.variants?.length > 0 ? (
                <>
                  <div className="mt-6">
                    <Link href={`/produkt/${product.slug}`} className="">
                      <div className="group-hover: inline-flex cursor-pointer w-full bg-primary text-white mb-2 border-primary hover:bg-white hover:text-primary border rounded-full focus:ring-4 focus:ring-gray-200 font-semibold px-7 py-4 h-14 items-center justify-center gap-2 transition duration-200">
                        <span>Velg variant</span>
                      </div>
                    </Link>
                  </div>

                </>
              ) : (
                <>
                  {isOutOfStock ? (
                    <div className="flex flex-col justify-start gap-4 items-start bg-tertiary p-4 my-4 rounded-2xl">
                      <div className="flex flex-col">
                        <p className="text-black text-base font-base mb-0">
                          Varen er dessverre ikke på lager.
                        </p>
                        <p className="hidden text-black text-xs font-base mb-0">
                          Registrere deg for å få beskjed når det er tilgjengelig
                          igjen.
                        </p>
                      </div>
                      <Link
                        href={`/produkt/${product.slug}`}
                        className="bg-primary whitespace-nowrap rounded-full w-full hover:bg-secondary focus:ring-4 focus:ring-gray-200 text-white font-semibold px-4 py-2 flex items-center justify-center gap-2 transition duration-200"
                      >
                        <span>Gi meg beskjed</span>
                      </Link>
                    </div>
                  ) : (
                    <>
                      <div className="flex flex-row justify-center select-none items-center my-4 gap-2">
                        <div
                          onClick={decrementCount}
                          className={`rounded-full p-1 bg-background text-black border-gray-200 ${count === 1
                            ? "cursor-not-allowed"
                            : "cursor-pointer hover:bg-primary hover:text-white"
                            }`}
                        >
                          <PiMinus size={16} />
                        </div>
                        <p className="inline-flex text-black items-center text-sm font-light">
                          {count}
                        </p>
                        <div
                          onClick={() => { incrementCount(product) }}
                          className="rounded-full p-1 bg-background cursor-pointer"
                        >
                          <PiPlus size={16} />
                        </div>
                      </div>
                      {isPending ?
                        <div className="group-hover: inline-flex cursor-pointer w-full bg-primary text-white mb-2 border-primary hover:bg-white hover:text-primary border rounded-full focus:ring-4 focus:ring-gray-200 font-semibold px-7 py-4 h-14 items-center justify-center gap-2 transition duration-200">
                          <MdOutlineShoppingBag size={25} />

                          <span>lagt til...</span>
                        </div>
                        :
                        <div onClick={handleAddToCart} className="group-hover: inline-flex cursor-pointer w-full bg-primary text-white mb-2 border-primary hover:bg-white hover:text-primary border rounded-full focus:ring-4 focus:ring-gray-200 font-semibold px-7 py-4 h-14 items-center justify-center gap-2 transition duration-200">
                          <MdOutlineShoppingBag size={25} />

                          <span>Legg til i handlekurv</span>
                        </div>
                      }
                    </>
                  )}
                </>
              )}
            </>
          ) : (
            <div className="flex flex-col gap-2 mt-2">
              <Link
                href="/logg-inn"
                className="group-hover: inline-flex cursor-pointer w-full bg-primary text-white border-primary hover:bg-white hover:text-primary border rounded-full focus:ring-4 focus:ring-gray-200 font-semibold px-7 py-4 h-14 items-center justify-center gap-2 transition duration-200"
              >
                <BiUser size={25} />

                <span>Logg inn</span>
              </Link>
              <Link
                href="/bli-forhandler"
                className="w-full text-center mt-2 hover:underline underline-offset-4"
              >
                <p>Bli forhandler</p>
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
