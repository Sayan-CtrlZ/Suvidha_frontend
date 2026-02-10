import React, { useState } from 'react';
import { Trash2, Calendar, MapPin, Clock, CheckCircle, AlertCircle, Recycle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '../../context/LanguageContext';
import TopBar from '../../components/common/TopBar';
import NavBar from '../../components/common/NavBar';
import AnimatedBackground from '../../components/common/AnimatedBackground';
import Footer from '../../components/common/Footer';
import PageHeader from '../../components/common/PageHeader';

const WasteSchedulePage = () => {
    const navigate = useNavigate();
    const { t } = useLanguage();

    const scheduleData = [
        { day: 'Monday', type: 'General Waste', time: '6:00 AM - 8:00 AM', icon: Trash2, color: 'green' },
        { day: 'Tuesday', type: 'Recyclable Waste', time: '6:00 AM - 8:00 AM', icon: Recycle, color: 'blue' },
        { day: 'Wednesday', type: 'General Waste', time: '6:00 AM - 8:00 AM', icon: Trash2, color: 'green' },
        { day: 'Thursday', type: 'Organic Waste', time: '6:00 AM - 8:00 AM', icon: Trash2, color: 'amber' },
        { day: 'Friday', type: 'General Waste', time: '6:00 AM - 8:00 AM', icon: Trash2, color: 'green' },
        { day: 'Saturday', type: 'Recyclable Waste', time: '6:00 AM - 8:00 AM', icon: Recycle, color: 'blue' },
        { day: 'Sunday', type: 'No Collection', time: '-', icon: AlertCircle, color: 'gray' },
    ];

    return (
        <div className="min-h-screen flex flex-col">
            <TopBar />
            <AnimatedBackground />
            <NavBar />

            {/* Page Header */}
            <PageHeader
                title="Waste Collection Schedule"
                description={t('services.wasteScheduleDesc') || "View your weekly waste collection schedule"}
                icon={Calendar}
                watermarkIcon={Recycle}
                to="/services/waste"
                backText={t('common.back')}
                gradient="bg-gradient-to-br from-emerald-900 via-green-800 to-emerald-900"
                stripeColor="via-emerald-400/30"
                orb1Color="from-emerald-400/15 to-green-500/15"
                orb2Color="from-green-400/10 to-emerald-500/10"
            />

            {/* Schedule Content */}
            <section className="py-6 sm:py-10 px-3 sm:px-6">
                <div className="max-w-5xl mx-auto space-y-6">

                    {/* Info Card - Glassmorphism */}
                    <div className="bg-blue-50/80 backdrop-blur-lg border border-blue-200 rounded-2xl p-6 flex items-start gap-4 shadow-lg">
                        <AlertCircle size={24} className="text-blue-600 flex-shrink-0 mt-0.5" />
                        <div>
                            <p className="text-base font-bold text-blue-900">Collection Guidelines</p>
                            <p className="text-sm text-blue-700 mt-1 leading-relaxed">
                                Please keep your waste bins outside your premises by 6:00 AM on collection days. Ensure waste is properly segregated into the correct bins.
                            </p>
                        </div>
                    </div>

                    {/* Schedule Cards Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {scheduleData.map((schedule, index) => {
                            const Icon = schedule.icon;
                            return (
                                <div key={index} className="group relative bg-white/80 backdrop-blur-lg rounded-2xl shadow-xl border border-white/50 overflow-hidden hover:shadow-2xl transition-all duration-300">
                                    <div className={`px-6 py-4 border-b border-gray-100 bg-gradient-to-r from-${schedule.color}-50 to-white`}>
                                        <div className="flex items-center justify-between">
                                            <div className="flex items-center gap-4">
                                                <div className={`w-12 h-12 rounded-xl bg-${schedule.color}-100 flex items-center justify-center border border-${schedule.color}-200 group-hover:scale-105 transition-transform`}>
                                                    <Icon size={24} className={`text-${schedule.color}-600`} />
                                                </div>
                                                <div>
                                                    <h3 className="text-lg font-bold text-gray-900">{schedule.day}</h3>
                                                    <p className={`text-xs font-semibold uppercase tracking-wider text-${schedule.color}-600`}>{schedule.type}</p>
                                                </div>
                                            </div>
                                            {schedule.day !== 'Sunday' && (
                                                <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center">
                                                    <CheckCircle size={18} className="text-green-600" />
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                    <div className="p-6">
                                        <div className="flex items-center gap-3 text-gray-600 bg-gray-50 rounded-xl p-3 border border-gray-100">
                                            <Clock size={20} className="text-gray-400" />
                                            <span className="text-base font-medium">{schedule.time}</span>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>

                    {/* Waste Segregation Guide - Glassmorphism */}
                    <div className="bg-white/80 backdrop-blur-lg rounded-2xl shadow-xl border border-white/50 p-6 md:p-8">
                        <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                            <Recycle className="text-emerald-600" size={24} />
                            Waste Segregation Guide
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            <div className="p-5 bg-green-50/50 border border-green-100 rounded-2xl hover:bg-green-50 transition-colors">
                                <h4 className="font-bold text-green-800 mb-2 flex items-center gap-2">
                                    <div className="w-2 h-2 rounded-full bg-green-500" />
                                    General Waste
                                </h4>
                                <p className="text-sm text-green-700 leading-relaxed opacity-80">Non-recyclable items, food packaging, wrappers, and general household trash.</p>
                            </div>
                            <div className="p-5 bg-blue-50/50 border border-blue-100 rounded-2xl hover:bg-blue-50 transition-colors">
                                <h4 className="font-bold text-blue-800 mb-2 flex items-center gap-2">
                                    <div className="w-2 h-2 rounded-full bg-blue-500" />
                                    Recyclable Waste
                                </h4>
                                <p className="text-sm text-blue-700 leading-relaxed opacity-80">Paper, plastic bottles, glass containers, metal cans, and cardboard.</p>
                            </div>
                            <div className="p-5 bg-amber-50/50 border border-amber-100 rounded-2xl hover:bg-amber-50 transition-colors">
                                <h4 className="font-bold text-amber-800 mb-2 flex items-center gap-2">
                                    <div className="w-2 h-2 rounded-full bg-amber-500" />
                                    Organic Waste
                                </h4>
                                <p className="text-sm text-amber-700 leading-relaxed opacity-80">Vegetable peels, food scraps, garden waste, and biodegradable items.</p>
                            </div>
                        </div>
                    </div>

                </div>
            </section>

            <Footer />
        </div>
    );
};

export default WasteSchedulePage;
