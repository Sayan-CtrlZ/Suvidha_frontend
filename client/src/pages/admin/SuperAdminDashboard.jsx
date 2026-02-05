import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import {
    LayoutDashboard, Users, Zap, Droplets, Flame, Trash2,
    MessageSquare, DollarSign, Settings, Bell, Search,
    LogOut, ChevronRight, TrendingUp, AlertCircle, CheckCircle,
    Menu, X, Building2, FileText, ChevronDown
} from 'lucide-react';
import AnimatedBackground from '../../components/common/AnimatedBackground';

const SuperAdminDashboard = () => {
    const { user, logout } = useAuth();
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState('overview');
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);

    const handleLogout = () => {
        logout();
        // Use window.location for hard redirect to bypass React Router
        window.location.href = '/super-admin/login';
    };

    const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

    return (
        <div className="min-h-screen flex font-sans text-gray-900">
            <AnimatedBackground />
            {/* Sidebar */}
            <aside
                className={`fixed inset-y-0 left-0 z-50 bg-[#1e3a8a] text-white transition-all duration-300 ease-in-out shadow-xl ${isSidebarOpen ? 'w-64' : 'w-20'
                    }`}
            >
                <div className="h-full flex flex-col">
                    {/* Logo Area */}
                    <div className="h-16 flex items-center justify-center border-b border-blue-800 bg-[#172554]">
                        {isSidebarOpen ? (
                            <div className="flex items-center gap-2">
                                <Building2 className="text-yellow-400" size={24} />
                                <div>
                                    <h1 className="font-bold text-lg leading-none tracking-wide">SUVIDHA</h1>
                                    <p className="text-[10px] text-blue-200 uppercase tracking-widest">Admin Portal</p>
                                </div>
                            </div>
                        ) : (
                            <Building2 className="text-yellow-400" size={24} />
                        )}
                    </div>

                    {/* Navigation */}
                    <nav className="flex-1 py-6 px-3 space-y-1 overflow-y-auto overflow-x-hidden scrollbar-hide">
                        <NavItem icon={LayoutDashboard} label="Overview" id="overview" activeTab={activeTab} setActiveTab={setActiveTab} isOpen={isSidebarOpen} />
                        <div className={`px-4 py-2 text-xs font-bold text-blue-400 uppercase tracking-wider ${!isSidebarOpen && 'hidden'}`}>Services</div>
                        <NavItem icon={Zap} label="Electricity Dept" id="electricity" activeTab={activeTab} setActiveTab={setActiveTab} isOpen={isSidebarOpen} />
                        <NavItem icon={Droplets} label="Water Supply" id="water" activeTab={activeTab} setActiveTab={setActiveTab} isOpen={isSidebarOpen} />
                        <NavItem icon={Flame} label="Gas Pipeline" id="gas" activeTab={activeTab} setActiveTab={setActiveTab} isOpen={isSidebarOpen} />
                        <NavItem icon={Trash2} label="Waste Mgmt" id="waste" activeTab={activeTab} setActiveTab={setActiveTab} isOpen={isSidebarOpen} />
                        <div className={`px-4 py-2 text-xs font-bold text-blue-400 uppercase tracking-wider mt-4 ${!isSidebarOpen && 'hidden'}`}>Administration</div>
                        <NavItem icon={MessageSquare} label="Grievances" id="grievances" activeTab={activeTab} setActiveTab={setActiveTab} isOpen={isSidebarOpen} />
                        <NavItem icon={Users} label="User Directory" id="users" activeTab={activeTab} setActiveTab={setActiveTab} isOpen={isSidebarOpen} />
                        <NavItem icon={DollarSign} label="Financials" id="financials" activeTab={activeTab} setActiveTab={setActiveTab} isOpen={isSidebarOpen} />
                        <NavItem icon={Settings} label="System Config" id="settings" activeTab={activeTab} setActiveTab={setActiveTab} isOpen={isSidebarOpen} />
                    </nav>

                    {/* Bottom User Profile */}
                    <div className="border-t border-blue-800 bg-[#172554] p-4">
                        <div className={`flex items-center ${isSidebarOpen ? 'gap-3' : 'justify-center'}`}>
                            <div className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center border-2 border-yellow-400 text-sm font-bold shadow-sm">
                                SA
                            </div>
                            {isSidebarOpen && (
                                <div className="flex-1 min-w-0">
                                    <p className="text-sm font-medium truncate">{user?.name || 'Super Admin'}</p>
                                    <p className="text-xs text-blue-300 truncate">System Owner</p>
                                </div>
                            )}
                            {isSidebarOpen && (
                                <button onClick={handleLogout} className="text-blue-300 hover:text-white transition-colors" title="Logout">
                                    <LogOut size={18} />
                                </button>
                            )}
                        </div>
                    </div>
                </div>
            </aside>

            {/* Main Content */}
            <main className={`flex-1 transition-all duration-300 ${isSidebarOpen ? 'ml-64' : 'ml-20'}`}>
                {/* Sticky Header */}
                <header className="h-16 bg-white border-b border-gray-200 sticky top-0 z-40 px-6 flex items-center justify-between shadow-sm">
                    <div className="flex items-center gap-4">
                        <button onClick={toggleSidebar} className="p-2 hover:bg-gray-100 rounded-lg text-gray-600 transition-colors">
                            {isSidebarOpen ? <X size={20} /> : <Menu size={20} />}
                        </button>
                        <h2 className="text-xl font-bold text-gray-800 capitalize">{activeTab.replace('-', ' ')}</h2>
                    </div>
                    <div className="flex items-center gap-6">
                        <div className="hidden md:flex items-center gap-2 bg-gray-100 rounded-full px-4 py-2 border border-gray-200">
                            <Search size={16} className="text-gray-400" />
                            <input type="text" placeholder="Search system..." className="bg-transparent text-sm outline-none text-gray-700 w-48" />
                        </div>
                        <button className="relative p-2 text-gray-500 hover:bg-gray-100 rounded-full transition-colors">
                            <Bell size={20} />
                            <span className="absolute top-1 right-1 w-2.5 h-2.5 bg-red-500 rounded-full border-2 border-white"></span>
                        </button>
                    </div>
                </header>

                {/* Dashboard Views */}
                <div className="p-8 max-w-[1600px] mx-auto animate-in fade-in duration-500">
                    {activeTab === 'overview' && <OverviewTab />}
                    {['electricity', 'water', 'gas', 'waste'].includes(activeTab) && <ServiceManagementTab service={activeTab} />}
                    {activeTab === 'grievances' && <GrievancesTab />}
                    {activeTab === 'users' && <UserDirectoryTab />}
                    {activeTab === 'financials' && <FinancialsTab />}
                    {activeTab === 'settings' && <SettingsTab />}
                </div>
            </main>
        </div>
    );
};

