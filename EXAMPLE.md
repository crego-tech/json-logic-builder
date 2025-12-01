# Usage Examples

## Basic Example

```jsx
import { useState } from 'react';
import { JsonLogicBuilder } from '@crego/json-logic-builder';
import '@crego/json-logic-builder/styles.css';

function App() {
  const [rule, setRule] = useState({});

  const fields = [
    { value: 'age', label: 'Age', group: 'user' },
    { value: 'name', label: 'Name', group: 'user' },
    { value: 'status', label: 'Account Status', group: 'account' },
    { value: 'balance', label: 'Account Balance', group: 'account' },
  ];

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Rule Builder</h1>

      <JsonLogicBuilder
        fields={fields}
        rule={rule}
        onChange={setRule}
      />

      <div className="mt-8">
        <h2 className="text-xl font-semibold mb-2">Generated Rule:</h2>
        <pre className="bg-gray-100 p-4 rounded">
          {JSON.stringify(rule, null, 2)}
        </pre>
      </div>
    </div>
  );
}

export default App;
```

## With Store Keys (Predefined Variables)

```jsx
import { useState } from 'react';
import { JsonLogicBuilder } from '@crego/json-logic-builder';
import '@crego/json-logic-builder/styles.css';

function PolicyBuilder() {
  const [rule, setRule] = useState({});

  const fields = [
    { value: 'requestAmount', label: 'Request Amount', group: 'request' },
    { value: 'requestType', label: 'Request Type', group: 'request' },
    { value: 'department', label: 'Department', group: 'user' },
  ];

  const storeKeys = [
    { value: 'currentDate', label: 'Current Date', group: 'system' },
    { value: 'userRole', label: 'User Role', group: 'system' },
    { value: 'maxLimit', label: 'Maximum Limit', group: 'system' },
  ];

  return (
    <JsonLogicBuilder
      fields={fields}
      storeKeys={storeKeys}
      rule={rule}
      onChange={setRule}
    />
  );
}
```

## Read-Only Mode

```jsx
import { JsonLogicBuilder } from '@crego/json-logic-builder';
import '@crego/json-logic-builder/styles.css';

function RuleViewer({ existingRule }) {
  const fields = [
    { value: 'age', label: 'Age' },
    { value: 'status', label: 'Status' },
  ];

  return (
    <JsonLogicBuilder
      fields={fields}
      rule={existingRule}
      onChange={() => {}} // No-op in read-only mode
      readOnly={true}
    />
  );
}
```

## Example Output

When you create a rule like "Age >= 18 AND Status = Active", the output will be:

```json
{
  "and": [
    { ">=": [{ "var": "age" }, 18] },
    { "==": [{ "var": "status" }, "active"] }
  ]
}
```

With conditional logic (IF/THEN/ELSE):

```json
{
  "if": [
    { ">=": [{ "var": "balance" }, 1000] },
    "APPROVED",
    "DECLINED"
  ]
}
```

## Executing JsonLogic Rules

You can execute these rules using the `json-logic-js` library:

```jsx
import jsonLogic from 'json-logic-js';

const rule = {
  "and": [
    { ">=": [{ "var": "age" }, 18] },
    { "==": [{ "var": "status" }, "active"] }
  ]
};

const data = {
  age: 25,
  status: "active"
};

const result = jsonLogic.apply(rule, data); // true
```

## Tailwind CSS Configuration

Make sure you have Tailwind CSS configured in your project. Add the package to your Tailwind content:

```js
// tailwind.config.js
export default {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./node_modules/@crego/json-logic-builder/dist/**/*.{js,mjs}",
  ],
  // ... rest of config
}
```

## Custom Styling

Override CSS variables to customize colors:

```css
:root {
  --primary: 220 70% 50%;
  --primary-foreground: 0 0% 100%;
  --destructive: 0 70% 50%;
  --border: 220 13% 91%;
  /* ... other variables */
}
```
