import React from 'react';

const AnimatedBackground = () => {
    return (
        <div
            className="fixed inset-0 overflow-hidden pointer-events-none z-[-2] opacity-85"
            style={{
                backgroundImage: `
                    linear-gradient(135deg, #fafaf9 0%, #fef3c7 25%, #fef9e7 50%, #fef3c7 75%, #fafaf9 100%),
                    radial-gradient(circle, #d6d3d1 1px, transparent 1px)
                `,
                backgroundSize: 'cover, 20px 20px',
                backgroundColor: '#faf5f0'
            }}
        >
            {/* Layer 2: Green Gradient Orb (Primary Accent) */}
            <div className="absolute top-[-15%] right-[-10%] w-[600px] h-[600px] bg-gradient-to-br from-green-400/10 to-emerald-600/10 rounded-full blur-[100px]" />

            {/* Layer 3: Blue Gradient Orb (Secondary Accent) */}
            <div className="absolute bottom-[-15%] left-[-10%] w-[500px] h-[500px] bg-gradient-to-tr from-blue-700/10 to-blue-900/10 rounded-full blur-[80px]" />

            {/* Layer 4: Wave Pattern SVG (Texture) */}
            <svg className="absolute top-0 left-0 w-full h-full opacity-[0.03]" xmlns="http://www.w3.org/2000/svg">
                <defs>
                    <pattern id="wave-pattern" x="0" y="0" width="100" height="20" patternUnits="userSpaceOnUse">
                        <path d="M0 10 Q25 20 50 10 T100 10 T150 10 T200 10" fill="none" stroke="currentColor" strokeWidth="2" className="text-emerald-900" />
                    </pattern>
                </defs>
                <rect width="100%" height="100%" fill="url(#wave-pattern)" />
            </svg>
        </div>
    );
};

export default AnimatedBackground;
