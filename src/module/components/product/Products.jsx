import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { addItemToCart } from "../../redux/cartSlice";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";

const Products = () => {
  const apiUrl = import.meta.env.VITE_API_URL;
  const imagesUrl = import.meta.env.VITE_IMAGES_URL;
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const dispatch = useDispatch();
  const navigate = useNavigate(); 
  const { ref, inView } = useInView({
    triggerOnce: false,
    threshold: 0.2,
  });

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch(`${apiUrl}/products/index`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (!response.ok) {
          const errorData = await response.text();
          throw new Error(errorData);
        }

        const data = await response.json();
        setProducts(data.data.slice(0, 2));
        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };

    fetchProducts();
  }, [apiUrl]);


  const isLoggedIn = () => {
    return !!localStorage.getItem("token"); 
  };

  const handleAddToCart = (product) => {
    if (!isLoggedIn()) {
      alert("Please log in to add items to the cart.");
      navigate("/login");
    } else {
      dispatch(addItemToCart(product)); 
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <section ref={ref}>
      <div className="mx-auto max-w-screen-xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8">
        <h1 className="text-3xl text-center py-5 font-bold text-sky-800">
          Products
        </h1>
        <motion.div
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          variants={{
            hidden: { opacity: 0, y: 20 },
            visible: { opacity: 1, y: 0 },
          }}
          transition={{ duration: 0.5 }}
          className="grid grid-cols-1 gap-4 lg:grid-cols-3 lg:items-stretch"
        >
          <div className="grid place-content-center rounded bg-gray-100 p-6 sm:p-8">
            <div className="mx-auto max-w-md text-center lg:text-left">
              <header>
                <h2 className="text-xl font-bold text-sky-800 sm:text-3xl">
                  Watches
                </h2>
                <p className="mt-4 text-sky-500">
                  The website it is a big e-commerce to buy the product ...
                </p>
              </header>
              <a
                href="/products"
                className="mt-8 inline-block rounded border border-sky-800 bg-sky-800 px-12 py-3 text-sm font-medium text-white transition hover:shadow focus:outline-none focus:ring"
              >
                Shop All
              </a>
            </div>
          </div>

          <div className="lg:col-span-2 lg:py-8">
            <ul className="grid grid-cols-2 gap-4">
              {products.map((product, index) => (
                <motion.li
                  key={product.id}
                  className="bg-white border rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300"
                  initial={{ opacity: 0, y: 20 }}
                  animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                  transition={{ duration: 0.6, delay: index * 0.2 }}
                >
                  <div className="group block relative">
                    <Link to={`/ProductsDetails/${product.id}`}>
                      <img
                        src={`${imagesUrl}/${product.image}`}
                        alt={product.name}
                        className="w-full h-48 object-cover"
                      />
                    </Link>
                    <div className="p-4">
                      <Link to={`/ProductsDetails/${product.id}`}>
                        <h3 className="font-medium text-sky-900 group-hover:underline group-hover:underline-offset-4">
                          {product.name}
                        </h3>
                      </Link>
                      <p className="mt-1 text-sm text-sky-700">
                        ${product.price}
                      </p>
                      <button
                        className="mt-4 inline-block w-full rounded bg-sky-900 px-6 py-2 text-sm font-medium text-white transition hover:bg-sky-700"
                        onClick={() => handleAddToCart(product)}
                      >
                        Add to Cart
                      </button>
                    </div>
                  </div>
                </motion.li>
              ))}
            </ul>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Products;
