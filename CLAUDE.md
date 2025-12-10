# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Build & Development Commands

```bash
bun install                # 의존성 설치
bun run build              # 전체 패키지 빌드 (design-tokens → ui-components)
bun run dev                # Storybook 개발 서버 (포트 6006)
bun run lint               # 전체 린트
bun run format             # Biome 포맷팅
bun run check              # 린트 + 포맷팅 검사
```

### 개별 패키지 빌드

```bash
turbo run build --filter=@transcodes/design-tokens
turbo run build --filter=@transcodes/ui-components
```

## Monorepo Architecture

Turborepo 기반 모노레포. Bun을 패키지 매니저로 사용.

```
transcodes-ui/
├── packages/
│   ├── design-tokens/     # Style Dictionary v4 디자인 토큰
│   └── ui-components/     # Lit 3.x 웹 컴포넌트 라이브러리
├── MIGRATION_ANALYSIS.md  # toolkit 마이그레이션 분석
└── IMPLEMENTATION_PLAN.md # 구현 계획
```

**의존 관계**: `ui-components` → `design-tokens`

### design-tokens (@transcodes/design-tokens)

Style Dictionary로 JSON 토큰을 CSS 변수와 TypeScript 타입으로 변환:
- 토큰 정의: `tokens/` 디렉터리 (DTCG 형식 `$value` 사용)
- 빌드 결과: `build/tokens.css`, `build/tokens-dark.css`, `build/components.css`
- 다크 모드: `[data-theme="dark"]` 선택자 지원
- npm publish 준비 완료 (수동 실행 대기)

### ui-components (@transcodes/ui-components)

Lit 3.x 웹 컴포넌트 라이브러리. 4계층 구조:
- **Controllers** (`src/controllers/`): Reactive Controllers. `BaseController` 상속
- **Primitives** (`src/primitives/`): 기본 UI 요소 (`tc-button`, `tc-input` 등)
- **Widgets** (`src/widgets/`): 복합 컴포넌트 (모달, 플로팅 버튼 등)
- **Screens** (`src/screens/`): 전체 화면 컴포넌트

## Code Style

- **Linting/Formatting**: Biome (공백 들여쓰기, 작은따옴표)
- **Pre-commit**: Lefthook으로 format + check 자동 실행
- **TypeScript**: strict 모드, Lit 데코레이터용 `experimentalDecorators: true`
- **컴포넌트**: `@customElement('tc-xxx')` 데코레이터, 이벤트는 `bubbles: true, composed: true`
- **ESM**: import 시 `.js` 확장자 필수

## 관련 프로젝트

- **transcode-backend-nestjs-v1**: toolkit 모듈에서 이 패키지들을 사용할 예정
- 마이그레이션 계획: `MIGRATION_ANALYSIS.md` 참조
