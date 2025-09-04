export function roundNumber(num: number) {
  if (Number.isInteger(num)) {
    return num;
  } else {
    return Number(num.toFixed(2));
  }
}

export const getCustomerGroupDiscount = (
  customerGroups: any,
  duellProductId: string,
  categoryId: string
) => {
  let baseDiscount = 0;
  let categoryDiscount = 0;
  let productDiscount = 0;

  customerGroups?.forEach((customerGroup: any) => {
    if (customerGroup.discount_percentage) {
      baseDiscount += +customerGroup.discount_percentage;
    }
    customerGroup?.category_discount?.product?.forEach((discount: any) => {
      const duellCategoryOrProductId = discount.category_id;
      if (duellCategoryOrProductId === categoryId) {
        categoryDiscount += +discount.discount_percentage;
      }

      if (duellCategoryOrProductId === duellProductId) {
        productDiscount = +discount.discount_percentage;
      }
    });

    // Check for product-specific discount directly in product_discount array
    customerGroup?.product_discount?.forEach((discount: any) => {

      if (discount.product_id === duellProductId) {
        productDiscount = +discount.discount_percentage;
      }
    });
  });

  if (baseDiscount > categoryDiscount && baseDiscount > categoryDiscount) {
    return baseDiscount;
  }

  if (categoryDiscount > baseDiscount && categoryDiscount > productDiscount) {
    return categoryDiscount;
  }

  if (productDiscount > baseDiscount && productDiscount > categoryDiscount) {
   

    return productDiscount;
  }

  return 0;
};

export const calculateProductPrice = ({
  price,
  vatrate,
  isVAT,
  specialPrice,
  customerGroupDiscount,
}: {
  price: string | number;
  vatrate: string | number;
  isVAT: boolean;
  specialPrice: string | number;
  customerGroupDiscount: string | number;
}) => {
  const formattedInitialPrice = price ? +price : 0;
  const formattedVatrate = vatrate ? +vatrate : 0;
  const formattedSpecialPrice = specialPrice ? +specialPrice : 0;

  const productPriceExVAT =
    formattedInitialPrice / (1 + formattedVatrate / 100);
  const specialPriceExVAT =
    formattedSpecialPrice / (1 + formattedVatrate / 100);

  const productPrice = isVAT ? formattedInitialPrice : productPriceExVAT;
  const productSpecialPrice = isVAT ? formattedSpecialPrice : specialPriceExVAT;
  const discountSpecialPrice = formattedSpecialPrice
    ? (1 - +productSpecialPrice / +productPrice) * 100
    : 0;

  // customer group discount applicable to normal prices
  const discountedPriceExVAT =
    productPriceExVAT * (1 - +customerGroupDiscount / 100);
  

  const discountedPriceWithVAT =
    discountedPriceExVAT * (1 + formattedVatrate / 100);
  const finalProductPrice = isVAT
    ? discountedPriceWithVAT
    : discountedPriceExVAT;

  const shouldShowSpecialPrice = !!(
    productSpecialPrice && productSpecialPrice < finalProductPrice
  );

  const finalDiscount = !!(+discountSpecialPrice > +customerGroupDiscount)
    ? discountSpecialPrice
    : customerGroupDiscount;

  const finalPrice = shouldShowSpecialPrice
    ? productSpecialPrice
    : finalProductPrice;
  const finalPriceExVat = shouldShowSpecialPrice
    ? specialPriceExVAT
    : discountedPriceExVAT;
  const finalPriceInVat = shouldShowSpecialPrice
    ? productSpecialPrice
    : discountedPriceWithVAT;

 

  return {
    price: roundNumber(productPrice),
    finalDiscount: Math.round(+finalDiscount),
    finalSpecialPrice: roundNumber(productSpecialPrice),
    finalNormalPrice: roundNumber(finalProductPrice),
    shouldShowSpecialPrice,
    productPriceExVAT: roundNumber(productPriceExVAT),
    finalPrice: roundNumber(finalPrice),
    finalPriceExVat: roundNumber(finalPriceExVat),
    finalPriceInVat: roundNumber(finalPriceInVat),
  };
};

