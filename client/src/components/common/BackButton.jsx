import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

/**
 * Standardized high-visibility Back Button
 * @param {Object} props
 * @param {string} props.to - Navigation destination (optional, defaults to -1)
 * @param {string} props.text - Custom text (optional, defaults to "Back")
 * @param {string} props.className - Additional classes
 */
const BackButton = ({ to, text, className = "", onClick }) => {
    const navigate = useNavigate();

    const handleBack = (e) => {
        if (onClick) {
            onClick(e);
            if (e.defaultPrevented) return;
        }

        if (to) {
            navigate(to);
        } else {
            navigate(-1);
        }
    };

    return (
        <button
            onClick={handleBack}
            className={`group flex items-center gap-4 px-6 py-4 bg-white border-2 border-gray-200 rounded-[1.5rem] shadow-[0_8px_0_0_rgba(0,0,0,0.05)] hover:shadow-[0_4px_0_0_rgba(0,0,0,0.05)] hover:translate-y-[2px] active:translate-y-[6px] active:shadow-none transition-all duration-150 text-gray-800 hover:text-green-700 font-extrabold z-40 ${className}`}
        >
            <div className="p-2 rounded-xl bg-green-600 group-hover:bg-green-500 transition-colors shadow-inner">
                <ArrowLeft size={28} strokeWidth={3} className="text-white transition-transform group-hover:-translate-x-1" />
            </div>
            <span className="text-lg uppercase tracking-wider">{text || "Back"}</span>
        </button>
    );
};

export default BackButton;
