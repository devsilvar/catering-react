import React, { useState, useEffect, useRef } from 'react';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef(null);

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        menuRef.current &&
        !menuRef.current.contains(event.target) &&
        isMenuOpen
      ) {
        setIsMenuOpen(false);
      }
    };

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isMenuOpen]);

  // Prevent body scroll when menu is open
  useEffect(() => {}, [isMenuOpen]);

  // Close menu when ESC key is pressed
  useEffect(() => {
    const handleEscKey = (event) => {
      if (event.key === 'Escape' && isMenuOpen) {
        setIsMenuOpen(false);
      }
    };

    document.addEventListener('keydown', handleEscKey);
    return () => {
      document.removeEventListener('keydown', handleEscKey);
    };
  }, [isMenuOpen]);

  const navItems = [
    { id: 'services', label: 'Services' },
    { id: 'testimonials', label: 'Testimonials' },
    { id: 'contact', label: 'Contact' },
  ];

  return (
    <header className='sticky top-0 z-50 bg-white shadow-md'>
      <div className='container mx-auto px-4 py-3 md:py-4 flex justify-between items-center'>
        <div className='flex items-center'>
          {/* Logo placeholder - replace with actual logo */}
          <div className='w-10 h-10 md:w-12 md:h-12 rounded-full bg-amber-600 flex items-center justify-center text-white font-bold text-lg md:text-xl mr-2 md:mr-3'>
            G
          </div>
          <h1 className='text-xl md:text-2xl font-bold text-amber-800'>
            Guto Catering
          </h1>
        </div>

        {/* Desktop Navigation */}
        <nav className='hidden md:block'>
          <ul className='flex space-x-8'>
            {navItems.map((item) => (
              <li key={item.id}>
                <a
                  href={`#${item.id}`}
                  className='hover:text-amber-600 transition-colors font-medium'
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        {/* Mobile Menu Toggle Button */}
        <button
          className='md:hidden flex items-center p-2 text-amber-800 hover:text-amber-600 focus:outline-none focus:ring-2 focus:ring-amber-500 rounded-md'
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-expanded={isMenuOpen}
          aria-label='Toggle menu'
        >
          {isMenuOpen ? (
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
          ) : (
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
                d='M4 6h16M4 12h16M4 18h16'
              />
            </svg>
          )}
        </button>
      </div>

      {/* Mobile Menu - Slide Down */}
      <div
        ref={menuRef}
        className={`md:hidden absolute w-full bg-white shadow-lg transition-all duration-300 ease-in-out transform ${
          isMenuOpen
            ? 'opacity-100 translate-y-0'
            : 'opacity-0 -translate-y-full pointer-events-none'
        }`}
      >
        <nav className='container mx-auto px-4 py-3'>
          <ul className='space-y-4 pb-4'>
            {navItems.map((item) => (
              <li key={item.id}>
                <a
                  href={`#${item.id}`}
                  className='block py-2 px-4 text-lg font-medium text-amber-800 hover:bg-amber-50 hover:text-amber-600 rounded-md transition-colors'
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.label}
                </a>
              </li>
            ))}
            <li className='pt-2 border-t border-gray-100'>
              <a
                href='tel:+15551234567'
                className='flex items-center py-2 px-4 text-lg font-medium text-amber-800 hover:bg-amber-50 hover:text-amber-600 rounded-md transition-colors'
                onClick={() => setIsMenuOpen(false)}
              >
                <svg
                  className='w-5 h-5 mr-2'
                  fill='currentColor'
                  viewBox='0 0 20 20'
                  xmlns='http://www.w3.org/2000/svg'
                >
                  <path d='M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z'></path>
                </svg>
                Call Us
              </a>
            </li>
          </ul>
        </nav>
      </div>

      {/* Overlay when mobile menu is open */}
      {isMenuOpen && (
        <div
          className='md:hidden fixed inset-0 bg-black bg-opacity-25 z-40'
          onClick={() => setIsMenuOpen(false)}
        ></div>
      )}
    </header>
  );
};

export default Header;
