import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "../utils/axiosInstance";
import { useAuth } from "../context/AuthContext";

import ProductDetails from "../components/product/ProductDetails";
import ReviewSection from "../components/ReviewSection";

const ProductDetailsPage = () => {

  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {

    const fetchProduct = async () => {

      try {
        const { data } = await axios.get(`/products/${id}`);
        setProduct(data);
      } catch (error) {
        console.error(error);
      }

      setLoading(false);

    };

    fetchProduct();

  }, [id]);

  const addToCart = async (redirect = false) => {

    if (!user) {
      navigate("/login");
      return;
    }

    try {

      await axios.post(
        "/cart",
        { productId: id, qty: 1 },
        { headers: { Authorization: `Bearer ${user.token}` } }
      );

      if (redirect) navigate("/checkout");
      else alert("Product added to cart");

    } catch (error) {
      console.error(error);
    }

  };

  if (loading)
    return <div className="text-center py-20">Loading product...</div>;

  if (!product)
    return <div className="text-center py-20">Product not found</div>;

  return (

    <div className="max-w-7xl mx-auto px-4 py-10">

      <ProductDetails
        product={product}
        addToCart={addToCart}
      />

      <div className="mt-10">
        <ReviewSection />
      </div>

    </div>

  );

};

export default ProductDetailsPage;