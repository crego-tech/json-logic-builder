# @crego/json-logic-builder

A visual builder for creating and editing JsonLogic rules with drag-and-drop support. Built with React, Radix UI, and dnd-kit.

## Features

- 🎨 Visual rule builder with intuitive UI
- 🔄 Drag-and-drop support for reordering rules
- 🎯 Support for complex nested conditions
- 🌳 IF/THEN/ELSE conditional logic
- 🔢 Multiple comparison operators (=, !=, >, >=, <, <=, in)
- 🔗 Logical combinators (AND, OR, NOT)
- 📱 Responsive design
- 🎭 Read-only mode support
- 🎨 Customizable with Tailwind CSS

## Installation

```bash
pnpm add @crego/json-logic-builder
```

### Peer Dependencies

Make sure you have the following peer dependencies installed:

```bash
pnpm add react react-dom
```

## Usage

### Basic Example

```jsx
import { JsonLogicBuilder } from '@crego/json-logic-builder';
import '@crego/json-logic-builder/styles.css';

function App() {
  const [rule, setRule] = useState({});

  const fields = [
    { value: 'age', label: 'Age', group: 'user' },
    { value: 'status', label: 'Status', group: 'account' },
    { value: 'balance', label: 'Balance', group: 'account' },
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

### With Store Keys

You can also provide store keys which are predefined variables that can be used in rules:

```jsx
const storeKeys = [
  { value: 'currentDate', label: 'Current Date', group: 'system' },
  { value: 'userRole', label: 'User Role', group: 'system' },
];

<JsonLogicBuilder
  fields={fields}
  storeKeys={storeKeys}
  rule={rule}
  onChange={setRule}
/>
```

### Read-Only Mode

```jsx
<JsonLogicBuilder
  fields={fields}
  rule={rule}
  onChange={setRule}
  readOnly={true}
/>
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `fields` | `Array<Field>` | `[]` | Array of field definitions that can be used in rules |
| `storeKeys` | `Array<Field>` | `[]` | Array of predefined store keys/variables |
| `rule` | `object` | `{}` | The JsonLogic rule object |
| `onChange` | `function` | - | Callback function called when the rule changes |
| `readOnly` | `boolean` | `false` | Whether the builder is in read-only mode |

### Field Type

```typescript
type Field = {
  value: string;      // Unique identifier for the field
  label: string;      // Display label for the field
  group?: string;     // Optional group name for organizing fields
}
```

## JsonLogic Output

The component outputs standard [JsonLogic](https://jsonlogic.com/) format. Example:

```json
{
  "and": [
    { ">=": [{ "var": "age" }, 18] },
    { "==": [{ "var": "status" }, "active"] }
  ]
}
```

### Conditional Logic (IF/THEN/ELSE)

```json
{
  "if": [
    { ">=": [{ "var": "balance" }, 1000] },
    "APPROVED",
    "DECLINED"
  ]
}
```

## Styling

The package includes default styles using Tailwind CSS. Import the styles in your app:

```jsx
import '@crego/json-logic-builder/styles.css';
```

### Custom Styling

You can customize the appearance by overriding CSS variables:

```css
:root {
  --background: 0 0% 100%;
  --foreground: 222.2 84% 4.9%;
  --primary: 222.2 47.4% 11.2%;
  --primary-foreground: 210 40% 98%;
  /* ... other variables */
}
```

## Requirements

- React 18+ or React 19+
- Tailwind CSS configured in your project

## License

MIT

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.
