import React, { useState, useRef } from 'react';
import {
    X, User, MapPin, FileText, Camera, Upload, Check, AlertCircle,
    Loader2, CheckCircle2, Shield, ChevronDown, ChevronRight, Download
} from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';
import { useMultiStepForm, useFormValidation } from '../../hooks';

const ComplaintForm = ({ isOpen, onClose, category: initialCategory }) => {
    const { t } = useLanguage();

    const ticketCategories = [
        { id: 'pothole', name: 'Roads & Potholes' },
        { id: 'water', name: 'Water Supply & Leakage' },
        { id: 'waste', name: 'Garbage & Sanitation' },
        { id: 'light', name: 'Street Lights' },
        { id: 'drainage', name: 'Drainage & Sewage' },
        { id: 'animal', name: 'Stray Animals' },
        { id: 'construction', name: 'Illegal Construction' },
        { id: 'other', name: 'Other Civic Issues' }
    ];

    const {
        currentStep,
        next: nextStep,
        back: backStep,
        goTo: goToStep,
        isFirstStep,
        isLastStep
    } = useMultiStepForm(2);

    const validationRules = {
        name: { required: true, message: 'Full Name is required' },
        mobile: { required: true, pattern: /^\d{10}$/, message: 'Invalid Mobile Number' },
        category: { required: true, message: 'Please select a complaint category' },
        address: { required: true, message: 'Location/Address is required' },
        description: { required: true, message: 'Description is required' }
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
        name: '', mobile: '', category: initialCategory || '', address: '', description: '',
        document: null, documentPreview: null, documentType: null
    }, validationRules, async (values) => {
        setIsSubmittingState(true);
        await new Promise(resolve => setTimeout(resolve, 2000));
        setTicketId(`GRV-${new Date().getFullYear()}-${Math.floor(100000 + Math.random() * 900000)}`);
        setIsSubmittingState(false);
        setSubmitted(true);
    });

    const [isSubmittingState, setIsSubmittingState] = useState(false);
    const [submitted, setSubmitted] = useState(false);
    const fileInputRef = useRef(null);
    const [ticketId, setTicketId] = useState('');
    const [isLocating, setIsLocating] = useState(false);

    const handleGetCurrentLocation = () => {
        if (!navigator.geolocation) {
            alert('Geolocation is not supported by your browser');
            return;
        }

        setIsLocating(true);
        navigator.geolocation.getCurrentPosition(
            async (position) => {
                const { latitude, longitude } = position.coords;
                try {
                    const response = await fetch(
                        `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}&zoom=18&addressdetails=1`
                    );
                    const data = await response.json();
                    if (data && data.display_name) {
                        setFieldValue('address', data.display_name);
                    } else {
                        setFieldValue('address', `Lat: ${latitude}, Long: ${longitude}`);
                    }
                } catch (error) {
                    setFieldValue('address', `Lat: ${latitude}, Long: ${longitude}`);
                } finally {
                    setIsLocating(false);
                }
            },
            (error) => {
                alert('Unable to retrieve your location');
                setIsLocating(false);
            }
        );
    };

    const handleChange = (field, value) => {
        setFieldValue(field, value);
    };

    const handleFileUpload = (e) => {
        const file = e.target.files[0];
        if (file) {
            if (file.size > 5 * 1024 * 1024) {
                alert('File size should be less than 5MB');
                return;
            }

            const fileType = file.type.includes('pdf') ? 'pdf' : 'image';

            const reader = new FileReader();
            reader.onload = (event) => {
                setValues({
                    ...formData,
                    document: file,
                    documentPreview: event.target.result,
                    documentType: fileType
                });
            };
            reader.readAsDataURL(file);
        }
    };

    const validateStep = async (step) => {
        const stepFields = {
            1: ['name', 'mobile'],
            2: ['category', 'address', 'description']
        };

        const fieldsToValidate = stepFields[step] || [];
        const stepErrors = await validateForm();
        const hasStepErrors = fieldsToValidate.some(field => !!stepErrors[field]);
        return !hasStepErrors;
    };

    const handleNext = async () => {
        if (await validateStep(currentStep)) {
            nextStep();
        }
    };

    const handleBack = () => {
        backStep();
    };

    const handleSubmit = async () => {
        handleFormSubmit();
    };

    const handleDownloadReceipt = async () => {
        const jsPDFModule = await import('jspdf');
        const jsPDF = jsPDFModule.default;
        const doc = new jsPDF();

        // Colors
        const primaryColor = [109, 40, 217]; // violet-700
        const secondaryColor = [75, 85, 99]; // gray-600

        // Header Background
        doc.setFillColor(109, 40, 217);
        doc.rect(0, 0, 210, 40, 'F');

        // Header Text
        doc.setTextColor(255, 255, 255);
        doc.setFontSize(22);
        doc.setFont('helvetica', 'bold');
        doc.text('Grievance Receipt', 105, 20, { align: 'center' });
        doc.setFontSize(10);
        doc.text('Suvidha Municipal Services', 105, 30, { align: 'center' });

        // Content
        doc.setTextColor(0, 0, 0);
        let yPos = 60;

        // Ticket ID (Highlighted)
        doc.setFontSize(12);
        doc.setTextColor(...secondaryColor);
        doc.text('Reference ID', 20, yPos);
        yPos += 8;
        doc.setFontSize(18);
        doc.setTextColor(...primaryColor);
        doc.setFont('courier', 'bold');
        doc.text(ticketId, 20, yPos);
        yPos += 15;

        // Divider
        doc.setDrawColor(229, 231, 235);
        doc.line(20, yPos, 190, yPos);
        yPos += 15;

        // Details
        const details = [
            ['Date', new Date().toLocaleDateString()],
            ['Category', ticketCategories.find(c => c.id === formData.category)?.name || formData.category],
            ['Complainant', formData.name],
            ['Mobile', `+91 ${formData.mobile}`],
            ['Address', formData.address],
        ];

        doc.setFont('helvetica', 'normal');
        details.forEach(([label, value]) => {
            doc.setFontSize(10);
            doc.setTextColor(...secondaryColor);
            doc.text(label, 20, yPos);

            doc.setFontSize(12);
            doc.setTextColor(0, 0, 0);

            // Handle potentially long text for address
            if (label === 'Address') {
                const splitAddress = doc.splitTextToSize(value, 120);
                doc.text(splitAddress, 70, yPos);
                yPos += splitAddress.length * 6;
            } else {
                doc.text(value, 70, yPos);
                yPos += 10;
            }
            yPos += 5; // Extra spacing
        });

        // Description
        yPos += 5;
        doc.setFontSize(10);
        doc.setTextColor(...secondaryColor);
        doc.text('Description', 20, yPos);
        yPos += 8;
        doc.setFontSize(11);
        doc.setTextColor(0, 0, 0);
        const splitDesc = doc.splitTextToSize(formData.description, 170);
        doc.text(splitDesc, 20, yPos);

        // Footer message
        const footerY = 280;
        doc.setFontSize(8);
        doc.setTextColor(150, 150, 150);
        doc.text('This is a computer generated receipt.', 105, footerY, { align: 'center' });
        doc.text('Track your status at Suvidha Portal.', 105, footerY + 5, { align: 'center' });

        doc.save(`${ticketId}_Receipt.pdf`);
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-md z-[100] flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
            <div className="bg-white rounded-3xl shadow-2xl w-full max-w-5xl overflow-hidden flex flex-col max-h-[90vh] border-4 border-gray-100 my-auto">

                {/* Header */}
                <div className="bg-gradient-to-r from-violet-700 to-violet-600 px-8 py-6 flex items-center justify-between flex-shrink-0">
                    <div className="flex items-center gap-5">
                        <div className="w-16 h-16 rounded-2xl bg-white/20 backdrop-blur-sm flex items-center justify-center border-2 border-white/30">
                            <FileText size={32} className="text-white" />
                        </div>
                        <div>
                            <h2 className="text-3xl font-extrabold text-white">File Municipal Complaint</h2>
                            <p className="text-lg text-white/90 font-medium">Report issues for quick resolution</p>
                        </div>
                    </div>
                    <button onClick={onClose} className="w-14 h-14 rounded-full bg-white/20 hover:bg-white/30 flex items-center justify-center text-white transition-colors active:scale-95">
                        <X size={32} />
                    </button>
                </div>

                {/* Success State */}
                {submitted ? (
                    <div className="p-8 sm:p-12 flex flex-col items-center justify-center text-center h-full overflow-y-auto">
                        <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mb-8 animate-in zoom-in duration-300 shadow-lg">
                            <CheckCircle2 size={56} className="text-green-600" />
                        </div>
                        <h3 className="text-4xl font-extrabold text-gray-900 mb-4">Complaint Registered!</h3>
                        <p className="text-gray-600 mb-10 max-w-lg text-lg font-medium">
                            Your complaint has been successfully submitted. Please save your reference number.
                        </p>

                        <div className="bg-violet-50 border-4 border-violet-100 rounded-3xl p-8 mb-10 w-full max-w-md relative overflow-hidden group shadow-md transition-transform hover:scale-105">
                            {/* Decorative background elements */}
                            <div className="absolute top-0 right-0 w-24 h-24 bg-violet-100 rounded-bl-full -mr-10 -mt-10 opacity-70"></div>
                            <div className="absolute bottom-0 left-0 w-32 h-32 bg-violet-100 rounded-tr-full -ml-16 -mb-16 opacity-70"></div>

                            <p className="text-base font-bold text-violet-600 mb-3 uppercase tracking-wider">Reference Number</p>
                            <p className="text-4xl font-mono font-extrabold text-gray-900 tracking-wider break-all">{ticketId}</p>

                            <div className="mt-6 pt-6 border-t-2 border-violet-200">
                                <div className="grid grid-cols-2 gap-6 text-left">
                                    <div>
                                        <p className="text-sm text-gray-500 font-bold uppercase mb-1">Category</p>
                                        <p className="text-lg font-bold text-gray-800 line-clamp-1">
                                            {ticketCategories.find(c => c.id === formData.category)?.name || formData.category}
                                        </p>
                                    </div>
                                    <div>
                                        <p className="text-sm text-gray-500 font-bold uppercase mb-1">Date</p>
                                        <p className="text-lg font-bold text-gray-800">{new Date().toLocaleDateString()}</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="flex flex-col sm:flex-row gap-4 w-full max-w-lg">
                            <button
                                onClick={handleDownloadReceipt}
                                className="flex-1 px-8 py-4 bg-white border-4 border-green-600 text-green-700 font-bold rounded-2xl hover:bg-green-50 transition-all active:scale-95 flex items-center justify-center gap-3 text-lg shadow-sm"
                            >
                                <Download size={24} />
                                Download Receipt
                            </button>
                            <button
                                onClick={onClose}
                                className="flex-1 px-8 py-4 bg-violet-600 text-white font-bold rounded-2xl hover:bg-violet-700 transition-all active:scale-95 shadow-lg shadow-violet-200 text-lg flex items-center justify-center gap-3"
                            >
                                Done <ChevronRight size={24} />
                            </button>
                        </div>
                        <p className="text-sm text-gray-500 mt-8 font-medium bg-gray-50 px-4 py-2 rounded-full">A confirmation SMS has also been sent to <span className="text-gray-900 font-bold">+91 {formData.mobile}</span></p>
                    </div>
                ) : (
                    /* Form Content */
                    <div className="flex-1 overflow-y-auto p-8">
                        {/* Progress Indicator */}
                        <div className="flex items-center justify-center mb-10">
                            <div className={`flex items-center gap-3 ${currentStep >= 1 ? 'text-violet-700' : 'text-gray-400'}`}>
                                <div className={`w-12 h-12 rounded-full flex items-center justify-center text-xl font-bold border-4 transition-all ${currentStep >= 1 ? 'bg-violet-100 border-violet-600 scale-110' : 'border-gray-300'}`}>1</div>
                                <span className="text-xl font-bold hidden sm:inline">Personal</span>
                            </div>
                            <div className={`w-24 h-2 mx-4 rounded-full ${currentStep >= 2 ? 'bg-violet-600' : 'bg-gray-200'}`}></div>
                            <div className={`flex items-center gap-3 ${currentStep >= 2 ? 'text-violet-700' : 'text-gray-400'}`}>
                                <div className={`w-12 h-12 rounded-full flex items-center justify-center text-xl font-bold border-4 transition-all ${currentStep >= 2 ? 'bg-violet-100 border-violet-600 scale-110' : 'border-gray-300'}`}>2</div>
                                <span className="text-xl font-bold hidden sm:inline">Details</span>
                            </div>
                        </div>

                        {/* Step 1: Personal Details */}
                        {currentStep === 1 && (
                            <div className="space-y-8 animate-in fade-in slide-in-from-right-4 duration-300 max-w-3xl mx-auto">
                                <div>
                                    <label className="block text-xl font-bold text-gray-800 mb-3 ml-1">Full Name <span className="text-red-500">*</span></label>
                                    <div className="relative">
                                        <User size={28} className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400" />
                                        <input
                                            type="text"
                                            value={formData.name}
                                            onChange={(e) => handleChange('name', e.target.value)}
                                            placeholder="Enter your full name"
                                            className={`w-full pl-16 pr-6 py-5 border-2 rounded-2xl text-xl font-medium focus:outline-none transition-all shadow-sm ${errors.name ? 'border-red-300 focus:border-red-400 bg-red-50' : 'border-gray-200 focus:border-violet-500 focus:ring-4 focus:ring-violet-100'}`}
                                        />
                                    </div>
                                    {errors.name && <p className="text-base text-red-600 mt-2 font-medium ml-1 flex items-center gap-1"><AlertCircle size={16} /> {errors.name}</p>}
                                </div>

                                <div>
                                    <label className="block text-xl font-bold text-gray-800 mb-3 ml-1">Mobile Number <span className="text-red-500">*</span></label>
                                    <div className="relative">
                                        <div className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-500 font-bold text-xl">+91</div>
                                        <input
                                            type="tel"
                                            value={formData.mobile}
                                            onChange={(e) => handleChange('mobile', e.target.value.replace(/\D/g, '').slice(0, 10))}
                                            placeholder="Enter 10 digit mobile number"
                                            className={`w-full pl-20 pr-6 py-5 border-2 rounded-2xl text-xl font-medium focus:outline-none transition-all shadow-sm ${errors.mobile ? 'border-red-300 focus:border-red-400 bg-red-50' : 'border-gray-200 focus:border-violet-500 focus:ring-4 focus:ring-violet-100'}`}
                                        />
                                    </div>
                                    {errors.mobile && <p className="text-base text-red-600 mt-2 font-medium ml-1 flex items-center gap-1"><AlertCircle size={16} /> {errors.mobile}</p>}
                                </div>
                            </div>
                        )}

                        {/* Step 2: Complaint Details */}
                        {/* Step 2: Complaint Details */}
                        {currentStep === 2 && (
                            <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-300 max-w-3xl mx-auto">

                                {/* Visual Category Selection */}
                                <div>
                                    <label className="block text-xl font-bold text-gray-800 mb-3 ml-1">Complaint Category <span className="text-red-500">*</span></label>
                                    <div className="relative">
                                        <select
                                            value={formData.category}
                                            onChange={(e) => handleChange('category', e.target.value)}
                                            className={`w-full px-6 py-5 border-2 rounded-2xl text-xl font-medium focus:outline-none transition-all appearance-none bg-white shadow-sm pr-12 ${errors.category ? 'border-red-300 focus:border-red-400 bg-red-50' : 'border-gray-200 focus:border-violet-500 focus:ring-4 focus:ring-violet-100'}`}
                                        >
                                            <option value="">Select a category</option>
                                            {ticketCategories.map(cat => (
                                                <option key={cat.id} value={cat.id}>{cat.name}</option>
                                            ))}
                                        </select>
                                        <ChevronDown size={28} className="absolute right-5 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
                                    </div>
                                    {errors.category && <p className="text-base text-red-600 mt-2 font-medium ml-1 flex items-center gap-1"><AlertCircle size={16} /> {errors.category}</p>}
                                </div>

                                <div>
                                    <div className="flex justify-between items-center mb-3 ml-1">
                                        <label className="block text-xl font-bold text-gray-800">Location / Address <span className="text-red-500">*</span></label>
                                        <button
                                            onClick={handleGetCurrentLocation}
                                            type="button"
                                            className="text-sm font-bold text-violet-600 hover:text-white bg-violet-100 hover:bg-violet-600 px-4 py-2 rounded-xl transition-all flex items-center gap-2 active:scale-95"
                                            disabled={isLocating}
                                        >
                                            {isLocating ? <Loader2 size={16} className="animate-spin" /> : <MapPin size={16} />}
                                            {isLocating ? 'Detecting...' : 'Use Current Location'}
                                        </button>
                                    </div>
                                    <div className="relative">
                                        <MapPin size={28} className="absolute left-5 top-5 text-gray-400" />
                                        <textarea
                                            value={formData.address}
                                            onChange={(e) => handleChange('address', e.target.value)}
                                            placeholder="Enter location manually or use current location"
                                            rows={3}
                                            className={`w-full pl-16 pr-6 py-5 border-2 rounded-2xl text-xl font-medium focus:outline-none transition-all shadow-sm resize-none ${errors.address ? 'border-red-300 focus:border-red-400 bg-red-50' : 'border-gray-200 focus:border-violet-500 focus:ring-4 focus:ring-violet-100'}`}
                                        />
                                    </div>
                                    {errors.address && <p className="text-base text-red-600 mt-2 font-medium ml-1 flex items-center gap-1"><AlertCircle size={16} /> {errors.address}</p>}
                                </div>

                                <div>
                                    <label className="block text-xl font-bold text-gray-800 mb-3 ml-1">Description <span className="text-red-500">*</span></label>
                                    <div className="relative">
                                        <FileText size={28} className="absolute left-5 top-5 text-gray-400" />
                                        <textarea
                                            value={formData.description}
                                            onChange={(e) => handleChange('description', e.target.value)}
                                            placeholder="Describe the issue in detail..."
                                            rows={4}
                                            className={`w-full pl-16 pr-6 py-5 border-2 rounded-2xl text-xl font-medium focus:outline-none transition-all shadow-sm resize-none ${errors.description ? 'border-red-300 focus:border-red-400 bg-red-50' : 'border-gray-200 focus:border-violet-500 focus:ring-4 focus:ring-violet-100'}`}
                                        />
                                    </div>
                                    {errors.description && <p className="text-base text-red-600 mt-2 font-medium ml-1 flex items-center gap-1"><AlertCircle size={16} /> {errors.description}</p>}
                                </div>

                                <div>
                                    <label className="block text-xl font-bold text-gray-800 mb-3 ml-1">Supporting Document (Photo/PDF)</label>
                                    <div
                                        onClick={() => fileInputRef.current?.click()}
                                        className="border-4 border-dashed border-gray-300 rounded-3xl p-8 flex flex-col items-center justify-center cursor-pointer hover:bg-violet-50 hover:border-violet-400 transition-all active:scale-95 bg-gray-50 group min-h-[200px]"
                                    >
                                        {formData.documentPreview ? (
                                            <div className="relative w-full h-48 rounded-2xl overflow-hidden group-hover:shadow-md transition-all">
                                                {formData.documentType === 'image' ? (
                                                    <img src={formData.documentPreview} alt="Preview" className="w-full h-full object-cover" />
                                                ) : (
                                                    <div className="w-full h-full flex flex-col items-center justify-center bg-gray-200">
                                                        <FileText size={48} className="text-red-500 mb-3" />
                                                        <span className="text-lg font-bold text-gray-700">{formData.document?.name}</span>
                                                    </div>
                                                )}
                                                <div className="absolute inset-0 bg-black/40 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity backdrop-blur-sm">
                                                    <Camera size={40} className="text-white mb-2" />
                                                    <span className="text-white text-lg font-bold">Tap to change</span>
                                                </div>
                                            </div>
                                        ) : (
                                            <>
                                                <div className="w-20 h-20 bg-violet-100 rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                                                    <Upload size={32} className="text-violet-600" />
                                                </div>
                                                <p className="text-xl font-bold text-gray-600">Tap to upload proof</p>
                                                <p className="text-base text-gray-400 mt-2">Max 5MB (JPG, PNG, PDF)</p>
                                            </>
                                        )}
                                        <input
                                            type="file"
                                            ref={fileInputRef}
                                            onChange={handleFileUpload}
                                            accept="image/*,.pdf"
                                            className="hidden"
                                        />
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Navigation Buttons */}
                        <div className="flex gap-4 mt-8 pt-6 border-t border-gray-100">
                            {currentStep === 2 && (
                                <button
                                    onClick={handleBack}
                                    className="px-8 py-4 border-2 border-gray-200 text-gray-700 font-bold rounded-2xl hover:bg-gray-100 transition-colors text-lg"
                                >
                                    Back
                                </button>
                            )}

                            {currentStep === 1 ? (
                                <button
                                    onClick={handleNext}
                                    className="flex-1 px-8 py-4 bg-violet-600 text-white font-bold rounded-2xl hover:bg-violet-700 transition-colors shadow-lg shadow-violet-200 text-lg flex items-center justify-center gap-3 active:scale-95"
                                >
                                    Next Step <ChevronRight size={24} />
                                </button>
                            ) : (
                                <button
                                    onClick={handleSubmit}
                                    disabled={isSubmittingState}
                                    className="flex-1 px-8 py-4 bg-gradient-to-r from-violet-600 to-violet-700 text-white font-bold rounded-2xl hover:from-violet-700 hover:to-violet-800 transition-all shadow-lg shadow-violet-200 flex items-center justify-center gap-3 disabled:opacity-70 text-lg active:scale-95"
                                >
                                    {isSubmittingState ? (
                                        <>
                                            <Loader2 size={24} className="animate-spin" />
                                            Submitting...
                                        </>
                                    ) : (
                                        <>
                                            Submit Complaint
                                            <Check size={24} />
                                        </>
                                    )}
                                </button>
                            )}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ComplaintForm;
