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

## 설계 원칙

**KISS, DRY, YAGNI** 원칙을 준수할 것:

- **KISS** (Keep It Simple, Stupid): 단순하게 유지. 불필요한 복잡성 배제
- **DRY** (Don't Repeat Yourself): 중복 코드 금지. 공통 로직은 추상화
- **YAGNI** (You Aren't Gonna Need It): 현재 필요한 것만 구현. 미래 요구사항 예측 금지

## Serena MCP 사용 권장

코드 탐색 및 수정 시 **Serena MCP 도구를 우선 사용**할 것:

- `mcp__serena__find_symbol`: 클래스, 메서드, 함수 등 심볼 검색 (name_path 패턴 지원)
- `mcp__serena__get_symbols_overview`: 파일 내 심볼 구조 파악
- `mcp__serena__find_referencing_symbols`: 심볼 참조 위치 추적
- `mcp__serena__replace_symbol_body`: 심볼 본문 교체
- `mcp__serena__insert_after_symbol` / `insert_before_symbol`: 심볼 전후에 코드 삽입
- `mcp__serena__search_for_pattern`: 정규식 기반 코드 검색

**장점**:
- Read/Edit 대비 토큰 사용량 절약
- 심볼 단위로 정확한 코드 추적 가능
- 전체 파일 읽기 없이 필요한 부분만 조회/수정
