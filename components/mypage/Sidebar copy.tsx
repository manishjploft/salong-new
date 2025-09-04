import Link from "next/link";
import React from "react";

export default function Sidebar({ pathname }: any) {
  return (
    <div className="w-full h-full bg-white border-r-2 border-gray-200 p-4 pt-10">
      <h1 className="font-heading text-4xl mb-6 font-light">Min side</h1>

      <hr />
      <Link href="/minside">
        <h3
          className={`font-heading text-3xl mt-2 mb-3 ${
            pathname === "/minside" ? "font-medium" : "font-light"
          }`}
        >
          Mine opplysninger
        </h3>
      </Link>
      <hr />
      <Link href="/minside/ordrehistorikk">
        <h3
          className={`font-heading text-3xl mt-2 mb-3 ${
            pathname === "/minside/ordrehistorikk"
              ? "font-medium"
              : "font-light"
          }`}
        >
          Ordrehistorikk
        </h3>
      </Link>
      <hr />
      <Link
        //href="/minside/fakturahistorikk"
        href="#"
      >
        <h3
          className={`font-heading text-3xl mt-2 mb-3 text-gray-200 ${
            pathname === "/minside/fakturahistorikk"
              ? "font-medium"
              : "font-light"
          }`}
        >
          Fakturahistorikk
        </h3>
      </Link>
    </div>
  );
}
