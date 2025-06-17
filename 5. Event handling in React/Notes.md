# React Event Handling - Simplified Guide

## Table of Contents
1. [Mouse Events - onClick](#mouse-events---onclick)
2. [Keyboard Events - onKeyDown](#keyboard-events---onkeydown)
3. [Form Events](#form-events)
   - [onChange](#onchange)
   - [onInput](#oninput)
   - [onSubmit](#onsubmit)
   - [onFocus](#onfocus)
   - [onBlur](#onblur)
4. [Practical Examples from the Code](#practical-examples-from-the-code)
5. [Best Practices](#best-practices)

---

## Mouse Events - onClick

### What is onClick?
The `onClick` event is triggered when a user clicks on an element. It's the most common event in React applications.

### Basic Syntax
```tsx
const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
  console.log('Button clicked!');
};

<button onClick={handleClick}>Click me</button>
```

### Key Points:
- **Event Type**: `React.MouseEvent<HTMLButtonElement>`
- **When it fires**: When user clicks the element
- **Common use cases**: Button interactions, menu selections, navigation

### Examples from Your Code:

#### 1. Simple Button Click (CustomButton component)
```tsx
const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
  // Prevent click if disabled
  if (disabled) {
    event.preventDefault();
    return;
  }
  
  // Call parent's onClick with a message
  onClick(`${label} button was clicked!`);
};

<button onClick={handleClick}>
  {label}
</button>
```

#### 2. Counter Buttons (Counter component)
```tsx
const handleIncrement = () => {
  const newCount = count + 1;
  setCount(newCount);
  onCountChange?.(newCount);
};

<button onClick={handleIncrement}>+</button>
```

#### 3. Modal Controls
```tsx
// Open modal
<button onClick={() => setIsModalOpen(true)}>
  Open Modal
</button>

// Close modal
<button onClick={() => setIsModalOpen(false)}>
  Close Modal
</button>
```

---

## Keyboard Events - onKeyDown

### What is onKeyDown?
The `onKeyDown` event is triggered when a user presses a key down. It fires before the key is released.

### Basic Syntax
```tsx
const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
  console.log('Key pressed:', event.key);
};

<input onKeyDown={handleKeyDown} />
```

### Key Properties:
- **event.key**: The actual key pressed (e.g., 'a', 'Enter', 'Escape')
- **event.code**: Physical key code (e.g., 'KeyA', 'Enter')
- **event.ctrlKey**: True if Ctrl was held
- **event.shiftKey**: True if Shift was held
- **event.altKey**: True if Alt was held

### Examples from Your Code:

#### Counter Navigation with Arrow Keys
```tsx
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

<div onKeyDown={handleKeyDown} tabIndex={0}>
  {/* Counter content */}
</div>
```

#### Modal Escape Key Handling
```tsx
const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
  if (event.key === 'Escape') {
    onClose();
  }
};

<div onKeyDown={handleKeyDown}>
  {/* Modal content */}
</div>
```

---

## Form Events

### onChange

#### What is onChange?
The `onChange` event is triggered when the value of an input element changes.

#### Basic Syntax
```tsx
const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
  setValue(event.target.value);
};

<input value={value} onChange={handleChange} />
```

#### Example from Your Code:
```tsx
const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
  const newValue = event.target.value;
  setValue(newValue);

  const validationErrors = validateInput(newValue);
  setErrors(validationErrors);

  const isValid = validationErrors.length === 0;
  onValueChange?.(newValue, isValid);
  onValidationChange?.(validationErrors);
};

<input
  type={type}
  value={value}
  onChange={handleChange}
  className="w-full px-3 py-2 border rounded-md"
/>
```

### onInput

#### What is onInput?
The `onInput` event is similar to `onChange` but fires immediately as the user types, without waiting for the element to lose focus.

#### Difference from onChange:
- **onChange**: Fires when value changes and element loses focus
- **onInput**: Fires immediately as user types

#### Basic Syntax
```tsx
const handleInput = (event: React.FormEvent<HTMLInputElement>) => {
  console.log('Input value:', event.currentTarget.value);
};

<input onInput={handleInput} />
```

### onSubmit

#### What is onSubmit?
The `onSubmit` event is triggered when a form is submitted, either by clicking a submit button or pressing Enter.

#### Basic Syntax
```tsx
const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
  event.preventDefault(); // Prevent default form submission
  console.log('Form submitted');
};

<form onSubmit={handleSubmit}>
  <input type="text" />
  <button type="submit">Submit</button>
</form>
```

#### Key Points:
- **Always use** `event.preventDefault()` to prevent default browser behavior
- Access form data using `FormData` or controlled components
- Validate data before processing

### onFocus

#### What is onFocus?
The `onFocus` event is triggered when an element receives focus (user clicks on it or tabs to it).

#### Basic Syntax
```tsx
const handleFocus = (event: React.FocusEvent<HTMLInputElement>) => {
  console.log('Input focused');
};

<input onFocus={handleFocus} />
```

#### Example from Your Code:
```tsx
const handleFocus = () => {
  // Clear errors on focus for better UX
  if (!touched) {
    setErrors([]);
  }
};

<input onFocus={handleFocus} />
```

### onBlur

#### What is onBlur?
The `onBlur` event is triggered when an element loses focus (user clicks elsewhere or tabs away).

#### Basic Syntax
```tsx
const handleBlur = (event: React.FocusEvent<HTMLInputElement>) => {
  console.log('Input lost focus');
};

<input onBlur={handleBlur} />
```

#### Example from Your Code:
```tsx
const handleBlur = () => {
  setTouched(true); // Mark field as touched for validation
};

<input onBlur={handleBlur} />
```

---

## Practical Examples from the Code

### 1. Complete Form with All Events
Your `ValidatedInput` component demonstrates all form events:

```tsx
<input
  type={type}
  value={value}
  onChange={handleChange}    // Handle value changes
  onBlur={handleBlur}       // Mark as touched when user leaves field
  onFocus={handleFocus}     // Clear errors when user focuses
  placeholder={placeholder}
  className={`w-full px-3 py-2 border rounded-md ${
    hasErrors ? 'border-red-500' : 'border-gray-300'
  }`}
/>
```

### 2. Interactive Counter with Keyboard Support
Your `Counter` component shows mouse and keyboard events working together:

```tsx
<div 
  onKeyDown={handleKeyDown}  // Arrow keys for increment/decrement
  tabIndex={0}               // Make div focusable
>
  <button onClick={handleDecrement}>-</button>  {/* Mouse click */}
  <span>{count}</span>
  <button onClick={handleIncrement}>+</button>  {/* Mouse click */}
</div>
```

### 3. Modal with Multiple Event Types
Your `Modal` component combines several events:

```tsx
<div
  onClick={handleBackdropClick}  // Close on backdrop click
  onKeyDown={handleKeyDown}      // Close on Escape key
>
  <div className="modal-content">
    <button onClick={onClose}>×</button>  {/* Close button click */}
    {children}
  </div>
</div>
```

---

## Best Practices

### 1. Use TypeScript for Event Types
```tsx
// ✅ Good - Specific event types
const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => { };
const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => { };
const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => { };

// ❌ Bad - Generic event type
const handleEvent = (event: any) => { };
```

### 2. Always Prevent Default When Needed
```tsx
// ✅ Good - Prevent form submission
const handleSubmit = (event: React.FormEvent) => {
  event.preventDefault();
  // Handle form logic
};

// ✅ Good - Prevent default key behavior
const handleKeyDown = (event: React.KeyboardEvent) => {
  if (event.key === 'ArrowUp') {
    event.preventDefault(); // Prevent scrolling
    // Custom logic
  }
};
```

### 3. Use Controlled Components for Forms
```tsx
// ✅ Good - Controlled component
const [value, setValue] = useState('');

<input 
  value={value} 
  onChange={(e) => setValue(e.target.value)} 
/>

// ❌ Bad - Uncontrolled component
<input onChange={(e) => console.log(e.target.value)} />
```

### 4. Handle Edge Cases
```tsx
// ✅ Good - Check for disabled state
const handleClick = (event: React.MouseEvent) => {
  if (disabled) {
    event.preventDefault();
    return;
  }
  // Handle click
};

// ✅ Good - Validate before processing
const handleSubmit = (event: React.FormEvent) => {
  event.preventDefault();
  
  if (!isFormValid()) {
    return;
  }
  
  // Process form
};
```

### 5. Use Descriptive Event Handler Names
```tsx
// ✅ Good - Descriptive names
const handleLoginSubmit = () => { };
const handlePasswordChange = () => { };
const handleModalClose = () => { };

// ❌ Bad - Generic names
const handleClick = () => { };
const handleChange = () => { };
```

---

## Testing Your Knowledge

Try these exercises with your current code:

1. **Mouse Events**: Add a double-click handler to one of your buttons
2. **Keyboard Events**: Add support for Enter key to submit forms
3. **Form Events**: Add validation that triggers on both `onChange` and `onBlur`
4. **Combination**: Create a search input that responds to typing (onChange) and Enter key (onKeyDown)

---

## Common Patterns in Your Code

### Pattern 1: Event + State Update
```tsx
const handleIncrement = () => {
  const newCount = count + 1;
  setCount(newCount);           // Update local state
  onCountChange?.(newCount);    // Notify parent component
};
```

### Pattern 2: Event + Validation
```tsx
const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
  const newValue = event.target.value;
  setValue(newValue);                    // Update value
  
  const errors = validateInput(newValue); // Validate
  setErrors(errors);                     // Update errors
  
  onValueChange?.(newValue, errors.length === 0); // Notify parent
};
```

### Pattern 3: Conditional Event Handling
```tsx
const handleClick = (event: React.MouseEvent) => {
  if (disabled) {
    event.preventDefault();
    return;
  }
  // Handle normal click
};
```

These patterns are the foundation of interactive React applications!
