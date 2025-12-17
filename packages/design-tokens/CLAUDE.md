# CLAUDE.md

## Why

일관된 디자인 시스템을 위한 토큰 관리. JSON으로 정의된 디자인 토큰을 CSS 변수와 TypeScript 타입으로 변환합니다.

## Commands

```bash
bun run build   # 토큰 빌드 (CSS + TypeScript 타입 생성)
bun run clean   # 빌드 결과물 삭제
```

## Architecture

```
tokens/     # 소스 디자인 토큰 (JSON, DTCG 형식)
config/     # Style Dictionary 설정 모듈
build/      # 빌드 결과물 (gitignore)
```

### 토큰 카테고리
`color/`, `typography/`, `spacing/`, `sizing/`, `layout/`, `animation/`, `appearance/`, `components/`, `themes/`, `brand/`

### 빌드 결과물
- `tokens.css`: CSS 변수 (라이트 테마)
- `tokens-dark.css`: 다크 테마 CSS
- `components.css`: 컴포넌트 CSS 클래스
- `tokens.d.ts`: TypeScript 타입 선언

## Dark Mode

`[data-theme="dark"]` 선택자로 적용. 오버라이드는 `tokens/themes/dark.json`에 정의.

## 추가 문서

- Style Dictionary 커스텀 설정: `../../.claude/rules/style-dictionary-guide.md`
