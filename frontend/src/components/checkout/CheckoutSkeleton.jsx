const CheckoutSkeleton = () => {
  return (
    <div className="max-w-7xl mx-auto px-6 py-10 animate-pulse">

      {/* Title */}
      <div className="h-8 bg-gray-300 w-48 mb-8 rounded"></div>

      <div className="grid md:grid-cols-3 gap-8">

        {/* Left side skeleton */}
        <div className="md:col-span-2 space-y-6">

          {/* Shipping Skeleton */}
          <div className="bg-white p-6 border rounded-lg space-y-4">
            <div className="h-6 bg-gray-300 w-40 rounded"></div>

            <div className="h-10 bg-gray-200 rounded"></div>
            <div className="h-10 bg-gray-200 rounded"></div>
            <div className="h-10 bg-gray-200 rounded"></div>
            <div className="h-10 bg-gray-200 rounded"></div>
          </div>

          {/* Payment Skeleton */}
          <div className="bg-white p-6 border rounded-lg space-y-4">
            <div className="h-6 bg-gray-300 w-40 rounded"></div>
            <div className="h-10 bg-gray-200 rounded"></div>
          </div>

        </div>

        {/* Right side skeleton */}
        <div className="bg-white p-6 border rounded-lg space-y-4">

          <div className="h-6 bg-gray-300 w-40 rounded"></div>

          {[1,2,3].map((i) => (
            <div key={i} className="flex gap-3">
              <div className="w-14 h-14 bg-gray-200 rounded"></div>
              <div className="flex-1 space-y-2">
                <div className="h-4 bg-gray-200 rounded"></div>
                <div className="h-3 bg-gray-200 rounded w-24"></div>
              </div>
            </div>
          ))}

          <div className="h-5 bg-gray-300 w-24 rounded"></div>

          <div className="h-10 bg-gray-300 rounded"></div>

        </div>

      </div>
    </div>
  );
};

export default CheckoutSkeleton;