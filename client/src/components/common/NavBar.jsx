import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X, ChevronDown } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';

const NavBar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { t } = useLanguage();

  return (
    <nav
      className="
    bg-gradient-to-b from-white to-gray-50
    w-full
    border border-gray-200
    rounded-full
    shadow-[0_4px_6px_rgba(0,0,0,0.1),0_2px_4px_rgba(0,0,0,0.06),inset_0_1px_0_rgba(255,255,255,0.8)]
    relative
    z-50
    mx-2
    my-2
  "
    >


      <div className="w-full px-2">
        <div className="flex items-center w-full">

          {/* Left Navigation Links */}
          <div className="hidden md:flex items-center text-sm font-medium text-gray-700 flex-1 gap-1 py-1">
            <Link to="/" className="flex-1 text-center py-2 px-3 rounded-full transition-all hover:bg-green-500 hover:text-white hover:shadow-md hover:-translate-y-0.5 active:translate-y-0">
              {t('nav.home')}
            </Link>

            <Link to="/signin" className="flex-1 text-center py-2 px-3 rounded-full transition-all hover:bg-yellow-500 hover:text-white hover:shadow-md hover:-translate-y-0.5 active:translate-y-0">
              {t('nav.signIn')}
            </Link>

            <div className="flex flex-1 items-center justify-center gap-1 py-2 px-3 rounded-full cursor-pointer transition-all hover:bg-blue-500 hover:text-white hover:shadow-md hover:-translate-y-0.5 active:translate-y-0">
              <span>{t('nav.aboutUs')}</span>
              <ChevronDown size={16} />
            </div>

            <Link to="/services" className="flex-1 text-center py-2 px-3 rounded-full transition-all hover:bg-purple-500 hover:text-white hover:shadow-md hover:-translate-y-0.5 active:translate-y-0">
              {t('nav.servicesOffered')}
            </Link>

            <a href="#" className="flex-1 text-center py-2 px-3 rounded-full transition-all hover:bg-indigo-500 hover:text-white hover:shadow-md hover:-translate-y-0.5 active:translate-y-0">
              {t('nav.onlineServices')}
            </a>
          </div>

          {/* Right Navigation Links */}
          <div className="hidden md:flex items-center text-sm font-medium text-gray-700 flex-1 gap-1 py-1">
            <Link to="/quick-pay" className="flex-1 text-center py-2 px-3 rounded-full transition-all bg-green-600 text-white hover:bg-green-700 font-bold shadow-md hover:shadow-lg hover:-translate-y-0.5 active:translate-y-0">
              {t('nav.quickPay')}
            </Link>

            <Link to="/help" className="flex-1 text-center py-2 px-3 rounded-full transition-all hover:bg-orange-500 hover:text-white hover:shadow-md hover:-translate-y-0.5 active:translate-y-0">
              {t('nav.help')}
            </Link>

            <a href="#" className="flex-1 text-center py-2 px-3 rounded-full transition-all hover:bg-pink-500 hover:text-white hover:shadow-md hover:-translate-y-0.5 active:translate-y-0">
              {t('nav.siteMap')}
            </a>

            <a href="#" className="flex-1 text-center py-2 px-3 rounded-full transition-all hover:bg-cyan-500 hover:text-white hover:shadow-md hover:-translate-y-0.5 active:translate-y-0">
              {t('nav.getReceipt')}
            </a>

            <a href="#" className="flex-1 text-center py-2 px-3 rounded-full transition-all hover:bg-red-500 hover:text-white hover:shadow-md hover:-translate-y-0.5 active:translate-y-0">
              {t('nav.contactUs')}
            </a>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden px-4 py-3 text-gray-700 rounded-full hover:bg-gray-100"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden border-t border-gray-200 bg-white rounded-b-2xl">
            <div className="flex flex-col py-2 px-2 gap-1">
              <Link to="/" className="px-4 py-2 text-sm rounded-full hover:bg-green-500 hover:text-white transition-all">{t('nav.home')}</Link>
              <Link to="/signin" className="px-4 py-2 text-sm rounded-full hover:bg-yellow-500 hover:text-white transition-all">{t('nav.signIn')}</Link>
              <a href="#" className="px-4 py-2 text-sm rounded-full hover:bg-blue-500 hover:text-white transition-all">{t('nav.aboutUs')}</a>
              <Link to="/services" className="px-4 py-2 text-sm rounded-full hover:bg-purple-500 hover:text-white transition-all">{t('nav.servicesOffered')}</Link>
              <a href="#" className="px-4 py-2 text-sm rounded-full hover:bg-indigo-500 hover:text-white transition-all">{t('nav.onlineServices')}</a>
              <Link to="/quick-pay" className="px-4 py-2 text-sm rounded-full bg-green-600 text-white font-bold hover:bg-green-700 shadow-md transition-all">{t('nav.quickPay')}</Link>
              <Link to="/help" className="px-4 py-2 text-sm rounded-full hover:bg-orange-500 hover:text-white transition-all">{t('nav.help')}</Link>
              <a href="#" className="px-4 py-2 text-sm rounded-full hover:bg-pink-500 hover:text-white transition-all">{t('nav.siteMap')}</a>
              <a href="#" className="px-4 py-2 text-sm rounded-full hover:bg-cyan-500 hover:text-white transition-all">{t('nav.getReceipt')}</a>
              <a href="#" className="px-4 py-2 text-sm rounded-full hover:bg-red-500 hover:text-white transition-all">{t('nav.contactUs')}</a>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default NavBar;
