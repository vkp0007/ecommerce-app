const CartSkeleton = () => {

  return (

    <div className="animate-pulse flex gap-6 border rounded-lg p-6 bg-white">

      <div className="w-28 h-28 bg-gray-200 rounded"></div>

      <div className="flex-1 space-y-3">

        <div className="h-4 bg-gray-200 w-2/3 rounded"></div>

        <div className="h-3 bg-gray-200 w-1/4 rounded"></div>

        <div className="h-3 bg-gray-200 w-1/3 rounded"></div>

        <div className="flex gap-2 mt-4">

          <div className="w-8 h-8 bg-gray-200 rounded"></div>
          <div className="w-8 h-8 bg-gray-200 rounded"></div>
          <div className="w-8 h-8 bg-gray-200 rounded"></div>

        </div>

      </div>

      <div className="w-16 h-6 bg-gray-200 rounded"></div>

    </div>

  );

};

export default CartSkeleton;