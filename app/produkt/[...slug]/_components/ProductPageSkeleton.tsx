export default function ProductPageSkeleton() {
  return (
    <div className="animate-pulse">
      {/* Breadcrumbs skeleton */}
      <div className="container2 mx-auto w-full flex gap-2 p-2 sm:p-4">
        <div className="flex items-center space-x-2">
          <div className="h-4 bg-gray-200 rounded w-20"></div>
          <div className="h-4 bg-gray-200 rounded w-4"></div>
          <div className="h-4 bg-gray-200 rounded w-24"></div>
        </div>
      </div>

      {/* Main product skeleton */}
      <div className="container2 bg-white rounded-xl mt-4 shadow-md mx-auto flex flex-wrap -m-4 mb-20 py-10 md:py-10">
        {/* Image gallery skeleton */}
        <div className="w-full lg:w-1/2 p-4">
          <div className="pb-10">
            <div className="relative w-full h-auto rounded-xl mb-4">
              <div className="w-full aspect-square bg-gray-200 rounded-xl"></div>
            </div>
            <div className="flex flex-nowrap items-center justify-center gap-2 sm:gap-4 md:gap-8">
              <div className="flex gap-2">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="w-20 h-20 bg-gray-200 rounded-lg"></div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Product details skeleton */}
        <div className="w-full lg:w-1/2 p-1 lg:p-4">
          <div className="p-2 sm:p-4 md:p-10">
            {/* Brand name */}
            <div className="h-6 bg-gray-200 rounded w-32 mb-2"></div>
            
            {/* Product name */}
            <div className="h-12 bg-gray-200 rounded w-3/4 mb-8"></div>
            
            {/* Price section */}
            <div className="flex flex-row mb-10 justify-between">
              <div className="flex flex-row gap-4">
                <div className="h-10 bg-gray-200 rounded w-24"></div>
                <div className="h-6 bg-gray-200 rounded w-16 self-center"></div>
              </div>
              <div className="text-end">
                <div className="h-4 bg-gray-200 rounded w-32 mb-1"></div>
                <div className="h-6 bg-gray-200 rounded w-20"></div>
              </div>
            </div>

            {/* Variants skeleton */}
            <div className="flex flex-wrap gap-4 mb-8">
              {[1, 2, 3].map((i) => (
                <div key={i} className="h-10 bg-gray-200 rounded-full w-20"></div>
              ))}
            </div>

            {/* Add to cart button */}
            <div className="h-12 bg-gray-200 rounded w-full mb-10"></div>

            {/* Description */}
            <div className="space-y-2">
              <div className="h-4 bg-gray-200 rounded w-full"></div>
              <div className="h-4 bg-gray-200 rounded w-5/6"></div>
              <div className="h-4 bg-gray-200 rounded w-4/6"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
