// "use client";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { fetchSetting } from "@/features/setting/setting.action";
import { fetchBrandIcons } from "@/features/brand/brand.action";
import { auth } from "@/utils/auth.util";

export const dynamic = "force-dynamic";

const brands = [
  {
    name: "fab brows",
    logo: "/assets/content/brands/fabbrows.png",
    link: "/merke/fab-brows",
  },
  {
    name: "DIBI Milano",
    logo: "/assets/content/brands/dibimilano.png",
    link: "/merke/dibi-milano",
  },
  {
    name: "Lash Bomb",
    logo: "/assets/content/brands/lashbomb.png",
    link: "/merke/lash-bomb",
  },
  {
    name: "Evagarden",
    logo: "/assets/content/brands/evagarden.png",
    link: "/merke/evagarden",
  },
  {
    name: "Solarium",
    logo: "/assets/content/brands/solarium.png",
    link: "/merke/solarium",
  },
  {
    name: "Solutions Cosmeceuticals",
    logo: "/assets/content/brands/solutions.png",
    link: "/merke/solutions-cosmeceuticals",
  },
];

const Hero = async () => {
  const session: any = await auth();
  const setting = await fetchSetting();
  const brandList = await fetchBrandIcons();
  // const [authenticated, setAuthenticated] = useState(true);

  return (
    <>
      <section className="w-full bg-secondary overflow-hidden">
        <div className="px-2 md:px-6 pt-10 container3">
          <div className="bg-white rounded-2xl py-6 pr-6 pl-6 lg:pl-12 xl:pl-24 shadow-lg shadow-black/10">
            <div className="flex flex-wrap -m-4">
              <div className="w-full flex flex-col items-start justify-center md:w-8/12 lg:w-7/12 p-4">
                <div className="py-16">
                  {session || session?.user?.email ? (
                    <>
                      <h1 className="font-extralight text-5xl md:text-6xl lg:text-7xl xl:text-8xl max-w-xl mb-6 pt-4 text-black">
                        {setting?.banner_heading_login}
                      </h1>
                      <p className="text-black text-lg font-extralight mb-12 max-w-lg">
                        {setting.banner_description_login}
                      </p>
                    </>
                  ) : (
                    <>
                      <h1 className="font-extralight text-5xl md:text-6xl lg:text-7xl xl:text-8xl max-w-xl mb-6 pt-4 text-black">
                        {setting.banner_heading}
                      </h1>
                      <p className="text-black text-lg font-extralight mb-12 max-w-lg">
                        {setting.banner_description}
                      </p>
                    </>
                  )}

                  <div className="flex flex-wrap gap-4">
                    {session || session?.user?.email ? (
                      <>
                        <Link
                          href={setting?.banner_first_link_login || "/"}
                          className="bg-primary text-white rounded-full hover:bg-secondary hover:text-primary focus:ring-4 focus:ring-gray-200 text-sm font-semibold px-8 h-12 inline-flex items-center transition duration-200"
                        >
                          {setting?.banner_first_button_login}
                        </Link>
                        <Link
                          href={setting?.banner_second_link_login}
                          className="bg-secondary hover:bg-gray-50 text-primary rounded-full border border-secondary hover:border-primary focus:ring-4 focus:ring-gray-200 text-sm font-semibold px-8 h-12 inline-flex items-center transition duration-200"
                        >
                          {setting?.banner_second_button_login}
                        </Link>
                      </>
                    ) : (
                      <>
                        <Link
                          href={setting?.banner_first_link}
                          className="bg-primary text-white rounded-full hover:bg-secondary hover:text-primary focus:ring-4 focus:ring-gray-200 text-sm font-semibold px-8 h-12 inline-flex items-center transition duration-200"
                        >
                          {setting?.banner_first_button}
                        </Link>
                        <Link
                          href={setting?.banner_second_link}
                          className="bg-secondary hover:bg-gray-50 text-primary rounded-full border border-secondary hover:border-primary focus:ring-4 focus:ring-gray-200 text-sm font-semibold px-8 h-12 inline-flex items-center transition duration-200"
                        >
                          {setting?.banner_second_button}
                        </Link>
                      </>
                    )}
                  </div>
                </div>
              </div>
              <div className="w-full md:w-4/12 lg:w-5/12 mt-4 lg:mt-0 p-4 lg:p-2 4 scale-105">
                <div className="group ">
                  <div className="relative overflow-hidden rounded-2xl h-[400px] sm:h-[580px] md:h-[400px] lg:h-[540px] xl:h-[640px] 2xl:h-[640px]">
                    {session || session?.user?.email ? (
                      <img
                        className="absolute inset-0 rounded-2xl w-full h-auto md:h-full object-contain lg:object-cover group-hover:scale-105 transition-all duration-500 ease-in-out"
                        src={
                          setting.banner_image_login ||
                          "/assets/content/dibi_milano_hero.webp"
                        }
                        alt="Salongpartner.no - utforsk våre produkter"
                        height={600}
                        width={600}
                      />
                    ) : (
                      <>
                        <img
                          className="absolute inset-0 rounded-2xl w-full h-auto md:h-full object-contain group-hover:scale-105 transition-all duration-500 ease-in-out"
                          src={
                            setting.banner_image ||
                            "/assets/content/evagarden.webp"
                          }
                          alt="Salongparter - Bli forhandler"
                          height={600}
                          width={600}
                        />
                      </>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="flexx hidden flex-row gap-2 container3 items-center justify-center p-0 m-2">
          <div className="bg-white p-0.5 rounded-full">
            <div className="p-1.5 rounded-full" />
          </div>
          <div className="bg-white p-0.5 rounded-full">
            <div className="p-1.5 bg-secondary rounded-full" />
          </div>
          <div className="bg-white p-0.5 rounded-full">
            <div className="p-1.5 bg-secondary rounded-full" />
          </div>
        </div>
        {/* DYNAMIC BRANDS */}
        {/*
        <div className="flex flex-wrap container3 items-center p-8 -m-4">
          {setting?.brands?.slice(0, 6).map((item: any, i: number) => {
            return (
              <div key={i} className="w-1/2 md:w-1/3 lg:w-1/6 p-4">
                <img
                  className="mx-auto grayscale object-contain flex-shrink-0 h-20"
                  src={item}
                  alt="Merke"
                />
              </div>
            );
          })}
        </div>
         */}
        {/* STATIC BRANDS */}
        <div className="flex flex-wrap container3 items-center p-8 -m-4">
          {brands.map((item: any, i: number) => {
            return (
              <Link
                href={item.link}
                key={i}
                className="w-1/2 md:w-1/3 lg:w-1/6 p-4"
              >
                <img
                  className="mx-auto grayscale object-contain flex-shrink-0 h-20"
                  src={item.logo}
                  alt={item.name}
                />
              </Link>
            );
          })}
        </div>
      </section>
    </>
  );
};

export default Hero;
