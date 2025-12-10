# transcodes-ui → nestjs-v1/toolkit 마이그레이션 분석 및 계획

> 분석 일자: 2025-12-10

## 1. 핵심 결론

### 충돌 분석: 없음 ✅
- 컴포넌트 이름: `tc-*` vs `styled-*` (충돌 없음)
- CSS 변수: toolkit은 하드코딩, transcodes-ui는 토큰 사용 (충돌 없음)
- Lit 버전: 3.2.0 vs 3.3.1 (호환됨)

### npm publish: 둘 다 필요 ⚠️
1. `@transcodes/design-tokens` 먼저 publish
2. ui-components의 `workspace:*` → `^0.1.0` 변경
3. `@transcodes/ui-components` publish

---

## 2. 컴포넌트 매핑 분석

### 직접 대응 가능 (10개)

| styled-* | tc-* | 호환성 | 주요 차이 |
|----------|------|--------|----------|
| styled-button | tc-button | 높음 | variant prop, tc-click 이벤트 |
| styled-input | tc-input | 높음 | **keydown/paste 이벤트 부재** |
| styled-text | tc-text | 높음 | size/weight/color props |
| styled-container | tc-container | 매우 높음 | wide prop 추가 |
| styled-box | tc-box | 매우 높음 | 거의 동일 |
| styled-callout | tc-callout | 중간 | **아이콘 슬롯 부재** |
| styled-chip | tc-chip | 중간 | variant/size props |
| styled-spinner | tc-spinner | 중간 | MatchMediaController 사용 |
| styled-divider | tc-divider | 낮음 | **text prop 부재** |
| styled-icon | tc-icon | 중간 | **누락 아이콘 다수** |

### transcodes-ui에 부재 (4개)

| styled-* | 대체 방안 |
|----------|----------|
| styled-section | tc-box + flex sx |
| styled-item | tc-item 존재 (selected prop 부재) |
| styled-item-button | tc-item-button 존재 |
| styled-toast | tc-toast 확인 필요 |

---

## 3. transcodes-ui 확장 필요 사항

### 필수 추가 기능
1. **tc-input**: `keydown`, `paste` 이벤트 추가
2. **tc-callout**: 아이콘 슬롯 추가
3. **tc-divider**: `text` prop 추가
4. **tc-icon**: 누락 아이콘 추가
   - apple, google, samsung, windows
   - phone, totp, email_otp, qrcode, key, lock
   - person, device, success, warning

### 선택적 추가
- **tc-item**: `selected` prop 추가
- **tc-section**: 신규 컴포넌트 또는 문서화

---

## 4. 하드코딩 → design-tokens 매핑

| 하드코딩 | 용도 | design-token |
|----------|------|--------------|
| `#007bff` | Primary | `--accent-primary` |
| `#f44336` | Error | `--error-base` |
| `#333` | Text Primary | `--ink-black` |
| `#666` | Text Secondary | `--ink-dark` |
| `#999` | Text Tertiary | `--ink-light` |
| `#e0e0e0` | Border | `--ink-faint` |
| `#f5f5f5` | Background Light | `--paper-cream` |

---

## 5. 권장 마이그레이션 전략: 점진적 교체

### Phase 0: 준비 (npm publish)
1. design-tokens npm publish
2. ui-components package.json 수정 후 npm publish
3. nestjs-v1에 의존성 추가

### Phase 1: 인프라 구축
- toolkit에 design-tokens CSS 주입
- CSS 변수 브릿지 생성 (`--auth-*` → design-tokens)

### Phase 2: 핵심 컴포넌트 (우선순위 순)
1. tc-button (가장 많이 사용)
2. tc-text (광범위 사용)
3. tc-input (폼 핵심)

### Phase 3: 레이아웃 컴포넌트
- tc-container, tc-box

### Phase 4: 피드백 컴포넌트
- tc-callout, tc-spinner, tc-chip, tc-divider

### Phase 5: 특수 컴포넌트 및 정리
- tc-icon (아이콘 추가 후)
- tc-item, tc-item-button
- 레거시 styled-* 삭제

---

## 6. 다크 테마 지원

```html
<!-- 루트 요소에 data-theme 속성 -->
<html data-theme="dark">
```

```typescript
// 시스템 설정 감지
const prefersDark = window.matchMedia('(prefers-color-scheme: dark)');
document.documentElement.setAttribute('data-theme',
  prefersDark.matches ? 'dark' : 'light'
);
```

---

## 7. Critical Files

### transcodes-ui (수정 대상)
- `packages/ui-components/src/primitives/tc-input.ts` - 이벤트 추가
- `packages/ui-components/src/primitives/tc-icon.ts` - 아이콘 추가
- `packages/ui-components/src/primitives/tc-callout.ts` - 슬롯 추가
- `packages/ui-components/src/primitives/tc-divider.ts` - text prop 추가

### nestjs-v1 toolkit (참조)
- `src/toolkit/template/modules/auth/widget/common/base/styled-button.ts`
- `src/toolkit/template/modules/auth/widget/common/base/styled-input.ts`
- `src/toolkit/template/modules/auth/widget/common/base/styled-icon.ts`
- `src/toolkit/template/modules/auth/widget/common/base/BASE_COMPONENTS_USAGE.md`

---

## 8. 마이그레이션 예시

```typescript
// Before (styled-*)
<styled-button
  .sx=${{ backgroundColor: '#007bff' }}
  @click=${handler}
>Submit</styled-button>

// After (tc-*)
<tc-button
  variant="primary"
  @tc-click=${handler}
>Submit</tc-button>
```

```typescript
// Before
<styled-input
  label="Email"
  @input-keydown=${handleKeydown}
></styled-input>

// After (tc-input에 keydown 추가 후)
<tc-input
  label="Email"
  @tc-keydown=${handleKeydown}
></tc-input>
```
