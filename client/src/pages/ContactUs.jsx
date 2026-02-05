import React, { useState } from 'react';
import { Phone, Mail, MapPin, Clock, MessageSquare, CheckCircle } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { useFormValidation } from '../hooks';
import TopBar from '../components/common/TopBar';
import NavBar from '../components/common/NavBar';
import AnimatedBackground from '../components/common/AnimatedBackground';
import Footer from '../components/common/Footer';
import BackButton from '../components/common/BackButton';

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

            {/* Page Header */}
            <section className="w-full pt-2 md:pt-3 pb-4 md:pb-5 px-3 sm:px-6 bg-gradient-to-br from-teal-900 via-cyan-800 to-teal-900 shadow-2xl relative overflow-hidden">
                <div className="max-w-7xl mx-auto relative z-10">
                    <BackButton
                        to="/"
                        text={t('common.back')}
                        className="mb-6 scale-90 origin-left !bg-white/10 !text-white !border-white/20 hover:!bg-white/20"
                    />
                    <div className="flex items-center gap-4">
                        <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-xl bg-white/20 backdrop-blur-sm flex items-center justify-center border-2 border-white/30">
                            <MessageSquare size={32} className="text-white" />
                        </div>
                        <div>
                            <h1 className="text-2xl sm:text-3xl font-bold text-white tracking-wide uppercase">
                                {t('contact.title')}
                            </h1>
                            <p className="text-teal-50 text-sm sm:text-base mt-1 font-medium">
                                {t('contact.subtitle')}
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Content */}
            <section className="py-6 sm:py-10 px-3 sm:px-6">
                <div className="max-w-5xl mx-auto space-y-6">

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
                                        <p className="text-sm text-gray-600">1800-XXX-XXXX ({t('contact.info.tollFree')})</p>
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
                                        <p className="text-sm text-gray-600">support@suvidha.gov.in</p>
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
                                            Municipal Corporation Building<br />
                                            City Center, Kolkata - 700001<br />
                                            West Bengal, India
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
                                            <p>{t('contact.info.workingHours.monFri')}</p>
                                            <p>{t('contact.info.workingHours.sat')}</p>
                                            <p>{t('contact.info.workingHours.sun')}</p>
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
                                            <label className="text-sm font-bold text-gray-700 ml-1">
                                                {t('contact.name')}
                                            </label>
                                            <input
                                                type="text"
                                                name="name"
                                                value={values.name}
                                                onChange={handleChange}
                                                onBlur={handleBlur}
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
                                            <label className="text-sm font-bold text-gray-700 ml-1">
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
                                            <label className="text-sm font-bold text-gray-700 ml-1">
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
                                            <label className="text-sm font-bold text-gray-700 ml-1">
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

            <Footer />
        </div>
    );
};

export default ContactUs;
