import React from 'react';

const TickerBanner = () => {
  const updates = [
    "📢 New Online Services Available: Apply for Electricity Bill Online",
    "✅ Water Connection Status: You can now track in real-time",
    "🔔 Important: GST portal integration completed successfully",
    "📰 Latest News: Municipal Grievance Portal enhanced with video support",
    "🎉 Milestone: 1 Million Citizens Registered on SUVIDHA",
    "⚡ Update: Faster processing for all service requests implemented",
  ];

  return (
    <div className="w-full bg-transparent text-green-600 overflow-hidden border-y border-green-300">
      <div className="flex items-center h-12">
        {/* Label */}
        <div className="flex-shrink-0 px-4 font-bold text-sm sm:text-base whitespace-nowrap text-green-600">
          LATEST UPDATE
        </div>
        
        {/* Ticker */}
        <div className="flex-1 overflow-hidden">
          <style>{`
            @keyframes ticker {
              0% {
                transform: translateX(100%);
              }
              100% {
                transform: translateX(-100%);
              }
            }
            
            .ticker-content {
              animation: ticker 40s linear infinite;
              display: flex;
              gap: 2rem;
              white-space: nowrap;
              padding-right: 2rem;
            }
            
            .ticker-content:hover {
              animation-play-state: paused;
            }
            
            .ticker-item {
              flex-shrink: 0;
              font-size: 0.95rem;
              letter-spacing: 0.5px;
            }
          `}</style>
          
          <div className="ticker-content">
            {updates.map((update, index) => (
              <span key={index} className="ticker-item">
                {update}
              </span>
            ))}
            {/* Duplicate for seamless loop */}
            {updates.map((update, index) => (
              <span key={`duplicate-${index}`} className="ticker-item">
                {update}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TickerBanner;
