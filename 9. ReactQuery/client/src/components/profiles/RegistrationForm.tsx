import { useForm } from "@tanstack/react-form"
import { z } from "zod"
import { Role } from '../../constants/Role'
import { useMutation } from "@tanstack/react-query"
import { queryClient } from "../../App"
import { createProfile } from "../../api"

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
    role: z.enum([Role.STUDENT, Role.FACULTY, Role.ADMIN, Role.GUEST], {
        errorMap: () => ({ message: 'Role must be one of the following: student, faculty, administrator' }),
    })
})

export type FormData = z.infer<typeof formSchema>

const validateField = <T,>(value: T, schema: z.ZodType<T>) => {
    const result = schema.safeParse(value)
    if (!result.success) {
        return result.error.issues[0]?.message || 'Validation error'
    }
    return undefined
}



function RegistrationForm() {

    const registrationMutation = useMutation({
        mutationFn: createProfile,
        onSuccess: () => {
            // Invalidate and refetch
            queryClient.invalidateQueries({ queryKey: ['profiles'] });
        }
    })

    const form = useForm({
        defaultValues: {
            firstName: '',
            lastName: '',
            email: '',
            role: Role.GUEST, // Default role set to 'guest'
        } as FormData,
        onSubmit: async ({ value }) => {
            // Final validation before submission
            const result = formSchema.safeParse(value)
            if (!result.success) {
                console.error('Validation failed:', result.error.issues)
                return
            }

            // Submit the form data
            await registrationMutation.mutateAsync(result.data)

            // Reset form after successful submission
            form.reset()
        },
    })

    return (
        <div className="max-w-md mx-auto p-6 bg-white shadow-lg rounded-lg">
            <h2 className="text-2xl font-bold mb-6 text-gray-800 text-center">Profile Sign Up</h2>
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
                {/* Role Selection */}
                <form.Field
                    name="role"
                    validators={{
                        onChange: ({ value }) => validateField(value, formSchema.shape.role),
                        onBlur: ({ value }) => validateField(value, formSchema.shape.role),
                    }}
                    children={(field) => (
                        <div>
                            <label htmlFor={field.name} className="block text-sm font-medium text-gray-700 mb-1">
                                Role
                            </label>
                            <select
                                id={field.name}
                                name={field.name}
                                value={field.state.value}
                                onBlur={field.handleBlur}
                                onChange={(e) => field.handleChange(e.target.value as Role)}
                                className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${field.state.meta.errors.length > 0
                                    ? 'border-red-500 focus:ring-red-500'
                                    : 'border-gray-300'
                                    }`}
                            >
                                <option value={Role.STUDENT}>Student</option>
                                <option value={Role.FACULTY}>Faculty</option>
                                <option value={Role.ADMIN}>Admin</option>
                                <option defaultChecked value={Role.GUEST}>Guest</option>
                            </select>
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
        </div>
    )
}

export default RegistrationForm