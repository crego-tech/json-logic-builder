# Json Logic Builder - Project Summary

## Overview

**Package Name:** `@crego/json-logic-builder`
**Version:** 1.0.0
**Location:** `/Users/rajankur/Documents/Projects/c/json-logic-builder`

This is a standalone, installable npm package that provides a visual builder for creating and editing JsonLogic rules with drag-and-drop support.

## What Was Created

### Package Structure
```
json-logic-builder/
├── src/
│   ├── components/          # React components
│   │   ├── ui/             # shadcn/ui components (Badge, Button, Input, etc.)
│   │   ├── BranchEditor.jsx
│   │   ├── BuilderCanvas.jsx
│   │   ├── CompareValueInput.jsx
│   │   ├── DropZone.jsx
│   │   ├── FieldSelect.jsx
│   │   ├── GroupEditor.jsx
│   │   ├── IfEditor.jsx
│   │   ├── ResultValueEditor.jsx
│   │   ├── RuleEditor.jsx
│   │   └── SortableNode.jsx
│   ├── hooks/
│   │   └── useJsonLogicBuilder.js  # Core logic for rule building
│   ├── lib/
│   │   └── utils.js        # Utility functions (cn helper)
│   ├── constants.js        # Constants and operators
│   ├── context.jsx         # React context for builder state
│   ├── JsonLogicBuilder.jsx # Main component
│   ├── index.jsx           # Package entry point
│   └── styles.css          # Tailwind CSS styles
├── dist/                   # Built files (generated)
│   ├── index.js            # CommonJS build
│   ├── index.mjs           # ES Module build
│   └── source maps
├── package.json
├── tsup.config.js         # Build configuration
├── tailwind.config.js     # Tailwind configuration
├── README.md              # Full documentation
├── EXAMPLE.md             # Usage examples
├── INSTALL.md             # Installation guide
├── CHANGELOG.md           # Version history
└── LICENSE                # MIT License
```

## Key Features

✅ **Visual Rule Builder** - Intuitive UI for creating JsonLogic rules
✅ **Drag-and-Drop** - Reorder rules and groups with drag-and-drop
✅ **Nested Conditions** - Support for complex nested rule structures
✅ **IF/THEN/ELSE Logic** - Conditional branching support
✅ **Multiple Operators** - =, !=, >, >=, <, <=, in
✅ **Logical Combinators** - AND, OR, NOT
✅ **Read-Only Mode** - View-only mode for displaying rules
✅ **Tailwind Styled** - Beautiful, customizable UI with Tailwind CSS
✅ **Tree-Shakeable** - ES Module and CommonJS builds
✅ **TypeScript Compatible** - Works with TypeScript projects

## Usage Example

```jsx
import { JsonLogicBuilder } from '@crego/json-logic-builder';
import '@crego/json-logic-builder/styles.css';

function App() {
  const [rule, setRule] = useState({});

  const fields = [
    { value: 'age', label: 'Age', group: 'user' },
    { value: 'status', label: 'Status', group: 'account' },
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

## Dependencies

### Runtime Dependencies
- `@dnd-kit/core`, `@dnd-kit/sortable`, `@dnd-kit/utilities` - Drag and drop
- `@radix-ui/*` - UI primitives (label, popover, select)
- `lucide-react` - Icons
- `uuid` - ID generation
- `clsx`, `tailwind-merge`, `class-variance-authority` - Styling utilities
- `cmdk` - Command menu component

### Peer Dependencies
- `react` ^18.0.0 || ^19.0.0
- `react-dom` ^18.0.0 || ^19.0.0

### Dev Dependencies
- `tsup` - Build tool
- `typescript` - Type checking (for build)
- `tailwindcss`, `postcss`, `autoprefixer` - Styling

## Build

The package has been successfully built and is ready for:

1. **Local Testing**: Use `pnpm link` to test locally
2. **Publishing**: Use `pnpm publish` to publish to npm
3. **Integration**: Install in any React project with `pnpm add @crego/json-logic-builder`

### Build Command
```bash
pnpm build
```

Output:
- `dist/index.js` - CommonJS build (65.80 KB)
- `dist/index.mjs` - ES Module build (62.83 KB)
- Source maps included

## Next Steps

### For Publishing to npm:

1. **Update package.json**:
   - Set the correct package name (if not using `@crego` scope)
   - Add author information
   - Add repository URL
   - Review and update version number

2. **Login to npm**:
   ```bash
   npm login
   ```

3. **Publish**:
   ```bash
   pnpm publish
   ```

### For Local Testing:

1. **Link the package**:
   ```bash
   cd /Users/rajankur/Documents/Projects/c/json-logic-builder
   pnpm link --global
   ```

2. **Use in another project**:
   ```bash
   cd /path/to/your/project
   pnpm link --global @crego/json-logic-builder
   ```

### For Private Registry:

Update package.json with your registry:
```json
{
  "publishConfig": {
    "registry": "https://your-registry-url.com/"
  }
}
```

## Source Information

This package was extracted from:
- **Original Location**: `/Users/rajankur/.claude-worktrees/crego-flow-web/musing-swanson/src/modules/Admin/Policies/PolicyDetails/JsonLogicBuilder`
- **Original Project**: crego-flow-web
- **Extraction Date**: December 1, 2025

## License

MIT License - See LICENSE file for details

## Documentation Files

- **README.md** - Main documentation with API reference
- **INSTALL.md** - Step-by-step installation guide
- **EXAMPLE.md** - Comprehensive usage examples
- **CHANGELOG.md** - Version history and changes

---

**Status**: ✅ Ready for use and publication
