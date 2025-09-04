import Image from "next/image";
import Link from "next/link";
import React from "react";

const FeaturedBrand = () => {
  return (
    <>
      <section className="p-2 md:p-6 w-full my-10">
        <div className="relative container mx-auto bg-secondary shadow-lg shadow-black/10 overflow-hidden rounded-2xl">
          <Link href="/merke/evagarden">
            <Image
              src="/assets/content/evagarden_cover.jpeg"
              alt="Evagarden"
              height={400}
              width={1000}
              className="w-full h-full hover:opacity-95 transition-opacity duration-300 ease-in-out"
            />
          </Link>
        </div>
      </section>
    </>
  );
};

export default FeaturedBrand;
