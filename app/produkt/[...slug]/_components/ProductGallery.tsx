"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import useProductDetailStore from "../store";

interface ProductGalleryProps {
  products: any;
  images: { product_thumb_small: string }[];
  mainImage: string;
}

const ProductGallery: React.FC<ProductGalleryProps> = ({
  products,
  images,
  mainImage,
}) => {
  const [selectedImage, setSelectedImage] = useState<any>();
  const selectedVariant = useProductDetailStore(
    (state) => state.selectedVariant
  );
  //console.log("selectedVariant", selectedVariant);
  console.log("selectedImage", products?.product_id);
  
  const clearSelectedVariant = useProductDetailStore((state) => state.clearSelectedVariant);

// When product changes, clear the selected variant
useEffect(() => {
  clearSelectedVariant();
}, [products?.product_id]); // or `product.slug`, based on your data
  
  useEffect(() => {
    setSelectedImage(
      selectedVariant ? selectedVariant?.product_image || mainImage : mainImage
    );
  }, [selectedVariant, mainImage, products?.product_id]);

  const handleImageClick = (image: string) => {
    setSelectedImage(image);
  };

  return (
    <div className="w-full lg:w-1/2 p-4">
      <div className="group pb-10">
        <div className="relative w-full h-auto rounded-xl transition duration-200 mb-4">
          <div className="w-full h-full relative aspect-square overflow-hidden">
            <img
              className="absolute inset-0 rounded-xl aspect-square w-full object-contain transform group-hover:scale-105 transition duration-200"
              src={selectedImage}
              alt={products?.product_name}
              height={700}
              width={700}
            />
            {products.special_price && (
              <>
                <div className="absolute top-4 md:top-8 left-4 md:left-8">
                  <p className="font-base uppercase text-white bg-primary rounded-full px-3 mb-4 py-1 text-sm sm:text-sm md:text-base">
                    TILBUD
                  </p>
                </div>
              </>
            )}
          </div>
        </div>
        {images?.length > 0 && (
          <div className="flex flex-nowrap items-center justify-center gap-2 sm:gap-4 md:gap-8">
            <div className="slider-prod">
              <Swiper
                modules={[Autoplay]} // Removed Pagination
                slidesPerView={3}
                autoplay={{ delay: 3000 }}
                breakpoints={{
                  1024: {
                    slidesPerView: 3,
                  },
                  768: {
                    slidesPerView: 3,
                  },
                  480: {
                    slidesPerView: 2,
                  },
                }}
              >
                <SwiperSlide>
                  <span
                    onClick={() => handleImageClick(mainImage)}
                    className="group"
                  >
                    <div className="relative overflow-hidden border">
                      <img
                        className=" inset-0 rounded-lg w-full h-full object-cover transform group-hover:scale-105 transition duration-200 mobileimg"
                        style={{ height: "150px" }}
                        src={mainImage}
                        alt={`Main Thumbnail`}
                      />
                    </div>
                  </span>
                </SwiperSlide>
                {images.map((item, i) => (
                  <SwiperSlide key={i}>
                    <span
                      onClick={() => handleImageClick(item.product_thumb_small)}
                      className="group"
                    >
                      <div className="relative overflow-hidden border">
                        <img
                          className=" inset-0 rounded-lg w-full h-full object-cover transform group-hover:scale-105 transition duration-200 mobileimg"
                          src={item.product_thumb_small}
                          style={{ height: "150px" }}
                          alt={`Thumbnail ${i + 1}`}
                        />
                      </div>
                    </span>
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductGallery;
