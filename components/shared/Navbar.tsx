"use client";
import Image from "next/image";
import NextLink from "next/link";
import React, { ReactElement, Suspense, useEffect, useState } from "react";
import AccountModal from "../AccountModal";
import CartModal from "./CartModal";
import Link from "next/link";
import { BiChevronDown } from "react-icons/bi";
import { categoriestree } from "@/utils/store";
import { buildCategoryTree } from "@/utils/BuildCategoryTree";
import CategoryList from "./CategoryList";
import { IoIosAddCircleOutline } from "react-icons/io";
import { AiOutlineUser } from "react-icons/ai";
import { MdOutlineShoppingBag } from "react-icons/md";
import { FiSearch } from "react-icons/fi";
import SearchModal from "./SearchModal";
import { useSession } from 'next-auth/react';
import axios from "axios";
import { usePathname } from 'next/navigation';

const Navbar = ({
  CartDrawer,
  CartIndicator,
}: {
  CartDrawer: ReactElement | null;
  CartIndicator: ReactElement | null;
}) => {
  const pathname = usePathname();
  const session = useSession();

  const [accountModal, setAccountModal] = useState(false);
  const [cartModalVisible, setCartModalVisible] = useState(false);
  const [nav, setNav] = useState(false);
  const [brandslist, setBrandslist] = useState(false);
  const [categorieslist, setCategorieslist] = useState(false);
  const [authenticated, setAuthenticated] = useState(true);
  const [searchModalOpen, setSearchModalOpen] = useState(false);

  const [menuData, setMenuData] = useState({
    brands: [],
    categories: []
  });

  useEffect(() => {
    setNav(false); // Close the nav when URL changes
    document.body.classList.remove("no-scroll");
  }, [pathname]);

  useEffect(() => {
    const fetchMenuData = async () => {
      try {
        const response = await axios.get(process.env.NEXT_PUBLIC_API_URL + 'navmenu');
        setMenuData(response.data.data); // Assuming `response.data` is an array of category items
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchMenuData();
  }, []);

  const [searchTerm, setSearchTerm] = useState("");
  const [search, setSearch] = useState(false);

  const parsedCategories = buildCategoryTree(categoriestree);

  const handleNav = () => {
    //setNav(!nav);
    setNav((prevNav) => {
      if (!prevNav) {
        document.body.classList.add("no-scroll");
      } else {
        document.body.classList.remove("no-scroll");
      }
      return !prevNav;
    });
  };
  const handleCategories = () => {
    setCategorieslist(!categorieslist);
  };
  const handleBrands = () => {
    setBrandslist(!brandslist);
  };

  const handleAccountModal = () => {
    setAccountModal(!accountModal);
  };

  const openCartModal = () => setCartModalVisible(true);
  const closeCartModal = () => setCartModalVisible(false);


  const openSearchModal = () => {
    setSearchModalOpen(!searchModalOpen);
    setNav(false);
  }


  return (
    <>
      <nav className="relative w-full py-3 shadow-none bg-white">
        <div className="container2 mx-auto px-4">
          <div className="flex items-center justify-between">
            <NextLink href="/" className="inline-block mr-10">
              <Image
                className="h-18"
                src="/assets/logo.svg"
                alt="Salongpartner"
                width={250}
                height={100}
              />
            </NextLink>
            {/*
            <div className="absolute transform left-1/2 -translate-x-1/2">
              <div
                onClick={() => setSearch(true)}
                className="border border-gray-200 rounded-full py-3 px-4 hidden lg:flex items-center gap-2 focus-within:ring focus-within:ring-gray-100 transition duration-200"
              >
                <a href="#" className="inline-block h-6">
                  <FiSearch size={23} className="text-black" />
                </a>
                <input
                  type="text"
                  className="flex-1 outline-none"
                  placeholder="Søk i hele butikken..."
                />
              </div>
            </div>
            */}
            <SearchModal isOpenSearch={searchModalOpen} searchOff={openSearchModal} />
            <div className="flex relative gap-2 md:gap-6 sm:mr-4">
              <button
                onClick={openSearchModal}
                className="lg:hidden rounded-full bg-white p-3 flex items-center justify-between h-12 hover:bg-gray-50 focus:ring-4 focus:ring-gray-200 transition duration-200"
              >
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
              </button>
              <div
                onClick={openCartModal}
                className="relative rounded-full cursor-pointer bg-white p-3 flex items-center justify-between h-12 hover:bg-gray-50 focus:ring-4 focus:ring-gray-200 transition duration-200"
              >
                <MdOutlineShoppingBag size={24} className="text-black" />

                {session.status === "authenticated" ?
                  CartIndicator : ''
                }

                {/* <div className="absolute top-0 right-0 p-0.5 flex justify-center items-center bg-primary rounded-full">
                  <p className="text-white whitespace-nowrap px-0.5 font-base text-xs">
                    4
                  </p>
                </div> */}
              </div>

              <div className="absolute top-0 left-0 w-auto h-auto z-50">
                <CartModal
                  visible={cartModalVisible}
                  onClose={closeCartModal}
                />
              </div>

              <Link
                href={session.status == "authenticated" ? "/minside" : "/logg-inn"}
                //onClick={handleAccountModal}
                className="hidden md:flex relative rounded-full bg-white p-3 items-center justify-between h-12 hover:bg-gray-50 focus:ring-4 focus:ring-gray-200 transition duration-200 cursor-pointer"
              >
                <AiOutlineUser size={26} className="text-black" />

                {accountModal && (
                  <div className="absolute top-14 left-0 w-auto h-auto z-50">
                    <AccountModal />
                  </div>
                )}
              </Link>
              <div
                onClick={handleNav}
                className="flex lg:hidden cursor-pointer rounded-full bg-white p-3 items-center justify-between h-12 hover:bg-gray-50 focus:ring-4 focus:ring-gray-200 transition duration-200"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width={24}
                  height={24}
                  viewBox="0 0 24 24"
                  fill="none"
                >
                  <path
                    d="M3 8H21C21.2652 8 21.5196 7.89464 21.7071 7.70711C21.8946 7.51957 22 7.26522 22 7C22 6.73478 21.8946 6.48043 21.7071 6.29289C21.5196 6.10536 21.2652 6 21 6H3C2.73478 6 2.48043 6.10536 2.29289 6.29289C2.10536 6.48043 2 6.73478 2 7C2 7.26522 2.10536 7.51957 2.29289 7.70711C2.48043 7.89464 2.73478 8 3 8ZM21 16H3C2.73478 16 2.48043 16.1054 2.29289 16.2929C2.10536 16.4804 2 16.7348 2 17C2 17.2652 2.10536 17.5196 2.29289 17.7071C2.48043 17.8946 2.73478 18 3 18H21C21.2652 18 21.5196 17.8946 21.7071 17.7071C21.8946 17.5196 22 17.2652 22 17C22 16.7348 21.8946 16.4804 21.7071 16.2929C21.5196 16.1054 21.2652 16 21 16ZM21 11H3C2.73478 11 2.48043 11.1054 2.29289 11.2929C2.10536 11.4804 2 11.7348 2 12C2 12.2652 2.10536 12.5196 2.29289 12.7071C2.48043 12.8946 2.73478 13 3 13H21C21.2652 13 21.5196 12.8946 21.7071 12.7071C21.8946 12.5196 22 12.2652 22 12C22 11.7348 21.8946 11.4804 21.7071 11.2929C21.5196 11.1054 21.2652 11 21 11Z"
                    fill="black"
                  />
                </svg>
              </div>
            </div>
            {/*
            <button className="lg:hidden">
              <svg
                className="text-black"
                width={51}
                height={51}
                viewBox="0 0 56 56"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <rect width={56} height={56} rx={28} fill="currentColor" />
                <path
                  d="M37 32H19M37 24H19"
                  stroke="white"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
            */}
          </div>
        </div>
      </nav>
      {nav && (
        <div className="navbar-menu fixed top-0 right-0 bottom-0 w-5/6 max-w-xs z-50">
          <div
            onClick={handleNav}
            className="navbar-menu fixed inset-0 bg-black opacity-20"
          />
          <nav
            id="salongpartner"
            className="relative p-4 xs:p-8 w-full h-full bg-white overflow-y-auto"
          >
            <div className="flex items-center justify-between">
              <Link href="/" onClick={handleNav} className="inline-block">
                <Image
                  className="h-18"
                  src="/assets/logo.svg"
                  alt="alt"
                  width={160}
                  height={50}
                />
              </Link>
              <button onClick={handleNav} className="p-2">
                <svg
                  width={24}
                  height={24}
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M6 18L18 6M6 6L18 18"
                    stroke="#111827"
                    strokeWidth={2}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>
            </div>
            <div className="flex flex-col gap-4 pt-8 pb-8">
              <button
                onClick={openSearchModal}
                className="rounded-full p-3 flex items-center justify-start gap-4 h-12 hover:bg-background focus:ring-4 focus:ring-gray-200 transition duration-200"
              >
                <FiSearch size={23} className="text-black" />
                <p>Søk</p>
              </button>
              <Link
                href="/handlekurv"
                onClick={handleNav}
                className="rounded-full bg-white p-3 flex items-center justify-between h-12 hover:bg-background focus:ring-4 focus:ring-gray-200 transition duration-200"
              >
                <div className="flex flex-row items-center justify-start gap-4">
                  <MdOutlineShoppingBag size={23} className="text-black" />
                  <p>Handlekurv</p>
                </div>
                {/* <div className="py-0.5 px-1 flex justify-center items-center bg-primary rounded-full"> */}
                {session.status === "authenticated" ?
                  CartIndicator : ''
                }
                {/* </div> */}
              </Link>

              <Link
                href={session.status == "authenticated" ? "/minside" : "/logg-inn"}
                onClick={handleNav}
                className={`rounded-full ${session.status == "authenticated" ? "bg-white" : "bg-tertiary"
                  } p-3 flex items-center justify-start gap-4 h-12 hover:bg-background focus:ring-4 focus:ring-gray-200 transition duration-200`}
              >
                <AiOutlineUser size={25} className="text-black" />
                <p>{session.status == "authenticated" ? "Min side" : "Logg inn"}</p>
              </Link>
              {session.status !== "authenticated" && (
                <Link
                  href="/bli-forhandler"
                  onClick={handleNav}
                  className={`rounded-full ${authenticated ? "bg-white" : "bg-white"
                    } p-3 flex items-center justify-start gap-4 h-12 hover:bg-background focus:ring-4 focus:ring-gray-200 transition duration-200`}
                >
                  <IoIosAddCircleOutline size={25} className="text-black" />

                  <p>Bli forhandler</p>
                </Link>
              )}
            </div>

            <hr />
            <ul className="flex flex-col gap-1 py-3 transition-all duration-300 ease-in-out">
              <li>
                <Link
                  href="/"
                  onClick={handleNav}
                  className="text-base font-base"
                >
                  <p className="py-3">Forsiden</p>
                </Link>
              </li>

              <hr />
              <li>
                <Link
                  href="/alle-produkter"
                  onClick={handleNav}
                  className="text-base font-base"
                >
                  <p className="py-3">Alle produkter</p>
                </Link>
              </li>
              <hr />
              <li>
                <Link
                  href="/salg"
                  onClick={handleNav}
                  className="text-base font-base"
                >
                  <p className="py-3">Salg</p>
                </Link>
              </li>
              <hr />

              <li>
                <div
                  onClick={handleBrands}
                  className={`text-base select-none flex flex-row justify-between items-center cursor-pointer transition-all duration-200 ease-in-out ${brandslist ? "font-bold" : "font-base"
                    }`}
                >
                  <p className="py-3">Merker</p>
                  <BiChevronDown size={20} className="text-black" />
                </div>
              </li>
              <hr />
              <div
                className={`overflow-hidden transition-all duration-500 ${brandslist ? "opacity-100" : "opacity-0"
                  }`}
              >
                {brandslist && (
                  <ul>
                    {menuData.brands.map((brand: any, index) => (
                      brand.total_products > 0 && (
                      <li
                        key={index}
                        className={`pl-3 select-none transition-opacity duration-500 ease-in-out ${brandslist
                          ? "opacity-100 translate-y-0"
                          : "opacity-0 -translate-y-4"
                          }`}
                      >
                        <Link
                          href={`/merke/${brand.slug}`}
                          onClick={handleNav}
                          className=""
                        >
                          <p
                            className={`py-3 ${index < menuData.brands.length - 1
                              ? "border-b border-tertiary/50"
                              : ""
                              }`}
                          >
                            {brand.brand_name}
                          </p>
                        </Link>
                      </li>
                      )
                    ))}
                    <br />
                    <hr />
                  </ul>
                )}
              </div>
              <li>
                <div
                  onClick={handleCategories}
                  className={`text-base select-none flex flex-row justify-between items-center cursor-pointer transition-all duration-200 ease-in-out ${categorieslist ? "font-bold" : "font-base"
                    }`}
                >
                  <p className="py-3">Kategorier</p>
                  <BiChevronDown size={20} className="text-black" />
                </div>
              </li>
              <hr />
              {categorieslist && <CategoryList categories={menuData.categories} />}
              {/*
              <div
                className={`overflow-hidden transition-all duration-500 ${
                  categorieslist ? "opacity-100" : "opacity-0"
                }`}
              >
                {categorieslist && (
                  <ul>
                    {parsedCategories.map((category, index) => (
                      <li
                        key={index}
                        className={`pl-3 select-none transition-opacity duration-500 ease-in-out ${
                          categorieslist
                            ? "opacity-100 translate-y-0"
                            : "opacity-0 -translate-y-4"
                        }`}
                      >
                        <Link
                          href={category.name}
                          onClick={handleNav}
                          className=""
                        >
                          <p
                            className={`py-3 ${
                              index < parsedCategories.length - 1
                                ? "border-b border-tertiary/50"
                                : ""
                            }`}
                          >
                            {category.name}
                          </p>
                        </Link>
                      </li>
                    ))}
                    <br />
                    <hr />
                  </ul>
                )}
              </div>
              */}

              <li>
                <Link
                  href="/materiell"
                  onClick={handleNav}
                  className="text-base font-base"
                >
                  <p className="py-3">Materiell</p>
                </Link>
              </li>
              <hr />
              <li>
                <Link
                  href="/kontakt"
                  onClick={handleNav}
                  className="text-base font-base"
                >
                  <p className="py-3">Kontakt oss</p>
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      )}
    </>
  );
};

const NavbarSuspense = (props: any) => {
  return (
    <Suspense fallback={<span>Laster</span>}>
      <Navbar {...props} />
    </Suspense>
  );
};

export default NavbarSuspense;
