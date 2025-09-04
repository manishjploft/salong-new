"use client";
import React, { useState } from "react";

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const faqs = [
    {
      question: "Tilbyr dere volumrabatter?",
      answer:
        "Ja, vi tilbyr volumrabatter for større bestillinger. Rabattsatsene varierer avhengig av bestillingsmengden og produkttypen. Kontakt vår salgsavdeling for et skreddersydd tilbud basert på dine behov.",
    },
    {
      question: "Hva er minimumsbestillingsmengden?",
      answer:
        "Minimumsbestillingsmengden kan variere avhengig av produktet, men for de fleste av våre produkter er minimumsbestillingen 10 enheter. For spesifikke produktlinjer kan minimumsbestillingen være høyere eller lavere. Vennligst sjekk produktbeskrivelsen for detaljert informasjon.",
    },
    {
      question: "Hva er leveringstiden for bestillinger?",
      answer:
        "Leveringstiden avhenger av lagerstatus og leveringssted. Normalt tar det 3-5 virkedager for innenlands leveranser og 7-10 virkedager for internasjonale leveranser. Vi tilbyr også ekspresslevering for en ekstra kostnad.",
    },
    {
      question: "Tilbyr dere produkter fra kjente merkevarer?",
      answer:
        "Ja, vi tilbyr et bredt utvalg av produkter fra kjente merkevarer i salongbransjen. Dette inkluderer både hårpleieprodukter, hudpleieprodukter og stylingverktøy fra ledende internasjonale og lokale produsenter.",
    },
    {
      question: "Hvilke betalingsmetoder aksepterer dere?",
      answer:
        "Vi aksepterer kun fakturabetaling på EHF og epost med forfallsdato på 30 dager.",
    },
  ];
  //{
  //  question: "Hvordan kan jeg spore min bestilling?",
  //  answer:
  //    "Når bestillingen din er sendt, vil du motta en bekreftelsesmail med sporingsinformasjon. Du kan bruke denne informasjonen til å følge bestillingen din gjennom vår nettside eller direkte via transportørens sporingssystem.",
  //},

  return (
    <section className="py-20 md:pt-32 overflow-x-hidden">
      <div className="container mx-auto px-4">
        <div className="flex flex-wrap -m-2 md:-m-8">
          <div className="w-full xl:w-1/2 p-2 md:p-8">
            <span className="inline-block mb-3 py-1 px-5 text-xs font-semibold bg-secondary text-white rounded-3xl">
              Vanlige spørsmål
            </span>
            <h4 className="font-light mb-4 text-3xl sm:text-6xl">
              Ofte stilte spørsmål
            </h4>
            <p className="text-sm font-light text-gray-500 max-w-md">
              Her finner du svar på de vanligste spørsmålene vi mottar fra våre
              kunder. Hvis du har ytterligere spørsmål, er du alltid velkommen
              til å kontakte vår kundeservice.
            </p>
          </div>
          <div className="w-full xl:w-1/2 p-2 pt-10 md:p-8">
            {faqs.map((faq, index) => (
              <div key={index} className="mb-10 pb-6 border-b border-gray-200">
                <div
                  className="flex flex-nowrap items-center justify-between -m-2 cursor-pointer"
                  onClick={() => toggleFAQ(index)}
                >
                  <div className="w-auto p-2">
                    <h6 className="font-medium sm:font-normal lg:font-light text-lg sm:text-xl md:text-3xl">
                      {faq.question}
                    </h6>
                  </div>
                  <div className="w-auto p-2">
                    <span
                      className={`inline-block transform transition-transform ${
                        openIndex === index ? "rotate-180" : ""
                      }`}
                    >
                      <svg
                        width={15}
                        height={10}
                        viewBox="0 0 15 10"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M13.6664 1.22671C13.4166 0.978378 13.0787 0.838989 12.7264 0.838989C12.3742 0.838989 12.0363 0.978378 11.7864 1.22671L6.99977 5.94671L2.27977 1.22671C2.02995 0.978378 1.69202 0.838989 1.33977 0.838989C0.987521 0.838989 0.649585 0.978378 0.399769 1.22671C0.274798 1.35066 0.175605 1.49813 0.107913 1.66061C0.0402218 1.82309 0.00537109 1.99736 0.00537109 2.17338C0.00537109 2.3494 0.0402218 2.52367 0.107913 2.68615C0.175605 2.84863 0.274798 2.9961 0.399769 3.12005L6.0531 8.77338C6.17705 8.89835 6.32452 8.99754 6.487 9.06523C6.64948 9.13293 6.82375 9.16778 6.99977 9.16778C7.17578 9.16778 7.35006 9.13293 7.51254 9.06523C7.67502 8.99754 7.82248 8.89835 7.94643 8.77338L13.6664 3.12005C13.7914 2.9961 13.8906 2.84863 13.9583 2.68615C14.026 2.52367 14.0608 2.3494 14.0608 2.17338C14.0608 1.99736 14.026 1.82309 13.9583 1.66061C13.8906 1.49813 13.7914 1.35066 13.6664 1.22671Z"
                          fill="#1E2238"
                        />
                      </svg>
                    </span>
                  </div>
                </div>
                <div
                  className={`overflow-hidden transition-[max-height] duration-500 ${
                    openIndex === index ? "max-h-96" : "max-h-0"
                  }`}
                >
                  <p className="mt-2 text-base sm:text-lg text-gray-500">
                    {faq.answer}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default FAQ;
