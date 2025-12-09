# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## 프로젝트 개요

Style Dictionary v4 기반의 디자인 토큰 빌드 시스템입니다. JSON으로 정의된 디자인 토큰을 CSS 변수와 TypeScript 타입으로 변환합니다.

## 명령어

```bash
# 의존성 설치
bun install

# 토큰 빌드 (CSS 변수 + TypeScript 타입 생성)
bun run build

# 빌드 결과물 삭제
bun run clean
```

## 프로젝트 구조

```
tokens/           # 소스 디자인 토큰 (JSON)
├── color/        # 색상 토큰 (ink, paper, accent, alpha, error)
├── typography/   # 폰트 관련 토큰
├── spacing/      # 간격 토큰
├── animation/    # 트랜지션 토큰
└── components/   # 컴포넌트별 토큰 (button, card, input 등)

build/            # 빌드 결과물
├── tokens.css    # CSS 변수 (:root)
├── tokens.d.ts   # TypeScript 타입 선언
└── components.css # 컴포넌트 CSS 클래스
```

## Style Dictionary 설정 (sd.config.ts)

커스텀 트랜스폼 및 포맷이 등록되어 있습니다:

- **name/kebab-flat**: 토큰 경로를 kebab-case CSS 변수명으로 변환 (`ink.black` → `ink-black`)
- **name/camel-flat**: 토큰 경로를 camelCase로 변환 (`ink.black` → `inkBlack`)
- **css/components**: 컴포넌트 토큰을 CSS 클래스로 변환하는 커스텀 포맷

## 토큰 정의 형식

토큰은 DTCG(Design Token Community Group) 형식의 `$value` 속성을 사용합니다:

```json
{
  "ink": {
    "black": { "$value": "#1a1a1a" }
  }
}
```
