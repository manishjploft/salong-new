import ProductPage from "@/components/product/ProductPage";
import { Metadata } from "next";
import React from "react";
import { fetchCustomerGroup } from '@/features/customer/customer.action';
import { fetchCartItems } from '@/features/cart/cart.action';
import ProductPageCategory from "@/components/product/ProductPageCategory";

export async function generateMetadata({
  params,
}: {
  params: { pageType: any, brand: string[] };
}): Promise<Metadata> {

  const defaultMeta = {
    title: "kategori",
    description: 'Finn alt du trenger med vår omfattende katalog av produkter og tjenester. Utforsk våre kategorier for å finne det som passer dine behov.',
  };
  return {
    ...defaultMeta,
  };
}

const Page = async ({
  params,
}: {
  params: { pageType: any, brand: string[] };
}) => {
  const cartItem = await fetchCartItems();
  const customerGroup = await fetchCustomerGroup();
  
  return (
    <>
      <ProductPageCategory params={params} cartItems={cartItem} customerGroup={customerGroup} />
    </>
  );
};

export default Page;