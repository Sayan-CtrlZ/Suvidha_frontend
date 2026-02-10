import React, { useState } from 'react';
import { X, CheckCircle2, Upload, Calendar, MapPin, AlertTriangle, Globe, Search } from 'lucide-react';
import { locationData } from '../../constants/locations';

const WaterServiceForm = ({ isOpen, onClose, category, action }) => {
    const [submitted, setSubmitted] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        consumerNumber: '',
        description: '',
        state: '',
        district: '',
        addressDetail: '',
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
        setFormData({ name: '', consumerNumber: '', description: '', state: '', district: '', addressDetail: '', date: '' });
        onClose();
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value,
            ...(name === 'state' ? { district: '' } : {})
        }));
    };

    const renderFields = () => {
        // Water Leakage / Emergency
        if (category === 'complaint' && action.includes('LEAKAGE')) {
            return (
                <>
                    <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-4 flex items-start gap-3">
                        <AlertTriangle className="text-red-600 shrink-0 mt-0.5" size={20} />
                        <div>
                            <h4 className="font-bold text-red-700 text-sm">Report Water Leakage</h4>
                            <p className="text-red-600 text-xs mt-1">
                                Please provide accurate location details for quick resolution.
                            </p>
                        </div>
                    </div>
                    <div className="space-y-4">
                        <div>
                            <label className="block text-sm font-bold text-gray-700 mb-1">Detailed Description</label>
                            <textarea
                                name="description"
                                value={formData.description}
                                onChange={handleInputChange}
                                className="w-full p-3 border-2 border-slate-100 rounded-xl focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 outline-none transition-all"
                                rows="3"
                                placeholder="Where exactly is the leak? How big is it?"
                                required
                            ></textarea>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-bold text-gray-700 mb-1">State</label>
                                <select
                                    name="state"
                                    value={formData.state}
                                    onChange={handleInputChange}
                                    className="w-full p-3 border-2 border-slate-100 rounded-xl focus:border-blue-500 outline-none"
                                >
                                    <option value="">Select State</option>
                                    {Object.keys(locationData).sort().map(s => <option key={s} value={s}>{s}</option>)}
                                </select>
                            </div>
                            <div>
                                <label className="block text-sm font-bold text-gray-700 mb-1">District</label>
                                <select
                                    name="district"
                                    value={formData.district}
                                    onChange={handleInputChange}
                                    disabled={!formData.state}
                                    className="w-full p-3 border-2 border-slate-100 rounded-xl focus:border-blue-500 outline-none disabled:opacity-50"
                                >
                                    <option value="">Select District</option>
                                    {formData.state && locationData[formData.state].sort().map(d => <option key={d} value={d}>{d}</option>)}
                                </select>
                            </div>
                        </div>
                        <div>
                            <label className="block text-sm font-bold text-gray-700 mb-1">Local Address</label>
                            <div className="flex gap-2">
                                <input
                                    type="text"
                                    name="addressDetail"
                                    value={formData.addressDetail}
                                    onChange={handleInputChange}
                                    className="flex-1 p-3 border-2 border-slate-100 rounded-xl focus:border-blue-500 outline-none"
                                    placeholder="House/Street/Landmark"
                                />
                                <button type="button" className="p-3 bg-slate-100 rounded-xl text-slate-600 hover:bg-slate-200 transition-colors">
                                    <MapPin size={20} />
                                </button>
                            </div>
                        </div>
                    </div>
                </>
            );
        }

        // Billing
        if (category === 'billing') {
            return (
                <div className="space-y-4">
                    <div>
                        <label className="block text-sm font-bold text-gray-700 mb-1">Consumer Number</label>
                        <input
                            type="text"
                            name="consumerNumber"
                            value={formData.consumerNumber}
                            onChange={handleInputChange}
                            className="w-full p-3 border-2 border-slate-100 rounded-xl focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 outline-none transition-all font-mono"
                            placeholder="Example: 12345678"
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

        // New Connections
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
                        <label className="block text-sm font-medium text-gray-700 mb-1">Property Address</label>
                        <textarea className="w-full p-3 border border-gray-300 rounded-lg outline-none focus:border-blue-500" rows="2"></textarea>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Upload Property Verification</label>
                        <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center cursor-pointer hover:bg-gray-50 flex flex-col items-center justify-center text-gray-500">
                            <Upload size={24} className="mb-2" />
                            <span className="text-sm">Click to upload document</span>
                        </div>
                    </div>
                </div>
            );
        }

        // Default
        return (
            <div className="space-y-4">
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Consumer Number</label>
                    <input
                        type="text"
                        className="w-full p-3 border border-gray-300 rounded-lg outline-none focus:border-blue-500"
                        placeholder="Water Consumer ID"
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

    if (submitted) {
        return (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
                <div className="bg-white rounded-3xl w-full max-w-md p-8 text-center shadow-2xl scale-100 transition-transform">
                    <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                        <CheckCircle2 size={40} className="text-green-600" />
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">Request Submitted!</h3>
                    <p className="text-gray-600 mb-8">
                        Your request for <strong>{action}</strong> has been registered.
                        <br />Ticket ID: <span className="font-mono font-bold text-gray-800">WAT-{Math.floor(Math.random() * 10000)}</span>
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

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-in fade-in duration-200">
            <div className="bg-white rounded-3xl w-full max-w-lg shadow-2xl flex flex-col max-h-[90vh] animate-in zoom-in-95 duration-200">
                <div className="px-6 py-5 border-b border-gray-100 flex items-center justify-between bg-white rounded-t-3xl">
                    <div>
                        <p className="text-xs font-bold uppercase tracking-wider mb-1 text-blue-500">Water Department</p>
                        <h3 className="text-xl font-bold text-gray-900">{action}</h3>
                    </div>
                    <button onClick={onClose} className="p-2 bg-gray-100 rounded-full hover:bg-gray-200 transition-colors">
                        <X size={20} className="text-gray-600" />
                    </button>
                </div>
                <div className="p-6 overflow-y-auto custom-scrollbar">
                    <form id="water-service-form" onSubmit={handleSubmit}>
                        {renderFields()}
                    </form>
                </div>
                <div className="px-6 py-5 border-t border-gray-100 bg-gray-50 rounded-b-3xl flex justify-end gap-3">
                    <button type="button" onClick={onClose} className="px-6 py-2.5 text-gray-600 font-bold hover:bg-gray-200 rounded-xl transition-colors">Cancel</button>
                    <button type="submit" form="water-service-form" className="px-8 py-2.5 text-white rounded-xl font-bold shadow-lg transition-all active:scale-95 bg-blue-600 hover:bg-blue-700 shadow-blue-200">Submit Request</button>
                </div>
            </div>
        </div>
    );
};

export default WaterServiceForm;
