import { useState } from "react";

// Input component with validation and event handling
interface ValidatedInputProps {
    label: string;
    type?: 'text' | 'email' | 'password' | 'number';
    placeholder?: string;
    required?: boolean;
    minLength?: number;
    maxLength?: number;
    pattern?: string;
    onValueChange?: (value: string, isValid: boolean) => void;
    onValidationChange?: (errors: string[]) => void;
}
const ValidatedInput: React.FC<ValidatedInputProps> = ({
    label,
    type = 'text',
    placeholder,
    required = false,
    minLength,
    maxLength,
    pattern,
    onValueChange,
    onValidationChange
}) => {
    const [value, setValue] = useState('');
    const [errors, setErrors] = useState<string[]>([]);
    const [touched, setTouched] = useState(false);

    const validateInput = (inputValue: string): string[] => {
        const validationErrors: string[] = [];

        if (required && !inputValue.trim()) {
            validationErrors.push(`${label} is required`);
        }

        if (minLength && inputValue.length < minLength) {
            validationErrors.push(`${label} must be at least ${minLength} characters`);
        }

        if (maxLength && inputValue.length > maxLength) {
            validationErrors.push(`${label} must be no more than ${maxLength} characters`);
        }

        if (pattern && inputValue && !new RegExp(pattern).test(inputValue)) {
            validationErrors.push(`${label} format is invalid`);
        }

        if (type === 'email' && inputValue && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(inputValue)) {
            validationErrors.push('Please enter a valid email address');
        }

        return validationErrors;
    };

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const newValue = event.target.value;
        setValue(newValue);

        const validationErrors = validateInput(newValue);
        setErrors(validationErrors);

        const isValid = validationErrors.length === 0;
        onValueChange?.(newValue, isValid);
        onValidationChange?.(validationErrors);
    };

    const handleBlur = () => {
        setTouched(true);
    };

    const handleFocus = () => {
        // Clear errors on focus for better UX
        if (!touched) {
            setErrors([]);
        }
    };

    const hasErrors = touched && errors.length > 0;

    return (
        <div className="space-y-1">
            <label className="block text-sm font-medium text-gray-700">
                {label}
                {required && <span className="text-red-500 ml-1">*</span>}
            </label>

            <input
                type={type}
                value={value}
                onChange={handleChange}
                onBlur={handleBlur}
                onFocus={handleFocus}
                placeholder={placeholder}
                className={`w-full px-3 py-2 border rounded-md transition-colors ${hasErrors
                    ? 'border-red-500 focus:ring-red-500 focus:border-red-500'
                    : 'border-gray-300 focus:ring-blue-500 focus:border-blue-500'
                    } focus:ring-2 focus:ring-opacity-50`}
                aria-invalid={hasErrors}
                aria-describedby={hasErrors ? `${label}-errors` : undefined}
            />

            {hasErrors && (
                <div id={`${label}-errors`} className="space-y-1">
                    {errors.map((error, index) => (
                        <p key={index} className="text-sm text-red-600">
                            {error}
                        </p>
                    ))}
                </div>
            )}
        </div>
    );
};

export default ValidatedInput