import { useState, useCallback } from 'react';

/**
 * Custom hook for managing form state, validation, and errors
 * Provides a complete form management solution with validation support
 * 
 * @param {Object} initialValues - Initial form field values
 * @param {Function} validate - Validation function that returns errors object
 * @returns {Object} Form state and handlers
 * 
 * @example
 * const validate = (values) => {
 *   const errors = {};
 *   if (!values.email) errors.email = 'Email is required';
 *   return errors;
 * };
 * 
 * const { values, errors, handleChange, handleSubmit, resetForm } = 
 *   useFormValidation({ email: '', password: '' }, validate);
 * 
 * <form onSubmit={handleSubmit((data) => console.log(data))}>
 *   <input name="email" value={values.email} onChange={handleChange} />
 *   {errors.email && <span>{errors.email}</span>}
 * </form>
 */
const useFormValidation = (initialValues, validationRules, onSubmit) => {
    const [values, setValues] = useState(initialValues);
    const [errors, setErrors] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);

    const setFieldValue = useCallback((field, value) => {
        setValues((prev) => ({ ...prev, [field]: value }));
        // Clear error for the field when it's changed
        if (errors[field]) {
            setErrors((prev) => ({ ...prev, [field]: null }));
        }
    }, [errors]);

    const validateField = useCallback((field, value) => {
        const rule = validationRules[field];
        if (!rule) return null;

        if (rule.required && !value) {
            return rule.message || `${field} is required`;
        }
        if (rule.pattern && !rule.pattern.test(value)) {
            return rule.message || `Invalid format for ${field}`;
        }
        // Add more validation types as needed (e.g., minLength, maxLength)
        return null;
    }, [validationRules]);

    const validateForm = useCallback(async () => {
        let formErrors = {};
        let isValid = true;

        for (const field in validationRules) {
            const error = validateField(field, values[field]);
            if (error) {
                formErrors[field] = error;
                isValid = false;
            }
        }
        setErrors(formErrors);
        return formErrors; // Return the errors object for step validation
    }, [values, validationRules, validateField]);

    const handleSubmit = useCallback(async (event) => {
        if (event && event.preventDefault) event.preventDefault();
        setIsSubmitting(true);
        const formErrors = await validateForm();
        const isValid = Object.keys(formErrors).length === 0;
        if (isValid && onSubmit) {
            await onSubmit(values);
        }
        setIsSubmitting(false);
    }, [values, validateForm, onSubmit]);

    const resetForm = useCallback(() => {
        setValues(initialValues);
        setErrors({});
        setIsSubmitting(false);
    }, [initialValues]);

    return {
        values,
        errors,
        setFieldValue,
        setValues,
        validateForm,
        isSubmitting,
        handleSubmit,
        validateField,
        resetForm
    };
};

export default useFormValidation;
