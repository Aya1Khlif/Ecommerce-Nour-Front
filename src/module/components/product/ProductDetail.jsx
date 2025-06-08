import { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const ProductDetail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const apiUrl = import.meta.env.VITE_API_URL;
  const imagesUrl = import.meta.env.VITE_IMAGES_URL;

  useEffect(() => {
    axios
      .get(`${apiUrl}/products/show/${id}`)
      .then((response) => {
        setProduct(response.data);
        setLoading(false);
      })
      .catch(() => {
        setError('There was an error fetching the product!');
        setLoading(false);
      });
  }, [id]);

  if (loading) {
    return <div className="text-center mt-10">Loading...</div>;
  }

  if (error) {
    return <div className="text-center text-red-500 mt-10">{error}</div>;
  }

  if (!product) {
    return <div className="text-center text-gray-500 mt-10">No product found</div>;
  }

  return (
    <div className="flex justify-center items-center h-screen mt-8">
      <div className="bg-white shadow-md rounded-lg p-6 max-w-lg w-full">
        <h1 className="text-3xl font-bold text-center mb-6">{product.name}</h1>
        <div className="flex justify-center mb-6">
          <img
            src={`${imagesUrl}/${product.image}`}
            alt={product.name}
            className="w-full h-64 object-cover rounded"
          />
        </div>
        <div className="space-y-4 text-center">
          <p className="text-xl text-gray-800">Price: <span className="font-semibold">{product.price}</span></p>
          <p className="text-lg text-gray-600">Category ID: {product.category_id}</p>
          <p className="text-lg text-gray-600">Brand ID: {product.brand_id}</p>
          <p className="text-lg text-gray-600">Discount: {product.discount}</p>
          <p className="text-lg text-gray-600">Amount: {product.amount}</p>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
