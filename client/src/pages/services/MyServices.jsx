import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Layers, Zap, Droplet, Flame, ArrowRight, Clock, CheckCircle, AlertCircle } from 'lucide-react';
import TopBar from '../../components/common/TopBar';
import NavBar from '../../components/common/NavBar';
import AnimatedBackground from '../../components/common/AnimatedBackground';
import Footer from '../../components/common/Footer';
import PageHeader from '../../components/common/PageHeader';
import { useLanguage } from '../../context/LanguageContext.jsx';
import BackButton from '../../components/common/BackButton';

const MyServices = () => {
    const { t } = useLanguage();
    const navigate = useNavigate();

    const activeServices = [
        {
            id: 'ELEC-12345',
            type: 'Electricity',
            icon: Zap,
            status: 'Active',
            statusColor: 'green',
            lastBill: '₹1,240',
            dueDate: 'Oct 15, 2024',
            provider: 'State Electricity Board'
        },
        {
            id: 'WATR-98765',
            type: 'Water Supply',
            icon: Droplet,
            status: 'Active',
            statusColor: 'green',
            lastBill: '₹450',
            dueDate: 'Oct 20, 2024',
            provider: 'Municipal Water Authority'
        }
    ];

    const pendingApplications = [
        {
            id: 'GAS-APP-7788',
            type: 'New Gas Connection',
            icon: Flame,
            status: 'Verifying Documents',
            statusColor: 'orange',
            appliedOn: 'Sep 25, 2024',
            progress: 40
        }
    ];

    return (
        <div className="min-h-screen flex flex-col">
            <TopBar />
            <AnimatedBackground />
            <div id="search-tour-step">
                <NavBar />
            </div>

            <main className="grow relative z-10 pb-12">
                {/* Standardized Header */}
                <PageHeader
                    title={t('nav.myServices')}
                    description={t('nav.myServicesDesc')}
                    to="/dashboard"
                    icon={Layers}
                    watermarkIcon={Layers}
                    gradient="bg-gradient-to-br from-purple-900 via-indigo-800 to-purple-900"
                    stripeColor="via-purple-400/30"
                    orb1Color="from-purple-400/30 to-indigo-500/30"
                    orb2Color="from-indigo-400/25 to-purple-500/25"
                />

                <div className="max-w-[1440px] mx-auto mt-8">

                    <div className="px-4 sm:px-6 lg:px-8 space-y-12">

                        <div className="space-y-12">
                            {/* Active Services */}
                            <section>
                                <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                                    <CheckCircle className="text-green-600" size={24} />
                                    Active Subscriptions
                                </h2>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    {activeServices.map((service) => {
                                        const Icon = service.icon;
                                        return (
                                            <div key={service.id} className="bg-white rounded-3xl p-6 shadow-xl border border-gray-100 hover:shadow-2xl transition-all group">
                                                <div className="flex items-start justify-between mb-6">
                                                    <div className="flex items-center gap-4">
                                                        <div className="w-14 h-14 bg-gray-50 rounded-2xl flex items-center justify-center group-hover:bg-green-50 transition-colors">
                                                            <Icon size={28} className="text-green-600" />
                                                        </div>
                                                        <div>
                                                            <h3 className="text-lg font-bold text-gray-900">{service.type}</h3>
                                                            <p className="text-xs font-mono text-gray-500 uppercase tracking-tighter">ID: {service.id}</p>
                                                        </div>
                                                    </div>
                                                    <span className="px-3 py-1 bg-green-100 text-green-700 text-xs font-bold rounded-full uppercase tracking-widest">
                                                        {service.status}
                                                    </span>
                                                </div>

                                                <div className="grid grid-cols-2 gap-4 mb-6">
                                                    <div className="p-3 bg-gray-50 rounded-2xl">
                                                        <p className="text-[10px] font-bold text-gray-400 uppercase mb-1">Last Bill</p>
                                                        <p className="text-lg font-bold text-gray-900">{service.lastBill}</p>
                                                    </div>
                                                    <div className="p-3 bg-gray-50 rounded-2xl">
                                                        <p className="text-[10px] font-bold text-gray-400 uppercase mb-1">Due Date</p>
                                                        <p className="text-sm font-bold text-red-600">{service.dueDate}</p>
                                                    </div>
                                                </div>

                                                <button
                                                    onClick={() => {
                                                        if (service.type === 'Electricity') navigate('/services/electricity/billing');
                                                        else if (service.type === 'Water Supply') navigate('/services/water/billing');
                                                    }}
                                                    className="w-full py-3 bg-gray-900 text-white rounded-xl font-bold text-sm hover:bg-gray-800 transition-colors flex items-center justify-center gap-2 shadow-lg shadow-gray-200 hover:shadow-gray-300"
                                                >
                                                    View Details
                                                    <ArrowRight size={16} />
                                                </button>
                                            </div>
                                        );
                                    })}
                                </div>
                            </section>

                            {/* In Progress Applications */}
                            <section>
                                <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                                    <Clock className="text-orange-600" size={24} />
                                    Ongoing Applications
                                </h2>
                                <div className="grid grid-cols-1 gap-6">
                                    {pendingApplications.map((app) => (
                                        <div key={app.id} className="bg-white rounded-3xl p-6 shadow-xl border border-gray-100 relative overflow-hidden">
                                            <div className="absolute top-0 right-0 p-6 opacity-10">
                                                <app.icon size={80} />
                                            </div>
                                            <div className="relative z-10">
                                                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
                                                    <div>
                                                        <h3 className="text-xl font-bold text-gray-900 mb-1">{app.type}</h3>
                                                        <div className="flex items-center gap-3">
                                                            <span className="text-xs font-mono text-gray-500 uppercase tracking-tighter">APP NO: {app.id}</span>
                                                            <span className="w-1 h-1 bg-gray-300 rounded-full" />
                                                            <span className="text-xs font-medium text-gray-500 italic">Applied on {app.appliedOn}</span>
                                                        </div>
                                                    </div>
                                                    <div className="flex items-center gap-2 px-4 py-2 bg-orange-50 text-orange-700 font-bold text-xs rounded-xl border border-orange-100">
                                                        <AlertCircle size={14} />
                                                        {app.status}
                                                    </div>
                                                </div>

                                                <div className="mb-2 flex justify-between items-end">
                                                    <span className="text-xs font-bold text-gray-700 uppercase">Processing Progress</span>
                                                    <span className="text-sm font-bold text-green-600">{app.progress}%</span>
                                                </div>
                                                <div className="w-full h-3 bg-gray-100 rounded-full overflow-hidden mb-6">
                                                    <div
                                                        className="h-full bg-gradient-to-r from-green-500 to-emerald-600 transition-all duration-1000"
                                                        style={{ width: `${app.progress}%` }}
                                                    />
                                                </div>

                                                <div className="flex flex-col sm:flex-row gap-3">
                                                    <button className="flex-1 py-3 border-2 border-gray-200 text-gray-700 rounded-xl font-bold text-sm hover:bg-gray-50 transition-colors">
                                                        Track Status
                                                    </button>
                                                    <button className="flex-1 py-3 border-2 border-gray-200 text-gray-700 rounded-xl font-bold text-sm hover:bg-gray-50 transition-colors">
                                                        Upload Missing Documents
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </section>
                        </div>
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    );
};

export default MyServices;
