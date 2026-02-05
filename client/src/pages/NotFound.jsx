import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Home, Search, AlertTriangle, ArrowLeft } from 'lucide-react';
import TopBar from '../components/common/TopBar';
import NavBar from '../components/common/NavBar';
import AnimatedBackground from '../components/common/AnimatedBackground';
import Footer from '../components/common/Footer';
import { useLanguage } from '../context/LanguageContext.jsx';

const NotFound = () => {
    const { t } = useLanguage();
    const navigate = useNavigate();

    return (
        <div className="min-h-screen flex flex-col">
            <TopBar />
            <AnimatedBackground />
            <div id="search-tour-step">
                <NavBar />
            </div>

            <main className="grow relative z-10 flex items-center justify-center py-20 px-4 sm:px-6 lg:px-8">
                <div className="max-w-2xl w-full text-center">
                    <div className="relative mb-12">
                        <div className="absolute inset-0 flex items-center justify-center opacity-10">
                            <span className="text-[200px] font-black tracking-tighter text-gray-900 select-none">404</span>
                        </div>
                        <div className="relative z-10">
                            <div className="w-24 h-24 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg border border-red-200">
                                <AlertTriangle size={48} className="text-red-600" />
                            </div>
                            <h1 className="text-4xl font-extrabold text-gray-900 mb-4 tracking-tight">Page Not Found</h1>
                            <p className="text-gray-600 text-lg font-medium max-w-md mx-auto">
                                Oops! The page you're looking for doesn't exist or has been moved to a new location.
                            </p>
                        </div>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                        <button
                            onClick={() => navigate('/')}
                            className="flex items-center gap-2 px-8 py-4 bg-gray-900 text-white rounded-2xl font-bold shadow-xl hover:bg-gray-800 transition-all group scale-105"
                        >
                            <Home size={20} />
                            Back to Home
                        </button>
                        <button
                            onClick={() => navigate(-1)}
                            className="flex items-center gap-2 px-8 py-4 bg-white text-gray-700 border-2 border-gray-200 rounded-2xl font-bold hover:bg-gray-50 transition-all"
                        >
                            <ArrowLeft size={20} />
                            Go Back
                        </button>
                    </div>

                    <div className="mt-16 pt-8 border-t border-gray-200">
                        <p className="text-sm font-bold text-gray-400 uppercase tracking-[0.2em] mb-4">Quick Links</p>
                        <div className="flex flex-wrap justify-center gap-6">
                            <button onClick={() => navigate('/services')} className="text-sm font-bold text-green-700 hover:text-green-800 transition-colors">Services Offered</button>
                            <button onClick={() => navigate('/help')} className="text-sm font-bold text-green-700 hover:text-green-800 transition-colors">Support Center</button>
                            <button onClick={() => navigate('/signin')} className="text-sm font-bold text-green-700 hover:text-green-800 transition-colors">Sign In Portal</button>
                        </div>
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
};

export default NotFound;
