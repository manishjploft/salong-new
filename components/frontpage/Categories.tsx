"use client";
import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import Skeleton from "react-loading-skeleton";
import Link from "next/link";
import { fetchFeaturedCategories } from "@/features/categories/categories.action";

export const dynamic = "force-dynamic";

const Categories = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (localStorage.getItem("phone")) {
      localStorage.removeItem("phone");
    }
  }, []);

  useEffect(() => {
    const getProducts = async () => {
      const categoriesData = await fetchFeaturedCategories();
      setCategories(categoriesData || []);
      setLoading(false);
    };

    getProducts();
  }, []);

  return (
    <section className="p-4 md:p-6 bg-secondary w-full">
      <div
        id="salongpartner"
        className="flex flex-row overflow-hidden justify-center gap-4"
      >
        {loading ? (
          <div className="flex space-x-4">
            {[...Array(8)].map((_, i) => (
              <Skeleton key={i} height={90} width={180} />
            ))}
          </div>
        ) : (
          <Swiper
            modules={[Autoplay]} // Removed Pagination
            spaceBetween={10}
            autoplay={{ delay: 3000 }}
            breakpoints={{
              1024: {
                slidesPerView: 7,
              },
              768: {
                slidesPerView: 4,
              },
              480: {
                slidesPerView: 3,
              },
              330: {
                slidesPerView: 2,
              },
              0: {
                slidesPerView: 1,
              },
            }}
          >
            <SwiperSlide>
              <div>
                <Link
                  href={"/salg"}
                  className="bg-white inline-block w-full text-center hover:bg-primary/20 hover:text-white rounded-xl p-8 shadow-lg shadow-black/10"
                >
                  <p className="uppercase font-light text-xl md:text-2xl lg:text-3xl whitespace-nowrap">
                    Salg
                  </p>
                </Link>
              </div>
            </SwiperSlide>
            {/* {categories.map((category: any, i) => (
              <SwiperSlide key={i}>
                <div>

                  <Link
                    href={'/kategori/' + category.slug}
                    className="bg-white inline-block w-full text-center hover:bg-primary/20 hover:text-white rounded-xl p-8 shadow-lg shadow-black/10"
                  >
                    <p className="uppercase font-light text-xl md:text-2xl lg:text-3xl whitespace-nowrap">
                      {category.category_name}
                    </p>
                  </Link>
                </div>
              </SwiperSlide>
            ))} */}
            <SwiperSlide>
              <div>
                <Link
                  href={"/kategori/sminke"}
                  className="bg-white inline-block w-full text-center hover:bg-primary/20 hover:text-white rounded-xl p-8 shadow-lg shadow-black/10"
                >
                  <p className="uppercase font-light text-xl md:text-2xl lg:text-3xl whitespace-nowrap">
                    Sminke
                  </p>
                </Link>
              </div>
            </SwiperSlide>
            <SwiperSlide>
              <div>
                <Link
                  href={"/kategori/hudpleie"}
                  className="bg-white inline-block w-full text-center hover:bg-primary/20 hover:text-white rounded-xl p-8 shadow-lg shadow-black/10"
                >
                  <p className="uppercase font-light text-xl md:text-2xl lg:text-3xl whitespace-nowrap">
                    Hudpleie
                  </p>
                </Link>
              </div>
            </SwiperSlide>
            <SwiperSlide>
              <div>
                <Link
                  href={"/kategori/harpleie"}
                  className="bg-white inline-block w-full text-center hover:bg-primary/20 hover:text-white rounded-xl p-8 shadow-lg shadow-black/10"
                >
                  <p className="uppercase font-light text-xl md:text-2xl lg:text-3xl whitespace-nowrap">
                    Hårpleie
                  </p>
                </Link>
              </div>
            </SwiperSlide>
            <SwiperSlide>
              <div>
                <Link
                  href={"/kategori/annet"}
                  className="bg-white inline-block w-full text-center hover:bg-primary/20 hover:text-white rounded-xl p-8 shadow-lg shadow-black/10"
                >
                  <p className="uppercase font-light text-xl md:text-2xl lg:text-3xl whitespace-nowrap">
                    Annet
                  </p>
                </Link>
              </div>
            </SwiperSlide>

            <SwiperSlide>
              <div>
                <Link
                  href={"/merke"}
                  className="bg-white inline-block w-full text-center hover:bg-primary/20 hover:text-white rounded-xl p-8 shadow-lg shadow-black/10"
                >
                  <p className="uppercase font-light text-xl md:text-2xl lg:text-3xl whitespace-nowrap">
                    Merker
                  </p>
                </Link>
              </div>
            </SwiperSlide>
            <SwiperSlide>
              <div>
                <Link
                  href={"/nyheter"}
                  className="bg-white inline-block w-full text-center hover:bg-primary/20 hover:text-white rounded-xl p-8 shadow-lg shadow-black/10"
                >
                  <p className="uppercase font-light text-xl md:text-2xl lg:text-3xl whitespace-nowrap">
                    Nyheter
                  </p>
                </Link>
              </div>
            </SwiperSlide>
          </Swiper>
        )}
      </div>
    </section>
  );
};

export default Categories;
