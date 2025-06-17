import React, { useState } from 'react';
import ValidatedInput from './ValidatedInput';

// Example component demonstrating event handling patterns
interface ButtonProps {
    label: string;
    onClick: (message: string) => void;
    variant?: 'primary' | 'secondary' | 'danger';
    disabled?: boolean;
}

export const CustomButton: React.FC<ButtonProps> = ({
    label,
    onClick,
    variant = 'primary',
    disabled = false
}) => {
    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        // Prevent click if disabled
        if (disabled) {
            event.preventDefault();
            return;
        }

        // Call parent's onClick with a message
        onClick(`${label} button was clicked!`);
    };

    const getButtonStyles = () => {
        const baseStyles = 'px-4 py-2 rounded font-medium transition-colors duration-200';

        if (disabled) {
            return `${baseStyles} bg-gray-300 text-gray-500 cursor-not-allowed`;
        }

        switch (variant) {
            case 'primary':
                return `${baseStyles} bg-blue-500 text-white hover:bg-blue-600`;
            case 'secondary':
                return `${baseStyles} bg-gray-500 text-white hover:bg-gray-600`;
            case 'danger':
                return `${baseStyles} bg-red-500 text-white hover:bg-red-600`;
            default:
                return `${baseStyles} bg-blue-500 text-white hover:bg-blue-600`;
        }
    };

    return (
        <button
            onClick={handleClick}
            className={getButtonStyles()}
            disabled={disabled}
        >
            {label}
        </button>
    );
};

// Counter component with event handling
interface CounterProps {
    initialValue?: number;
    onCountChange?: (count: number) => void;
}

export const Counter: React.FC<CounterProps> = ({
    initialValue = 0,
    onCountChange
}) => {
    const [count, setCount] = useState(initialValue);

    const handleIncrement = () => {
        const newCount = count + 1;
        setCount(newCount);
        onCountChange?.(newCount);
    };

    const handleDecrement = () => {
        const newCount = count - 1;
        setCount(newCount);
        onCountChange?.(newCount);
    };

    const handleReset = () => {
        const newCount = initialValue;
        setCount(newCount);
        onCountChange?.(newCount);
    };

    // Handle keyboard events for accessibility
    const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
        switch (event.key) {
            case 'ArrowUp':
                event.preventDefault();
                handleIncrement();
                break;
            case 'ArrowDown':
                event.preventDefault();
                handleDecrement();
                break;
            case 'Home':
                event.preventDefault();
                handleReset();
                break;
        }
    };

    return (
        <div
            className="inline-flex items-center space-x-2 p-4 border border-gray-300 rounded-lg bg-white"
            onKeyDown={handleKeyDown}
            tabIndex={0}
            role="group"
            aria-label="Counter controls"
        >
            <button
                onClick={handleDecrement}
                className="w-8 h-8 bg-red-500 text-white rounded hover:bg-red-600 transition-colors"
                aria-label="Decrease count"
            >
                -
            </button>

            <span className="font-mono text-xl min-w-[3rem] text-center">
                {count}
            </span>

            <button
                onClick={handleIncrement}
                className="w-8 h-8 bg-green-500 text-white rounded hover:bg-green-600 transition-colors"
                aria-label="Increase count"
            >
                +
            </button>

            <button
                onClick={handleReset}
                className="px-3 py-1 bg-gray-500 text-white text-sm rounded hover:bg-gray-600 transition-colors"
                aria-label="Reset count"
            >
                Reset
            </button>

            <div className="text-xs text-gray-500 ml-4">
                Use ↑↓ arrows or Home key
            </div>
        </div>
    );
};

// Modal component demonstrating focus management and escape key handling
interface ModalProps {
    isOpen: boolean;
    title: string;
    children: React.ReactNode;
    onClose: () => void;
}

