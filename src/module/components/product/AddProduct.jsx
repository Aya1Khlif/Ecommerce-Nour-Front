import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AddProduct = () => {
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [categoryId, setCategoryId] = useState('');
  const [brandId, setBrandId] = useState('');
  const [discount, setDiscount] = useState('');
  const [amount, setAmount] = useState('');
  const [image, setImage] = useState(null);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const apiUrl = import.meta.env.VITE_API_URL;

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('name', name);
    formData.append('price', price);
    formData.append('category_id', categoryId);
    formData.append('brand_id', brandId);
    formData.append('discount', discount);
    formData.append('amount', amount);
    formData.append('image', image);

    try {
      await axios.post(`${apiUrl}/products/store`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      alert('Product added successfully!');
      navigate('/products'); // توجيه المستخدم بعد إضافة المنتج
    } catch (error) {
      setError('An error occurred while adding the product');
    }
  };

  return (
    <div className="p-4">
      <h1 className="text-3xl font-bold mb-6">Add New Product</h1>
      {error && <p className="text-red-500">{error}</p>}
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-gray-700">Product Name</label>
          <input
            type="text"
            className="w-full p-2 border border-gray-300 rounded"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Price</label>
          <input
            type="number"
            className="w-full p-2 border border-gray-300 rounded"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Category ID</label>
          <input
            type="number"
            className="w-full p-2 border border-gray-300 rounded"
            value={categoryId}
            onChange={(e) => setCategoryId(e.target.value)}
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Brand ID</label>
          <input
            type="number"
            className="w-full p-2 border border-gray-300 rounded"
            value={brandId}
            onChange={(e) => setBrandId(e.target.value)}
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Discount</label>
          <input
            type="number"
            className="w-full p-2 border border-gray-300 rounded"
            value={discount}
            onChange={(e) => setDiscount(e.target.value)}
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Amount</label>
          <input
            type="number"
            className="w-full p-2 border border-gray-300 rounded"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Product Image</label>
          <input
            type="file"
            className="w-full p-2 border border-gray-300 rounded"
            onChange={(e) => setImage(e.target.files[0])}
            required
          />
        </div>
        <button
          type="submit"
          className="bg-green-600 text-white py-2 px-4 rounded"
        >
          Add Product
        </button>
      </form>
    </div>
  );
};

export default AddProduct;
