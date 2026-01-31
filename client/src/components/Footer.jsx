import React from 'react';
import { Facebook, Twitter, Linkedin, Mail } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-linear-to-b from-gray-900 to-black text-white">
      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12 mb-12">
          {/* About Section */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 bg-linear-to-br from-blue-600 to-indigo-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold">S</span>
              </div>
              <span className="font-bold text-lg">SUVIDHA</span>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed">
              One Platform for All Citizen Services. Making government services accessible to every citizen.
            </p>
            <div className="flex gap-3 mt-4">
              <button className="text-gray-400 hover:text-blue-400 transition">
                <Facebook size={20} />
              </button>
              <button className="text-gray-400 hover:text-blue-400 transition">
                <Twitter size={20} />
              </button>
              <button className="text-gray-400 hover:text-blue-400 transition">
                <Linkedin size={20} />
              </button>
            </div>
          </div>

          {/* Services Links */}
          <div>
            <h3 className="font-bold text-base mb-4">Services</h3>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-gray-400 hover:text-white transition text-sm">
                  Electricity Payment
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-white transition text-sm">
                  Water Bill
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-white transition text-sm">
                  Gas Connection
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-white transition text-sm">
                  Municipal Services
                </a>
              </li>
            </ul>
          </div>

          {/* Help & Support */}
          <div>
            <h3 className="font-bold text-base mb-4">Help & Support</h3>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-gray-400 hover:text-white transition text-sm">
                  Help Center
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-white transition text-sm">
                  FAQs
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-white transition text-sm">
                  Contact Us
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-white transition text-sm">
                  Report Issue
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="font-bold text-base mb-4">Contact</h3>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start gap-2">
                <Mail size={16} className="shrink-0 mt-1 text-gray-400" />
                <a href="mailto:support@suvidha.gov" className="text-gray-400 hover:text-white transition">
                  support@suvidha.gov
                </a>
              </li>
              <li className="text-gray-400">
                Toll Free: 1800-000-SUVIDHA
              </li>
              <li className="text-gray-400">
                Mon-Fri: 9 AM - 6 PM IST
              </li>
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-gray-800 my-8"></div>

        {/* Bottom Section */}
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-gray-400 text-sm">
            © {currentYear} SUVIDHA. All rights reserved.
          </p>
          <div className="flex flex-wrap gap-4 sm:gap-6 text-sm">
            <a href="#" className="text-gray-400 hover:text-white transition">
              Privacy Policy
            </a>
            <a href="#" className="text-gray-400 hover:text-white transition">
              Terms & Conditions
            </a>
            <a href="#" className="text-gray-400 hover:text-white transition">
              Accessibility
            </a>
            <a href="#" className="text-gray-400 hover:text-white transition">
              Sitemap
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
