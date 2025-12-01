# Installation Guide

## Prerequisites

- Node.js 18+ or Node.js 20+
- React 18+ or React 19+
- Tailwind CSS configured in your project

## Step 1: Install the Package

Using pnpm:
```bash
pnpm add @crego/json-logic-builder
```

Using npm:
```bash
npm install @crego/json-logic-builder
```

Using yarn:
```bash
yarn add @crego/json-logic-builder
```

## Step 2: Install Peer Dependencies

If not already installed:

```bash
pnpm add react react-dom
```

## Step 3: Import Styles

Add the styles to your main application file (e.g., `App.jsx`, `main.jsx`, or `_app.jsx`):

```jsx
import '@crego/json-logic-builder/styles.css';
```

## Step 4: Configure Tailwind CSS

If you haven't already, install and configure Tailwind CSS in your project:

```bash
pnpm add -D tailwindcss postcss autoprefixer
pnpx tailwindcss init -p
```

Update your `tailwind.config.js`:

```js
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./node_modules/@crego/json-logic-builder/dist/**/*.{js,mjs}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
```

## Step 5: Use in Your Component

```jsx
import { useState } from 'react';
import { JsonLogicBuilder } from '@crego/json-logic-builder';

function App() {
  const [rule, setRule] = useState({});

  const fields = [
    { value: 'age', label: 'Age' },
    { value: 'status', label: 'Status' },
  ];

  return (
    <JsonLogicBuilder
      fields={fields}
      rule={rule}
      onChange={setRule}
    />
  );
}
```

## Troubleshooting

### Styles not loading
- Make sure you've imported `@crego/json-logic-builder/styles.css`
- Verify Tailwind CSS is properly configured
- Check that the package is included in Tailwind's content array

### TypeScript errors
- The package is written in JavaScript but should work with TypeScript projects
- If you encounter import errors, you may need to add type declarations

### Build errors
- Ensure all peer dependencies are installed
- Check that your bundler (Vite, Webpack, etc.) supports ES modules
- Verify React version compatibility (18+ or 19+)

## Next Steps

Check out:
- [README.md](./README.md) for full documentation
- [EXAMPLE.md](./EXAMPLE.md) for more usage examples
- [JsonLogic official docs](https://jsonlogic.com/) for rule execution
