import React from 'react';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { LogOut, LayoutDashboard, FileText, CheckSquare } from 'lucide-react';
import AnimatedBackground from '../../components/common/AnimatedBackground';

const AdminDashboard = () => {
    const { user, logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        // Use window.location for hard redirect to bypass React Router
        window.location.href = '/admin/login';
    };

    return (
        <div className="min-h-screen font-sans">
            <AnimatedBackground />
            {/* Top Bar */}
            <header className="bg-white shadow-sm border-b border-gray-200">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <LayoutDashboard className="text-blue-600" />
                        <h1 className="text-xl font-bold text-gray-800">Department Portal</h1>
                    </div>
                    <div className="flex items-center gap-4">
                        <span className="text-sm text-gray-600">
                            Welcome, <span className="font-semibold text-gray-900">{user?.name}</span>
                        </span>
                        <button
                            onClick={handleLogout}
                            className="text-sm text-red-600 hover:text-red-700 font-medium flex items-center gap-1"
                        >
                            <LogOut size={16} />
                            Logout
                        </button>
                    </div>
                </div>
            </header>

            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {/* Stats */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
                        <div className="flex justify-between items-start">
                            <div>
                                <p className="text-sm font-medium text-gray-500">Pending Requests</p>
                                <h3 className="text-3xl font-bold text-gray-900 mt-1">12</h3>
                            </div>
                            <div className="p-2 bg-orange-50 rounded-lg">
                                <FileText className="text-orange-500" size={24} />
                            </div>
                        </div>
                    </div>
                    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
                        <div className="flex justify-between items-start">
                            <div>
                                <p className="text-sm font-medium text-gray-500">Resolved Today</p>
                                <h3 className="text-3xl font-bold text-gray-900 mt-1">45</h3>
                            </div>
                            <div className="p-2 bg-green-50 rounded-lg">
                                <CheckSquare className="text-green-500" size={24} />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Content Placeholder */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8 text-center">
                    <h2 className="text-lg font-semibold text-gray-900 mb-2">Department Overview</h2>
                    <p className="text-gray-500">Specific department tools and reports will load here.</p>
                </div>
            </main>
        </div>
    );
};

export default AdminDashboard;
