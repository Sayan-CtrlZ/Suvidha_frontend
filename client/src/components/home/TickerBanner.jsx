import React from 'react';
import { useLanguage } from '../../context/LanguageContext';

const TickerBanner = () => {
  const { t } = useLanguage();
  
  const updates = [
    `📢 ${t('ticker.newServices')}`,
    `✅ ${t('ticker.waterStatus')}`,
    `🔔 ${t('ticker.gstPortal')}`,
    `📰 ${t('ticker.grievancePortal')}`,
    `🎉 ${t('ticker.milestone')}`,
    `⚡ ${t('ticker.fasterProcessing')}`,
  ];

  return (
    <div className="w-full bg-blue-600 text-white overflow-hidden border-y border-blue-700">
      <div className="flex items-center h-12">
        {/* Label */}
        <div className="flex-shrink-0 px-4 font-bold text-sm sm:text-base whitespace-nowrap text-white bg-blue-700">
          {t('ticker.latestUpdate')}
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
