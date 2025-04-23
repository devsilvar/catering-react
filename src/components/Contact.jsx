import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    eventDate: '',
    message: '',
  });

  const [formSubmitted, setFormSubmitted] = useState(false);
  const [whatsappOpen, setWhatsappOpen] = useState(false);
  const [formFocus, setFormFocus] = useState(null);
  const sectionRef = useRef(null);
  const whatsappRef = useRef(null);

  const [whatsappMessage, setWhatsappMessage] = useState('');
  const [chatMessages, setChatMessages] = useState([
    {
      text: 'Hello! 👋 Thank you for your interest in our catering services. How can we help you today?',
      time: '10:22 AM',
      isUser: false,
    },
  ]);

  // ... other existing functions

  const handleWhatsAppMessageChange = (e) => {
    setWhatsappMessage(e.target.value);
  };

  // Create WhatsApp API URL
  const phoneNumber = '+2348148434507';
  const whatsappMsg = 'Hello! I’m interested in your catering service.'; // or any dynamic message
  const encodedMessage = encodeURIComponent(whatsappMessage);
  const whatsappURL = `https://api.whatsapp.com/send?phone=${phoneNumber.replace(
    '+',
    ''
  )}&text=${encodedMessage}`;

  useEffect(() => {
    // window.open(whatsappURL, '_blank');
    // Clear the input field
    setWhatsappMessage('');
    // Add a simulated response after a delay (for better UX)
    setTimeout(() => {
      setChatMessages((prev) => [
        ...prev,
        {
          text: "Thanks for your message! We'll respond to you shortly.",
          time: new Date().toLocaleTimeString([], {
            hour: '2-digit',
            minute: '2-digit',
          }),
          isUser: false,
        },
      ]);
    }, 1000);
  }, [whatsappOpen]);

  // Custom hook for intersection observer animation trigger
  const useOnScreen = (ref, threshold = 0.1) => {
    const [isIntersecting, setIntersecting] = useState(false);

    useEffect(() => {
      const observer = new IntersectionObserver(
        ([entry]) => {
          setIntersecting(entry.isIntersecting);
        },
        { threshold }
      );

      const currentRef = ref.current;
      if (currentRef) {
        observer.observe(currentRef);
      }

      return () => {
        if (currentRef) {
          observer.unobserve(currentRef);
        }
      };
    }, [ref, threshold]);

    return isIntersecting;
  };

  const isVisible = useOnScreen(sectionRef);

  // Close WhatsApp chat when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (whatsappRef.current && !whatsappRef.current.contains(event.target)) {
        setWhatsappOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you would typically send the form data to your backend
    setFormSubmitted(true);

    // Reset after 5 seconds
    setTimeout(() => {
      setFormSubmitted(false);
      setFormData({
        name: '',
        email: '',
        phone: '',
        eventDate: '',
        message: '',
      });
    }, 5000);
  };

  const handleFocus = (field) => {
    setFormFocus(field);
  };

  const handleBlur = () => {
    setFormFocus(null);
  };

  const openWhatsApp = () => {
    setWhatsappOpen(true);
  };

  const sendWhatsAppMessage = (e) => {
    e.preventDefault();
    window.open(whatsappURL, '_blank');
    setWhatsappOpen(false);
  };

  return (
    <section
      id='contact'
      className='py-24 relative bg-gradient-to-br from-white to-amber-50 overflow-hidden'
      ref={sectionRef}
    >
      {/* Decorative elements */}
      <div className='absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none'>
        <div className='absolute -top-24 -right-24 w-64 h-64 bg-amber-100 rounded-full opacity-60'></div>
        <div className='absolute top-1/2 -left-32 w-64 h-64 bg-amber-200 rounded-full opacity-30'></div>
        <div className='absolute -bottom-20 right-1/3 w-80 h-80 bg-amber-100 rounded-full opacity-40'></div>
        <motion.div
          className='absolute top-1/4 left-1/4 w-4 h-4 bg-amber-400 rounded-full'
          animate={{
            y: [0, -20, 0],
            opacity: [0.5, 1, 0.5],
          }}
          transition={{
            repeat: Infinity,
            duration: 4,
          }}
        />
        <motion.div
          className='absolute bottom-1/4 right-1/4 w-6 h-6 bg-amber-300 rounded-full'
          animate={{
            y: [0, -30, 0],
            opacity: [0.4, 0.8, 0.4],
          }}
          transition={{
            repeat: Infinity,
            duration: 5,
            delay: 1,
          }}
        />
      </div>

      <div className='container mx-auto px-4 relative z-10'>
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className='mb-16 text-center'
        >
          <span className='inline-block px-4 py-1 rounded-full bg-amber-200 text-amber-800 font-medium text-sm mb-4'>
            GET STARTED TODAY
          </span>
          <h2 className='text-4xl md:text-5xl font-extrabold text-amber-900 mb-6'>
            Let's Create Something{' '}
            <span className='text-amber-600'>Extraordinary</span>
          </h2>
          <div className='w-24 h-1 bg-amber-500 mx-auto mb-6'></div>
          <p className='max-w-2xl mx-auto text-lg text-gray-700'>
            Our team of culinary experts is ready to bring your vision to life.
            Reach out now to begin planning your unforgettable event.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.3 }}
          className='max-w-5xl mx-auto'
        >
          <div className='bg-white rounded-2xl shadow-xl overflow-hidden'>
            <div className='grid grid-cols-1 lg:grid-cols-5'>
              {/* Left side - Contact info */}
              <div className='lg:col-span-2 bg-gradient-to-br from-amber-600 to-amber-800 text-white p-8 md:p-10 relative overflow-hidden'>
                {/* Decorative patterns */}
                <div className='absolute inset-0 opacity-10'>
                  <div className='absolute top-0 left-0 w-full h-full'>
                    {[...Array(5)].map((_, i) => (
                      <div
                        key={i}
                        className='absolute'
                        style={{
                          width: `${80 + i * 20}px`,
                          height: `${80 + i * 20}px`,
                          borderRadius: '50%',
                          border: '2px solid rgba(255,255,255,0.2)',
                          top: `${10 + i * 15}%`,
                          left: `${10 + i * 10}%`,
                        }}
                      />
                    ))}
                  </div>
                </div>

                <div className='relative z-10'>
                  <h3 className='text-2xl font-bold mb-6'>
                    Contact Information
                  </h3>
                  <p className='text-amber-100 mb-8'>
                    Ready to elevate your next event? Our team is available to
                    discuss your needs and create a custom experience that will
                    delight your guests.
                  </p>

                  <div className='space-y-6 mb-10'>
                    <div className='flex items-center'>
                      <div className='w-10 h-10 rounded-full bg-amber-500/30 flex items-center justify-center mr-4'>
                        <svg
                          className='w-5 h-5 text-white'
                          fill='none'
                          stroke='currentColor'
                          viewBox='0 0 24 24'
                          xmlns='http://www.w3.org/2000/svg'
                        >
                          <path
                            strokeLinecap='round'
                            strokeLinejoin='round'
                            strokeWidth={2}
                            d='M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z'
                          />
                        </svg>
                      </div>
                      <div>
                        <h4 className='text-sm uppercase tracking-wider text-amber-200 mb-1'>
                          Call Us
                        </h4>
                        <a
                          href='tel:+1234567890'
                          className='text-white text-lg hover:underline'
                        >
                          (123) 456-7890
                        </a>
                      </div>
                    </div>

                    <div className='flex items-center'>
                      <div className='w-10 h-10 rounded-full bg-amber-500/30 flex items-center justify-center mr-4'>
                        <svg
                          className='w-5 h-5 text-white'
                          fill='none'
                          stroke='currentColor'
                          viewBox='0 0 24 24'
                          xmlns='http://www.w3.org/2000/svg'
                        >
                          <path
                            strokeLinecap='round'
                            strokeLinejoin='round'
                            strokeWidth={2}
                            d='M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z'
                          />
                        </svg>
                      </div>
                      <div>
                        <h4 className='text-sm uppercase tracking-wider text-amber-200 mb-1'>
                          Email Us
                        </h4>
                        <a
                          href='mailto:info@gutocatering.com'
                          className='text-white text-lg hover:underline'
                        >
                          info@gutocatering.com
                        </a>
                      </div>
                    </div>

                    <div className='flex items-center'>
                      <div className='w-10 h-10 rounded-full bg-amber-500/30 flex items-center justify-center mr-4'>
                        <svg
                          className='w-5 h-5 text-white'
                          fill='none'
                          stroke='currentColor'
                          viewBox='0 0 24 24'
                          xmlns='http://www.w3.org/2000/svg'
                        >
                          <path
                            strokeLinecap='round'
                            strokeLinejoin='round'
                            strokeWidth={2}
                            d='M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z'
                          />
                          <path
                            strokeLinecap='round'
                            strokeLinejoin='round'
                            strokeWidth={2}
                            d='M15 11a3 3 0 11-6 0 3 3 0 016 0z'
                          />
                        </svg>
                      </div>
                      <div>
                        <h4 className='text-sm uppercase tracking-wider text-amber-200 mb-1'>
                          Our Office
                        </h4>
                        <p className='text-white text-lg'>
                          123 Culinary Lane, Foodville
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className='flex flex-col space-y-4'>
                    <button
                      onClick={openWhatsApp}
                      className='flex items-center justify-center bg-white text-amber-700 hover:bg-amber-50 font-bold py-3 px-6 rounded-lg transition transform hover:-translate-y-1 hover:shadow-lg'
                    >
                      <svg
                        className='w-6 h-6 mr-2'
                        viewBox='0 0 24 24'
                        fill='currentColor'
                        xmlns='http://www.w3.org/2000/svg'
                      >
                        <path
                          d='M20.4054 3.5865C18.1607 1.33284 15.1709 0.0925293 11.9945 0.0898438C5.4376 0.0898438 0.103195 5.42225 0.100258 11.9791C0.0992266 14.0935 0.649414 16.1536 1.69455 17.9771L0 24.0898L6.25646 22.4316C8.01407 23.3816 9.98487 23.8837 11.9891 23.8845H11.9945C18.5496 23.8845 23.8849 18.5512 23.8879 11.9944C23.8906 8.82598 22.6502 5.83925 20.4054 3.5865ZM11.9945 21.8705H11.9899C10.2082 21.8697 8.4617 21.387 6.93185 20.4742L6.5725 20.2662L2.844 21.2352L3.82963 17.6018L3.6018 17.2275C2.59963 15.6461 2.07739 13.8364 2.07834 11.9799C2.08035 6.53348 6.54775 2.06608 12.0006 2.06608C14.6536 2.06796 17.1637 3.10573 19.053 4.99967C20.9423 6.89362 21.9738 9.40738 21.9719 12.0612C21.9692 17.5084 17.5026 21.8705 11.9945 21.8705ZM17.4159 14.5019C17.122 14.3553 15.6585 13.6385 15.3881 13.5389C15.1177 13.4401 14.9187 13.3905 14.7198 13.6843C14.5208 13.9782 13.9517 14.6459 13.7765 14.8456C13.6013 15.0446 13.427 15.0694 13.1323 14.9228C12.8384 14.7762 11.8905 14.4627 10.7645 13.4581C9.88253 12.6721 9.30037 11.7089 9.12514 11.415C8.9499 11.1211 9.1066 10.9583 9.25666 10.8082C9.39166 10.6722 9.55666 10.4559 9.70841 10.2807C9.85931 10.1055 9.90971 9.98057 10.0085 9.78161C10.1073 9.58265 10.0578 9.40741 9.98262 9.26084C9.90741 9.11426 9.32793 7.65075 9.07995 7.06208C8.8386 6.4899 8.59304 6.56893 8.40841 6.55893C8.23317 6.55068 8.03421 6.55068 7.83525 6.55068C7.63629 6.55068 7.31671 6.62589 7.04631 6.91982C6.77591 7.21375 6.00983 7.93058 6.00983 9.39409C6.00983 10.8576 7.0711 12.2721 7.22284 12.471C7.37374 12.67 9.29879 15.6259 12.2239 16.8928C13.0215 17.2371 13.6497 17.4486 14.1434 17.6095C14.9576 17.8716 15.698 17.8356 16.2838 17.7581C16.9364 17.672 18.1335 17.0374 18.3815 16.3511C18.6295 15.6648 18.6295 15.0762 18.5543 14.9481C18.4791 14.8201 18.2801 14.7449 17.9862 14.5983L17.4159 14.5019Z'
                          fill='currentColor'
                        />
                      </svg>
                      Chat via WhatsApp
                    </button>

                    <a
                      href='tel:+1234567890'
                      className='flex items-center justify-center bg-amber-500/30 hover:bg-amber-500/40 text-white font-bold py-3 px-6 rounded-lg transition transform hover:-translate-y-1 hover:shadow-lg'
                    >
                      <svg
                        className='w-5 h-5 mr-2'
                        fill='none'
                        stroke='currentColor'
                        viewBox='0 0 24 24'
                        xmlns='http://www.w3.org/2000/svg'
                      >
                        <path
                          strokeLinecap='round'
                          strokeLinejoin='round'
                          strokeWidth={2}
                          d='M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z'
                        />
                      </svg>
                      Call Now
                    </a>
                  </div>

                  <div className='absolute -bottom-14 -right-14 w-64 h-64 bg-amber-500/20 rounded-full'></div>
                </div>
              </div>

              {/* Right side - Form */}
              <div className='lg:col-span-3 p-8 md:p-10'>
                <AnimatePresence>
                  {formSubmitted ? (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0 }}
                      className='h-full flex flex-col items-center justify-center text-center py-10'
                    >
                      <div className='w-20 h-20 rounded-full bg-green-100 flex items-center justify-center mb-6'>
                        <svg
                          className='w-10 h-10 text-green-500'
                          fill='none'
                          stroke='currentColor'
                          viewBox='0 0 24 24'
                          xmlns='http://www.w3.org/2000/svg'
                        >
                          <path
                            strokeLinecap='round'
                            strokeLinejoin='round'
                            strokeWidth={2}
                            d='M5 13l4 4L19 7'
                          />
                        </svg>
                      </div>
                      <h3 className='text-2xl font-bold text-gray-800 mb-2'>
                        Thank You, {formData.name}!
                      </h3>
                      <p className='text-gray-600 mb-6 max-w-md'>
                        We've received your message and will contact you shortly
                        to discuss your catering needs.
                      </p>
                      <div className='text-sm text-gray-500'>
                        Redirecting in a few seconds...
                      </div>
                    </motion.div>
                  ) : (
                    <motion.form
                      onSubmit={handleSubmit}
                      className='space-y-6'
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                    >
                      <h3 className='text-2xl font-bold text-gray-800 mb-6'>
                        Tell Us About Your Event
                      </h3>

                      <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
                        <div className='relative'>
                          <motion.div
                            className='absolute -inset-0.5 bg-gradient-to-r from-amber-600 to-amber-400 rounded-lg blur opacity-30 transition-opacity duration-200'
                            animate={{
                              opacity: formFocus === 'name' ? 0.75 : 0,
                            }}
                          />
                          <label
                            htmlFor='name'
                            className='block text-sm font-medium text-gray-700 mb-1'
                          >
                            Full Name
                          </label>
                          <input
                            type='text'
                            id='name'
                            name='name'
                            value={formData.name}
                            onChange={handleChange}
                            onFocus={() => handleFocus('name')}
                            onBlur={handleBlur}
                            required
                            className='relative w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition-all duration-200'
                            placeholder='John Smith'
                          />
                        </div>

                        <div className='relative'>
                          <motion.div
                            className='absolute -inset-0.5 bg-gradient-to-r from-amber-600 to-amber-400 rounded-lg blur opacity-30 transition-opacity duration-200'
                            animate={{
                              opacity: formFocus === 'email' ? 0.75 : 0,
                            }}
                          />
                          <label
                            htmlFor='email'
                            className='block text-sm font-medium text-gray-700 mb-1'
                          >
                            Email Address
                          </label>
                          <input
                            type='email'
                            id='email'
                            name='email'
                            value={formData.email}
                            onChange={handleChange}
                            onFocus={() => handleFocus('email')}
                            onBlur={handleBlur}
                            required
                            className='relative w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500'
                            placeholder='john@example.com'
                          />
                        </div>
                      </div>

                      <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
                        <div className='relative'>
                          <motion.div
                            className='absolute -inset-0.5 bg-gradient-to-r from-amber-600 to-amber-400 rounded-lg blur opacity-30 transition-opacity duration-200'
                            animate={{
                              opacity: formFocus === 'phone' ? 0.75 : 0,
                            }}
                          />
                          <label
                            htmlFor='phone'
                            className='block text-sm font-medium text-gray-700 mb-1'
                          >
                            Phone Number
                          </label>
                          <input
                            type='tel'
                            id='phone'
                            name='phone'
                            value={formData.phone}
                            onChange={handleChange}
                            onFocus={() => handleFocus('phone')}
                            onBlur={handleBlur}
                            className='relative w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500'
                            placeholder='(123) 456-7890'
                          />
                        </div>

                        <div className='relative'>
                          <motion.div
                            className='absolute -inset-0.5 bg-gradient-to-r from-amber-600 to-amber-400 rounded-lg blur opacity-30 transition-opacity duration-200'
                            animate={{
                              opacity: formFocus === 'eventDate' ? 0.75 : 0,
                            }}
                          />
                          <label
                            htmlFor='eventDate'
                            className='block text-sm font-medium text-gray-700 mb-1'
                          >
                            Event Date (if known)
                          </label>
                          <input
                            type='date'
                            id='eventDate'
                            name='eventDate'
                            value={formData.eventDate}
                            onChange={handleChange}
                            onFocus={() => handleFocus('eventDate')}
                            onBlur={handleBlur}
                            className='relative w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500'
                          />
                        </div>
                      </div>

                      <div className='relative'>
                        <motion.div
                          className='absolute -inset-0.5 bg-gradient-to-r from-amber-600 to-amber-400 rounded-lg blur opacity-30 transition-opacity duration-200'
                          animate={{
                            opacity: formFocus === 'message' ? 0.75 : 0,
                          }}
                        />
                        <label
                          htmlFor='message'
                          className='block text-sm font-medium text-gray-700 mb-1'
                        >
                          Tell Us About Your Event
                        </label>
                        <textarea
                          id='message'
                          name='message'
                          rows='4'
                          value={formData.message}
                          onChange={handleChange}
                          onFocus={() => handleFocus('message')}
                          onBlur={handleBlur}
                          required
                          className='relative w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500'
                          placeholder='Tell us about your event, number of guests, and any dietary requirements...'
                        ></textarea>
                      </div>

                      <motion.button
                        type='submit'
                        className='w-full bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-700 hover:to-amber-800 text-white font-bold py-4 px-6 rounded-lg transition transform hover:-translate-y-1 hover:shadow-xl flex items-center justify-center'
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <span>Send Message</span>
                        <svg
                          className='w-5 h-5 ml-2'
                          fill='none'
                          stroke='currentColor'
                          viewBox='0 0 24 24'
                          xmlns='http://www.w3.org/2000/svg'
                        >
                          <path
                            strokeLinecap='round'
                            strokeLinejoin='round'
                            strokeWidth={2}
                            d='M13 7l5 5m0 0l-5 5m5-5H6'
                          />
                        </svg>
                      </motion.button>

                      <p className='text-center text-sm text-gray-500'>
                        We respect your privacy and will never share your
                        information.
                      </p>
                    </motion.form>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Trust badges */}
        <motion.div
          className='max-w-4xl mx-auto mt-16 flex flex-wrap justify-center items-center gap-6 opacity-80'
          initial={{ opacity: 0, y: 20 }}
          animate={isVisible ? { opacity: 0.7, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.5 }}
        >
          {[
            'Trusted',
            'Professional',
            'Award-Winning',
            'Reliable',
            'Customized',
          ].map((badge, index) => (
            <div
              key={index}
              className='flex items-center bg-white bg-opacity-70 px-5 py-2 rounded-full'
            >
              <div className='w-3 h-3 rounded-full bg-amber-500 mr-2'></div>
              <span className='text-amber-800 font-medium'>{badge}</span>
            </div>
          ))}
        </motion.div>
      </div>

      {/* WhatsApp Chat Widget */}
      <AnimatePresence>
        {!whatsappOpen && (
          <motion.button
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className='fixed bottom-6 right-6 z-50 w-16 h-16 bg-green-500 rounded-full shadow-lg flex items-center justify-center'
            onClick={openWhatsApp}
          >
            <svg
              className='w-10 h-10 text-white'
              viewBox='0 0 24 24'
              fill='currentColor'
              xmlns='http://www.w3.org/2000/svg'
            >
              <path
                d='M20.4054 3.5865C18.1607 1.33284 15.1709 0.0925293 11.9945 0.0898438C5.4376 0.0898438 0.103195 5.42225 0.100258 11.9791C0.0992266 14.0935 0.649414 16.1536 1.69455 17.9771L0 24.0898L6.25646 22.4316C8.01407 23.3816 9.98487 23.8837 11.9891 23.8845H11.9945C18.5496 23.8845 23.8849 18.5512 23.8879 11.9944C23.8906 8.82598 22.6502 5.83925 20.4054 3.5865ZM11.9945 21.8705H11.9899C10.2082 21.8697 8.4617 21.387 6.93185 20.4742L6.5725 20.2662L2.844 21.2352L3.82963 17.6018L3.6018 17.2275C2.59963 15.6461 2.07739 13.8364 2.07834 11.9799C2.08035 6.53348 6.54775 2.06608 12.0006 2.06608C14.6536 2.06796 17.1637 3.10573 19.053 4.99967C20.9423 6.89362 21.9738 9.40738 21.9719 12.0612C21.9692 17.5084 17.5026 21.8705 11.9945 21.8705Z'
                fill='currentColor'
              />
              <path
                d='M20.4054 3.5865C18.1607 1.33284 15.1709 0.0925293 11.9945 0.0898438C5.4376 0.0898438 0.103195 5.42225 0.100258 11.9791C0.0992266 14.0935 0.649414 16.1536 1.69455 17.9771L0 24.0898L6.25646 22.4316C8.01407 23.3816 9.98487 23.8837 11.9891 23.8845H11.9945C18.5496 23.8845 23.8849 18.5512 23.8879 11.9944C23.8906 8.82598 22.6502 5.83925 20.4054 3.5865ZM11.9945 21.8705H11.9899C10.2082 21.8697 8.4617 21.387 6.93185 20.4742L6.5725 20.2662L2.844 21.2352L3.82963 17.6018L3.6018 17.2275C2.59963 15.6461 2.07739 13.8364 2.07834 11.9799C2.08035 6.53348 6.54775 2.06608 12.0006 2.06608C14.6536 2.06796 17.1637 3.10573 19.053 4.99967C20.9423 6.89362 21.9738 9.40738 21.9719 12.0612C21.9692 17.5084 17.5026 21.8705 11.9945 21.8705ZM17.4159 14.5019C17.122 14.3553 15.6585 13.6385 15.3881 13.5389C15.1177 13.4401 14.9187 13.3905 14.7198 13.6843C14.5208 13.9782 13.9517 14.6459 13.7765 14.8456C13.6013 15.0446 13.427 15.0694 13.1323 14.9228C12.8384 14.7762 11.8905 14.4627 10.7645 13.4581C9.88253 12.6721 9.30037 11.7089 9.12514 11.415C8.9499 11.1211 9.1066 10.9583 9.25666 10.8082C9.39166 10.6722 9.55666 10.4559 9.70841 10.2807C9.85931 10.1055 9.90971 9.98057 10.0085 9.78161C10.1073 9.58265 10.0578 9.40741 9.98262 9.26084C9.90741 9.11426 9.32793 7.65075 9.07995 7.06208C8.8386 6.4899 8.59304 6.56893 8.40841 6.55893C8.23317 6.55068 8.03421 6.55068 7.83525 6.55068C7.63629 6.55068 7.31671 6.62589 7.04631 6.91982C6.77591 7.21375 6.00983 7.93058 6.00983 9.39409C6.00983 10.8576 7.0711 12.2721 7.22284 12.471C7.37374 12.67 9.29879 15.6259 12.2239 16.8928C13.0215 17.2371 13.6497 17.4486 14.1434 17.6095C14.9576 17.8716 15.698 17.8356 16.2838 17.7581C16.9364 17.672 18.1335 17.0374 18.3815 16.3511C18.6295 15.6648 18.6295 15.0762 18.5543 14.9481C18.4791 14.8201 18.2801 14.7449 17.9862 14.5983L17.4159 14.5019Z'
                fill='currentColor'
              />
            </svg>
          </motion.button>
        )}
      </AnimatePresence>

      {/* WhatsApp Chat Modal */}
      <AnimatePresence>
        {whatsappOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className='fixed bottom-6 right-6 z-50 w-80 max-w-full bg-white rounded-2xl shadow-2xl overflow-hidden'
            ref={whatsappRef}
          >
            <div className='bg-green-500 text-white p-4 flex items-center justify-between'>
              <div className='flex items-center'>
                <div className='w-10 h-10 rounded-full bg-white/20 flex items-center justify-center mr-3'>
                  <svg
                    className='w-6 h-6 text-white'
                    viewBox='0 0 24 24'
                    fill='currentColor'
                    xmlns='http://www.w3.org/2000/svg'
                  >
                    <path
                      d='M20.4054 3.5865C18.1607 1.33284 15.1709 0.0925293 11.9945 0.0898438C5.4376 0.0898438 0.103195 5.42225 0.100258 11.9791C0.0992266 14.0935 0.649414 16.1536 1.69455 17.9771L0 24.0898L6.25646 22.4316C8.01407 23.3816 9.98487 23.8837 11.9891 23.8845H11.9945C18.5496 23.8845 23.8849 18.5512 23.8879 11.9944C23.8906 8.82598 22.6502 5.83925 20.4054 3.5865Z'
                      fill='currentColor'
                    />
                  </svg>
                </div>
                <div>
                  <h3 className='font-bold'>WhatsApp Chat</h3>
                  <p className='text-xs opacity-90'>
                    Usually replies within an hour
                  </p>
                </div>
              </div>
              <button
                onClick={() => setWhatsappOpen(false)}
                className='text-white hover:bg-white/20 rounded-full p-1'
              >
                <svg
                  className='w-6 h-6'
                  fill='none'
                  stroke='currentColor'
                  viewBox='0 0 24 24'
                  xmlns='http://www.w3.org/2000/svg'
                >
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth={2}
                    d='M6 18L18 6M6 6l12 12'
                  />
                </svg>
              </button>
            </div>

            <div
              className='p-4 max-h-64 overflow-y-auto bg-gray-50'
              style={{
                backgroundImage:
                  "url(\"data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M11 18c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm48 25c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm-43-7c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm63 31c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM34 90c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm56-76c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM12 86c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm28-65c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm23-11c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-6 60c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm29 22c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zM32 63c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm57-13c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-9-21c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM60 91c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM35 41c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM12 60c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2z' fill='%23e5e7eb' fill-opacity='0.4' fill-rule='evenodd'/%3E%3C/svg%3E\")",
              }}
            >
              {chatMessages.map((message, index) => (
                <div
                  key={index}
                  className={`flex items-start mb-3 ${
                    message.isUser ? 'justify-end' : ''
                  }`}
                >
                  <div
                    className={`p-3 rounded-lg ${
                      message.isUser
                        ? 'bg-green-500 text-white rounded-tr-none ml-auto'
                        : 'bg-green-100 rounded-tl-none'
                    } max-w-[85%]`}
                  >
                    <p
                      className={`text-sm ${
                        message.isUser ? 'text-white' : 'text-gray-800'
                      }`}
                    >
                      {message.text}
                    </p>
                    <span
                      className={`text-xs ${
                        message.isUser ? 'text-white/70' : 'text-gray-500'
                      } mt-1 block`}
                    >
                      {message.time}
                    </span>
                  </div>
                </div>
              ))}
            </div>

            <form onSubmit={sendWhatsAppMessage} className='p-3 border-t'>
              <div className='flex items-center gap-2'>
                <input
                  type='text'
                  value={whatsappMessage}
                  onChange={handleWhatsAppMessageChange}
                  placeholder='Type your message...'
                  className='flex-grow px-4 py-2 border border-gray-300 rounded-full focus:ring-2 focus:ring-green-500 focus:border-green-500'
                />
                <button
                  type='submit'
                  className='bg-green-500 text-white p-2 rounded-full hover:bg-green-600 flex-shrink-0'
                >
                  <svg
                    className='w-6 h-6'
                    fill='none'
                    stroke='currentColor'
                    viewBox='0 0 24 24'
                    xmlns='http://www.w3.org/2000/svg'
                  >
                    <path
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      strokeWidth={2}
                      d='M14 5l7 7m0 0l-7 7m7-7H3'
                    />
                  </svg>
                </button>
              </div>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default Contact;
