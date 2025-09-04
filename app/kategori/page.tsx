import ProductPage from "@/components/product/ProductPage";
import { Metadata } from "next";
import React from "react";
import { fetchCustomerGroup } from '@/features/customer/customer.action';
import { fetchCartItems } from '@/features/cart/cart.action';

export async function generateMetadata(): Promise<Metadata> {

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
  params: { pageTypeAll: any, brand: string[] };
}) => {
  const { pageTypeAll, brand } = params;
  const cartItem = await fetchCartItems();
  const customerGroup = await fetchCustomerGroup();

  return (
    <>
      <ProductPage params={{ pageType: 'kategori', brand: [] }} cartItems={cartItem} customerGroup={customerGroup} />
    </>
  );
};

export default Page;