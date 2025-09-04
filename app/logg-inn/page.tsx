import React from "react";
import Signin from "@/components/signin/Signin";

export interface ProductsPageProps {
  searchParams: {
    error?: string,
    callbackUrl?: string
  }
}

export default function Signinpage({ searchParams }: ProductsPageProps) {
  return (
    <div className="flex w-full">
      <Signin searchParams={searchParams} />
    </div>
  );
};
