const OrdersSkeleton = () => {
  return (
    <div className="space-y-6">

      {[1,2,3].map((item) => (

        <div
          key={item}
          className="bg-white rounded-xl shadow p-6 animate-pulse"
        >

          <div className="flex justify-between mb-4">

            <div className="h-4 bg-gray-300 rounded w-40"></div>

            <div className="h-4 bg-gray-300 rounded w-20"></div>

          </div>

          <div className="space-y-3">

            <div className="h-16 bg-gray-200 rounded"></div>
            <div className="h-16 bg-gray-200 rounded"></div>

          </div>

          <div className="flex justify-between mt-5">

            <div className="h-4 bg-gray-300 rounded w-24"></div>

            <div className="h-8 bg-gray-300 rounded w-28"></div>

          </div>

        </div>

      ))}

    </div>
  );
};

export default OrdersSkeleton;