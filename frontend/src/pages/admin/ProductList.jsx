import { useEffect, useState } from "react";
import axios from "../../utils/axiosInstance";
import { useAuth } from "../../context/AuthContext";

const ProductList = ({ setEditProduct, setShowForm }) => {

  const { user } = useAuth();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchProducts = async () => {
    const { data } = await axios.get("/products");
    setProducts(data);
    setLoading(false);
  };

  const deleteProduct = async (id) => {

    if (!window.confirm("Delete this product?")) return;

    await axios.delete(`/products/${id}`, {
      headers: { Authorization: `Bearer ${user.token}` },
    });

    setProducts(products.filter((p) => p._id !== id));
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  if (loading) return <p className="text-center">Loading products...</p>;

  return (
    <div className="overflow-x-auto">

      <table className="min-w-full border rounded-lg">

        <thead className="bg-gray-100">

          <tr>
            <th className="p-3">Image</th>
            <th className="p-3">Name</th>
            <th className="p-3">Category</th>
            <th className="p-3">Price</th>
            <th className="p-3">Actions</th>
          </tr>

        </thead>

        <tbody>

          {products.map((p) => (

            <tr key={p._id} className="border-t hover:bg-gray-50">

              <td className="p-3 text-center">
                <img
                  src={p.image}
                  alt={p.name}
                  className="w-14 h-14 object-contain mx-auto"
                />
              </td>

              <td className="p-3 text-center">{p.name}</td>

              <td className="p-3 text-center">{p.category}</td>

              <td className="p-3 text-center">₹ {p.price}</td>

              <td className="p-3 flex justify-center gap-3">

                <button
                  onClick={() => {
                    setEditProduct(p);
                    setShowForm(true);
                  }}
                  className="bg-yellow-500 text-white px-3 py-1 rounded"
                >
                  Edit
                </button>

                <button
                  onClick={() => deleteProduct(p._id)}
                  className="bg-red-500 text-white px-3 py-1 rounded"
                >
                  Delete
                </button>

              </td>

            </tr>

          ))}

        </tbody>

      </table>

    </div>
  );
};

export default ProductList;