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
const BackButton = ({ to, text, className = "" }) => {
    const navigate = useNavigate();

    const handleBack = () => {
        if (to) {
            navigate(to);
        } else {
            navigate(-1);
        }
    };

    return (
        <button
            onClick={handleBack}
            className={`group flex items-center gap-4 px-6 py-4 bg-white/90 backdrop-blur-xl border-2 border-gray-200 rounded-2xl shadow-md hover:shadow-2xl hover:bg-white hover:border-green-500 transition-all duration-300 text-gray-800 hover:text-green-700 font-extrabold active:scale-95 z-40 ${className}`}
        >
            <div className="p-2 rounded-xl bg-green-600 group-hover:bg-green-500 transition-colors shadow-sm">
                <ArrowLeft size={28} strokeWidth={3} className="text-white transition-transform group-hover:-translate-x-1" />
            </div>
            <span className="text-lg uppercase tracking-wider">{text || "Back"}</span>
        </button>
    );
};

export default BackButton;
