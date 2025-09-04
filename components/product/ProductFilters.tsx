"use client";
import React, { useEffect, useRef, useState } from "react";
import { BiChevronDown } from "react-icons/bi";
import { MdClose } from "react-icons/md";
import { fetchProductPageTopMenu } from "@/features/categories/categories.action";

export default function ProductFilters({
  totalProduct,
  selectedMainCategory,
  activeBrandFilter,
  onFiltersChange,
  onBrandFiltersChange,
  onCategoryFiltersChange,
  onSizeFilterChange,
  onSkinTypeFilterChange,
  onColorFilterChange,
  type,
  brandDetail,
}: any) {
  // const dropdownRef = useRef<HTMLDivElement>(null);
  const productLength = totalProduct || 0;
  const [filters, setFilters] = useState<string[]>(
    activeBrandFilter ? [activeBrandFilter] : []
  );
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);

  const [brandFilters, setBrandFilters] = useState<string[]>(
    activeBrandFilter ? [activeBrandFilter] : []
  );

  const [categoryFilters, setCategoryFilters] = useState<string[]>([]);

  const [sizeFilters, setSizeFilters] = useState<string[]>([]);

  const [skinTypeFilters, setSkinTypeFilters] = useState<string[]>([]);

  const [colorFilters, setColorFilters] = useState<string[]>([]);

  const [menu, setMenu] = useState({
    categories: [],
    brands: [],
    sizes: [],
    colors: [],
    skinTypes: [],
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getCategories = async () => {
      const categoriesData = await fetchProductPageTopMenu(
        brandFilters,
        categoryFilters
      );

      setMenu(categoriesData);
      setLoading(false);
    };

    getCategories();
  }, [brandFilters, categoryFilters]);

  //example data
  const filterOptions = {
    Størrelse: menu?.sizes,
    Hudtype: menu?.skinTypes,
    Farge: menu?.colors,
  };

  const handleDropdownToggle = (filterName: string) => {
    setActiveDropdown((prev) => (prev === filterName ? null : filterName));
  };

  const handleAddFilter = (filter: string, type: string) => {
    if (!filters.includes(filter)) {
      const updatedFilters = [...filters, filter];
      setFilters(updatedFilters);
      onFiltersChange(updatedFilters); // Notify parent about the change
      if (type === "brand") {
        const updatedBrandFilters = [...brandFilters, filter];
        setBrandFilters(updatedBrandFilters);
        onBrandFiltersChange(updatedBrandFilters);
      } else if (type === "Størrelse") {
        const updatedSizeFilters = [...sizeFilters, filter];
        setSizeFilters(updatedSizeFilters);
        onSizeFilterChange(updatedSizeFilters);
      } else if (type === "Hudtype") {
        const updatedSkinTypeFilters = [...skinTypeFilters, filter];
        setSkinTypeFilters(updatedSkinTypeFilters);
        onSkinTypeFilterChange(updatedSkinTypeFilters);
      } else if (type === "Farge") {
        const updatedColorFilters = [...colorFilters, filter];
        setColorFilters(updatedColorFilters);
        onColorFilterChange(updatedColorFilters);
      } else {
        const updatedCategoryFilters = [...categoryFilters, filter];
        setCategoryFilters(updatedCategoryFilters);
        onCategoryFiltersChange(updatedCategoryFilters);
      }
    }
  };

  const handleRemoveFilter = (filter: string) => {
    const updatedFilters = filters.filter((item) => item !== filter);
    setFilters(updatedFilters);
    onFiltersChange(updatedFilters); // Notify parent about the change

    // Remove the filter from the brand filters
    const updatedBrandFilters = brandFilters.filter((item) => item !== filter);
    setBrandFilters(updatedBrandFilters);
    onBrandFiltersChange(updatedBrandFilters);

    // Remove the filter from the size filters
    const updatedSizeFilters = sizeFilters.filter((item) => item !== filter);
    setSizeFilters(updatedSizeFilters);
    onSizeFilterChange(updatedSizeFilters);

    // Remove the filter from the skin type filters
    const updatedSkinTypeFilters = skinTypeFilters.filter(
      (item) => item !== filter
    );
    setSkinTypeFilters(updatedSkinTypeFilters);
    onSkinTypeFilterChange(updatedSkinTypeFilters);

    // Remove the filter from the color filters
    const updatedColorFilters = colorFilters.filter((item) => item !== filter);
    setColorFilters(updatedColorFilters);
    onColorFilterChange(updatedColorFilters);

    // Remove the filter from the category filters
    const updatedCategoryFilters = categoryFilters.filter(
      (item) => item !== filter
    );
    setCategoryFilters(updatedCategoryFilters);
    onCategoryFiltersChange(updatedCategoryFilters);
  };

  const handleClearFilters = () => {
    setFilters([]);
    setBrandFilters([]); // Clear brand filters
    setSizeFilters([]); // Clear brand filters
    setSkinTypeFilters([]); // Clear brand filters
    setColorFilters([]); // Clear brand filters
    setCategoryFilters([]); // Clear category filters
    onFiltersChange([]); // Notify parent about clearing all filters
    onBrandFiltersChange([]);
    onSizeFilterChange([]);
    onSkinTypeFilterChange([]);
    onColorFilterChange([]);
    onCategoryFiltersChange([]);
  };
  //console.log("selectedMainCategory", type);

  //These should be visible based on available data in products provided. so if no color, dont show.
  return (
    <div className="container px-4 mx-auto w-full pt-10">
      <div className="pb-9 text-center border-b border-black border-opacity-5">
        <div className="relative">
          <h2 className="text-4xl xl:text-5xl text-center text-black font-light leading-normal font-heading mt-3 mb-4 md:mb-4 capitalize">
            {type === "dibi-milano"
              ? "DIBI Milano"
              : type
              ? type
              : selectedMainCategory
              ? selectedMainCategory
              : "Alle produkter"}
          </h2>
          {brandDetail?.comments && (
            <p className="pt-2 text-center mx-auto max-w-2xl">
              {brandDetail?.comments}
            </p>
          )}
          <span
            style={{ top: "110px" }}
            className="md:absolute md:right-0 md:bottom-3 text-sm text-gray-400 font-base"
          >
            {new Intl.NumberFormat("nb-NO").format(productLength)} produkter
          </span>
        </div>
      </div>
      <div className="flex flex-wrap py-5 mb-0 xl:mb-0 border-b border-black border-opacity-10">
        {/* categories */}
        {menu?.categories?.length > 0 && (
          <div
            className="w-full sm:w-1/3 lg:w-1/5 py-2 sm:px-3 relative"
            // ref={dropdownRef}
          >
            <div
              className="flex justify-between items-center cursor-pointer py-5 px-4 xl:px-8 font-heading font-medium border border-gray-200 hover:border-gray-300 rounded-full bg-white"
              onClick={() => handleDropdownToggle("Kategori")}
            >
              <span>Kategori</span>
              <BiChevronDown
                size={20}
                className={`transition-transform ${
                  activeDropdown === "Kategori" ? "rotate-180" : "rotate-0"
                }`}
              />
            </div>

            {/* Dropdown Menu */}
            {/* {activeDropdown === 'Kategori' && (
            <ul className="absolute left-0 mt-2 w-full max-w-md bg-white border border-gray-200 shadow-lg rounded-lg z-10">
              {menu.categories.map((option: any, index) => (
                <li
                  key={index}
                  className="px-4 py-2 cursor-pointer hover:bg-gray-100 border-b border-tertiary/50"
                  onClick={() => {
                    handleAddFilter(option.category_name, 'category');
                    setActiveDropdown(null);
                  }}
                >
                  {option.category_name + '(' + option.total_products + ')'}
                </li>
              ))}
            </ul>
          )} */}
            {activeDropdown === "Kategori" && (
              <ul className="absolute left-0 mt-2 w-full max-w-md bg-white border border-gray-200 shadow-lg rounded-lg z-10">
                {menu.categories.map((option: any, index) => {
                  const isSelected = filters.includes(option.category_name);
                  return (
                    option.total_products > 0 && (
                    <li
                      key={index}
                      className={`px-4 py-2 cursor-pointer hover:bg-gray-100 border-b border-tertiary/50 ${
                        isSelected ? "cursor-not-allowed text-gray-400" : ""
                      }`}
                      onClick={() => {
                        if (!isSelected) {
                          handleAddFilter(option.category_name, "category");
                          setActiveDropdown(null);
                        }
                      }}
                    >
                      {option.category_name + "(" + option.total_products + ")"}
                    </li>)
                  );
                })}
              </ul>
            )}
          </div>
        )}
        {/* brands */}
        {menu?.brands?.length > 0 && (
          <div
            className="w-full sm:w-1/3 lg:w-1/5 py-2 sm:px-3 relative"
            // ref={dropdownRef}
          >
            <div
              className="flex justify-between items-center cursor-pointer py-5 px-4 xl:px-8 font-heading font-medium border border-gray-200 hover:border-gray-300 rounded-full bg-white"
              onClick={() => handleDropdownToggle("Merker")}
            >
              <span>Merker</span>
              <BiChevronDown
                size={20}
                className={`transition-transform ${
                  activeDropdown === "Merker" ? "rotate-180" : "rotate-0"
                }`}
              />
            </div>

            {/* Dropdown Menu */}
            {/* {activeDropdown === 'Merker' && (
            <ul className="absolute left-0 mt-2 w-full max-w-md bg-white border border-gray-200 shadow-lg rounded-lg z-10">
              {menu.brands.map((option: any, index) => (
                <li
                  key={index}
                  className="px-4 py-2 cursor-pointer hover:bg-gray-100 border-b border-tertiary/50"
                  onClick={() => {
                    handleAddFilter(option.brand_name, 'brand');
                    setActiveDropdown(null);
                  }}
                >
                  {option.brand_name}
                </li>
              ))}
            </ul>
          )} */}
            {activeDropdown === "Merker" && (
              <ul className="absolute left-0 mt-2 w-full max-w-md bg-white border border-gray-200 shadow-lg rounded-lg z-10 max-h-52 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100">
                {menu.brands.map((option: any, index) => {
                  const isSelected = filters.includes(option.brand_name);
                  return (
                    option.total_products > 0 && (
                      <li
                      key={index}
                      className={`px-4 py-2 cursor-pointer hover:bg-gray-100 border-b border-tertiary/50 ${
                        isSelected ? "cursor-not-allowed text-gray-400" : ""
                      }`}
                      onClick={() => {
                        if (!isSelected) {
                          handleAddFilter(option.brand_name, "brand");
                          setActiveDropdown(null);
                        }
                      }}
                    >
                      {option.brand_name}
                    </li>
                    )
                  );
                })}
              </ul>
            )}
          </div>
        )}

        {Object.entries(filterOptions).map(
          ([filterName, options]) =>
            options?.length > 0 && (
              <div
                key={filterName}
                className="w-full sm:w-1/3 lg:w-1/5 py-2 sm:px-3 relative"
              >
                <div
                  className="flex justify-between items-center cursor-pointer py-5 px-4 xl:px-8 font-heading font-medium border border-gray-200 hover:border-gray-300 rounded-full bg-white"
                  onClick={() => handleDropdownToggle(filterName)}
                >
                  <span>{filterName}</span>
                  <BiChevronDown
                    size={20}
                    className={`transition-transform ${
                      activeDropdown === filterName ? "rotate-180" : "rotate-0"
                    }`}
                  />
                </div>

                {/* Dropdown Menu */}
                {activeDropdown === filterName && (
                  <ul className="absolute left-0 mt-2 w-full max-w-md bg-white border border-gray-200 shadow-lg rounded-lg z-10">
                    {options?.map((option: any, index) => {
                      const isSelected = filters.includes(option.title);
                      return (
                        <li
                          key={index}
                          className={`px-4 py-2 cursor-pointer hover:bg-gray-100 border-b border-tertiary/50 ${
                            isSelected ? "cursor-not-allowed text-gray-400" : ""
                          }`}
                          onClick={() => {
                            if (!isSelected) {
                              handleAddFilter(option.title, filterName);
                              setActiveDropdown(null);
                            }
                          }}
                        >
                          {option.title}
                        </li>
                      );
                    })}
                  </ul>
                )}
              </div>
            )
        )}
      </div>
      {filters.length > 0 && (
        <div className="flex flex-wrap py-2 mb-0 border-b border-black border-opacity-10">
          {filters.map((filter, index) => (
            <div
              key={index}
              className="w-auto py-2 sm:px-3 cursor-pointer"
              onClick={() => handleRemoveFilter(filter)}
            >
              <div className="flex justify-between items-center cursor-pointer py-3 px-4 font-heading font-medium border border-gray-200 hover:border-gray-300 rounded-full bg-tertiary">
                <span className="pr-4">{filter}</span>
                <MdClose size={20} />
              </div>
            </div>
          ))}
          {filters.length > 1 && (
            <div className="w-auto py-2 sm:px-3">
              <div
                onClick={handleClearFilters}
                className="flex justify-between items-center cursor-pointer py-3 px-4 font-heading font-medium border border-gray-200 hover:border-gray-300 rounded-full bg-gray-200"
              >
                <span className="">Fjern alle filtre</span>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
