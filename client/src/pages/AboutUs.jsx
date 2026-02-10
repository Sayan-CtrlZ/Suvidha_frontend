import React from 'react';
import { Building2, Users, Target, Award, Heart, Globe } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import TopBar from '../components/common/TopBar';
import NavBar from '../components/common/NavBar';
import AnimatedBackground from '../components/common/AnimatedBackground';
import Footer from '../components/common/Footer';
import PageHeader from '../components/common/PageHeader';

const AboutUs = () => {
    const { t } = useLanguage();

    return (
        <div className="min-h-screen flex flex-col">
            <TopBar />
            <AnimatedBackground />
            <NavBar />

            <PageHeader
                title="About SUVIDHA"
                description="Empowering citizens through digital governance"
                icon={Building2}
                watermarkIcon={Building2}
                to="/"
                gradient="bg-gradient-to-br from-indigo-900 via-purple-800 to-indigo-900"
                stripeColor="via-indigo-400/30"
                orb1Color="from-indigo-400/15 to-purple-500/15"
                orb2Color="from-purple-400/10 to-indigo-500/10"
            />

            {/* Content */}
            <section className="py-6 sm:py-10 px-3 sm:px-6">
                <div className="max-w-7xl mx-auto space-y-6">

                    {/* Mission */}
                    <div className="bg-white rounded-xl shadow-md border-2 border-gray-200 p-6">
                        <div className="flex items-center gap-3 mb-4">
                            <div className="w-12 h-12 rounded-xl bg-indigo-100 flex items-center justify-center">
                                <Target size={24} className="text-indigo-600" />
                            </div>
                            <h2 className="text-xl font-bold text-gray-900">Our Mission</h2>
                        </div>
                        <p className="text-gray-700 leading-relaxed">
                            SUVIDHA is committed to providing seamless, efficient, and transparent municipal services to all citizens.
                            We leverage technology to bridge the gap between government and people, making essential services accessible
                            to everyone, anywhere, anytime.
                        </p>
                    </div>

                    {/* Vision */}
                    <div className="bg-white rounded-xl shadow-md border-2 border-gray-200 p-6">
                        <div className="flex items-center gap-3 mb-4">
                            <div className="w-12 h-12 rounded-xl bg-purple-100 flex items-center justify-center">
                                <Globe size={24} className="text-purple-600" />
                            </div>
                            <h2 className="text-xl font-bold text-gray-900">Our Vision</h2>
                        </div>
                        <p className="text-gray-700 leading-relaxed">
                            To create a digitally empowered society where every citizen has easy access to government services,
                            fostering transparency, accountability, and efficiency in public administration.
                        </p>
                    </div>

                    {/* Values */}
                    <div className="bg-white rounded-xl shadow-md border-2 border-gray-200 p-6">
                        <div className="flex items-center gap-3 mb-4">
                            <div className="w-12 h-12 rounded-xl bg-pink-100 flex items-center justify-center">
                                <Heart size={24} className="text-pink-600" />
                            </div>
                            <h2 className="text-xl font-bold text-gray-900">Our Values</h2>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                            <div className="p-4 bg-gray-50 rounded-lg">
                                <h3 className="font-bold text-gray-900 mb-2">Transparency</h3>
                                <p className="text-sm text-gray-600">Open and honest communication in all our operations</p>
                            </div>
                            <div className="p-4 bg-gray-50 rounded-lg">
                                <h3 className="font-bold text-gray-900 mb-2">Accessibility</h3>
                                <p className="text-sm text-gray-600">Services available to all citizens without barriers</p>
                            </div>
                            <div className="p-4 bg-gray-50 rounded-lg">
                                <h3 className="font-bold text-gray-900 mb-2">Efficiency</h3>
                                <p className="text-sm text-gray-600">Quick and effective service delivery</p>
                            </div>
                            <div className="p-4 bg-gray-50 rounded-lg">
                                <h3 className="font-bold text-gray-900 mb-2">Innovation</h3>
                                <p className="text-sm text-gray-600">Continuous improvement through technology</p>
                            </div>
                        </div>
                    </div>

                    {/* Services */}
                    <div className="bg-white rounded-xl shadow-md border-2 border-gray-200 p-6">
                        <div className="flex items-center gap-3 mb-4">
                            <div className="w-12 h-12 rounded-xl bg-blue-100 flex items-center justify-center">
                                <Award size={24} className="text-blue-600" />
                            </div>
                            <h2 className="text-xl font-bold text-gray-900">What We Offer</h2>
                        </div>
                        <ul className="space-y-2 text-gray-700">
                            <li className="flex items-start gap-2">
                                <span className="text-indigo-600 mt-1">•</span>
                                <span>Electricity, Gas, and Water bill payments and new connections</span>
                            </li>
                            <li className="flex items-start gap-2">
                                <span className="text-indigo-600 mt-1">•</span>
                                <span>Waste management services and schedules</span>
                            </li>
                            <li className="flex items-start gap-2">
                                <span className="text-indigo-600 mt-1">•</span>
                                <span>Municipal grievance registration and tracking</span>
                            </li>
                            <li className="flex items-start gap-2">
                                <span className="text-indigo-600 mt-1">•</span>
                                <span>24/7 customer support and assistance</span>
                            </li>
                        </ul>
                    </div>

                </div>
            </section>

            <Footer />
        </div>
    );
};

export default AboutUs;
