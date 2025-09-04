import { orders } from "@/utils/store";
import Link from "next/link";
import React from "react";

export default function OrderHistory() {
  return (
    <>
      <section className="py-16 min-h-[60vh]">
        <div className="container mx-auto px-4">
          <div className="mb-10">
            <h2 className="mb-3 font-heading font-light text-4xl text-gray-900">
              Ordrehistorikk
            </h2>
            <p className="text-sm text-gray-400 font-base">
              Sjekk statusen til nylige bestillinger, administrer returordrer og
              oppdag lignende produkter.
            </p>
          </div>
          <div className="border-none border-gray-50 rounded-2xl">
            {orders.map((order, index) => (
              <div
                key={index}
                className="p-12 shadow-md mt-4 bg-white rounded-xl"
              >
                <div className="flex flex-wrap -m-2 mb-6">
                  <div className="w-full md:flex-1 p-2">
                    <div className="flex flex-wrap -m-3">
                      <div className="w-full md:flex-1 p-3">
                        <h2 className="mb-3 font-heading font-light text-3xl text-gray-900">
                          Ordre: #{order.orderNumber}
                        </h2>
                        <p className="text-gray-400"></p>
                      </div>
                    </div>
                  </div>
                  <div className="w-auto p-2">
                    <p className="font-semibold text-green-900">
                      kr {order.total},-
                    </p>
                  </div>
                </div>
                <div className="flex flex-wrap items-center -m-2">
                  <div className="w-full md:w-1/2 p-2">
                    <div className="flex items-center">
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
                          fill="#78B449"
                        />
                      </svg>
                      <p className="text-sm text-gray-400">{order.status}</p>
                    </div>
                  </div>
                  <div className="w-full md:w-1/2 p-2">
                    <div className="flex flex-wrap md:justify-end -m-2">
                      <div className="p-2">
                        <a
                          href="#"
                          className="hidden inline-flexx bg-gray-50 rounded-full hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 text-gray-900 text-sm font-semibold px-4 h-9 items-center transition duration-200"
                        >
                          Se faktura
                        </a>
                      </div>
                      <div className="p-2">
                        <Link
                          href={`/minside/ordrehistorikk/${order.orderNumber}`}
                          className="bg-primary rounded-full hover:bg-white border-2 border-primary hover:text-primary focus:ring-4 focus:ring-gray-200 text-white text-sm font-semibold px-4 h-9 inline-flex items-center transition duration-200"
                        >
                          Se ordre
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
            {!orders && <p>Ingen ordre funnet</p>}
          </div>
        </div>
      </section>
    </>
  );
}
