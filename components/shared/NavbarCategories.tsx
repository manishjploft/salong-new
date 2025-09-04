"use client";
import { slugify } from "@/utils/slugify";
import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useRef, useState } from "react";

const NavbarCategories = () => {
  const dropdownRef = useRef<HTMLDivElement>(null);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [menuData, setMenuData] = useState({
    brands: [],
    categories: []
  });
  const categoryOrder = ["Sminke", "Hudpleie", "Hårpleie", "Annet"];

  useEffect(() => {
    const fetchMenuData = async () => {
      try {
        const response = await axios.get(process.env.NEXT_PUBLIC_API_URL + 'navmenu');
        console.log("response", response);

        setMenuData(response.data.data); // Assuming `response.data` is an array of category items
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchMenuData();
  }, []);

  const toggleDropdown = (dropdownName: string) => {
    setOpenDropdown((prev) => (prev === dropdownName ? null : dropdownName));
  };

  const closeDropdown = () => {
    setOpenDropdown(null); // Close the currently open dropdown
  };

  useEffect(() => {
    // Close the dropdown when clicking outside
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setOpenDropdown(null); // Close the dropdown
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    // Cleanup event listener on component unmount
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const getFilteredCategories = () => {
    return menuData.categories;
  };

  const getAllCategories = () => {
    return menuData.categories.filter((category) => !latestThree.includes(category));
  };

  const filteredCategories = getFilteredCategories();
  const latestThree = filteredCategories.slice(-3); // Latest three categories with subcategories
  const others = getAllCategories(); // All remaining categories, regardless of subcategories

  // Sort categories based on the predefined order
  const sortedCategories = [...(menuData?.categories || [])].sort((a: any, b: any) => {
    const indexA = categoryOrder.indexOf(a.category_name);
    const indexB = categoryOrder.indexOf(b.category_name);

    // If category is not in the order array, place it after the ordered ones
    return (indexA !== -1 ? indexA : Infinity) - (indexB !== -1 ? indexB : Infinity);
  });
  console.log("sortedCategories", sortedCategories);

  return (
    <>
      <nav className="relative w-full bg-white py-0 lg:py-3 shadow-lg shadow-black/10">
        <div className="container2 mx-auto px-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center" ref={dropdownRef}>
              <ul className="hidden lg:flex items-center gap-4">
                <li className="relative">
                  <div
                    onClick={() => toggleDropdown("brands")}
                    className={`cursor-pointer text-black ${openDropdown === "brands" ? "font-bold" : "font-medium"
                      } text-sm py-3 px-3 hover:text-opacity-80 transition duration-200`}
                  >
                    Merker
                  </div>
                  {openDropdown === "brands" && (
                    <div className="absolute top-12 left-0 min-w-[720px] bg-white shadow-lg rounded-lg overflow-y-auto max-h-none z-10">
                      {/* <div className="grid grid-cols-3 gap-4 p-4"> */}
                      <div className="custom-grid p-4"> 
                        <ul>
                          {menuData.brands
                            .slice(0, Math.ceil(menuData.brands.length / 3))
                            .map((brand: any, index) => (
                              brand.total_products > 0 && (
                                <li key={index}>
                                  <Link
                                    href={`/merke/${brand.slug}`}
                                    onClick={closeDropdown}
                                    className="group cursor-pointer"
                                  >
                                    <p className="px-4 py-2 border-b whitespace-nowrap overflow-x-hidden group-hover:bg-background border-tertiary/50">
                                      {brand.brand_name}
                                    </p>
                                  </Link>
                                </li>
                              )
                            ))}
                        </ul>
                        <ul>
                          {menuData.brands
                            .slice(
                              Math.ceil(menuData.brands.length / 3),
                              Math.ceil((menuData.brands.length * 2) / 3)
                            )
                            .map((brand: any, index) => (
                              brand.total_products > 0 && (
                                <li key={index}>
                                  <Link
                                    href={`/merke/${slugify(brand.brand_name)}`}
                                    onClick={closeDropdown}
                                    className="group cursor-pointer"
                                  >
                                    <p className="px-4 py-2 border-b whitespace-nowrap overflow-x-hidden group-hover:bg-background border-tertiary/50">
                                      {brand.brand_name}
                                    </p>
                                  </Link>
                                </li>
                              )
                            ))}
                        </ul>
                        <ul>
                          {menuData.brands
                            .slice(Math.ceil((menuData.brands.length * 2) / 3))
                            .map((brand: any, index) => (
                              brand.total_products > 0 && (
                                <li key={index}>
                                  <Link
                                    href={`/merke/${slugify(brand.brand_name)}`}
                                    onClick={closeDropdown}
                                    className="group cursor-pointer"
                                  >
                                    <p className="px-4 py-2 border-b whitespace-nowrap overflow-x-hidden group-hover:bg-background border-tertiary/50">
                                      {brand.brand_name}
                                    </p>
                                  </Link>
                                </li>
                              )
                            ))}
                        </ul>
                      </div>
                    </div>
                  )}
                </li>
                {sortedCategories?.map((category: any, index) => (
                  <div key={index} className="relative">
                    {/* Button to toggle dropdown */}
                    {category.subcategories.length > 0 ?
                      <button
                        onClick={() => toggleDropdown(category.category_name)}
                        className={`cursor-pointer text-black text-sm ${openDropdown === category.category_name
                          ? "font-bold"
                          : "font-medium"
                          } py-3 px-3 hover:text-opacity-80 transition duration-200`}
                      >
                        {category.category_name}
                      </button>
                      :
                      <Link
                        href={`/kategori/${category.slug}`}
                        onClick={closeDropdown}
                        className="text-black text-sm font-medium py-3 px-3 hover:text-opacity-80 transition duration-200"
                      >
                        {category.category_name}
                      </Link>
                    }

                    {/* Main Dropdown for Subcategories */}
                    {openDropdown === category.category_name && (
                      <div className="absolute top-12 left-0 min-w-[720px] bg-white shadow-lg rounded-lg overflow-y-auto max-h-[400px] z-10">
                        <Link onClick={closeDropdown} href={`/kategori/${category.slug}`} className="text-primary px-6 hover:underline">
                          Se alt
                        </Link>
                        {/* <div className="grid grid-cols-3 gap-4 p-4" > */}
                      <div className="custom-grid p-4"> 

                          {category.category_image &&
                            <Link
                              href={`/kategori/${category.slug}`}
                              onClick={closeDropdown}
                              className="group cursor-pointer"
                            >
                              <Image
                                src={category.category_image}
                                alt={category.category_name}
                                className="object-cover w-full h-auto aspect-video"
                                width={220}
                                height={180}
                              />
                              <p className="text-primary font-semibold px-4 py-2 border-b whitespace-nowrap overflow-x-hidden group-hover:bg-background border-tertiary/50">
                                Se alt
                              </p>
                            </Link>
                          }
                          {category?.subcategories?.map(
                            (subcategory: any, subIndex: number) => (
                              subcategory.product === 1 &&
                              <div key={subIndex}>
                                {/* Subcategory Name */}
                                <Link
                                  href={`/kategori/${category.slug}/${subcategory.slug}`}
                                  onClick={closeDropdown}
                                  className="group cursor-pointer"
                                >
                                  <p className="text-primary font-semibold px-4 py-2 border-b whitespace-nowrap overflow-x-hidden group-hover:bg-background border-tertiary/50">
                                    {subcategory.category_name}
                                  </p>
                                </Link>

                                {/* Subsubcategories */}
                                                <ul className="pl-4">

                                  {subcategory?.subcategories?.map(
                                    (subsubcategory: any, subSubIndex: number) => (
                                      subsubcategory.product === 1 &&
                                      <li key={subSubIndex}>
                                        <Link
                                          href={`/kategori/${category.slug}/${subcategory.slug}/${subsubcategory.slug}`}
                                          onClick={closeDropdown}
                                          className="group cursor-pointer"
                                        >
                                          <p className="px-4 py-2 border-b whitespace-nowrap overflow-x-hidden group-hover:bg-background border-tertiary/50">
                                            {subsubcategory.category_name}
                                          </p>
                                        </Link>
                                      </li>
                                    )
                                  )}
                                </ul>
                              </div>
                            )
                          )}
                        </div>
                      </div>
                    )}
                  </div>
                ))}
                {/* Render Static "Other" Category */}
                {/* {others.length > 0 &&
                  <div className="relative">
                    <button
                      onClick={() => toggleDropdown("Other")}
                      className={`cursor-pointer text-black text-sm ${openDropdown === "Other" ? "font-bold" : "font-medium"
                        } py-3 px-3 hover:text-opacity-80 transition duration-200`}
                    >
                      Annet
                    </button>

                    {openDropdown === "Other" && (
                      <div className="absolute top-12 left-0 min-w-[720px] bg-white shadow-lg rounded-lg overflow-y-auto max-h-[400px] z-10">
                        <div className="grid grid-cols-3 gap-4 p-4">
                          {others.map((category: any, index: number) => (
                            <div key={index}>
                              <Link
                                href={`/kategori/${category.slug}`}
                                onClick={closeDropdown}
                                className="group cursor-pointer"
                              >
                                <p className="text-primary font-semibold px-4 py-2 border-b whitespace-nowrap overflow-x-hidden group-hover:bg-background border-tertiary/50">
                                  {category.category_name}
                                </p>
                              </Link>
                              <ul className="pl-4">
                                {category.subcategories.map((subcategory: any, subIndex: number) => (
                                  <li key={subIndex}>
                                    <Link
                                      href={`/kategori/${category.slug}/${subcategory.slug}`}
                                      onClick={closeDropdown}
                                      className="group cursor-pointer"
                                    >
                                      <p className="px-4 py-2 border-b whitespace-nowrap overflow-x-hidden group-hover:bg-background border-tertiary/50">
                                        {subcategory.category_name}
                                      </p>
                                    </Link>
                                    <ul className="pl-4">
                                      {subcategory.subcategories.map((childSubcategory: any, subIndex: number) => (
                                        <li key={subIndex}>
                                          <Link
                                            href={`/kategori/${category.slug}/${subcategory.slug}/${childSubcategory.slug}`}
                                            onClick={closeDropdown}
                                            className="group cursor-pointer"
                                          >
                                            <p className="px-4 py-2 border-b whitespace-nowrap overflow-x-hidden group-hover:bg-background border-tertiary/50">
                                              {childSubcategory.category_name}
                                            </p>
                                          </Link>
                                        </li>
                                      ))}
                                    </ul>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                } */}

                <li>
                  <Link
                    href="/salg"
                    onClick={closeDropdown}
                    className="text-black text-sm font-medium py-3 px-3 hover:text-opacity-80 transition duration-200"
                  >
                    Salg
                  </Link>
                </li>
                <li>
                  <Link
                    href="/materiell"
                    onClick={closeDropdown}
                    className="text-black text-sm font-medium py-3 px-3 hover:text-opacity-80 transition duration-200"
                  >
                    Materiell
                  </Link>
                </li>
                <li>
                  <Link
                    href="/kontakt"
                    onClick={closeDropdown}
                    className="text-black text-sm font-medium py-3 px-3 hover:text-opacity-80 transition duration-200"
                  >
                    Kontakt
                  </Link>
                </li>
              </ul>
            </div>
            <div className="hidden lg:hidden gap-6">
              <div className="border border-gray-200 rounded-full py-3 px-4 flex items-center gap-2 focus-within:ring focus-within:ring-gray-100 transition duration-200">
                <a href="#" className="inline-block h-6">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width={24}
                    height={24}
                    viewBox="0 0 24 24"
                    fill="none"
                  >
                    <path
                      d="M10.875 18.75C15.2242 18.75 18.75 15.2242 18.75 10.875C18.75 6.52576 15.2242 3 10.875 3C6.52576 3 3 6.52576 3 10.875C3 15.2242 6.52576 18.75 10.875 18.75Z"
                      stroke="black"
                      strokeWidth={2}
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M16.4438 16.4438L21.0001 21.0001"
                      stroke="black"
                      strokeWidth={2}
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </a>
                <input
                  type="text"
                  className="flex-1 outline-none"
                  placeholder="Søk i hele butikken..."
                />
              </div>
              <a
                href="#"
                className="rounded-full bg-white border border-gray-200 p-3 flex items-center justify-between h-12 hover:bg-gray-50 focus:ring-4 focus:ring-gray-200 transition duration-200"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width={24}
                  height={24}
                  viewBox="0 0 24 24"
                  fill="none"
                >
                  <path
                    d="M19 7H16V6C16 4.93913 15.5786 3.92172 14.8284 3.17157C14.0783 2.42143 13.0609 2 12 2C10.9391 2 9.92172 2.42143 9.17157 3.17157C8.42143 3.92172 8 4.93913 8 6V7H5C4.73478 7 4.48043 7.10536 4.29289 7.29289C4.10536 7.48043 4 7.73478 4 8V19C4 19.7956 4.31607 20.5587 4.87868 21.1213C5.44129 21.6839 6.20435 22 7 22H17C17.7956 22 18.5587 21.6839 19.1213 21.1213C19.6839 20.5587 20 19.7956 20 19V8C20 7.73478 19.8946 7.48043 19.7071 7.29289C19.5196 7.10536 19.2652 7 19 7ZM10 6C10 5.46957 10.2107 4.96086 10.5858 4.58579C10.9609 4.21071 11.4696 4 12 4C12.5304 4 13.0391 4.21071 13.4142 4.58579C13.7893 4.96086 14 5.46957 14 6V7H10V6ZM18 19C18 19.2652 17.8946 19.5196 17.7071 19.7071C17.5196 19.8946 17.2652 20 17 20H7C6.73478 20 6.48043 19.8946 6.29289 19.7071C6.10536 19.5196 6 19.2652 6 19V9H8V10C8 10.2652 8.10536 10.5196 8.29289 10.7071C8.48043 10.8946 8.73478 11 9 11C9.26522 11 9.51957 10.8946 9.70711 10.7071C9.89464 10.5196 10 10.2652 10 10V9H14V10C14 10.2652 14.1054 10.5196 14.2929 10.7071C14.4804 10.8946 14.7348 11 15 11C15.2652 11 15.5196 10.8946 15.7071 10.7071C15.8946 10.5196 16 10.2652 16 10V9H18V19Z"
                    fill="black"
                  />
                </svg>
              </a>
              <a
                href="#"
                className="rounded-full bg-gray-900 p-3 flex items-center justify-between h-12 hover:bg-gray-800 focus:ring-4 focus:ring-gray-200 transition duration-200"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width={24}
                  height={24}
                  viewBox="0 0 24 24"
                  fill="none"
                >
                  <path
                    d="M15.7105 12.7101C16.6909 11.9388 17.4065 10.881 17.7577 9.68407C18.109 8.48709 18.0784 7.21039 17.6703 6.03159C17.2621 4.85279 16.4967 3.83052 15.4806 3.10698C14.4644 2.38344 13.2479 1.99463 12.0005 1.99463C10.753 1.99463 9.5366 2.38344 8.52041 3.10698C7.50423 3.83052 6.73883 4.85279 6.3307 6.03159C5.92257 7.21039 5.892 8.48709 6.24325 9.68407C6.59449 10.881 7.31009 11.9388 8.29048 12.7101C6.61056 13.3832 5.14477 14.4995 4.04938 15.94C2.95398 17.3806 2.27005 19.0914 2.07048 20.8901C2.05604 21.0214 2.0676 21.1543 2.10451 21.2812C2.14142 21.408 2.20295 21.5264 2.2856 21.6294C2.4525 21.8376 2.69527 21.971 2.96049 22.0001C3.2257 22.0293 3.49164 21.9519 3.69981 21.785C3.90798 21.6181 4.04131 21.3753 4.07049 21.1101C4.29007 19.1553 5.22217 17.3499 6.6887 16.0389C8.15524 14.7279 10.0534 14.0032 12.0205 14.0032C13.9876 14.0032 15.8857 14.7279 17.3523 16.0389C18.8188 17.3499 19.7509 19.1553 19.9705 21.1101C19.9977 21.3558 20.1149 21.5828 20.2996 21.7471C20.4843 21.9115 20.7233 22.0016 20.9705 22.0001H21.0805C21.3426 21.97 21.5822 21.8374 21.747 21.6314C21.9119 21.4253 21.9886 21.1625 21.9605 20.9001C21.76 19.0963 21.0724 17.3811 19.9713 15.9383C18.8703 14.4955 17.3974 13.3796 15.7105 12.7101ZM12.0005 12.0001C11.2094 12.0001 10.436 11.7655 9.7782 11.326C9.12041 10.8865 8.60772 10.2618 8.30497 9.53086C8.00222 8.79995 7.923 7.99569 8.07734 7.21976C8.23168 6.44384 8.61265 5.73111 9.17206 5.1717C9.73147 4.61229 10.4442 4.23132 11.2201 4.07698C11.996 3.92264 12.8003 4.00186 13.5312 4.30461C14.2621 4.60736 14.8868 5.12005 15.3264 5.77784C15.7659 6.43564 16.0005 7.209 16.0005 8.00012C16.0005 9.06099 15.5791 10.0784 14.8289 10.8286C14.0788 11.5787 13.0614 12.0001 12.0005 12.0001Z"
                    fill="white"
                  />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
};

export default NavbarCategories;
