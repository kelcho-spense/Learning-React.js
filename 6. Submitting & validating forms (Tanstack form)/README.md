# Form Handling in React: Normal vs Tanstack Form

This project demonstrates the differences between traditional React form handling using `useState` and the modern approach using **Tanstack Form** with **Zod validation**.

## 📋 Project Overview

This application showcases two implementations of the same sign-up form:
1. **Normal React Form** - Traditional approach using `useState`
2. **Tanstack Form** - Modern form library with advanced features and Zod validation

## 🚀 Key Concepts & Differences

### 1. **State Management**

#### Normal Form (useState)
```tsx
const [formData, setFormData] = useState<FormData>({
  firstName: '',
  lastName: '',
  email: '',
  password: '',
  agreeToTerms: false,
});
```
- Manual state management for each field
- Requires custom `handleInputChange` function
- State updates are managed manually

#### Tanstack Form
```tsx
const form = useForm({
  defaultValues: {
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    agreeToTerms: false,
  },
  onSubmit: async ({ value }) => {
    // Handle submission logic
  },
})
```
- Built-in state management
- Automatic field state tracking
- Handles touched, dirty, and error states automatically

### 2. **Validation Approach**

#### Normal Form
- No built-in validation
- Manual validation logic required
- Basic browser validation only (HTML5)
- Error handling must be implemented manually

#### Tanstack Form with Zod
```tsx
const formSchema = z.object({
  firstName: z
    .string()
    .min(2, 'First name must be at least 2 characters')
    .max(50, 'First name must be less than 50 characters'),
  email: z
    .string()
    .email('Please enter a valid email address'),
  password: z
    .string()
    .min(8, 'Password must be at least 8 characters')
    .regex(/[A-Z]/, 'Password must contain at least one uppercase letter'),
})
```
- **Type-safe validation** with Zod schemas
- **Real-time validation** on field change and blur
- **Comprehensive error messages**
- **Schema-based validation** ensures consistency

### 3. **Field Management**

#### Normal Form
```tsx
<input
  type="text"
  name="firstName"
  value={formData.firstName}
  onChange={handleInputChange}
/>
```
- Manual field binding
- Generic change handler for all fields
- No field-level state tracking

#### Tanstack Form
```tsx
<form.Field
  name="firstName"
  validators={{
    onChange: ({ value }) => validateField(value, formSchema.shape.firstName),
    onBlur: ({ value }) => validateField(value, formSchema.shape.firstName),
  }}
  children={(field) => (
    <input
      value={field.state.value}
      onChange={(e) => field.handleChange(e.target.value)}
      onBlur={field.handleBlur}
    />
  )}
/>
```
- **Field-specific state management**
- **Individual validation rules** per field
- **Built-in error tracking** and display
- **Optimized re-renders** only when field state changes

### 4. **Error Handling**

#### Normal Form
- No error handling by default
- Manual error state management required
- Basic HTML5 validation messages

#### Tanstack Form
```tsx
{field.state.meta.errors.length > 0 && (
  <p className="text-red-600">
    {String(field.state.meta.errors[0])}
  </p>
)}
```
- **Automatic error collection**
- **Field-level error states**
- **Custom error messages** from Zod
- **Visual error indicators** (red borders, etc.)

### 5. **Form State Tracking**

#### Normal Form
- No built-in form state tracking
- Manual implementation required for features like:
  - Is form valid?
  - Is form dirty?
  - Is form submitting?

#### Tanstack Form
```tsx
<form.Subscribe
  selector={(state) => [state.canSubmit, state.isSubmitting]}
  children={([canSubmit, isSubmitting]) => (
    <button disabled={!canSubmit}>
      {isSubmitting ? 'Submitting...' : 'Submit'}
    </button>
  )}
/>
```
- **Built-in form state tracking**
- **Reactive updates** based on form state
- **Submit state management**
- **Validation state tracking**

### 6. **Performance Optimizations**

#### Normal Form
- Re-renders entire component on any state change
- No optimization for field updates
- All fields re-render when one field changes

#### Tanstack Form
- **Granular re-renders** - only affected fields re-render
- **Subscription-based updates** for optimal performance
- **Field isolation** prevents unnecessary updates
- **Optimized validation** runs only when needed

### 7. **Type Safety**

#### Normal Form
- Basic TypeScript support
- Manual type definitions required
- No validation-to-type connection

#### Tanstack Form with Zod
```tsx
type FormData = z.infer<typeof formSchema>
```
- **Automatic type inference** from Zod schema
- **Runtime and compile-time type safety**
- **Schema-driven development**
- **Consistent types** across validation and state

## 🛠️ Advanced Features in Tanstack Form

### Field Arrays
Handle dynamic lists of fields (not shown in this example but supported):
```tsx
<form.Field name="hobbies" mode="array">
  {/* Dynamic array of hobby fields */}
</form.Field>
```

### Cross-field Validation
Validate fields based on other field values:
```tsx
validators={{
  onChangeListenTo: ['password'],
  onChange: ({ value, fieldApi }) => {
    const password = fieldApi.form.getFieldValue('password')
    return value === password ? undefined : 'Passwords must match'
  },
}}
```

### Conditional Fields
Show/hide fields based on other field values:
```tsx
<form.Subscribe
  selector={(state) => state.values.hasAccount}
  children={(hasAccount) => (
    hasAccount && <form.Field name="accountId">...</form.Field>
  )}
/>
```

## 📦 Dependencies

```json
{
  "@tanstack/react-form": "^1.12.3",
  "zod": "^3.25.67",
  "@tanstack/zod-form-adapter": "^0.42.1"
}
```

## 🏃‍♂️ Running the Project

```bash
pnpm install
pnpm dev
```

## 📚 Learning Resources

- [Tanstack Form Documentation](https://tanstack.com/form/latest/docs/framework/react/guides/basic-concepts)
- [Zod Documentation](https://zod.dev/basics)
- [Form Validation Best Practices](https://tanstack.com/form/latest/docs/framework/react/guides/validation)

## 🎯 When to Use Each Approach

### Use Normal Form When:
- Simple forms with minimal validation
- Learning React fundamentals
- Quick prototypes
- Very basic form requirements

### Use Tanstack Form When:
- Complex forms with validation
- Performance is critical
- Type safety is important
- Advanced form features needed (arrays, conditional fields)
- Professional/production applications

## 🔍 Key Takeaways

1. **Tanstack Form** provides better **developer experience** with less boilerplate
2. **Zod integration** ensures **type safety** and **robust validation**
3. **Performance optimizations** are built-in with Tanstack Form
4. **Scalability** - Tanstack Form handles complex scenarios better
5. **Maintenance** - Schema-driven approach reduces bugs and improves maintainability

## 🎨 Visual Differences

When you run the application, you'll notice:

### Normal Form
- Basic validation (HTML5 only)
- No real-time error feedback
- Submit button always enabled
- Simple state management

### Tanstack Form
- **Rich validation messages** from Zod
- **Real-time validation** on field change/blur
- **Smart submit button** (disabled when form is invalid)
- **Visual error indicators** (red borders)
- **Advanced form state tracking** shown in debug panels

## 🧪 Testing the Forms

Try these scenarios to see the differences:

1. **Leave fields empty** and try to submit
2. **Enter invalid email** formats
3. **Use weak passwords** (no uppercase, too short)
4. **Watch the submit button** state change
5. **Notice performance** when typing in fields

The Tanstack Form will provide immediate feedback and prevent submission until all validation passes, while the normal form relies on basic browser validation.
