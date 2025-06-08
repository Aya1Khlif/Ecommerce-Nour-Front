import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { useInView } from "react-intersection-observer";
import "./Hero.css";

const Hero = () => {
  const { ref, inView } = useInView({
    triggerOnce: false, 
    threshold: 0.1
  });

  return (
    <>
      <section
        ref={ref}
        className="bg-image relative bg-cover bg-center bg-no-repeat  "
      >
        <div className="absolute inset-0 lg:bg-gray-800/75 md:bg-gray-800/75 sm:bg-gray-800/75 sm:from-gray-900/95 sm:to-gray-900/25 ltr:sm:bg-gradient-to-r rtl:sm:bg-gradient-to-l"></div>
        <div className="relative mx-auto max-w-screen-xl px-4 py-32 sm:px-6 lg:flex lg:h-screen lg:items-center lg:px-8">
          <motion.div
            className="max-w-xl ltr:sm:text-left rtl:sm:text-right"
            initial={{ opacity: 0, y: 50 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <motion.h1
              className="text-3xl font-extrabold text-white sm:text-5xl"
              initial={{ scale: 0.8 }}
              animate={inView ? { scale: 1 } : { scale: 0.8 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
            >
              Power Up Your Life
              <strong className="block font-extrabold text-sky-800">
                with Our Premium Electronics
              </strong>
            </motion.h1>

            <motion.p
              className="mt-4 max-w-lg text-white sm:text-xl/relaxed"
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : { opacity: 0 }}
              transition={{ delay: 0.6, duration: 0.6, ease: "easeOut" }}
            >
              Shop the latest in electrical appliances and gadgets, all at
              unbeatable prices
            </motion.p>

            <motion.div
              className="mt-8 flex flex-wrap gap-4 text-center"
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : { opacity: 0 }}
              transition={{ delay: 0.6, duration: 0.6, ease: "easeOut" }}
            >
              <Link
                to="/products"
                className="block w-full rounded bg-sky-800 px-12 py-3 text-sm font-medium text-white shadow hover:bg-sky-700 focus:outline-none focus:ring active:bg-sky-500 sm:w-auto"
              >
                Get Started
              </Link>

              <Link
                to="/Home"
                className="block w-full rounded bg-white px-12 py-3 text-sm font-medium text-sky-800 shadow hover:text-sky-700 focus:outline-none focus:ring active:text-sky-500 sm:w-auto"
              >
                Learn More
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </>
  );
};

export default Hero;
