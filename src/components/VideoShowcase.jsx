import React, { useState } from 'react';

const VideoShowcase = () => {
  // State to track which video is currently playing
  const [activeVideoId, setActiveVideoId] = useState(null);

  // Video data - replace with your actual YouTube embed URLs
  const videos = [
    {
      id: 1,
      title: 'Elegant Wedding Catering',
      description: 'Behind-the-scenes of our premium wedding service',
      youtubeId: 'dQw4w9WgXcQ', // Replace with your actual YouTube ID
      thumbnail:
        'https://images.unsplash.com/photo-1519671482749-fd09be7ccebf?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    },
    {
      id: 2,
      title: 'Corporate Event Excellence',
      description: 'How we handle large-scale corporate functions',
      youtubeId: 'dQw4w9WgXcQ', // Replace with your actual YouTube ID
      thumbnail:
        'https://images.unsplash.com/photo-1544025162-d76694265947?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    },
    {
      id: 3,
      title: 'Custom Menu Creation',
      description: 'Our chef designing a personalized menu for clients',
      youtubeId: 'dQw4w9WgXcQ', // Replace with your actual YouTube ID
      thumbnail:
        'https://images.unsplash.com/photo-1555244162-803834f70033?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    },
  ];

  // Function to handle video play
  const playVideo = (id) => {
    setActiveVideoId(id);
  };

  return (
    <section className='relative py-20 bg-gray-900 overflow-hidden'>
      {/* Background decorative elements */}
      <div className='absolute top-0 left-0 w-full h-full opacity-20'>
        <div className='absolute top-0 left-0 w-1/3 h-full bg-amber-500 transform -skew-x-12 -translate-x-1/4'></div>
        <div className='absolute top-0 right-0 w-1/3 h-full bg-amber-600 transform skew-x-12 translate-x-1/4'></div>
      </div>

      <div className='relative container mx-auto px-4 z-10'>
        {/* Section header */}
        <div className='text-center mb-16'>
          <span className='inline-block px-4 py-2 text-sm font-semibold text-amber-400 bg-amber-900 bg-opacity-50 rounded-full mb-4'>
            Video Showcase
          </span>
          <h2 className='text-4xl md:text-5xl font-bold text-white mb-4'>
            See Our Catering in Action
          </h2>
          <p className='text-xl text-amber-100 max-w-3xl mx-auto'>
            Experience the Guto difference through these captivating videos
          </p>
        </div>

        {/* Video grid */}
        <div className='grid grid-cols-1 lg:grid-cols-3 gap-8'>
          {videos.map((video) => (
            <div key={video.id} className='group relative'>
              {/* Video container */}
              <div className='relative rounded-xl overflow-hidden shadow-2xl transform transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl'>
                {activeVideoId === video.id ? (
                  // YouTube iframe - shown when clicked
                  <div className='aspect-w-16 aspect-h-9 h-[300px] bg-gray-800'>
                    <iframe
                      className='w-full h-full'
                      src={`https://www.youtube.com/embed/${video.youtubeId}?autoplay=1&enablejsapi=1`}
                      title={video.title}
                      frameBorder='0'
                      allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture'
                      allowFullScreen
                    ></iframe>
                  </div>
                ) : (
                  // Thumbnail and play button shown before clicking
                  <>
                    <div className='aspect-w-16 aspect-h-9 bg-gray-800'>
                      <img
                        src={video.thumbnail}
                        alt={video.title}
                        className='w-full h-full object-cover opacity-70'
                      />
                    </div>

                    {/* Play button overlay */}
                    <button
                      onClick={() => playVideo(video.id)}
                      className='absolute inset-0 w-full h-full flex items-center justify-center focus:outline-none'
                      aria-label={`Play video: ${video.title}`}
                    >
                      <div className='w-20 h-20 bg-amber-500 rounded-full flex items-center justify-center transform transition-all duration-300 hover:scale-110 hover:bg-amber-400'>
                        <svg
                          className='w-8 h-8 text-white ml-1'
                          fill='none'
                          stroke='currentColor'
                          viewBox='0 0 24 24'
                          xmlns='http://www.w3.org/2000/svg'
                        >
                          <path
                            strokeLinecap='round'
                            strokeLinejoin='round'
                            strokeWidth={2}
                            d='M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z'
                          />
                          <path
                            strokeLinecap='round'
                            strokeLinejoin='round'
                            strokeWidth={2}
                            d='M21 12a9 9 0 11-18 0 9 9 0 0118 0z'
                          />
                        </svg>
                      </div>
                    </button>
                  </>
                )}
              </div>

              {/* Video info that appears below */}
              <div className='mt-6'>
                <h3 className='text-xl font-bold text-white mb-2'>
                  {video.title}
                </h3>
                <p className='text-amber-200'>{video.description}</p>
              </div>
            </div>
          ))}
        </div>

        {/* CTA at bottom */}
        <div className='mt-20 text-center'>
          <h3 className='text-2xl font-semibold text-white mb-6'>
            Want to see more of our work?
          </h3>
          <a
            href='https://youtube.com/yourchannel'
            target='_blank'
            rel='noopener noreferrer'
            className='inline-flex items-center px-8 py-4 bg-amber-600 hover:bg-amber-500 text-white font-bold rounded-lg transition transform hover:scale-105'
          >
            <svg
              className='w-6 h-6 mr-2'
              fill='currentColor'
              viewBox='0 0 24 24'
              xmlns='http://www.w3.org/2000/svg'
            >
              <path d='M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z' />
            </svg>
            Visit Our YouTube Channel
          </a>
        </div>
      </div>
    </section>
  );
};

export default VideoShowcase;
