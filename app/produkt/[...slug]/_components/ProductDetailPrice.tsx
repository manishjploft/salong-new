"use client";
import { useEffect, useState, useRef, useMemo } from "react";
import {
    calculateProductPrice,
    calculateProductPriceByShowPrice,
    getCustomerGroupDiscount,
} from "@/utils/price.util";
import useProductDetailStore from "../store";
import { useSession } from 'next-auth/react';

export default function ProductDetailPrice({
    detail,
    initialVariant,
    customerGroups
}: {
    detail: any;
    initialVariant: any | null;
    customerGroups: any;
}) {
    const session = useSession();
    const isVAT = true;
    const [isLoading, setLoading] = useState(false);

    const [discountDuell, setDiscountDuell] = useState(0);


    const { special_price, price_inc_vat, vatrate_percent, pricelist, has_pricelist } = initialVariant ? initialVariant : detail;

    const selectedVariant = useProductDetailStore(
        (state) => state.selectedVariant
    );

    // Create a ref to hold the latest selectedVariant
    const selectedVariantRef = useRef(selectedVariant);

    // Update the ref whenever selectedVariant changes
    useEffect(() => {
        selectedVariantRef.current = selectedVariant;
    }, [selectedVariant]);

    // Memoize product values to prevent unnecessary recalculations
    const { productPrice, productVatrate, productSpecialPrice } = useMemo(() => ({
        productPrice: selectedVariant ? selectedVariant.price_inc_vat : price_inc_vat,
        productVatrate: selectedVariant ? selectedVariant.vatrate_percent : vatrate_percent,
        productSpecialPrice: selectedVariant ? selectedVariant.special_price : special_price,
    }), [selectedVariant, price_inc_vat, vatrate_percent, special_price]);


    //new 

    var shouldShowSpecialPrice: boolean = false; // Initialize with a default value
    var finalNormalPrice: number = 0;
    var finalSpecialPrice: number = 0;

    if (pricelist.length > 0 && has_pricelist) {

        var {
            discountedPrice,
            discount,
            customer_group_name
        } = calculateProductPriceByShowPrice({
            productData: { pricelist, vatrate_percent },
            customerGroups,
            priceIncVat: productPrice,
            isVAT: false
        })

        if (customer_group_name === "") {

            var {
                finalNormalPrice,
                finalSpecialPrice,
                shouldShowSpecialPrice,
                finalDiscount,
            } = calculateProductPrice({
                price: productPrice,
                vatrate: productVatrate,
                isVAT: false,
                specialPrice: productSpecialPrice,
                customerGroupDiscount: discountDuell ?? 0,
            });

        }

    } else {

        var {
            finalNormalPrice,
            finalSpecialPrice,
            shouldShowSpecialPrice,
            finalDiscount,
        } = calculateProductPrice({
            price: productPrice,
            vatrate: productVatrate,
            isVAT: false,
            specialPrice: productSpecialPrice,
            customerGroupDiscount: discountDuell ?? 0,
        });

    }

    //new

    // const {
    //     finalNormalPrice,
    //     finalSpecialPrice,
    //     shouldShowSpecialPrice,
    //     finalDiscount,
    // } = calculateProductPrice({
    //     price: productPrice,
    //     vatrate: productVatrate,
    //     specialPrice: productSpecialPrice,
    //     customerGroupDiscount: discount,
    //     isVAT,
    // });



    // Function to handle discount calculation
    const customerAction = async () => {
        setLoading(true);

        const data = customerGroups;
        if (data) {
            const latestSelectedVariant = selectedVariantRef.current;
            const discountPrice = await getCustomerGroupDiscount(
                data,
                latestSelectedVariant
                    ? latestSelectedVariant.product_id
                    : detail.product_id,
                detail.category_id
            );
            setDiscountDuell(discountPrice);
        }
        setLoading(false);
    };

    useEffect(() => {
        customerAction();
    }, [selectedVariant, detail]);

    return (
        <>
            <div
                className={`w-full flex flex-row mb-10 ${session.status === "authenticated" ? "justify-between" : "justify-start"
                    }`}
            >
                {session.status === "authenticated" && (
                    <div className="w-full flex flex-row justify-start items-center gap-4">
                        {pricelist.length > 0 && has_pricelist ?
                            customer_group_name === "" ?
                                <div className="w-full flex flex-row justify-start items-center gap-4">
                                    {shouldShowSpecialPrice ? (
                                        <p className="font-heading text-primary whitespace-nowrap font-bold text-2xl sm:text-3xl lg:text-4xl xl:text-4xl">
                                            kr {finalSpecialPrice},-
                                        </p>
                                    ) : (
                                        <p className="font-heading text-primary whitespace-nowrap font-bold text-2xl sm:text-3xl lg:text-4xl xl:text-4xl">
                                            kr {finalNormalPrice},-
                                        </p>
                                    )}
                                    {discountDuell > 0 && (
                                        <p className={`text-gray-500 text-sm sm:text-base md:text-lg lg:text-xl font-base line-through`}>
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
                                : <div className="w-full flex flex-row justify-start items-center gap-4">
                                    <p className="font-heading text-primary whitespace-nowrap font-bold text-2xl sm:text-3xl lg:text-4xl xl:text-4xl">
                                        kr {discountedPrice},-
                                    </p>
                                    {discount > 0 && (
                                        <p className={`text-gray-500 text-sm sm:text-base md:text-lg lg:text-xl font-base ${discount && "line-through"
                                            }`}>
                                            {discount},-
                                        </p>
                                    )}
                                </div>
                            :
                            <div className="w-full flex flex-row justify-start items-center gap-4">
                                {shouldShowSpecialPrice ? (
                                    <p className="font-heading text-primary whitespace-nowrap font-bold text-2xl sm:text-3xl lg:text-4xl xl:text-4xl">
                                        kr {finalSpecialPrice},-
                                    </p>
                                ) : (
                                    <p className="font-heading text-primary whitespace-nowrap font-bold text-2xl sm:text-3xl lg:text-4xl xl:text-4xl">
                                        kr {finalNormalPrice},-
                                    </p>
                                )}
                                {discountDuell > 0 && (
                                    <p className={`text-gray-500 text-sm sm:text-base md:text-lg lg:text-xl font-base line-through`}>
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
                        }

                    </div>
                )}
                <div
                    className={`w-full flex flex-col gap-1 ${session.status === "authenticated" ? "text-end" : "text-start"
                        }`}
                >
                    <p className="text-gray-500 text-sm sm:text-base md:text-lg lg:text-xl font-base">
                        Utsalgspris til kunde
                    </p>
                    <p className="font-heading text-gray-500 whitespace-nowrap font-semibold text-lg sm:text-xl lg:text-2xl xl:text-2xl">
                        {productPrice || detail.price_inc_vat || 0},-
                    </p>
                </div>
            </div>
        </>
    );
}
