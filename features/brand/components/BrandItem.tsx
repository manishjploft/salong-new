"use client";
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';

const BrandsItem = ({ brand_name, id }: any) => {
  const searchParams = useSearchParams();
  const newSearchParams = new URLSearchParams(searchParams.toString());
  if (id) {
    newSearchParams.set("brandId", id);
    newSearchParams.delete("searchType");
  }
  return (
    <li className="mb-4">
      <Link
        href={`/produkter?${newSearchParams.toString()}`}
        className={`lg:text-lg ${
          searchParams.get("brandId") === id ? "text-blue-500" : ""
        }`}
      >
        {brand_name}
      </Link>
    </li>
  );
};

export default BrandsItem;
