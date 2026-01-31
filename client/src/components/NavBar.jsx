import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X, ChevronDown } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

const NavBar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { t } = useLanguage();

  return (
    <nav
      className="
    bg-white
    w-full
    border border-gray-300
    shadow-[0_2px_2px_rgba(0,0,0,0.072),0_6px_10px_rgba(0,0,0,0.096)]
    relative
    z-50
  "
    >


      <div className="w-full">
        <div className="flex items-center w-full">

          {/* Left Navigation Links */}
          <div className="hidden md:flex items-center text-sm font-medium text-gray-700 flex-1">
            <Link to="/" className="flex-1 text-center py-3 transition hover:bg-green-300 hover:text-green-900">
              {t('home')}
            </Link>

            <Link to="/signin" className="flex-1 text-center py-3 transition hover:bg-yellow-300 hover:text-yellow-900">
              SIGN IN
            </Link>

            <div className="flex flex-1 items-center justify-center gap-1 py-3 cursor-pointer transition hover:bg-blue-300 hover:text-blue-900">
              <span>ABOUT US</span>
              <ChevronDown size={16} />
            </div>

            <Link to="/services" className="flex-1 text-center py-3 transition hover:bg-purple-300 hover:text-purple-900">
              SERVICES OFFERED
            </Link>

            <a href="#" className="flex-1 text-center py-3 transition hover:bg-indigo-300 hover:text-indigo-900">
              ONLINE SERVICES
            </a>
          </div>

          {/* Right Navigation Links */}
          <div className="hidden md:flex items-center text-sm font-medium text-gray-700 flex-1">
            <div className="flex flex-1 items-center justify-center gap-1 py-3 cursor-pointer transition hover:bg-orange-300 hover:text-orange-900">
              <span>HELP</span>
              <ChevronDown size={16} />
            </div>

            <a href="#" className="flex-1 text-center py-3 transition hover:bg-pink-300 hover:text-pink-900">
              SITE MAP
            </a>

            <a href="#" className="flex-1 text-center py-3 transition hover:bg-cyan-300 hover:text-cyan-900">
              GET YOUR RECEIPT
            </a>

            <a href="#" className="flex-1 text-center py-3 transition hover:bg-red-300 hover:text-red-900">
              CONTACT US
            </a>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden px-4 py-3 text-gray-700"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden border-t border-gray-200 bg-white">
            <div className="flex flex-col py-2">
              <Link to="/" className="px-4 py-2 text-sm hover:bg-gray-100">{t('home')}</Link>
              <Link to="/signin" className="px-4 py-2 text-sm hover:bg-gray-100">SIGN IN</Link>
              <a href="#" className="px-4 py-2 text-sm hover:bg-gray-100">ABOUT US</a>
              <Link to="/services" className="px-4 py-2 text-sm hover:bg-gray-100">SERVICES OFFERED</Link>
              <a href="#" className="px-4 py-2 text-sm hover:bg-gray-100">ONLINE SERVICES</a>
              <a href="#" className="px-4 py-2 text-sm hover:bg-gray-100">HELP</a>
              <a href="#" className="px-4 py-2 text-sm hover:bg-gray-100">SITE MAP</a>
              <a href="#" className="px-4 py-2 text-sm hover:bg-gray-100">GET YOUR RECEIPT</a>
              <a href="#" className="px-4 py-2 text-sm hover:bg-gray-100">CONTACT US</a>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default NavBar;
