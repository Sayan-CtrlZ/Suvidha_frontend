import React from 'react';
import { AlertCircle, CheckCircle, Clock } from 'lucide-react';

const AnnouncementCard = ({ icon: Icon = AlertCircle, title, description, type = 'update', date }) => {
  const typeStyles = {
    update: 'bg-blue-50 border-blue-200 text-blue-900',
    notice: 'bg-amber-50 border-amber-200 text-amber-900',
    success: 'bg-emerald-50 border-emerald-200 text-emerald-900',
  };

  const iconStyles = {
    update: 'text-blue-600',
    notice: 'text-amber-600',
    success: 'text-emerald-600',
  };

  return (
    <div className={`p-4 sm:p-6 rounded-xl border ${typeStyles[type]}`}>
      <div className="flex gap-3 sm:gap-4">
        {/* Icon */}
        <div className={`shrink-0 ${iconStyles[type]}`}>
          <Icon size={24} />
        </div>

        {/* Content */}
        <div className="grow">
          <h4 className="font-bold text-sm sm:text-base mb-1">{title}</h4>
          <p className="text-xs sm:text-sm opacity-80 mb-2">{description}</p>
          {date && (
            <div className="flex items-center gap-1 text-xs opacity-70">
              <Clock size={14} />
              <span>{date}</span>
            </div>
          )}
        </div>

        {/* Arrow */}
        <button className="text-sm font-semibold hover:underline">→</button>
      </div>
    </div>
  );
};

export default AnnouncementCard;
