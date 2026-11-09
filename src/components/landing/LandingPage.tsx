import React from 'react';
import { Navbar } from './Navbar';
import { Hero } from './Hero';
import { Features } from './Features';
import { Templates } from './Templates';
import { CreatorPage } from '../creator/CreatorPage';
import { FAQ } from './FAQ';
import { Testimonials } from './Testimonials';
import { Footer } from './Footer';

export const LandingPage: React.FC = () => {
  return (
    <div className="min-h-full flex flex-col bg-white selection:bg-brand-500 selection:text-white scroll-smooth">
      <Navbar />
      <main className="flex-1">
        <Hero />
        <Features />
        <Templates />
        <CreatorPage />
        <FAQ />
        <Testimonials />
      </main>
      <Footer />
    </div>
  );
};
