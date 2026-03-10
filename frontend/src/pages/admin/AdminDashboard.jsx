import { useState } from "react";
import ProductList from "./ProductList";
import ProductForm from "./ProductForm";

const AdminDashboard = () => {

  const [showForm, setShowForm] = useState(false);
  const [editProduct, setEditProduct] = useState(null);

  return (

    <div className="p-6 min-h-screen">

      <div className="max-w-6xl mx-auto bg-white rounded-xl shadow p-6">

        <div className="flex justify-between items-center mb-6 border-b pb-4">

          <div>
            <h2 className="text-2xl font-bold">
              Admin Dashboard
            </h2>

            <p className="text-gray-500 text-sm">
              Manage your store products
            </p>
          </div>

          <button
            onClick={() => {
              setShowForm(true);
              setEditProduct(null);
            }}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg"
          >
            Add Product
          </button>

        </div>

        {!showForm ? (

          <ProductList
            setEditProduct={setEditProduct}
            setShowForm={setShowForm}
          />

        ) : (

          <ProductForm
            editProduct={editProduct}
            setEditProduct={setEditProduct}
            setShowForm={setShowForm}
          />

        )}

      </div>

    </div>

  );

};

export default AdminDashboard;