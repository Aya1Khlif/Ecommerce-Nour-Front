import { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { addItemToCart } from '../../redux/cartSlice';

const Products = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [brands, setBrands] = useState([]);
  const [selectedBrand, setSelectedBrand] = useState('');
  const [loggedIn, setLoggedIn] = useState(false);

  const apiUrl = import.meta.env.VITE_API_URL;
  const imagesUrl = import.meta.env.VITE_IMAGES_URL;
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setLoggedIn(true);
    } else {
      setLoggedIn(false);
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

  const handleAddNewProduct = () => {
    navigate('/add-product'); // توجيه المستخدم إلى صفحة إضافة المنتج
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
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Product List</h1>
      
      </div>
      <div className="mb-4 py-5 m-2">
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
       <button
          className="bg-green-600 text-white py-2 m-2 px-4 rounded"
          onClick={handleAddNewProduct}
        >
          Add New Product
        </button>
  
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
