---
description: 토큰 사용 현황 분석 (미사용/누락 토큰 검출)
allowed-tools: Read, Grep, Glob, Bash(grep:*), Bash(wc:*)
---

# Token Audit

디자인 토큰 사용 현황을 분석합니다.

## 분석 대상

- **정의된 토큰**: `packages/design-tokens/build/tokens.css`
- **사용 위치**: `packages/ui-components/src/**/*.ts`

## 워크플로우

### 1. 정의된 토큰 수집

CSS 변수 목록 추출:
```bash
grep -oP '(?<=--)[a-z0-9-]+(?=:)' packages/design-tokens/build/tokens.css | sort -u
```

### 2. 사용 중인 토큰 검색

ui-components에서 CSS 변수 사용 검색:
```bash
grep -rohP '(?<=var\(--)[a-z0-9-]+(?=\))' packages/ui-components/src/ | sort -u
```

### 3. 분석 결과

#### 미사용 토큰 (Unused)
정의되었지만 사용되지 않는 토큰.
- 제거 검토 필요
- 또는 향후 사용 예정인 토큰

#### 누락된 토큰 (Missing)
사용되었지만 정의되지 않은 토큰.
- 오타 가능성
- 또는 토큰 추가 필요

#### 사용 빈도
토큰별 사용 횟수 (참고용):
```bash
grep -rohP '(?<=var\(--)[a-z0-9-]+(?=\))' packages/ui-components/src/ | sort | uniq -c | sort -rn
```

## 리포트 형식

```
## Token Audit Report

### Summary
- 정의된 토큰: N개
- 사용 중인 토큰: M개
- 미사용 토큰: X개
- 누락된 토큰: Y개

### Unused Tokens
- --token-name-1
- --token-name-2

### Missing Tokens
- --undefined-token-1

### Top 10 Used Tokens
1. --ink-black (15회)
2. --paper-white (12회)
...
```

## 주의사항

- 동적으로 생성되는 토큰명은 검출 불가
- 컴포넌트 CSS 클래스(`components.css`) 별도 분석 필요
