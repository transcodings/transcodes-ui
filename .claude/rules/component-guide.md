# Lit 컴포넌트 작성 규칙

## 네이밍

- 커스텀 엘리먼트: `tc-` 접두사 (예: `tc-button`, `tc-input`)
- 클래스명: PascalCase (예: `TcButton`, `TcInput`)
- 커스텀 이벤트: `tc-` 접두사 (예: `tc-click`, `tc-change`)

## 컴포넌트 등록

```typescript
@customElement('tc-xxx')
export class TcXxx extends LitElement {
  // ...
}
```

## 이벤트 발생

```typescript
this.dispatchEvent(new CustomEvent('tc-click', {
  bubbles: true,
  composed: true,  // Shadow DOM 경계 통과
  detail: { /* ... */ }
}));
```

## Props 설계 원칙

### Semantic Preset Props (유지)

의미 있는 preset 값을 받는 props는 유지:

```typescript
// tc-text: semantic size presets
@property({ type: String }) size: 'xs' | 'sm' | 'base' | 'lg' | 'xl' | '2xl' = 'base';

// tc-button: semantic variants
@property({ type: String }) variant: 'primary' | 'secondary' | 'success' = 'primary';

// tc-chip: semantic variants and sizes
@property({ type: String }) variant: 'default' | 'success' | 'error' | 'info' = 'default';
@property({ type: String }) size: 'sm' | 'md' = 'md';
```

### Raw CSS Value Props (제거됨)

Raw CSS 값을 받는 props는 외부에 노출하지 않고, 내부 기본값만 유지:

```typescript
// 이전 (제거됨)
@property({ type: String }) size = '1.5rem';
@property({ type: String }) color = 'currentColor';

// 현재 (내부 기본값만 유지)
@property({ type: Object }) sx: SxProps = {};

render() {
  const baseStyles = {
    '--icon-size': '1.5rem',
    '--icon-color': 'currentColor',
  };
  const mergedStyles = { ...baseStyles, ...this.sx };
  return html`<span style=${styleMap(mergedStyles)}>${icon}</span>`;
}
```

## 스타일 커스터마이징

### sx prop

모든 컴포넌트는 `SxProps` 타입의 `sx` prop을 지원합니다:

```typescript
import type { SxProps } from '../types.js';

@property({ type: Object }) sx: SxProps = {};

render() {
  const baseStyles = { /* 기본값 */ };
  const mergedStyles = { ...baseStyles, ...this.sx };
  return html`<div style=${styleMap(mergedStyles)}>...</div>`;
}
```

사용 예시:
```html
<!-- 기본값 사용 -->
<tc-icon name="check"></tc-icon>

<!-- sx로 커스텀 스타일 적용 -->
<tc-icon name="check" .sx=${{ '--icon-size': '2rem', '--icon-color': 'var(--accent-success)' }}></tc-icon>
```

### CSS 변수 목록

| 컴포넌트 | CSS 변수 | 기본값 |
|----------|----------|--------|
| tc-icon | `--icon-size` | `1.5rem` |
| tc-icon | `--icon-color` | `currentColor` |
| tc-symbol | `--symbol-size` | `3rem` |
| tc-symbol | `--symbol-bg` | `var(--paper-cream)` |
| tc-symbol | `--symbol-color` | `var(--ink-dark)` |
| tc-spinner | `--spinner-color` | `var(--accent-primary)` |
| tc-divider | `--divider-color` | `var(--ink-faint)` |
| tc-divider | `--divider-spacing` | `var(--space-md)` |
| tc-item | `--item-gap` | `var(--space-md)` |
| tc-item | `--item-padding` | `var(--space-md)` |
| tc-item-button | `--item-gap` | `var(--space-md)` |
| tc-item-button | `--item-padding` | `var(--space-md)` |
| tc-section | `gap` | `var(--space-md)` |

## CSS 변수

`@transcodes/design-tokens` 패키지의 CSS 변수 사용:

```css
:host {
  color: var(--ink-black);
  background: var(--paper-white);
}
```

## TypeScript 설정

Lit 데코레이터 호환을 위해 필수:
- `experimentalDecorators: true`
- `useDefineForClassFields: false`
- import 시 `.js` 확장자 사용 (ESM 호환)
