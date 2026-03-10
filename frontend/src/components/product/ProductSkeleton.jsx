const ProductSkeleton = () => {
  return (
    <div className="w-full min-h-[340px] bg-white border border-gray-200 rounded-xl p-4 flex flex-col animate-pulse">

      <div className="h-48 bg-gray-200 rounded mb-4"></div>

      <div className="h-4 bg-gray-300 rounded w-3/4 mx-auto mb-2"></div>
      <div className="h-4 bg-gray-300 rounded w-1/2 mx-auto"></div>

      <div className="flex justify-center gap-2 mt-3">
        <div className="h-5 w-16 bg-gray-300 rounded"></div>
        <div className="h-5 w-12 bg-gray-200 rounded"></div>
      </div>

      <div className="h-5 w-20 bg-gray-200 rounded-full mx-auto mt-3"></div>

      <div className="flex gap-2 mt-auto pt-4">
        <div className="flex-1 h-9 bg-gray-300 rounded"></div>
        <div className="flex-1 h-9 bg-gray-200 rounded"></div>
      </div>

    </div>
  );
};

export default ProductSkeleton;