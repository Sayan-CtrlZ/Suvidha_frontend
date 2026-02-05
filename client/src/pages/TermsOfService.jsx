import React from 'react';
import { FileText, Shield } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import TopBar from '../components/common/TopBar';
import NavBar from '../components/common/NavBar';
import AnimatedBackground from '../components/common/AnimatedBackground';
import Footer from '../components/common/Footer';
import BackButton from '../components/common/BackButton';

const TermsOfService = () => {
    const { t } = useLanguage();

    return (
        <div className="min-h-screen flex flex-col">
            <TopBar />
            <AnimatedBackground />
            <NavBar />

            {/* Page Header */}
            <section className="w-full pt-2 md:pt-3 pb-4 md:pb-5 px-3 sm:px-6 bg-gradient-to-br from-slate-900 via-gray-800 to-slate-900 shadow-2xl relative overflow-hidden">
                <div className="max-w-7xl mx-auto relative z-10">
                    <BackButton
                        to="/"
                        text={t('common.back')}
                        className="mb-6 scale-90 origin-left !bg-white/10 !text-white !border-white/20 hover:!bg-white/20"
                    />
                    <div className="flex items-center gap-4">
                        <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-xl bg-white/20 backdrop-blur-sm flex items-center justify-center border-2 border-white/30">
                            <FileText size={32} className="text-white" />
                        </div>
                        <div>
                            <h1 className="text-2xl sm:text-3xl font-bold text-white tracking-wide uppercase">Terms of Service</h1>
                            <p className="text-slate-50 text-sm sm:text-base mt-1 font-medium">Last updated: February 2026</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Content */}
            <section className="py-6 sm:py-10 px-3 sm:px-6">
                <div className="max-w-4xl mx-auto">
                    <div className="bg-white rounded-xl shadow-md border-2 border-gray-200 p-6 md:p-8 space-y-6">

                        <div>
                            <h2 className="text-xl font-bold text-gray-900 mb-3">1. Acceptance of Terms</h2>
                            <p className="text-gray-700 leading-relaxed">
                                By accessing and using the SUVIDHA platform, you accept and agree to be bound by the terms and provision of this agreement.
                                If you do not agree to abide by the above, please do not use this service.
                            </p>
                        </div>

                        <div>
                            <h2 className="text-xl font-bold text-gray-900 mb-3">2. Use of Service</h2>
                            <p className="text-gray-700 leading-relaxed mb-2">
                                You agree to use the SUVIDHA platform only for lawful purposes and in accordance with these Terms. You agree not to:
                            </p>
                            <ul className="list-disc list-inside text-gray-700 space-y-1 ml-4">
                                <li>Use the service in any way that violates any applicable law or regulation</li>
                                <li>Impersonate or attempt to impersonate another user or person</li>
                                <li>Engage in any conduct that restricts or inhibits anyone's use of the service</li>
                                <li>Use any automated system to access the service</li>
                            </ul>
                        </div>

                        <div>
                            <h2 className="text-xl font-bold text-gray-900 mb-3">3. User Accounts</h2>
                            <p className="text-gray-700 leading-relaxed">
                                When you create an account with us, you must provide accurate, complete, and current information.
                                Failure to do so constitutes a breach of the Terms. You are responsible for safeguarding the password
                                and for all activities that occur under your account.
                            </p>
                        </div>

                        <div>
                            <h2 className="text-xl font-bold text-gray-900 mb-3">4. Payment Terms</h2>
                            <p className="text-gray-700 leading-relaxed">
                                All payments made through the SUVIDHA platform are processed securely. You agree to pay all charges
                                incurred by you or any users of your account at the prices in effect when such charges are incurred.
                            </p>
                        </div>

                        <div>
                            <h2 className="text-xl font-bold text-gray-900 mb-3">5. Intellectual Property</h2>
                            <p className="text-gray-700 leading-relaxed">
                                The service and its original content, features, and functionality are and will remain the exclusive property
                                of SUVIDHA and its licensors. The service is protected by copyright, trademark, and other laws.
                            </p>
                        </div>

                        <div>
                            <h2 className="text-xl font-bold text-gray-900 mb-3">6. Termination</h2>
                            <p className="text-gray-700 leading-relaxed">
                                We may terminate or suspend your account immediately, without prior notice or liability, for any reason whatsoever,
                                including without limitation if you breach the Terms.
                            </p>
                        </div>

                        <div>
                            <h2 className="text-xl font-bold text-gray-900 mb-3">7. Limitation of Liability</h2>
                            <p className="text-gray-700 leading-relaxed">
                                In no event shall SUVIDHA, nor its directors, employees, partners, agents, suppliers, or affiliates, be liable
                                for any indirect, incidental, special, consequential or punitive damages arising out of your use of the service.
                            </p>
                        </div>

                        <div>
                            <h2 className="text-xl font-bold text-gray-900 mb-3">8. Changes to Terms</h2>
                            <p className="text-gray-700 leading-relaxed">
                                We reserve the right to modify or replace these Terms at any time. We will provide notice of any changes by
                                posting the new Terms on this page. Your continued use of the service after any such changes constitutes your
                                acceptance of the new Terms.
                            </p>
                        </div>

                        <div>
                            <h2 className="text-xl font-bold text-gray-900 mb-3">9. Contact Us</h2>
                            <p className="text-gray-700 leading-relaxed">
                                If you have any questions about these Terms, please contact us at support@suvidha.gov.in
                            </p>
                        </div>

                    </div>
                </div>
            </section>

            <Footer />
        </div>
    );
};

export default TermsOfService;
