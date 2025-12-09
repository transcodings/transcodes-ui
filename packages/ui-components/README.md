# @transcodes/ui-components

Lit 3.x 기반 웹 컴포넌트 라이브러리

## 설치

```bash
bun add @transcodes/ui-components
```

## 사용법

```typescript
// 전체 import
import '@transcodes/ui-components';

// 개별 import
import { TcButton } from '@transcodes/ui-components/primitives';
import { LoadingController } from '@transcodes/ui-components/controllers';
```

```html
<tc-button variant="primary" @tc-click=${handleClick}>
  Click me
</tc-button>
```

## 개발

```bash
bun install
bun run dev   # Storybook 실행 (http://localhost:6006)
```

## 구조

- `primitives/` - 기본 UI 요소 (button, input, text 등)
- `widgets/` - 복합 컴포넌트 (modal, banner 등)
- `screens/` - 전체 화면 컴포넌트
- `controllers/` - Lit Reactive Controllers
- `styles/` - CSS 디자인 토큰
