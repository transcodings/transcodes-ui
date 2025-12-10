# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## 프로젝트 개요

Style Dictionary v4 기반의 디자인 토큰 빌드 시스템입니다. JSON으로 정의된 디자인 토큰을 CSS 변수와 TypeScript 타입으로 변환합니다.

## 명령어

```bash
bun install        # 의존성 설치
bun run build      # 토큰 빌드 (CSS + TypeScript 타입 생성)
bun run clean      # 빌드 결과물 삭제
```

## 프로젝트 구조

```
tokens/              # 소스 디자인 토큰 (JSON, DTCG 형식)
├── color/           # 색상 토큰 (ink, paper, accent, alpha, error)
├── typography/      # 폰트 관련 토큰
├── spacing/         # 간격 토큰
├── animation/       # 트랜지션, ink-effect 토큰
├── components/      # 컴포넌트별 토큰 (button, card, input 등)
├── themes/          # 다크 테마 오버라이드
└── brand/           # 브랜드 토큰

config/              # Style Dictionary 설정 모듈
├── transforms/      # 커스텀 이름 변환
└── formats/         # 커스텀 출력 포맷

build/               # 빌드 결과물 (gitignore)
├── tokens.css       # CSS 변수 (:root, [data-theme="light"])
├── tokens-dark.css  # 다크 테마 CSS ([data-theme="dark"])
├── components.css   # 컴포넌트 CSS 클래스
├── components.js    # 컴포넌트 스타일 JS export
├── tokens.d.ts      # TypeScript 타입 선언
└── tokens.json      # JSON 형식 토큰
```

## Style Dictionary 설정

- **sd.config.ts**: 라이트 테마 빌드 설정
- **sd.config.dark.ts**: 다크 테마 빌드 설정

커스텀 트랜스폼:
- `name/kebab-flat`: 토큰 경로 → kebab-case (`ink.black` → `ink-black`)
- `name/camel-flat`: 토큰 경로 → camelCase (`ink.black` → `inkBlack`)

커스텀 포맷:
- `css/components`: 컴포넌트 토큰 → CSS 클래스

## 토큰 정의 형식

DTCG(Design Token Community Group) 형식 사용:

```json
{
  "ink": {
    "black": {
      "$value": "#1a1a1a",
      "$type": "color",
      "$description": "Primary text. WCAG AA: 15.8:1 on paper-white"
    }
  }
}
```

## 다크 모드

`[data-theme="dark"]` 선택자로 다크 테마 적용:

```html
<html data-theme="dark">
```

다크 테마 오버라이드는 `tokens/themes/dark.json`에 정의.
