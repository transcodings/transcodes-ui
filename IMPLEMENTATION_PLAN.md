# transcodes-ui 마이그레이션 준비 - 실행 계획

> 계획 수립일: 2025-12-10

## 작업 범위

1. **transcodes-ui 확장 필요사항 구현** (4개 컴포넌트)
2. **npm publish 준비 상태 체크** (실행은 사람이 함)

---

## Part 1: transcodes-ui 컴포넌트 확장

### 1.1 tc-input.ts - keydown/paste 이벤트 추가

**파일**: `packages/ui-components/src/primitives/tc-input.ts`

**작업 내용**:
1. 템플릿에 `@keydown`, `@paste` 이벤트 바인딩 추가
2. `handleKeydown`, `handlePaste` 핸들러 메서드 추가
3. `tc-keydown`, `tc-paste` 커스텀 이벤트 dispatch

**참고 패턴**: `tc-otp-input.ts` (라인 149-151)

```typescript
// 추가할 이벤트 핸들러
private handleKeydown(e: KeyboardEvent) {
  this.dispatchEvent(new CustomEvent('tc-keydown', {
    bubbles: true, composed: true,
    detail: { key: e.key, value: this.value, originalEvent: e }
  }));
}

private handlePaste(e: ClipboardEvent) {
  this.dispatchEvent(new CustomEvent('tc-paste', {
    bubbles: true, composed: true,
    detail: { data: e.clipboardData?.getData('text'), originalEvent: e }
  }));
}
```

---

### 1.2 tc-callout.ts - 아이콘 슬롯 추가

**파일**: `packages/ui-components/src/primitives/tc-callout.ts`

**작업 내용**:
1. `icon` 명명 슬롯 추가
2. 컨테이너 구조 변경 (flex 레이아웃)
3. 빈 슬롯 숨김 스타일 추가

**변경 후 구조**:
```html
<div class="callout">
  <div class="callout-icon"><slot name="icon"></slot></div>
  <div class="callout-content"><slot></slot></div>
</div>
```

---

### 1.3 tc-divider.ts - text prop 추가

**파일**: `packages/ui-components/src/primitives/tc-divider.ts`

**작업 내용**:
1. `text` prop 추가
2. 조건부 렌더링 (text 있을 때: 선-텍스트-선 구조)
3. 스타일 확장

**변경 후 구조** (text가 있을 때):
```html
<div class="divider-container">
  <hr class="divider-line" />
  <span class="divider-text">${this.text}</span>
  <hr class="divider-line" />
</div>
```

---

### 1.4 tc-icon.ts - 누락 아이콘 추가

**파일**: `packages/ui-components/src/primitives/tc-icon.ts`

**현재 아이콘 (20개)**: arrow-left, arrow-right, check, x, close, chevron-right, chevron-left, error, alert-circle, info, warning, loading, loader, biometric, email, passkey, bell, download, wifi-off

**styled-icon 아이콘 (23개)**: biometric, apple, google, windows, samsung, email, phone, passkey, check, close, arrow_back, error, info, warning, success, lock, person, device, totp, email_otp, qrcode, key

**추가 필요 아이콘 (13개)**:
| 아이콘명 | 출처 | 비고 |
|---------|------|------|
| apple | styled-icon | 브랜드 로고 (Lucide 없음) |
| google | styled-icon | 브랜드 로고 (Lucide 없음) |
| windows | styled-icon | 브랜드 로고 (Lucide 없음) |
| samsung | styled-icon | 브랜드 로고 (Lucide 없음) |
| phone | Lucide | `phone` 아이콘 |
| success | Lucide | `check-circle` 아이콘 |
| lock | Lucide | `lock` 아이콘 |
| person | Lucide | `user` 아이콘 |
| device | Lucide | `smartphone` 아이콘 |
| totp | Lucide | `timer` 아이콘 |
| email-otp | Lucide | `mail-check` 아이콘 |
| qrcode | Lucide | `qr-code` 아이콘 |
| key | Lucide | `key` 아이콘 |

**아이콘 출처 정책**:
- Lucide 아이콘 우선 사용 (https://lucide.dev)
- 브랜드 로고 등 Lucide에 없는 경우만 styled-icon에서 복사

**작업 내용**:
1. `IconName` 타입에 13개 아이콘 추가
2. `icons` 객체에 SVG 추가 (Lucide 우선, 없으면 styled-icon)

---

## Part 2: npm publish 준비 체크

### 2.1 design-tokens 패키지 ✅ 준비 완료

| 항목 | 상태 |
|------|------|
| private | ✅ false |
| author | ✅ "Transcodes" |
| license | ✅ "MIT" |
| repository | ✅ 설정됨 |
| files | ✅ ["build/", "README.md"] |
| publishConfig | ✅ { "access": "public" } |
| LICENSE 파일 | ✅ 존재 |
| README.md | ✅ 존재 |

### 2.2 ui-components 패키지 ❌ 수정 필요

**package.json 추가 필요 필드**:
```json
{
  "private": false,
  "author": "Transcodes",
  "license": "MIT",
  "repository": {
    "type": "git",
    "url": "https://github.com/transcodes/transcodes-ui.git",
    "directory": "packages/ui-components"
  },
  "files": ["src/", "README.md"],
  "publishConfig": {
    "access": "public"
  }
}
```

**LICENSE 파일**: design-tokens에서 복사

---

## 실행 순서

### Step 1: 컴포넌트 확장
1. [ ] tc-input.ts - keydown/paste 이벤트
2. [ ] tc-callout.ts - icon 슬롯
3. [ ] tc-divider.ts - text prop
4. [ ] tc-icon.ts - 13개 아이콘 추가

### Step 2: npm publish 준비
5. [ ] ui-components/package.json 메타데이터 추가
6. [ ] ui-components/LICENSE 파일 생성

### Step 3: 검증
7. [ ] `bun run build` 실행하여 빌드 확인
8. [ ] Storybook에서 변경사항 확인

---

## Critical Files

**수정 대상**:
- `packages/ui-components/src/primitives/tc-input.ts`
- `packages/ui-components/src/primitives/tc-callout.ts`
- `packages/ui-components/src/primitives/tc-divider.ts`
- `packages/ui-components/src/primitives/tc-icon.ts`
- `packages/ui-components/package.json`

**생성 대상**:
- `packages/ui-components/LICENSE`

**참조용**:
- `packages/ui-components/src/primitives/tc-otp-input.ts` (이벤트 패턴)
- `packages/ui-components/src/primitives/tc-item.ts` (슬롯 패턴)
- `transcode-backend-nestjs-v1/src/toolkit/template/modules/auth/widget/common/base/styled-icon.ts` (아이콘 SVG)
