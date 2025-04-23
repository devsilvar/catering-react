// src/components/Testimonials.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Testimonials = () => {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchGoogleReviews = async () => {
      try {
        // Note: In production, you should call your backend API endpoint
        // that handles the Google My Business API authentication
        const response = await axios.get('YOUR_BACKEND_API_ENDPOINT/reviews');

        // Process the reviews data
        const processedReviews = response.data.reviews.map((review) => ({
          name: review.reviewer.displayName || 'Anonymous',
          role: 'Customer',
          quote: review.comment || '',
          rating: review.starRating || 5,
          date: review.createTime || '',
          photo: review.reviewer.profilePhotoUrl || null,
        }));

        setReviews(processedReviews.slice(0, 3)); // Show only 3 most recent reviews
        setLoading(false);
      } catch (err) {
        console.error('Error fetching reviews:', err);
        setError(
          'Failed to load reviews. Showing sample testimonials instead.'
        );
        setLoading(false);

        // Fallback to sample testimonials if API fails
        setReviews([
          {
            name: 'Sarah Johnson',
            role: 'Wedding Planner',
            quote:
              'Guto Catering made our wedding reception unforgettable. The food was exquisite and the service was impeccable!',
            rating: 5,
            date: '2 weeks ago',
          },
          {
            name: 'Michael Chen',
            role: 'Corporate Event Coordinator',
            quote:
              "We've used Guto for three annual conferences now. Reliable, professional, and the attendees always rave about the food.",
            rating: 5,
            date: '1 month ago',
          },
          {
            name: 'Emily Rodriguez',
            role: 'Private Party Host',
            quote:
              "The custom menu they created for my husband's birthday was perfect. So many guests asked for their contact information!",
            rating: 4,
            date: '3 months ago',
          },
        ]);
      }
    };

    fetchGoogleReviews();
  }, []);

  return (
    <section id='testimonials' className='py-16 bg-amber-100'>
      <div className='container mx-auto px-4'>
        <h2 className='text-3xl font-bold text-center text-amber-900 mb-12'>
          What Our Clients Say
        </h2>

        {loading ? (
          <div className='text-center py-8'>
            <div className='inline-block animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-amber-600'></div>
            <p className='mt-4 text-gray-700'>Loading testimonials...</p>
          </div>
        ) : (
          <>
            {error && (
              <div className='bg-amber-50 border-l-4 border-amber-500 p-4 mb-6'>
                <div className='flex'>
                  <div className='flex-shrink-0'>
                    <svg
                      className='h-5 w-5 text-amber-500'
                      xmlns='http://www.w3.org/2000/svg'
                      viewBox='0 0 20 20'
                      fill='currentColor'
                    >
                      <path
                        fillRule='evenodd'
                        d='M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z'
                        clipRule='evenodd'
                      />
                    </svg>
                  </div>
                  <div className='ml-3'>
                    <p className='text-sm text-amber-700'>{error}</p>
                  </div>
                </div>
              </div>
            )}

            <div className='grid grid-cols-1 md:grid-cols-3 gap-8'>
              {reviews.map((review, index) => (
                <div
                  key={index}
                  className='bg-white rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow'
                >
                  <div className='flex mb-4'>
                    {[...Array(5)].map((_, i) => (
                      <svg
                        key={i}
                        className={`w-5 h-5 ${
                          i < review.rating ? 'text-amber-500' : 'text-gray-300'
                        }`}
                        fill='currentColor'
                        viewBox='0 0 20 20'
                      >
                        <path d='M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z' />
                      </svg>
                    ))}
                  </div>
                  <p className='text-gray-700 italic mb-4'>"{review.quote}"</p>
                  <div className='flex items-center'>
                    {review.photo && (
                      <img
                        src={review.photo}
                        alt={review.name}
                        className='w-10 h-10 rounded-full mr-3 object-cover'
                      />
                    )}
                    <div>
                      <div className='font-semibold text-amber-800'>
                        {review.name}
                      </div>
                      <div className='text-sm text-gray-600 flex items-center'>
                        <span>{review.role}</span>
                        {review.date && (
                          <>
                            <span className='mx-2'>•</span>
                            <span>{review.date}</span>
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className='mt-12 text-center'>
              <a
                href='https://search.google.com/local/writereview?placeid=YOUR_GOOGLE_PLACE_ID'
                target='_blank'
                rel='noopener noreferrer'
                className='inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-amber-600 hover:bg-amber-700 transition'
              >
                <svg
                  className='w-5 h-5 mr-2'
                  fill='currentColor'
                  viewBox='0 0 20 20'
                  xmlns='http://www.w3.org/2000/svg'
                >
                  <path
                    fillRule='evenodd'
                    d='M18 10c0 3.866-3.582 7-8 7a8.841 8.841 0 01-4.083-.98L2 17l1.338-3.123C2.493 12.767 2 11.434 2 10c0-3.866 3.582-7 8-7s8 3.134 8 7zM7 9H5v2h2V9zm8 0h-2v2h2V9zM9 9h2v2H9V9z'
                    clipRule='evenodd'
                  />
                </svg>
                Leave Us a Review
              </a>
            </div>
          </>
        )}
      </div>
    </section>
  );
};

export default Testimonials;
