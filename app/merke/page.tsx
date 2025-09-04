import ProductPage from "@/components/product/ProductPage";
import { Metadata } from "next";
import React from "react";
import { fetchCustomerGroup } from "@/features/customer/customer.action";
import { fetchCartItems } from "@/features/cart/cart.action";

export async function generateMetadata(): Promise<Metadata> {
  const defaultMeta = {
    title: "Merker",
    description:
      "Oppdag vår merkevare som står for kvalitet, innovasjon og pålitelighet. Vi leverer produkter og tjenester som setter kunden i fokus.",
  };
  return {
    ...defaultMeta,
  };
}

const Page = async ({
  params,
}: {
  params: { pageTypeAll: any; brand: string[] };
}) => {
  const { pageTypeAll, brand } = params;
  const cartItem = await fetchCartItems();
  const customerGroup = await fetchCustomerGroup();
  return (
    <>
      <ProductPage
        params={{ pageType: "merke", brand: [] }}
        cartItems={cartItem}
        customerGroup={customerGroup}
      />
    </>
  );
};

export default Page;
