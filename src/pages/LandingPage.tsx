import React from 'react';
import { Link } from 'react-router-dom';
import HeroSection from '../components/landing/HeroSection';
import FeaturesSection from '../components/landing/FeaturesSection';
import CTASection from '../components/landing/CTASection';
import LandingNavbar from '../components/landing/LandingNavbar';
import TestimonialsSection from '../components/landing/TestimonialsSection';
import Footer from '../components/landing/Footer';
const LandingPage: React.FC = () => {
  return <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <LandingNavbar />
      <HeroSection />
      <FeaturesSection />
      <TestimonialsSection />
      <CTASection />
      <Footer />
    </div>;
};
export default LandingPage;