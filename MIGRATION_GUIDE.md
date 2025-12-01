# Migration Guide

## Migrating from the Original Component

If you're migrating from the original embedded component to this npm package, here's what you need to know:

### Before (Original Usage)

```jsx
import JsonLogicBuilder from '@JsonLogicBuilder';

<JsonLogicBuilder
    fields={fields}
    data={{}}
    rule={currentCondition || {}}
    storeKeys={SAMPLE_STORE_KEYS}
    onChange={setRule}
/>
```

### After (Package Usage)

```jsx
import { JsonLogicBuilder } from '@crego/json-logic-builder';
import '@crego/json-logic-builder/styles.css';

<JsonLogicBuilder
    fields={fields}
    rule={currentCondition || {}}
    storeKeys={SAMPLE_STORE_KEYS}
    onChange={setRule}
/>
```

## Breaking Changes

### 1. Import Path
- **Before**: `import JsonLogicBuilder from '@JsonLogicBuilder'`
- **After**: `import { JsonLogicBuilder } from '@crego/json-logic-builder'`

Note: Named export instead of default export

### 2. Styles Import
You must now explicitly import the styles:

```jsx
import '@crego/json-logic-builder/styles.css';
```

### 3. Removed Props
- `data` prop has been removed (it was not being used in the component)

### 4. Tailwind Configuration
Add the package to your Tailwind content array:

```js
// tailwind.config.js
export default {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./node_modules/@crego/json-logic-builder/dist/**/*.{js,mjs}",
  ],
  // ...
}
```

## Step-by-Step Migration

### 1. Install the Package

```bash
pnpm add @crego/json-logic-builder
```

### 2. Update Imports

Replace all instances of:
```jsx
import JsonLogicBuilder from '@JsonLogicBuilder';
```

With:
```jsx
import { JsonLogicBuilder } from '@crego/json-logic-builder';
import '@crego/json-logic-builder/styles.css'; // Add this
```

### 3. Update Component Usage

Remove the `data` prop if you were using it:

```jsx
// Before
<JsonLogicBuilder
    fields={fields}
    data={{}}  // Remove this line
    rule={currentCondition || {}}
    storeKeys={SAMPLE_STORE_KEYS}
    onChange={setRule}
/>

// After
<JsonLogicBuilder
    fields={fields}
    rule={currentCondition || {}}
    storeKeys={SAMPLE_STORE_KEYS}
    onChange={setRule}
/>
```

### 4. Remove Old Code

After migration, you can safely remove:
- The original `JsonLogicBuilder` directory from your project
- Any import aliases pointing to `@JsonLogicBuilder` in your build config

### 5. Test Thoroughly

Test all rule building functionality:
- [ ] Creating simple rules
- [ ] Creating nested groups
- [ ] Creating IF/THEN/ELSE conditions
- [ ] Drag and drop reordering
- [ ] Read-only mode (if used)
- [ ] Field selection with groups
- [ ] All comparison operators

## API Compatibility

The component API is 100% backward compatible (minus the removed `data` prop):

| Prop | Type | Required | Notes |
|------|------|----------|-------|
| `fields` | `Array<Field>` | No | ✅ Same |
| `storeKeys` | `Array<Field>` | No | ✅ Same |
| `rule` | `object` | No | ✅ Same |
| `onChange` | `function` | Yes | ✅ Same |
| `readOnly` | `boolean` | No | ✅ Same |
| `data` | `object` | - | ❌ Removed (not used) |

## Example: Full Migration

**Before** (`src/modules/Admin/Policies/PolicyDetails/index.jsx`):
```jsx
import JsonLogicBuilder from '@JsonLogicBuilder';

function PolicyDetails() {
  const [rule, setRule] = useState({});
  
  return (
    <div>
      <JsonLogicBuilder
        fields={fields}
        data={{}}
        rule={rule}
        storeKeys={SAMPLE_STORE_KEYS}
        onChange={setRule}
      />
    </div>
  );
}
```

**After**:
```jsx
import { JsonLogicBuilder } from '@crego/json-logic-builder';
import '@crego/json-logic-builder/styles.css';

function PolicyDetails() {
  const [rule, setRule] = useState({});
  
  return (
    <div>
      <JsonLogicBuilder
        fields={fields}
        rule={rule}
        storeKeys={SAMPLE_STORE_KEYS}
        onChange={setRule}
      />
    </div>
  );
}
```

## Troubleshooting

### Styles not appearing
Make sure you've imported the styles CSS file at the top of your component or in your main App file.

### TypeScript errors
The package is JavaScript-based. If you encounter type errors, you may need to add type declarations or use `// @ts-ignore`.

### Build errors
Ensure the package is included in your Tailwind config's `content` array.

## Rollback Plan

If you need to rollback:

1. Uninstall the package:
   ```bash
   pnpm remove @crego/json-logic-builder
   ```

2. Restore the original component code from your git history
3. Revert your import statements

## Need Help?

If you encounter any issues during migration:

1. Check the [README.md](./README.md) for full documentation
2. Review [EXAMPLE.md](./EXAMPLE.md) for usage patterns
3. Refer to [INSTALL.md](./INSTALL.md) for setup instructions
