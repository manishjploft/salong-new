'use client'
import Breadcrumbs from "@/components/Breadcrumbs";
import Pagination from "@/components/product/Pagination";
import ProductFilters from "@/components/product/ProductFilters";
import Products from "@/components/product/Products";
import React, { useEffect, useState } from "react";
import { fetchProducts } from '@/features/products/products.action';
import AllProductSkelation from "@/components/product/AllProductSkeleton";

const ProductPage = ({
    params,
    cartItems,
    customerGroup
}: any) => {

    const brandSlug = params.brand.length > 0 ? params.brand[0] : params.pageType;

    const pageType = params.pageType;
    const brandSlugConvert = slugToName(brandSlug);
    const [filters, setFilters] = useState<string[]>(brandSlug === 'salg' || brandSlug === 'kategori' || brandSlug === 'merke' || brandSlug === 'alle produkter' || brandSlug === 'nyheter' ? [] : [brandSlugConvert]);
    const [brandFilters, setBrandFilters] = useState<string[]>(brandSlug === 'salg' || brandSlug === 'kategori' || brandSlug === 'merke' || brandSlug === 'alle produkter' || brandSlug === 'nyheter' ? [] : pageType === 'merke' ? [brandSlugConvert] : []);
    const [categoryFilters, setCategoryFilters] = useState<string[]>(brandSlug === 'salg' || brandSlug === 'kategori' || brandSlug === 'merke' || brandSlug === 'alle produkter' || brandSlug === 'nyheter' ? [] : pageType === 'kategori' ? [brandSlugConvert] : []);
    const [subCategoryFilters, setSubCategoryFilters] = useState<string[]>([]);
    const [sizeFilters, setSizeFilters] = useState<string[]>([]);
    const [skinTypeFilters, setSkinTypeFilters] = useState<string[]>([]);
    const [colorFilters, setColorFilters] = useState<string[]>([]);
    const [productsList, setProductsList] = useState([]);
    const [totalPage, setTotalPage] = useState(1);
    const [totalProduct, setTotalProduct] = useState();
    const [type, setType] = useState(brandSlug === 'salg' || brandSlug === 'kategori' || brandSlug === 'merke' || brandSlug === 'alle produkter' || brandSlug === 'nyheter' ? brandSlug : brandSlug);
    const [isLoading, setIsLoading] = useState(true);
    const [brandDetail, setBrandDetail] = useState('');

    function slugToName(slug: any) {
        return slug
            .split('-') // Split the slug by hyphens
            .map((word: string) => word.charAt(0).toUpperCase() + word.slice(1)) // Capitalize each word
            .join(' '); // Join the words with spaces
    }

    // Fetch products based on filters
    const fetchFilteredProducts = async (page: number) => {
        setIsLoading(true);

        const response = await fetchProducts(page, brandFilters, categoryFilters, sizeFilters, skinTypeFilters, colorFilters, type, '', brandSlug, subCategoryFilters); // Pass filters to fetchProducts
        console.log("response", response?.getBrand);
        
        setIsLoading(false);
        setProductsList(response?.data?.data || []);
        setTotalPage(response?.data?.last_page || 1);
        setTotalProduct(response?.data?.total);
        setBrandDetail(response?.getBrand)
    };

    useEffect(() => {
        fetchFilteredProducts(1);
    }, [brandFilters, categoryFilters, sizeFilters, skinTypeFilters, colorFilters, subCategoryFilters]); // Re-fetch products when filters change

    const handleFiltersChange = (newFilters: string[]) => {
        setFilters(newFilters);
    };

    const handleBrandFiltersChange = (newFilters: string[]) => {
        setBrandFilters(newFilters);
    };

    const handleCategoryFiltersChange = (newFilters: string[]) => {
        setCategoryFilters(newFilters);
    };

    const handleSubCategoryFiltersChange = (newFilters: string[]) => {
        setSubCategoryFilters(newFilters);
    }
 
    const handleSizeFiltersChange = (newFilters: string[]) => {
        setSizeFilters(newFilters);
    };

    const handleSkinTypeFiltersChange = (newFilters: string[]) => {
        setSkinTypeFilters(newFilters);
    };

    const handleColorFiltersChange = (newFilters: string[]) => {
        setColorFilters(newFilters);
    };

    const handlePageChange = (page: number) => {
        setIsLoading(true); // Show loading indicator
        // Call the fetch function with the new page number
        fetchFilteredProducts(page);
    };

    const breadcrumbs = [
        {
            id: 1,
            text: brandSlugConvert,
            link: "#",
        },
    ];
    

    return (
        <>
            <section className="w-full h-full bg-background min-h-[60vh]">
                <div className="w-full bg-background py-10 container mx-auto flex flex-col">
                    <Breadcrumbs items={breadcrumbs} />
                    <ProductFilters
                        totalProduct={totalProduct}
                        selectedMainCategory={brandSlug === 'salg' || brandSlug === 'kategori' || brandSlug === 'merke' || brandSlug === 'alle produkter' || brandSlug === 'nyheter' ? '' : pageType === 'kategori' ? brandSlugConvert : ''}
                        activeBrandFilter={brandSlug === 'salg' || brandSlug === 'kategori' || brandSlug === 'merke' || brandSlug === 'alle produkter' || brandSlug === 'nyheter' ? '' : pageType === 'merke' ? brandSlugConvert : ''}
                        onFiltersChange={handleFiltersChange} // Pass the handler
                        onBrandFiltersChange={handleBrandFiltersChange} // Pass the handler
                        onCategoryFiltersChange={handleCategoryFiltersChange} // Pass the handler
                        onSubCategoryFiltersChange={handleSubCategoryFiltersChange} // Pass the handler
                        onSizeFilterChange={handleSizeFiltersChange} // Pass the handler
                        onSkinTypeFilterChange={handleSkinTypeFiltersChange} // Pass the handler
                        onColorFilterChange={handleColorFiltersChange} // Pass the handler
                        type={type}
                        brandDetail={brandDetail}
                    />
                    {isLoading ?
                        <AllProductSkelation />
                        : productsList.length === 0 ? <div>
                            <div className="flex flex-col items-center p-4 mt-8">
                                <div className="text-center">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="w-16 h-16 text-gray-400 mx-auto mb-4"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                        strokeWidth={2}
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            d="M9 12h6m-6 4h6m-4-8h.01M4 6h16M4 6a2 2 0 012-2h12a2 2 0 012 2M4 6l1.405 8.437a2 2 0 001.985 1.563h10.22a2 2 0 001.985-1.563L20 6M9 12h6m-6 4h6"
                                        />
                                    </svg>
                                    <h1 className="text-2xl font-semibold text-gray-700 mb-2">Finner ikke produkter</h1>
                                    <p className="text-gray-500">Vi kunne ikke finne noen produkter som samsvarte med søkekriteriene dine.</p>

                                </div>
                            </div>
                        </div>
                            :
                            <Products cartItems={cartItems} customerGroup={customerGroup} productsList={productsList} />

                    }
                    {totalPage > 1 &&
                        <Pagination totalPages={totalPage} onPageChange={handlePageChange} />
                    }
                </div>
            </section>
        </>
    );
};
export default ProductPage;