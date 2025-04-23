import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

const Hero = () => {
  const imageRef = useRef(null);

  useEffect(() => {
    // Parallax effect on scroll
    const handleScroll = () => {
      if (imageRef.current) {
        const scrollY = window.scrollY;
        imageRef.current.style.transform = `translateY(${scrollY * 0.1}px)`;
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section className='relative overflow-hidden bg-gradient-to-br from-amber-50 to-amber-100 min-h-screen flex items-center'>
      {/* Floating elements - decorative food icons */}
      <div className='absolute inset-0 pointer-events-none'>
        {[...Array(5)].map((_, i) => (
          <motion.div
            key={i}
            className='absolute opacity-10'
            initial={{ y: -20, opacity: 0 }}
            animate={{
              y: [20, -20],
              opacity: [0.05, 0.15, 0.05],
              rotate: i % 2 === 0 ? [0, 10, 0] : [0, -10, 0],
            }}
            transition={{
              repeat: Infinity,
              duration: 8 + i * 2,
              ease: 'easeInOut',
            }}
            style={{
              left: `${15 + i * 20}%`,
              top: `${10 + i * 15}%`,
              width: `${30 + i * 10}px`,
              height: `${30 + i * 10}px`,
              background: i % 2 === 0 ? '#92400e' : '#b45309',
              borderRadius: '50%',
            }}
          />
        ))}
      </div>

      {/* Main content */}
      <div className='container mx-auto px-4 py-16 md:py-24 flex flex-col md:flex-row items-center z-10'>
        {/* Text content */}
        <motion.div
          className='md:w-1/2 mb-8 md:mb-0 md:pr-12'
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
        >
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
          >
            <span className='inline-block px-4 py-1 rounded-full bg-amber-200 text-amber-800 font-medium text-sm mb-6 transform hover:scale-105 transition-transform'>
              Premium Catering Service
            </span>
          </motion.div>

          <motion.h1
            className='text-5xl md:text-6xl font-bold text-amber-900 mb-6 leading-tight'
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
          >
            <span className='block'>Extraordinary</span>
            <span className='block text-amber-600'>Culinary Experiences</span>
          </motion.h1>

          <motion.p
            className='text-xl text-gray-700 mb-8 max-w-lg'
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.6 }}
          >
            From intimate celebrations to grand corporate events, we craft
            unforgettable moments with exquisite cuisine that leaves a lasting
            impression.
          </motion.p>

          <motion.div
            className='flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-6'
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.6 }}
          >
            <a
              href='#contact'
              className='bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-700 hover:to-amber-800 text-white font-bold py-4 px-8 rounded-lg text-center transition transform hover:-translate-y-1 hover:shadow-xl flex items-center justify-center'
            >
              <span>Get Your Custom Quote</span>
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
                  d='M17 8l4 4m0 0l-4 4m4-4H3'
                />
              </svg>
            </a>
            <a
              href='tel:+1234567890'
              className='border-2 border-amber-600 text-amber-700 hover:bg-amber-50 font-bold py-4 px-8 rounded-lg text-center transition transform hover:-translate-y-1 hover:shadow-md flex items-center justify-center'
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
              <span>Call: (123) 456-7890</span>
            </a>
          </motion.div>

          <motion.div
            className='mt-12 flex items-center'
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2, duration: 0.8 }}
          >
            <div className='flex -space-x-2'>
              {[...Array(3)].map((_, i) => (
                <div
                  key={i}
                  className={`w-8 h-8 rounded-full border-2 border-white bg-amber-${
                    300 + i * 100
                  }`}
                ></div>
              ))}
            </div>
            <div className='ml-4'>
              <div className='text-amber-800 font-medium'>500+ Events</div>
              <div className='text-amber-600 text-sm'>Successfully Catered</div>
            </div>
          </motion.div>
        </motion.div>

        {/* Image section */}
        <motion.div
          className='md:w-1/2 relative'
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
        >
          <div className='relative'>
            {/* Main image */}
            <div
              ref={imageRef}
              className='rounded-2xl overflow-hidden shadow-2xl transform hover:scale-[1.02] transition-all duration-500 relative'
            >
              <div className='bg-amber-800 rounded-2xl overflow-hidden aspect-video flex items-center justify-center relative'>
                <span className='absolute inset-0 bg-gradient-to-tr from-amber-900/80 via-transparent to-transparent z-10'></span>
                <span className='text-amber-50 text-xl z-20 absolute bottom-6 left-6 font-medium'>
                  Artisanal Catering Experiences
                </span>
                {/* Replace with actual image in production */}
                <div className='absolute inset-0 bg-amber-300'></div>
              </div>
            </div>

            {/* Decorative element */}
            <motion.div
              className='absolute -bottom-6 -right-6 w-32 h-32 bg-amber-200 rounded-full z-[-1]'
              animate={{
                scale: [1, 1.05, 1],
              }}
              transition={{
                repeat: Infinity,
                duration: 5,
                ease: 'easeInOut',
              }}
            />

            {/* Floating badge */}
            <motion.div
              className='absolute -top-8 -right-8 bg-white rounded-lg shadow-xl p-4 z-20'
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 1, duration: 0.8 }}
              whileHover={{ y: -5, scale: 1.05 }}
            >
              <div className='flex items-center'>
                <div className='text-amber-500 mr-2'>
                  <svg
                    className='w-5 h-5'
                    fill='currentColor'
                    viewBox='0 0 20 20'
                    xmlns='http://www.w3.org/2000/svg'
                  >
                    <path d='M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z' />
                  </svg>
                </div>
                <div>
                  <div className='font-bold text-amber-900'>4.9/5.0</div>
                  <div className='text-xs text-gray-500'>Client Rating</div>
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>

      {/* Bottom pattern */}
      <div className='absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-amber-100 to-transparent'></div>
    </section>
  );
};

export default Hero;
