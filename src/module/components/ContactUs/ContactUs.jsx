import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './Contact.css'
const ContactUs = () => {
  const { ref, inView } = useInView({
    triggerOnce: false, // Restart animation when the section comes into view
    threshold: 0.2, // 20% of the section needs to be visible to trigger the animation
  });

  const sectionVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0 },
  };

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    toast.success('Message sent successfully!');
    setFormData({ name: '', email: '', message: '' });
  };

  return (
    <section id="contact-us" className=" bg-gray-50 " ref={ref}>
      <motion.div
        className="mx-auto max-w-screen-md px-4 py-8 sm:px-6 lg:px-8"
        initial="hidden"
        animate={inView ? 'visible' : 'hidden'}
        variants={sectionVariants}
        transition={{ duration: 0.8, ease: 'easeOut' }}
      >
        <h2 className="text-3xl font-bold text-center text-sky-800 sm:text-4xl">
          Get in Touch
        </h2>
        <p className="mt-4 text-center text-gray-600">
          We would love to hear from you! Please fill out the form below and we’ll get in touch with you as soon as possible.
        </p>

        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div>
            <label className="block text-sm font-medium text-gray-700">Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="mt-1 w-full  rounded-md border-gray-300 shadow-sm focus:border-sky-500 focus:ring-sky-500 sm:text-sm"
              placeholder="Your Name"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="mt-1 w-full rounded-md border-gray-300 shadow-sm focus:border-sky-500 focus:ring-sky-500 sm:text-sm"
              placeholder="Your Email"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Message</label>
            <textarea
              name="message"
              value={formData.message}
              onChange={handleChange}
              className="mt-1 w-full p-2 rounded-md border-gray-300 shadow-sm focus:border-sky-500 focus:ring-sky-500 sm:text-sm"
              rows="4"
              placeholder="Your Message"
              required
            ></textarea>
          </div>

          <div className="text-center">
            <motion.button
              type="submit"
              className="inline-flex items-center justify-center rounded-md border border-transparent bg-sky-800 px-6 py-3 text-sm font-medium text-white shadow-sm hover:bg-sky-700 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:ring-offset-2"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Send Message
            </motion.button>
          </div>
        </form>
        <ToastContainer />
      </motion.div>
    </section>
  );
};

export default ContactUs;
