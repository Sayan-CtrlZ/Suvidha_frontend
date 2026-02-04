import React, { useState, useRef } from 'react';
import { 
  X, User, MapPin, Zap, FileCheck, CheckCircle2, ChevronRight, ChevronLeft, 
  Upload, Camera, Shield, Phone, Mail, FileText, Building2, Home, Factory, 
  Tractor, AlertCircle, Printer, Download, CreditCard, Check, Loader2,
  IndianRupee, MessageSquare, ArrowRight
} from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';

const NewConnectionForm = ({ isOpen, onClose }) => {
  const { t } = useLanguage();
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isVerifying, setIsVerifying] = useState(false);
  const [documentVerified, setDocumentVerified] = useState(false);
  const fileInputRef = useRef(null);
  const fileInputBackRef = useRef(null);

  // Form State
  const [formData, setFormData] = useState({
    // Applicant Details
    fullName: '',
    mobile: '',
    email: '',
    idProofType: '',
    documentNumber: '',
    documentFront: null,
    documentBack: null,
    documentFrontPreview: null,
    documentBackPreview: null,
    
    // Address Details
    houseNo: '',
    street: '',
    landmark: '',
    state: '',
    district: '',
    subdivision: '',
    city: '',
    pincode: '',
    ownershipType: 'owned',
    
    // Connection Details
    connectionType: 'domestic',
    loadRequired: '',
    phase: 'single',
    purpose: '',
    
    // Terms
    termsAccepted: false
  });

  const [errors, setErrors] = useState({});

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
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: null }));
    }
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
          setFormData(prev => ({
            ...prev,
            documentFront: file,
            documentFrontPreview: event.target.result
          }));
        } else {
          setFormData(prev => ({
            ...prev,
            documentBack: file,
            documentBackPreview: event.target.result
          }));
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

  const validateStep = (step) => {
    const newErrors = {};
    
    if (step === 1) {
      if (!formData.fullName.trim()) newErrors.fullName = t('newConnection.validation.nameRequired');
      if (!formData.mobile.trim()) newErrors.mobile = t('newConnection.validation.mobileRequired');
      else if (!/^\d{10}$/.test(formData.mobile)) newErrors.mobile = t('newConnection.validation.mobileInvalid');
      if (!formData.email.trim()) newErrors.email = t('newConnection.validation.emailRequired');
      else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) newErrors.email = t('newConnection.validation.emailInvalid');
      if (!formData.idProofType) newErrors.idProofType = t('newConnection.validation.idProofRequired');
      if (!formData.documentNumber.trim()) newErrors.documentNumber = t('newConnection.validation.documentNoRequired');
      if (!formData.documentFront) newErrors.documentFront = t('newConnection.validation.documentRequired');
      if (!documentVerified) newErrors.verification = t('newConnection.validation.verificationRequired');
    }
    
    if (step === 2) {
      if (!formData.houseNo.trim()) newErrors.houseNo = t('newConnection.validation.addressRequired');
      if (!formData.street.trim()) newErrors.street = t('newConnection.validation.addressRequired');
      if (!formData.state) newErrors.state = t('newConnection.validation.stateRequired');
      if (!formData.district.trim()) newErrors.district = t('newConnection.validation.districtRequired');
      if (!formData.city.trim()) newErrors.city = t('newConnection.validation.addressRequired');
      if (!formData.pincode.trim()) newErrors.pincode = t('newConnection.validation.pincodeRequired');
      else if (!/^\d{6}$/.test(formData.pincode)) newErrors.pincode = t('newConnection.validation.pincodeInvalid');
    }
    
    if (step === 3) {
      if (!formData.connectionType) newErrors.connectionType = t('newConnection.validation.connectionTypeRequired');
      if (!formData.loadRequired) newErrors.loadRequired = t('newConnection.validation.loadRequired');
    }
    
    if (step === 4) {
      if (!formData.termsAccepted) newErrors.termsAccepted = t('newConnection.validation.termsRequired');
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateStep(currentStep)) {
      setCurrentStep(prev => Math.min(prev + 1, 5));
    }
  };

  const handleBack = () => {
    setCurrentStep(prev => Math.max(prev - 1, 1));
  };

  const handleSubmit = async () => {
    if (!validateStep(4)) return;
    
    setIsSubmitting(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2500));
    setIsSubmitting(false);
    setCurrentStep(5);
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

  if (!isOpen) return null;

  const costs = getCostBreakdown();

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[100] flex items-center justify-center p-2 sm:p-4 overflow-y-auto">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-4xl max-h-[95vh] overflow-hidden flex flex-col my-auto">
        {/* Header */}
        <div className="bg-gradient-to-r from-violet-700 to-violet-600 px-4 sm:px-6 py-4 sm:py-5 flex items-center justify-between flex-shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-white/20 backdrop-blur-sm flex items-center justify-center border-2 border-white/30">
              <Zap size={24} className="text-white" />
            </div>
            <div>
              <h2 className="text-lg sm:text-xl font-bold text-white">{t('newConnection.title')}</h2>
              <p className="text-xs sm:text-sm text-white/80">{t('newConnection.subtitle')}</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-10 h-10 rounded-full bg-white/20 hover:bg-white/30 flex items-center justify-center text-white transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        {/* Progress Steps */}
        <div className="px-4 sm:px-6 py-4 bg-gray-50 border-b border-gray-200 flex-shrink-0">
          <div className="flex items-center justify-between max-w-3xl mx-auto">
            {steps.map((step, index) => (
              <React.Fragment key={step.id}>
                <div className="flex flex-col items-center">
                  <div className={`w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center transition-all ${
                    currentStep > step.id 
                      ? 'bg-violet-600 text-white' 
                      : currentStep === step.id 
                        ? 'bg-violet-600 text-white ring-4 ring-violet-200' 
                        : 'bg-gray-200 text-gray-500'
                  }`}>
                    {currentStep > step.id ? (
                      <Check size={16} />
                    ) : (
                      <step.icon size={16} />
                    )}
                  </div>
                  <span className={`text-[10px] sm:text-xs mt-1.5 font-medium text-center max-w-[60px] sm:max-w-none ${
                    currentStep >= step.id ? 'text-violet-700' : 'text-gray-500'
                  }`}>
                    {step.name}
                  </span>
                </div>
                {index < steps.length - 1 && (
                  <div className={`flex-1 h-1 mx-1 sm:mx-2 rounded-full ${
                    currentStep > step.id ? 'bg-violet-500' : 'bg-gray-200'
                  }`} />
                )}
              </React.Fragment>
            ))}
          </div>
        </div>

        {/* Form Content */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6">
          {/* Step 1: Applicant Details */}
          {currentStep === 1 && (
            <div className="space-y-5">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-lg bg-violet-100 flex items-center justify-center">
                  <User size={20} className="text-violet-600" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-gray-900">{t('newConnection.applicantDetails.title')}</h3>
                  <p className="text-sm text-gray-600">{t('newConnection.applicantDetails.desc')}</p>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Full Name */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                    {t('newConnection.applicantDetails.fullName')} <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <User size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                    <input
                      type="text"
                      value={formData.fullName}
                      onChange={(e) => handleChange('fullName', e.target.value)}
                      placeholder={t('newConnection.applicantDetails.enterFullName')}
                      className={`w-full pl-10 pr-4 py-2.5 border-2 rounded-lg focus:outline-none transition-colors ${
                        errors.fullName ? 'border-red-300 focus:border-red-400' : 'border-gray-200 focus:border-violet-400'
                      }`}
                    />
                  </div>
                  {errors.fullName && <p className="text-xs text-red-500 mt-1">{errors.fullName}</p>}
                </div>

                {/* Mobile Number */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                    {t('newConnection.applicantDetails.mobile')} <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <Phone size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                    <input
                      type="tel"
                      value={formData.mobile}
                      onChange={(e) => handleChange('mobile', e.target.value.replace(/\D/g, '').slice(0, 10))}
                      placeholder={t('newConnection.applicantDetails.enterMobile')}
                      className={`w-full pl-10 pr-4 py-2.5 border-2 rounded-lg focus:outline-none transition-colors ${
                        errors.mobile ? 'border-red-300 focus:border-red-400' : 'border-gray-200 focus:border-violet-400'
                      }`}
                    />
                  </div>
                  {errors.mobile && <p className="text-xs text-red-500 mt-1">{errors.mobile}</p>}
                </div>

                {/* Email */}
                <div className="sm:col-span-2">
                  <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                    {t('newConnection.applicantDetails.email')} <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <Mail size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => handleChange('email', e.target.value)}
                      placeholder={t('newConnection.applicantDetails.enterEmail')}
                      className={`w-full pl-10 pr-4 py-2.5 border-2 rounded-lg focus:outline-none transition-colors ${
                        errors.email ? 'border-red-300 focus:border-red-400' : 'border-gray-200 focus:border-violet-400'
                      }`}
                    />
                  </div>
                  {errors.email && <p className="text-xs text-red-500 mt-1">{errors.email}</p>}
                </div>

                {/* ID Proof Type */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                    {t('newConnection.applicantDetails.idProof')} <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <FileText size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                    <select
                      value={formData.idProofType}
                      onChange={(e) => handleChange('idProofType', e.target.value)}
                      className={`w-full pl-10 pr-4 py-2.5 border-2 rounded-lg focus:outline-none transition-colors appearance-none bg-white ${
                        errors.idProofType ? 'border-red-300 focus:border-red-400' : 'border-gray-200 focus:border-violet-400'
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
                  <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                    {t('newConnection.applicantDetails.documentNumber')} <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={formData.documentNumber}
                    onChange={(e) => handleChange('documentNumber', e.target.value.toUpperCase())}
                    placeholder={t('newConnection.applicantDetails.enterDocNumber')}
                    className={`w-full px-4 py-2.5 border-2 rounded-lg focus:outline-none transition-colors ${
                      errors.documentNumber ? 'border-red-300 focus:border-red-400' : 'border-gray-200 focus:border-violet-400'
                    }`}
                  />
                  {errors.documentNumber && <p className="text-xs text-red-500 mt-1">{errors.documentNumber}</p>}
                </div>
              </div>

              {/* Document Upload Section */}
              <div className="mt-6 p-4 bg-gray-50 rounded-xl border-2 border-gray-200">
                <h4 className="text-sm font-semibold text-gray-800 mb-3 flex items-center gap-2">
                  <Upload size={18} className="text-violet-600" />
                  {t('newConnection.applicantDetails.uploadDocument')}
                </h4>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
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
                      <div className="relative rounded-lg overflow-hidden border-2 border-violet-300 bg-violet-50">
                        <img 
                          src={formData.documentFrontPreview} 
                          alt="Document Front" 
                          className="w-full h-32 object-cover"
                        />
                        <button
                          onClick={() => fileInputRef.current?.click()}
                          className="absolute inset-0 bg-black/40 flex items-center justify-center text-white opacity-0 hover:opacity-100 transition-opacity"
                        >
                          <Camera size={24} />
                        </button>
                        <div className="absolute top-2 right-2 w-6 h-6 bg-violet-500 rounded-full flex items-center justify-center">
                          <Check size={14} className="text-white" />
                        </div>
                      </div>
                    ) : (
                      <button
                        onClick={() => fileInputRef.current?.click()}
                        className={`w-full h-32 border-2 border-dashed rounded-lg flex flex-col items-center justify-center gap-2 hover:border-violet-400 hover:bg-violet-50 transition-colors ${
                          errors.documentFront ? 'border-red-300 bg-red-50' : 'border-gray-300'
                        }`}
                      >
                        <Upload size={24} className="text-gray-400" />
                        <span className="text-xs text-gray-500 text-center px-2">{t('newConnection.applicantDetails.dragDrop')}</span>
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
                      <div className="relative rounded-lg overflow-hidden border-2 border-violet-300 bg-violet-50">
                        <img 
                          src={formData.documentBackPreview} 
                          alt="Document Back" 
                          className="w-full h-32 object-cover"
                        />
                        <button
                          onClick={() => fileInputBackRef.current?.click()}
                          className="absolute inset-0 bg-black/40 flex items-center justify-center text-white opacity-0 hover:opacity-100 transition-opacity"
                        >
                          <Camera size={24} />
                        </button>
                        <div className="absolute top-2 right-2 w-6 h-6 bg-violet-500 rounded-full flex items-center justify-center">
                          <Check size={14} className="text-white" />
                        </div>
                      </div>
                    ) : (
                      <button
                        onClick={() => fileInputBackRef.current?.click()}
                        className="w-full h-32 border-2 border-dashed border-gray-300 rounded-lg flex flex-col items-center justify-center gap-2 hover:border-violet-400 hover:bg-violet-50 transition-colors"
                      >
                        <Upload size={24} className="text-gray-400" />
                        <span className="text-xs text-gray-500 text-center px-2">{t('newConnection.applicantDetails.dragDrop')}</span>
                      </button>
                    )}
                  </div>
                </div>

                <p className="text-xs text-gray-500 mt-3">{t('newConnection.applicantDetails.maxSize')}</p>

                {/* Verification Button */}
                {formData.documentFront && formData.documentNumber && (
                  <div className="mt-4">
                    {documentVerified ? (
                      <div className="flex items-center gap-2 px-4 py-2.5 bg-violet-100 text-violet-700 rounded-lg">
                        <Shield size={18} />
                        <span className="font-semibold text-sm">{t('newConnection.applicantDetails.verified')}</span>
                      </div>
                    ) : (
                      <button
                        onClick={verifyDocument}
                        disabled={isVerifying}
                        className="flex items-center gap-2 px-4 py-2.5 bg-gradient-to-r from-violet-600 to-violet-700 text-white rounded-lg font-semibold text-sm hover:from-violet-700 hover:to-violet-800 transition-all disabled:opacity-50"
                      >
                        {isVerifying ? (
                          <>
                            <Loader2 size={18} className="animate-spin" />
                            {t('newConnection.applicantDetails.verifying')}
                          </>
                        ) : (
                          <>
                            <Shield size={18} />
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
            <div className="space-y-5">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-lg bg-violet-100 flex items-center justify-center">
                  <MapPin size={20} className="text-violet-600" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-gray-900">{t('newConnection.addressDetails.title')}</h3>
                  <p className="text-sm text-gray-600">{t('newConnection.addressDetails.desc')}</p>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* House/Flat Number */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                    {t('newConnection.addressDetails.houseNo')} <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={formData.houseNo}
                    onChange={(e) => handleChange('houseNo', e.target.value)}
                    placeholder={t('newConnection.addressDetails.enterHouseNo')}
                    className={`w-full px-4 py-2.5 border-2 rounded-lg focus:outline-none transition-colors ${
                      errors.houseNo ? 'border-red-300 focus:border-red-400' : 'border-gray-200 focus:border-violet-400'
                    }`}
                  />
                  {errors.houseNo && <p className="text-xs text-red-500 mt-1">{errors.houseNo}</p>}
                </div>

                {/* Street/Locality */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                    {t('newConnection.addressDetails.streetLocality')} <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={formData.street}
                    onChange={(e) => handleChange('street', e.target.value)}
                    placeholder={t('newConnection.addressDetails.enterStreet')}
                    className={`w-full px-4 py-2.5 border-2 rounded-lg focus:outline-none transition-colors ${
                      errors.street ? 'border-red-300 focus:border-red-400' : 'border-gray-200 focus:border-violet-400'
                    }`}
                  />
                  {errors.street && <p className="text-xs text-red-500 mt-1">{errors.street}</p>}
                </div>

                {/* Landmark */}
                <div className="sm:col-span-2">
                  <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                    {t('newConnection.addressDetails.landmark')}
                  </label>
                  <input
                    type="text"
                    value={formData.landmark}
                    onChange={(e) => handleChange('landmark', e.target.value)}
                    placeholder={t('newConnection.addressDetails.enterLandmark')}
                    className="w-full px-4 py-2.5 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-violet-400 transition-colors"
                  />
                </div>

                {/* State */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                    {t('newConnection.addressDetails.state')} <span className="text-red-500">*</span>
                  </label>
                  <select
                    value={formData.state}
                    onChange={(e) => handleChange('state', e.target.value)}
                    className={`w-full px-4 py-2.5 border-2 rounded-lg focus:outline-none transition-colors appearance-none bg-white ${
                      errors.state ? 'border-red-300 focus:border-red-400' : 'border-gray-200 focus:border-violet-400'
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
                  <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                    {t('newConnection.addressDetails.district')} <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={formData.district}
                    onChange={(e) => handleChange('district', e.target.value)}
                    placeholder={t('newConnection.addressDetails.selectDistrict')}
                    className={`w-full px-4 py-2.5 border-2 rounded-lg focus:outline-none transition-colors ${
                      errors.district ? 'border-red-300 focus:border-red-400' : 'border-gray-200 focus:border-violet-400'
                    }`}
                  />
                  {errors.district && <p className="text-xs text-red-500 mt-1">{errors.district}</p>}
                </div>

                {/* Sub-Division */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                    {t('newConnection.addressDetails.subdivision')}
                  </label>
                  <input
                    type="text"
                    value={formData.subdivision}
                    onChange={(e) => handleChange('subdivision', e.target.value)}
                    placeholder={t('newConnection.addressDetails.selectSubdivision')}
                    className="w-full px-4 py-2.5 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-violet-400 transition-colors"
                  />
                </div>

                {/* City */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                    {t('newConnection.addressDetails.city')} <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={formData.city}
                    onChange={(e) => handleChange('city', e.target.value)}
                    placeholder={t('newConnection.addressDetails.enterCity')}
                    className={`w-full px-4 py-2.5 border-2 rounded-lg focus:outline-none transition-colors ${
                      errors.city ? 'border-red-300 focus:border-red-400' : 'border-gray-200 focus:border-violet-400'
                    }`}
                  />
                  {errors.city && <p className="text-xs text-red-500 mt-1">{errors.city}</p>}
                </div>

                {/* PIN Code */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                    {t('newConnection.addressDetails.pincode')} <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={formData.pincode}
                    onChange={(e) => handleChange('pincode', e.target.value.replace(/\D/g, '').slice(0, 6))}
                    placeholder={t('newConnection.addressDetails.enterPincode')}
                    className={`w-full px-4 py-2.5 border-2 rounded-lg focus:outline-none transition-colors ${
                      errors.pincode ? 'border-red-300 focus:border-red-400' : 'border-gray-200 focus:border-violet-400'
                    }`}
                  />
                  {errors.pincode && <p className="text-xs text-red-500 mt-1">{errors.pincode}</p>}
                </div>

                {/* Ownership Type */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                    {t('newConnection.addressDetails.ownershipType')}
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {['owned', 'rented', 'leased', 'govtQuarter'].map((type) => (
                      <button
                        key={type}
                        onClick={() => handleChange('ownershipType', type)}
                        className={`px-3 py-2 rounded-lg text-sm font-medium border-2 transition-all ${
                          formData.ownershipType === type
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
            <div className="space-y-5">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-lg bg-violet-100 flex items-center justify-center">
                  <Zap size={20} className="text-violet-600" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-gray-900">{t('newConnection.connectionDetails.title')}</h3>
                  <p className="text-sm text-gray-600">{t('newConnection.connectionDetails.desc')}</p>
                </div>
              </div>

              {/* Connection Type Cards */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-3">
                  {t('newConnection.connectionDetails.connectionType')} <span className="text-red-500">*</span>
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  {[
                    { id: 'domestic', icon: Home, color: 'blue' },
                    { id: 'commercial', icon: Building2, color: 'purple' },
                    { id: 'industrial', icon: Factory, color: 'orange' },
                    { id: 'agricultural', icon: Tractor, color: 'green' }
                  ].map(({ id, icon: Icon, color }) => (
                    <button
                      key={id}
                      onClick={() => handleChange('connectionType', id)}
                      className={`p-4 rounded-xl border-2 transition-all text-center ${
                        formData.connectionType === id
                          ? 'bg-violet-50 border-violet-500 ring-2 ring-violet-200'
                          : 'bg-white border-gray-200 hover:border-violet-300'
                      }`}
                    >
                      <div className={`w-10 h-10 mx-auto rounded-lg flex items-center justify-center mb-2 ${
                        formData.connectionType === id ? 'bg-violet-100' : 'bg-gray-100'
                      }`}>
                        <Icon size={20} className={formData.connectionType === id ? 'text-violet-600' : 'text-gray-500'} />
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

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Load Required */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                    {t('newConnection.connectionDetails.loadRequired')} <span className="text-red-500">*</span>
                  </label>
                  <select
                    value={formData.loadRequired}
                    onChange={(e) => handleChange('loadRequired', e.target.value)}
                    className={`w-full px-4 py-2.5 border-2 rounded-lg focus:outline-none transition-colors appearance-none bg-white ${
                      errors.loadRequired ? 'border-red-300 focus:border-red-400' : 'border-gray-200 focus:border-violet-400'
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
                  <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                    {t('newConnection.connectionDetails.phase')}
                  </label>
                  <div className="flex gap-3">
                    <button
                      onClick={() => handleChange('phase', 'single')}
                      className={`flex-1 px-4 py-2.5 rounded-lg text-sm font-medium border-2 transition-all ${
                        formData.phase === 'single'
                          ? 'bg-violet-600 text-white border-violet-600'
                          : 'bg-white text-gray-700 border-gray-200 hover:border-violet-300'
                      }`}
                    >
                      {t('newConnection.connectionDetails.singlePhase')}
                    </button>
                    <button
                      onClick={() => handleChange('phase', 'three')}
                      className={`flex-1 px-4 py-2.5 rounded-lg text-sm font-medium border-2 transition-all ${
                        formData.phase === 'three'
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
                  <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                    {t('newConnection.connectionDetails.purpose')}
                  </label>
                  <select
                    value={formData.purpose}
                    onChange={(e) => handleChange('purpose', e.target.value)}
                    className="w-full px-4 py-2.5 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-violet-400 transition-colors appearance-none bg-white"
                  >
                    <option value="">{t('newConnection.connectionDetails.selectPurpose')}</option>
                    {['residential', 'shop', 'office', 'factory', 'farm', 'hospital', 'school', 'other'].map(purpose => (
                      <option key={purpose} value={purpose}>{t(`newConnection.connectionDetails.purposes.${purpose}`)}</option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Cost Breakdown */}
              <div className="mt-6 p-4 bg-gradient-to-r from-violet-50 to-purple-50 rounded-xl border-2 border-violet-200">
                <h4 className="text-sm font-bold text-gray-800 mb-3 flex items-center gap-2">
                  <IndianRupee size={18} className="text-violet-600" />
                  {t('newConnection.connectionDetails.estimatedCost')}
                </h4>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">{t('newConnection.connectionDetails.securityDeposit')}</span>
                    <span className="font-semibold text-gray-900">₹{costs.securityDeposit.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">{t('newConnection.connectionDetails.processingFee')}</span>
                    <span className="font-semibold text-gray-900">₹{costs.processingFee.toLocaleString()}</span>
                  </div>
                  <div className="border-t border-violet-300 pt-2 mt-2 flex justify-between">
                    <span className="font-bold text-gray-800">{t('newConnection.connectionDetails.totalPayable')}</span>
                    <span className="font-bold text-violet-700 text-lg">₹{costs.total.toLocaleString()}</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Step 4: Review & Submit */}
          {currentStep === 4 && (
            <div className="space-y-5">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-lg bg-violet-100 flex items-center justify-center">
                  <FileCheck size={20} className="text-violet-600" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-gray-900">{t('newConnection.review.title')}</h3>
                  <p className="text-sm text-gray-600">{t('newConnection.review.desc')}</p>
                </div>
              </div>

              {/* Applicant Info Review */}
              <div className="bg-gray-50 rounded-xl border-2 border-gray-200 overflow-hidden">
                <div className="px-4 py-3 bg-white border-b border-gray-200 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <User size={18} className="text-violet-600" />
                    <h4 className="font-semibold text-gray-800">{t('newConnection.review.applicantInfo')}</h4>
                  </div>
                  <button onClick={() => setCurrentStep(1)} className="text-sm text-violet-600 hover:text-violet-700 font-medium">
                    {t('newConnection.review.edit')}
                  </button>
                </div>
                <div className="p-4 grid grid-cols-2 gap-3 text-sm">
                  <div><span className="text-gray-500">{t('newConnection.applicantDetails.fullName')}:</span> <span className="font-medium text-gray-900">{formData.fullName}</span></div>
                  <div><span className="text-gray-500">{t('newConnection.applicantDetails.mobile')}:</span> <span className="font-medium text-gray-900">{formData.mobile}</span></div>
                  <div><span className="text-gray-500">{t('newConnection.applicantDetails.email')}:</span> <span className="font-medium text-gray-900">{formData.email}</span></div>
                  <div><span className="text-gray-500">{t('newConnection.applicantDetails.idProof')}:</span> <span className="font-medium text-gray-900">{t(`newConnection.applicantDetails.idTypes.${formData.idProofType}`)}</span></div>
                  <div><span className="text-gray-500">{t('newConnection.applicantDetails.documentNumber')}:</span> <span className="font-medium text-gray-900 font-mono">{formData.documentNumber}</span></div>
                </div>
              </div>

              {/* Address Info Review */}
              <div className="bg-gray-50 rounded-xl border-2 border-gray-200 overflow-hidden">
                <div className="px-4 py-3 bg-white border-b border-gray-200 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <MapPin size={18} className="text-violet-600" />
                    <h4 className="font-semibold text-gray-800">{t('newConnection.review.addressInfo')}</h4>
                  </div>
                  <button onClick={() => setCurrentStep(2)} className="text-sm text-violet-600 hover:text-violet-700 font-medium">
                    {t('newConnection.review.edit')}
                  </button>
                </div>
                <div className="p-4 text-sm">
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
              <div className="bg-gray-50 rounded-xl border-2 border-gray-200 overflow-hidden">
                <div className="px-4 py-3 bg-white border-b border-gray-200 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Zap size={18} className="text-violet-600" />
                    <h4 className="font-semibold text-gray-800">{t('newConnection.review.connectionInfo')}</h4>
                  </div>
                  <button onClick={() => setCurrentStep(3)} className="text-sm text-violet-600 hover:text-violet-700 font-medium">
                    {t('newConnection.review.edit')}
                  </button>
                </div>
                <div className="p-4 grid grid-cols-2 gap-3 text-sm">
                  <div><span className="text-gray-500">{t('newConnection.connectionDetails.connectionType')}:</span> <span className="font-medium text-gray-900">{t(`newConnection.connectionDetails.${formData.connectionType}`)}</span></div>
                  <div><span className="text-gray-500">{t('newConnection.connectionDetails.loadRequired')}:</span> <span className="font-medium text-gray-900">{formData.loadRequired}</span></div>
                  <div><span className="text-gray-500">{t('newConnection.connectionDetails.phase')}:</span> <span className="font-medium text-gray-900">{formData.phase === 'single' ? t('newConnection.connectionDetails.singlePhase') : t('newConnection.connectionDetails.threePhase')}</span></div>
                  {formData.purpose && <div><span className="text-gray-500">{t('newConnection.connectionDetails.purpose')}:</span> <span className="font-medium text-gray-900">{t(`newConnection.connectionDetails.purposes.${formData.purpose}`)}</span></div>}
                </div>
              </div>

              {/* Payment Summary */}
              <div className="bg-gradient-to-r from-violet-50 to-purple-50 rounded-xl border-2 border-violet-200 p-4">
                <h4 className="font-semibold text-gray-800 mb-3 flex items-center gap-2">
                  <CreditCard size={18} className="text-violet-600" />
                  {t('newConnection.review.paymentSummary')}
                </h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">{t('newConnection.connectionDetails.securityDeposit')}</span>
                    <span className="font-medium">₹{costs.securityDeposit.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">{t('newConnection.connectionDetails.processingFee')}</span>
                    <span className="font-medium">₹{costs.processingFee.toLocaleString()}</span>
                  </div>
                  <div className="border-t border-violet-300 pt-2 mt-2 flex justify-between">
                    <span className="font-bold text-gray-800">{t('newConnection.connectionDetails.totalPayable')}</span>
                    <span className="font-bold text-violet-700 text-xl">₹{costs.total.toLocaleString()}</span>
                  </div>
                </div>
              </div>

              {/* Terms Checkbox */}
              <div className="flex items-start gap-3">
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
            <div className="text-center space-y-6">
              {/* Success Animation */}
              <div className="w-20 h-20 mx-auto rounded-full bg-violet-100 flex items-center justify-center">
                <CheckCircle2 size={48} className="text-violet-600" />
              </div>
              
              <div>
                <h3 className="text-2xl font-bold text-gray-900">{t('newConnection.confirmation.title')}</h3>
                <p className="text-gray-600 mt-2">{t('newConnection.confirmation.subtitle')}</p>
              </div>

              {/* Application Details Card */}
              <div className="bg-gray-50 rounded-xl border-2 border-gray-200 p-4 sm:p-6 text-left max-w-lg mx-auto">
                <div className="space-y-4">
                  <div className="flex justify-between items-center pb-3 border-b border-gray-200">
                    <span className="text-sm text-gray-600">{t('newConnection.confirmation.applicationNo')}</span>
                    <span className="font-bold text-violet-700 font-mono">{generateApplicationNo()}</span>
                  </div>
                  <div className="flex justify-between items-center pb-3 border-b border-gray-200">
                    <span className="text-sm text-gray-600">{t('newConnection.confirmation.submittedOn')}</span>
                    <span className="font-medium text-gray-900">{new Date().toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' })}</span>
                  </div>
                  <div className="flex justify-between items-center pb-3 border-b border-gray-200">
                    <span className="text-sm text-gray-600">{t('newConnection.confirmation.estimatedCompletion')}</span>
                    <span className="font-medium text-gray-900">7-10 {t('newConnection.confirmation.workingDays')}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">{t('newConnection.confirmation.amountPaid')}</span>
                    <span className="font-bold text-violet-700 text-lg">₹{costs.total.toLocaleString()}</span>
                  </div>
                </div>
              </div>

              {/* SMS Confirmation */}
              <div className="bg-blue-50 rounded-xl border-2 border-blue-200 p-4 max-w-lg mx-auto">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0">
                    <MessageSquare size={20} className="text-blue-600" />
                  </div>
                  <div className="text-left">
                    <p className="font-semibold text-blue-800">{t('newConnection.confirmation.smsConfirmation')}</p>
                    <p className="text-sm text-blue-700">{t('newConnection.confirmation.smsSent')} <span className="font-mono font-medium">{formData.mobile}</span></p>
                    <p className="text-sm text-blue-700">{t('newConnection.confirmation.emailSent')} <span className="font-medium">{formData.email}</span></p>
                  </div>
                </div>
              </div>

              {/* Next Steps */}
              <div className="bg-gray-50 rounded-xl border-2 border-gray-200 p-4 sm:p-6 text-left max-w-lg mx-auto">
                <h4 className="font-bold text-gray-800 mb-4 flex items-center gap-2">
                  <ArrowRight size={18} className="text-violet-600" />
                  {t('newConnection.confirmation.nextSteps')}
                </h4>
                <ol className="space-y-3 text-sm text-gray-700">
                  <li className="flex gap-3">
                    <span className="w-6 h-6 rounded-full bg-violet-100 text-violet-700 flex items-center justify-center flex-shrink-0 font-bold text-xs">1</span>
                    <span>{t('newConnection.confirmation.step1')}</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="w-6 h-6 rounded-full bg-violet-100 text-violet-700 flex items-center justify-center flex-shrink-0 font-bold text-xs">2</span>
                    <span>{t('newConnection.confirmation.step2')}</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="w-6 h-6 rounded-full bg-violet-100 text-violet-700 flex items-center justify-center flex-shrink-0 font-bold text-xs">3</span>
                    <span>{t('newConnection.confirmation.step3')}</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="w-6 h-6 rounded-full bg-violet-100 text-violet-700 flex items-center justify-center flex-shrink-0 font-bold text-xs">4</span>
                    <span>{t('newConnection.confirmation.step4')}</span>
                  </li>
                </ol>
              </div>

              {/* Payment Receipt Summary */}
              <div className="bg-gradient-to-r from-violet-50 to-purple-50 rounded-xl border-2 border-violet-200 p-4 sm:p-6 max-w-lg mx-auto">
                <h4 className="font-bold text-gray-800 mb-3 flex items-center gap-2 justify-center">
                  <CreditCard size={18} className="text-violet-600" />
                  {t('newConnection.confirmation.paymentReceipt')}
                </h4>
                <div className="space-y-2 text-sm">
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
                      <Check size={14} /> {t('newConnection.confirmation.successful')}
                    </span>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-3 justify-center max-w-lg mx-auto">
                <button
                  onClick={handlePrint}
                  className="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-white border-2 border-gray-300 text-gray-700 rounded-lg font-semibold hover:bg-gray-50 transition-colors"
                >
                  <Printer size={18} />
                  {t('newConnection.confirmation.printAcknowledgement')}
                </button>
                <button
                  onClick={() => {}}
                  className="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-white border-2 border-violet-500 text-violet-700 rounded-lg font-semibold hover:bg-violet-50 transition-colors"
                >
                  <Download size={18} />
                  {t('newConnection.confirmation.downloadReceipt')}
                </button>
              </div>

              <button
                onClick={onClose}
                className="px-8 py-3 bg-gradient-to-r from-violet-600 to-violet-700 text-white rounded-lg font-bold hover:from-violet-700 hover:to-violet-800 transition-all shadow-lg"
              >
                {t('newConnection.confirmation.backToServices')}
              </button>
            </div>
          )}
        </div>

        {/* Footer Navigation */}
        {currentStep < 5 && (
          <div className="px-4 sm:px-6 py-4 bg-gray-50 border-t border-gray-200 flex items-center justify-between flex-shrink-0">
            <button
              onClick={currentStep === 1 ? onClose : handleBack}
              className="flex items-center gap-2 px-4 sm:px-6 py-2.5 text-gray-600 hover:text-gray-800 font-medium transition-colors"
            >
              <ChevronLeft size={20} />
              <span className="hidden sm:inline">{currentStep === 1 ? t('common.cancel') : t('progress.back')}</span>
            </button>

            {currentStep === 4 ? (
              <button
                onClick={handleSubmit}
                disabled={isSubmitting}
                className="flex items-center gap-2 px-6 sm:px-8 py-2.5 bg-gradient-to-r from-violet-600 to-violet-700 text-white rounded-lg font-bold hover:from-violet-700 hover:to-violet-800 transition-all disabled:opacity-50 shadow-sm"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 size={18} className="animate-spin" />
                    {t('newConnection.review.submitting')}
                  </>
                ) : (
                  <>
                    <CreditCard size={18} />
                    {t('newConnection.review.submitApplication')}
                  </>
                )}
              </button>
            ) : (
              <button
                onClick={handleNext}
                className="flex items-center gap-2 px-6 sm:px-8 py-2.5 bg-gradient-to-r from-violet-600 to-violet-700 text-white rounded-lg font-bold hover:from-violet-700 hover:to-violet-800 transition-all shadow-sm"
              >
                <span>{t('progress.next')}</span>
                <ChevronRight size={20} />
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default NewConnectionForm;
