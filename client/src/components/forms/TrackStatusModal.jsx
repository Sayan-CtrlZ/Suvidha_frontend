import React, { useState } from 'react';
import { X, Search, CheckCircle2, Clock, AlertCircle } from 'lucide-react';

const TrackStatusModal = ({ isOpen, onClose }) => {
    const [ticketId, setTicketId] = useState('');
    const [status, setStatus] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const handleTrack = async (e) => {
        e.preventDefault();
        if (!ticketId.trim()) {
            setError('Please enter a valid Ticket ID');
            return;
        }

        setLoading(true);
        setError('');
        setStatus(null);

        // Simulate API call
        setTimeout(() => {
            setLoading(false);
            // Mock random status for demo
            const randomStatus = Math.random() > 0.5 ? 'resolved' : 'pending';
            const mockData = {
                id: ticketId,
                status: randomStatus,
                date: new Date().toLocaleDateString(),
                category: 'Municipal Grievance',
                description: 'Issue reported regarding civic amenities.',
                timeline: [
                    { status: 'Submitted', date: '2 days ago', completed: true },
                    { status: 'Assigned to Agent', date: '1 day ago', completed: true },
                    { status: 'In Progress', date: 'Today', completed: randomStatus === 'resolved' },
                    { status: 'Resolved', date: 'Pending', completed: randomStatus === 'resolved' }
                ]
            };
            setStatus(mockData);
        }, 1500);
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[100] flex items-center justify-center p-4">
            <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl overflow-hidden animate-in fade-in zoom-in duration-200">

                {/* Header */}
                <div className="bg-gradient-to-r from-blue-600 to-blue-500 px-8 py-5 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-white/20 backdrop-blur-sm flex items-center justify-center">
                            <Search size={20} className="text-white" />
                        </div>
                        <div>
                            <h2 className="text-xl font-bold text-white">Track Grievance Status</h2>
                            <p className="text-blue-100 text-xs">Enter your reference number to check progress</p>
                        </div>
                    </div>
                    <button onClick={onClose} className="text-white/80 hover:text-white transition-colors bg-white/10 hover:bg-white/20 p-2 rounded-lg">
                        <X size={20} />
                    </button>
                </div>

                <div className="p-8">
                    {/* Search Input */}
                    <form onSubmit={handleTrack} className="mb-0">
                        <div className="flex gap-4 items-start">
                            <div className="flex-1">
                                <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Reference Number / Ticket ID</label>
                                <div className="relative group">
                                    <Search size={20} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-blue-500 transition-colors" />
                                    <input
                                        type="text"
                                        value={ticketId}
                                        onChange={(e) => setTicketId(e.target.value.toUpperCase())}
                                        placeholder="Ex: GRV-2024-123456"
                                        className="w-full pl-11 pr-4 py-4 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-blue-500 transition-all uppercase font-mono text-lg font-semibold bg-gray-50 focus:bg-white"
                                    />
                                </div>
                            </div>
                            <button
                                type="submit"
                                disabled={loading}
                                className="mt-8 px-8 py-4 bg-blue-600 text-white font-bold rounded-xl hover:bg-blue-700 transition-all shadow-lg shadow-blue-200 disabled:opacity-70 flex items-center gap-2"
                            >
                                {loading ? <Clock className="animate-spin" size={20} /> : <Search size={20} />}
                                {loading ? 'Tracking...' : 'Track'}
                            </button>
                        </div>
                        {error && <p className="text-sm text-red-500 mt-2 flex items-center gap-1"><AlertCircle size={14} /> {error}</p>}
                    </form>

                    {/* Status Result */}
                    {status && (
                        <div className="mt-8 border-t border-gray-100 pt-8 animate-in slide-in-from-bottom-4 duration-300">

                            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                                {/* Left Column: Key Details */}
                                <div className="md:col-span-1 space-y-6">
                                    <div className="bg-blue-50 rounded-2xl p-5 border border-blue-100">
                                        <p className="text-xs text-blue-600 font-bold uppercase tracking-wider mb-1">Current Status</p>
                                        <div className={`flex items-center gap-2 font-bold text-xl ${status.status === 'resolved' ? 'text-green-600' : 'text-amber-600'}`}>
                                            {status.status === 'resolved' ? <CheckCircle2 size={24} /> : <Clock size={24} />}
                                            <span className="capitalize">{status.status}</span>
                                        </div>
                                    </div>

                                    <div>
                                        <p className="text-xs text-gray-400 font-bold uppercase tracking-wider mb-1">Date Submitted</p>
                                        <p className="font-semibold text-gray-900">{status.date}</p>
                                    </div>

                                    <div>
                                        <p className="text-xs text-gray-400 font-bold uppercase tracking-wider mb-1">Category</p>
                                        <p className="font-semibold text-gray-900">{status.category}</p>
                                    </div>
                                </div>

                                {/* Right Column: Timeline & Description */}
                                <div className="md:col-span-2">
                                    <div className="mb-8">
                                        <p className="text-xs text-gray-400 font-bold uppercase tracking-wider mb-2">Description</p>
                                        <p className="text-gray-700 leading-relaxed bg-gray-50 p-4 rounded-xl text-sm border border-gray-100">
                                            {status.description}
                                        </p>
                                    </div>

                                    <p className="text-xs text-gray-400 font-bold uppercase tracking-wider mb-4">Tracking History</p>
                                    <div className="relative pl-2">
                                        {status.timeline.map((step, idx) => (
                                            <div key={idx} className="flex gap-4 pb-8 last:pb-0 relative">
                                                {idx !== status.timeline.length - 1 && (
                                                    <div className={`absolute left-[11px] top-3 bottom-0 w-0.5 ${step.completed ? 'bg-blue-200' : 'bg-gray-100'}`}></div>
                                                )}
                                                <div className={`relative z-10 w-6 h-6 rounded-full flex items-center justify-center border-2 flex-shrink-0 bg-white ${step.completed ? 'border-blue-500 text-blue-500' : 'border-gray-200 text-gray-300'}`}>
                                                    <div className={`w-2.5 h-2.5 rounded-full ${step.completed ? 'bg-blue-500' : 'bg-gray-300'}`}></div>
                                                </div>
                                                <div className="transform -translate-y-1">
                                                    <p className={`font-bold text-sm ${step.completed ? 'text-gray-900' : 'text-gray-400'}`}>{step.status}</p>
                                                    <p className="text-xs text-gray-400 font-medium">{step.date}</p>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </div>

            </div>
        </div>
    );
};

export default TrackStatusModal;
