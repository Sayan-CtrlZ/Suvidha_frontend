import React, { useState, useEffect } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { CheckCircle, AlertCircle, RefreshCw } from 'lucide-react';

const ServiceStatus = () => {
    const { t } = useLanguage();
    const [statuses, setStatuses] = useState([
        { id: 1, name: 'Electricity', status: 'operational', label: 'Operational' },
        { id: 2, name: 'Water Supply', status: 'operational', label: 'Operational' },
        { id: 3, name: 'Gas Services', status: 'maintenance', label: 'Maintenance' },
        { id: 4, name: 'Municipal', status: 'operational', label: 'Operational' },
    ]);

    const getStatusColor = (status) => {
        switch (status) {
            case 'operational': return 'text-green-600 bg-green-50 border-green-200';
            case 'maintenance': return 'text-amber-600 bg-amber-50 border-amber-200';
            case 'outage': return 'text-red-600 bg-red-50 border-red-200';
            default: return 'text-gray-600 bg-gray-50 border-gray-200';
        }
    };

    const getStatusIcon = (status) => {
        switch (status) {
            case 'operational': return <CheckCircle size={16} />;
            case 'maintenance': return <RefreshCw size={16} />;
            case 'outage': return <AlertCircle size={16} />;
            default: return <CheckCircle size={16} />;
        }
    };

    return (
        <section className="bg-white border-b border-gray-200">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 text-sm">
                    <span className="font-semibold text-gray-500 whitespace-nowrap">
                        {t('systemStatus') || 'System Status'}:
                    </span>
                    <div className="flex flex-wrap gap-3 w-full">
                        {statuses.map(service => (
                            <div 
                                key={service.id} 
                                className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full border text-xs font-medium ${getStatusColor(service.status)}`}
                            >
                                {getStatusIcon(service.status)}
                                <span>{service.name}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default ServiceStatus;
