---
description: 새 Lit 컴포넌트 생성 (대화형)
allowed-tools: Read, Write, Edit, Bash(bun run type-check:*), Glob, AskUserQuestion
---

# New Component (Interactive)

새 Lit 웹 컴포넌트를 생성합니다.

## Step 1: 컴포넌트 정보 수집

사용자에게 다음 정보를 질문하세요:

1. **컴포넌트 이름** (텍스트):
   - 예: `badge`, `tooltip`, `avatar`
   - `tc-` 접두사는 자동 추가됨

2. **계층** (선택형):
   - primitives (기본 UI 요소)
   - screens (전체 화면 컴포넌트)

3. **Props** (다중 선택 또는 텍스트):
   - variant (스타일 변형)
   - size (크기)
   - disabled (비활성화)
   - 커스텀 prop 입력

4. **슬롯 사용** (예/아니오):
   - children 콘텐츠 받을지 여부

5. **이벤트** (선택):
   - click, change 등 발생시킬 이벤트

## Step 2: 컴포넌트 파일 생성

경로: `packages/ui-components/src/{계층}/{이름}.ts`

템플릿 생성 시 포함할 내용:
- `@customElement('tc-{이름}')` 데코레이터
- 수집한 props를 `@property()`로 정의
- 기본 스타일 (design-tokens CSS 변수 사용)
- 슬롯 사용 시 `<slot></slot>` 포함
- 이벤트 발생 시 `{ bubbles: true, composed: true }` 옵션

## Step 3: 스토리 파일 생성

경로: `packages/ui-components/src/stories/{이름}.stories.ts`

- 기본 스토리 (Default)
- props별 변형 스토리 (있는 경우)

## Step 4: Export 추가

`packages/ui-components/src/{계층}/index.ts`에 export 추가:
```typescript
export * from './{이름}.js';
```

## Step 5: 타입 검사

```bash
cd packages/ui-components && bun run type-check
```

## Step 6: 완료 확인

생성된 파일 목록과 Storybook 실행 안내:
```bash
bun run dev  # http://localhost:6006
```
