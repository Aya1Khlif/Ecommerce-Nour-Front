// NavBar.jsx
import { useState } from "react";
import { IoCart } from "react-icons/io5";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import axios from "axios";
import "./NavBar.css";

const NavBar = ({ loggedIn, onLogout }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const totalQuantity = useSelector((state) => state.cart.totalQuantity);
  const API_URL = import.meta.env.VITE_API_URL;
  const navigate = useNavigate();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleLogout = () => {
    const token = localStorage.getItem("token");

    if (!token) {
      alert("You are not logged in.");
      return;
    }

    axios
      .get(`${API_URL}/logout`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        if (response.data.status) {
          alert(response.data.message);
          localStorage.removeItem("token");
          onLogout(); // Call the onLogout function to update the state in App component
          navigate("/");
        } else {
          alert("Logout failed. Please try again.");
        }
      })
      .catch((error) => {
        console.error("There was an error logging out!", error);
        if (error.response && error.response.status === 401) {
          alert("Session expired. Please log in again.");
          localStorage.removeItem("token");
          onLogout(); // Call the onLogout function to update the state in App component
          navigate("/");
        } else {
          alert("An unexpected error occurred. Please try again later.");
        }
      });
  };

  const handleOrderClick = () => {
    if (!loggedIn) {
      alert("Please log in to access the Order page.");
      navigate("/login");
    } else {
      navigate("/order");
    }
  };

  const handleCategoryClick = () => {
    if (!loggedIn) {
      alert("Please log in to access the Category page.");
      navigate("/login");
    } else {
      navigate("/category");
    }
  };

  const handleBrandClick = () => {
    if (!loggedIn) {
      alert("Please log in to access the Brand page.");
      navigate("/login");
    } else {
      navigate("/brand");
    }
  };

  // New function to handle clicking on the cart icon
  const handleCartClick = () => {
    if (!loggedIn) {
      alert("Please log in to view your cart.");
      navigate("/login");
    } else {
      navigate("/cart");
    }
  };

  return (
    <header className="fixed top-0 left-0 w-full bg-gray-50 z-50">
      <div className="mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <div className="md:flex md:items-center md:gap-12">
            <Link className="block text-sky-800" to="/">
              <span className="sr-only">Home</span>
              <h1 className="logo">HomeTech</h1>
            </Link>
          </div>

          <div className="hidden md:block">
            <nav aria-label="Global">
              <ul className="flex items-center gap-6 text-sm">
                <li>
                  <Link
                    className="text-sky-800 transition hover:text-sky-600/75"
                    to="/"
                  >
                    Home
                  </Link>
                </li>
                <li>
                  <button
                    onClick={handleCategoryClick}
                    className="text-sky-800 transition hover:text-sky-600/75"
                  >
                    Category
                  </button>
                </li>
                <li>
                  <Link
                    className="text-sky-800 transition hover:text-sky-600/75"
                    to="/products"
                  >
                    Products
                  </Link>
                </li>
                <li>
                  <button
                    onClick={handleOrderClick}
                    className="text-sky-800 transition hover:text-sky-600/75"
                  >
                    Order
                  </button>
                </li>
                <li>
                  <button
                    onClick={handleBrandClick}
                    className="text-sky-800 transition hover:text-sky-600/75"
                  >
                    Brand
                  </button>
                </li>
              </ul>
            </nav>
          </div>

          <div className="flex items-center gap-4">
            <div className="sm:flex sm:gap-4">
              {!loggedIn ? (
                <>
                  <Link
                    to="/login"
                    className="rounded-md bg-sky-800 px-5 py-2.5 text-sm font-medium text-white shadow"
                  >
                    Login
                  </Link>
                  <Link
                    to="/singin"
                    className="rounded-md px-5 py-2.5 text-sm font-medium text-sky-800"
                  >
                    Register
                  </Link>
                </>
              ) : (
                <button
                  onClick={handleLogout}
                  className="rounded-md px-5 py-2.5 text-sm font-medium text-sky-800"
                >
                  Logout
                </button>
              )}
            </div>

            <div className="cart flex items-center text-center relative">
              {/* Use the new function handleCartClick */}
              <button onClick={handleCartClick} className="text-sky-800 text-2xl">
                <IoCart className="text-sky-800 text-2xl" />
              </button>
              <span className="counter absolute bottom-4 left-4 bg-red-600 text-white rounded-full px-2 text-xs">
                {totalQuantity}
              </span>
            </div>

            <div className="block md:hidden">
              <button
                onClick={toggleMenu}
                className="rounded bg-gray-100 p-2 text-gray-600 transition hover:text-gray-600/75"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>

      {isMenuOpen && (
        <div className="md:hidden">
          <nav aria-label="Global">
            <ul className="flex flex-col items-center gap-6 text-sm">
              <li>
                <Link
                  className="text-sky-800 transition hover:text-sky-600/75"
                  to="/"
                  onClick={toggleMenu}
                >
                  Home
                </Link>
              </li>
              <li>
                <button
                  onClick={() => {
                    handleCategoryClick();
                    toggleMenu();
                  }}
                  className="text-sky-800 transition hover:text-sky-600/75"
                >
                  Category
                </button>
              </li>
              <li>
                <Link
                  className="text-sky-800 transition hover:text-sky-600/75"
                  to="/products"
                  onClick={toggleMenu}
                >
                  Products
                </Link>
              </li>
              <li>
                <button
                  onClick={() => {
                    handleOrderClick();
                    toggleMenu();
                  }}
                  className="text-sky-800 transition hover:text-sky-600/75"
                >
                  Order
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    handleBrandClick();
                    toggleMenu();
                  }}
                  className="text-sky-800 transition hover:text-sky-600/75"
                >
                  Brand
                </button>
              </li>
            </ul>
          </nav>
        </div>
      )}
    </header>
  );
};

export default NavBar;
