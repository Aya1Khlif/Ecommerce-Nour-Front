// App.js
import './App.css';
import NavBar from './module/components/NavBar/NavBar';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './module/pages/Home/Home';
import SingIn from './module/pages/Singin/Singin';
import Login from './module/pages/Login/Login';
import CartShopping from './module/pages/Cart/CartShopping';
import Footer from './module/components/Footer/Footer';
import Checkouts from './module/pages/Checkout/Checkout';
import Eroore from './module/pages/Error/Eroore';
import ProductDetail from './module/components/product/ProductDetail';
import Products from './module/components/product/ProductsPage';
import Brands from './module/components/Brand/Brand';
import Orders from './module/components/Orders/Orders';
import Categories from './module/components/Categories/Categories';
import { useState } from 'react';

function App() {
  const [loggedIn, setLoggedIn] = useState(false);

  // Function to handle login
  const handleLogin = () => {
    setLoggedIn(true);
  };

  // Function to handle logout
  const handleLogout = () => {
    setLoggedIn(false);
  };

  return (
    <BrowserRouter>
      {/* Passing the loggedIn state and handleLogout function to NavBar */}
      <NavBar loggedIn={loggedIn} onLogout={handleLogout} />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/login' element={<Login onLogin={handleLogin} />} />
        <Route path='/singin' element={<SingIn />} />
        <Route path='/cart' element={<CartShopping />} />
        <Route path='/checkout' element={<Checkouts />} />
        <Route path='/brand' element={<Brands />} />
        <Route path='/order' element={<Orders />} />
        <Route path='*' element={<Eroore />} />
        <Route path='products' element={<Products />} />
        <Route path='category' element={<Categories />} />
        <Route path='ProductsDetails/:id' element={<ProductDetail />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
