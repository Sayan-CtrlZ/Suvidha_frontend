import React, { useState } from 'react';
import { Trash2, Calendar, MapPin, Clock, CheckCircle, AlertCircle, Recycle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '../../context/LanguageContext';
import TopBar from '../../components/common/TopBar';
import NavBar from '../../components/common/NavBar';
import AnimatedBackground from '../../components/common/AnimatedBackground';
import Footer from '../../components/common/Footer';
import BackButton from '../../components/common/BackButton';

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
            <section className="w-full pt-2 md:pt-3 pb-4 md:pb-5 px-3 sm:px-6 bg-gradient-to-br from-emerald-900 via-green-800 to-emerald-900 shadow-2xl relative overflow-hidden">
                <div className="absolute inset-0 opacity-[0.25]">
                    <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
                        <defs>
                            <pattern id="grid-waste" width="40" height="40" patternUnits="userSpaceOnUse">
                                <circle cx="20" cy="20" r="1" fill="white" opacity="0.4" />
                                <circle cx="0" cy="0" r="1" fill="white" opacity="0.3" />
                                <circle cx="40" cy="40" r="1" fill="white" opacity="0.3" />
                            </pattern>
                        </defs>
                        <rect width="100%" height="100%" fill="url(#grid-waste)" />
                    </svg>
                </div>

                <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-emerald-400/15 to-green-500/15 rounded-full blur-3xl transform translate-x-1/3 -translate-y-1/3" />
                <div className="absolute bottom-0 left-0 w-80 h-80 bg-gradient-to-tr from-green-400/10 to-emerald-500/10 rounded-full blur-3xl transform -translate-x-1/3 translate-y-1/3" />

                <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-emerald-400/30 to-transparent" />

                <div className="max-w-7xl mx-auto relative z-10">
                    <BackButton
                        to="/services/waste"
                        text={t('common.back')}
                        className="mb-6 scale-90 origin-left !bg-white/10 !text-white !border-white/20 hover:!bg-white/20"
                    />
                    <div className="flex items-center gap-4">
                        <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-xl bg-white/20 backdrop-blur-sm flex items-center justify-center border-2 border-white/30">
                            <Calendar size={32} className="text-white" />
                        </div>
                        <div>
                            <h1 className="text-2xl sm:text-3xl font-bold text-white tracking-wide uppercase">Waste Collection Schedule</h1>
                            <p className="text-emerald-50 text-sm sm:text-base mt-1 font-medium">View your weekly waste collection schedule</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Schedule Content */}
            <section className="py-6 sm:py-10 px-3 sm:px-6">
                <div className="max-w-5xl mx-auto space-y-6">

                    {/* Info Card */}
                    <div className="bg-blue-50 border-2 border-blue-200 rounded-xl p-4 flex items-start gap-3">
                        <AlertCircle size={20} className="text-blue-600 flex-shrink-0 mt-0.5" />
                        <div>
                            <p className="text-sm font-bold text-blue-800">Collection Guidelines</p>
                            <p className="text-xs text-blue-700 mt-1">
                                Please keep your waste bins outside your premises by 6:00 AM on collection days. Ensure waste is properly segregated.
                            </p>
                        </div>
                    </div>

                    {/* Schedule Cards */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {scheduleData.map((schedule, index) => {
                            const Icon = schedule.icon;
                            return (
                                <div key={index} className="bg-white rounded-xl shadow-md border-2 border-gray-200 overflow-hidden hover:shadow-lg transition-shadow">
                                    <div className={`bg-${schedule.color}-50 px-5 py-3 border-b border-${schedule.color}-200`}>
                                        <div className="flex items-center justify-between">
                                            <div className="flex items-center gap-3">
                                                <div className={`w-10 h-10 rounded-lg bg-white border-2 border-${schedule.color}-200 flex items-center justify-center`}>
                                                    <Icon size={20} className={`text-${schedule.color}-600`} />
                                                </div>
                                                <div>
                                                    <h3 className="text-base font-bold text-gray-900">{schedule.day}</h3>
                                                    <p className="text-xs text-gray-600">{schedule.type}</p>
                                                </div>
                                            </div>
                                            {schedule.day !== 'Sunday' && (
                                                <CheckCircle size={20} className="text-green-600" />
                                            )}
                                        </div>
                                    </div>
                                    <div className="p-4">
                                        <div className="flex items-center gap-2 text-gray-700">
                                            <Clock size={16} className="text-gray-500" />
                                            <span className="text-sm font-medium">{schedule.time}</span>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>

                    {/* Waste Segregation Guide */}
                    <div className="bg-white rounded-xl shadow-md border-2 border-gray-200 p-6">
                        <h3 className="text-lg font-bold text-gray-900 mb-4">Waste Segregation Guide</h3>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <div className="p-4 bg-green-50 border-2 border-green-200 rounded-lg">
                                <h4 className="font-bold text-green-800 mb-2">General Waste</h4>
                                <p className="text-xs text-green-700">Non-recyclable items, food packaging, etc.</p>
                            </div>
                            <div className="p-4 bg-blue-50 border-2 border-blue-200 rounded-lg">
                                <h4 className="font-bold text-blue-800 mb-2">Recyclable Waste</h4>
                                <p className="text-xs text-blue-700">Paper, plastic, glass, metal items</p>
                            </div>
                            <div className="p-4 bg-amber-50 border-2 border-amber-200 rounded-lg">
                                <h4 className="font-bold text-amber-800 mb-2">Organic Waste</h4>
                                <p className="text-xs text-amber-700">Food scraps, garden waste, biodegradable items</p>
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
