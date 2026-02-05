import React from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Twitter, Instagram, Linkedin, Mail, Phone, MapPin, ChevronRight, Globe, Shield, FileText } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';

const Footer = () => {
  const { t } = useLanguage();
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 text-white pt-16 pb-8 mt-12 border-t-8 border-green-600">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          {/* Brand Column */}
          <div className="space-y-6">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-white rounded-xl">
                <img src="https://upload.wikimedia.org/wikipedia/commons/5/55/Emblem_of_India.svg" alt="Emblem of India" className="h-16" />
              </div>
              <div>
                <h3 className="text-3xl font-bold bg-gradient-to-r from-orange-400 via-white to-green-400 bg-clip-text text-transparent">SUVIDHA</h3>
                <p className="text-base text-gray-400 font-medium">Government of India</p>
              </div>
            </div>
            <p className="text-gray-300 text-lg leading-relaxed">
              Empowering citizens with seamless access to municipal services. Digital India, Empowered India.
            </p>
          </div>

          {/* Quick Links - Large Touch Targets */}
          <div>
            <h4 className="text-xl font-bold mb-6 flex items-center gap-2 text-green-400">
              <ChevronRight size={24} /> {t('footer.quickLinks')}
            </h4>
            <div className="grid grid-cols-1 gap-4">
              <Link to="/" className="flex items-center gap-3 p-4 bg-gray-800 rounded-xl hover:bg-gray-700 transition border border-gray-700 hover:border-green-500 group">
                <ChevronRight size={20} className="text-gray-500 group-hover:text-green-400" />
                <span className="text-lg font-medium">{t('nav.home')}</span>
              </Link>
              <Link to="/about" className="flex items-center gap-3 p-4 bg-gray-800 rounded-xl hover:bg-gray-700 transition border border-gray-700 hover:border-green-500 group">
                <ChevronRight size={20} className="text-gray-500 group-hover:text-green-400" />
                <span className="text-lg font-medium">{t('nav.aboutUs')}</span>
              </Link>
              <Link to="/services" className="flex items-center gap-3 p-4 bg-gray-800 rounded-xl hover:bg-gray-700 transition border border-gray-700 hover:border-green-500 group">
                <ChevronRight size={20} className="text-gray-500 group-hover:text-green-400" />
                <span className="text-lg font-medium">{t('footer.services')}</span>
              </Link>
              <Link to="/sitemap" className="flex items-center gap-3 p-4 bg-gray-800 rounded-xl hover:bg-gray-700 transition border border-gray-700 hover:border-green-500 group">
                <ChevronRight size={20} className="text-gray-500 group-hover:text-green-400" />
                <span className="text-lg font-medium">{t('footer.sitemap')}</span>
              </Link>
            </div>
          </div>

          {/* Contact Info - Large Text */}
          <div className="col-span-1 md:col-span-2 lg:col-span-2">
            <h4 className="text-xl font-bold mb-6 flex items-center gap-2 text-green-400">
              <Phone size={24} /> {t('footer.contactUs')}
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-gray-800 p-6 rounded-2xl border border-gray-700">
                <div className="flex items-center gap-4 mb-2">
                  <div className="p-3 bg-green-900/50 rounded-full text-green-400"><Phone size={28} /></div>
                  <div>
                    <p className="text-sm text-gray-400">Toll Free Number</p>
                    <p className="text-2xl font-bold text-white">1800-000-SUVIDHA</p>
                  </div>
                </div>
              </div>
              <div className="bg-gray-800 p-6 rounded-2xl border border-gray-700">
                <div className="flex items-center gap-4 mb-2">
                  <div className="p-3 bg-blue-900/50 rounded-full text-blue-400"><Mail size={28} /></div>
                  <div>
                    <p className="text-sm text-gray-400">Email Support</p>
                    <p className="text-lg font-bold text-white break-all">support@suvidha.gov.in</p>
                  </div>
                </div>
              </div>
              <div className="bg-gray-800 p-6 rounded-2xl border border-gray-700 md:col-span-2">
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-red-900/50 rounded-full text-red-400"><MapPin size={28} /></div>
                  <div>
                    <p className="text-sm text-gray-400">Head Office</p>
                    <p className="text-lg font-bold text-white">Ministry of Housing and Urban Affairs,<br />Nirman Bhawan, New Delhi - 110011</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="border-t border-gray-800 pt-8 mt-8 flex flex-col md:flex-row justify-between items-center gap-6 text-center md:text-left">
          <p className="text-gray-400 text-base">
            © {currentYear} SUVIDHA. All rights reserved. An initiative by Govt of India.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link to="/privacy" className="px-6 py-3 bg-gray-800 rounded-lg text-gray-300 hover:text-white hover:bg-gray-700 transition text-sm font-semibold">Privacy Policy</Link>
            <Link to="/terms" className="px-6 py-3 bg-gray-800 rounded-lg text-gray-300 hover:text-white hover:bg-gray-700 transition text-sm font-semibold">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
