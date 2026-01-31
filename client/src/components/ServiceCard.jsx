import React from 'react';
import { ArrowRight } from 'lucide-react';

const ServiceCard = ({ icon: Icon, title, description, category }) => {
  return (
    <div className="group h-full">
      <div className="bg-white/40 backdrop-blur-lg rounded-2xl border border-white/60 p-6 sm:p-8 h-full hover:bg-white/50 hover:shadow-lg transition duration-300 flex flex-col">
        {/* Icon */}
        <div className="mb-4 text-blue-600 group-hover:text-indigo-600 transition">
          <Icon size={32} />
        </div>

        {/* Category Badge */}
        <span className="inline-block bg-blue-100 text-blue-700 text-xs font-semibold px-3 py-1 rounded-full mb-3 w-fit">
          {category}
        </span>

        {/* Title */}
        <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-2">
          {title}
        </h3>

        {/* Description */}
        <p className="text-gray-600 text-sm mb-6 grow">
          {description}
        </p>

        {/* Link */}
        <button className="flex items-center gap-2 text-blue-600 font-semibold text-sm group-hover:gap-3 transition">
          Learn More
          <ArrowRight size={18} />
        </button>
      </div>
    </div>
  );
};

export default ServiceCard;
