import { useForm } from '@tanstack/react-form'
import { z } from 'zod'

// Zod schema for form validation
const formSchema = z.object({
    firstName: z
        .string()
        .min(2, 'First name must be at least 2 characters')
        .max(50, 'First name must be less than 50 characters'),
    lastName: z
        .string()
        .min(2, 'Last name must be at least 2 characters')
        .max(50, 'Last name must be less than 50 characters'),
    email: z
        .string()
        .email('Please enter a valid email address')
        .min(1, 'Email is required'),
    password: z
        .string()
        .min(8, 'Password must be at least 8 characters')
        .regex(/[A-Z]/, 'Password must contain at least one uppercase letter')
        .regex(/[a-z]/, 'Password must contain at least one lowercase letter')
        .regex(/\d/, 'Password must contain at least one number'),
    agreeToTerms: z
        .boolean()
        .refine(val => val === true, 'You must agree to the terms and conditions'),
})

type FormData = z.infer<typeof formSchema>

// Helper function to validate with Zod
const validateField = <T,>(value: T, schema: z.ZodType<T>) => {
    const result = schema.safeParse(value)
    if (!result.success) {
        return result.error.issues[0]?.message || 'Validation error'
    }
    return undefined
}

function TanstackForm() {
    const form = useForm({
        defaultValues: {
            firstName: '',
            lastName: '',
            email: '',
            password: '',
            agreeToTerms: false,
        } as FormData,
        onSubmit: async ({ value }) => {
            // Final validation before submission
            const result = formSchema.safeParse(value)
            if (!result.success) {
                console.error('Validation failed:', result.error.issues)
                return
            }

            console.log('Form submitted successfully:', value)
            alert('Form submitted successfully!')

            // Reset form after successful submission
            form.reset()
        },
    })

    return (
        <div className="max-w-md mx-auto p-6 bg-white shadow-lg rounded-lg">
            <h2 className="text-2xl font-bold mb-6 text-gray-800 text-center">Sign Up (Tanstack Form)</h2>

            <form
                onSubmit={(e) => {
                    e.preventDefault()
                    e.stopPropagation()
                    form.handleSubmit()
                }}
                className="space-y-4"
            >
                {/* First Name Field */}
                <form.Field
                    name="firstName"
                    validators={{
                        onChange: ({ value }) => validateField(value, formSchema.shape.firstName),
                        onBlur: ({ value }) => validateField(value, formSchema.shape.firstName),
                    }}
                    children={(field) => (
                        <div>
                            <label htmlFor={field.name} className="block text-sm font-medium text-gray-700 mb-1">
                                First Name
                            </label>
                            <input
                                type="text"
                                id={field.name}
                                name={field.name}
                                value={field.state.value}
                                onBlur={field.handleBlur}
                                onChange={(e) => field.handleChange(e.target.value)}
                                className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${field.state.meta.errors.length > 0
                                    ? 'border-red-500 focus:ring-red-500'
                                    : 'border-gray-300'
                                    }`}
                                placeholder="Enter your first name"
                            />
                            {field.state.meta.errors.length > 0 && (
                                <p className="mt-1 text-sm text-red-600">
                                    {String(field.state.meta.errors[0])}
                                </p>
                            )}
                        </div>
                    )}
                />

                {/* Last Name Field */}
                <form.Field
                    name="lastName"
                    validators={{
                        onChange: ({ value }) => validateField(value, formSchema.shape.lastName),
                        onBlur: ({ value }) => validateField(value, formSchema.shape.lastName),
                    }}
                    children={(field) => (
                        <div>
                            <label htmlFor={field.name} className="block text-sm font-medium text-gray-700 mb-1">
                                Last Name
                            </label>
                            <input
                                type="text"
                                id={field.name}
                                name={field.name}
                                value={field.state.value}
                                onBlur={field.handleBlur}
                                onChange={(e) => field.handleChange(e.target.value)}
                                className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${field.state.meta.errors.length > 0
                                    ? 'border-red-500 focus:ring-red-500'
                                    : 'border-gray-300'
                                    }`}
                                placeholder="Enter your last name"
                            />
                            {field.state.meta.errors.length > 0 && (
                                <p className="mt-1 text-sm text-red-600">
                                    {String(field.state.meta.errors[0])}
                                </p>
                            )}
                        </div>
                    )}
                />

                {/* Email Field */}
                <form.Field
                    name="email"
                    validators={{
                        onChange: ({ value }) => validateField(value, formSchema.shape.email),
                        onBlur: ({ value }) => validateField(value, formSchema.shape.email),
                    }}
                    children={(field) => (
                        <div>
                            <label htmlFor={field.name} className="block text-sm font-medium text-gray-700 mb-1">
                                Email Address
                            </label>
                            <input
                                type="email"
                                id={field.name}
                                name={field.name}
                                value={field.state.value}
                                onBlur={field.handleBlur}
                                onChange={(e) => field.handleChange(e.target.value)}
                                className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${field.state.meta.errors.length > 0
                                    ? 'border-red-500 focus:ring-red-500'
                                    : 'border-gray-300'
                                    }`}
                                placeholder="Enter your email address"
                            />
                            {field.state.meta.errors.length > 0 && (
                                <p className="mt-1 text-sm text-red-600">
                                    {String(field.state.meta.errors[0])}
                                </p>
                            )}
                        </div>
                    )}
                />

                {/* Password Field */}
                <form.Field
                    name="password"
                    validators={{
                        onChange: ({ value }) => validateField(value, formSchema.shape.password),
                        onBlur: ({ value }) => validateField(value, formSchema.shape.password),
                    }}
                    children={(field) => (
                        <div>
                            <label htmlFor={field.name} className="block text-sm font-medium text-gray-700 mb-1">
                                Password
                            </label>
                            <input
                                type="password"
                                id={field.name}
                                name={field.name}
                                value={field.state.value}
                                onBlur={field.handleBlur}
                                onChange={(e) => field.handleChange(e.target.value)}
                                className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${field.state.meta.errors.length > 0
                                    ? 'border-red-500 focus:ring-red-500'
                                    : 'border-gray-300'
                                    }`}
                                placeholder="Enter your password"
                            />
                            {field.state.meta.errors.length > 0 && (
                                <p className="mt-1 text-sm text-red-600">
                                    {String(field.state.meta.errors[0])}
                                </p>
                            )}
                        </div>
                    )}
                />

                {/* Terms and Conditions Field */}
                <form.Field
                    name="agreeToTerms"
                    validators={{
                        onChange: ({ value }) => validateField(value, formSchema.shape.agreeToTerms),
                        onBlur: ({ value }) => validateField(value, formSchema.shape.agreeToTerms),
                    }}
                    children={(field) => (
                        <div>
                            <label className="flex items-start">
                                <input
                                    type="checkbox"
                                    name={field.name}
                                    checked={field.state.value}
                                    onBlur={field.handleBlur}
                                    onChange={(e) => field.handleChange(e.target.checked)}
                                    className="mr-2 mt-1"
                                />
                                <span className="text-sm text-gray-700">
                                    I agree to the Terms and Conditions and Privacy Policy
                                </span>
                            </label>
                            {field.state.meta.errors.length > 0 && (
                                <p className="mt-1 text-sm text-red-600">
                                    {String(field.state.meta.errors[0])}
                                </p>
                            )}
                        </div>
                    )}
                />

                {/* Submit Button */}
                <div className="pt-4">
                    <form.Subscribe
                        selector={(state) => [state.canSubmit, state.isSubmitting]}
                        children={([canSubmit, isSubmitting]) => (
                            <button
                                type="submit"
                                disabled={!canSubmit}
                                className={`w-full py-2 px-4 rounded-md font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 ${canSubmit
                                    ? 'bg-blue-600 hover:bg-blue-700 text-white'
                                    : 'bg-gray-400 cursor-not-allowed text-gray-200'
                                    }`}
                            >
                                {isSubmitting ? 'Submitting...' : 'Sign Up'}
                            </button>
                        )}
                    />
                </div>
            </form>

            {/* Debug Information - Only in development */}
            <form.Subscribe
                selector={(state) => state.values}
                children={(values) => (
                    <div className="mt-8 p-4 bg-gray-100 rounded-md">
                        <h3 className="text-lg font-medium mb-2">Form Data (Debug)</h3>
                        <pre className="text-xs overflow-auto max-h-40 text-gray-600">
                            {JSON.stringify(values, null, 2)}
                        </pre>
                    </div>
                )}
            />

            {/* Form State Debug */}
            <form.Subscribe
                selector={(state) => [state.isValid, state.canSubmit]}
                children={([isValid, canSubmit]) => (
                    <div className="mt-4 p-4 bg-gray-50 rounded-md">
                        <h3 className="text-sm font-medium mb-2">Form State</h3>
                        <p className="text-xs text-gray-600">Valid: {isValid ? 'Yes' : 'No'}</p>
                        <p className="text-xs text-gray-600">Can Submit: {canSubmit ? 'Yes' : 'No'}</p>
                    </div>
                )}
            />
        </div>
    )
}

export default TanstackForm