# 🎓 JSX, Components & Props Learning Lab

A comprehensive TypeScript React project designed to teach you about different data types you can pass as props in JSX.

## 🎯 What You'll Learn

This interactive learning project demonstrates all the different types of data you can pass between React components using TypeScript:

### 📝 Basic Types
- **String Props**: Text data, optional strings with default values
- **Number Props**: Integers, floats, calculations, optional numbers
- **Boolean Props**: True/false values, conditional rendering based on booleans

### 🏗️ Complex Types
- **Array Props**: Arrays of primitives, mapping over arrays in JSX
- **Object Props**: Complex objects, nested properties, optional object props
- **Array of Objects**: Product lists, user arrays, complex data structures

### ⚡ Advanced Types
- **Function Props**: Event handlers, callback functions, validation functions
- **Union Types**: Limited string options, button variants, status enums
- **Conditional Props**: Props that depend on other props, optional complex objects

### 🎭 Special Props
- **Children Props**: Passing JSX content as children
- **Render Props**: Functions that return JSX
- **React Node Props**: Any renderable React content
- **Component Props**: Passing components as props for dynamic rendering

## 🚀 Getting Started

1. **Install dependencies:**
   ```bash
   npm install
   # or
   pnpm install
   ```

2. **Start the development server:**
   ```bash
   npm run dev
   # or
   pnpm dev
   ```

3. **Open your browser** and navigate to the displayed URL (usually `http://localhost:5173`)

## 📋 Project Structure

```
src/
├── components/
│   ├── BasicTypeComponents.tsx      # String, Number, Boolean props
│   ├── ComplexTypeComponents.tsx    # Arrays, Objects, Complex data
│   ├── AdvancedTypeComponents.tsx   # Functions, Unions, Conditionals
│   └── SpecialPropsComponents.tsx   # Children, Render props, React Nodes
├── types/
│   └── index.ts                     # TypeScript type definitions
├── data/
│   └── sampleData.ts                # Sample data for demonstrations
├── styles/
│   └── LearningProject.css          # Styling for the learning project
└── App.tsx                          # Main application component
```

## 🎨 Interactive Features

- **Navigation**: Switch between different type categories
- **Live Examples**: See props in action with real data
- **Event Handling**: Test function props with interactive elements
- **Visual Feedback**: Beautiful UI that responds to different prop types
- **TypeScript**: Full type safety with helpful type definitions

## 📚 Key Learning Points

### Type Safety
Every component demonstrates proper TypeScript typing:
```typescript
interface ComponentProps {
  requiredProp: string;
  optionalProp?: number;
  unionProp: 'option1' | 'option2' | 'option3';
}
```

### Props Patterns
- **Required vs Optional**: When to use `?` for optional props
- **Default Values**: Setting fallback values for optional props
- **Type Unions**: Restricting props to specific values
- **Generic Types**: Using predefined interfaces

### Best Practices
- Clear prop naming conventions
- Proper TypeScript interfaces
- Component composition patterns
- Event handling with typed functions

## 🔄 Interactive Elements

1. **Form Inputs**: Test function props with real user interaction
2. **Theme Switching**: See conditional props in action
3. **Dynamic Content**: Watch render props create content on demand
4. **Component Composition**: See how components can be passed as props

## 💡 Tips for Learning

1. **Start with Basic Types**: Understand strings, numbers, and booleans first
2. **Experiment**: Modify the props in App.tsx to see how components react
3. **Read the TypeScript**: Pay attention to the interface definitions
4. **Check the Console**: Look for any TypeScript errors and understand them
5. **Try Your Own**: Create new components using the patterns you see

## 🛠️ Extending the Project

Try these exercises to deepen your understanding:

1. **Add New Components**: Create components that demonstrate other prop patterns
2. **Add More Types**: Experiment with Maps, Sets, or Date objects as props
3. **Add Validation**: Create custom prop validation functions
4. **Add State**: Show how props and state work together
5. **Add Contexts**: Demonstrate prop drilling vs context usage

## 📖 Learning Resources

- [React TypeScript Cheatsheet](https://react-typescript-cheatsheet.netlify.app/)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [React Documentation](https://react.dev/)

## 🤝 Contributing

This is a learning project! Feel free to:
- Add more examples
- Improve the TypeScript types
- Enhance the UI/UX
- Add documentation
- Fix bugs

Happy Learning! 🎉
