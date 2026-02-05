import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import PropTypes from 'prop-types';

/**
 * Context for managing authentication state across the application
 * @type {React.Context}
 */
const AuthContext = createContext();

/**
 * Custom hook to access authentication context
 * @returns {Object} Authentication context value
 * @throws {Error} If used outside AuthProvider
 */
export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};

/** Government standard: 15 minutes inactivity timeout (in milliseconds) */
const INACTIVITY_TIMEOUT_MS = 15 * 60 * 1000;

/**
 * Authentication Provider Component
 * Manages user authentication state, session management, and inactivity tracking
 * 
 * Features:
 * - User login/signup/logout
 * - Session persistence (sessionStorage)
 * - Auto-logout after 15 minutes of inactivity
 * - Activity tracking (mouse, keyboard, scroll, touch)
 * 
 * @param {Object} props - Component props
 * @param {React.ReactNode} props.children - Child components
 * @returns {JSX.Element} Provider component
 */
export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [lastActivity, setLastActivity] = useState(Date.now());

    /**
     * Logout user and clear session data
     */
    const logout = useCallback(() => {
        setUser(null);
        sessionStorage.removeItem('suvidha_user');
    }, []);

    const resetTimer = useCallback(() => {
        if (user) {
            setLastActivity(Date.now());
        }
    }, [user]);

    // Listen for user activity
    useEffect(() => {
        if (!user) return;

        const events = ['mousedown', 'keydown', 'scroll', 'touchstart'];

        // Throttled event handler to avoid performance hit
        let timeoutId;
        const handleActivity = () => {
            if (!timeoutId) {
                timeoutId = setTimeout(() => {
                    resetTimer();
                    timeoutId = null;
                }, 1000); // Only update once per second max
            }
        };

        events.forEach(event => window.addEventListener(event, handleActivity));

        return () => {
            events.forEach(event => window.removeEventListener(event, handleActivity));
            if (timeoutId) clearTimeout(timeoutId);
        };
    }, [user, resetTimer]);

    // Check for expiration
    useEffect(() => {
        if (!user) return;

        const intervalId = setInterval(() => {
            const timeSinceLastActivity = Date.now() - lastActivity;
            if (timeSinceLastActivity > INACTIVITY_TIMEOUT_MS) {
                // Session Expired
                logout();
                alert("Session expired due to inactivity. Please sign in again for security.");
            }
        }, 10000); // Check every 10 seconds

        return () => clearInterval(intervalId);
    }, [user, lastActivity, logout]);

    // --- End Inactivity Tracking ---

    // Load user from sessionStorage on mount (clears when browser closes)
    useEffect(() => {
        const storedUser = sessionStorage.getItem('suvidha_user');
        if (storedUser) {
            try {
                setUser(JSON.parse(storedUser));
                setLastActivity(Date.now());
            } catch (error) {
                sessionStorage.removeItem('suvidha_user');
            }
        }
        setLoading(false);
    }, []);

    // Save user to sessionStorage whenever it changes (clears when browser closes)
    useEffect(() => {
        if (user) {
            sessionStorage.setItem('suvidha_user', JSON.stringify(user));
        } else {
            sessionStorage.removeItem('suvidha_user');
        }
    }, [user]);

    /**
     * Register a new user
     * @param {Object} userData - User registration data
     * @param {string} userData.name - User's full name
     * @param {string} userData.email - User's email address
     * @param {string} userData.phone - User's phone number (optional)
     * @param {string} userData.address - User's address (optional)
     * @returns {Promise<{success: boolean, user?: Object, error?: string}>} Registration result
     */
    const signup = async (userData) => {
        try {
            await new Promise(resolve => setTimeout(resolve, 1000));

            // In a real app, this would be an API call
            // For now, create a mock user
            const newUser = {
                id: Date.now().toString(),
                name: userData.name,
                email: userData.email,
                phone: userData.phone || '',
                address: userData.address || '',
                role: 'citizen', // Default role
                createdAt: new Date().toISOString(),
            };

            setUser(newUser);
            setLastActivity(Date.now());
            return { success: true, user: newUser };
        } catch (error) {
            return { success: false, error: error.message };
        }
    };

    /**
     * Authenticate user with email and password
     * @param {string} email - User's email address
     * @param {string} password - User's password
     * @returns {Promise<{success: boolean, user?: Object, error?: string}>} Login result
     */
    const login = async (email, password) => {
        try {
            await new Promise(resolve => setTimeout(resolve, 1000));

            // Hardcoded test credentials for demo/testing
            const TEST_USERS = [
                {
                    email: 'test@suvidha.gov.in',
                    password: 'test123',
                    user: {
                        id: '12345',
                        name: 'Sayan Kumar',
                        email: 'test@suvidha.gov.in',
                        phone: '+91 9876543210',
                        address: '123, Green Park, Sector 5, Kolkata - 700001',
                        role: 'citizen',
                        createdAt: '2024-01-15T10:30:00Z',
                    }
                },
                {
                    email: 'admin@suvidha.gov.in',
                    password: 'admin123',
                    user: {
                        id: '67890',
                        name: 'Admin User',
                        email: 'admin@suvidha.gov.in',
                        phone: '+91 9999999999',
                        address: 'Government Office, Block A, New Delhi - 110001',
                        role: 'admin',
                        createdAt: '2023-06-10T08:00:00Z',
                    }
                },
                {
                    email: 'super@suvidha.gov.in',
                    password: 'super123',
                    user: {
                        id: '99999',
                        name: 'System Super Admin',
                        email: 'super@suvidha.gov.in',
                        phone: '+91 1112223333',
                        address: 'National Informatics Centre, New Delhi',
                        role: 'super_admin',
                        createdAt: '2022-01-01T00:00:00Z',
                    }
                }
            ];

            // Check if credentials match any test user
            const matchedUser = TEST_USERS.find(
                u => u.email === email && u.password === password
            );

            if (matchedUser) {
                setUser(matchedUser.user);
                setLastActivity(Date.now());
                return { success: true, user: matchedUser.user };
            } else {
                return {
                    success: false,
                    error: 'Invalid email or password. Please use test credentials.'
                };
            }
        } catch (error) {
            return { success: false, error: error.message };
        }
    };

    /**
     * Update user profile data
     * @param {Object} updatedData - Partial user data to update
     */
    const updateUser = (updatedData) => {
        setUser(prev => ({
            ...prev,
            ...updatedData,
        }));
        setLastActivity(Date.now());
    };

    const value = {
        user,
        isAuthenticated: !!user,
        loading,
        signup,
        login,
        logout,
        updateUser,
    };

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

AuthProvider.propTypes = {
    children: PropTypes.node.isRequired,
};

export default AuthContext;
