import React from 'react';
import { Link } from 'react-router-dom';
import { ShieldIcon, Facebook, Twitter, Instagram, Linkedin } from 'lucide-react';
const Footer: React.FC = () => {
  return <footer className="bg-gray-800">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:py-16 lg:px-8">
        <div className="xl:grid xl:grid-cols-3 xl:gap-8">
          <div className="space-y-8 xl:col-span-1">
            <div className="flex items-center">
              <ShieldIcon className="h-10 w-10 text-blue-400" />
              <span className="ml-3 text-xl font-bold text-white">
                TourGuard
              </span>
            </div>
            <p className="text-gray-300 text-base">
              Making tourism safer with advanced monitoring and response
              systems.
            </p>
            <div className="flex space-x-6">
              <a href="#" className="text-gray-400 hover:text-white">
                <span className="sr-only">Facebook</span>
                <Facebook className="h-6 w-6" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white">
                <span className="sr-only">Instagram</span>
                <Instagram className="h-6 w-6" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white">
                <span className="sr-only">Twitter</span>
                <Twitter className="h-6 w-6" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white">
                <span className="sr-only">LinkedIn</span>
                <Linkedin className="h-6 w-6" />
              </a>
            </div>
          </div>
          <div className="mt-12 grid grid-cols-2 gap-8 xl:mt-0 xl:col-span-2">
            <div className="md:grid md:grid-cols-2 md:gap-8">
              <div>
                <h3 className="text-sm font-semibold text-gray-400 tracking-wider uppercase">
                  Solutions
                </h3>
                <ul className="mt-4 space-y-4">
                  <li>
                    <Link to="#" className="text-base text-gray-300 hover:text-white">
                      Tourist Safety
                    </Link>
                  </li>
                  <li>
                    <Link to="#" className="text-base text-gray-300 hover:text-white">
                      Emergency Response
                    </Link>
                  </li>
                  <li>
                    <Link to="#" className="text-base text-gray-300 hover:text-white">
                      Digital ID
                    </Link>
                  </li>
                  <li>
                    <Link to="#" className="text-base text-gray-300 hover:text-white">
                      Location Monitoring
                    </Link>
                  </li>
                </ul>
              </div>
              <div className="mt-12 md:mt-0">
                <h3 className="text-sm font-semibold text-gray-400 tracking-wider uppercase">
                  Support
                </h3>
                <ul className="mt-4 space-y-4">
                  <li>
                    <Link to="#" className="text-base text-gray-300 hover:text-white">
                      Help Center
                    </Link>
                  </li>
                  <li>
                    <Link to="#" className="text-base text-gray-300 hover:text-white">
                      Documentation
                    </Link>
                  </li>
                  <li>
                    <Link to="#" className="text-base text-gray-300 hover:text-white">
                      API Status
                    </Link>
                  </li>
                  <li>
                    <Link to="#" className="text-base text-gray-300 hover:text-white">
                      Contact
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
            <div className="md:grid md:grid-cols-2 md:gap-8">
              <div>
                <h3 className="text-sm font-semibold text-gray-400 tracking-wider uppercase">
                  Company
                </h3>
                <ul className="mt-4 space-y-4">
                  <li>
                    <Link to="#" className="text-base text-gray-300 hover:text-white">
                      About
                    </Link>
                  </li>
                  <li>
                    <Link to="#" className="text-base text-gray-300 hover:text-white">
                      Blog
                    </Link>
                  </li>
                  <li>
                    <Link to="#" className="text-base text-gray-300 hover:text-white">
                      Partners
                    </Link>
                  </li>
                  <li>
                    <Link to="#" className="text-base text-gray-300 hover:text-white">
                      Careers
                    </Link>
                  </li>
                </ul>
              </div>
              <div className="mt-12 md:mt-0">
                <h3 className="text-sm font-semibold text-gray-400 tracking-wider uppercase">
                  Legal
                </h3>
                <ul className="mt-4 space-y-4">
                  <li>
                    <Link to="#" className="text-base text-gray-300 hover:text-white">
                      Privacy
                    </Link>
                  </li>
                  <li>
                    <Link to="#" className="text-base text-gray-300 hover:text-white">
                      Terms
                    </Link>
                  </li>
                  <li>
                    <Link to="#" className="text-base text-gray-300 hover:text-white">
                      Cookie Policy
                    </Link>
                  </li>
                  <li>
                    <Link to="#" className="text-base text-gray-300 hover:text-white">
                      Licensing
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-12 border-t border-gray-700 pt-8">
          <p className="text-base text-gray-400 xl:text-center">
            &copy; 2023 TourGuard, Inc. All rights reserved.
          </p>
        </div>
      </div>
    </footer>;
};
export default Footer;