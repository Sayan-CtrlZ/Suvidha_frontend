import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { Globe, ArrowRight, X } from 'lucide-react';
import BackButton from '../components/common/BackButton';
import AnimatedBackground from '../components/common/AnimatedBackground';
const LanguageSelection = ({ onLanguageSelect, onClose }) => {
    const { setLanguage } = useLanguage();

    const languages = [
        { code: 'en', label: 'English', subLabel: 'English', active: true },
        { code: 'hi', label: 'हिंदी', subLabel: 'Hindi', active: true },
        { code: 'bn', label: 'বাংলা', subLabel: 'Bengali', active: true },
        { code: 'te', label: 'తెలుగు', subLabel: 'Telugu', active: true },
        { code: 'ta', label: 'தமிழ்', subLabel: 'Tamil', active: true },
    ];

    const handleSelect = (langCode) => {
        setLanguage(langCode);
        onLanguageSelect(); // Callback to notify App to switch view
    };

    return (
        <div className="min-h-screen bg-linear-to-br from-blue-900 via-indigo-900 to-slate-900 flex items-center justify-center p-4 relative overflow-hidden">
            <AnimatedBackground />

            {/* Top Controls */}
            <div className="absolute top-8 left-8 right-8 flex justify-between items-center z-20">
                <BackButton className="scale-90 origin-left !bg-white/10 !text-white !border-white/20 hover:!bg-white/20" />

                {onClose && (
                    <button
                        onClick={onClose}
                        className="p-3 bg-white/10 hover:bg-white/20 text-white rounded-2xl border border-white/20 transition-all flex items-center gap-2 group"
                    >
                        <span className="text-xs font-bold uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity">Skip</span>
                        <X size={20} />
                    </button>
                )}
            </div>

            <div className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-3xl p-8 md:p-12 w-full max-w-4xl shadow-2xl relative overflow-hidden">

                {/* Background decorative elements */}
                <div className="absolute top-0 right-0 -mr-20 -mt-20 w-64 h-64 bg-blue-500/20 rounded-full blur-3xl"></div>
                <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-64 h-64 bg-indigo-500/20 rounded-full blur-3xl"></div>

                <div className="relative z-10 text-center">
                    <div className="inline-flex items-center justify-center p-4 bg-white/10 rounded-full mb-8 backdrop-blur-sm border border-white/10 shadow-inner">
                        <Globe className="text-white w-10 h-10 md:w-12 md:h-12" />
                    </div>

                    <h1 className="text-3xl md:text-5xl font-bold text-white mb-4 tracking-tight">
                        Welcome to SUVIDHA
                    </h1>
                    <p className="text-blue-100 text-lg md:text-xl mb-12 max-w-lg mx-auto leading-relaxed opacity-90">
                        Please select your preferred language
                        <br />
                        <span className="text-sm md:text-base opacity-75 font-light">कृपया अपनी पसंदीदा भाषा चुनें</span>
                    </p>

                    <div className="grid grid-cols-2 md:grid-cols-5 gap-6">
                        {languages.map((lang) => (
                            <button
                                key={lang.code}
                                onClick={() => handleSelect(lang.code)}
                                className="group relative bg-white/10 hover:bg-white/15 border-2 border-white/20 hover:border-white/40 rounded-3xl p-6 transition-all flex flex-col items-center justify-center gap-3 shadow-[0_8px_0_0_rgba(255,255,255,0.1)] active:translate-y-1 active:shadow-none"
                            >
                                <div className="text-2xl md:text-3xl font-black text-white group-hover:text-amber-400 transition-colors drop-shadow-lg">
                                    {lang.label}
                                </div>
                                <div className="text-blue-100 text-[10px] uppercase tracking-[0.2em] font-black opacity-40 group-hover:opacity-100 transition-opacity">
                                    {lang.subLabel}
                                </div>
                            </button>
                        ))}
                    </div>

                    <div className="mt-12 text-white/40 text-sm font-medium tracking-wider uppercase">
                        Official Government Portal • सत्यमेव जयते
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LanguageSelection;
