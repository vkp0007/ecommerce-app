import ProductCard from "./ProductCard";
import ProductSkeleton from "./ProductSkeleton";

const ProductGrid = ({ loading, products, addToCart }) => {

  if (loading) {

    return (

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 gap-y-8">

        {Array(8)
          .fill()
          .map((_, i) => (
            <ProductSkeleton key={i} />
          ))}

      </div>

    );

  }

  if (products.length === 0) {

    return (

      <div className="text-center py-20 text-gray-500">

        <p className="text-xl mb-2">🛒 No products found</p>
        <p>Try changing your search or category.</p>

      </div>

    );

  }

  return (

    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 gap-y-8">

      {products.map((product) => (

        <ProductCard
          key={product._id}
          product={product}
          addToCart={addToCart}
        />

      ))}

    </div>

  );

};

export default ProductGrid;