export const Modal: React.FC<ModalProps> = ({ isOpen, title, children, onClose }) => {
    // Handle escape key to close modal
    const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
        if (event.key === 'Escape') {
            onClose();
        }
    };

    // Handle backdrop click to close modal
    const handleBackdropClick = (event: React.MouseEvent<HTMLDivElement>) => {
        if (event.target === event.currentTarget) {
            onClose();
        }
    };

    if (!isOpen) return null;

    return (
        <div
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
            onClick={handleBackdropClick}
            onKeyDown={handleKeyDown}
            role="dialog"
            aria-labelledby="modal-title"
            aria-modal="true"
        >
            <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
                <div className="flex justify-between items-center mb-4">
                    <h2 id="modal-title" className="text-xl font-semibold">
                        {title}
                    </h2>
                    <button
                        onClick={onClose}
                        className="text-gray-400 hover:text-gray-600 transition-colors"
                        aria-label="Close modal"
                    >
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>
                <div>
                    {children}
                </div>
            </div>
        </div>
    );
};

// Example usage component
export const ComponentExamples: React.FC = () => {
    const [messages, setMessages] = useState<string[]>([]);
    const [counterValue, setCounterValue] = useState(0);
    const [formData, setFormData] = useState<Record<string, { value: string; isValid: boolean }>>({});
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleButtonClick = (message: string) => {
        setMessages(prev => [message, ...prev.slice(0, 4)]);
    };

    const handleCounterChange = (count: number) => {
        setCounterValue(count);
        setMessages(prev => [`Counter changed to ${count}`, ...prev.slice(0, 4)]);
    };

    const handleInputChange = (fieldName: string) => (value: string, isValid: boolean) => {
        setFormData(prev => ({
            ...prev,
            [fieldName]: { value, isValid }
        }));
    };

    return (
        <div className="space-y-8">
            <div className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-lg font-semibold mb-4">Custom Button Components</h3>
                <div className="space-x-2 space-y-2">
                    <CustomButton
                        label="Primary"
                        onClick={handleButtonClick}
                        variant="primary"
                    />
                    <CustomButton
                        label="Secondary"
                        onClick={handleButtonClick}
                        variant="secondary"
                    />
                    <CustomButton
                        label="Danger"
                        onClick={handleButtonClick}
                        variant="danger"
                    />
                    <CustomButton
                        label="Disabled"
                        onClick={handleButtonClick}
                        disabled={true}
                    />
                </div>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-lg font-semibold mb-4">Counter Component</h3>
                <Counter
                    initialValue={0}
                    onCountChange={handleCounterChange}
                />
                <p className="mt-2 text-sm text-gray-600">
                    Current counter value: {counterValue}
                </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-lg font-semibold mb-4">Validated Input Components</h3>
                <div className="space-y-4">
                    <ValidatedInput
                        label="Full Name"
                        placeholder="Enter your full name"
                        required={true}
                        minLength={2}
                        maxLength={50}
                        onValueChange={handleInputChange('fullName')}
                    />

                    <ValidatedInput
                        label="Email Address"
                        type="email"
                        placeholder="Enter your email"
                        required={true}
                        onValueChange={handleInputChange('email')}
                    />

                    <ValidatedInput
                        label="Phone Number"
                        type="text"
                        placeholder="(123) 456-7890"
                        pattern="^\(\d{3}\) \d{3}-\d{4}$"
                        onValueChange={handleInputChange('phone')}
                    />
                </div>

                <div className="mt-4 p-3 bg-gray-50 rounded">
                    <h4 className="font-medium text-sm">Form Data:</h4>
                    <pre className="text-xs mt-1 overflow-x-auto">
                        {JSON.stringify(formData, null, 2)}
                    </pre>
                </div>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-lg font-semibold mb-4">Modal Component</h3>
                <button
                    onClick={() => setIsModalOpen(true)}
                    className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors"
                >
                    Open Modal
                </button>

                <Modal
                    isOpen={isModalOpen}
                    title="Example Modal"
                    onClose={() => setIsModalOpen(false)}
                >
                    <p className="mb-4">
                        This modal demonstrates keyboard event handling (Escape to close)
                        and click event handling (click backdrop to close).
                    </p>
                    <button
                        onClick={() => setIsModalOpen(false)}
                        className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600 transition-colors"
                    >
                        Close Modal
                    </button>
                </Modal>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-lg font-semibold mb-4">Recent Messages</h3>
                {messages.length === 0 ? (
                    <p className="text-gray-500">No messages yet. Interact with the components above!</p>
                ) : (
                    <ul className="space-y-1">
                        {messages.map((message, index) => (
                            <li key={index} className="text-sm bg-blue-50 p-2 rounded">
                                {message}
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </div>
    );
};
