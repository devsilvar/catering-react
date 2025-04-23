// src/components/Gallery.js
import React from 'react';

const Gallery = () => {
  // Gallery images data - replace with your actual images
  const galleryItems = [
    {
      id: 1,
      imageUrl:
        'https://images.unsplash.com/photo-1547592180-85f173990554?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
      category: 'Weddings',
      title: 'Elegant Wedding Reception',
      description: 'Stylish table settings for 150 guests',
    },
    {
      id: 2,
      imageUrl:
        'https://images.unsplash.com/photo-1519671482749-fd09be7ccebf?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
      category: 'Corporate',
      title: 'Annual Conference Dinner',
      description: 'Gourmet buffet for 300 attendees',
    },
    {
      id: 3,
      imageUrl:
        'https://images.unsplash.com/photo-1555244162-803834f70033?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
      category: 'Private Parties',
      title: 'Intimate Birthday Celebration',
      description: 'Custom 5-course tasting menu',
    },
    {
      id: 4,
      imageUrl:
        'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
      category: 'Weddings',
      title: 'Rustic Outdoor Wedding',
      description: 'Farm-to-table seasonal menu',
    },
    {
      id: 5,
      imageUrl:
        'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
      category: 'Corporate',
      title: 'Product Launch Event',
      description: 'Creative canapés and cocktails',
    },
    {
      id: 6,
      imageUrl:
        'https://images.unsplash.com/photo-1544025162-d76694265947?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
      category: 'Private Parties',
      title: 'Anniversary Dinner',
      description: 'Personalized menu with wine pairing',
    },
  ];

  // Categories for filtering
  const categories = [
    'All',
    ...new Set(galleryItems.map((item) => item.category)),
  ];

  return (
    <section id='gallery' className='py-16 bg-white'>
      <div className='container mx-auto px-4'>
        <div className='text-center mb-16'>
          <h2 className='text-3xl font-bold text-amber-900 mb-4'>
            Our Catering Portfolio
          </h2>
          <p className='text-lg text-gray-600 max-w-2xl mx-auto'>
            Explore our recent work and get inspired for your next event
          </p>
        </div>

        {/* Gallery Grid */}
        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6'>
          {galleryItems.map((item) => (
            <div
              key={item.id}
              className='group relative overflow-hidden rounded-xl shadow-lg transition-all duration-300 hover:shadow-xl'
            >
              {/* Image */}
              <div className='aspect-[4/3] overflow-hidden'>
                <img
                  src={item.imageUrl}
                  alt={item.title}
                  className='w-full h-full object-cover transition-transform duration-500 group-hover:scale-105'
                />
              </div>

              {/* Overlay */}
              <div className='absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6'>
                <div className='transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300'>
                  <span className='inline-block px-3 py-1 text-xs font-semibold text-amber-900 bg-amber-100 rounded-full mb-2'>
                    {item.category}
                  </span>
                  <h3 className='text-xl font-bold text-white mb-1'>
                    {item.title}
                  </h3>
                  <p className='text-amber-100'>{item.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* CTA at bottom of gallery */}
        <div className='mt-16 text-center'>
          <h3 className='text-2xl font-semibold text-amber-800 mb-4'>
            Ready to create your perfect event?
          </h3>
          <a
            href='#contact'
            className='inline-block bg-amber-600 hover:bg-amber-700 text-white font-bold py-3 px-8 rounded-lg transition'
          >
            Get a Custom Quote
          </a>
        </div>
      </div>
    </section>
  );
};

export default Gallery;
