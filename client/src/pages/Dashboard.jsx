import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import TopBar from '../components/common/TopBar';
import NavBar from '../components/common/NavBar';
import AnimatedBackground from '../components/common/AnimatedBackground';
import Footer from '../components/common/Footer';
import { useLanguage } from '../context/LanguageContext.jsx';
import { User, Mail, Phone, MapPin, Calendar, Zap, FileText, CreditCard, Bell } from 'lucide-react';

const Dashboard = () => {
    const { user } = useAuth();
    const { t } = useLanguage();
    const navigate = useNavigate();


    const quickActions = [
        {
            icon: Zap,
            label: t('dashboard.payBills'),
            description: t('dashboard.payBillsDesc'),
            color: 'green',
            route: '/services'
        },
        {
            icon: FileText,
            label: t('dashboard.newConnection'),
            description: t('dashboard.newConnectionDesc'),
            color: 'blue',
            route: '/services/electricity/new-connection'
        },
        {
            icon: CreditCard,
            label: t('dashboard.viewBills'),
            description: t('dashboard.viewBillsDesc'),
            color: 'purple',
            route: '/services/electricity/billing'
        },
        {
            icon: Bell,
            label: t('dashboard.complaints'),
            description: t('dashboard.complaintsDesc'),
            color: 'orange',
            route: '/services/grievance'
        },
        {
            icon: User,
            label: t('dashboard.updateProfile'),
            description: t('account.updateProfile'),
            color: 'indigo',
            route: '/account'
        },
    ];

    return (
        <div className="min-h-screen flex flex-col">
            <TopBar />

            {/* Animated Background Bubbles & Waves */}
            <AnimatedBackground />

            <div id="search-tour-step" className="relative z-10">
                <NavBar />
            </div>

            {/* Dashboard Content */}
            <main className="flex-1 px-4 sm:px-6 lg:px-8 py-12 relative z-10">
                <div className="max-w-7xl mx-auto">

                    {/* Enhanced Dashboard Header - Aesthetic */}
                    <section className="relative w-full pt-8 pb-10 px-8 mb-8 overflow-hidden bg-gradient-to-br from-green-900 via-emerald-800 to-green-900 shadow-2xl rounded-3xl">
                        {/* Sophisticated Mesh Background Pattern */}
                        <div className="absolute inset-0 opacity-[0.25]">
                            <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
                                <defs>
                                    <pattern id="grid-dashboard" width="40" height="40" patternUnits="userSpaceOnUse">
                                        <circle cx="20" cy="20" r="1" fill="white" opacity="0.4" />
                                        <circle cx="0" cy="0" r="1" fill="white" opacity="0.3" />
                                        <circle cx="40" cy="40" r="1" fill="white" opacity="0.3" />
                                    </pattern>
                                </defs>
                                <rect width="100%" height="100%" fill="url(#grid-dashboard)" />
                            </svg>
                        </div>

                        {/* Elegant Gradient Orbs */}
                        <div className="absolute top-0 right-0 w-80 h-80 bg-gradient-to-br from-green-400/30 to-emerald-500/30 rounded-full blur-3xl transform translate-x-1/3 -translate-y-1/3" />
                        <div className="absolute bottom-0 left-0 w-64 h-64 bg-gradient-to-tr from-teal-400/25 to-green-500/25 rounded-full blur-3xl transform -translate-x-1/3 translate-y-1/3" />

                        {/* Subtle Icon Watermark */}
                        <div className="absolute top-0 right-0 p-12 opacity-[0.07] transform translate-x-1/4 -translate-y-1/4">
                            <User size={180} className="text-white" />
                        </div>

                        {/* Sparkle Effects */}
                        <div className="absolute top-8 left-1/4 w-2 h-2 bg-white rounded-full animate-pulse opacity-60" />
                        <div className="absolute top-16 right-1/3 w-1.5 h-1.5 bg-green-200 rounded-full animate-pulse opacity-50" style={{ animationDelay: '0.5s' }} />
                        <div className="absolute bottom-12 left-1/3 w-1 h-1 bg-emerald-100 rounded-full animate-pulse opacity-70" style={{ animationDelay: '1s' }} />
                        <div className="absolute bottom-20 right-1/4 w-2 h-2 bg-white rounded-full animate-pulse opacity-40" style={{ animationDelay: '1.5s' }} />

                        {/* Decorative Line Accent */}
                        <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-green-400/30 to-transparent" />

                        <div className="relative z-10">
                            <div className="flex items-center gap-4 mb-4">
                                <div className="w-16 h-16 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center border-2 border-white/30 shadow-lg">
                                    <User size={32} className="text-white" />
                                </div>
                                <div>
                                    <h1 className="text-3xl md:text-4xl font-extrabold text-white mb-1 tracking-tight">
                                        {t('dashboard.welcome')}, {user?.name || 'User'}!
                                    </h1>
                                    <p className="text-green-100 text-lg font-medium">{t('dashboard.manageEase')}</p>
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* User Info Cards */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                        <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow border border-gray-100">
                            <div className="flex items-center gap-3 mb-2">
                                <Mail size={20} className="text-green-600" />
                                <h3 className="font-semibold text-gray-900">{t('auth.email')}</h3>
                            </div>
                            <p className="text-sm text-gray-600">{user?.email}</p>
                        </div>

                        <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow border border-gray-100">
                            <div className="flex items-center gap-3 mb-2">
                                <Phone size={20} className="text-blue-600" />
                                <h3 className="font-semibold text-gray-900">{t('auth.mobile')}</h3>
                            </div>
                            <p className="text-sm text-gray-600">{user?.phone}</p>
                        </div>

                        <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow border border-gray-100">
                            <div className="flex items-center gap-3 mb-2">
                                <MapPin size={20} className="text-purple-600" />
                                <h3 className="font-semibold text-gray-900">{t('account.address')}</h3>
                            </div>
                            <p className="text-sm text-gray-600">{user?.address}</p>
                        </div>

                        <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow border border-gray-100">
                            <div className="flex items-center gap-3 mb-2">
                                <Calendar size={20} className="text-orange-600" />
                                <h3 className="font-semibold text-gray-900">{t('dashboard.memberSince')}</h3>
                            </div>
                            <p className="text-sm text-gray-600">
                                {user?.createdAt ? new Date(user.createdAt).toLocaleDateString('en-IN', {
                                    year: 'numeric',
                                    month: 'long',
                                    day: 'numeric'
                                }) : 'N/A'}
                            </p>
                        </div>
                    </div>

                    {/* Quick Actions */}
                    <div className="bg-white rounded-3xl p-8 shadow-2xl border border-gray-100">
                        <h2 className="text-2xl font-bold text-gray-900 mb-6">{t('dashboard.quickActions')}</h2>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                            {quickActions.map((action, index) => {
                                const Icon = action.icon;
                                return (
                                    <button
                                        key={index}
                                        onClick={() => navigate(action.route)}
                                        className={`group p-6 rounded-2xl border-2 border-${action.color}-200 hover:border-${action.color}-400 bg-${action.color}-50 hover:bg-${action.color}-100 transition-colors text-left`}
                                    >
                                        <div className={`w-12 h-12 bg-gradient-to-br from-${action.color}-500 to-${action.color}-600 rounded-xl flex items-center justify-center mb-3 group-hover:shadow-lg transition-shadow shadow-md`}>
                                            <Icon size={24} className="text-white" />
                                        </div>
                                        <h3 className="font-bold text-gray-900 mb-2">{action.label}</h3>
                                        <p className="text-sm text-gray-600 leading-relaxed">{action.description}</p>
                                    </button>
                                );
                            })}
                        </div>
                    </div>

                    {/* Services Overview */}
                    <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl p-6 text-white shadow-xl">
                            <h3 className="text-lg font-bold mb-2">{t('dashboard.activeServices')}</h3>
                            <p className="text-4xl font-bold">3</p>
                            <p className="text-sm text-blue-100 mt-2">{t('dashboard.userServices')}</p>
                        </div>

                        <div className="bg-gradient-to-br from-green-500 to-green-600 rounded-2xl p-6 text-white shadow-xl">
                            <h3 className="text-lg font-bold mb-2">{t('dashboard.pendingPayments')}</h3>
                            <p className="text-4xl font-bold">₹2,450</p>
                            <p className="text-sm text-green-100 mt-2">{t('dashboard.dueIn')}</p>
                        </div>

                        <div className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-2xl p-6 text-white shadow-xl">
                            <h3 className="text-lg font-bold mb-2">{t('dashboard.recentComplaints')}</h3>
                            <p className="text-4xl font-bold">1</p>
                            <p className="text-sm text-purple-100 mt-2">{t('dashboard.inProgress')}</p>
                        </div>
                    </div>

                </div>
            </main>

            <Footer />
        </div>
    );
};

export default Dashboard;
