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

## 스타일 오버라이드

`sx` prop으로 인라인 스타일 지원:

```typescript
@property({ type: Object }) sx: StyleInfo = {};

render() {
  return html`<div style=${styleMap(this.sx)}>...</div>`;
}
```

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
