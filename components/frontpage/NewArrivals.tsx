import Link from "next/link";
import React from "react";

const NewArrivals = () => {
  return (
    <>
      <section className="w-full">
        <div className="p-2 xs:px-4 lg:px-10 container mx-auto w-full pt-12 pb-20">
          <h1 className="font-light text-5xl md:text-6xl text-center mb-2">
            Utforsk våre populære merker
          </h1>
          <p className="text-gray-500 text-center text-lg mb-12">
            Vi leverer produkter fra mange kjente merker, se noen av dem her
          </p>
          <div className="flex flex-wrap -m-4">
            <div className="w-full lg:w-1/2 p-4">
              <Link href="/merke/solarium" className="group">
                <div
                  className="relative overflow-hidden rounded-2xl"
                  style={{ height: 520 }}
                >
                  <img
                    className="absolute inset-0 rounded-2xl w-full h-full object-cover transform group-hover:scale-105 transition duration-200"
                    src="/assets/content/solarium.webp"
                    alt="SOLARIUM"
                  />
                  <div className="absolute inset-0 w-full h-full bg-gradient-to-tr from-black/20 via-transparent to-transparent" />
                  <div className="absolute left-6 bottom-6">
                    <h2 className="font-heading font-light text-4xl md:text-5xl text-white">
                      SOLARIUM
                    </h2>
                  </div>
                  <div className="absolute right-6 top-6">
                    <div className="bg-primary px-4 h-8 rounded-md flex items-center">
                      <span className="text-xs text-white uppercase font-semibold">
                        Se mer
                      </span>
                    </div>
                  </div>
                </div>
              </Link>
            </div>
            <div className="w-full lg:w-1/2 p-4">
              <Link href="/merke/dibi-milano" className="group">
                <div
                  className="relative overflow-hidden rounded-2xl"
                  style={{ height: 520 }}
                >
                  <img
                    className="absolute inset-0 rounded-2xl w-full h-full object-cover transform group-hover:scale-105 transition duration-200"
                    src="/assets/content/acid_infusion.png"
                    alt="DIBI Milano"
                  />
                  <div className="absolute inset-0 w-full h-full bg-gradient-to-tr from-black/20 via-transparent to-transparent" />
                  <div className="absolute left-6 bottom-6">
                    <h2 className="font-heading font-light text-4xl md:text-5xl text-white">
                      DIBI Milano
                    </h2>
                  </div>
                  <div className="absolute right-6 top-6">
                    <div className="bg-primary px-4 h-8 rounded-md flex items-center">
                      <span className="text-xs text-white uppercase font-semibold">
                        Se mer
                      </span>
                    </div>
                  </div>
                </div>
              </Link>
            </div>
            <div className="w-full lg:w-1/2 p-4">
              <Link href="/merke/idema" className="group">
                <div
                  className="relative overflow-hidden rounded-2xl"
                  style={{ height: 520 }}
                >
                  <img
                    className="absolute inset-0 rounded-2xl w-full h-full object-cover transform group-hover:scale-105 transition duration-200"
                    src="/assets/content/idema_voks.webp"
                    alt="Idema"
                  />
                  <div className="absolute inset-0 w-full h-full bg-gradient-to-tr from-black/20 via-transparent to-transparent" />
                  <div className="absolute left-6 bottom-6">
                    <h2 className="font-heading font-light text-4xl md:text-5xl text-white">
                      Idema
                    </h2>
                  </div>
                  <div className="absolute right-6 top-6">
                    <div className="bg-primary px-4 h-8 rounded-md flex items-center">
                      <span className="text-xs text-white uppercase font-semibold">
                        Se mer
                      </span>
                    </div>
                  </div>
                </div>
              </Link>
            </div>
            <div className="w-full lg:w-1/2 p-4">
              <Link href="/merke/intensive" className="group">
                <div
                  className="relative overflow-hidden rounded-2xl"
                  style={{ height: 520 }}
                >
                  <img
                    className="absolute inset-0 rounded-2xl w-full h-full object-cover transform group-hover:scale-105 transition duration-200"
                    //src="/assets/midl/cleansing-gel.jpg"
                    src="/assets/content/intensive-eyepearl.png"
                    alt="Intensive eyepearl"
                  />
                  <div className="absolute inset-0 w-full h-full bg-gradient-to-tr from-black/20 via-transparent to-transparent" />
                  <div className="absolute left-6 bottom-6">
                    <h2 className="font-heading font-light text-4xl md:text-5xl text-white">
                      Intensive
                    </h2>
                  </div>
                  <div className="absolute right-6 top-6">
                    <div className="bg-primary px-4 h-8 rounded-md flex items-center">
                      <span className="text-xs text-white uppercase font-semibold">
                        Se mer
                      </span>
                    </div>
                  </div>
                </div>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default NewArrivals;
