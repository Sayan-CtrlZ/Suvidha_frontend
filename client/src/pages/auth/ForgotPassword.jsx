import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Mail, ArrowLeft, ShieldCheck, HelpCircle } from 'lucide-react';
import TopBar from '../../components/common/TopBar';
import NavBar from '../../components/common/NavBar';
import AnimatedBackground from '../../components/common/AnimatedBackground';
import Footer from '../../components/common/Footer';
import { useLanguage } from '../../context/LanguageContext.jsx';
import BackButton from '../../components/common/BackButton';

const ForgotPassword = () => {
    const { t } = useLanguage();
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        setIsLoading(true);
        // Simulate API call
        setTimeout(() => {
            setIsLoading(false);
            setIsSubmitted(true);
        }, 1500);
    };

    return (
        <div className="min-h-screen flex flex-col">
            <TopBar />
            <AnimatedBackground />
            <div id="search-tour-step">
                <NavBar />
            </div>

            <section className="py-12 px-4 sm:px-6 lg:px-8 grow relative z-10 flex items-center">
                <div className="max-w-md w-full mx-auto">
                    <div className="bg-white/70 backdrop-blur-xl border border-white/50 rounded-3xl p-8 shadow-2xl relative overflow-hidden">
                        <div className="absolute -right-16 -top-16 w-56 h-56 rounded-full bg-gradient-to-br from-green-500 to-emerald-500 opacity-10 pointer-events-none" />

                        <div className="relative z-10">
                            <div className="text-center mb-8">
                                <h1 className="text-2xl font-bold text-gray-900 mb-2">Reset Password</h1>
                                <p className="text-gray-600 text-sm">
                                    {isSubmitted
                                        ? "Check your email for reset instructions"
                                        : "Enter your email to receive a password reset link"}
                                </p>
                            </div>

                            {!isSubmitted ? (
                                <form onSubmit={handleSubmit} className="space-y-6">
                                    <div>
                                        <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2">
                                            Email Address
                                        </label>
                                        <div className="relative">
                                            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                                            <input
                                                type="email"
                                                value={email}
                                                onChange={(e) => setEmail(e.target.value)}
                                                placeholder="yourname@example.com"
                                                className="w-full bg-white border border-gray-300 rounded-xl py-3 pl-10 pr-4 focus:outline-none focus:ring-2 focus:ring-green-600 focus:border-transparent transition-all"
                                                required
                                            />
                                        </div>
                                    </div>

                                    <button
                                        type="submit"
                                        disabled={isLoading}
                                        className="w-full bg-gradient-to-r from-green-700 to-emerald-600 text-white font-bold py-3.5 rounded-xl hover:from-green-800 hover:to-emerald-700 transition-all shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed uppercase tracking-wider"
                                    >
                                        {isLoading ? "Sending Link..." : "Send Reset Link"}
                                    </button>
                                </form>
                            ) : (
                                <div className="text-center py-6">
                                    <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                                        <ShieldCheck size={40} className="text-green-600" />
                                    </div>
                                    <p className="text-gray-700 mb-8 font-medium">
                                        We've sent a password reset link to <br />
                                        <span className="font-bold text-gray-900">{email}</span>
                                    </p>
                                    <button
                                        onClick={() => navigate('/signin')}
                                        className="text-green-700 font-bold hover:text-green-800 transition-colors uppercase tracking-widest text-sm"
                                    >
                                        Return to Sign In
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>

                    <div className="mt-8 text-center">
                        <p className="text-gray-600 text-sm flex items-center justify-center gap-2">
                            <HelpCircle size={16} />
                            Need more help? <Link to="/help" className="text-green-700 font-bold hover:underline">Support Center</Link>
                        </p>
                    </div>
                </div>
            </section>

            <Footer />
        </div>
    );
};

export default ForgotPassword;
