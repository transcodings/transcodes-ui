# CLAUDE.md

## Why

Transcodes 프로젝트를 위한 디자인 시스템. 디자인 토큰과 웹 컴포넌트를 통해 일관된 UI/UX를 제공합니다.

## Build & Development

```bash
bun install        # 의존성 설치
bun run build      # 전체 빌드 (design-tokens → ui-components)
bun run dev        # Storybook 개발 서버 (포트 6006)
bun run check      # 린트 + 포맷팅 검사
```

## Architecture

Turborepo 기반 모노레포. Bun 패키지 매니저.

```
packages/
├── design-tokens/   # Style Dictionary v4 디자인 토큰
└── ui-components/   # Lit 3.x 웹 컴포넌트
```

**의존 관계**: `ui-components` → `design-tokens`

### design-tokens
JSON 토큰 → CSS 변수 + TypeScript 타입 변환. DTCG 형식 사용.

### ui-components
Lit 기반 Shadow DOM 웹 컴포넌트. 3계층 구조:
- **Controllers**: 재사용 가능한 Reactive Controllers
- **Primitives**: 기본 UI 요소 (`tc-button`, `tc-input` 등)
- **Screens**: 전체 화면 컴포넌트

## Code Style

Biome 린터/포맷터 사용. `bun run check`로 검증.

**설계 원칙**: KISS, DRY, YAGNI - 단순하게, 중복 없이, 필요한 것만

## 추가 문서

- Serena MCP 가이드: `.claude/rules/serena-guide.md`
- 컴포넌트 작성 규칙: `.claude/rules/component-guide.md`
- Style Dictionary 설정: `.claude/rules/style-dictionary-guide.md`
