import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { Globe, ArrowRight } from 'lucide-react';
import BackButton from '../components/common/BackButton';
import AnimatedBackground from '../components/common/AnimatedBackground';
const LanguageSelection = ({ onLanguageSelect }) => {
    const { setLanguage } = useLanguage();

    const languages = [
        { code: 'en', label: 'English', subLabel: 'English', active: true },
        { code: 'hi', label: 'हिंदी', subLabel: 'Hindi', active: true },
        { code: 'regional', label: 'Regional', subLabel: 'Regional', active: true },
    ];

    const handleSelect = (langCode) => {
        setLanguage(langCode);
        onLanguageSelect(); // Callback to notify App to switch view
    };

    return (
        <div className="min-h-screen bg-linear-to-br from-blue-900 to-indigo-900 flex items-center justify-center p-4 relative overflow-hidden">
            <AnimatedBackground />
            {/* Top Back Button */}
            <div className="absolute top-8 left-8 z-20">
                <BackButton className="scale-90 origin-left !bg-white/10 !text-white !border-white/20 hover:!bg-white/20" />
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

                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                        {languages.map((lang) => (
                            <button
                                key={lang.code}
                                onClick={() => handleSelect(lang.code)}
                                className="group relative bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/30 rounded-2xl p-6 md:p-8 transition-colors flex flex-col items-center justify-center gap-3"
                            >
                                <div className="text-3xl md:text-4xl font-bold text-white group-hover:text-amber-400 transition-colors">
                                    {lang.label}
                                </div>
                                <div className="text-blue-200 text-sm uppercase tracking-widest font-medium opacity-70 group-hover:opacity-100">
                                    {lang.subLabel}
                                </div>
                                <div className="absolute bottom-4 opacity-0 group-hover:opacity-100 transition-opacity text-white/50">
                                    <ArrowRight size={20} />
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
