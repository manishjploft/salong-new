"use client";
import { brands, categories } from "@/utils/store";
import React, { useState } from "react";
import { BiChevronDown } from "react-icons/bi";

export default function ProductsSidebar() {
  const visibleBrands = brands; //.filter((brand) => brand.visibleInMenu);

  const [expandedCategoryIndex, setExpandedCategoryIndex] = useState<
    number | null
  >(null);

  const toggleCategory = (index: number) => {
    setExpandedCategoryIndex((prevIndex) =>
      prevIndex === index ? null : index
    );
  };

  return (
    <>
      <section>
        <div className="px-7 md:px-14 py-8 md:py-16 border-r border-gray-200">
          <p className="font-semibold mb-2">Kategorier</p>
          <hr />

          <div className="flex flex-col gap-3 pt-4 mb-10">
            <a href="#" className="inline-block text-sm font-semibold">
              Alle
            </a>
            {categories.map((category, index) => (
              <div key={index} className="w-full flex flex-col">
                {typeof category === "string" ? (
                  <div className="w-full flex flex-row justify-between items-center">
                    <p className="text-sm font-semibold text-gray-500">
                      {category}
                    </p>
                  </div>
                ) : (
                  <div className="w-full flex flex-col">
                    <div className="w-full flex flex-row justify-between items-center">
                      <p className="text-sm font-semibold text-gray-500">
                        {category.name}
                      </p>
                      {category.categories && (
                        <BiChevronDown
                          size={20}
                          className={`cursor-pointer transition-transform duration-300 ${
                            expandedCategoryIndex === index ? "rotate-180" : ""
                          }`}
                          onClick={() => toggleCategory(index)}
                        />
                      )}
                    </div>

                    {expandedCategoryIndex === index && (
                      <div className="ml-3 mt-2">
                        {category.categories?.map((subcategory, subIndex) => (
                          <div
                            key={subIndex}
                            className="w-full flex flex-row justify-between items-center mt-1"
                          >
                            <p className="text-sm font-normal text-gray-400">
                              {subcategory}
                            </p>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                )}
              </div>
            ))}
          </div>
          <p className="font-semibold mb-2">Merker</p>
          <hr />
          <div className="flex flex-col gap-4 pt-4">
            {visibleBrands.map((brand, index) => (
              <div
                key={index}
                className="w-full flex flex-row justify-between items-center"
              >
                <p className="text-sm font-semibold text-gray-500">
                  {brand.name}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
