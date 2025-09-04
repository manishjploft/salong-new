import React from "react";

export default function ProfileInformation() {
  return (
    <>
      <section className="py-16 min-h-[60vh]">
        <div className="container mx-auto px-4">
          <div className="mb-10">
            <h2 className="mb-3 font-heading font-light text-4xl text-gray-900">
              Mine opplysninger
            </h2>
            <p className="text-sm text-gray-400 font-base">
              Se dine opplysninger her
            </p>
          </div>
          <div className="w-full max-w-lg flex flex-row justify-between">
            <div className="w-full">
              <p>Kontaktperson:</p>
              <p>Firmanavn:</p>
              <p>Organisasjonsnummer:</p>
              <br />
              <p className="font-bold">Leveringsinformasjon:</p>
              <p>Adresse:</p>
              <p>Postnr:</p>
              <p>Poststed:</p>
            </div>
            <div className="w-full justify-end font-light tracking-wide">
              <p>Ola Nordmann</p>
              <p>ABC Firma AS</p>
              <p>987654987</p>
              <br />
              <br />
              <p>Snarveien 42</p>
              <p>2385</p>
              <p>Storbyåsen</p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
