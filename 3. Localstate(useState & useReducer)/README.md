# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## React Tools

install

- [React Developer Tools](https://chromewebstore.google.com/detail/react-developer-tools/fmkadmapgofadopljbjfkapdkoienihi?hl=en)
- [React Scan Toggle](https://chromewebstore.google.com/detail/react-scan-toggle/jenlhondkkckfmehobgliecmdngfdkbo)

## Setting-up React Compiler

**React Compiler** is a new compiler that we’ve open sourced to get feedback from the community. It is a build-time only tool that automatically optimizes your React app
The compiler is currently released as `rc`, and is available to try out on React 17+ apps and libraries. To install the RC:

```bash
pnpm add -D babel-plugin-react-compiler@rc
```

### Installing eslint-plugin-react-hooks

React Compiler also powers an ESLint plugin. You can try it out by installing eslint-plugin-react-hooks@^6.0.0-rc.1.

```bash
pnpm add -D eslint-plugin-react-hooks@^6.0.0-rc.1
```

### Configure ESLint (Optional)

To enable the React Compiler rule, add `'react-hooks/react-compiler': 'error'` to your ESLint configuration

```javascript
rules: {
      ...reactHooks.configs.recommended.rules,
      'react-refresh/only-export-components': [
        'warn',
        { allowConstantExport: true },
      ],
      'react-hooks/react-compiler': 'error',
      'react-hooks/rules-of-hooks': 'error',
    },
```

### Update `vite.confg.ts`

```typescript
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react({
      babel: {
        plugins: [['babel-plugin-react-compiler', { target: '19' }]],
      }
    })],
})

```

### What does the compiler do?

In order to optimize applications, React Compiler automatically memoizes your code. You may be familiar today with memoization through APIs such as `useMemo`, `useCallback`, and `React.memo`. With these APIs you can tell React that certain parts of your application don’t need to recompute if their inputs haven’t changed, reducing work on updates. While powerful, it’s easy to forget to apply memoization or apply them incorrectly. This can lead to inefficient updates as React has to check parts of your UI that don’t have any *meaningful* changes.

## Using React Compiler with React 17 or 18

React Compiler works best with React 19 RC. If you are unable to upgrade, you can install the extra `react-compiler-runtime` package which will allow the compiled code to run on versions prior to 19. However, note that the minimum supported version is 17.

```bash
npm install react-compiler-runtime@rc
```
