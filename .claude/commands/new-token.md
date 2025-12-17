---
description: 새 디자인 토큰 추가 (대화형)
allowed-tools: Read, Write, Edit, Bash(bun run build:*), Glob, AskUserQuestion
---

# New Token (Interactive)

새 디자인 토큰을 추가합니다.

## Step 1: 토큰 정보 수집

사용자에게 다음 정보를 질문하세요:

1. **카테고리** (선택형):
   - color (색상)
   - typography (타이포그래피)
   - spacing (간격)
   - sizing (사이즈)
   - animation (애니메이션)
   - components (컴포넌트)

2. **토큰 이름** (텍스트):
   - 예: `accent-green`, `heading-xl`, `modal-padding`

3. **토큰 값** (텍스트):
   - 색상: `#hex` 또는 `rgb()`
   - 크기: `16px`, `1rem`, `clamp(...)`

4. **설명** (선택, 텍스트):
   - 용도나 WCAG 대비율 등

5. **다크 모드 값** (선택, 텍스트):
   - 다크 테마에서 다른 값이 필요한 경우

## Step 2: 토큰 파일 수정

카테고리에 맞는 JSON 파일 찾기:
- `packages/design-tokens/tokens/{category}/`

기존 파일에 토큰 추가 (DTCG 형식):
```json
{
  "토큰명": {
    "$value": "값",
    "$type": "color | dimension | ...",
    "$description": "설명"
  }
}
```

## Step 3: 다크 모드 (해당 시)

다크 모드 값이 있으면 `tokens/themes/dark.json`에 추가.

## Step 4: 빌드 및 확인

```bash
cd packages/design-tokens && bun run build
```

빌드 성공 시 결과 요약:
- 추가된 CSS 변수명: `--{토큰명}`
- 사용 예시: `var(--{토큰명})`

## Step 5: 완료 확인

사용자에게 결과 확인 요청.
