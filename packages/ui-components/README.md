# @transcodes/ui-components

A modern web component library built with [Lit 3.x](https://lit.dev/). Features a comprehensive set of UI primitives, complex widgets, and reusable Reactive Controllers for building beautiful, accessible interfaces.

[![npm version](https://img.shields.io/npm/v/@transcodes/ui-components.svg)](https://www.npmjs.com/package/@transcodes/ui-components)
[![license](https://img.shields.io/npm/l/@transcodes/ui-components.svg)](https://github.com/transcodings/transcodes-ui/blob/main/packages/ui-components/LICENSE)

## Features

- **Web Components** - Framework-agnostic, works with React, Vue, Angular, or vanilla JS
- **Lit 3.x Powered** - Fast, lightweight, and reactive
- **Design Token Integration** - Built on [@transcodes/design-tokens](https://www.npmjs.com/package/@transcodes/design-tokens)
- **Reactive Controllers** - Reusable logic for loading states, forms, animations, and more
- **TypeScript First** - Full type definitions included
- **Storybook Documentation** - Interactive component explorer

## Installation

```bash
npm install @transcodes/ui-components lit
# or
yarn add @transcodes/ui-components lit
# or
pnpm add @transcodes/ui-components lit
# or
bun add @transcodes/ui-components lit
```

> **Note:** `lit` is a peer dependency and must be installed separately.

## Quick Start

### 1. Import and register components

```typescript
// Import all components (registers custom elements automatically)
import '@transcodes/ui-components';

// Import styles
import '@transcodes/ui-components/styles.css';
```

### 2. Use in your HTML

```html
<tc-button variant="primary">Click me</tc-button>

<tc-input
  type="email"
  placeholder="Enter your email"
  required
></tc-input>

<tc-callout variant="info">
  This is an informational message.
</tc-callout>
```

### 3. Handle events

```javascript
const button = document.querySelector('tc-button');
button.addEventListener('tc-click', (e) => {
  console.log('Button clicked!', e.detail);
});

const input = document.querySelector('tc-input');
input.addEventListener('tc-change', (e) => {
  console.log('Input value:', e.detail.value);
});
```

## Components

### Primitives

Core UI building blocks with consistent styling and behavior.

| Component | Description | Key Props |
|-----------|-------------|-----------|
| `<tc-button>` | Interactive button | `variant`, `size`, `disabled`, `loading` |
| `<tc-input>` | Text input field | `type`, `placeholder`, `required`, `error` |
| `<tc-otp-input>` | OTP/PIN code input | `length`, `masked` |
| `<tc-text>` | Typography component | `variant`, `weight`, `color` |
| `<tc-container>` | Layout container | `maxWidth`, `padding` |
| `<tc-box>` | Flexible box wrapper | `padding`, `gap` |
| `<tc-section>` | Page section | `padding` |
| `<tc-divider>` | Visual separator | `orientation` |
| `<tc-callout>` | Alert/info box | `variant` (info, warning, error, success) |
| `<tc-chip>` | Tag/badge | `variant`, `removable` |
| `<tc-icon>` | Icon display | `name`, `size` |
| `<tc-spinner>` | Loading indicator | `size` |
| `<tc-toast>` | Toast notification | `variant`, `duration` |

### Widgets

Complex components composed of primitives.

| Component | Description |
|-----------|-------------|
| `<tc-notification-modal>` | Modal dialog for notifications |
| `<tc-offline-modal>` | Offline state indicator modal |
| `<tc-floating-action-button>` | FAB with optional menu |

### Controllers

Reusable logic that can be attached to any Lit component.

```typescript
import { LoadingController, FormController } from '@transcodes/ui-components';

class MyComponent extends LitElement {
  private loading = new LoadingController(this);
  private form = new FormController(this);

  async handleSubmit() {
    this.loading.start();
    try {
      await submitData();
    } finally {
      this.loading.stop();
    }
  }
}
```

| Controller | Purpose |
|------------|---------|
| `LoadingController` | Manage loading states |
| `FormController` | Form validation and submission |
| `AnimationController` | Coordinate animations |
| `MatchMediaController` | Respond to media queries |
| `StorageController` | Persist data to localStorage/sessionStorage |
| `MessageBusController` | Cross-component communication |

## Styling

Components use CSS custom properties from `@transcodes/design-tokens`. You can customize the look by overriding these variables:

```css
:root {
  /* Override brand colors */
  --accent-primary: #your-brand-color;

  /* Override spacing */
  --space-md: 16px;
}
```

### Custom styles per component

All components accept an `sx` prop for inline style overrides:

```html
<tc-button
  variant="primary"
  .sx=${{ padding: '1rem 2rem', fontSize: '1.25rem' }}
>
  Large Button
</tc-button>
```

## Framework Integration

### React

```tsx
import '@transcodes/ui-components';

function App() {
  const handleClick = (e: CustomEvent) => {
    console.log('Clicked!');
  };

  return (
    <tc-button
      variant="primary"
      onTc-click={handleClick}
    >
      Click me
    </tc-button>
  );
}
```

### Vue

```vue
<template>
  <tc-button variant="primary" @tc-click="handleClick">
    Click me
  </tc-button>
</template>

<script setup>
import '@transcodes/ui-components';

const handleClick = () => {
  console.log('Clicked!');
};
</script>
```

## Browser Support

Supports all modern browsers with native Custom Elements v1 support:

- Chrome 67+
- Firefox 63+
- Safari 10.1+
- Edge 79+

## Development

```bash
# Install dependencies
bun install

# Start Storybook dev server
bun run dev

# Build for production
bun run build

# Type check
bun run type-check
```

## Related Packages

- [@transcodes/design-tokens](https://www.npmjs.com/package/@transcodes/design-tokens) - Design tokens used by this library

## License

[MIT](./LICENSE)
