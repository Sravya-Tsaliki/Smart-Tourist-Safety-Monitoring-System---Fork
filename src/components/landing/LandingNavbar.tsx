import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { MenuIcon, XIcon, ShieldIcon, GlobeIcon } from 'lucide-react';
const LandingNavbar: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [language, setLanguage] = useState('English');
  return <header className="bg-white shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex-shrink-0 flex items-center">
              <ShieldIcon className="h-8 w-8 text-blue-600" />
              <span className="ml-2 text-xl font-bold text-gray-900">
                TourGuard
              </span>
            </Link>
            <nav className="hidden md:ml-10 md:flex md:space-x-8">
              <Link to="/" className="text-gray-900 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium">
                Home
              </Link>
              <Link to="/features" className="text-gray-500 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium">
                Features
              </Link>
              <Link to="/about" className="text-gray-500 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium">
                About
              </Link>
              <Link to="/contact" className="text-gray-500 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium">
                Contact
              </Link>
            </nav>
          </div>
          <div className="hidden md:flex items-center space-x-4">
            <div className="relative">
              <button className="flex items-center text-sm text-gray-700 hover:text-blue-600">
                <GlobeIcon className="h-4 w-4 mr-1" />
                <span>{language}</span>
              </button>
            </div>
            <Link to="/login" className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700">
              Sign In
            </Link>
          </div>
          <div className="flex items-center md:hidden">
            <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100">
              {isMenuOpen ? <XIcon className="block h-6 w-6" /> : <MenuIcon className="block h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>
      {/* Mobile menu */}
      {isMenuOpen && <div className="md:hidden">
          <div className="pt-2 pb-3 space-y-1 px-2">
            <Link to="/" className="block px-3 py-2 rounded-md text-base font-medium text-gray-900 hover:bg-blue-50">
              Home
            </Link>
            <Link to="/features" className="block px-3 py-2 rounded-md text-base font-medium text-gray-500 hover:bg-blue-50">
              Features
            </Link>
            <Link to="/about" className="block px-3 py-2 rounded-md text-base font-medium text-gray-500 hover:bg-blue-50">
              About
            </Link>
            <Link to="/contact" className="block px-3 py-2 rounded-md text-base font-medium text-gray-500 hover:bg-blue-50">
              Contact
            </Link>
          </div>
          <div className="pt-4 pb-3 border-t border-gray-200">
            <div className="flex items-center px-4">
              <div className="flex-shrink-0">
                <GlobeIcon className="h-6 w-6 text-gray-400" />
              </div>
              <div className="ml-3">
                <div className="text-base font-medium text-gray-800">
                  {language}
                </div>
              </div>
            </div>
            <div className="mt-3 space-y-1 px-2">
              <Link to="/login" className="block px-3 py-2 rounded-md text-base font-medium text-gray-900 hover:bg-blue-50">
                Sign In
              </Link>
            </div>
          </div>
        </div>}
    </header>;
};
export default LandingNavbar;