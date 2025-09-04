"use client";
import { useRouter, useSearchParams } from 'next/navigation';

const CategoryItem = ({ category_name, id }: any) => {
  const searchParams = useSearchParams();
  const newSearchParams = new URLSearchParams(searchParams.toString());
  const router = useRouter();
  if (id) {
    newSearchParams.set("categoryId", id);
    newSearchParams.delete("searchType");
  }
  if (id === 99) {
    newSearchParams.delete("categoryId");
  }
  const url = `/produkter?${newSearchParams.toString()}`;

  return (
    <li className="mb-4">
      <div
        onClick={() => router.push(url)}
        className={`lg:text-lg ${
          searchParams.get("categoryId") === id ? "text-blue-500" : ""
        }`}
      >
        {category_name}
      </div>
    </li>
  );
};

export default CategoryItem;
