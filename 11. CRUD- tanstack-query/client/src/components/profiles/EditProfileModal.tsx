import { useForm } from "@tanstack/react-form";
import { z } from "zod";
import { toast } from "sonner";
import { Role } from '../../constants/Role';
import { useUpdateProfile } from "../../hooks/useProfiles";
import type { Profile } from "./interface";
import type { FormData } from "./RegistrationForm";
import { MdClose } from "react-icons/md";

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
});

const validateField = <T,>(value: T, schema: z.ZodType<T>) => {
    const result = schema.safeParse(value);
    if (!result.success) {
        return result.error.issues[0]?.message || 'Validation error';
    }
    return undefined;
};

interface EditProfileModalProps {
    profile: Profile;
    onClose: () => void;
}

function EditProfileModal({ profile, onClose }: EditProfileModalProps) {
    const updateMutation = useUpdateProfile();

    const form = useForm({
        defaultValues: {
            firstName: profile.firstName,
            lastName: profile.lastName,
            email: profile.email,
            role: profile.role as Role,
        } as FormData, onSubmit: async ({ value }) => {
            // Final validation before submission
            const result = formSchema.safeParse(value);
            if (!result.success) {
                console.error('Validation failed:', result.error.issues);
                toast.error('Please fix validation errors before submitting');
                return;
            }

            try {
                // Submit the form data with the profile ID
                await updateMutation.mutateAsync({
                    id: profile.id.toString(),
                    ...result.data,
                });

                // Close modal after successful submission
                onClose();
                toast.success('Profile updated successfully!');
            } catch (error) {
                console.error('Error updating profile:', error);
                toast.error('Failed to update profile. Please try again.');
            }
        },
    });

    // Close modal when clicking outside
    const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
        if (e.target === e.currentTarget) {
            onClose();
        }
    };

    return (
        <div
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
            onClick={handleBackdropClick}
        >
            <div className="bg-white rounded-lg p-6 w-full max-w-md mx-4">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-2xl font-bold text-gray-800">Edit Profile</h2>
                    <button
                        onClick={onClose}
                        className="text-gray-500 hover:text-gray-700 text-2xl"
                    >
                        <MdClose />
                    </button>
                </div>

                <form
                    onSubmit={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        form.handleSubmit();
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
                                    placeholder="Enter first name"
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
                                    placeholder="Enter last name"
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
                                    placeholder="Enter email address"
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
                                    <option value={Role.GUEST}>Guest</option>
                                </select>
                                {field.state.meta.errors.length > 0 && (
                                    <p className="mt-1 text-sm text-red-600">
                                        {String(field.state.meta.errors[0])}
                                    </p>
                                )}
                            </div>
                        )}
                    />

                    {/* Action Buttons */}
                    <div className="flex gap-2 pt-4">
                        <form.Subscribe
                            selector={(state) => [state.canSubmit, state.isSubmitting]}
                            children={([canSubmit, isSubmitting]) => (
                                <button
                                    type="submit"
                                    disabled={!canSubmit || updateMutation.isPending}
                                    className={`flex-1 py-2 px-4 rounded-md font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 ${canSubmit && !updateMutation.isPending
                                        ? 'bg-blue-600 hover:bg-blue-700 text-white'
                                        : 'bg-gray-400 cursor-not-allowed text-gray-200'
                                        }`}
                                >
                                    {isSubmitting || updateMutation.isPending ? 'Updating...' : 'Update Profile'}
                                </button>
                            )}
                        />
                        <button
                            type="button"
                            onClick={onClose}
                            className="flex-1 py-2 px-4 rounded-md font-medium bg-gray-500 hover:bg-gray-600 text-white transition-colors focus:outline-none focus:ring-2 focus:ring-gray-500"
                            disabled={updateMutation.isPending}
                        >
                            Cancel
                        </button>
                    </div>
                </form>

                {/* Display mutation error if any */}
                {updateMutation.isError && (
                    <div className="mt-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
                        Error updating profile: {updateMutation.error?.message}
                    </div>
                )}
            </div>
        </div>
    );
}

export default EditProfileModal;
