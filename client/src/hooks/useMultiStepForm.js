import { useState, useCallback } from 'react';

/**
 * Custom hook for managing multi-step form navigation and state
 * Perfect for wizards, onboarding flows, and multi-page forms
 * 
 * @param {number} totalSteps - Total number of steps in the form
 * @param {Object} options - Configuration options
 * @param {number} options.initialStep - Starting step (default: 1)
 * @returns {Object} Step navigation state and handlers
 * 
 * @example
 * const {
 *   currentStep,
 *   isFirstStep,
 *   isLastStep,
 *   progress,
 *   goToNext,
 *   goToPrevious,
 *   goToStep,
 *   reset
 * } = useMultiStepForm(4);
 * 
 * <div>Step {currentStep} of {totalSteps}</div>
 * <ProgressBar value={progress} />
 * <button onClick={goToPrevious} disabled={isFirstStep}>Back</button>
 * <button onClick={goToNext} disabled={isLastStep}>Next</button>
 */
const useMultiStepForm = (totalSteps, options = {}) => {
    const { initialStep = 1 } = options;

    const [currentStep, setCurrentStep] = useState(initialStep);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [completedSteps, setCompletedSteps] = useState(new Set());

    /**
     * Navigate to next step
     */
    const goToNext = useCallback(() => {
        if (currentStep < totalSteps) {
            setCompletedSteps(prev => new Set([...prev, currentStep]));
            setCurrentStep(prev => prev + 1);
        }
    }, [currentStep, totalSteps]);

    /**
     * Navigate to previous step
     */
    const goToPrevious = useCallback(() => {
        if (currentStep > 1) {
            setCurrentStep(prev => prev - 1);
        }
    }, [currentStep]);

    /**
     * Navigate to specific step
     */
    const goToStep = useCallback((step) => {
        if (step >= 1 && step <= totalSteps) {
            setCurrentStep(step);
        }
    }, [totalSteps]);

    /**
     * Reset to initial step
     */
    const reset = useCallback(() => {
        setCurrentStep(initialStep);
        setCompletedSteps(new Set());
        setIsSubmitting(false);
    }, [initialStep]);

    /**
     * Mark current step as complete and move to next
     */
    const completeStep = useCallback(() => {
        setCompletedSteps(prev => new Set([...prev, currentStep]));
        goToNext();
    }, [currentStep, goToNext]);

    /**
     * Check if a specific step is completed
     */
    const isStepCompleted = useCallback((step) => {
        return completedSteps.has(step);
    }, [completedSteps]);

    /**
     * Calculate progress percentage
     */
    const progress = Math.round((currentStep / totalSteps) * 100);

    /**
     * Check if on first step
     */
    const isFirstStep = currentStep === 1;

    /**
     * Check if on last step
     */
    const isLastStep = currentStep === totalSteps;

    /**
     * Check if all steps are completed
     */
    const isComplete = completedSteps.size === totalSteps;

    return {
        currentStep,
        totalSteps,
        isFirstStep,
        isLastStep,
        isComplete,
        progress,
        isSubmitting,
        setIsSubmitting,
        completedSteps,
        goToNext,
        goToPrevious,
        next: goToNext,
        back: goToPrevious,
        goToStep,
        completeStep,
        isStepCompleted,
        reset
    };
};

export default useMultiStepForm;
