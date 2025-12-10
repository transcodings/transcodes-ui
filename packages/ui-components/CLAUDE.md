# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Build & Development Commands

```bash
bun run dev              # Storybook 개발 서버 시작 (포트 6006)
bun run build            # TypeScript 컴파일 + Vite 빌드
bun run build-storybook  # Storybook 정적 빌드
bun run type-check       # TypeScript 타입 검사 (noEmit)
```

## Architecture

Lit 3.x 기반 웹 컴포넌트 라이브러리. 4가지 계층 구조:

- **Controllers** (`src/controllers/`): Lit Reactive Controllers. `BaseController`를 상속하며 호스트 컴포넌트에 재사용 가능한 로직 제공 (애니메이션, 폼 검증, 미디어 쿼리, 스토리지, 메시지 버스 등)
- **Primitives** (`src/primitives/`): 기본 UI 요소. `tc-` 접두사 사용 (예: `tc-button`, `tc-input`, `tc-text`)
- **Widgets** (`src/widgets/`): 복합 컴포넌트. primitives를 조합하여 구성 (모달, 설치 가이드, 플로팅 버튼 등)
- **Screens** (`src/screens/`): 전체 화면 컴포넌트 (로딩, 에러, 성공 화면)

모듈 export는 package.json의 `exports` 필드로 관리:
```
@transcodes/ui-components           → src/index.ts
@transcodes/ui-components/primitives → src/primitives/index.ts
@transcodes/ui-components/widgets   → src/widgets/index.ts
@transcodes/ui-components/screens   → src/screens/index.ts
@transcodes/ui-components/controllers → src/controllers/index.ts
```

## Component Conventions

- 모든 컴포넌트는 `@customElement('tc-xxx')` 데코레이터로 등록
- 커스텀 이벤트: `tc-click`, `tc-change` 등 `tc-` 접두사 사용
- 이벤트 옵션: `{ bubbles: true, composed: true }`
- `sx` prop으로 인라인 스타일 오버라이드 지원 (styleMap 디렉티브)
- CSS 변수는 `@transcodes/design-tokens` 참조

## TypeScript

- `experimentalDecorators: true`, `useDefineForClassFields: false` 필수 (Lit 데코레이터 호환)
- strict 모드 활성화
- import 시 `.js` 확장자 사용 (ESM 호환)
- Stories 파일은 타입 검사에서 제외됨

## Storybook

- 스토리 파일: `src/stories/` 디렉터리
- 개발 서버: http://localhost:6006
