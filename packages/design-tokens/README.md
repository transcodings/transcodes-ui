# @transcodes/design-tokens

A comprehensive design token system built with [Style Dictionary](https://amzn.github.io/style-dictionary/). Features dark mode support, WCAG AA accessibility compliance, and responsive design values.

[![npm version](https://img.shields.io/npm/v/@transcodes/design-tokens.svg)](https://www.npmjs.com/package/@transcodes/design-tokens)
[![license](https://img.shields.io/npm/l/@transcodes/design-tokens.svg)](https://github.com/transcodings/transcodes-ui/blob/main/packages/design-tokens/LICENSE)

## Features

- **Dark Mode Support** - Automatic system detection + manual override with `data-theme`
- **WCAG AA Compliant** - All color combinations meet accessibility contrast requirements
- **Responsive Values** - Fluid typography and spacing using CSS `clamp()`
- **TypeScript Support** - Full type definitions included
- **CSS Auto-import** - Zero-config CSS loading (v0.3.1+)
- **Tree-shakable** - Optimized for modern bundlers

## Installation

```bash
npm install @transcodes/design-tokens
# or
bun add @transcodes/design-tokens
```

## Quick Start

### Automatic CSS Loading (v0.3.1+)

```typescript
// CSS automatically loaded (light + dark themes)
import '@transcodes/design-tokens';
```

That's it! CSS variables are now available globally.

```css
.card {
  color: var(--ink-black);
  background: var(--paper-white);
  padding: var(--space-md);
  border-radius: var(--radius-md);
  box-shadow: var(--shadow-card);
}
```

### JavaScript Objects (Optional)

```typescript
import { tokens, cssVars } from '@transcodes/design-tokens';

// camelCase keys
console.log(tokens.accentPrimary); // "#6b4fd9"
console.log(tokens.spaceMd);       // "clamp(0.875rem, 0.77rem + 0.54vw, 1.25rem)"

// CSS variable names as keys
console.log(cssVars['--accent-primary']); // "#6b4fd9"
console.log(cssVars['--space-md']);       // "clamp(0.875rem, 0.77rem + 0.54vw, 1.25rem)"
```

### Dark Mode

**Automatic Detection (v0.3.1+)**

Dark mode is automatically applied based on system preferences:

```css
/* Respects prefers-color-scheme: dark */
@media (prefers-color-scheme: dark) {
  :root:not([data-theme="light"]) {
    /* Dark theme variables */
  }
}
```

**Manual Override**

Force a specific theme:

```html
<!-- Force light theme (ignores system preference) -->
<html data-theme="light">

<!-- Force dark theme (ignores system preference) -->
<html data-theme="dark">

<!-- Auto (respect system preference) -->
<html> <!-- no data-theme attribute -->
```

```javascript
// Toggle theme with manual override
function toggleTheme() {
  const current = document.documentElement.getAttribute('data-theme');
  const next = current === 'dark' ? 'light' : 'dark';
  document.documentElement.setAttribute('data-theme', next);
}

// Reset to system preference
function resetTheme() {
  document.documentElement.removeAttribute('data-theme');
}
```

## Available Tokens

### Colors

| Token | Light | Dark | Usage |
|-------|-------|------|-------|
| `--ink-black` | #1a1a1a | #ffffff | Primary text |
| `--ink-dark` | #2d2d2d | #e5e5e5 | Secondary text |
| `--ink-medium` | #5c5c5c | #a3a3a3 | Tertiary text |
| `--ink-light` | #8a8a8a | #737373 | Placeholder text |
| `--paper-white` | #faf9fc | #1a1a1a | Primary background |
| `--paper-cream` | #f5f4f8 | #2d2d2d | Secondary background |
| `--paper-warm` | #ebe9f0 | #404040 | Tertiary background |
| `--accent-primary` | #6b4fd9 | #8b7ae8 | Brand accent |
| `--accent-success` | #357a46 | #4ade80 | Success state |
| `--error-base` | #c0392b | #f87171 | Error state |

### Semantic Tokens (v0.3.0+)

| Token | Description |
|-------|-------------|
| `--button-dark` | Dark button background |
| `--button-dark-hover` | Dark button hover state |
| `--button-light` | Light button background |
| `--button-light-hover` | Light button hover state |
| `--semantic-warning-bg` | Warning callout background |
| `--semantic-success-bg` | Success callout background |
| `--semantic-info-bg` | Info callout background |

### Spacing

Responsive values that scale with viewport width.

| Token | Value Range |
|-------|-------------|
| `--space-xs` | 4px - 5px |
| `--space-sm` | 8px - 10px |
| `--space-md` | 14px - 20px |
| `--space-lg` | 20px - 32px |
| `--space-xl` | 24px - 44px |
| `--space-2xl` | 32px - 72px |

### Typography

```css
/* Font families */
--font-body: 'DM Sans', system-ui, sans-serif;
--font-mono: 'JetBrains Mono', monospace;

/* Font sizes (fluid) */
--font-size-sm    /* 13px - 14px */
--font-size-base  /* 14px - 16px */
--font-size-lg    /* 16px - 18px */
--font-size-xl    /* 20px - 24px */
--font-size-2xl   /* 24px - 32px */

/* Line heights */
--line-height-tight: 1.25;
--line-height-normal: 1.5;
--line-height-relaxed: 1.75;
```

### Layout

```css
/* Border radius */
--radius-sm: 4px;
--radius-md: 8px;
--radius-lg: 12px;
--radius-full: 9999px;

/* Z-index scale */
--z-index-dropdown: 1000;
--z-index-sticky: 1020;
--z-index-modal: 1050;
--z-index-tooltip: 1070;
```

### Animation

```css
--transition-fast: 150ms ease;
--transition-smooth: 300ms cubic-bezier(0.4, 0, 0.2, 1);
--transition-bounce: 400ms cubic-bezier(0.34, 1.56, 0.64, 1);
```

## Exports

| Path | Description |
|------|-------------|
| `@transcodes/design-tokens` | **Recommended** - Auto-loads CSS + exports JS objects |
| `@transcodes/design-tokens/css` | CSS variables only (light theme) |
| `@transcodes/design-tokens/tokens-dark.css` | Dark theme CSS only |
| `@transcodes/design-tokens/components.css` | Component utility classes |
| `@transcodes/design-tokens/components` | Component styles as JS |
| `@transcodes/design-tokens/types` | TypeScript type definitions |
| `@transcodes/design-tokens/json` | Raw token values as JSON |

### Migration from v0.3.0

```typescript
// v0.3.0 (manual CSS imports)
import '@transcodes/design-tokens/css';
import '@transcodes/design-tokens/tokens-dark.css';

// v0.3.1+ (automatic)
import '@transcodes/design-tokens';
```

## Accessibility

All primary color combinations meet WCAG AA standards (4.5:1 minimum contrast ratio):

| Combination | Ratio | Level |
|-------------|-------|-------|
| ink-black on paper-white | 15.8:1 | AAA |
| ink-dark on paper-white | 12.5:1 | AAA |
| ink-medium on paper-white | 6.0:1 | AA |
| accent-primary on paper-white | 4.5:1 | AA |

## Browser Support

Supports all modern browsers with CSS custom properties and `clamp()`:

- Chrome 79+
- Firefox 75+
- Safari 13.1+
- Edge 79+

## Related Packages

- [@transcodes/ui-components](https://www.npmjs.com/package/@transcodes/ui-components) - Lit 3.x component library using these tokens

## Changelog

See [CHANGELOG.md](./CHANGELOG.md) for release history.

## License

[MIT](./LICENSE)
