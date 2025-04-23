// src/components/Benefits.js
import React from 'react';

const Benefits = () => {
  const benefits = [
    {
      icon: (
        <svg
          className='w-12 h-12 text-amber-600'
          fill='none'
          stroke='currentColor'
          viewBox='0 0 24 24'
          xmlns='http://www.w3.org/2000/svg'
        >
          <path
            strokeLinecap='round'
            strokeLinejoin='round'
            strokeWidth={2}
            d='M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z'
          />
        </svg>
      ),
      title: 'Delicious Food',
      description:
        'Our chefs craft mouthwatering dishes using the freshest ingredients to impress your guests.',
    },
    {
      icon: (
        <svg
          className='w-12 h-12 text-amber-600'
          fill='none'
          stroke='currentColor'
          viewBox='0 0 24 24'
          xmlns='http://www.w3.org/2000/svg'
        >
          <path
            strokeLinecap='round'
            strokeLinejoin='round'
            strokeWidth={2}
            d='M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z'
          />
        </svg>
      ),
      title: 'Fast Service',
      description:
        'Prompt and professional service ensures your event runs smoothly from start to finish.',
    },
    {
      icon: (
        <svg
          className='w-12 h-12 text-amber-600'
          fill='none'
          stroke='currentColor'
          viewBox='0 0 24 24'
          xmlns='http://www.w3.org/2000/svg'
        >
          <path
            strokeLinecap='round'
            strokeLinejoin='round'
            strokeWidth={2}
            d='M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2'
          />
        </svg>
      ),
      title: 'Custom Menus',
      description:
        'Tailored menus to match your event theme, dietary needs, and personal preferences.',
    },
  ];

  return (
    <section id='services' className='py-16 bg-white'>
      <div className='container mx-auto px-4'>
        <h2 className='text-3xl font-bold text-center text-amber-900 mb-12'>
          Why Choose Guto Catering?
        </h2>
        <div className='grid grid-cols-1 md:grid-cols-3 gap-8'>
          {benefits.map((benefit, index) => (
            <div
              key={index}
              className='bg-amber-50 rounded-lg p-6 shadow-sm hover:shadow-md transition'
            >
              <div className='flex justify-center mb-4'>{benefit.icon}</div>
              <h3 className='text-xl font-semibold text-center text-amber-800 mb-2'>
                {benefit.title}
              </h3>
              <p className='text-gray-700 text-center'>{benefit.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Benefits;
