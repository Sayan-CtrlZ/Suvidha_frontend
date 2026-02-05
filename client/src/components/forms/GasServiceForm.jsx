import React, { useState } from 'react';
import { X, CheckCircle2, Upload, Calendar, MapPin, AlertTriangle, Flame } from 'lucide-react';

const GasServiceForm = ({ isOpen, onClose, category, action }) => {
    const [submitted, setSubmitted] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        consumerNumber: '',
        description: '',
        address: '',
        date: ''
    });

    if (!isOpen) return null;

    const handleSubmit = (e) => {
        e.preventDefault();
        setTimeout(() => {
            setSubmitted(true);
        }, 1000);
    };

    const resetForm = () => {
        setSubmitted(false);
        setFormData({ name: '', consumerNumber: '', description: '', address: '', date: '' });
        onClose();
    };

    const renderFields = () => {
        // Safety & Emergency (Gas Special)
        if (category === 'safety' || action.toLowerCase().includes('leak')) {
            return (
                <>
                    <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-4 flex items-start gap-3">
                        <AlertTriangle className="text-red-600 shrink-0 mt-0.5" size={20} />
                        <div>
                            <h4 className="font-bold text-red-700 text-sm">Emergency Reporting</h4>
                            <p className="text-red-600 text-xs mt-1">
                                Your location will be shared with the emergency response team immediately.
                            </p>
                        </div>
                    </div>
                    <div className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Description of Incident</label>
                            <textarea
                                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 outline-none"
                                rows="3"
                                placeholder="Describe the leak or emergency..."
                                required
                            ></textarea>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Location Details</label>
                            <div className="flex gap-2">
                                <input
                                    type="text"
                                    className="flex-1 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 outline-none"
                                    placeholder="Enter address or landmark"
                                />
                                <button type="button" className="p-3 bg-gray-100 rounded-lg text-gray-600 hover:bg-gray-200">
                                    <MapPin size={20} />
                                </button>
                            </div>
                        </div>
                    </div>
                </>
            );
        }

        // Billing & Payments
        if (category === 'billing') {
            return (
                <div className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Consumer Number</label>
                        <input
                            type="text"
                            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                            placeholder="Enter Gas Consumer ID"
                            required
                        />
                    </div>
                    {action.includes('Pay') && (
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Amount (INR)</label>
                            <input
                                type="number"
                                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                                placeholder="0.00"
                            />
                        </div>
                    )}
                </div>
            );
        }

        // New Connections & Transfers
        if (category === 'connection') {
            return (
                <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">First Name</label>
                            <input type="text" className="w-full p-3 border border-gray-300 rounded-lg outline-none focus:border-blue-500" />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Last Name</label>
                            <input type="text" className="w-full p-3 border border-gray-300 rounded-lg outline-none focus:border-blue-500" />
                        </div>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Address</label>
                        <textarea className="w-full p-3 border border-gray-300 rounded-lg outline-none focus:border-blue-500" rows="2"></textarea>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Upload ID Proof (Aadhar/PAN)</label>
                        <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center cursor-pointer hover:bg-gray-50 flex flex-col items-center justify-center text-gray-500">
                            <Upload size={24} className="mb-2" />
                            <span className="text-sm">Click to upload document</span>
                        </div>
                    </div>
                </div>
            );
        }

        // Cylinder Booking (Gas Special)
        if (category === 'cylinder') {
            return (
                <div className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">LPG ID / Consumer No.</label>
                        <input type="text" className="w-full p-3 border border-gray-300 rounded-lg outline-none focus:border-blue-500" placeholder="17-digit LPG ID" />
                    </div>
                    <div className="bg-orange-50 p-3 rounded-lg text-sm text-orange-800">
                        Note: Booking will be linked to your registered mobile number.
                    </div>
                </div>
            );
        }

        // Default / Complaints / Others
        return (
            <div className="space-y-4">
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Consumer Number (Optional)</label>
                    <input
                        type="text"
                        className="w-full p-3 border border-gray-300 rounded-lg outline-none focus:border-blue-500"
                        placeholder="Consumer ID if applicable"
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Details</label>
                    <textarea
                        className="w-full p-3 border border-gray-300 rounded-lg outline-none focus:border-blue-500"
                        rows="4"
                        placeholder={`Provide details for: ${action}`}
                    ></textarea>
                </div>
            </div>
        );
    };

    // Success View
    if (submitted) {
        return (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
                <div className="bg-white rounded-3xl w-full max-w-md p-8 text-center shadow-2xl scale-100 transition-transform">
                    <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                        <CheckCircle2 size={40} className="text-green-600" />
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">Request Submitted!</h3>
                    <p className="text-gray-600 mb-8">
                        Your request for <strong>{action}</strong> has been successfully registered.
                        <br />Reference ID: <span className="font-mono font-bold text-gray-800">GAS-{Math.floor(Math.random() * 10000)}</span>
                    </p>
                    <button
                        onClick={resetForm}
                        className="w-full py-3 bg-gray-900 text-white rounded-xl font-bold hover:bg-gray-800 transition-colors"
                    >
                        Close
                    </button>
                </div>
            </div>
        );
    }

    // Main Form View
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-in fade-in duration-200">
            <div
                className="bg-white rounded-3xl w-full max-w-lg shadow-2xl flex flex-col max-h-[90vh] animate-in zoom-in-95 duration-200"
                role="dialog"
            >
                {/* Header */}
                <div className={`px-6 py-5 border-b border-gray-100 flex items-center justify-between ${category === 'safety' ? 'bg-red-50 rounded-t-3xl' : 'bg-white rounded-t-3xl'
                    }`}>
                    <div>
                        <p className={`text-xs font-bold uppercase tracking-wider mb-1 ${category === 'safety' ? 'text-red-500' : 'text-orange-500'
                            }`}>
                            Gas Service
                        </p>
                        <h3 className="text-xl font-bold text-gray-900">{action}</h3>
                    </div>
                    <button
                        onClick={onClose}
                        className="p-2 bg-gray-100 rounded-full hover:bg-gray-200 transition-colors"
                    >
                        <X size={20} className="text-gray-600" />
                    </button>
                </div>

                {/* Content */}
                <div className="p-6 overflow-y-auto custom-scrollbar">
                    <form id="gas-service-form" onSubmit={handleSubmit}>
                        {renderFields()}
                    </form>
                </div>

                {/* Footer */}
                <div className="px-6 py-5 border-t border-gray-100 bg-gray-50 rounded-b-3xl flex justify-end gap-3">
                    <button
                        type="button"
                        onClick={onClose}
                        className="px-6 py-2.5 text-gray-600 font-bold hover:bg-gray-200 rounded-xl transition-colors"
                    >
                        Cancel
                    </button>
                    <button
                        type="submit"
                        form="gas-service-form"
                        className={`px-8 py-2.5 text-white rounded-xl font-bold shadow-lg transition-all active:scale-95 ${category === 'safety'
                                ? 'bg-red-600 hover:bg-red-700 shadow-red-200'
                                : 'bg-orange-600 hover:bg-orange-700 shadow-orange-200'
                            }`}
                    >
                        Submit Request
                    </button>
                </div>
            </div>
        </div>
    );
};

export default GasServiceForm;
