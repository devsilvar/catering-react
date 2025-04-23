// src/App.js
import React from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import Benefits from './components/Benefits';
import Gallery from './components/Gallery'; // Add this import
import Testimonials from './components/Testimonials';
import Contact from './components/Contact';
import Footer from './components/Footer';
import VideoShowcase from './components/VideoShowcase';

function App() {
  return (
    <div className='font-sans bg-white text-gray-800'>
      <Header />
      <Hero />
      <Benefits />
      <Gallery />
      <VideoShowcase />
      <Testimonials />
      <Contact />
      <Footer />
    </div>
  );
}

export default App;
