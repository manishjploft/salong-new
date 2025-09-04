export default function RelatedProductsSkeleton() {
  return (
    <div className="animate-pulse">
      <div className="container2 mx-auto">
        {/* Section title */}
        <div className="h-8 bg-gray-200 rounded w-48 mb-8"></div>
        
        {/* Products grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="bg-white rounded-lg shadow-md p-4">
              {/* Product image */}
              <div className="w-full aspect-square bg-gray-200 rounded-lg mb-4"></div>
              
              {/* Brand name */}
              <div className="h-4 bg-gray-200 rounded w-20 mb-2"></div>
              
              {/* Product name */}
              <div className="h-5 bg-gray-200 rounded w-full mb-3"></div>
              
              {/* Price */}
              <div className="h-6 bg-gray-200 rounded w-16 mb-4"></div>
              
              {/* Add to cart button */}
              <div className="h-10 bg-gray-200 rounded w-full"></div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
