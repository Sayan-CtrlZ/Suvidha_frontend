import React from 'react';
import { Link } from 'react-router-dom';
import { ShieldAlert, ArrowLeft } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';
import AnimatedBackground from '../../components/common/AnimatedBackground';

const AccessDenied = () => {
    const { t } = useLanguage();

    return (
        <div className="min-h-screen flex flex-col items-center justify-center px-4">
            <AnimatedBackground />
            <div className="max-w-md w-full text-center">
                <div className="bg-red-100 w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-6">
                    <ShieldAlert size={48} className="text-red-600" />
                </div>

                <h1 className="text-3xl font-bold text-gray-900 mb-2">Access Denied</h1>
                <p className="text-gray-600 mb-8">
                    You do not have the required permissions to access this page.
                </p>

                <div className="space-y-3">
                    <Link
                        to="/"
                        className="block w-full py-3 px-4 bg-gray-900 text-white rounded-lg font-semibold hover:bg-gray-800 transition-colors flex items-center justify-center gap-2"
                    >
                        <ArrowLeft size={18} />
                        Return Home
                    </Link>

                    <Link
                        to="/signin"
                        className="block w-full py-3 px-4 border-2 border-gray-200 text-gray-700 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
                    >
                        Switch Account
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default AccessDenied;
