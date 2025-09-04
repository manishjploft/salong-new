"use client";

import React, { useState, useEffect } from "react";
import { FiSearch } from "react-icons/fi";
import { MdClose } from "react-icons/md";
import Link from "next/link";
import { fetchSearchProducts } from "@/features/products/products.action";
import Image from "next/image";

const ProductCard = ({
  product,
  onClose
}: {
  product: {
    id: number;
    product_name: string;
    category_name: string;
    brand_name: string;
    product_image: string;
    slug: string;
  };
  onClose: () => void;
}) => (
  <Link
    href={`/produkt/${product.slug}`}
    className="border flex flex-row items-center border-gray-200 rounded-lg p-4 hover:shadow-md transition"
  >
    <div className="w-full flex flex-row items-center gap-2">
      <img
        src={product.product_image}
        alt={product.product_name}
        height={60}
        width={60}
        className="aspect-square object-contain"
      />
      <div className="flex flex-col">
        <p className="text-xs font-bold text-gray-500">{product.brand_name}</p>
        <h4 className="text-sm font-light">{product.product_name}</h4>
      </div>
    </div>
    <div className="w-auto">
      <Link
        href={`/produkt/${product.slug}`}
        onClick={onClose}
        className="bg-primary text-white rounded-full px-4 py-2 whitespace-nowrap inline-block"
      >
        Se mer
      </Link>
    </div>
  </Link>
);

const SearchModal = ({ isOpenSearch, searchOff }: any) => {

  const [searchTerm, setSearchTerm] = useState("");
  const [isOpen, setIsOpen] = useState(isOpenSearch);
  const [filteredProducts, setProducts] = useState([]);
  const [filteredBrands, setBrands] = useState([]);
  const [filteredCategories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  const searchData = async () => {
    setLoading(true);
    const getData = await fetchSearchProducts(searchTerm);
    setLoading(false);
    setProducts(getData.data || []);
    setBrands(getData.brands || []);
    setCategories(getData.categories || []);
  }

  useEffect(() => {
    if (searchTerm.trim().length > 0) {
      searchData()
      setIsOpen(true); // Open modal when typing starts
    } else {
      setIsOpen(false); // Close modal when search term is cleared
    }

  }, [searchTerm]);

  useEffect(() => {
    // if (isOpenSearch) {
    //   searchData()
    //   setIsOpen(false); // Open modal when typing starts
    // } else {
    //   setIsOpen(false); // Close modal when search term is cleared
    // }
    setIsOpen(false);
    setSearchTerm("");

  }, [isOpenSearch]);

  const closeModal = () => {
    setIsOpen(false);
    searchOff(false);
  }

  return (
    <>
      {/* Search Input */}
      <div className="absolute transform left-1/2 -translate-x-1/2 hidden md:block">
        <div className="border border-gray-200 rounded-full px-4 hidden lg:flex items-center gap-2 cursor-pointer focus-within:ring focus-within:ring-gray-100 transition duration-200">
          <FiSearch size={23} className="text-black" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Søk i hele butikken..."
            className="flex-1 py-3 outline-none text-gray-500"
          />
        </div>
      </div>

      {/* Modal */}
      {isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center">
          <div
            id="salongpartner"
            className="bg-white rounded-lg shadow-lg p-6 w-full max-w-4xl h-[85vh] overflow-auto"
          >
            {/* Close Button */}
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold">Søkeresultater</h2>
              <button
                onClick={() => setSearchTerm("")}
                className="text-gray-500 hover:text-black transition"
              >
                <MdClose size={24} onClick={closeModal} />
              </button>
            </div>
            <div className="mb-6">
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Søk i hele butikken..."
                className="w-full border border-gray-300 rounded-full px-4 p-3 outline-none focus:ring focus:ring-primary transition"
              />
            </div>
            {/* Results */}
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row gap-x-20 gap-y-8">
                {/* Brands */}
                {filteredBrands.length > 0 && (
                  <div>
                    <h3 className="text-lg font-semibold mb-2">Merker</h3>
                    <ul className="space-y-2">
                      {filteredBrands.map((item: any, index: number) => (
                        <li key={index}>
                          <Link href={`/merke/${item.slug}`} onClick={closeModal}>
                            <p className="text-sm text-primary cursor-pointer hover:underline">
                              {item.brand_name}
                            </p>
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Categories */}
                {filteredCategories.length > 0 && (
                  <div>
                    <h3 className="text-lg font-semibold mb-2">Kategorier</h3>
                    <ul className="space-y-2">
                      {filteredCategories.map((category: any, index: number) => (
                        <li key={index}>
                          <Link href={`/kategori/${category.slug}`} onClick={closeModal}>
                            <p className="text-sm text-primary cursor-pointer hover:underline">
                              {category.category_name}
                            </p>
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
              {/* Products */}
              {filteredProducts.length > 0 && (
                <div className="">
                  <h3 className="text-lg font-semibold mb-2">Produkter</h3>
                  <div
                    onClick={closeModal}
                    className="flex w-full flex-col gap-4"
                  >
                    {filteredProducts.map((product: any) => (
                      <ProductCard key={product.product_id} product={product} onClose={closeModal} />
                    ))}
                  </div>
                </div>
              )}

              {/* No Results */}
              {filteredBrands.length === 0 && loading ? <p className="text-gray-500 text-center">Laster...</p> : filteredBrands.length === 0 &&
                filteredCategories.length === 0 &&
                filteredProducts.length === 0 && (
                  <p className="text-gray-500 text-center">Ingen treff.</p>
                )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default SearchModal;
