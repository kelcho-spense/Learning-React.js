import { createFileRoute, useNavigate } from '@tanstack/react-router'
import { Button } from "@/components/ui/button"
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { z } from 'zod'
import { useForm } from '@tanstack/react-form'
import { useLogin } from '@/hooks/useAuth'
import { toast } from 'sonner'


// Zod schema for form validation
const formSchema = z.object({
  email: z
    .string()
    .email('Please enter a valid email address')
    .min(1, 'Email is required'),
  password: z
    .string()
    .min(4, 'Password must be at least 8 characters')
  // .regex(/[A-Z]/, 'Password must contain at least one uppercase letter')
  // .regex(/[a-z]/, 'Password must contain at least one lowercase letter')
  // .regex(/\d/, 'Password must contain at least one number'),
})

export type FormData = z.infer<typeof formSchema>

// Helper function to validate with Zod
const validateField = <T,>(value: T, schema: z.ZodType<T>) => {
  const result = schema.safeParse(value)
  if (!result.success) {
    return result.error.issues[0]?.message || 'Validation error'
  }
  return undefined
}

export const Route = createFileRoute('/login')({
  component: RouteComponent,
})

function RouteComponent() {
  const loginUser = useLogin()
  const navigate = useNavigate({ from: '/login' })

  const form = useForm({
    defaultValues: { email: '', password: '', } as FormData,
    onSubmit: async ({ value }) => {
      // Final validation before submission
      const result = formSchema.safeParse(value)
      if (!result.success) {
        console.error('Validation failed:', result.error.issues)
        return
      }

      console.log('Attempting login with:', { email: result.data.email, password: '[HIDDEN]' });

      try {
        const res = await loginUser.mutateAsync(result.data)
        toast.success('Login successful!');
        console.log('Login response:', res)
        form.reset()

        navigate({ to: '/dashboard' }) 
      } catch (error) {

        // Show specific error message from the server
        let errorMessage = 'Login failed. Please try again.';

        if (error instanceof Error) {
          errorMessage = error.message;
        }

        // Additional user-friendly error handling
        if (errorMessage.toLowerCase().includes('not found') || errorMessage.toLowerCase().includes('no account found')) {
          toast.error('Account not found. Please check your email or create a new account.');
        } else if (errorMessage.toLowerCase().includes('invalid') || errorMessage.toLowerCase().includes('password')) {
          toast.error('Invalid credentials. Please check your email and password.');
        } else if (errorMessage.toLowerCase().includes('network') || errorMessage.toLowerCase().includes('fetch')) {
          toast.error('Network error. Please check your internet connection and try again.');
        } else {
          toast.error(errorMessage);
        }
      }

      console.log('Form submitted successfully:', value)

      // Reset form after successful submission
    },
  })

  return (
    <div className='flex items-center justify-center h-screen dark:bg-gray-900 bg-gray-100'>
      <Card className="w-full max-w-sm">
        <CardHeader>
          <CardTitle>Login to your account</CardTitle>
          <CardDescription>
            Enter your credentials below to login
          </CardDescription>
          <CardAction>
            <Button variant="link">Sign Up</Button>
          </CardAction>
        </CardHeader>
        <form
          onSubmit={(e) => {
            e.preventDefault()
            e.stopPropagation()
            form.handleSubmit()
          }}
        >
          <CardContent>
            <div className="flex flex-col gap-6">
              <form.Field
                name="email"
                validators={{
                  onChange: ({ value }) => validateField(value, formSchema.shape.email),
                  onBlur: ({ value }) => validateField(value, formSchema.shape.email),
                }}
                children={(field) => (
                  <div className="grid gap-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      type="email"
                      id={field.name}
                      name={field.name}
                      value={field.state.value}
                      onBlur={field.handleBlur}
                      onChange={(e) => field.handleChange(e.target.value)}
                      placeholder="name@mail.com"
                      required
                    />
                    {field.state.meta.errors.length > 0 && (
                      <p className="mt-1 text-sm text-red-600">
                        {String(field.state.meta.errors[0])}
                      </p>
                    )}
                  </div>
                )}
              />
              <form.Field
                name="password"
                validators={{
                  onChange: ({ value }) => validateField(value, formSchema.shape.password),
                  onBlur: ({ value }) => validateField(value, formSchema.shape.password),
                }}
                children={(field) => (
                  <div className="grid gap-2">
                    <Label htmlFor="password">Password</Label>
                    <Input
                      type="password"
                      id={field.name}
                      name={field.name}
                      value={field.state.value}
                      onBlur={field.handleBlur}
                      placeholder="Enter your password"
                      onChange={(e) => field.handleChange(e.target.value)}
                    />
                    {field.state.meta.errors.length > 0 && (
                      <p className="mt-1 text-sm text-red-600">
                        {String(field.state.meta.errors[0])}
                      </p>
                    )}
                  </div>
                )}
              />
              <form.Subscribe
                selector={(state) => [state.canSubmit, state.isSubmitting]}
                children={([canSubmit, isSubmitting]) => (
                  <Button
                    type="submit"
                    disabled={!canSubmit || loginUser.isPending}
                    className="w-full bg-emerald-400 text-white hover:bg-emerald-500 disabled:opacity-50">
                    {isSubmitting || loginUser.isPending ? 'Logging in...' : 'Login'}
                  </Button>
                )}
              />

              {/* Show error message if login fails */}
              {loginUser.isError && (
                <div className="mt-2 p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-md">
                  <p className="text-sm text-red-600 dark:text-red-400">
                    {loginUser.error?.message || 'Login failed. Please try again.'}
                  </p>
                </div>
              )}
            </div>

          </CardContent>
          <CardFooter>
            <div className="flex items-center justify-between">
              <Button variant="link">Forgot Password?</Button>
            </div>
          </CardFooter>
        </form>
      </Card>
    </div>
  )
}
