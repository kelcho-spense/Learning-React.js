import { type ReactNode } from 'react'

interface ButtonProps {
    children: ReactNode
    variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger'
    size?: 'sm' | 'md' | 'lg' | 'xl'
    disabled?: boolean
    loading?: boolean
    fullWidth?: boolean
    rounded?: 'none' | 'sm' | 'md' | 'lg' | 'full'
    onClick?: () => void
    type?: 'button' | 'submit' | 'reset'
    className?: string
}

function Button({
    children,
    variant = 'primary',
    size = 'md',
    disabled = false,
    loading = false,
    fullWidth = false,
    rounded = 'md',
    onClick,
    type = 'button',
    className = ''
}: ButtonProps) {

    // Base styles that apply to all buttons
    const baseStyles = `
    inline-flex items-center justify-center font-medium transition-all duration-200 
    focus:outline-none focus:ring-2 focus:ring-offset-2 
    disabled:opacity-50 disabled:cursor-not-allowed disabled:pointer-events-none
    ${fullWidth ? 'w-full' : ''}
  `

    // Variant styles
    const variantStyles = {
        primary: `
      bg-blue-600 text-white hover:bg-blue-700 active:bg-blue-800
      focus:ring-blue-500 shadow-sm hover:shadow-md
    `,
        secondary: `
      bg-gray-600 text-white hover:bg-gray-700 active:bg-gray-800
      focus:ring-gray-500 shadow-sm hover:shadow-md
    `,
        outline: `
      border border-gray-300 bg-white text-gray-700 hover:bg-gray-50 
      active:bg-gray-100 focus:ring-blue-500 shadow-sm hover:shadow-md
    `,
        ghost: `
      text-gray-700 hover:bg-gray-100 active:bg-gray-200 
      focus:ring-gray-500
    `,
        danger: `
      bg-red-600 text-white hover:bg-red-700 active:bg-red-800
      focus:ring-red-500 shadow-sm hover:shadow-md
    `
    }

    // Size styles
    const sizeStyles = {
        sm: 'px-3 py-1.5 text-sm',
        md: 'px-4 py-2 text-base',
        lg: 'px-6 py-3 text-lg',
        xl: 'px-8 py-4 text-xl'
    }

    // Rounded styles
    const roundedStyles = {
        none: 'rounded-none',
        sm: 'rounded-sm',
        md: 'rounded-md',
        lg: 'rounded-lg',
        full: 'rounded-full'
    }

    // Combine all styles
    const buttonClasses = `
    ${baseStyles}
    ${variantStyles[variant]}
    ${sizeStyles[size]}
    ${roundedStyles[rounded]}
    ${className}
  `.replace(/\s+/g, ' ').trim()

    return (
        <button
            type={type}
            className={buttonClasses}
            onClick={onClick}
            disabled={disabled || loading}
        >
            {loading && (
                <svg
                    className="animate-spin -ml-1 mr-2 h-4 w-4"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                >
                    <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                    ></circle>
                    <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                </svg>
            )}
            {children}
        </button>
    )
}

export default Button