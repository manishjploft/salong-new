"use client";
import { useState } from "react";
import { BiChevronDown } from "react-icons/bi";
import Link from "next/link";

interface Category {
  category_name: string;
  slug?: string;
  product?: number;
  subcategories?: Category[];
}

const CategoryList: React.FC<{ categories: Category[]; parentSlugs?: string[] }> = ({
  categories,
  parentSlugs = [],
}) => {
  const categoryOrder = ["Sminke", "Hudpleie", "Hårpleie", "Annet"];
  const sortedCategories = [...(categories || [])].sort((a: any, b: any) => {
    const indexA = categoryOrder.indexOf(a.category_name);
    const indexB = categoryOrder.indexOf(b.category_name);

    // If category is not in the order array, place it after the ordered ones
    return (indexA !== -1 ? indexA : Infinity) - (indexB !== -1 ? indexB : Infinity);
  });

  return (
    <ul className="pl-3 space-y-2">
      {sortedCategories.map((category: any) => (
        category?.product === 0 ? '' :
        <CategoryItem key={category.slug} category={category} parentSlugs={parentSlugs} />
      ))}
    </ul>
  );
};

const CategoryItem: React.FC<{ category: Category; parentSlugs: string[] }> = ({
  category,
  parentSlugs,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const hasChildren = category.subcategories && category.subcategories.length > 0;

  const toggleDropdown = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsOpen((prev) => !prev);
  };

  // Combine current slug with parentSlugs
  const currentPath = [...parentSlugs, category.slug].filter(Boolean).join("/");
  
 return (
  <li>
    <div
      className={`flex items-center justify-between cursor-pointer py-2 px-4 rounded-md ${
        isOpen ? "bg-gray-100" : "bg-white"
      } hover:bg-gray-200 transition`}
    >
      {/* LEFT: Clickable Link (takes up most of the space) */}
      <div className={hasChildren ? "w-1/2 pr-2" : "flex w-full"}>
        <Link href={`/kategori/${currentPath}`} className="block w-full">
          {category.category_name}
        </Link>
      </div>

      {/* RIGHT: Chevron Toggle (only this triggers toggle) */}
      {hasChildren && (
        <div
            className="w-1/2 flex justify-end items-center"
            onClick={toggleDropdown}
          >
          <BiChevronDown
            size={20}
            className={`transition-transform ${isOpen ? "rotate-180" : "rotate-0"}`}
          />
        </div>
      )}
    </div>

    {/* Render subcategories recursively */}
    {hasChildren && isOpen && (
      <div className="pl-6">
        <CategoryList
          categories={category.subcategories || []}
          parentSlugs={[...parentSlugs, category.slug || ""]}
        />
      </div>
    )}
  </li>
);

};

export default CategoryList;
