"use client";
import Link from "next/link";
import React, { useState } from "react";
import toast from "react-hot-toast";

const Newsletter = () => {
  const [email, setEmail] = useState("");

  const handleSubscribe = async () => {
    if (!email) {
      toast.dismiss();
      toast.error("Vennligst bruk en gyldig e-post.");
      return;
    }

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}subscribe/add`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
          body: new URLSearchParams({ email }),
        }
      );

      if (response) {
        toast.success("Abonnementet er opprettet!");
        setEmail(""); // Clear the input field
      } else {
        toast.success("Abonnementet er opprettet!");
        setEmail(""); // Clear the input field
      }
    } catch (error) {
      toast.success("Abonnementet er opprettet!");
      setEmail("");
      console.error(error);
    }
  };

  return (
    <>
      <section className="relative w-full bg-white pb-20 md:pb-24 overflow-hidden">
        <div className="relative container2 px-4 mx-auto w-full">
          <div className="max-w-none mx-auto px-8 md:px-16 py-12 sm:py-20 bg-secondary rounded-2xl shadow-lg shadow-black/10">
            <div className="flex flex-col lg:flex-row -mx-4">
              <div className="w-full lg:w-1/2 px-4 mb-8 lg:mb-0 flex justify-center lg:justify-start">
                <div className="max-w-lg mx-auto">
                  <h4 className="font-light text-4xl sm:text-5xl text-white font-heading">
                    Meld deg på vårt nyhetsbrev
                  </h4>
                </div>
              </div>
              <div className="w-full lg:w-1/2 px-4 flex justify-center lg:justify-start">
                <div className="max-w-xl lg:ml-auto">
                  <p className="text-lg font-light text-gray-50 mb-10">
                    Få nyttig informasjon, tilpassede tilbud, nyheter og hjelp
                    ved å melde deg på vårt nyhetsbrev.
                  </p>
                  <div className="sm:flex mb-2 items-center">
                    <input
                      className="w-full mb-3 sm:mb-0 sm:mr-4 py-3 px-4 text-sm text-gray-900 placeholder-gray-400 border border-gray-200 focus:border-primary focus:outline-primary rounded-lg"
                      type="email"
                      placeholder="Skriv inn din epostadresse"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                    <button
                      onClick={handleSubscribe}
                      className="relative group inline-block flex-shrink-0 w-full sm:w-auto py-3 px-5 text-sm font-semibold text-gray-50 hover:text-black bg-primary rounded-full transition duration-300 overflow-hidden"
                    >
                      <div className="absolute top-0 right-full w-full h-full bg-white transform group-hover:translate-x-full group-hover:scale-102 transition duration-500" />
                      <div className="relative flex items-center justify-center">
                        <span className="mr-4">Abonner</span>
                        <svg
                          width={8}
                          height={11}
                          viewBox="0 0 8 11"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M6.82994 5.04001L2.58994 0.80001C2.49698 0.706281 2.38638 0.631887 2.26452 0.581118C2.14266 0.530349 2.01195 0.504211 1.87994 0.504211C1.74793 0.504211 1.61723 0.530349 1.49537 0.581118C1.37351 0.631887 1.26291 0.706281 1.16994 0.80001C0.983692 0.987372 0.87915 1.24082 0.87915 1.50501C0.87915 1.7692 0.983692 2.02265 1.16994 2.21001L4.70994 5.75001L1.16994 9.29001C0.983692 9.47737 0.87915 9.73082 0.87915 9.99501C0.87915 10.2592 0.983692 10.5126 1.16994 10.7C1.26338 10.7927 1.3742 10.866 1.49604 10.9158C1.61787 10.9655 1.74834 10.9908 1.87994 10.99C2.01155 10.9908 2.14201 10.9655 2.26385 10.9158C2.38569 10.866 2.4965 10.7927 2.58994 10.7L6.82994 6.46001C6.92367 6.36705 6.99806 6.25645 7.04883 6.13459C7.0996 6.01273 7.12574 5.88202 7.12574 5.75001C7.12574 5.618 7.0996 5.48729 7.04883 5.36543C6.99806 5.24357 6.92367 5.13297 6.82994 5.04001Z"
                            fill="currentColor"
                          />
                        </svg>
                      </div>
                    </button>
                  </div>
                  <span className="block text-xs font-semibold text-gray-50">
                    Vi bryr oss om ditt{" "}
                    <Link href="/personvern" className="text-primary/50">
                      personvern
                    </Link>
                    .
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Newsletter;
