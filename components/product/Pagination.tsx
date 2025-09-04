// "use client";
// import React, { useState } from "react";
// import { BiChevronDown } from "react-icons/bi";

// interface PaginationProps {
//   totalPages: number;
//   onPageChange: (page: number) => void;
// }

// const Pagination: React.FC<PaginationProps> = ({
//   totalPages,
//   onPageChange,
// }) => {
//   const [currentPage, setCurrentPage] = useState(1);

//   const handleNext = () => {
//     if (currentPage < totalPages) {
//       const newPage = currentPage + 1;
//       setCurrentPage(newPage);
//       onPageChange(newPage);
//     }
//   };

//   const handlePrev = () => {
//     if (currentPage > 1) {
//       const newPage = currentPage - 1;
//       setCurrentPage(newPage);
//       onPageChange(newPage);
//     }
//   };

//   const handlePageClick = (page: number) => {
//     setCurrentPage(page);
//     onPageChange(page);
//   };

//   return (
//     <div className="flex items-center justify-center gap-2 mt-4">
//       <button
//         onClick={handlePrev}
//         className="px-3 py-3 bg-gray-200 rounded-full hover:bg-gray-300 disabled:bg-gray-100 disabled:cursor-not-allowed"
//         disabled={currentPage === 1}
//       >
//         <BiChevronDown
//           size={20}
//           className={`rotate-90 ${currentPage === 1 && "hidden"}`}
//         />
//       </button>

//       {/* Page Numbers */}
//       {Array.from({ length: totalPages }, (_, index) => {
//         const pageNumber = index + 1;
//         return (
//           <button
//             key={pageNumber}
//             onClick={() => handlePageClick(pageNumber)}
//             disabled={currentPage === pageNumber}
//             className={`px-3 py-1 rounded-full ${currentPage === pageNumber
//               ? "bg-primary text-white"
//               : "bg-gray-100 hover:bg-gray-200"
//               }`}
//           >
//             {pageNumber}
//           </button>
//         );
//       })}

//       <button
//         onClick={handleNext}
//         className="px-3 py-3 bg-gray-200 rounded-full hover:bg-gray-300 disabled:bg-gray-100 disabled:cursor-not-allowed"
//         disabled={currentPage === totalPages}
//       >
//         <BiChevronDown
//           size={20}
//           className={`-rotate-90 ${currentPage === totalPages && "hidden"}`}
//         />
//       </button>
//     </div>
//   );
// };

// export default Pagination;


"use client";
import React, { useState } from "react";
import { BiChevronDown } from "react-icons/bi";

interface PaginationProps {
  totalPages: number;
  onPageChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({ totalPages, onPageChange }) => {
  const [currentPage, setCurrentPage] = useState(1);

  const handleNext = () => {
    if (currentPage < totalPages) {
      const newPage = currentPage + 1;
      setCurrentPage(newPage);
      onPageChange(newPage);
    }
  };

  const handlePrev = () => {
    if (currentPage > 1) {
      const newPage = currentPage - 1;
      setCurrentPage(newPage);
      onPageChange(newPage);
    }
  };

  const handlePageClick = (page: number) => {
    setCurrentPage(page);
    onPageChange(page);
  };

  const getVisiblePages = () => {
    const visiblePages: number[] = [];
    const maxVisible = 5; // Number of pages to display at once

    // Determine the starting point of the visible range
    const start = Math.max(1, currentPage - Math.floor(maxVisible / 2));
    const end = Math.min(totalPages, start + maxVisible - 1);

    // Adjust start if near the end
    const adjustedStart = Math.max(1, end - maxVisible + 1);

    for (let i = adjustedStart; i <= end; i++) {
      visiblePages.push(i);
    }

    return visiblePages;
  };

  return (
    <div className="flex items-center justify-center gap-2 mt-4">
      {/* Previous Button */}
      <button
        onClick={handlePrev}
        className="px-3 py-3 bg-gray-200 rounded-full hover:bg-gray-300 disabled:bg-gray-100 disabled:cursor-not-allowed"
        disabled={currentPage === 1}
      >
        <BiChevronDown
          size={20}
          className={`rotate-90 ${currentPage === 1 && "hidden"}`}
        />
      </button>

      {/* Dynamic Page Numbers */}
      {currentPage > 3 && (
        <>
          <button
            onClick={() => handlePageClick(1)}
            className="px-3 py-1 rounded-full bg-gray-100 hover:bg-gray-200"
          >
            1
          </button>
          <span className="px-3 py-1 text-gray-500">...</span>
        </>
      )}

      {getVisiblePages().map((page) => (
        <button
          key={page}
          onClick={() => handlePageClick(page)}
          disabled={currentPage === page}
          className={`px-3 py-1 rounded-full ${
            currentPage === page
              ? "bg-primary text-white"
              : "bg-gray-100 hover:bg-gray-200"
          }`}
        >
          {page}
        </button>
      ))}

      {currentPage < totalPages - 2 && (
        <>
          <span className="px-3 py-1 text-gray-500">...</span>
          <button
            onClick={() => handlePageClick(totalPages)}
            className="px-3 py-1 rounded-full bg-gray-100 hover:bg-gray-200"
          >
            {totalPages}
          </button>
        </>
      )}

      {/* Next Button */}
      <button
        onClick={handleNext}
        className="px-3 py-3 bg-gray-200 rounded-full hover:bg-gray-300 disabled:bg-gray-100 disabled:cursor-not-allowed"
        disabled={currentPage === totalPages}
      >
        <BiChevronDown
          size={20}
          className={`-rotate-90 ${currentPage === totalPages && "hidden"}`}
        />
      </button>
    </div>
  );
};

export default Pagination;

