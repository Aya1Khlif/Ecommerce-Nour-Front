import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import img from '../../../assets/imges/about2.jpg';

const AboutUs = () => {
  const { ref: imgRef, inView: imgInView } = useInView({
    triggerOnce: false, // Allows the animation to re-trigger every time the component is in view
    threshold: 0.2, // Percentage of the component visible to trigger the animation
  });

  const { ref: textRef, inView: textInView } = useInView({
    triggerOnce: false,
    threshold: 0.2,
  });

  return (
    <>
      <section id='About'>
        <div className="mx-auto max-w-screen-2xl px-4 py-16 sm:px-6 lg:px-8"> 
          <h1 className='text-3xl text-center py-5 font-bold text-sky-800'>About Us</h1>
          <div className="grid grid-cols-1 lg:h-screen lg:grid-cols-2">
            <div className="relative z-10 lg:py-16">
              <div className="relative h-64 sm:h-80 lg:h-full">
                <motion.img
                  alt=""
                  src={img}
                  className="absolute inset-0 h-full w-full object-cover"
                  ref={imgRef}
                  initial={{ opacity: 0, x: -100 }}
                  animate={imgInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -100 }}
                  transition={{ duration: 0.8, ease: 'easeOut' }}
                />
              </div>
            </div>

            <div className="relative flex items-center bg-gray-100">
              <span className="hidden lg:absolute lg:inset-y-0 lg:-start-16 lg:block lg:w-16 lg:bg-gray-100"></span>

              <motion.div 
                className="p-8 sm:p-16 lg:p-24"
                ref={textRef}
                initial={{ opacity: 0, x: 100 }}
                animate={textInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 100 }}
                transition={{ duration: 0.8, ease: 'easeOut' }}
              >
                <h2 className="text-sky-700 text-2xl font-bold sm:text-3xl">
                  Who We Are
                </h2>

                <p className="mt-4 text-gray-600">
                  Founded with a passion for technology and excellence, 
                  [HomeTech] has become a trusted name in the world of 
                  electrical appliances. We pride ourselves on offering a diverse range 
                  of products that combine quality, reliability, and affordability.
                </p>

                <Link
                  to="#contact"
                  className="mt-8 inline-block rounded border border-sky-600 bg-sky-800 px-12 py-3 text-sm font-medium text-white hover:bg-transparent hover:text-sky-600 focus:outline-none focus:ring active:text-sky-500"
                >
                  Get in Touch
                </Link>
              </motion.div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default AboutUs;
