import React from 'react';
import { Shield, Lock, Award, Building } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';

const TrustIndicators = () => {
    const { t } = useLanguage();

    return (
        <div className="bg-gray-50 border-t border-gray-200 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto text-center">
                <p className="text-sm font-semibold text-gray-500 uppercase tracking-widest mb-8">
                    {t('trust.trustedBy')}
                </p>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-8 opacity-75 grayscale hover:grayscale-0 transition-all duration-300">
                    {/* Mock Logos using Lucide icons + Text */}
                    <div className="flex flex-col items-center justify-center gap-3">
                        <Building size={48} className="text-gray-400" />
                        <span className="font-bold text-gray-400 text-lg">{t('trust.govIndia')}</span>
                    </div>

                    <div className="flex flex-col items-center justify-center gap-3">
                        <Shield size={48} className="text-gray-400" />
                        <span className="font-bold text-gray-400 text-lg">{t('trust.securePay')}</span>
                    </div>

                    <div className="flex flex-col items-center justify-center gap-3">
                        <Award size={48} className="text-gray-400" />
                        <span className="font-bold text-gray-400 text-lg">{t('trust.isoCertified')}</span>
                    </div>

                    <div className="flex flex-col items-center justify-center gap-3">
                        <Lock size={48} className="text-gray-400" />
                        <span className="font-bold text-gray-400 text-lg">{t('trust.ssl')}</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TrustIndicators;
