import Image from "next/image";
import Link from "next/link";
import React from "react";
import { FaChevronRight } from "react-icons/fa";

interface BreadcrumbItem {
  id: number;
  text: string;
  link: string;
}
interface BreadcrumbsProps {
  items: BreadcrumbItem[];
}

const Breadcrumbs: React.FC<BreadcrumbsProps> = ({ items }) => {
  return (
    <div className="w-full py-2">
      <div className="container2 mx-auto flex flex-row flex-wrap gap-2 items-center font-medium text-xs md:text-sm mdd:text-md">
        <Link
          href="/"
          className="flex flex-row items-center gap-2 px-2 mr-2 sm:mr-0 text-gray-600"
        >
          <Image
            src="/assets/logo-emblem.svg"
            alt="Salongpartner"
            className="w-4 h-4"
            width={30}
            height={30}
          />
          <p>Hjem</p>
        </Link>

        {items.length > 1 ? (
          items.map((item, index) => (
            <React.Fragment key={index}>
              <FaChevronRight size={14} className="text-gray-600 min-w-1" />
              {index < items.length - 1 ? (
                <Link href={item.link} className="text-gray-600 sm:px-2">
                  <p>{item.text}</p>
                </Link>
              ) : (
                <div className="text-gray-400 px-2">
                  <p>{item.text}</p>
                </div>
              )}
            </React.Fragment>
          ))
        ) : (
          <>
            <FaChevronRight size={14} className="text-gray-600" />
            <div className="text-gray-400 px-2">
              <p>{items[0]?.text}</p>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Breadcrumbs;
