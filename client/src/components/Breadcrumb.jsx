import React from 'react';
import { ChevronRight, Home } from 'lucide-react';

const Breadcrumb = ({ items = [] }) => {
  return (
    <nav className="flex items-center gap-1 md:gap-2 overflow-x-auto px-4 py-2 md:py-3 bg-gray-50 rounded-lg text-xs md:text-sm">
      {/* Home Link */}
      <a
        href="/"
        className="flex items-center gap-1 text-blue-600 hover:text-blue-700 transition whitespace-nowrap"
      >
        <Home size={16} />
        <span className="hidden sm:inline">Home</span>
      </a>

      {/* Breadcrumb Items */}
      {items.map((item, index) => (
        <React.Fragment key={index}>
          <ChevronRight size={14} className="text-gray-400 flex-shrink-0" />
          {item.href ? (
            <a
              href={item.href}
              className="text-blue-600 hover:text-blue-700 transition whitespace-nowrap"
            >
              {item.label}
            </a>
          ) : (
            <span className="text-gray-600 whitespace-nowrap font-medium">{item.label}</span>
          )}
        </React.Fragment>
      ))}
    </nav>
  );
};

export default Breadcrumb;
