import React from 'react';
import { useNavigate } from 'react-router-dom';
import BackButton from './BackButton';

const PageHeader = ({
    title,
    description,
    to = "/",
    backText = "Back",
    icon: Icon,
    watermarkIcon: WatermarkIcon,
    gradient = "bg-gradient-to-br from-emerald-900 via-teal-800 to-emerald-900",
    stripeColor = "via-emerald-400/30",
    orb1Color = "from-emerald-400/30 to-teal-500/30",
    orb2Color = "from-cyan-400/25 to-emerald-500/25",
    children,
    className = ""
}) => {
    return (
        <div className={`px-4 sm:px-6 lg:px-8 py-4 ${className}`}>
            <section className={`w-full pt-8 pb-10 px-8 ${gradient} shadow-2xl rounded-3xl relative overflow-hidden`}>
                {/* Sophisticated Mesh Background Pattern */}
                <div className="absolute inset-0 opacity-[0.25]">
                    <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
                        <defs>
                            <pattern id="grid-header" width="40" height="40" patternUnits="userSpaceOnUse">
                                <circle cx="20" cy="20" r="1" fill="white" opacity="0.4" />
                                <circle cx="0" cy="0" r="1" fill="white" opacity="0.3" />
                                <circle cx="40" cy="40" r="1" fill="white" opacity="0.3" />
                            </pattern>
                        </defs>
                        <rect width="100%" height="100%" fill="url(#grid-header)" />
                    </svg>
                </div>

                {/* Elegant Gradient Orbs */}
                <div className={`absolute top-0 right-0 w-96 h-96 bg-gradient-to-br ${orb1Color} rounded-full blur-3xl transform translate-x-1/3 -translate-y-1/3`} />
                <div className={`absolute bottom-0 left-0 w-80 h-80 bg-gradient-to-tr ${orb2Color} rounded-full blur-3xl transform -translate-x-1/3 translate-y-1/3`} />

                {/* Top Back Button */}
                <BackButton
                    to={to}
                    text={backText}
                    className="mb-8 scale-90 origin-left !bg-white/10 !text-white !border-white/20 hover:!bg-white/20"
                />

                {/* Subtle Icon Watermark */}
                {WatermarkIcon && (
                    <div className="absolute top-0 right-0 p-12 opacity-[0.07] transform translate-x-1/4 -translate-y-1/4 pointer-events-none">
                        <WatermarkIcon size={200} className="text-white" />
                    </div>
                )}

                {/* Decorative Line Accent */}
                <div className={`absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-transparent ${stripeColor} to-transparent`} />

                <div className="max-w-7xl mx-auto relative z-10">
                    <div className="flex flex-col md:flex-row items-center md:items-end justify-between gap-6 text-center md:text-left">
                        <div className="flex flex-col md:flex-row items-center gap-6">
                            {Icon && (
                                <div className="w-16 h-16 md:w-20 md:h-20 rounded-2xl bg-white/10 backdrop-blur-md flex items-center justify-center border border-white/20 shadow-xl">
                                    <Icon size={40} className="text-white drop-shadow-lg" />
                                </div>
                            )}
                            <div>
                                <h2 className="text-3xl md:text-5xl font-extrabold text-white tracking-tight mb-2">
                                    {title}
                                </h2>
                                {description && (
                                    <div className="text-emerald-50 text-lg md:text-xl font-medium max-w-2xl opacity-90">
                                        {description}
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Right Side Actions / Children */}
                        {children && (
                            <div className="flex-shrink-0">
                                {children}
                            </div>
                        )}
                    </div>
                </div>
            </section>
        </div>
    );
};

export default PageHeader;
