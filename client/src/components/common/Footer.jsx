import React from 'react';
import { Facebook, Twitter, Linkedin, Mail } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';

const Footer = () => {
  const { t } = useLanguage();
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
              {t('footer.aboutDesc')}
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
            <h3 className="font-bold text-base mb-4">{t('footer.services')}</h3>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-gray-400 hover:text-white transition text-sm">
                  {t('services.electricity')}
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-white transition text-sm">
                  {t('services.waterBill')}
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-white transition text-sm">
                  {t('services.gas')}
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-white transition text-sm">
                  {t('services.municipal')}
                </a>
              </li>
            </ul>
          </div>

          {/* Help & Support */}
          <div>
            <h3 className="font-bold text-base mb-4">{t('footer.helpSupport')}</h3>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-gray-400 hover:text-white transition text-sm">
                  {t('footer.helpCenter')}
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-white transition text-sm">
                  {t('footer.faqs')}
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-white transition text-sm">
                  {t('footer.contact')}
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-white transition text-sm">
                  {t('footer.reportIssue')}
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="font-bold text-base mb-4">{t('nav.contact')}</h3>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start gap-2">
                <Mail size={16} className="shrink-0 mt-1 text-gray-400" />
                <a href="mailto:support@suvidha.gov" className="text-gray-400 hover:text-white transition">
                  support@suvidha.gov
                </a>
              </li>
              <li className="text-gray-400">
                {t('footer.tollFree')}: 1800-000-SUVIDHA
              </li>
              <li className="text-gray-400">
                {t('footer.workingHours')}
              </li>
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-gray-800 my-8"></div>

        {/* Bottom Section */}
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-gray-400 text-sm">
            © {currentYear} SUVIDHA. {t('footer.copyright').replace('© 2026 SUVIDHA. ', '')}
          </p>
          <div className="flex flex-wrap gap-4 sm:gap-6 text-sm">
            <a href="#" className="text-gray-400 hover:text-white transition">
              {t('footer.privacy')}
            </a>
            <a href="#" className="text-gray-400 hover:text-white transition">
              {t('footer.terms')}
            </a>
            <a href="#" className="text-gray-400 hover:text-white transition">
              {t('footer.accessibility')}
            </a>
            <a href="#" className="text-gray-400 hover:text-white transition">
              {t('footer.sitemap')}
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
