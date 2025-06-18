# Button Component Documentation

A highly customizable and reusable Button component built with React, TypeScript, and Tailwind CSS.

## Features

- 🎨 **Multiple Variants**: Primary, Secondary, Outline, Ghost, and Danger styles
- 📏 **Different Sizes**: Small, Medium, Large, and Extra Large
- 🔄 **Loading State**: Built-in loading spinner
- ♿ **Accessibility**: Proper focus management and keyboard navigation
- 🎯 **Full Width Option**: Stretch button to full container width
- 🔘 **Rounded Corners**: Customizable border radius
- 🚫 **Disabled State**: Proper disabled styling and behavior
- 🎨 **Custom Styling**: Easy to extend with additional CSS classes

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `children` | `ReactNode` | - | Button content (required) |
| `variant` | `'primary' \| 'secondary' \| 'outline' \| 'ghost' \| 'danger'` | `'primary'` | Button style variant |
| `size` | `'sm' \| 'md' \| 'lg' \| 'xl'` | `'md'` | Button size |
| `disabled` | `boolean` | `false` | Whether the button is disabled |
| `loading` | `boolean` | `false` | Whether to show loading spinner |
| `fullWidth` | `boolean` | `false` | Whether button should take full width |
| `rounded` | `'none' \| 'sm' \| 'md' \| 'lg' \| 'full'` | `'md'` | Border radius style |
| `onClick` | `() => void` | - | Click handler function |
| `type` | `'button' \| 'submit' \| 'reset'` | `'button'` | HTML button type |
| `className` | `string` | `''` | Additional CSS classes |

## Usage Examples

### Basic Usage

```tsx
import Button from './components/Button'

function MyComponent() {
  return (
    <Button onClick={() => console.log('Clicked!')}>
      Click Me
    </Button>
  )
}
```

### Different Variants

```tsx
<Button variant="primary">Primary</Button>
<Button variant="secondary">Secondary</Button>
<Button variant="outline">Outline</Button>
<Button variant="ghost">Ghost</Button>
<Button variant="danger">Danger</Button>
```

### Different Sizes

```tsx
<Button size="sm">Small</Button>
<Button size="md">Medium</Button>
<Button size="lg">Large</Button>
<Button size="xl">Extra Large</Button>
```

### Loading State

```tsx
<Button loading>Loading...</Button>
```

### Disabled State

```tsx
<Button disabled>Disabled Button</Button>
```

### Full Width

```tsx
<Button fullWidth>Full Width Button</Button>
```

### Custom Styling

```tsx
<Button 
  variant="primary" 
  className="bg-gradient-to-r from-purple-500 to-pink-500"
>
  Custom Gradient
</Button>
```

### Form Usage

```tsx
<form onSubmit={handleSubmit}>
  <Button type="submit" variant="primary">
    Submit Form
  </Button>
  <Button type="reset" variant="outline">
    Reset Form
  </Button>
</form>
```

## Styling Customization

The Button component is built with Tailwind CSS and follows a systematic approach to styling:

### Base Styles
- Consistent focus states with ring outline
- Smooth transitions for hover/active states
- Proper disabled state handling
- Flexbox for content alignment

### Variant Styles
- **Primary**: Blue background with white text
- **Secondary**: Gray background with white text
- **Outline**: White background with gray border
- **Ghost**: Transparent background with hover effect
- **Danger**: Red background for destructive actions

### Extending Styles
You can easily extend the button styles by:

1. **Adding custom CSS classes**:
```tsx
<Button className="shadow-xl transform hover:scale-105">
  Hover Effect
</Button>
```

2. **Creating new variants** (modify the component):
```tsx
// Add to variantStyles object
success: `
  bg-green-600 text-white hover:bg-green-700 active:bg-green-800
  focus:ring-green-500 shadow-sm hover:shadow-md
`
```

## Accessibility Features

- Proper focus management with visible focus rings
- Keyboard navigation support
- Disabled state prevents interaction
- Loading state maintains button structure
- Semantic HTML button element

## Browser Support

This component works in all modern browsers that support:
- CSS Grid and Flexbox
- CSS Custom Properties
- ES6+ JavaScript features

## Contributing

When contributing to this component:

1. Maintain TypeScript types
2. Follow Tailwind CSS conventions
3. Ensure accessibility standards
4. Add appropriate examples
5. Update documentation

## License

This component is part of the React.js learning curriculum and is available for educational use.
