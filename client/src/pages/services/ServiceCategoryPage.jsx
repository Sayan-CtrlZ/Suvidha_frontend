
import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
    ClipboardList, Info, ChevronRight,
    FileText, History, PlusCircle, ArrowUpRight
} from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';
import TopBar from '../../components/common/TopBar';
import NavBar from '../../components/common/NavBar';
import AnimatedBackground from '../../components/common/AnimatedBackground';
import Footer from '../../components/common/Footer';

import PageHeader from '../../components/common/PageHeader';
import GasServiceForm from '../../components/forms/GasServiceForm';
import WaterServiceForm from '../../components/forms/WaterServiceForm';

const ServiceCategoryPage = () => {
    const { serviceType, categoryId } = useParams();
    const navigate = useNavigate();
    const { t } = useLanguage();
    const [selectedAction, setSelectedAction] = useState(null);

    // Helper to format service name (e.g. 'gas' -> 'Gas')
    const formattedServiceType = serviceType.charAt(0).toUpperCase() + serviceType.slice(1);

    // Configuration for all categories and their actions
    const categoryConfig = {
        // GAS Categories
        gas: {
            billing: {
                title: 'Gas Bill & Payment',
                icon: CreditCard,
                description: 'Manage your gas bills, payments and receipts',
                color: 'blue',
                actions: [
                    { name: 'View Bill', icon: FileText, desc: 'View your latest gas bill details' },
                    { name: 'Pay Bill', icon: CreditCard, desc: 'Make a secure online payment' },
                    { name: 'Payment History', icon: History, desc: 'Check your past transactions' },
                    { name: 'Download Receipt', icon: FileText, desc: 'Download payment receipts' }
                ]
            },
            connection: {
                title: 'Connection Services',
                icon: Flame,
                description: 'Apply for new connections or manage existing ones',
                color: 'green',
                actions: [
                    { name: 'Apply New Connection', icon: PlusCircle, desc: 'Request a new LPG/PNG connection' },
                    { name: 'Transfer Connection', icon: ArrowUpRight, desc: 'Transfer connection to new address' },
                ]
            },
            cylinder: {
                title: 'Cylinder Booking',
                icon: Droplet,
                description: 'Manage cylinder bookings and delivery',
                color: 'orange',
                actions: [
                    { name: 'Book Cylinder', icon: Flame, desc: 'Book a refill cylinder' },
                    { name: 'Track Booking', icon: History, desc: 'Track delivery status' },
                    { name: 'Missed Delivery', icon: AlertTriangle, desc: 'Report missed delivery attempt' }
                ]
            },
            complaint: {
                title: 'Complaints & Support',
                icon: ClipboardList,
                description: 'Register complaints and track resolution',
                color: 'purple',
                actions: [
                    { name: 'Gas Leakage', icon: AlertTriangle, desc: 'Report suspected gas leak', isEmergency: true },
                    { name: 'Low Pressure', icon: Gauge, desc: 'Report low gas pressure' },
                    { name: 'Billing Dispute', icon: FileText, desc: 'Raise issue regarding bill amount' },
                    { name: 'General Inquiry', icon: Info, desc: 'Other questions or support' }
                ]
            }
        },
        // WATER Categories
        water: {
            billing: {
                title: 'Water Bill & Payment',
                icon: CreditCard,
                description: 'Manage water bills and payments',
                color: 'blue',
                actions: [
                    { name: 'View Water Bill', icon: FileText, desc: 'View latest bill summary' },
                    { name: 'Pay Water Bill', icon: CreditCard, desc: 'Pay pending dues' },
                    { name: 'Payment History', icon: History, desc: 'View past payments' },
                    { name: 'Download Receipt', icon: FileText, desc: 'Get payment receipts' }
                ]
            },
            connection: {
                title: 'Connection Services',
                icon: PlusCircle,
                description: 'Manage water supply connections',
                color: 'green',
                actions: [
                    { name: 'Apply New Connection', icon: PlusCircle, desc: 'Request new water connection' },
                    { name: 'Transfer Connection', icon: ArrowUpRight, desc: 'Relocate connection' },
                ]
            },
            complaint: {
                title: 'Complaints & Reporting',
                icon: ClipboardList,
                description: 'Report water supply issues',
                color: 'orange',
                actions: [
                    { name: 'REPORT WATER LEAKAGE', icon: AlertTriangle, desc: 'Report bursting or leaking pipes', isEmergency: true },
                    { name: 'No Water Supply', icon: Droplet, desc: 'Report outage' },
                    { name: 'Billing Complaint', icon: FileText, desc: 'Dispute bill amount' }
                ]
            }
        }
    };

    const currentCategory = categoryConfig[serviceType]?.[categoryId];

    // Fallback if category invalid
    if (!currentCategory) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-center">
                    <h2 className="text-2xl font-bold text-gray-800">Category Not Found</h2>
                    <button onClick={() => navigate(`/ services / ${serviceType} `)} className="mt-4 text-blue-600 hover:underline">
                        Go Back
                    </button>
                </div>
            </div>
        );
    }

    const Icon = currentCategory.icon;
    // Use a simpler alert logic
    const isEmergencyCategory = (serviceType === 'gas' && categoryId === 'complaint') || (serviceType === 'water' && categoryId === 'complaint');

    return (
        <div className="min-h-screen flex flex-col">
            <TopBar />
            <AnimatedBackground />
            <div id="search-tour-step">
                <NavBar />
            </div>

            {/* Header - Enhanced Aesthetic */}
            <PageHeader
                title={currentCategory.title}
                description={currentCategory.description}
                icon={Icon}
                watermarkIcon={Icon}
                to={`/ services / ${serviceType} `}
                gradient={serviceType === 'gas'
                    ? 'bg-gradient-to-br from-emerald-900 via-green-800 to-emerald-900'
                    : 'bg-gradient-to-br from-blue-900 via-sky-800 to-blue-900'}
                stripeColor={serviceType === 'gas' ? 'via-emerald-400/30' : 'via-blue-400/30'}
                orb1Color={serviceType === 'gas'
                    ? 'from-emerald-400/15 to-green-500/15'
                    : 'from-blue-400/15 to-sky-500/15'}
                orb2Color={serviceType === 'gas'
                    ? 'from-teal-400/10 to-emerald-500/10'
                    : 'from-cyan-400/10 to-blue-500/10'}
            />

            {/* Action Cards Grid */}
            <section className="py-10 px-6 mb-auto">
                <div className="max-w-7xl mx-auto">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
                        {currentCategory.actions.map((action, idx) => {
                            const ActionIcon = action.icon;
                            return (
                                <button
                                    key={idx}
                                    onClick={() => setSelectedAction({ category: categoryId, action: action.name })}
                                    className={`group relative p - 6 bg - white rounded - 2xl border - 2 text - left transition - colors ${action.isEmergency
                                            ? 'border-red-100 hover:border-red-300 ring-4 ring-red-50'
                                            : 'border-gray-100 hover:border-blue-200'
                                        } `}
                                >
                                    <div className={`w - 12 h - 12 rounded - xl flex items - center justify - center mb - 4 transition - colors ${action.isEmergency ? 'bg-red-100 text-red-600' : 'bg-gray-100 text-gray-600 group-hover:bg-blue-100 group-hover:text-blue-600'
                                        } `}>
                                        <ActionIcon size={24} />
                                    </div>

                                    <h3 className={`text - lg font - bold mb - 2 ${action.isEmergency ? 'text-red-700' : 'text-gray-900'} `}>
                                        {action.name}
                                    </h3>
                                    <p className="text-sm text-gray-500 font-medium">
                                        {action.desc}
                                    </p>

                                    <div className="absolute top-6 right-6 opacity-0 group-hover:opacity-100 transition-opacity">
                                        <ChevronRight size={20} className={action.isEmergency ? 'text-red-400' : 'text-blue-400'} />
                                    </div>
                                </button>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* Forms */}
            {serviceType === 'gas' && (
                <GasServiceForm
                    isOpen={!!selectedAction}
                    onClose={() => setSelectedAction(null)}
                    category={selectedAction?.category}
                    action={selectedAction?.action}
                />
            )}

            {serviceType === 'water' && (
                <WaterServiceForm
                    isOpen={!!selectedAction}
                    onClose={() => setSelectedAction(null)}
                    category={selectedAction?.category}
                    action={selectedAction?.action}
                />
            )}

            <Footer />
        </div>
    );
};

export default ServiceCategoryPage;
