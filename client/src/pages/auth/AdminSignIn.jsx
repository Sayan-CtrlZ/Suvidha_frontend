import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { Lock, User, ArrowLeft, CheckCircle2, AlertCircle, Building2 } from 'lucide-react';
import emblem from '../../assets/emblem.png';
import logo from '../../assets/logo.png';

// Department Admin Login - Professional Government Theme
const AdminSignIn = () => {
    const { login } = useAuth();
    const navigate = useNavigate();
    const [formData, setFormData] = useState({ email: '', password: '' });
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
        if (error) setError('');
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setError('');

        // Simulate secure verification delay
        await new Promise(resolve => setTimeout(resolve, 600));

        const result = await login(formData.email, formData.password);
        setIsLoading(false);

        if (result.success) {
            // STRICT AUTH CHECK: Only 'admin' role allowed
            if (result.user.role === 'admin') {
                navigate('/admin/dashboard', { replace: true });
            } else {
                setError('Access Restricted: This portal is for Department Heads only.');
            }
        } else {
            setError(result.error || 'Authentication failed.');
        }
    };

    return (
        <div className="min-h-screen bg-slate-100 flex flex-col font-sans text-slate-900">

            {/* Top Security Bar */}
            <div className="bg-white text-slate-900 shadow-md z-20 border-b border-slate-200 py-2">
                <div className="max-w-7xl mx-auto flex justify-between items-center relative px-6">

                    {/* Left: Logo */}
                    <div className="flex items-center">
                        <img src={logo} alt="Suvidha Logo" className="h-12 sm:h-24 w-auto object-contain" />
                    </div>

                    {/* Center: Branding */}
                    <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-center">
                        <div className="text-[10px] sm:text-xs font-bold tracking-[0.2em] text-slate-500 uppercase mb-0">Government of India</div>
                        <div className="text-xl sm:text-4xl font-black tracking-wider text-slate-900">SUVIDHA</div>
                    </div>

                    {/* Right: Emblem */}
                    <div className="flex items-center">
                        <img src={emblem} alt="National Emblem" className="h-8 sm:h-20 w-auto opacity-90" />
                    </div>
                </div>
            </div>

            {/* Main Content Area */}
            <div className="flex-1 flex items-center justify-center p-4 relative overflow-hidden">

                {/* Background Pattern - subtle official look */}
                <div className="absolute inset-0 z-0 opacity-[0.03]"
                    style={{ backgroundImage: 'radial-gradient(#1e293b 1px, transparent 1px)', backgroundSize: '24px 24px' }}>
                </div>

                {/* Decor: Official Circle hint (CSS only) */}
                <div className="absolute -left-20 top-1/2 -translate-y-1/2 w-96 h-96 rounded-full border-[20px] border-slate-200/50 -z-10" />


                {/* Login Card */}
                <div className="relative z-10 w-full max-w-sm bg-white rounded-sm shadow-[0_20px_50px_rgba(15,23,42,0.15)] border-t-4 border-blue-600 overflow-hidden">

                    <div className="p-6 md:p-8">

                        {/* Header */}
                        <div className="text-center mb-6">
                            <div className="inline-flex items-center justify-center mb-4">
                                <div className="p-3 rounded-full bg-blue-600 shadow-lg">
                                    <Building2 size={32} className="text-white" />
                                </div>
                            </div>
                            <h1 className="text-xl font-bold text-slate-900 uppercase tracking-tight mb-2">Department Administration</h1>
                            <div className="h-1 w-16 bg-gradient-to-r from-blue-500 to-indigo-500 mx-auto rounded-full mb-3" />
                            <p className="text-slate-500 text-xs font-medium">Please verify your credentials to proceed.</p>
                        </div>

                        {/* Form */}
                        <form onSubmit={handleSubmit} className="space-y-4">

                            {/* Email Input */}
                            <div className="space-y-1.5">
                                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wide ml-1">
                                    Department ID
                                </label>
                                <div className="relative group">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        <User size={18} className="text-slate-400 group-focus-within:text-slate-800 transition-colors" />
                                    </div>
                                    <input
                                        type="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        className="block w-full pl-10 pr-3 py-2 border border-slate-300 rounded-md text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600 transition-all shadow-sm"
                                        placeholder="admin@suvidha.gov.in"
                                        required
                                    />
                                </div>
                            </div>

                            {/* Password Input */}
                            <div className="space-y-1.5">
                                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wide ml-1">
                                    Secure Passkey
                                </label>
                                <div className="relative group">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        <Lock size={18} className="text-slate-400 group-focus-within:text-slate-800 transition-colors" />
                                    </div>
                                    <input
                                        type="password"
                                        name="password"
                                        value={formData.password}
                                        onChange={handleChange}
                                        className="block w-full pl-10 pr-3 py-2 border border-slate-300 rounded-md text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600 transition-all shadow-sm"
                                        placeholder="••••••••••••"
                                        required
                                    />
                                </div>
                            </div>

                            {/* Error Alert */}
                            {error && (
                                <div className="flex items-start gap-3 p-4 bg-red-50 border-l-4 border-red-600 text-red-800 text-sm rounded-r-md">
                                    <AlertCircle size={18} className="shrink-0 mt-0.5" />
                                    <span>{error}</span>
                                </div>
                            )}

                            {/* Actions */}
                            <div className="pt-2">
                                <button
                                    type="submit"
                                    disabled={isLoading}
                                    className="w-full flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-bold py-2.5 px-4 rounded-md shadow-lg shadow-blue-600/10 transition-all duration-200 disabled:opacity-70"
                                >
                                    {isLoading ? (
                                        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                    ) : (
                                        <>
                                            <span>SECURE LOGIN</span>
                                            <CheckCircle2 size={18} />
                                        </>
                                    )}
                                </button>
                            </div>

                        </form>
                    </div>

                    {/* Footer Panel */}
                    <div className="bg-slate-50 border-t border-slate-100 p-4 text-center">
                        <button
                            onClick={() => navigate('/')}
                            className="inline-flex items-center gap-2 text-sm font-medium text-slate-500 hover:text-slate-800 transition-colors"
                        >
                            <ArrowLeft size={16} />
                            Back to Citizen Portal
                        </button>
                    </div>

                </div>

                {/* Bottom Disclaimers */}
                <div className="absolute bottom-6 left-0 right-0 text-center">
                    <p className="text-[10px] text-slate-400 uppercase tracking-widest font-medium">
                        Authorized Department Access Only
                    </p>
                    <p className="text-[10px] text-slate-400 mt-1">
                        System Version 4.2.0 • Build 2024
                    </p>
                </div>

            </div>
        </div>
    );
};

export default AdminSignIn;
