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
    className = "",
    onBackClick
}) => {
    return (
        <div className={`px-4 sm:px-6 lg:px-8 py-4 ${className}`}>
            <section className={`w-full pt-8 pb-10 px-8 ${gradient} shadow-2xl rounded-3xl relative overflow-hidden`}>
                {/* Sophisticated Mesh Background Pattern */}
                <div className="absolute inset-0 opacity-[0.25]">
                    <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
                        <defs>
                            <pattern id="grid-header" width="40" height="40" patternUnits="userSpaceOnUse">
                                <circle cx="20" cy="20" r="1.5" fill="white" opacity="0.6" />
                                <circle cx="0" cy="0" r="1.5" fill="white" opacity="0.4" />
                                <circle cx="40" cy="40" r="1.5" fill="white" opacity="0.4" />
                            </pattern>
                        </defs>
                        <rect width="100%" height="100%" fill="url(#grid-header)" />
                    </svg>
                </div>

                {/* Elegant Gradient Orbs */}
                <div className={`absolute top-0 right-0 w-96 h-96 bg-gradient-to-br ${orb1Color} rounded-full blur-3xl transform translate-x-1/3 -translate-y-1/3`} />
                <div className={`absolute bottom-0 left-0 w-80 h-80 bg-gradient-to-tr ${orb2Color} rounded-full blur-3xl transform -translate-x-1/3 translate-y-1/3`} />
                {/* Subtle Icon Watermark */}
                {WatermarkIcon && (
                    <div className="absolute top-0 right-0 p-4 opacity-[0.06] transform translate-x-1 -translate-y-1 pointer-events-none">
                        <WatermarkIcon size={120} className="text-white" />
                    </div>
                )}

                {/* Decorative Line Accent */}
                <div className={`absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-transparent ${stripeColor} to-transparent`} />

                <div className="max-w-full relative z-10 px-0">
                    <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                        <div className="flex flex-col md:flex-row items-center gap-6">
                            {/* Back Button - Premium 3D Glassmorphic Look */}
                            {to && (
                                <div className="flex-shrink-0">
                                    <BackButton
                                        to={to}
                                        text={backText}
                                        onClick={onBackClick}
                                        className="scale-90 origin-left !bg-white/20 !backdrop-blur-xl !text-white !border-t-2 !border-white/60 !border-x !border-white/30 !border-b-[6px] !border-black/40 hover:!border-b-[3px] hover:translate-y-[3px] active:!border-b-0 active:translate-y-[6px] transition-all duration-200 shadow-[0_20px_40px_rgba(0,0,0,0.3),inset_0_2px_10px_rgba(255,255,255,0.4)] rounded-2xl"
                                    />
                                </div>
                            )}

                            {/* Page Icon */}
                            {Icon && (
                                <div className="w-14 h-14 md:w-16 md:h-16 rounded-xl bg-white/10 backdrop-blur-md flex items-center justify-center border border-white/20 shadow-xl">
                                    <Icon size={32} className="text-white drop-shadow-lg" />
                                </div>
                            )}

                            {/* Title & Subtitle */}
                            <div className="text-left">
                                <h2 className="text-2xl md:text-3xl font-extrabold text-white tracking-tight uppercase drop-shadow-lg">
                                    {title}
                                </h2>
                                {description && (
                                    <div className="text-white text-sm md:text-base font-medium opacity-90 drop-shadow-sm">
                                        {description}
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Right Side Actions / Children */}
                {children && (
                    <div className="max-w-7xl mx-auto mt-6 relative z-10 flex justify-end">
                        <div className="flex-shrink-0">
                            {children}
                        </div>
                    </div>
                )}
            </section>
        </div>
    );
};

export default PageHeader;
