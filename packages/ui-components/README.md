# @transcodes/ui-components

Lit 3.x 기반 웹 컴포넌트 라이브러리

## 설치

```bash
npm install @transcodes/ui-components
# or
bun add @transcodes/ui-components
```

## 사용법

```typescript
// 전체 import (모든 컴포넌트 등록)
import '@transcodes/ui-components';

// 개별 import
import { TcButton } from '@transcodes/ui-components/primitives';
import { LoadingController } from '@transcodes/ui-components/controllers';
```

```html
<tc-button variant="primary" @tc-click=${handleClick}>
  Click me
</tc-button>

<tc-input
  type="email"
  placeholder="이메일 입력"
  @tc-change=${handleChange}
></tc-input>
```

## 컴포넌트

### Primitives (기본 UI)

| 컴포넌트 | 설명 |
|---------|------|
| `tc-button` | 버튼 (primary, outline, ghost 등) |
| `tc-input` | 텍스트 입력 |
| `tc-otp-input` | OTP 입력 (6자리) |
| `tc-text` | 텍스트 표시 |
| `tc-container` | 레이아웃 컨테이너 |
| `tc-box` | 범용 박스 |
| `tc-section` | 섹션 |
| `tc-divider` | 구분선 |
| `tc-callout` | 정보 박스 |
| `tc-chip` | 칩/태그 |
| `tc-icon` | 아이콘 |
| `tc-spinner` | 로딩 스피너 |
| `tc-toast` | 토스트 알림 |

### Widgets (복합 컴포넌트)

| 컴포넌트 | 설명 |
|---------|------|
| `tc-notification-modal` | 알림 모달 |
| `tc-offline-modal` | 오프라인 상태 모달 |
| `tc-floating-action-button` | 플로팅 액션 버튼 |

### Controllers

| 컨트롤러 | 설명 |
|---------|------|
| `LoadingController` | 로딩 상태 관리 |
| `FormController` | 폼 검증 |
| `AnimationController` | 애니메이션 제어 |
| `MatchMediaController` | 미디어 쿼리 반응 |
| `StorageController` | localStorage/sessionStorage |
| `MessageBusController` | 컴포넌트 간 통신 |

## 개발

```bash
bun install           # 의존성 설치
bun run dev           # Storybook 개발 서버 (http://localhost:6006)
bun run build         # TypeScript + Vite 빌드
bun run type-check    # 타입 검사
```

## 아키텍처

```
src/
├── controllers/    # Lit Reactive Controllers
├── primitives/     # 기본 UI 요소 (tc-button, tc-input 등)
├── widgets/        # 복합 컴포넌트 (모달, FAB 등)
├── screens/        # 전체 화면 컴포넌트
├── styles/         # CSS 디자인 토큰
└── stories/        # Storybook 스토리
```

## 의존성

- **@transcodes/design-tokens**: CSS 변수 및 디자인 토큰

## 라이선스

MIT
