import Link from "next/link";
import React from "react";

const Notfound = () => {
  return (
    <div className="min-h-[80vh] w-full bg-background">
      <section className="pt-40 pb-24">
        <div className="container px-4 mx-auto">
          <h1 className="mb-2 font-light text-center text-secondary text-[7.5rem] sm:text-[12rem] lg:text-[15rem] font-heading">
            404
          </h1>
          <p className="mb-4 text-primary font-sans text-3xl font-light text-center font-heading">
            Beklager, denne siden ble ikke funnet.
          </p>
          <p className="max-w-xl mx-auto mb-10 font-base text-center text-gray-400">
            Siden du leter etter kan ha blitt flyttet, fjernet, fått nytt navn
            eller har kanskje aldri eksistert.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4 lg:gap-4">
            <Link
              href="/"
              className="bg-primary text-white rounded-full hover:bg-secondary hover:text-primary focus:ring-4 focus:ring-gray-200 text-sm font-semibold px-8 h-12 inline-flex items-center transition duration-200"
            >
              Gå til forsiden
            </Link>
            <Link
              href="/kontakt"
              className="bg-secondary hover:bg-gray-50 text-primary rounded-full border border-secondary hover:border-primary focus:ring-4 focus:ring-gray-200 text-sm font-semibold px-8 h-12 inline-flex items-center transition duration-200"
            >
              Kontakt oss
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Notfound;
