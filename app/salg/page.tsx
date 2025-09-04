import ProductPage from "@/components/product/ProductPage";
import { Metadata } from "next";
import React from "react";
import { fetchCustomerGroup } from '@/features/customer/customer.action';
import { fetchCartItems } from '@/features/cart/cart.action';

export async function generateMetadata(): Promise<Metadata> {

  const defaultMeta = {
    title: "Alle produkter",
    description: 'Utforsk vårt brede utvalg av produkter som dekker alle behov. Finn alt fra elektronikk til mote, hjem og mye mer på ett sted.',
  };
  return {
    ...defaultMeta,
  };
}

const Page = async ({
  params,
}: {
  params: { pageTypeAll: any, brand: string[] };
}) => {
  const { pageTypeAll, brand } = params;
  const cartItem = await fetchCartItems();
    const customerGroup = await fetchCustomerGroup();
  return (
    <>
      <ProductPage params={{ pageType: 'salg', brand: [] }} cartItems={cartItem} customerGroup={customerGroup} />
    </>
  );
};

export default Page;