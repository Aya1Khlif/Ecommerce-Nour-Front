import AboutUs from "../../components/AboutUs/AboutUs";
import ContactUs from "../../components/ContactUs/ContactUs";
// import Brands from "../../components/Brand/Brand";
// import Categories from "../../components/Categories/Categories";
import Hero from "../../components/Hero/Hero";
// import Orders from "../../components/Orders/Orders";
import Products from "../../components/product/Products";
import Review from "../../components/Review/Review";
import './Home.css'
const Home = () => {
  return (
    <>
    <Hero/>       
    <AboutUs/>
    <Products/>
    <Review/>
    <ContactUs/>
    </>
  );
}

export default Home;
