# @transcodes/ui-components

A modern web component library built with [Lit 3.x](https://lit.dev/). Features a comprehensive set of UI primitives, complex widgets, full-screen components, and reusable Reactive Controllers.

[![npm version](https://img.shields.io/npm/v/@transcodes/ui-components.svg)](https://www.npmjs.com/package/@transcodes/ui-components)
[![license](https://img.shields.io/npm/l/@transcodes/ui-components.svg)](https://github.com/transcodings/transcodes-ui/blob/main/packages/ui-components/LICENSE)

## Features

- **Web Components** - Framework-agnostic, works with React, Vue, Angular, or vanilla JS
- **Lit 3.x Powered** - Fast, lightweight, and reactive
- **Design Token Integration** - Built on [@transcodes/design-tokens](https://www.npmjs.com/package/@transcodes/design-tokens)
- **Reactive Controllers** - Reusable logic for forms, animations, storage, and more
- **TypeScript First** - Full type definitions included
- **Storybook Documentation** - Interactive component explorer

## Installation

```bash
npm install @transcodes/ui-components lit
# or
bun add @transcodes/ui-components lit
```

> **Note:** `lit` is a peer dependency and must be installed separately.

## Quick Start

```typescript
// Import all components (registers custom elements automatically)
import '@transcodes/ui-components';

// Import styles
import '@transcodes/ui-components/styles.css';
```

```html
<tc-button variant="primary">Click me</tc-button>

<tc-input type="email" placeholder="Enter your email" required></tc-input>

<tc-callout variant="info">
  This is an informational message.
</tc-callout>
```

## Components

### Primitives (19)

Core UI building blocks with consistent styling and behavior.

| Component | Description |
|-----------|-------------|
| `<tc-button>` | Interactive button with variants and loading state |
| `<tc-input>` | Text input field with validation support |
| `<tc-otp-input>` | OTP/PIN code input |
| `<tc-input-with-chip>` | Input with attached chip indicator |
| `<tc-text>` | Typography component |
| `<tc-icon>` | Icon display (32+ icons including brand icons) |
| `<tc-chip>` | Tag/badge component |
| `<tc-spinner>` | Loading indicator |
| `<tc-toast>` | Toast notification |
| `<tc-callout>` | Alert/info box with icon slot |
| `<tc-divider>` | Visual separator with optional text |
| `<tc-card>` | Card container |
| `<tc-box>` | Flexible box wrapper |
| `<tc-container>` | Layout container |
| `<tc-section>` | Page section |
| `<tc-item>` | List item |
| `<tc-item-button>` | Clickable list item |
| `<tc-symbol>` | Symbol/logo display |
| `<tc-form-header>` | Form header with title and description |
| `<tc-error-message>` | Error/warning/info message (callout wrapper) |

### Widgets (8)

Complex components composed of primitives.

| Component | Description |
|-----------|-------------|
| `<tc-notification-modal>` | Modal dialog for notifications |
| `<tc-offline-modal>` | Offline state indicator modal |
| `<tc-iframe-modal>` | Modal with embedded iframe |
| `<tc-floating-button>` | Floating action button |
| `<tc-installation-banner>` | PWA installation prompt |
| `<tc-ios-installation-guide>` | iOS PWA installation guide |
| `<tc-page-decoration>` | Page background decoration |
| `<tc-authenticator-card>` | Authenticator info card (passkey, TOTP, USB) |

### Screens (3)

Full-screen state components with flexible height.

| Component | Description |
|-----------|-------------|
| `<tc-loading-screen>` | Loading state with spinner |
| `<tc-error-screen>` | Error state with retry option |
| `<tc-success-screen>` | Success state with action button |

### Controllers (8)

Reusable Reactive Controllers for Lit components.

```typescript
import { LoadingController } from '@transcodes/ui-components/controllers';

class MyComponent extends LitElement {
  private loading = new LoadingController(this);

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
| `BaseController` | Base class for custom controllers |
| `LoadingController` | Manage loading states |
| `FormValidationController` | Form validation |
| `AnimationController` | Coordinate animations |
| `MatchMediaController` | Respond to media queries |
| `StorageController` | Persist data to localStorage/sessionStorage |
| `HistoryController` | Browser history management |
| `MessageBusController` | Cross-component communication |

## Events

All components use `tc-` prefixed custom events:

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

## Styling

Components use CSS custom properties from `@transcodes/design-tokens`:

```css
:root {
  /* Override brand colors */
  --accent-primary: #your-brand-color;

  /* Override spacing */
  --space-md: 16px;
}
```

All components accept an `sx` prop for inline style overrides:

```html
<tc-button
  variant="primary"
  .sx=${{ padding: '1rem 2rem', fontSize: '1.25rem' }}
>
  Large Button
</tc-button>
```

## Module Exports

| Path | Description |
|------|-------------|
| `@transcodes/ui-components` | All components |
| `@transcodes/ui-components/primitives` | Primitive components only |
| `@transcodes/ui-components/widgets` | Widget components only |
| `@transcodes/ui-components/screens` | Screen components only |
| `@transcodes/ui-components/controllers` | Reactive Controllers |
| `@transcodes/ui-components/styles.css` | Component styles |

## Framework Integration

### React

```tsx
import '@transcodes/ui-components';

function App() {
  return (
    <tc-button variant="primary" onTc-click={() => console.log('Clicked!')}>
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

const handleClick = () => console.log('Clicked!');
</script>
```

## Browser Support

- Chrome 67+
- Firefox 63+
- Safari 10.1+
- Edge 79+

## Development

```bash
bun install          # Install dependencies
bun run dev          # Start Storybook dev server
bun run build        # Build for production
bun run type-check   # Type check
```

## Related Packages

- [@transcodes/design-tokens](https://www.npmjs.com/package/@transcodes/design-tokens) - Design tokens used by this library

## Changelog

See [CHANGELOG.md](./CHANGELOG.md) for release history.

## License

[MIT](./LICENSE)
