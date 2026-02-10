import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import TopBar from '../components/common/TopBar';
import NavBar from '../components/common/NavBar';
import AnimatedBackground from '../components/common/AnimatedBackground';
import Footer from '../components/common/Footer';
import { useLanguage } from '../context/LanguageContext.jsx';
import PageHeader from '../components/common/PageHeader';
import {
    LayoutDashboard,
    User,
    Mail,
    Phone,
    MapPin,
    Calendar,
    ArrowRight,
    Search,
    Bell,
    Settings,
    ShieldCheck,
    CreditCard,
    Zap,
    Droplet,
    Flame,
    FileText,
    AlertTriangle
} from 'lucide-react';

const Dashboard = () => {
    const { user } = useAuth()
    const { t } = useLanguage()
    const navigate = useNavigate()

    const getMissingFields = () => {
        const fields = []
        if (!user?.village) fields.push('Village')
        if (!user?.subDistrict) fields.push('Sub District/City')
        if (!user?.pincode) fields.push('PIN Code')
        if (!user?.state) fields.push('State')
        if (!user?.district) fields.push('District')
        return fields
    }

    const missingFields = getMissingFields()
    const isAddressComplete = missingFields.length === 0


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
            <main className="flex-1 pb-12 relative z-10">
                <PageHeader
                    title={`${t('dashboard.welcome')}, ${user?.name || 'User'}!`}
                    description={t('dashboard.manageEase')}
                    icon={LayoutDashboard}
                    watermarkIcon={User}
                    to={null}
                    backText={null}
                    gradient="bg-gradient-to-br from-green-900 via-emerald-800 to-green-900"
                    stripeColor="via-green-400/30"
                    orb1Color="from-green-400/30 to-emerald-500/30"
                    orb2Color="from-teal-400/25 to-green-500/25"
                />

                <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 mt-8">
                    {/* Profile Completeness Alert */}
                    {!isAddressComplete && (
                        <div className="mb-8 bg-gradient-to-r from-amber-500/10 to-orange-500/10 border border-amber-200 rounded-3xl p-6 sm:p-8 backdrop-blur-md flex flex-col md:flex-row items-center justify-between gap-6 animate-in fade-in slide-in-from-top-4 duration-500">
                            <div className="flex items-start gap-4 text-center md:text-left">
                                <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center text-amber-600 shadow-sm shrink-0">
                                    <AlertTriangle size={32} />
                                </div>
                                <div>
                                    <h3 className="text-xl font-bold text-slate-900 mb-1">
                                        Update Your Address
                                    </h3>
                                    <p className="text-slate-600 text-sm max-w-xl">
                                        Your profile address is incomplete. Please provide your {missingFields.join(', ')} to help us serve you better.
                                    </p>
                                </div>
                            </div>
                            <button
                                onClick={() => navigate('/account')}
                                className="w-full md:w-auto px-8 py-4 bg-amber-600 text-white rounded-2xl font-bold text-sm shadow-xl shadow-amber-600/20 hover:bg-amber-700 active:scale-95 transition-all flex items-center justify-center gap-2 group whitespace-nowrap"
                            >
                                <Settings size={18} className="group-hover:rotate-90 transition-transform duration-500" />
                                {t('account.updateProfile')}
                                <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                            </button>
                        </div>
                    )}

                    {/* User Info Cards */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                        <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow border border-gray-100">
                            <div className="flex items-center gap-3 mb-2">
                                <Mail size={20} className="text-green-600" />
                                <h3 className="font-semibold text-gray-900">{t('auth.email')}</h3>
                            </div>
                            <p className="text-sm text-gray-600 truncate">{user?.email}</p>
                        </div>

                        <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow border border-gray-100">
                            <div className="flex items-center gap-3 mb-2">
                                <Phone size={20} className="text-blue-600" />
                                <h3 className="font-semibold text-gray-900">{t('auth.mobile')}</h3>
                            </div>
                            <p className="text-sm text-gray-600">{user?.phone || 'N/A'}</p>
                        </div>

                        <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow border border-gray-100">
                            <div className="flex items-center gap-3 mb-2">
                                <MapPin size={20} className="text-purple-600" />
                                <h3 className="font-semibold text-gray-900">{t('account.address')}</h3>
                            </div>
                            <p className="text-sm text-gray-600 truncate">
                                {[user?.village, user?.subDistrict, user?.district, user?.state, user?.pincode].filter(Boolean).join(', ') || 'Incomplete'}
                            </p>
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
