"use client";
import Link from "next/link";
import React from "react";

import { orders } from "@/utils/store";
import { useParams } from "next/navigation";

export default function OrderHistoryItem() {
  const params = useParams(); // Get the params object
  const orderNumber = params?.orderNumber; // Extract orderNumber from params

  const order = orders.find((order) => order.orderNumber === orderNumber);

  if (!order) {
    return <p>Ordre ikke funnet</p>;
  }
  return (
    <>
      <section className="py-16">
        <div className="container mx-auto px-4">
          <Link href="/minside/ordrehistorikk">
            <p className="underline underline-offset-4">
              &larr;&nbsp;Tilbake til ordrehistorikk
            </p>
          </Link>
          <div className="mb-10">
            <div className="flex mt-8">
              <h2 className="mb-4 shadow-sm font-heading bg-white px-4 py-1 rounded-xl font-light text-3xl text-gray-900">
                Ordre #{order.orderNumber}
              </h2>
            </div>
            <p className="text-sm text-gray-400 font-semibold">
              Her kan du se mer informasjon om din tidligere ordre
            </p>
          </div>
          <div className="border border-gray-50 rounded-2xl">
            <div className="px-12 py-8 border-b border-gray-50">
              <div className="flex flex-wrap items-center -m-4">
                <div className="w-full md:w-2/3 p-4">
                  <div className="flex flex-wrap justify-between -m-2">
                    <div className="w-auto p-2">
                      <p className="mb-2 text-gray-400">Bestillt av</p>
                      <p className="font-semibold text-gray-900">
                        {order.createdBy}
                      </p>
                    </div>
                    <div className="w-auto p-2">
                      <p className="mb-2 text-gray-400">Ordre dato</p>
                      <p className="font-semibold text-gray-900">
                        {new Date(order.createdAt).toLocaleDateString("nb-NO")}
                      </p>
                    </div>
                    <div className="w-auto p-2">
                      <p className="mb-2 text-gray-400">Varer</p>
                      <p className="font-semibold text-gray-900">
                        {order.products.length}
                      </p>
                    </div>
                    <div className="w-auto p-2">
                      <p className="mb-2 text-gray-400">Total sum</p>
                      <p className="font-semibold text-gray-900">
                        kr {order.total},-
                      </p>
                    </div>
                    <div className="w-auto p-2">
                      <p className="mb-2 text-gray-400">Status</p>
                      <p className="font-semibold text-gray-900">
                        {order.status}
                      </p>
                    </div>
                  </div>
                </div>
                <div className="w-full md:w-1/3 p-4">
                  <div className="flex flex-wrap md:justify-end -m-3">
                    <div className="w-auto p-3">
                      <a
                        href="#"
                        className="hidden inline-flexx bg-white rounded-full hover:bg-gray-50 border border-gray-100 focus:ring-4 focus:ring-gray-200 text-gray-900 text-sm font-semibold px-4 h-12 items-center transition duration-200"
                      >
                        Se faktura
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="p-12">
              {/*item */}
              {order.products.map((product, index) => (
                <div
                  key={index}
                  className="pb-14 bg-white p-4 rounded-xl mb-12 border-b border-gray-50"
                >
                  <div className="flex flex-wrap -m-2 mb-6">
                    <div className="w-full md:flex-1 p-2">
                      <div className="flex flex-wrap -m-3">
                        <div className="w-full md:w-auto p-3">
                          <img
                            className="rounded-2xl object-contain bg-white aspect-square"
                            style={{ height: 131 }}
                            src={product.mainImage}
                            alt={product.title}
                          />
                        </div>
                        <div className="w-full md:flex-1 p-3">
                          <h2 className="mb-3 font-heading text-3xl text-gray-900">
                            {product.title}
                          </h2>
                          <p className="text-gray-400">{product.description}</p>
                        </div>
                      </div>
                    </div>
                    <div className="w-auto p-2 px-8">
                      <p className="font-semibold text-xl text-primary">
                        kr {product.price},-
                      </p>
                    </div>
                  </div>
                  <div className="flex flex-wrap items-center -m-2">
                    <div className="w-full md:w-1/2 p-2">
                      <div className="flex items-center pl-4">
                        <svg
                          className="mr-2"
                          width={20}
                          height={20}
                          viewBox="0 0 20 20"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            fillRule="evenodd"
                            clipRule="evenodd"
                            d="M10 19.6C15.302 19.6 19.6 15.302 19.6 10C19.6 4.69809 15.302 0.400024 10 0.400024C4.69809 0.400024 0.400024 4.69809 0.400024 10C0.400024 15.302 4.69809 19.6 10 19.6ZM14.4486 8.44855C14.9172 7.97992 14.9172 7.22013 14.4486 6.7515C13.9799 6.28287 13.2201 6.28287 12.7515 6.7515L8.80002 10.703L7.24855 9.1515C6.77992 8.68287 6.02013 8.68287 5.5515 9.1515C5.08287 9.62013 5.08287 10.3799 5.5515 10.8486L7.9515 13.2486C8.42013 13.7172 9.17992 13.7172 9.64855 13.2486L14.4486 8.44855Z"
                            fill="#3b1060"
                          />
                        </svg>
                        <p className="text-sm text-gray-400">
                          {product.quantity} stk
                        </p>
                      </div>
                    </div>
                    <div className="w-full md:w-1/2 p-2">
                      <div className="flex flex-wrap md:justify-end -m-2">
                        <div className="p-2">
                          <Link
                            href={`/produkt/${product.slug}`}
                            className="bg-gray-50 rounded-full hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 text-gray-900 text-sm font-semibold px-4 h-9 inline-flex items-center transition duration-200"
                          >
                            Se produkt
                          </Link>
                        </div>
                        <div className="p-2">
                          <a
                            href="#"
                            className="bg-primary rounded-full hover:bg-secondary hover:text-primary focus:ring-4 focus:ring-gray-200 text-white text-sm font-semibold px-4 h-9 inline-flex items-center transition duration-200"
                          >
                            Legg til i handlekurv
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
