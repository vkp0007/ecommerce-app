import { useState } from 'react';
import ProductList from './ProductList';
import ProductForm from './ProductForm';

const AdminDashboard = () => {
  const [showForm, setShowForm] = useState(false);
  const [editProduct, setEditProduct] = useState(null);

  return (
    <div className="p-6 bg-blue-50 min-h-screen">
      <div className="max-w-6xl mx-auto bg-white rounded-2xl shadow-lg p-6">
        <div className="flex justify-between items-center mb-6 border-b pb-3">
          <h2 className="text-2xl font-bold text-blue-700">
            🛒 Admin Dashboard — Product Management
          </h2>
          <button
            onClick={() => {
              setShowForm(true);
              setEditProduct(null);
            }}
            className="bg-yellow-500 hover:bg-yellow-600 text-white font-semibold px-4 py-2 rounded-lg shadow-md transition-all duration-300"
          >
            ➕ Add Product
          </button>
        </div>

        {!showForm ? (
          <ProductList setEditProduct={setEditProduct} setShowForm={setShowForm} />
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
