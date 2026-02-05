import { useState, useCallback } from 'react';

/**
 * Custom hook for managing boolean toggle state
 * Provides convenient methods for toggling, setting true, and setting false
 * 
 * @param {boolean} initialValue - Initial boolean value (default: false)
 * @returns {Array} [value, toggle, setTrue, setFalse, setValue]
 * 
 * @example
 * const [isOpen, toggleOpen, openModal, closeModal] = useToggle(false);
 * 
 * // Toggle
 * <button onClick={toggleOpen}>Toggle</button>
 * 
 * // Explicit set
 * <button onClick={openModal}>Open</button>
 * <button onClick={closeModal}>Close</button>
 */
const useToggle = (initialValue = false) => {
    const [value, setValue] = useState(initialValue);

    const toggle = useCallback(() => {
        setValue(prev => !prev);
    }, []);

    const setTrue = useCallback(() => {
        setValue(true);
    }, []);

    const setFalse = useCallback(() => {
        setValue(false);
    }, []);

    return [value, toggle, setTrue, setFalse, setValue];
};

export default useToggle;
