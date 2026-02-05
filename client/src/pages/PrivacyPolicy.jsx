import React from 'react';
import { Shield, Lock, Eye, Database, UserCheck } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import TopBar from '../components/common/TopBar';
import NavBar from '../components/common/NavBar';
import AnimatedBackground from '../components/common/AnimatedBackground';
import Footer from '../components/common/Footer';
import BackButton from '../components/common/BackButton';

const PrivacyPolicy = () => {
    const { t } = useLanguage();

    return (
        <div className="min-h-screen flex flex-col">
            <TopBar />
            <AnimatedBackground />
            <NavBar />

            {/* Page Header */}
            <section className="w-full pt-2 md:pt-3 pb-4 md:pb-5 px-3 sm:px-6 bg-gradient-to-br from-emerald-900 via-teal-800 to-emerald-900 shadow-2xl relative overflow-hidden">
                <div className="max-w-7xl mx-auto relative z-10">
                    <BackButton
                        to="/"
                        text={t('common.back')}
                        className="mb-6 scale-90 origin-left !bg-white/10 !text-white !border-white/20 hover:!bg-white/20"
                    />
                    <div className="flex items-center gap-4">
                        <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-xl bg-white/20 backdrop-blur-sm flex items-center justify-center border-2 border-white/30">
                            <Shield size={32} className="text-white" />
                        </div>
                        <div>
                            <h1 className="text-2xl sm:text-3xl font-bold text-white tracking-wide uppercase">Privacy Policy</h1>
                            <p className="text-emerald-50 text-sm sm:text-base mt-1 font-medium">Last updated: February 2026</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Content */}
            <section className="py-6 sm:py-10 px-3 sm:px-6">
                <div className="max-w-4xl mx-auto space-y-6">

                    {/* Introduction */}
                    <div className="bg-white rounded-xl shadow-md border-2 border-gray-200 p-6">
                        <h2 className="text-xl font-bold text-gray-900 mb-3">Introduction</h2>
                        <p className="text-gray-700 leading-relaxed">
                            SUVIDHA ("we," "our," or "us") is committed to protecting your privacy. This Privacy Policy explains how we collect,
                            use, disclose, and safeguard your information when you use our municipal services platform.
                        </p>
                    </div>

                    {/* Information We Collect */}
                    <div className="bg-white rounded-xl shadow-md border-2 border-gray-200 p-6">
                        <div className="flex items-center gap-3 mb-4">
                            <div className="w-10 h-10 rounded-lg bg-blue-100 flex items-center justify-center">
                                <Database size={20} className="text-blue-600" />
                            </div>
                            <h2 className="text-xl font-bold text-gray-900">Information We Collect</h2>
                        </div>
                        <div className="space-y-3 text-gray-700">
                            <div>
                                <h3 className="font-bold mb-1">Personal Information</h3>
                                <p className="text-sm">Name, email address, phone number, residential address, and identification documents</p>
                            </div>
                            <div>
                                <h3 className="font-bold mb-1">Usage Data</h3>
                                <p className="text-sm">Information about how you use our services, including service requests and payment history</p>
                            </div>
                            <div>
                                <h3 className="font-bold mb-1">Technical Data</h3>
                                <p className="text-sm">IP address, browser type, device information, and cookies</p>
                            </div>
                        </div>
                    </div>

                    {/* How We Use Your Information */}
                    <div className="bg-white rounded-xl shadow-md border-2 border-gray-200 p-6">
                        <div className="flex items-center gap-3 mb-4">
                            <div className="w-10 h-10 rounded-lg bg-purple-100 flex items-center justify-center">
                                <Eye size={20} className="text-purple-600" />
                            </div>
                            <h2 className="text-xl font-bold text-gray-900">How We Use Your Information</h2>
                        </div>
                        <ul className="list-disc list-inside text-gray-700 space-y-2 ml-4">
                            <li>To provide and maintain our services</li>
                            <li>To process your transactions and send you related information</li>
                            <li>To send you technical notices and support messages</li>
                            <li>To respond to your comments and questions</li>
                            <li>To monitor and analyze usage patterns and trends</li>
                            <li>To detect, prevent, and address technical issues</li>
                        </ul>
                    </div>

                    {/* Data Security */}
                    <div className="bg-white rounded-xl shadow-md border-2 border-gray-200 p-6">
                        <div className="flex items-center gap-3 mb-4">
                            <div className="w-10 h-10 rounded-lg bg-green-100 flex items-center justify-center">
                                <Lock size={20} className="text-green-600" />
                            </div>
                            <h2 className="text-xl font-bold text-gray-900">Data Security</h2>
                        </div>
                        <p className="text-gray-700 leading-relaxed">
                            We implement appropriate technical and organizational security measures to protect your personal information.
                            However, no method of transmission over the Internet or electronic storage is 100% secure. While we strive to
                            use commercially acceptable means to protect your data, we cannot guarantee its absolute security.
                        </p>
                    </div>

                    {/* Your Rights */}
                    <div className="bg-white rounded-xl shadow-md border-2 border-gray-200 p-6">
                        <div className="flex items-center gap-3 mb-4">
                            <div className="w-10 h-10 rounded-lg bg-orange-100 flex items-center justify-center">
                                <UserCheck size={20} className="text-orange-600" />
                            </div>
                            <h2 className="text-xl font-bold text-gray-900">Your Rights</h2>
                        </div>
                        <p className="text-gray-700 leading-relaxed mb-3">You have the right to:</p>
                        <ul className="list-disc list-inside text-gray-700 space-y-2 ml-4">
                            <li>Access and receive a copy of your personal data</li>
                            <li>Rectify inaccurate personal data</li>
                            <li>Request deletion of your personal data</li>
                            <li>Object to processing of your personal data</li>
                            <li>Request restriction of processing your personal data</li>
                            <li>Withdraw consent at any time</li>
                        </ul>
                    </div>

                    {/* Data Retention */}
                    <div className="bg-white rounded-xl shadow-md border-2 border-gray-200 p-6">
                        <h2 className="text-xl font-bold text-gray-900 mb-3">Data Retention</h2>
                        <p className="text-gray-700 leading-relaxed">
                            We retain your personal information only for as long as necessary to fulfill the purposes outlined in this Privacy Policy,
                            unless a longer retention period is required or permitted by law.
                        </p>
                    </div>

                    {/* Third-Party Services */}
                    <div className="bg-white rounded-xl shadow-md border-2 border-gray-200 p-6">
                        <h2 className="text-xl font-bold text-gray-900 mb-3">Third-Party Services</h2>
                        <p className="text-gray-700 leading-relaxed">
                            We may employ third-party companies and individuals to facilitate our service, provide the service on our behalf,
                            or assist us in analyzing how our service is used. These third parties have access to your personal information only
                            to perform these tasks on our behalf and are obligated not to disclose or use it for any other purpose.
                        </p>
                    </div>

                    {/* Changes to Privacy Policy */}
                    <div className="bg-white rounded-xl shadow-md border-2 border-gray-200 p-6">
                        <h2 className="text-xl font-bold text-gray-900 mb-3">Changes to This Privacy Policy</h2>
                        <p className="text-gray-700 leading-relaxed">
                            We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy
                            on this page and updating the "Last updated" date.
                        </p>
                    </div>

                    {/* Contact */}
                    <div className="bg-white rounded-xl shadow-md border-2 border-gray-200 p-6">
                        <h2 className="text-xl font-bold text-gray-900 mb-3">Contact Us</h2>
                        <p className="text-gray-700 leading-relaxed">
                            If you have any questions about this Privacy Policy, please contact us at privacy@suvidha.gov.in
                        </p>
                    </div>

                </div>
            </section>

            <Footer />
        </div>
    );
};

export default PrivacyPolicy;
