import React, { useState, useRef } from 'react';
import {
  User, MapPin, Zap, FileCheck, CheckCircle2, ChevronRight, ChevronLeft,
  Upload, Camera, Shield, Phone, Mail, FileText, Building2, Home, Factory,
  Tractor, AlertCircle, Printer, Download, CreditCard, Check, Loader2,
  IndianRupee, MessageSquare, ArrowRight, ArrowLeft
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '../../context/LanguageContext';
import TopBar from '../../components/common/TopBar';
import NavBar from '../../components/common/NavBar';
import Footer from '../../components/common/Footer';
import PageHeader from '../../components/common/PageHeader';
import AnimatedBackground from '../../components/common/AnimatedBackground';
import { useMultiStepForm, useFormValidation } from '../../hooks';

const NewConnectionPage = () => {
  const { t } = useLanguage();
  const navigate = useNavigate();
  const {
    currentStep,
    next: nextStep,
    back: backStep,
    goTo: goToStep,
    isFirstStep,
    isLastStep
  } = useMultiStepForm(5);

  const validationRules = {
    fullName: { required: true, message: t('newConnection.validation.nameRequired') },
    mobile: { required: true, pattern: /^\d{10}$/, message: t('newConnection.validation.mobileInvalid') },
    email: { required: true, pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, message: t('newConnection.validation.emailInvalid') },
    idProofType: { required: true, message: t('newConnection.validation.idProofRequired') },
    documentNumber: { required: true, message: t('newConnection.validation.documentNoRequired') },
    documentFront: { required: true, message: t('newConnection.validation.documentRequired') },
    houseNo: { required: true, message: t('newConnection.validation.addressRequired') },
    street: { required: true, message: t('newConnection.validation.addressRequired') },
    state: { required: true, message: t('newConnection.validation.stateRequired') },
    district: { required: true, message: t('newConnection.validation.districtRequired') },
    city: { required: true, message: t('newConnection.validation.addressRequired') },
    pincode: { required: true, pattern: /^\d{6}$/, message: t('newConnection.validation.pincodeInvalid') },
    connectionType: { required: true, message: t('newConnection.validation.connectionTypeRequired') },
    loadRequired: { required: true, message: t('newConnection.validation.loadRequired') },
    termsAccepted: { required: true, message: t('newConnection.validation.termsRequired') }
  };

  const {
    values: formData,
    errors,
    setFieldValue,
    setValues,
    validateForm,
    isSubmitting,
    handleSubmit: handleFormSubmit
  } = useFormValidation({
    fullName: '', mobile: '', email: '', idProofType: '', documentNumber: '',
    documentFront: null, documentBack: null, documentFrontPreview: null, documentBackPreview: null,
    houseNo: '', street: '', landmark: '', state: '', district: '', subdivision: '', city: '', pincode: '',
    ownershipType: 'owned', connectionType: 'domestic', loadRequired: '', phase: 'single', purpose: '',
    termsAccepted: false
  }, validationRules, async (values) => {
    // This is called by final submit
    await new Promise(resolve => setTimeout(resolve, 2500));
    goToStep(5);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  const fileInputRef = useRef(null);
  const fileInputBackRef = useRef(null);

  const [isVerifying, setIsVerifying] = useState(false);
  const [documentVerified, setDocumentVerified] = useState(false);

  // Dropdown data
  const states = [
    'Andhra Pradesh', 'Arunachal Pradesh', 'Assam', 'Bihar', 'Chhattisgarh',
    'Goa', 'Gujarat', 'Haryana', 'Himachal Pradesh', 'Jharkhand', 'Karnataka',
    'Kerala', 'Madhya Pradesh', 'Maharashtra', 'Manipur', 'Meghalaya', 'Mizoram',
    'Nagaland', 'Odisha', 'Punjab', 'Rajasthan', 'Sikkim', 'Tamil Nadu',
    'Telangana', 'Tripura', 'Uttar Pradesh', 'Uttarakhand', 'West Bengal',
    'Delhi', 'Jammu & Kashmir', 'Ladakh', 'Puducherry'
  ];

  const loadOptions = ['1 kW', '2 kW', '3 kW', '5 kW', '7 kW', '10 kW', '15 kW', '20 kW', '25 kW', '50 kW', '100 kW'];

  // Cost calculation
  const getCostBreakdown = () => {
    const baseCosts = {
      domestic: { deposit: 1500, processing: 500 },
      commercial: { deposit: 5000, processing: 1000 },
      industrial: { deposit: 15000, processing: 2500 },
      agricultural: { deposit: 2000, processing: 300 }
    };

    const loadMultiplier = parseFloat(formData.loadRequired) || 1;
    const costs = baseCosts[formData.connectionType] || baseCosts.domestic;

    return {
      securityDeposit: costs.deposit * Math.max(1, loadMultiplier / 5),
      processingFee: costs.processing,
      total: costs.deposit * Math.max(1, loadMultiplier / 5) + costs.processing
    };
  };

  const steps = [
    { id: 1, name: t('newConnection.steps.applicant'), icon: User },
    { id: 2, name: t('newConnection.steps.address'), icon: MapPin },
    { id: 3, name: t('newConnection.steps.connection'), icon: Zap },
    { id: 4, name: t('newConnection.steps.review'), icon: FileCheck },
    { id: 5, name: t('newConnection.steps.confirmation'), icon: CheckCircle2 }
  ];

  const handleChange = (field, value) => {
    setFieldValue(field, value);
  };

  const handleFileUpload = (e, type) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        alert('File size should be less than 5MB');
        return;
      }
      const reader = new FileReader();
      reader.onload = (event) => {
        if (type === 'front') {
          setValues({
            ...formData,
            documentFront: file,
            documentFrontPreview: event.target.result
          });
        } else {
          setValues({
            ...formData,
            documentBack: file,
            documentBackPreview: event.target.result
          });
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const verifyDocument = async () => {
    setIsVerifying(true);
    // Simulate API verification
    await new Promise(resolve => setTimeout(resolve, 2000));
    setIsVerifying(false);
    setDocumentVerified(true);
  };

  const validateStep = async (step) => {
    const currentValues = formData;
    const stepFields = {
      1: ['fullName', 'mobile', 'email', 'idProofType', 'documentNumber', 'documentFront'],
      2: ['houseNo', 'street', 'state', 'district', 'city', 'pincode'],
      3: ['connectionType', 'loadRequired'],
      4: ['termsAccepted']
    };

    const fieldsToValidate = stepFields[step] || [];
    const stepErrors = await validateForm();

    // Add custom verification check for step 1
    if (step === 1 && !documentVerified) {
      setFieldValue('verification', t('newConnection.validation.verificationRequired'));
      return false;
    }

    const hasStepErrors = fieldsToValidate.some(field => !!stepErrors[field]);
    return !hasStepErrors;
  };

  const handleNext = async () => {
    const isValid = await validateStep(currentStep);
    if (isValid) {
      nextStep();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleBack = () => {
    backStep();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSubmit = async (e) => {
    if (e) e.preventDefault();
    handleFormSubmit();
  };

  const generateApplicationNo = () => {
    return `ELEC-${new Date().getFullYear()}-${Math.random().toString(36).substr(2, 9).toUpperCase()}`;
  };

  const generateTransactionId = () => {
    return `TXN-${Date.now()}-${Math.random().toString(36).substr(2, 6).toUpperCase()}`;
  };

  const handlePrint = () => {
    window.print();
  };

  const costs = getCostBreakdown();

  return (
    <div className="min-h-screen flex flex-col">
      <AnimatedBackground />
      <TopBar />
      <NavBar />

      {/* Page Header - Enhanced Aesthetic */}
      <PageHeader
        title={t('newConnection.title')}
        description={t('newConnection.subtitle')}
        icon={Zap}
        watermarkIcon={Zap}
        to="/services/electricity"
        backText="Back"
        gradient="bg-gradient-to-br from-violet-900 via-purple-800 to-violet-900"
        stripeColor="via-violet-400/30"
        orb1Color="from-violet-400/30 to-purple-500/30"
        orb2Color="from-indigo-400/25 to-violet-500/25"
      />

      {/* Main Content */}
      <main className="flex-1 px-4 sm:px-6 lg:px-8 py-8 relative z-10">
        <div className="max-w-5xl mx-auto">


          {/* Progress Section */}
          <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-4 sm:p-6 mb-6">
            <div className="flex items-center justify-between max-w-4xl mx-auto">
              {steps.map((step, index) => (
                <React.Fragment key={step.id}>
                  <div className="flex flex-col items-center">
                    <div className={`w-10 h-10 sm:w-12 sm:h-12 rounded-full flex items-center justify-center transition-colors ${currentStep > step.id
                      ? 'bg-violet-600 text-white'
                      : currentStep === step.id
                        ? 'bg-violet-600 text-white ring-4 ring-violet-200'
                        : 'bg-gray-200 text-gray-500'
                      }`}>
                      {currentStep > step.id ? (
                        <Check size={20} />
                      ) : (
                        <step.icon size={20} />
                      )}
                    </div>
                    <span className={`text-xs sm:text-sm mt-2 font-medium text-center max-w-[70px] sm:max-w-none ${currentStep >= step.id ? 'text-violet-700' : 'text-gray-500'
                      }`}>
                      {step.name}
                    </span>
                  </div>
                  {index < steps.length - 1 && (
                    <div className={`flex-1 h-1 mx-2 sm:mx-4 rounded-full ${currentStep > step.id ? 'bg-violet-500' : 'bg-gray-200'
                      }`} />
                  )}
                </React.Fragment>
              ))}
            </div>
          </div>

          {/* Form Card */}
          <div className="bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden">
            {/* Form Content */}
            <div className="p-4 sm:p-8">
              {/* Step 1: Applicant Details */}
              {currentStep === 1 && (
                <div className="space-y-6">
                  <div className="flex items-center gap-3 mb-8">
                    <div className="w-12 h-12 rounded-xl bg-violet-100 flex items-center justify-center">
                      <User size={24} className="text-violet-600" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-gray-900">{t('newConnection.applicantDetails.title')}</h3>
                      <p className="text-sm text-gray-600">{t('newConnection.applicantDetails.desc')}</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    {/* Full Name */}
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        {t('newConnection.applicantDetails.fullName')} <span className="text-red-500">*</span>
                      </label>
                      <div className="relative">
                        <User size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                        <input
                          type="text"
                          value={formData.fullName}
                          onChange={(e) => handleChange('fullName', e.target.value)}
                          placeholder={t('newConnection.applicantDetails.enterFullName')}
                          className={`w-full pl-10 pr-4 py-3 border-2 rounded-xl focus:outline-none transition-colors ${errors.fullName ? 'border-red-300 focus:border-red-400' : 'border-gray-200 focus:border-violet-400'
                            }`}
                        />
                      </div>
                      {errors.fullName && <p className="text-xs text-red-500 mt-1">{errors.fullName}</p>}
                    </div>

                    {/* Mobile Number */}
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        {t('newConnection.applicantDetails.mobile')} <span className="text-red-500">*</span>
                      </label>
                      <div className="relative">
                        <Phone size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                        <input
                          type="tel"
                          value={formData.mobile}
                          onChange={(e) => handleChange('mobile', e.target.value.replace(/\D/g, '').slice(0, 10))}
                          placeholder={t('newConnection.applicantDetails.enterMobile')}
                          className={`w-full pl-10 pr-4 py-3 border-2 rounded-xl focus:outline-none transition-colors ${errors.mobile ? 'border-red-300 focus:border-red-400' : 'border-gray-200 focus:border-violet-400'
                            }`}
                        />
                      </div>
                      {errors.mobile && <p className="text-xs text-red-500 mt-1">{errors.mobile}</p>}
                    </div>

                    {/* Email */}
                    <div className="sm:col-span-2">
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        {t('newConnection.applicantDetails.email')} <span className="text-red-500">*</span>
                      </label>
                      <div className="relative">
                        <Mail size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                        <input
                          type="email"
                          value={formData.email}
                          onChange={(e) => handleChange('email', e.target.value)}
                          placeholder={t('newConnection.applicantDetails.enterEmail')}
                          className={`w-full pl-10 pr-4 py-3 border-2 rounded-xl focus:outline-none transition-colors ${errors.email ? 'border-red-300 focus:border-red-400' : 'border-gray-200 focus:border-violet-400'
                            }`}
                        />
                      </div>
                      {errors.email && <p className="text-xs text-red-500 mt-1">{errors.email}</p>}
                    </div>

                    {/* ID Proof Type */}
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        {t('newConnection.applicantDetails.idProof')} <span className="text-red-500">*</span>
                      </label>
                      <div className="relative">
                        <FileText size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                        <select
                          value={formData.idProofType}
                          onChange={(e) => handleChange('idProofType', e.target.value)}
                          className={`w-full pl-10 pr-4 py-3 border-2 rounded-xl focus:outline-none transition-colors appearance-none bg-white ${errors.idProofType ? 'border-red-300 focus:border-red-400' : 'border-gray-200 focus:border-violet-400'
                            }`}
                        >
                          <option value="">{t('newConnection.applicantDetails.selectIdProof')}</option>
                          <option value="aadhaar">{t('newConnection.applicantDetails.idTypes.aadhaar')}</option>
                          <option value="pan">{t('newConnection.applicantDetails.idTypes.pan')}</option>
                          <option value="voter">{t('newConnection.applicantDetails.idTypes.voter')}</option>
                          <option value="driving">{t('newConnection.applicantDetails.idTypes.driving')}</option>
                          <option value="passport">{t('newConnection.applicantDetails.idTypes.passport')}</option>
                        </select>
                      </div>
                      {errors.idProofType && <p className="text-xs text-red-500 mt-1">{errors.idProofType}</p>}
                    </div>

                    {/* Document Number */}
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        {t('newConnection.applicantDetails.documentNumber')} <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        value={formData.documentNumber}
                        onChange={(e) => handleChange('documentNumber', e.target.value.toUpperCase())}
                        placeholder={t('newConnection.applicantDetails.enterDocNumber')}
                        className={`w-full px-4 py-3 border-2 rounded-xl focus:outline-none transition-colors ${errors.documentNumber ? 'border-red-300 focus:border-red-400' : 'border-gray-200 focus:border-violet-400'
                          }`}
                      />
                      {errors.documentNumber && <p className="text-xs text-red-500 mt-1">{errors.documentNumber}</p>}
                    </div>
                  </div>

                  {/* Document Upload Section */}
                  <div className="mt-8 p-5 bg-gray-50 rounded-2xl border-2 border-gray-200">
                    <h4 className="text-sm font-semibold text-gray-800 mb-4 flex items-center gap-2">
                      <Upload size={18} className="text-violet-600" />
                      {t('newConnection.applicantDetails.uploadDocument')}
                    </h4>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      {/* Front Side Upload */}
                      <div>
                        <p className="text-xs font-medium text-gray-600 mb-2">
                          {t('newConnection.applicantDetails.uploadFront')} <span className="text-red-500">*</span>
                        </p>
                        <input
                          type="file"
                          ref={fileInputRef}
                          onChange={(e) => handleFileUpload(e, 'front')}
                          accept="image/*,.pdf"
                          className="hidden"
                        />
                        {formData.documentFrontPreview ? (
                          <div className="relative rounded-xl overflow-hidden border-2 border-violet-300 bg-violet-50">
                            <img
                              src={formData.documentFrontPreview}
                              alt="Document Front"
                              className="w-full h-40 object-cover"
                            />
                            <button
                              onClick={() => fileInputRef.current?.click()}
                              className="absolute inset-0 bg-black/40 flex items-center justify-center text-white opacity-0 hover:opacity-100 transition-opacity"
                            >
                              <Camera size={28} />
                            </button>
                            <div className="absolute top-2 right-2 w-7 h-7 bg-violet-500 rounded-full flex items-center justify-center">
                              <Check size={16} className="text-white" />
                            </div>
                          </div>
                        ) : (
                          <button
                            onClick={() => fileInputRef.current?.click()}
                            className={`w-full h-40 border-2 border-dashed rounded-xl flex flex-col items-center justify-center gap-2 hover:border-violet-400 hover:bg-violet-50 transition-colors ${errors.documentFront ? 'border-red-300 bg-red-50' : 'border-gray-300'
                              }`}
                          >
                            <Upload size={28} className="text-gray-400" />
                            <span className="text-sm text-gray-500 text-center px-4">{t('newConnection.applicantDetails.dragDrop')}</span>
                          </button>
                        )}
                        {errors.documentFront && <p className="text-xs text-red-500 mt-1">{errors.documentFront}</p>}
                      </div>

                      {/* Back Side Upload */}
                      <div>
                        <p className="text-xs font-medium text-gray-600 mb-2">
                          {t('newConnection.applicantDetails.uploadBack')}
                        </p>
                        <input
                          type="file"
                          ref={fileInputBackRef}
                          onChange={(e) => handleFileUpload(e, 'back')}
                          accept="image/*,.pdf"
                          className="hidden"
                        />
                        {formData.documentBackPreview ? (
                          <div className="relative rounded-xl overflow-hidden border-2 border-violet-300 bg-violet-50">
                            <img
                              src={formData.documentBackPreview}
                              alt="Document Back"
                              className="w-full h-40 object-cover"
                            />
                            <button
                              onClick={() => fileInputBackRef.current?.click()}
                              className="absolute inset-0 bg-black/40 flex items-center justify-center text-white opacity-0 hover:opacity-100 transition-opacity"
                            >
                              <Camera size={28} />
                            </button>
                            <div className="absolute top-2 right-2 w-7 h-7 bg-violet-500 rounded-full flex items-center justify-center">
                              <Check size={16} className="text-white" />
                            </div>
                          </div>
                        ) : (
                          <button
                            onClick={() => fileInputBackRef.current?.click()}
                            className="w-full h-40 border-2 border-dashed border-gray-300 rounded-xl flex flex-col items-center justify-center gap-2 hover:border-violet-400 hover:bg-violet-50 transition-colors"
                          >
                            <Upload size={28} className="text-gray-400" />
                            <span className="text-sm text-gray-500 text-center px-4">{t('newConnection.applicantDetails.dragDrop')}</span>
                          </button>
                        )}
                      </div>
                    </div>

                    <p className="text-xs text-gray-500 mt-4">{t('newConnection.applicantDetails.maxSize')}</p>

                    {/* Verification Button */}
                    {formData.documentFront && formData.documentNumber && (
                      <div className="mt-5">
                        {documentVerified ? (
                          <div className="flex items-center gap-2 px-5 py-3 bg-violet-100 text-violet-700 rounded-xl">
                            <Shield size={20} />
                            <span className="font-semibold">{t('newConnection.applicantDetails.verified')}</span>
                          </div>
                        ) : (
                          <button
                            onClick={verifyDocument}
                            disabled={isVerifying}
                            className="flex items-center gap-2 px-5 py-3 bg-gradient-to-r from-violet-600 to-violet-700 text-white rounded-xl font-semibold hover:from-violet-700 hover:to-violet-800 transition-colors disabled:opacity-50"
                          >
                            {isVerifying ? (
                              <>
                                <Loader2 size={20} className="animate-spin" />
                                {t('newConnection.applicantDetails.verifying')}
                              </>
                            ) : (
                              <>
                                <Shield size={20} />
                                {t('newConnection.applicantDetails.verifyDocument')}
                              </>
                            )}
                          </button>
                        )}
                        {errors.verification && <p className="text-xs text-red-500 mt-1">{errors.verification}</p>}
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Step 2: Address Details */}
              {currentStep === 2 && (
                <div className="space-y-6">
                  <div className="flex items-center gap-3 mb-8">
                    <div className="w-12 h-12 rounded-xl bg-violet-100 flex items-center justify-center">
                      <MapPin size={24} className="text-violet-600" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-gray-900">{t('newConnection.addressDetails.title')}</h3>
                      <p className="text-sm text-gray-600">{t('newConnection.addressDetails.desc')}</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    {/* House/Flat Number */}
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        {t('newConnection.addressDetails.houseNo')} <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        value={formData.houseNo}
                        onChange={(e) => handleChange('houseNo', e.target.value)}
                        placeholder={t('newConnection.addressDetails.enterHouseNo')}
                        className={`w-full px-4 py-3 border-2 rounded-xl focus:outline-none transition-colors ${errors.houseNo ? 'border-red-300 focus:border-red-400' : 'border-gray-200 focus:border-violet-400'
                          }`}
                      />
                      {errors.houseNo && <p className="text-xs text-red-500 mt-1">{errors.houseNo}</p>}
                    </div>

                    {/* Street/Locality */}
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        {t('newConnection.addressDetails.streetLocality')} <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        value={formData.street}
                        onChange={(e) => handleChange('street', e.target.value)}
                        placeholder={t('newConnection.addressDetails.enterStreet')}
                        className={`w-full px-4 py-3 border-2 rounded-xl focus:outline-none transition-colors ${errors.street ? 'border-red-300 focus:border-red-400' : 'border-gray-200 focus:border-violet-400'
                          }`}
                      />
                      {errors.street && <p className="text-xs text-red-500 mt-1">{errors.street}</p>}
                    </div>

                    {/* Landmark */}
                    <div className="sm:col-span-2">
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        {t('newConnection.addressDetails.landmark')}
                      </label>
                      <input
                        type="text"
                        value={formData.landmark}
                        onChange={(e) => handleChange('landmark', e.target.value)}
                        placeholder={t('newConnection.addressDetails.enterLandmark')}
                        className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-violet-400 transition-colors"
                      />
                    </div>

                    {/* State */}
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        {t('newConnection.addressDetails.state')} <span className="text-red-500">*</span>
                      </label>
                      <select
                        value={formData.state}
                        onChange={(e) => handleChange('state', e.target.value)}
                        className={`w-full px-4 py-3 border-2 rounded-xl focus:outline-none transition-colors appearance-none bg-white ${errors.state ? 'border-red-300 focus:border-red-400' : 'border-gray-200 focus:border-violet-400'
                          }`}
                      >
                        <option value="">{t('newConnection.addressDetails.selectState')}</option>
                        {states.map(state => (
                          <option key={state} value={state}>{state}</option>
                        ))}
                      </select>
                      {errors.state && <p className="text-xs text-red-500 mt-1">{errors.state}</p>}
                    </div>

                    {/* District */}
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        {t('newConnection.addressDetails.district')} <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        value={formData.district}
                        onChange={(e) => handleChange('district', e.target.value)}
                        placeholder={t('newConnection.addressDetails.selectDistrict')}
                        className={`w-full px-4 py-3 border-2 rounded-xl focus:outline-none transition-colors ${errors.district ? 'border-red-300 focus:border-red-400' : 'border-gray-200 focus:border-violet-400'
                          }`}
                      />
                      {errors.district && <p className="text-xs text-red-500 mt-1">{errors.district}</p>}
                    </div>

                    {/* Sub-Division */}
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        {t('newConnection.addressDetails.subdivision')}
                      </label>
                      <input
                        type="text"
                        value={formData.subdivision}
                        onChange={(e) => handleChange('subdivision', e.target.value)}
                        placeholder={t('newConnection.addressDetails.selectSubdivision')}
                        className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-violet-400 transition-colors"
                      />
                    </div>

                    {/* City */}
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        {t('newConnection.addressDetails.city')} <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        value={formData.city}
                        onChange={(e) => handleChange('city', e.target.value)}
                        placeholder={t('newConnection.addressDetails.enterCity')}
                        className={`w-full px-4 py-3 border-2 rounded-xl focus:outline-none transition-colors ${errors.city ? 'border-red-300 focus:border-red-400' : 'border-gray-200 focus:border-violet-400'
                          }`}
                      />
                      {errors.city && <p className="text-xs text-red-500 mt-1">{errors.city}</p>}
                    </div>

                    {/* PIN Code */}
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        {t('newConnection.addressDetails.pincode')} <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        value={formData.pincode}
                        onChange={(e) => handleChange('pincode', e.target.value.replace(/\D/g, '').slice(0, 6))}
                        placeholder={t('newConnection.addressDetails.enterPincode')}
                        className={`w-full px-4 py-3 border-2 rounded-xl focus:outline-none transition-colors ${errors.pincode ? 'border-red-300 focus:border-red-400' : 'border-gray-200 focus:border-violet-400'
                          }`}
                      />
                      {errors.pincode && <p className="text-xs text-red-500 mt-1">{errors.pincode}</p>}
                    </div>

                    {/* Ownership Type */}
                    <div className="sm:col-span-2">
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        {t('newConnection.addressDetails.ownershipType')}
                      </label>
                      <div className="flex flex-wrap gap-3">
                        {['owned', 'rented', 'leased', 'govtQuarter'].map((type) => (
                          <button
                            key={type}
                            onClick={() => handleChange('ownershipType', type)}
                            className={`px-4 py-2.5 rounded-xl text-sm font-medium border-2 transition-colors ${formData.ownershipType === type
                              ? 'bg-violet-600 text-white border-violet-600'
                              : 'bg-white text-gray-700 border-gray-200 hover:border-violet-300'
                              }`}
                          >
                            {t(`newConnection.addressDetails.${type}`)}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Step 3: Connection Details */}
              {currentStep === 3 && (
                <div className="space-y-6">
                  <div className="flex items-center gap-3 mb-8">
                    <div className="w-12 h-12 rounded-xl bg-violet-100 flex items-center justify-center">
                      <Zap size={24} className="text-violet-600" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-gray-900">{t('newConnection.connectionDetails.title')}</h3>
                      <p className="text-sm text-gray-600">{t('newConnection.connectionDetails.desc')}</p>
                    </div>
                  </div>

                  {/* Connection Type Cards */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-4">
                      {t('newConnection.connectionDetails.connectionType')} <span className="text-red-500">*</span>
                    </label>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                      {[
                        { id: 'domestic', icon: Home },
                        { id: 'commercial', icon: Building2 },
                        { id: 'industrial', icon: Factory },
                        { id: 'agricultural', icon: Tractor }
                      ].map(({ id, icon: Icon }) => (
                        <button
                          key={id}
                          onClick={() => handleChange('connectionType', id)}
                          className={`p-5 rounded-2xl border-2 transition-colors text-center ${formData.connectionType === id
                            ? 'bg-violet-50 border-violet-500 ring-2 ring-violet-200'
                            : 'bg-white border-gray-200 hover:border-violet-300'
                            }`}
                        >
                          <div className={`w-12 h-12 mx-auto rounded-xl flex items-center justify-center mb-3 ${formData.connectionType === id ? 'bg-violet-100' : 'bg-gray-100'
                            }`}>
                            <Icon size={24} className={formData.connectionType === id ? 'text-violet-600' : 'text-gray-500'} />
                          </div>
                          <p className={`text-sm font-semibold ${formData.connectionType === id ? 'text-violet-700' : 'text-gray-700'}`}>
                            {t(`newConnection.connectionDetails.${id}`)}
                          </p>
                          <p className="text-xs text-gray-500 mt-1">
                            {t(`newConnection.connectionDetails.${id}Desc`)}
                          </p>
                        </button>
                      ))}
                    </div>
                    {errors.connectionType && <p className="text-xs text-red-500 mt-1">{errors.connectionType}</p>}
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    {/* Load Required */}
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        {t('newConnection.connectionDetails.loadRequired')} <span className="text-red-500">*</span>
                      </label>
                      <select
                        value={formData.loadRequired}
                        onChange={(e) => handleChange('loadRequired', e.target.value)}
                        className={`w-full px-4 py-3 border-2 rounded-xl focus:outline-none transition-colors appearance-none bg-white ${errors.loadRequired ? 'border-red-300 focus:border-red-400' : 'border-gray-200 focus:border-violet-400'
                          }`}
                      >
                        <option value="">{t('newConnection.connectionDetails.selectLoad')}</option>
                        {loadOptions.map(load => (
                          <option key={load} value={load}>{load}</option>
                        ))}
                      </select>
                      {errors.loadRequired && <p className="text-xs text-red-500 mt-1">{errors.loadRequired}</p>}
                    </div>

                    {/* Phase Type */}
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        {t('newConnection.connectionDetails.phase')}
                      </label>
                      <div className="flex gap-3">
                        <button
                          onClick={() => handleChange('phase', 'single')}
                          className={`flex-1 px-4 py-3 rounded-xl text-sm font-medium border-2 transition-colors ${formData.phase === 'single'
                            ? 'bg-violet-600 text-white border-violet-600'
                            : 'bg-white text-gray-700 border-gray-200 hover:border-violet-300'
                            }`}
                        >
                          {t('newConnection.connectionDetails.singlePhase')}
                        </button>
                        <button
                          onClick={() => handleChange('phase', 'three')}
                          className={`flex-1 px-4 py-3 rounded-xl text-sm font-medium border-2 transition-colors ${formData.phase === 'three'
                            ? 'bg-violet-600 text-white border-violet-600'
                            : 'bg-white text-gray-700 border-gray-200 hover:border-violet-300'
                            }`}
                        >
                          {t('newConnection.connectionDetails.threePhase')}
                        </button>
                      </div>
                    </div>

                    {/* Purpose */}
                    <div className="sm:col-span-2">
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        {t('newConnection.connectionDetails.purpose')}
                      </label>
                      <select
                        value={formData.purpose}
                        onChange={(e) => handleChange('purpose', e.target.value)}
                        className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-violet-400 transition-colors appearance-none bg-white"
                      >
                        <option value="">{t('newConnection.connectionDetails.selectPurpose')}</option>
                        {['residential', 'shop', 'office', 'factory', 'farm', 'hospital', 'school', 'other'].map(purpose => (
                          <option key={purpose} value={purpose}>{t(`newConnection.connectionDetails.purposes.${purpose}`)}</option>
                        ))}
                      </select>
                    </div>
                  </div>

                  {/* Cost Breakdown */}
                  <div className="mt-8 p-5 bg-gradient-to-r from-violet-50 to-purple-50 rounded-2xl border-2 border-violet-200">
                    <h4 className="text-base font-bold text-gray-800 mb-4 flex items-center gap-2">
                      <IndianRupee size={20} className="text-violet-600" />
                      {t('newConnection.connectionDetails.estimatedCost')}
                    </h4>
                    <div className="space-y-3">
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">{t('newConnection.connectionDetails.securityDeposit')}</span>
                        <span className="font-semibold text-gray-900">₹{costs.securityDeposit.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">{t('newConnection.connectionDetails.processingFee')}</span>
                        <span className="font-semibold text-gray-900">₹{costs.processingFee.toLocaleString()}</span>
                      </div>
                      <div className="border-t border-violet-300 pt-3 mt-3 flex justify-between">
                        <span className="font-bold text-gray-800">{t('newConnection.connectionDetails.totalPayable')}</span>
                        <span className="font-bold text-violet-700 text-xl">₹{costs.total.toLocaleString()}</span>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Step 4: Review & Submit */}
              {currentStep === 4 && (
                <div className="space-y-6">
                  <div className="flex items-center gap-3 mb-8">
                    <div className="w-12 h-12 rounded-xl bg-violet-100 flex items-center justify-center">
                      <FileCheck size={24} className="text-violet-600" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-gray-900">{t('newConnection.review.title')}</h3>
                      <p className="text-sm text-gray-600">{t('newConnection.review.desc')}</p>
                    </div>
                  </div>

                  {/* Applicant Info Review */}
                  <div className="bg-gray-50 rounded-2xl border-2 border-gray-200 overflow-hidden">
                    <div className="px-5 py-4 bg-white border-b border-gray-200 flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <User size={20} className="text-violet-600" />
                        <h4 className="font-semibold text-gray-800">{t('newConnection.review.applicantInfo')}</h4>
                      </div>
                      <button onClick={() => setCurrentStep(1)} className="text-sm text-violet-600 hover:text-violet-700 font-medium">
                        {t('newConnection.review.edit')}
                      </button>
                    </div>
                    <div className="p-5 grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
                      <div><span className="text-gray-500">{t('newConnection.applicantDetails.fullName')}:</span> <span className="font-medium text-gray-900 ml-1">{formData.fullName}</span></div>
                      <div><span className="text-gray-500">{t('newConnection.applicantDetails.mobile')}:</span> <span className="font-medium text-gray-900 ml-1">{formData.mobile}</span></div>
                      <div><span className="text-gray-500">{t('newConnection.applicantDetails.email')}:</span> <span className="font-medium text-gray-900 ml-1">{formData.email}</span></div>
                      <div><span className="text-gray-500">{t('newConnection.applicantDetails.idProof')}:</span> <span className="font-medium text-gray-900 ml-1">{formData.idProofType && t(`newConnection.applicantDetails.idTypes.${formData.idProofType}`)}</span></div>
                      <div><span className="text-gray-500">{t('newConnection.applicantDetails.documentNumber')}:</span> <span className="font-medium text-gray-900 font-mono ml-1">{formData.documentNumber}</span></div>
                    </div>
                  </div>

                  {/* Address Info Review */}
                  <div className="bg-gray-50 rounded-2xl border-2 border-gray-200 overflow-hidden">
                    <div className="px-5 py-4 bg-white border-b border-gray-200 flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <MapPin size={20} className="text-violet-600" />
                        <h4 className="font-semibold text-gray-800">{t('newConnection.review.addressInfo')}</h4>
                      </div>
                      <button onClick={() => setCurrentStep(2)} className="text-sm text-violet-600 hover:text-violet-700 font-medium">
                        {t('newConnection.review.edit')}
                      </button>
                    </div>
                    <div className="p-5 text-sm">
                      <p className="text-gray-900 font-medium">
                        {formData.houseNo}, {formData.street}
                        {formData.landmark && `, ${formData.landmark}`}
                      </p>
                      <p className="text-gray-600 mt-1">
                        {formData.city}, {formData.district}
                        {formData.subdivision && `, ${formData.subdivision}`}
                      </p>
                      <p className="text-gray-600">
                        {formData.state} - {formData.pincode}
                      </p>
                      <p className="text-gray-500 mt-2 text-xs">
                        {t('newConnection.addressDetails.ownershipType')}: {t(`newConnection.addressDetails.${formData.ownershipType}`)}
                      </p>
                    </div>
                  </div>

                  {/* Connection Info Review */}
                  <div className="bg-gray-50 rounded-2xl border-2 border-gray-200 overflow-hidden">
                    <div className="px-5 py-4 bg-white border-b border-gray-200 flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Zap size={20} className="text-violet-600" />
                        <h4 className="font-semibold text-gray-800">{t('newConnection.review.connectionInfo')}</h4>
                      </div>
                      <button onClick={() => setCurrentStep(3)} className="text-sm text-violet-600 hover:text-violet-700 font-medium">
                        {t('newConnection.review.edit')}
                      </button>
                    </div>
                    <div className="p-5 grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
                      <div><span className="text-gray-500">{t('newConnection.connectionDetails.connectionType')}:</span> <span className="font-medium text-gray-900 ml-1">{t(`newConnection.connectionDetails.${formData.connectionType}`)}</span></div>
                      <div><span className="text-gray-500">{t('newConnection.connectionDetails.loadRequired')}:</span> <span className="font-medium text-gray-900 ml-1">{formData.loadRequired}</span></div>
                      <div><span className="text-gray-500">{t('newConnection.connectionDetails.phase')}:</span> <span className="font-medium text-gray-900 ml-1">{formData.phase === 'single' ? t('newConnection.connectionDetails.singlePhase') : t('newConnection.connectionDetails.threePhase')}</span></div>
                      {formData.purpose && <div><span className="text-gray-500">{t('newConnection.connectionDetails.purpose')}:</span> <span className="font-medium text-gray-900 ml-1">{t(`newConnection.connectionDetails.purposes.${formData.purpose}`)}</span></div>}
                    </div>
                  </div>

                  {/* Payment Summary */}
                  <div className="bg-gradient-to-r from-violet-50 to-purple-50 rounded-2xl border-2 border-violet-200 p-5">
                    <h4 className="font-semibold text-gray-800 mb-4 flex items-center gap-2">
                      <CreditCard size={20} className="text-violet-600" />
                      {t('newConnection.review.paymentSummary')}
                    </h4>
                    <div className="space-y-3 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-600">{t('newConnection.connectionDetails.securityDeposit')}</span>
                        <span className="font-medium">₹{costs.securityDeposit.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">{t('newConnection.connectionDetails.processingFee')}</span>
                        <span className="font-medium">₹{costs.processingFee.toLocaleString()}</span>
                      </div>
                      <div className="border-t border-violet-300 pt-3 mt-3 flex justify-between">
                        <span className="font-bold text-gray-800">{t('newConnection.connectionDetails.totalPayable')}</span>
                        <span className="font-bold text-violet-700 text-xl">₹{costs.total.toLocaleString()}</span>
                      </div>
                    </div>
                  </div>

                  {/* Terms Checkbox */}
                  <div className="flex items-start gap-3 p-4 bg-gray-50 rounded-xl">
                    <input
                      type="checkbox"
                      id="terms"
                      checked={formData.termsAccepted}
                      onChange={(e) => handleChange('termsAccepted', e.target.checked)}
                      className="mt-1 w-5 h-5 text-violet-600 border-2 border-gray-300 rounded focus:ring-violet-500"
                    />
                    <label htmlFor="terms" className="text-sm text-gray-700">
                      {t('newConnection.review.termsAgree')}
                    </label>
                  </div>
                  {errors.termsAccepted && <p className="text-xs text-red-500">{errors.termsAccepted}</p>}
                </div>
              )}

              {/* Step 5: Confirmation */}
              {currentStep === 5 && (
                <div className="text-center space-y-8 py-6">
                  {/* Success Animation */}
                  <div className="w-24 h-24 mx-auto rounded-full bg-violet-100 flex items-center justify-center">
                    <CheckCircle2 size={56} className="text-violet-600" />
                  </div>

                  <div>
                    <h3 className="text-2xl sm:text-3xl font-bold text-gray-900">{t('newConnection.confirmation.title')}</h3>
                    <p className="text-gray-600 mt-2 text-lg">{t('newConnection.confirmation.subtitle')}</p>
                  </div>

                  {/* Application Details Card */}
                  <div className="bg-gray-50 rounded-2xl border-2 border-gray-200 p-5 sm:p-6 text-left max-w-xl mx-auto">
                    <div className="space-y-4">
                      <div className="flex justify-between items-center pb-4 border-b border-gray-200">
                        <span className="text-sm text-gray-600">{t('newConnection.confirmation.applicationNo')}</span>
                        <span className="font-bold text-violet-700 font-mono text-lg">{generateApplicationNo()}</span>
                      </div>
                      <div className="flex justify-between items-center pb-4 border-b border-gray-200">
                        <span className="text-sm text-gray-600">{t('newConnection.confirmation.submittedOn')}</span>
                        <span className="font-medium text-gray-900">{new Date().toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' })}</span>
                      </div>
                      <div className="flex justify-between items-center pb-4 border-b border-gray-200">
                        <span className="text-sm text-gray-600">{t('newConnection.confirmation.estimatedCompletion')}</span>
                        <span className="font-medium text-gray-900">7-10 {t('newConnection.confirmation.workingDays')}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-gray-600">{t('newConnection.confirmation.amountPaid')}</span>
                        <span className="font-bold text-violet-700 text-xl">₹{costs.total.toLocaleString()}</span>
                      </div>
                    </div>
                  </div>

                  {/* SMS Confirmation */}
                  <div className="bg-blue-50 rounded-2xl border-2 border-blue-200 p-5 max-w-xl mx-auto">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0">
                        <MessageSquare size={24} className="text-blue-600" />
                      </div>
                      <div className="text-left">
                        <p className="font-semibold text-blue-800">{t('newConnection.confirmation.smsConfirmation')}</p>
                        <p className="text-sm text-blue-700">{t('newConnection.confirmation.smsSent')} <span className="font-mono font-medium">{formData.mobile}</span></p>
                        <p className="text-sm text-blue-700">{t('newConnection.confirmation.emailSent')} <span className="font-medium">{formData.email}</span></p>
                      </div>
                    </div>
                  </div>

                  {/* Next Steps */}
                  <div className="bg-gray-50 rounded-2xl border-2 border-gray-200 p-5 sm:p-6 text-left max-w-xl mx-auto">
                    <h4 className="font-bold text-gray-800 mb-5 flex items-center gap-2 text-lg">
                      <ArrowRight size={20} className="text-violet-600" />
                      {t('newConnection.confirmation.nextSteps')}
                    </h4>
                    <ol className="space-y-4 text-sm text-gray-700">
                      <li className="flex gap-3">
                        <span className="w-7 h-7 rounded-full bg-violet-100 text-violet-700 flex items-center justify-center flex-shrink-0 font-bold text-sm">1</span>
                        <span>{t('newConnection.confirmation.step1')}</span>
                      </li>
                      <li className="flex gap-3">
                        <span className="w-7 h-7 rounded-full bg-violet-100 text-violet-700 flex items-center justify-center flex-shrink-0 font-bold text-sm">2</span>
                        <span>{t('newConnection.confirmation.step2')}</span>
                      </li>
                      <li className="flex gap-3">
                        <span className="w-7 h-7 rounded-full bg-violet-100 text-violet-700 flex items-center justify-center flex-shrink-0 font-bold text-sm">3</span>
                        <span>{t('newConnection.confirmation.step3')}</span>
                      </li>
                      <li className="flex gap-3">
                        <span className="w-7 h-7 rounded-full bg-violet-100 text-violet-700 flex items-center justify-center flex-shrink-0 font-bold text-sm">4</span>
                        <span>{t('newConnection.confirmation.step4')}</span>
                      </li>
                    </ol>
                  </div>

                  {/* Payment Receipt Summary */}
                  <div className="bg-gradient-to-r from-violet-50 to-purple-50 rounded-2xl border-2 border-violet-200 p-5 sm:p-6 max-w-xl mx-auto">
                    <h4 className="font-bold text-gray-800 mb-4 flex items-center gap-2 justify-center text-lg">
                      <CreditCard size={20} className="text-violet-600" />
                      {t('newConnection.confirmation.paymentReceipt')}
                    </h4>
                    <div className="space-y-3 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-600">{t('newConnection.confirmation.transactionId')}</span>
                        <span className="font-mono font-medium text-gray-900">{generateTransactionId()}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">{t('newConnection.confirmation.paymentDate')}</span>
                        <span className="font-medium text-gray-900">{new Date().toLocaleDateString('en-IN')}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">{t('newConnection.confirmation.paymentStatus')}</span>
                        <span className="font-semibold text-violet-700 flex items-center gap-1">
                          <Check size={16} /> {t('newConnection.confirmation.successful')}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-xl mx-auto">
                    <button
                      onClick={handlePrint}
                      className="flex-1 flex items-center justify-center gap-2 px-6 py-3.5 bg-white border-2 border-gray-300 text-gray-700 rounded-xl font-semibold hover:bg-gray-50 transition-colors"
                    >
                      <Printer size={20} />
                      {t('newConnection.confirmation.printAcknowledgement')}
                    </button>
                    <button
                      onClick={() => { }}
                      className="flex-1 flex items-center justify-center gap-2 px-6 py-3.5 bg-white border-2 border-violet-500 text-violet-700 rounded-xl font-semibold hover:bg-violet-50 transition-colors"
                    >
                      <Download size={20} />
                      {t('newConnection.confirmation.downloadReceipt')}
                    </button>
                  </div>

                  <button
                    onClick={() => navigate('/services/electricity')}
                    className="px-10 py-4 bg-gradient-to-r from-violet-600 to-violet-700 text-white rounded-xl font-bold text-lg hover:from-violet-700 hover:to-violet-800 transition-all shadow-lg"
                  >
                    {t('newConnection.confirmation.backToServices')}
                  </button>
                </div>
              )}
            </div>

            {/* Footer Navigation */}
            {currentStep < 5 && (
              <div className="px-4 sm:px-8 py-5 bg-gray-50 border-t border-gray-200 flex items-center justify-between">
                <button
                  onClick={currentStep === 1 ? () => navigate('/services/electricity') : handleBack}
                  className="group flex items-center gap-2 px-6 py-3 bg-white border-2 border-gray-200 text-gray-700 rounded-xl font-bold hover:bg-gray-50 hover:border-gray-300 hover:text-gray-900 transition-all shadow-sm active:scale-95"
                >
                  <ChevronLeft size={22} strokeWidth={2.5} className="group-hover:-translate-x-1 transition-transform" />
                  <span>{currentStep === 1 ? t('common.cancel') : t('progress.back')}</span>
                </button>

                {currentStep === 4 ? (
                  <button
                    onClick={handleSubmit}
                    disabled={isSubmitting}
                    className="flex items-center gap-2 px-8 sm:px-10 py-3 bg-gradient-to-r from-violet-600 to-violet-700 text-white rounded-xl font-bold text-base hover:from-violet-700 hover:to-violet-800 transition-all disabled:opacity-50 shadow-lg"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 size={20} className="animate-spin" />
                        {t('newConnection.review.submitting')}
                      </>
                    ) : (
                      <>
                        <CreditCard size={20} />
                        {t('newConnection.review.submitApplication')}
                      </>
                    )}
                  </button>
                ) : (
                  <button
                    onClick={handleNext}
                    className="flex items-center gap-2 px-8 sm:px-10 py-3 bg-gradient-to-r from-violet-600 to-violet-700 text-white rounded-xl font-bold text-base hover:from-violet-700 hover:to-violet-800 transition-all shadow-lg"
                  >
                    <span>{t('progress.next')}</span>
                    <ChevronRight size={22} />
                  </button>
                )}
              </div>
            )}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default NewConnectionPage;
