import React from 'react';
import { Map, Zap, Flame, Droplet, Trash2, MessageSquare, Building2, Phone, FileText, Shield, HelpCircle, CreditCard, LayoutDashboard, Settings, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import TopBar from '../components/common/TopBar';
import NavBar from '../components/common/NavBar';
import AnimatedBackground from '../components/common/AnimatedBackground';
import Footer from '../components/common/Footer';
import BackButton from '../components/common/BackButton';

const SiteMap = () => {
    const { t } = useLanguage();

    const siteStructure = [
        {
            category: 'Services',
            icon: LayoutDashboard,
            color: 'blue',
            links: [
                { name: 'All Services', path: '/services', icon: LayoutDashboard },
                { name: 'Electricity Services', path: '/services/electricity', icon: Zap },
                { name: 'Gas Services', path: '/services/gas', icon: Flame },
                { name: 'Water Services', path: '/services/water', icon: Droplet },
                { name: 'Waste Management', path: '/services/waste', icon: Trash2 },
                { name: 'Municipal Grievance', path: '/services/grievance', icon: MessageSquare },
                { name: 'Quick Pay', path: '/quick-pay', icon: CreditCard },
            ]
        },
        {
            category: 'Account & Dashboard',
            icon: Settings,
            color: 'purple',
            links: [
                { name: 'Dashboard', path: '/dashboard', icon: LayoutDashboard },
                { name: 'My Services', path: '/my-services', icon: FileText },
                { name: 'Account Settings', path: '/account', icon: Settings },
            ]
        },
        {
            category: 'Information',
            icon: Building2,
            color: 'indigo',
            links: [
                { name: 'About Us', path: '/about', icon: Building2 },
                { name: 'Contact Us', path: '/contact', icon: Phone },
                { name: 'Help Center', path: '/help', icon: HelpCircle },
            ]
        },
        {
            category: 'Legal',
            icon: Shield,
            color: 'emerald',
            links: [
                { name: 'Terms of Service', path: '/terms', icon: FileText },
                { name: 'Privacy Policy', path: '/privacy', icon: Shield },
            ]
        }
    ];

    return (
        <div className="min-h-screen flex flex-col">
            <TopBar />
            <AnimatedBackground />
            <NavBar />

            {/* Page Header */}
            <section className="w-full pt-2 md:pt-3 pb-4 md:pb-5 px-3 sm:px-6 bg-gradient-to-br from-indigo-900 via-purple-800 to-indigo-900 shadow-2xl relative overflow-hidden">
                <div className="absolute inset-0 opacity-[0.25]">
                    <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
                        <defs>
                            <pattern id="grid-sitemap" width="40" height="40" patternUnits="userSpaceOnUse">
                                <circle cx="20" cy="20" r="1" fill="white" opacity="0.4" />
                                <circle cx="0" cy="0" r="1" fill="white" opacity="0.3" />
                                <circle cx="40" cy="40" r="1" fill="white" opacity="0.3" />
                            </pattern>
                        </defs>
                        <rect width="100%" height="100%" fill="url(#grid-sitemap)" />
                    </svg>
                </div>

                <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-indigo-400/15 to-purple-500/15 rounded-full blur-3xl transform translate-x-1/3 -translate-y-1/3" />
                <div className="absolute bottom-0 left-0 w-80 h-80 bg-gradient-to-tr from-purple-400/10 to-indigo-500/10 rounded-full blur-3xl transform -translate-x-1/3 translate-y-1/3" />

                <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-indigo-400/30 to-transparent" />

                <div className="max-w-7xl mx-auto relative z-10">
                    <BackButton
                        to="/"
                        text={t('common.back')}
                        className="mb-6 scale-90 origin-left !bg-white/10 !text-white !border-white/20 hover:!bg-white/20"
                    />
                    <div className="flex items-center gap-4">
                        <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-xl bg-white/20 backdrop-blur-sm flex items-center justify-center border-2 border-white/30">
                            <Map size={32} className="text-white" />
                        </div>
                        <div>
                            <h1 className="text-2xl sm:text-3xl font-bold text-white tracking-wide uppercase">Site Map</h1>
                            <p className="text-indigo-50 text-sm sm:text-base mt-1 font-medium">Navigate to any page on SUVIDHA</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Content */}
            <section className="py-6 sm:py-10 px-3 sm:px-6">
                <div className="max-w-7xl mx-auto space-y-8">

                    {siteStructure.map((section, index) => {
                        const CategoryIcon = section.icon;

                        return (
                            <div key={index} className="bg-white rounded-xl shadow-md border-2 border-gray-200 overflow-hidden">
                                <div className={`bg-${section.color}-50 px-6 py-4 border-b-2 border-${section.color}-200`}>
                                    <div className="flex items-center gap-3">
                                        <div className={`w-10 h-10 rounded-lg bg-white border-2 border-${section.color}-200 flex items-center justify-center`}>
                                            <CategoryIcon size={20} className={`text-${section.color}-600`} />
                                        </div>
                                        <h2 className="text-xl font-bold text-gray-900">{section.category}</h2>
                                    </div>
                                </div>

                                <div className="p-6">
                                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                                        {section.links.map((link, linkIndex) => {
                                            const LinkIcon = link.icon;

                                            return (
                                                <Link
                                                    key={linkIndex}
                                                    to={link.path}
                                                    className="group flex items-center gap-3 p-4 bg-gray-50 hover:bg-gray-100 rounded-lg transition-all border-2 border-transparent hover:border-gray-300"
                                                >
                                                    <div className={`w-10 h-10 rounded-lg bg-${section.color}-100 flex items-center justify-center group-hover:scale-110 transition-transform`}>
                                                        <LinkIcon size={20} className={`text-${section.color}-600`} />
                                                    </div>
                                                    <div className="flex-1">
                                                        <p className="font-semibold text-gray-900 group-hover:text-gray-700">{link.name}</p>
                                                        <p className="text-xs text-gray-500">{link.path}</p>
                                                    </div>
                                                    <ChevronRight size={18} className="text-gray-400 group-hover:text-gray-600 group-hover:translate-x-1 transition-all" />
                                                </Link>
                                            );
                                        })}
                                    </div>
                                </div>
                            </div>
                        );
                    })}

                    {/* Quick Access Info */}
                    <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border-2 border-blue-200 rounded-xl p-6">
                        <div className="flex items-start gap-4">
                            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center shrink-0">
                                <HelpCircle size={24} className="text-blue-600" />
                            </div>
                            <div>
                                <h3 className="text-lg font-bold text-gray-900 mb-2">Need Help Finding Something?</h3>
                                <p className="text-gray-700 mb-4">
                                    Can't find what you're looking for? Visit our Help Center or contact our support team for assistance.
                                </p>
                                <div className="flex gap-3">
                                    <Link
                                        to="/help"
                                        className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold text-sm transition-colors"
                                    >
                                        Help Center
                                    </Link>
                                    <Link
                                        to="/contact"
                                        className="px-4 py-2 bg-white hover:bg-gray-50 text-gray-700 border-2 border-gray-300 rounded-lg font-semibold text-sm transition-colors"
                                    >
                                        Contact Us
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </section>

            <Footer />
        </div>
    );
};

export default SiteMap;
