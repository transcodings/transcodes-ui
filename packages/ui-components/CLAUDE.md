# CLAUDE.md

## Why

Shadow DOM 기반 프레임워크 무관 UI 컴포넌트 라이브러리. React, Vue, Svelte 등 모든 프레임워크에서 사용 가능합니다.

## Commands

```bash
bun run dev              # Storybook 개발 서버 (포트 6006)
bun run build            # TypeScript 컴파일 + Vite 빌드
bun run type-check       # TypeScript 타입 검사
```

## Architecture

Lit 3.x 기반. 3계층 구조:

- **Controllers** (`src/controllers/`): Reactive Controllers (애니메이션, 폼 검증, 미디어 쿼리 등)
- **Primitives** (`src/primitives/`): 기본 UI 요소 (`tc-button`, `tc-input`, `tc-text` 등)
- **Screens** (`src/screens/`): 전체 화면 컴포넌트

### Module Exports

```
@transcodes/ui-components             → src/index.ts
@transcodes/ui-components/primitives  → src/primitives/index.ts
@transcodes/ui-components/screens     → src/screens/index.ts
@transcodes/ui-components/controllers → src/controllers/index.ts
```

## Storybook

스토리 파일: `src/stories/`. 개발 서버: http://localhost:6006

## 추가 문서

- 컴포넌트 작성 규칙: `../../.claude/rules/component-guide.md`
