"use client";
import React, { useEffect, useState, useMemo } from "react";
import Image from "next/image";
import dynamic from "next/dynamic";
import useProductDetailStore from "../store";

// Dynamically import Swiper to reduce initial bundle size
const Swiper = dynamic(() => import("swiper/react").then(module => module.Swiper), {
  ssr: false,
  loading: () => (
    <div className="flex gap-2">
      {[1, 2, 3].map((i) => (
        <div key={i} className="w-20 h-20 bg-gray-200 rounded-lg animate-pulse"></div>
      ))}
    </div>
  ),
});

const SwiperSlide = dynamic(() => import("swiper/react").then(module => module.SwiperSlide), {
  ssr: false,
});

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Autoplay } from "swiper/modules";

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
  const [selectedImage, setSelectedImage] = useState<string>(mainImage);
  const selectedVariant = useProductDetailStore(
    (state) => state.selectedVariant
  );
  
  const clearSelectedVariant = useProductDetailStore((state) => state.clearSelectedVariant);

  // When product changes, clear the selected variant
  useEffect(() => {
    clearSelectedVariant();
  }, [products?.product_id, clearSelectedVariant]);
  
  // Memoize the current image to prevent unnecessary re-renders
  const currentImage = useMemo(() => {
    return selectedVariant ? selectedVariant?.product_image || mainImage : mainImage;
  }, [selectedVariant, mainImage]);

  useEffect(() => {
    setSelectedImage(currentImage);
  }, [currentImage]);

  const handleImageClick = (image: string) => {
    setSelectedImage(image);
  };

  return (
    <div className="w-full lg:w-1/2 p-4">
      <div className="group pb-10">
        <div className="relative w-full h-auto rounded-xl transition duration-200 mb-4">
          <div className="w-full h-full relative aspect-square overflow-hidden">
            <Image
              className="absolute inset-0 rounded-xl aspect-square w-full object-contain transform group-hover:scale-105 transition duration-200"
              src={selectedImage}
              alt={products?.product_name || 'Product image'}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 50vw"
              priority
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
                modules={[Autoplay]}
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
                    className="group cursor-pointer"
                  >
                    <div className="relative overflow-hidden border">
                      <Image
                        className="inset-0 rounded-lg w-full h-full object-cover transform group-hover:scale-105 transition duration-200"
                        style={{ height: "150px" }}
                        src={mainImage}
                        alt="Main Thumbnail"
                        width={150}
                        height={150}
                        loading="lazy"
                      />
                    </div>
                  </span>
                </SwiperSlide>
                {images.map((item, i) => (
                  <SwiperSlide key={i}>
                    <span
                      onClick={() => handleImageClick(item.product_thumb_small)}
                      className="group cursor-pointer"
                    >
                      <div className="relative overflow-hidden border">
                        <Image
                          className="inset-0 rounded-lg w-full h-full object-cover transform group-hover:scale-105 transition duration-200"
                          src={item.product_thumb_small}
                          style={{ height: "150px" }}
                          alt={`Thumbnail ${i + 1}`}
                          width={150}
                          height={150}
                          loading="lazy"
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
