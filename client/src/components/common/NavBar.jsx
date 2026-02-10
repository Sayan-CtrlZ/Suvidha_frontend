import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Menu, X, ChevronDown, LogOut, User, Home, LayoutDashboard, Layers, Zap, HelpCircle, Phone } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';
import { useAuth } from '../../context/AuthContext';

const NavBar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { t } = useLanguage();
  const { isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  const handleLogout = () => {
    logout();
    navigate('/');
    setIsOpen(false);
  };

  return (
    <nav className="bg-white/95 backdrop-blur-xl border-2 border-gray-200 rounded-3xl shadow-xl relative z-50 ml-12 mr-8 my-4">

      {/* Subtle gradient accent at top */}
      <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-transparent via-green-500/60 to-transparent rounded-t-3xl" />

      <div className="w-full pl-10 pr-4 py-3">
        <div className="flex items-center justify-between w-full gap-2">

          {/* All Navigation Links - Evenly Distributed */}
          <div className="hidden md:flex items-center justify-between text-sm font-bold text-gray-700 gap-2 flex-1 flex-wrap xl:flex-nowrap">
            {!isAuthenticated ? (
              <>
                <Link to="/" className="group relative px-10 py-4 rounded-2xl border-2 border-white/50 bg-white/60 backdrop-blur-md flex items-center gap-3 overflow-hidden transition-all duration-300 hover:scale-105 active:scale-95 shadow-md">
                  <div className={`absolute inset-0 bg-gradient-to-br from-green-500 to-emerald-600 ${isActive('/') ? 'opacity-100' : 'opacity-0'} group-hover:opacity-100 transition-opacity duration-400 ease-in-out`} />
                  <Home size={24} className={`relative z-10 transition-colors duration-400 ${isActive('/') ? 'text-white' : 'group-hover:text-white'}`} />
                  <span className={`relative z-10 text-base font-bold transition-colors duration-400 ${isActive('/') ? 'text-white' : 'group-hover:text-white'}`}>{t('nav.home')}</span>
                </Link>

                <Link to="/signin" className="group relative px-10 py-4 rounded-2xl border-2 border-white/50 bg-white/60 backdrop-blur-md flex items-center gap-3 overflow-hidden transition-all duration-300 hover:scale-105 active:scale-95 shadow-md">
                  <div className={`absolute inset-0 bg-gradient-to-br from-yellow-500 to-orange-500 ${isActive('/signin') ? 'opacity-100' : 'opacity-0'} group-hover:opacity-100 transition-opacity duration-400 ease-in-out`} />
                  <User size={24} className={`relative z-10 transition-colors duration-400 ${isActive('/signin') ? 'text-white' : 'group-hover:text-white'}`} />
                  <span className={`relative z-10 text-base font-bold transition-colors duration-400 ${isActive('/signin') ? 'text-white' : 'group-hover:text-white'}`}>{t('nav.signIn')}</span>
                </Link>

                <Link to="/about" className="group relative px-10 py-4 rounded-2xl border-2 border-white/50 bg-white/60 backdrop-blur-md cursor-pointer flex items-center gap-3 overflow-hidden transition-all duration-300 hover:scale-105 active:scale-95 shadow-md">
                  <div className={`absolute inset-0 bg-gradient-to-br from-blue-500 to-indigo-600 ${isActive('/about') ? 'opacity-100' : 'opacity-0'} group-hover:opacity-100 transition-opacity duration-400 ease-in-out`} />
                  <span className={`relative z-10 text-base font-bold transition-colors duration-400 ${isActive('/about') ? 'text-white' : 'group-hover:text-white'}`}>{t('nav.aboutUs')}</span>
                  <ChevronDown size={20} className={`relative z-10 transition-colors duration-400 ${isActive('/about') ? 'text-white' : 'group-hover:text-white'}`} />
                </Link>

                <Link to="/services" className="group relative px-10 py-4 rounded-2xl border-2 border-white/50 bg-white/60 backdrop-blur-md flex items-center gap-3 overflow-hidden transition-all duration-300 hover:scale-105 active:scale-95 shadow-md">
                  <div className={`absolute inset-0 bg-gradient-to-br from-emerald-500 to-teal-600 ${isActive('/services') ? 'opacity-100' : 'opacity-0'} group-hover:opacity-100 transition-opacity duration-400 ease-in-out`} />
                  <Layers size={24} className={`relative z-10 transition-colors duration-400 ${isActive('/services') ? 'text-white' : 'group-hover:text-white'}`} />
                  <span className={`relative z-10 text-base font-bold transition-colors duration-400 ${isActive('/services') ? 'text-white' : 'group-hover:text-white'}`}>{t('nav.servicesOffered')}</span>
                </Link>

                <Link to="/quick-pay" className="group relative px-10 py-4 rounded-2xl border-2 border-white/50 bg-white/60 backdrop-blur-md flex items-center gap-3 overflow-hidden transition-all duration-300 hover:scale-105 active:scale-95 shadow-md">
                  <div className={`absolute inset-0 bg-gradient-to-br from-violet-500 to-purple-600 ${isActive('/quick-pay') ? 'opacity-100' : 'opacity-0'} group-hover:opacity-100 transition-opacity duration-400 ease-in-out`} />
                  <Zap size={24} className={`relative z-10 transition-colors duration-400 ${isActive('/quick-pay') ? 'text-white' : 'text-violet-600 group-hover:text-white'}`} />
                  <span className={`relative z-10 text-base font-bold transition-colors duration-400 ${isActive('/quick-pay') ? 'text-white' : 'text-violet-600 group-hover:text-white'}`}>{t('nav.quickPay')}</span>
                </Link>

                <Link to="/help" className="group relative px-10 py-4 rounded-2xl border-2 border-white/50 bg-white/60 backdrop-blur-md flex items-center gap-3 overflow-hidden transition-all duration-300 hover:scale-105 active:scale-95 shadow-md">
                  <div className={`absolute inset-0 bg-gradient-to-br from-orange-500 to-red-500 ${isActive('/help') ? 'opacity-100' : 'opacity-0'} group-hover:opacity-100 transition-opacity duration-400 ease-in-out`} />
                  <HelpCircle size={24} className={`relative z-10 transition-colors duration-400 ${isActive('/help') ? 'text-white' : 'group-hover:text-white'}`} />
                  <span className={`relative z-10 text-base font-bold transition-colors duration-400 ${isActive('/help') ? 'text-white' : 'group-hover:text-white'}`}>{t('nav.help')}</span>
                </Link>

                <Link to="/contact" className="group relative px-10 py-4 rounded-2xl border-2 border-white/50 bg-white/60 backdrop-blur-md flex items-center gap-3 overflow-hidden transition-all duration-300 hover:scale-105 active:scale-95 shadow-md">
                  <div className={`absolute inset-0 bg-gradient-to-br from-emerald-600 to-teal-700 ${isActive('/contact') ? 'opacity-100' : 'opacity-0'} group-hover:opacity-100 transition-opacity duration-400 ease-in-out`} />
                  <Phone size={24} className={`relative z-10 transition-colors duration-400 ${isActive('/contact') ? 'text-white' : 'group-hover:text-white'}`} />
                  <span className={`relative z-10 text-base font-bold transition-colors duration-400 ${isActive('/contact') ? 'text-white' : 'group-hover:text-white'}`}>{t('nav.contactUs')}</span>
                </Link>
              </>
            ) : (
              <>
                <Link to="/dashboard" className="group relative px-5 py-3 rounded-2xl border-2 border-white/50 bg-white/60 backdrop-blur-md flex items-center gap-2 overflow-hidden transition-all duration-300 hover:scale-105 active:scale-95 shadow-sm">
                  <div className={`absolute inset-0 bg-gradient-to-br from-blue-500 to-indigo-600 ${isActive('/dashboard') ? 'opacity-100' : 'opacity-0'} group-hover:opacity-100 transition-opacity duration-400 ease-in-out`} />
                  <LayoutDashboard size={21} className={`relative z-10 transition-colors duration-400 ${isActive('/dashboard') ? 'text-white' : 'group-hover:text-white'}`} />
                  <span className={`relative z-10 transition-colors duration-400 ${isActive('/dashboard') ? 'text-white' : 'group-hover:text-white'}`}>{t('nav.dashboard')}</span>
                </Link>

                <Link to="/my-services" className="group relative px-5 py-3 rounded-2xl border-2 border-white/50 bg-white/60 backdrop-blur-md flex items-center gap-2 overflow-hidden transition-all duration-300 hover:scale-105 active:scale-95 shadow-sm">
                  <div className={`absolute inset-0 bg-gradient-to-br from-purple-500 to-violet-600 ${isActive('/my-services') ? 'opacity-100' : 'opacity-0'} group-hover:opacity-100 transition-opacity duration-400 ease-in-out`} />
                  <Layers size={21} className={`relative z-10 transition-colors duration-400 ${isActive('/my-services') ? 'text-white' : 'group-hover:text-white'}`} />
                  <span className={`relative z-10 transition-colors duration-400 ${isActive('/my-services') ? 'text-white' : 'group-hover:text-white'}`}>{t('nav.myServices')}</span>
                </Link>

                <Link to="/services" className="group relative px-5 py-3 rounded-2xl border-2 border-white/50 bg-white/60 backdrop-blur-md flex items-center gap-2 overflow-hidden transition-all duration-300 hover:scale-105 active:scale-95 shadow-sm">
                  <div className={`absolute inset-0 bg-gradient-to-br from-emerald-500 to-teal-600 ${isActive('/services') ? 'opacity-100' : 'opacity-0'} group-hover:opacity-100 transition-opacity duration-400 ease-in-out`} />
                  <Layers size={21} className={`relative z-10 transition-colors duration-400 ${isActive('/services') ? 'text-white' : 'group-hover:text-white'}`} />
                  <span className={`relative z-10 transition-colors duration-400 ${isActive('/services') ? 'text-white' : 'group-hover:text-white'}`}>{t('nav.servicesOffered')}</span>
                </Link>

                <Link to="/quick-pay" className="group relative px-5 py-3 rounded-2xl border-2 border-white/50 bg-white/60 backdrop-blur-md flex items-center gap-2 overflow-hidden transition-all duration-300 hover:scale-105 active:scale-95 shadow-sm">
                  <div className={`absolute inset-0 bg-gradient-to-br from-emerald-600 to-teal-800 ${isActive('/quick-pay') ? 'opacity-100' : 'opacity-0'} group-hover:opacity-100 transition-opacity duration-400 ease-in-out`} />
                  <Zap size={21} className={`relative z-10 transition-colors duration-400 ${isActive('/quick-pay') ? 'text-white' : 'text-violet-600 group-hover:text-white'}`} />
                  <span className={`relative z-10 font-bold transition-colors duration-400 ${isActive('/quick-pay') ? 'text-white' : 'text-violet-600 group-hover:text-white'}`}>{t('nav.quickPay')}</span>
                </Link>

                <Link to="/help" className="group relative px-5 py-3 rounded-2xl border-2 border-white/50 bg-white/60 backdrop-blur-md flex items-center gap-2 overflow-hidden transition-all duration-300 hover:scale-105 active:scale-95 shadow-sm">
                  <div className={`absolute inset-0 bg-gradient-to-br from-orange-500 to-red-500 ${isActive('/help') ? 'opacity-100' : 'opacity-0'} group-hover:opacity-100 transition-opacity duration-400 ease-in-out`} />
                  <HelpCircle size={21} className={`relative z-10 transition-colors duration-400 ${isActive('/help') ? 'text-white' : 'group-hover:text-white'}`} />
                  <span className={`relative z-10 transition-colors duration-400 ${isActive('/help') ? 'text-white' : 'group-hover:text-white'}`}>{t('nav.help')}</span>
                </Link>

                <Link to="/contact" className="group relative px-5 py-3 rounded-2xl border-2 border-white/50 bg-white/60 backdrop-blur-md flex items-center gap-2 overflow-hidden transition-all duration-300 hover:scale-105 active:scale-95 shadow-sm">
                  <div className={`absolute inset-0 bg-gradient-to-br from-emerald-600 to-teal-700 ${isActive('/contact') ? 'opacity-100' : 'opacity-0'} group-hover:opacity-100 transition-opacity duration-400 ease-in-out`} />
                  <Phone size={21} className={`relative z-10 transition-colors duration-400 ${isActive('/contact') ? 'text-white' : 'group-hover:text-white'}`} />
                  <span className={`relative z-10 transition-colors duration-400 ${isActive('/contact') ? 'text-white' : 'group-hover:text-white'}`}>{t('nav.contactUs')}</span>
                </Link>

                <Link to="/account" className="group relative px-5 py-3 rounded-2xl border-2 border-white/50 bg-white/60 backdrop-blur-md flex items-center gap-2 overflow-hidden transition-all duration-300 hover:scale-105 active:scale-95 shadow-sm">
                  <div className={`absolute inset-0 bg-gradient-to-br from-blue-500 to-indigo-600 ${isActive('/account') ? 'opacity-100' : 'opacity-0'} group-hover:opacity-100 transition-opacity duration-400 ease-in-out`} />
                  <User size={21} className={`relative z-10 transition-colors duration-400 ${isActive('/account') ? 'text-white' : 'group-hover:text-white'}`} />
                  <span className={`relative z-10 transition-colors duration-400 ${isActive('/account') ? 'text-white' : 'group-hover:text-white'}`}>{t('nav.myAccount')}</span>
                </Link>

                <button
                  onClick={handleLogout}
                  className="group relative px-5 py-3 rounded-2xl border-2 border-white/50 bg-white/60 backdrop-blur-md flex items-center gap-2 overflow-hidden transition-all duration-300 hover:scale-105 active:scale-95 shadow-sm"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-red-700 to-rose-900 opacity-0 group-hover:opacity-100 transition-opacity duration-400 ease-in-out" />
                  <LogOut size={21} className="relative z-10 transition-colors duration-400 group-hover:text-white" />
                  <span className="font-bold relative z-10 transition-colors duration-400 group-hover:text-white">{t('nav.logout')}</span>
                </button>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-3 text-gray-700 rounded-xl hover:bg-gray-100"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden border-t border-gray-200/50 mt-2 pt-2 pb-2">
            <div className="flex flex-col gap-1.5">
              {!isAuthenticated ? (
                <>
                  <Link to="/" onClick={() => setIsOpen(false)} className="group relative px-4 py-2.5 text-sm rounded-xl border border-white/40 bg-white/40 backdrop-blur-md flex items-center gap-2 overflow-hidden transition-all duration-400">
                    <div className={`absolute inset-0 bg-gradient-to-r from-green-500 to-emerald-600 ${isActive('/') ? 'opacity-100' : 'opacity-0'} group-hover:opacity-100 transition-opacity duration-400 ease-in-out`} />
                    <Home size={16} className={`relative z-10 transition-colors ${isActive('/') ? 'text-white' : 'group-hover:text-white'}`} />
                    <span className={`relative z-10 transition-colors ${isActive('/') ? 'text-white' : 'group-hover:text-white'}`}>{t('nav.home')}</span>
                  </Link>
                  <Link to="/signin" onClick={() => setIsOpen(false)} className="group relative px-4 py-2.5 text-sm rounded-xl border border-white/40 bg-white/40 backdrop-blur-md flex items-center gap-2 overflow-hidden transition-all duration-400">
                    <div className={`absolute inset-0 bg-gradient-to-r from-yellow-500 to-orange-500 ${isActive('/signin') ? 'opacity-100' : 'opacity-0'} group-hover:opacity-100 transition-opacity duration-400 ease-in-out`} />
                    <User size={16} className={`relative z-10 transition-colors ${isActive('/signin') ? 'text-white' : 'group-hover:text-white'}`} />
                    <span className={`relative z-10 transition-colors ${isActive('/signin') ? 'text-white' : 'group-hover:text-white'}`}>{t('nav.signIn')}</span>
                  </Link>
                  <Link to="/about" onClick={() => setIsOpen(false)} className="group relative px-4 py-2.5 text-sm rounded-xl border border-white/40 bg-white/40 backdrop-blur-md overflow-hidden transition-all duration-400 flex items-center gap-2">
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-indigo-600 opacity-0 group-hover:opacity-100 transition-opacity duration-400 ease-in-out" />
                    <span className="relative z-10 transition-colors group-hover:text-white">{t('nav.aboutUs')}</span>
                  </Link>
                  <Link to="/services" onClick={() => setIsOpen(false)} className="group relative px-4 py-2.5 text-sm rounded-xl border border-white/40 bg-white/40 backdrop-blur-md flex items-center gap-2 overflow-hidden transition-all duration-400">
                    <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-pink-600 opacity-0 group-hover:opacity-100 transition-opacity duration-400 ease-in-out" />
                    <Layers size={16} className="relative z-10 transition-colors group-hover:text-white" />
                    <span className="relative z-10 transition-colors group-hover:text-white">{t('nav.servicesOffered')}</span>
                  </Link>
                  <a href="#" onClick={() => setIsOpen(false)} className="group relative px-4 py-2.5 text-sm rounded-xl border border-white/40 bg-white/40 backdrop-blur-md overflow-hidden transition-all duration-400 inline-block">
                    <div className="absolute inset-0 bg-gradient-to-r from-indigo-500 to-blue-600 opacity-0 group-hover:opacity-100 transition-opacity duration-400 ease-in-out" />
                    <span className="relative z-10 transition-colors group-hover:text-white">{t('nav.onlineServices')}</span>
                  </a>
                  <Link to="/quick-pay" onClick={() => setIsOpen(false)} className="group relative px-4 py-2.5 text-sm rounded-xl border border-white/40 bg-white/40 backdrop-blur-md flex items-center gap-2 overflow-hidden transition-all duration-400">
                    <div className={`absolute inset-0 bg-gradient-to-r from-violet-500 to-purple-600 ${isActive('/quick-pay') ? 'opacity-100' : 'opacity-0'} group-hover:opacity-100 transition-opacity duration-400 ease-in-out`} />
                    <Zap size={16} className={`relative z-10 transition-colors ${isActive('/quick-pay') ? 'text-white' : 'text-violet-600 group-hover:text-white'}`} />
                    <span className={`relative z-10 font-bold transition-colors ${isActive('/quick-pay') ? 'text-white' : 'text-violet-600 group-hover:text-white'}`}>{t('nav.quickPay')}</span>
                  </Link>
                  <Link to="/help" onClick={() => setIsOpen(false)} className="group relative px-4 py-2.5 text-sm rounded-xl border border-white/40 bg-white/40 backdrop-blur-md flex items-center gap-2 overflow-hidden transition-all duration-400">
                    <div className={`absolute inset-0 bg-gradient-to-r from-orange-500 to-red-500 ${isActive('/help') ? 'opacity-100' : 'opacity-0'} group-hover:opacity-100 transition-opacity duration-400 ease-in-out`} />
                    <HelpCircle size={16} className={`relative z-10 transition-colors ${isActive('/help') ? 'text-white' : 'group-hover:text-white'}`} />
                    <span className={`relative z-10 transition-colors ${isActive('/help') ? 'text-white' : 'group-hover:text-white'}`}>{t('nav.help')}</span>
                  </Link>

                  <a href="#" onClick={() => setIsOpen(false)} className="group relative px-4 py-2.5 text-sm rounded-xl border border-white/40 bg-white/40 backdrop-blur-md overflow-hidden transition-all duration-400 inline-block">
                    <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 to-blue-500 opacity-0 group-hover:opacity-100 transition-opacity duration-400 ease-in-out" />
                    <span className="relative z-10 transition-colors group-hover:text-white">{t('nav.getReceipt')}</span>
                  </a>
                  <Link to="/contact" onClick={() => setIsOpen(false)} className="group relative px-4 py-2.5 text-sm rounded-xl border border-white/40 bg-white/40 backdrop-blur-md overflow-hidden transition-all duration-400 flex items-center gap-2">
                    <div className="absolute inset-0 bg-gradient-to-r from-emerald-600 to-teal-700 opacity-0 group-hover:opacity-100 transition-opacity duration-400 ease-in-out" />
                    <span className="relative z-10 transition-colors group-hover:text-white">{t('nav.contactUs')}</span>
                  </Link>
                </>
              ) : (
                <>
                  <Link to="/dashboard" onClick={() => setIsOpen(false)} className="group relative px-4 py-2.5 text-sm rounded-xl border border-white/40 bg-white/40 backdrop-blur-md flex items-center gap-2 overflow-hidden transition-all duration-400">
                    <div className={`absolute inset-0 bg-gradient-to-r from-blue-500 to-indigo-600 ${isActive('/dashboard') ? 'opacity-100' : 'opacity-0'} group-hover:opacity-100 transition-opacity duration-400 ease-in-out`} />
                    <LayoutDashboard size={16} className={`relative z-10 transition-colors ${isActive('/dashboard') ? 'text-white' : 'group-hover:text-white'}`} />
                    <span className={`relative z-10 transition-colors ${isActive('/dashboard') ? 'text-white' : 'group-hover:text-white'}`}>{t('nav.dashboard')}</span>
                  </Link>
                  <Link to="/my-services" onClick={() => setIsOpen(false)} className="group relative px-4 py-2.5 text-sm rounded-xl border border-white/40 bg-white/40 backdrop-blur-md flex items-center gap-2 overflow-hidden transition-all duration-400">
                    <div className={`absolute inset-0 bg-gradient-to-r from-purple-500 to-violet-600 ${isActive('/my-services') ? 'opacity-100' : 'opacity-0'} group-hover:opacity-100 transition-opacity duration-400 ease-in-out`} />
                    <Layers size={16} className={`relative z-10 transition-colors ${isActive('/my-services') ? 'text-white' : 'group-hover:text-white'}`} />
                    <span className={`relative z-10 transition-colors ${isActive('/my-services') ? 'text-white' : 'group-hover:text-white'}`}>{t('nav.myServices')}</span>
                  </Link>
                  <Link to="/services" onClick={() => setIsOpen(false)} className="group relative px-4 py-2.5 text-sm rounded-xl border border-white/40 bg-white/40 backdrop-blur-md flex items-center gap-2 overflow-hidden transition-all duration-400">
                    <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-pink-600 opacity-0 group-hover:opacity-100 transition-opacity duration-400 ease-in-out" />
                    <Layers size={16} className="relative z-10 transition-colors group-hover:text-white" />
                    <span className="relative z-10 transition-colors group-hover:text-white">{t('nav.servicesOffered')}</span>
                  </Link>
                  <Link to="/quick-pay" onClick={() => setIsOpen(false)} className="group relative px-4 py-2.5 text-sm rounded-xl border border-white/40 bg-white/40 backdrop-blur-md flex items-center gap-2 overflow-hidden transition-all duration-400">
                    <div className={`absolute inset-0 bg-gradient-to-r from-violet-500 to-purple-600 ${isActive('/quick-pay') ? 'opacity-100' : 'opacity-0'} group-hover:opacity-100 transition-opacity duration-400 ease-in-out`} />
                    <Zap size={16} className={`relative z-10 transition-colors ${isActive('/quick-pay') ? 'text-white' : 'text-violet-600 group-hover:text-white'}`} />
                    <span className={`relative z-10 font-bold transition-colors ${isActive('/quick-pay') ? 'text-white' : 'text-violet-600 group-hover:text-white'}`}>{t('nav.quickPay')}</span>
                  </Link>
                  <Link to="/help" onClick={() => setIsOpen(false)} className="group relative px-4 py-2.5 text-sm rounded-xl border border-white/40 bg-white/40 backdrop-blur-md flex items-center gap-2 overflow-hidden transition-all duration-400">
                    <div className={`absolute inset-0 bg-gradient-to-r from-orange-500 to-red-500 ${isActive('/help') ? 'opacity-100' : 'opacity-0'} group-hover:opacity-100 transition-opacity duration-400 ease-in-out`} />
                    <HelpCircle size={16} className={`relative z-10 transition-colors ${isActive('/help') ? 'text-white' : 'group-hover:text-white'}`} />
                    <span className={`relative z-10 transition-colors ${isActive('/help') ? 'text-white' : 'group-hover:text-white'}`}>{t('nav.help')}</span>
                  </Link>
                  <Link to="/account" onClick={() => setIsOpen(false)} className="group relative px-4 py-2.5 text-sm rounded-xl border border-white/40 bg-white/40 backdrop-blur-md flex items-center gap-2 overflow-hidden transition-all duration-400">
                    <div className={`absolute inset-0 bg-gradient-to-r from-blue-500 to-indigo-600 ${isActive('/account') ? 'opacity-100' : 'opacity-0'} group-hover:opacity-100 transition-opacity duration-400 ease-in-out`} />
                    <User size={16} className={`relative z-10 transition-colors ${isActive('/account') ? 'text-white' : 'group-hover:text-white'}`} />
                    <span className={`relative z-10 transition-colors ${isActive('/account') ? 'text-white' : 'group-hover:text-white'}`}>{t('nav.myAccount')}</span>
                  </Link>
                  <Link to="/contact" onClick={() => setIsOpen(false)} className="group relative px-4 py-2.5 text-sm rounded-xl border border-white/40 bg-white/40 backdrop-blur-md overflow-hidden transition-all duration-400 flex items-center gap-2">
                    <div className="absolute inset-0 bg-gradient-to-r from-emerald-600 to-teal-700 opacity-0 group-hover:opacity-100 transition-opacity duration-400 ease-in-out" />
                    <span className="relative z-10 transition-colors group-hover:text-white">{t('nav.contactUs')}</span>
                  </Link>
                  <button onClick={handleLogout} className="group relative px-4 py-2.5 text-sm rounded-xl border border-white/40 bg-white/40 backdrop-blur-md font-bold transition-all duration-400 flex items-center gap-2 overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-r from-red-700 to-rose-900 opacity-0 group-hover:opacity-100 transition-opacity duration-400 ease-in-out" />
                    <LogOut size={16} className="relative z-10 transition-colors group-hover:text-white" />
                    <span className="relative z-10 transition-colors group-hover:text-white">{t('nav.logout')}</span>
                  </button>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default NavBar;