export function calculateCartPrice(
  items: any = [],
  products: any = [],
  shippingPrice: number,
  isVAT: boolean,
  customerGroups: any
) {
  if (!items.length) {
    return {};
  }

  const totalPriceWithVat = items?.reduce((total: number, item: any) => {
    const product = products.find(
      (product: any) => product.id === item.productId
    );
    let variantPrice = 0;

    if (!product) {
      return 0;
    }

    const discount = getCustomerGroupDiscount(
      customerGroups,
      product.duellProductId,
      product.categoryId
    );
    const { finalPriceInVat } = calculateProductPrice({
      price: product.priceIncVAT,
      specialPrice: product.specialPrice,
      customerGroupDiscount: discount,
      isVAT: true,
      vatrate: product.vatratePercent,
    });

    return total + +finalPriceInVat * item.quantity + variantPrice;
  }, 0);

  const totalPriceExVAT = items?.reduce((total: number, item: any) => {
    const product = products.find(
      (product: any) => product.id === item.productId
    );
    let variantPrice = 0;

    if (!product) {
      return 0;
    }

    const discount = getCustomerGroupDiscount(
      customerGroups,
      product.duellProductId,
      product.categoryId
    );
    const { finalPriceExVat } = calculateProductPrice({
      price: product.priceIncVAT,
      specialPrice: product.specialPrice,
      customerGroupDiscount: discount,
      isVAT: true,
      vatrate: product.vatratePercent,
    });

    return total + finalPriceExVat * item.quantity + variantPrice;
  }, 0);

  const totalMVA = isVAT ? totalPriceWithVat - totalPriceExVAT : 0;

  const totalFinalPrice = items?.reduce((total: number, item: any) => {
    const product = products.find(
      (product: any) => product.id === item.productId
    );
    if (!product) {
      return 0;
    }

    const discount = getCustomerGroupDiscount(
      customerGroups,
      product.duellProductId,
      product.categoryId
    );
    const { finalPrice } = calculateProductPrice({
      price: product.priceIncVAT,
      specialPrice: product.specialPrice,
      customerGroupDiscount: discount,
      isVAT,
      vatrate: product.vatratePercent,
    });

    return total + +finalPrice * item.quantity;
  }, 0);

  const freeShippingOver =
    process.env.NEXT_PUBLIC_STORE_SETTINGS_FREE_SHIPPING_OVER ?? 0;

  const finalShippingPrice =
    totalFinalPrice > shippingPrice || totalFinalPrice > +freeShippingOver
      ? 0
      : shippingPrice;

  const totalFinalPriceWithShipping = totalFinalPrice + finalShippingPrice;

  return {
    totalFinalPrice: roundNumber(totalFinalPrice),
    totalFinalPriceWithShipping: roundNumber(totalFinalPriceWithShipping),
    totalPriceWithVat: roundNumber(totalPriceWithVat),
    totalMVA: roundNumber(totalMVA),
    finalShippingPrice: roundNumber(finalShippingPrice),
    totalPriceExVAT: roundNumber(totalPriceExVAT),
    totalNormalPrice: roundNumber(totalFinalPrice - totalMVA),
  };
}

// Show Price List

export const calculateProductPriceByShowPrice = ({
  productData,
  customerGroups,
  priceIncVat,
  isVAT = true,
}: {
  productData: any;
  customerGroups: any;
  priceIncVat: number;
  isVAT: boolean;
}) => {
  const pricelist = productData.pricelist;
  let matchedPrices: any = [];
  let matchedPricesNew: any = [];
  let priceIncVatNew: number = priceIncVat;

  // Match customer_group_id in pricelist and customerGroups
  pricelist.forEach((priceItem: any) => {
    const matchedGroup = customerGroups?.find(
      (group: any) => group.customer_group_id === priceItem.customer_group_id
    );

    if (matchedGroup) {
      let priceIncVat = parseFloat(priceItem.price_inc_vat);
      priceIncVatNew = parseFloat(priceItem.price_inc_vat);

      // Adjust price to exclude VAT if isVAT is false
      if (!isVAT) {
        priceIncVat =
          priceIncVat / (1 + parseFloat(productData.vatrate_percent) / 100);
      }
      matchedPrices.push({
        price_inc_vat: priceIncVat,
        customer_group_name: matchedGroup.customer_group_name,
      });

      matchedPricesNew.push({
        price_inc_vat: priceIncVatNew,
        customer_group_name: matchedGroup.customer_group_name,
      });
    }
  });

  // Handle results based on the number of matches
  if (matchedPrices.length > 0) {
    // Sort prices in ascending order
    matchedPrices.sort((a: any, b: any) => a.price_inc_vat - b.price_inc_vat);

    // Find the lowest price
    const lowestPrice = matchedPrices[0];

    // Find the upper price, if available
    const upperPrice =
      matchedPrices.length > 1 ? matchedPrices[1].price_inc_vat : 0;
    let discount: any = 0;
    if (pricelist?.length > 1) {
      discount = upperPrice;
    } else {
      discount = 0;
    }

    matchedPricesNew.sort(
      (a: any, b: any) => a.price_inc_vat - b.price_inc_vat
    );

    // Find the lowest price
    const lowestPriceNew = matchedPricesNew[0];

    return {
      discountedPrice: lowestPrice.price_inc_vat,
      discount,
      customer_group_name: lowestPrice.customer_group_name,
      discountedPriceWithVat: lowestPriceNew.price_inc_vat,
    };
  } else {
    // No match found
    return {
      discountedPrice: priceIncVat,
      discount: 0,
      customer_group_name: "",
      discountedPriceWithVat: priceIncVat,
    };
  }
};
