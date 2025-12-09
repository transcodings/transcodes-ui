# @transcodes/design-tokens

Style Dictionary 기반 디자인 토큰 라이브러리입니다. 다크 모드 지원과 WCAG AA 접근성을 준수합니다.

## 설치

```bash
npm install @transcodes/design-tokens
# or
bun add @transcodes/design-tokens
```

## 사용법

### 기본 사용

```typescript
// CSS 변수 (라이트 테마)
import '@transcodes/design-tokens';

// 다크 테마 추가
import '@transcodes/design-tokens/tokens-dark.css';

// 컴포넌트 클래스 (button, input, card 등)
import '@transcodes/design-tokens/components.css';
```

### CSS에서 사용

```css
.my-element {
  color: var(--ink-black);
  background: var(--paper-white);
  padding: var(--space-md);
  border-radius: var(--radius-md);
  transition: all var(--transition-smooth);
}
```

### 다크 모드

```html
<!-- 라이트 테마 (기본) -->
<html data-theme="light">

<!-- 다크 테마 -->
<html data-theme="dark">
```

```javascript
// JavaScript로 테마 전환
document.documentElement.setAttribute('data-theme', 'dark');
```

### TypeScript 타입

```typescript
import type { DesignTokens } from '@transcodes/design-tokens/types';
```

## 토큰 목록

### 색상 (Color)

| 토큰 | 라이트 | 다크 | 용도 |
|------|--------|------|------|
| `--ink-black` | #1a1a1a | #ffffff | 기본 텍스트 |
| `--ink-dark` | #2d2d2d | #e5e5e5 | 보조 텍스트 |
| `--ink-medium` | #5c5c5c | #a3a3a3 | 3차 텍스트 |
| `--ink-light` | #8a8a8a | #737373 | placeholder |
| `--ink-faint` | #c4c4c4 | #525252 | 장식용 |
| `--paper-white` | #faf9fc | #1a1a1a | 기본 배경 |
| `--paper-cream` | #f5f4f8 | #2d2d2d | 보조 배경 |
| `--paper-warm` | #ebe9f0 | #404040 | 3차 배경 |
| `--accent-primary` | #6b4fd9 | - | 브랜드 강조 |
| `--accent-success` | #357a46 | - | 성공 상태 |
| `--error-base` | #c0392b | - | 에러 상태 |

### 간격 (Spacing)

| 토큰 | 값 (반응형) |
|------|-------------|
| `--space-xs` | 4-5px |
| `--space-sm` | 8-10px |
| `--space-md` | 14-20px |
| `--space-lg` | 20-32px |
| `--space-xl` | 24-44px |
| `--space-2xl` | 32-72px |

### 타이포그래피 (Typography)

| 토큰 | 값 |
|------|-----|
| `--font-body` | 'DM Sans', system-ui, sans-serif |
| `--font-size-sm` | clamp(0.8125rem, ...) |
| `--font-size-base` | clamp(0.875rem, ...) |
| `--font-size-lg` | clamp(1rem, ...) |
| `--font-size-xl` | clamp(1.25rem, ...) |
| `--font-size-2xl` | clamp(1.5rem, ...) |
| `--line-height-tight` | 1.25 |
| `--line-height-normal` | 1.5 |
| `--line-height-relaxed` | 1.75 |

### 레이아웃 (Layout)

| 토큰 | 값 |
|------|-----|
| `--breakpoint-sm` | 640px |
| `--breakpoint-md` | 768px |
| `--breakpoint-lg` | 1024px |
| `--breakpoint-xl` | 1280px |
| `--z-index-dropdown` | 1000 |
| `--z-index-sticky` | 1020 |
| `--z-index-modal` | 1050 |
| `--z-index-tooltip` | 1070 |

### 애니메이션 (Animation)

| 토큰 | 값 |
|------|-----|
| `--transition-fast` | 150ms ease |
| `--transition-smooth` | 300ms cubic-bezier(0.4, 0, 0.2, 1) |
| `--transition-bounce` | 400ms cubic-bezier(0.34, 1.56, 0.64, 1) |

## 빌드 결과물

| 파일 | 설명 |
|------|------|
| `build/tokens.css` | CSS 변수 (`:root, [data-theme="light"]`) |
| `build/tokens-dark.css` | 다크 테마 CSS (`[data-theme="dark"]`) |
| `build/components.css` | 컴포넌트 CSS 클래스 |
| `build/tokens.d.ts` | TypeScript 타입 선언 |
| `build/tokens.json` | JSON 형식 토큰 |

## 접근성

모든 주요 색상이 WCAG AA 기준(4.5:1)을 충족합니다:

| 색상 | 대비율 | WCAG |
|------|--------|------|
| ink-black on paper-white | 15.8:1 | AAA |
| ink-dark on paper-white | 12.5:1 | AAA |
| ink-medium on paper-white | 6.0:1 | AA |
| accent-primary on paper-white | 4.5:1 | AA |

## 개발

```bash
# 의존성 설치
bun install

# 토큰 빌드
bun run build

# 빌드 결과물 삭제
bun run clean
```

## 라이선스

MIT
