import React from 'react';
import { CheckCircle, Circle } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';

const ProgressIndicator = ({ 
  currentStep = 1, 
  totalSteps = 4, 
  stepLabels = [],
  variant = 'dots' // 'dots', 'bars', 'numbered'
}) => {
  const { t } = useLanguage();

  if (variant === 'numbered') {
    return (
      <div className="flex items-center justify-between w-full mb-6 md:mb-8 px-4">
        {Array.from({ length: totalSteps }).map((_, index) => {
          const stepNum = index + 1;
          const isActive = stepNum === currentStep;
          const isCompleted = stepNum < currentStep;

          return (
            <React.Fragment key={stepNum}>
              {/* Step Circle */}
              <div
                className={`
                  flex items-center justify-center w-10 h-10 rounded-full font-bold text-sm
                  transition-all duration-300
                  ${
                    isCompleted
                      ? 'bg-green-500 text-white'
                      : isActive
                      ? 'bg-blue-600 text-white ring-4 ring-blue-200'
                      : 'bg-gray-200 text-gray-600'
                  }
                `}
              >
                {isCompleted ? <CheckCircle size={24} /> : stepNum}
              </div>

              {/* Label */}
              {stepLabels[index] && (
                <div className="text-center flex-1 mx-2">
                  <p className={`text-xs font-semibold ${isActive ? 'text-blue-600' : 'text-gray-600'}`}>
                    {stepLabels[index]}
                  </p>
                </div>
              )}

              {/* Connector Line */}
              {stepNum < totalSteps && (
                <div
                  className={`
                    h-1 flex-1 mx-1 rounded-full transition-all duration-300
                    ${isCompleted ? 'bg-green-500' : 'bg-gray-200'}
                  `}
                />
              )}
            </React.Fragment>
          );
        })}
      </div>
    );
  }

  if (variant === 'bars') {
    return (
      <div className="w-full mb-6 md:mb-8">
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs md:text-sm font-semibold text-gray-700">
            {t('progress.step')} {currentStep} {t('progress.of')} {totalSteps}
          </span>
          <span className="text-xs text-gray-500">{Math.round((currentStep / totalSteps) * 100)}%</span>
        </div>
        <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full transition-all duration-500"
            style={{ width: `${(currentStep / totalSteps) * 100}%` }}
          />
        </div>
      </div>
    );
  }

  // dots variant (default)
  return (
    <div className="flex justify-center items-center gap-2 mb-6 md:mb-8 px-4">
      {Array.from({ length: totalSteps }).map((_, index) => {
        const stepNum = index + 1;
        const isActive = stepNum === currentStep;
        const isCompleted = stepNum < currentStep;

        return (
          <button
            key={stepNum}
            className={`
              transition-all duration-300
              ${
                isCompleted
                  ? 'w-3 h-3 md:w-4 md:h-4 bg-green-500 rounded-full'
                  : isActive
                  ? 'w-4 h-4 md:w-5 md:h-5 bg-blue-600 rounded-full ring-2 ring-blue-300'
                  : 'w-2.5 h-2.5 md:w-3 md:h-3 bg-gray-300 rounded-full'
              }
            `}
            onClick={() => {}}
            title={stepLabels[index] || `Step ${stepNum}`}
          />
        );
      })}
    </div>
  );
};

export default ProgressIndicator;