const NavItem = ({ icon: Icon, label, id, activeTab, setActiveTab, isOpen }) => (
    <button
        onClick={() => setActiveTab(id)}
        className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg mb-1 transition-all group relative ${activeTab === id
            ? 'bg-blue-700 text-white shadow-md'
            : 'text-blue-100 hover:bg-blue-800 hover:text-white'
            }`}
    >
        <Icon size={20} className={`${activeTab === id ? 'text-yellow-400' : 'text-blue-300 group-hover:text-white'}`} />
        {isOpen ? (
            <span className="text-sm font-medium">{label}</span>
        ) : (
            // Tooltip for collapsed state
            <div className="absolute left-full ml-2 w-max bg-gray-900 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity z-50 pointer-events-none">
                {label}
            </div>
        )}
        {isOpen && activeTab === id && <ChevronRight size={16} className="ml-auto text-blue-300" />}
    </button>
);

// --- TAB CONTENT COMPONENTS ---

const OverviewTab = () => (
    <div className="space-y-8">
        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <StatCard label="Total Revenue" value="₹45.2 Cr" change="+12.5%" icon={DollarSign} color="emerald" sub="FY 2024-25" />
            <StatCard label="Active Citizens" value="1.2M" change="+3.2%" icon={Users} color="blue" sub="Verified Accounts" />
            <StatCard label="Pending Grievances" value="482" change="-5.0%" icon={AlertCircle} color="amber" sub="Avg Res. Time: 4h" />
            <StatCard label="System Health" value="99.9%" change="Stable" icon={CheckCircle} color="indigo" sub="All Servers Online" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Recent Activity Feed */}
            <div className="lg:col-span-2 bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <div className="flex justify-between items-center mb-6">
                    <h3 className="text-lg font-bold text-gray-900">Live System Activity</h3>
                    <button className="text-sm text-blue-600 hover:underline font-medium">View Detailed Log</button>
                </div>
                <div className="space-y-0">
                    {[
                        { action: 'New Connection Request', details: '#REQ-8832 approved by Elec Dept', time: '2 mins ago', icon: CheckCircle, color: 'text-green-600', bg: 'bg-green-100' },
                        { action: 'High Load Alert', details: 'Sector 4 Substation load > 90%', time: '15 mins ago', icon: AlertCircle, color: 'text-red-600', bg: 'bg-red-100' },
                        { action: 'Payment Received', details: '₹12,450 tax payment processed', time: '32 mins ago', icon: DollarSign, color: 'text-emerald-600', bg: 'bg-emerald-100' },
                        { action: 'User Registration', details: '50 new citizens onboarded', time: '1 hr ago', icon: Users, color: 'text-blue-600', bg: 'bg-blue-100' },
                    ].map((item, i) => (
                        <div key={i} className="flex gap-4 p-4 hover:bg-gray-50 rounded-lg transition-colors border-b border-gray-100 last:border-0">
                            <div className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 ${item.bg}`}>
                                <item.icon size={18} className={item.color} />
                            </div>
                            <div className="flex-1">
                                <p className="text-sm font-bold text-gray-900">{item.action}</p>
                                <p className="text-xs text-gray-500">{item.details}</p>
                            </div>
                            <span className="text-xs text-gray-400 whitespace-nowrap">{item.time}</span>
                        </div>
                    ))}
                </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <h3 className="text-lg font-bold text-gray-900 mb-6">Admin Actions</h3>
                <div className="space-y-3">
                    <ActionButton icon={FileText} label="Generate Monthly Report" />
                    <ActionButton icon={Users} label="Add Department Staff" />
                    <ActionButton icon={Bell} label="Broadcast Announcement" />
                    <ActionButton icon={Settings} label="Maintenance Mode" variant="danger" />
                </div>
            </div>
        </div>
    </div>
);

