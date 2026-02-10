import React, { useState } from 'react';
import { Phone, Mail, MapPin, Clock, MessageSquare, CheckCircle } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { useFormValidation } from '../hooks';
import TopBar from '../components/common/TopBar';
import NavBar from '../components/common/NavBar';
import AnimatedBackground from '../components/common/AnimatedBackground';
import Footer from '../components/common/Footer';
import PageHeader from '../components/common/PageHeader';

const ContactUs = () => {
    const { t } = useLanguage();
    const [isSubmitted, setIsSubmitted] = useState(false);

    const validationRules = {
        name: { required: true, message: t('contact.validation.nameRequired') },
        email: { required: true, pattern: /\S+@\S+\.\S+/, message: t('contact.validation.emailInvalid') },
        subject: { required: true, message: t('contact.validation.subjectRequired') },
        message: { required: true, pattern: /.{10,}/, message: t('contact.validation.messageTooShort') }
    };

    const initialValues = {
        name: '',
        email: '',
        subject: '',
        message: ''
    };

    const handleOnSubmit = async (data) => {
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1500));
        setIsSubmitted(true);
        resetForm();
    };

    const {
        values,
        errors,
        setFieldValue,
        handleSubmit,
        isSubmitting,
        resetForm
    } = useFormValidation(initialValues, validationRules, handleOnSubmit);

    // Standard input change handler
    const handleChange = (e) => {
        setFieldValue(e.target.name, e.target.value);
    };
    return (
        <div className="min-h-screen flex flex-col">
            <TopBar />
            <AnimatedBackground />
            <NavBar />

            <PageHeader
                title={t('contact.title')}
                description={t('contact.subtitle')}
                icon={MessageSquare}
                watermarkIcon={MessageSquare}
                to="/"
                gradient="bg-gradient-to-br from-teal-900 via-cyan-800 to-teal-900"
                stripeColor="via-teal-400/30"
                orb1Color="from-teal-400/15 to-cyan-500/15"
                orb2Color="from-teal-400/10 to-teal-500/10"
            />

            {/* Content */}
            <section className="py-6 sm:py-10 px-3 sm:px-6">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8">

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {/* Contact Information */}
                        <div className="space-y-4">
                            <div className="bg-white rounded-xl shadow-md border-2 border-gray-100 p-6 hover:border-teal-200 transition-all">
                                <div className="flex items-center gap-4">
                                    <div className="w-12 h-12 rounded-lg bg-teal-50 flex items-center justify-center shrink-0">
                                        <Phone size={24} className="text-teal-600" />
                                    </div>
                                    <div>
                                        <h3 className="font-bold text-gray-900">{t('contact.info.phone')}</h3>
                                        <p className="text-sm text-gray-600">1800-234-9876 (Toll Free)</p>
                                    </div>
                                </div>
                            </div>

                            <div className="bg-white rounded-xl shadow-md border-2 border-gray-100 p-6 hover:border-cyan-200 transition-all">
                                <div className="flex items-center gap-4">
                                    <div className="w-12 h-12 rounded-lg bg-cyan-50 flex items-center justify-center shrink-0">
                                        <Mail size={24} className="text-cyan-600" />
                                    </div>
                                    <div>
                                        <h3 className="font-bold text-gray-900">{t('contact.info.email')}</h3>
                                        <p className="text-sm text-gray-600">helpdesk@suvidha.gov.in</p>
                                    </div>
                                </div>
                            </div>

                            <div className="bg-white rounded-xl shadow-md border-2 border-gray-100 p-6 hover:border-blue-200 transition-all">
                                <div className="flex items-center gap-4">
                                    <div className="w-12 h-12 rounded-lg bg-blue-50 flex items-center justify-center shrink-0">
                                        <MapPin size={24} className="text-blue-600" />
                                    </div>
                                    <div>
                                        <h3 className="font-bold text-gray-900">{t('contact.info.address')}</h3>
                                        <p className="text-sm text-gray-600 leading-relaxed">
                                            Suvidha Bhavan, Block-B<br />
                                            Civic Centre, Sector 18<br />
                                            New Delhi - 110001
                                        </p>
                                    </div>
                                </div>
                            </div>

                            <div className="bg-white rounded-xl shadow-md border-2 border-gray-100 p-6 hover:border-purple-200 transition-all">
                                <div className="flex items-center gap-4">
                                    <div className="w-12 h-12 rounded-lg bg-purple-50 flex items-center justify-center shrink-0">
                                        <Clock size={24} className="text-purple-600" />
                                    </div>
                                    <div>
                                        <h3 className="font-bold text-gray-900">{t('contact.info.hours')}</h3>
                                        <div className="text-sm text-gray-600 space-y-1">
                                            <p>Mon - Fri: 9:00 AM - 6:00 PM</p>
                                            <p>Saturday: 10:00 AM - 4:00 PM</p>
                                            <p>Sunday: Closed</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Contact Form */}
                        <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-8 relative overflow-hidden">
                            {isSubmitted ? (
                                <div className="h-full flex flex-col items-center justify-center text-center animate-in fade-in zoom-in duration-500">
                                    <div className="w-20 h-20 bg-teal-100 rounded-full flex items-center justify-center mb-4 text-teal-600">
                                        <CheckCircle size={48} />
                                    </div>
                                    <h2 className="text-2xl font-bold text-gray-900 mb-2">{t('common.success')}</h2>
                                    <p className="text-gray-600 mb-8 max-w-sm">
                                        {t('contact.success')}
                                    </p>
                                    <button
                                        onClick={() => setIsSubmitted(false)}
                                        className="px-8 py-3 bg-teal-600 text-white rounded-xl font-bold hover:bg-teal-700 transition-colors shadow-md"
                                    >
                                        {t('progress.done')}
                                    </button>
                                </div>
                            ) : (
                                <>
                                    <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                                        <MessageSquare size={24} className="text-teal-600" />
                                        {t('contact.formTitle')}
                                    </h2>
                                    <form onSubmit={handleSubmit} className="space-y-5">
                                        <div className="space-y-1.5">
                                            <label className="text-xs font-black text-gray-500 uppercase tracking-widest ml-1">
                                                {t('contact.name')}
                                            </label>
                                            <input
                                                type="text"
                                                name="name"
                                                value={values.name}
                                                onChange={handleChange}
                                                className={`w-full px-4 py-3 border-2 rounded-xl focus:outline-none transition-all ${errors.name
                                                    ? 'border-red-300 focus:border-red-500 bg-red-50'
                                                    : 'border-gray-100 focus:border-teal-400'
                                                    }`}
                                                placeholder={t('contact.namePlaceholder')}
                                            />
                                            {errors.name && (
                                                <p className="text-red-500 text-xs font-semibold ml-1">{errors.name}</p>
                                            )}
                                        </div>

                                        <div className="space-y-1.5">
                                            <label className="text-xs font-black text-gray-500 uppercase tracking-widest ml-1">
                                                {t('contact.email')}
                                            </label>
                                            <input
                                                type="email"
                                                name="email"
                                                value={values.email}
                                                onChange={handleChange}
                                                className={`w-full px-4 py-3 border-2 rounded-xl focus:outline-none transition-all ${errors.email
                                                    ? 'border-red-300 focus:border-red-500 bg-red-50'
                                                    : 'border-gray-100 focus:border-teal-400'
                                                    }`}
                                                placeholder={t('contact.emailPlaceholder')}
                                            />
                                            {errors.email && (
                                                <p className="text-red-500 text-xs font-semibold ml-1">{errors.email}</p>
                                            )}
                                        </div>

                                        <div className="space-y-1.5">
                                            <label className="text-xs font-black text-gray-500 uppercase tracking-widest ml-1">
                                                {t('contact.subject')}
                                            </label>
                                            <input
                                                type="text"
                                                name="subject"
                                                value={values.subject}
                                                onChange={handleChange}
                                                className={`w-full px-4 py-3 border-2 rounded-xl focus:outline-none transition-all ${errors.subject
                                                    ? 'border-red-300 focus:border-red-500 bg-red-50'
                                                    : 'border-gray-100 focus:border-teal-400'
                                                    }`}
                                                placeholder={t('contact.subjectPlaceholder')}
                                            />
                                            {errors.subject && (
                                                <p className="text-red-500 text-xs font-semibold ml-1">{errors.subject}</p>
                                            )}
                                        </div>

                                        <div className="space-y-1.5">
                                            <label className="text-xs font-black text-gray-500 uppercase tracking-widest ml-1">
                                                {t('contact.message')}
                                            </label>
                                            <textarea
                                                name="message"
                                                value={values.message}
                                                onChange={handleChange}
                                                rows={4}
                                                className={`w-full px-4 py-3 border-2 rounded-xl focus:outline-none transition-all resize-none ${errors.message
                                                    ? 'border-red-300 focus:border-red-500 bg-red-50'
                                                    : 'border-gray-100 focus:border-teal-400'
                                                    }`}
                                                placeholder={t('contact.messagePlaceholder')}
                                            />
                                            {errors.message && (
                                                <p className="text-red-500 text-xs font-semibold ml-1">{errors.message}</p>
                                            )}
                                        </div>

                                        <button
                                            type="submit"
                                            disabled={isSubmitting}
                                            className={`w-full px-6 py-4 rounded-xl font-extrabold text-white transition-all shadow-md mt-2 flex items-center justify-center gap-2 ${isSubmitting
                                                ? 'bg-gray-400 cursor-not-allowed'
                                                : 'bg-gradient-to-r from-teal-600 to-teal-700 hover:from-teal-700 hover:to-teal-800 active:scale-[0.98]'
                                                }`}
                                        >
                                            {isSubmitting ? (
                                                <>
                                                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                                    {t('common.loading')}
                                                </>
                                            ) : (
                                                t('contact.sendMessage')
                                            )}
                                        </button>
                                    </form>
                                </>
                            )}
                        </div>
                    </div>

                </div>
            </section>

            {/* Additional Contact Sections */}
            <section className="py-12 bg-gray-50 border-t border-gray-200">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

                    {/* Emergency Contacts */}
                    <div className="mb-16">
                        <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Emergency & Helplines</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                            {[
                                { title: "Police Control Room", number: "100", color: "bg-red-50 text-red-700 hover:border-red-300" },
                                { title: "Fire & Rescue", number: "101", color: "bg-orange-50 text-orange-700 hover:border-orange-300" },
                                { title: "Ambulance", number: "102", color: "bg-blue-50 text-blue-700 hover:border-blue-300" },
                                { title: "Women Helpline", number: "1091", color: "bg-pink-50 text-pink-700 hover:border-pink-300" },
                                { title: "Electricity Complaint", number: "1912", color: "bg-yellow-50 text-yellow-700 hover:border-yellow-300" },
                                { title: "Water Supply Issue", number: "1916", color: "bg-cyan-50 text-cyan-700 hover:border-cyan-300" },
                                { title: "Gas Leakage", number: "1906", color: "bg-emerald-50 text-emerald-700 hover:border-emerald-300" },
                                { title: "Child Helpline", number: "1098", color: "bg-indigo-50 text-indigo-700 hover:border-indigo-300" },
                            ].map((item, index) => (
                                <div key={index} className={`p-6 rounded-xl border-2 border-transparent transition-all shadow-sm hover:shadow-md cursor-pointer text-center ${item.color}`}>
                                    <h3 className="font-bold text-lg mb-1">{item.title}</h3>
                                    <p className="text-3xl font-extrabold">{item.number}</p>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Department Directory */}
                    <div className="mb-16">
                        <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Department Directory</h2>
                        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
                            <div className="overflow-x-auto">
                                <table className="w-full text-left border-collapse">
                                    <thead>
                                        <tr className="bg-gray-800 text-white">
                                            <th className="p-4 font-semibold text-sm uppercase tracking-wide">Department</th>
                                            <th className="p-4 font-semibold text-sm uppercase tracking-wide">Designation</th>
                                            <th className="p-4 font-semibold text-sm uppercase tracking-wide">Phone</th>
                                            <th className="p-4 font-semibold text-sm uppercase tracking-wide">Email</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-gray-100">
                                        {[
                                            { dept: "Electricity Department", person: "Chief Engineer", phone: "+91 98765 43210", email: "electricity@suvidha.gov.in" },
                                            { dept: "Water Supply Div", person: "Executive Engineer", phone: "+91 98765 43211", email: "water@suvidha.gov.in" },
                                            { dept: "Waste Management", person: "Health Officer", phone: "+91 98765 43212", email: "waste@suvidha.gov.in" },
                                            { dept: "Roads & Highway", person: "Superintendent", phone: "+91 98765 43213", email: "roads@suvidha.gov.in" },
                                            { dept: "Health & Sanitation", person: "Chief Medical Officer", phone: "+91 98765 43214", email: "health@suvidha.gov.in" },
                                        ].map((row, i) => (
                                            <tr key={i} className="hover:bg-gray-50 transition-colors">
                                                <td className="p-4 font-medium text-gray-900">{row.dept}</td>
                                                <td className="p-4 text-gray-600">{row.person}</td>
                                                <td className="p-4 font-mono text-gray-700">{row.phone}</td>
                                                <td className="p-4 text-teal-600 hover:underline cursor-pointer">{row.email}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>

                    {/* Map Section */}
                    <div>
                        <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Find Us on Map</h2>
                        <div className="bg-white p-2 rounded-2xl shadow-lg border border-gray-200">
                            <iframe
                                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d224097.6223293699!2d76.95317926250002!3d28.643999999999995!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390cfd5b347eb62d%3A0x37205b715389640!2sDelhi!5e0!3m2!1sen!2sin!4v1707204561234!5m2!1sen!2sin"
                                width="100%"
                                height="450"
                                style={{ border: 0, borderRadius: '1rem' }}
                                allowFullScreen=""
                                loading="lazy"
                                referrerPolicy="no-referrer-when-downgrade"
                            ></iframe>
                        </div>
                    </div>

                </div>
            </section>

            <Footer />
        </div>
    );
};

export default ContactUs;
