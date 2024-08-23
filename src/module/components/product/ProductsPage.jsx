import { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom'; // إضافة useNavigate للتوجيه البرمجي
import { useDispatch } from 'react-redux';
import { addItemToCart } from '../../redux/cartSlice';

const Products = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [brands, setBrands] = useState([]);
  const [selectedBrand, setSelectedBrand] = useState('');
  const [loggedIn, setLoggedIn] = useState(false); // حالة تسجيل الدخول

  const apiUrl = import.meta.env.VITE_API_URL;
  const imagesUrl = import.meta.env.VITE_IMAGES_URL;
  const dispatch = useDispatch();
  const navigate = useNavigate(); // إعداد useNavigate للتوجيه البرمجي

  useEffect(() => {
    // التحقق من وجود رمز مميز في localStorage
    const token = localStorage.getItem('token');
    if (token) {
      setLoggedIn(true); // إذا كان هناك رمز مميز، المستخدم مسجل الدخول
    } else {
      setLoggedIn(false); // إذا لم يكن هناك رمز مميز، المستخدم غير مسجل الدخول
    }

    axios
      .get(`${apiUrl}/products/index`)
      .then((response) => {
        setProducts(response.data.data);
        setLoading(false);
      })
      .catch(() => {
        setError('There was an error fetching the products!');
        setLoading(false);
      });

    axios
      .get(`${apiUrl}/brands/index`)
      .then((response) => {
        setBrands(response.data.data);
      })
      .catch(() => {
        setError('There was an error fetching the brands!');
      });
  }, [apiUrl]);

  const filterByBrand = (brandId) => {
    setSelectedBrand(Number(brandId));
  };

  const handleAddToCart = (product) => {
    if (!loggedIn) {
      alert('Please log in to add products to your cart.');
      navigate('/login'); 
      return;
    }

    dispatch(addItemToCart(product));
  };

  const filteredProducts = selectedBrand
    ? products.filter((product) => product.brand_id === selectedBrand)
    : products;

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="p-4">
      <h1 className="text-3xl font-bold mb-6">Product List</h1>
      <div className="mb-4">
        <select
          className="p-2 border border-gray-300 rounded"
          onChange={(e) => filterByBrand(e.target.value)}
        >
          <option value="">All Brands</option>
          {brands.map((brand) => (
            <option key={brand.id} value={brand.id}>
              {brand.name}
            </option>
          ))}
        </select>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {filteredProducts.map((product) => (
          <div key={product.id} className="bg-white shadow-lg rounded-lg overflow-hidden">
            <Link to={`/ProductsDetails/${product.id}`}>
              <img
                src={`${imagesUrl}/${product.image}`}
                alt={product.name}
                className="w-full h-48 object-cover"
              />
            </Link>
            <div className="p-4">
              <h2 className="text-xl font-bold">{product.name}</h2>
              <p className="text-gray-700">Price: {product.price}</p>
              <p className="text-gray-700">Discount: {product.discount}</p>
              <p className="text-gray-700">Amount: {product.amount}</p>
              <button
                className="mt-4 inline-block w-full rounded bg-sky-900 px-6 py-2 text-sm font-medium text-white transition hover:bg-sky-700"
                onClick={() => handleAddToCart(product)}
              >
                Add to Cart
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Products;