const ServiceManagementTab = ({ service }) => {
    const serviceData = {
        electricity: { title: 'Electricity Department', color: 'blue', stats: { active: '450k', load: '82%', outage: '2 Zones' } },
        water: { title: 'Water Supply Board', color: 'cyan', stats: { active: '380k', level: '94%', quality: 'Good' } },
        gas: { title: 'Gas Pipeline Corp', color: 'orange', stats: { active: '210k', pressure: 'Normal', leak: '0' } },
        waste: { title: 'Waste Management', color: 'green', stats: { active: 'Zones 1-8', collection: '98%', fleet: '45 Trucks' } },
    }[service];

    return (
        <div className="space-y-6">
            <div className={`bg-${serviceData.color}-50 border border-${serviceData.color}-200 p-6 rounded-xl`}>
                <h2 className={`text-2xl font-bold text-${serviceData.color}-900 mb-2`}>{serviceData.title}</h2>
                <div className="flex gap-8 mt-4">
                    {Object.entries(serviceData.stats).map(([key, val], i) => (
                        <div key={i}>
                            <p className={`text-xs font-bold uppercase text-${serviceData.color}-600`}>{key}</p>
                            <p className={`text-2xl font-bold text-${serviceData.color}-900`}>{val}</p>
                        </div>
                    ))}
                </div>
            </div>

            <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-6">
                <h3 className="text-lg font-bold text-gray-900 mb-4">Infrastructure Status</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {[1, 2, 3, 4, 5, 6].map((idx) => (
                        <div key={idx} className="border border-gray-200 rounded-lg p-4 flex items-center justify-between">
                            <div>
                                <p className="font-bold text-gray-800">Zone {idx} - North</p>
                                <p className="text-xs text-green-600 font-bold mt-1">● Operational</p>
                            </div>
                            <button className="text-xs text-blue-600 border border-blue-200 px-3 py-1 rounded hover:bg-blue-50">Manage</button>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
};

const GrievancesTab = () => (
    <div className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden">
        <div className="p-6 border-b border-gray-200 flex justify-between items-center">
            <h3 className="text-lg font-bold text-gray-900">Recent Complaints</h3>
            <div className="flex gap-2">
                <select className="text-sm border-gray-300 border rounded-lg px-3 py-2 outline-none">
                    <option>All Departments</option>
                    <option>Electricity</option>
                </select>
                <select className="text-sm border-gray-300 border rounded-lg px-3 py-2 outline-none">
                    <option>Status: All</option>
                    <option>Open</option>
                    <option>Resolved</option>
                </select>
            </div>
        </div>
        <table className="w-full text-left text-sm text-gray-600">
            <thead className="bg-gray-50 text-gray-900 font-semibold uppercase text-xs">
                <tr>
                    <th className="px-6 py-4">Ticket ID</th>
                    <th className="px-6 py-4">Citizen</th>
                    <th className="px-6 py-4">Category</th>
                    <th className="px-6 py-4">Subject</th>
                    <th className="px-6 py-4">Status</th>
                    <th className="px-6 py-4">Date</th>
                </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
                {[
                    { id: '#GRV-9921', user: 'Rahul Verma', cat: 'Electricity', sub: 'Voltage Fluctuation', status: 'In Progress', date: 'Oct 24' },
                    { id: '#GRV-9920', user: 'Anita Roy', cat: 'Water', sub: 'No Supply', status: 'Open', date: 'Oct 24' },
                    { id: '#GRV-9919', user: 'S. Khan', cat: 'Roads', sub: 'Pothole Repair', status: 'Resolved', date: 'Oct 23' },
                    { id: '#GRV-9918', user: 'John Doe', cat: 'Waste', sub: 'Bin Overflow', status: 'Open', date: 'Oct 23' },
                ].map((row, i) => (
                    <tr key={i} className="hover:bg-gray-50">
                        <td className="px-6 py-4 font-mono font-medium text-gray-900">{row.id}</td>
                        <td className="px-6 py-4">{row.user}</td>
                        <td className="px-6 py-4">
                            <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                                {row.cat}
                            </span>
                        </td>
                        <td className="px-6 py-4 max-w-xs truncate" title={row.sub}>{row.sub}</td>
                        <td className="px-6 py-4">
                            <span className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium ${row.status === 'Open' ? 'bg-red-100 text-red-700' :
                                row.status === 'Resolved' ? 'bg-green-100 text-green-700' :
                                    'bg-yellow-100 text-yellow-700'
                                }`}>
                                <span className={`w-1.5 h-1.5 rounded-full ${row.status === 'Open' ? 'bg-red-500' :
                                    row.status === 'Resolved' ? 'bg-green-500' :
                                        'bg-yellow-500'
                                    }`}></span>
                                {row.status}
                            </span>
                        </td>
                        <td className="px-6 py-4 text-gray-500">{row.date}</td>
                    </tr>
                ))}
            </tbody>
        </table>
    </div>
);

const UserDirectoryTab = () => (
    <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-8 text-center">
        <Users size={48} className="mx-auto text-blue-200 mb-4" />
        <h3 className="text-xl font-bold text-gray-900 mb-2">User Directory</h3>
        <p className="text-gray-500 max-w-md mx-auto mb-6">Manage verified citizens and administrative staff roles. Secure biometric data is encrypted.</p>
        <button className="bg-blue-600 text-white font-bold py-2 px-6 rounded-lg hover:bg-blue-700 transition-colors">
            Access Full Directory
        </button>
    </div>
);

const FinancialsTab = () => (
    <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-8 text-center">
        <DollarSign size={48} className="mx-auto text-emerald-200 mb-4" />
        <h3 className="text-xl font-bold text-gray-900 mb-2">Financial Reports</h3>
        <p className="text-gray-500 max-w-md mx-auto mb-6">View tax collection real-time data, department allocations, and audit logs.</p>
        <button className="bg-emerald-600 text-white font-bold py-2 px-6 rounded-lg hover:bg-emerald-700 transition-colors">
            View Analytics
        </button>
    </div>
);

const SettingsTab = () => (
    <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-8 text-center">
        <Settings size={48} className="mx-auto text-gray-200 mb-4" />
        <h3 className="text-xl font-bold text-gray-900 mb-2">System Configuration</h3>
        <p className="text-gray-500 max-w-md mx-auto mb-6">Global settings, server maintenance controls, and notification dispatch.</p>
        <button className="bg-gray-800 text-white font-bold py-2 px-6 rounded-lg hover:bg-gray-900 transition-colors">
            Open Settings Console
        </button>
    </div>
);

// --- HELPER COMPONENTS ---

const StatCard = ({ label, value, change, icon: Icon, color, sub }) => (
    <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
        <div className="flex justify-between items-start mb-4">
            <div>
                <p className="text-sm font-medium text-gray-500">{label}</p>
                <h3 className="text-3xl font-bold text-gray-900 mt-1">{value}</h3>
            </div>
            <div className={`p-3 bg-${color}-50 rounded-lg text-${color}-600`}>
                <Icon size={24} />
            </div>
        </div>
        <div className="flex items-center gap-2 text-sm">
            <span className={`font-bold ${change.startsWith('+') ? 'text-green-600' : change.startsWith('-') ? 'text-red-500' : 'text-blue-600'}`}>
                {change}
            </span>
            <span className="text-gray-400">• {sub}</span>
        </div>
    </div>
);

const ActionButton = ({ icon: Icon, label, variant = 'primary' }) => (
    <button className={`w-full flex items-center justify-between p-4 rounded-lg border transition-colors ${variant === 'danger'
        ? 'border-red-200 bg-red-50 text-red-700 hover:bg-red-100'
        : 'border-gray-200 bg-gray-50 text-gray-700 hover:bg-gray-100'
        }`}>
        <div className="flex items-center gap-3">
            <Icon size={18} />
            <span className="font-semibold text-sm">{label}</span>
        </div>
        <ChevronRight size={16} className="text-gray-400" />
    </button>
);

export default SuperAdminDashboard;
