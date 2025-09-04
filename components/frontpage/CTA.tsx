import Link from "next/link";
import React from "react";

const CTA = () => {
  return (
    <>
      <section className="p-2 md:p-6 w-full">
        <div className="relative container mx-auto bg-secondary shadow-lg shadow-black/10 overflow-hidden rounded-2xl">
          <div className="flex flex-wrap">
            <div className="w-full lg:w-1/2">
              <div className="py-10 px-4 md:px-11">
                <h3 className="mb-3 font-light text-xl sm:text-2xl md:text-3xl text-gray-100">
                  Tilbud
                </h3>
                <h3 className="mb-14 font-light text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-white">
                  Få opptil <span className="text-primary">30% rabatt</span> på
                  utvalgte produkter nå
                </h3>
                <div className="flex flex-wrap gap-4">
                  <Link
                    href="/salg"
                    className="bg-primary text-white rounded-full hover:bg-secondary hover:text-primary focus:ring-4 focus:ring-gray-200 text-sm font-semibold px-8 h-12 inline-flex items-center transition duration-200"
                  >
                    Handle nå
                  </Link>
                  {/*
                  <a
                    href="#"
                    className="bg-secondary hover:bg-gray-50 text-primary rounded-full border border-secondary hover:border-primary focus:ring-4 focus:ring-gray-200 text-sm font-semibold px-8 h-12 inline-flex items-center transition duration-200"
                  >
                    Bli forhandler
                  </a>
                  */}
                </div>
              </div>
            </div>
            <div className="w-full lg:w-1/2">
              <img
                className="mx-auto lg:absolute lg:right-0 lg:bottom-0 object-cover"
                style={{ height: 448 }}
                src="/assets/content/sale.jpg"
                alt="Salongpartner salg"
              />
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default CTA;
