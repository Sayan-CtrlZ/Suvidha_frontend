import { useState, useEffect } from 'react';

/**
 * Custom hook for syncing state with localStorage
 * Automatically persists state changes to localStorage and retrieves on mount
 * 
 * @param {string} key - localStorage key
 * @param {*} initialValue - Default value if no stored value exists
 * @returns {Array} [storedValue, setValue] - Same API as useState
 * 
 * @example
 * const [name, setName] = useLocalStorage('userName', 'Guest');
 * 
 * // Updates both state and localStorage
 * setName('John Doe');
 * 
 * // Value persists across page refreshes
 */
const useLocalStorage = (key, initialValue) => {
    const [storedValue, setStoredValue] = useState(() => {
        if (typeof window === 'undefined') {
            return initialValue;
        }

        try {
            const item = window.localStorage.getItem(key);
            return item ? JSON.parse(item) : initialValue;
        } catch (error) {
            return initialValue;
        }
    });

    const setValue = (value) => {
        try {
            const valueToStore = value instanceof Function ? value(storedValue) : value;
            setStoredValue(valueToStore);

            if (typeof window !== 'undefined') {
                window.localStorage.setItem(key, JSON.stringify(valueToStore));
            }
        } catch (error) {
            // Silent fail - localStorage might be disabled
        }
    };

    return [storedValue, setValue];
};

export default useLocalStorage;
