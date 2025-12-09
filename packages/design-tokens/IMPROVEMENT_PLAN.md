# @transcodes/design-tokens 종합 개선 계획

## 생태계 개요

```
nestjs-v1/src/toolkit (원본)
    └── styled-* 컴포넌트 15개, PasskeyManager WebAuthn SDK
         ↓ 디자인 추출
universal-callback (영감)
    └── "Ink and Paper" 디자인 메타포 정의
         ↓ 토큰화
tc-design-tokens (현재 프로젝트)
    └── Style Dictionary 기반 디자인 토큰
         ↓ npm 패키지
tc-ui-components (소비자)
    └── Lit 3 웹 컴포넌트 라이브러리
```

## Ink and Paper 디자인 메타포

- **Ink**: 텍스트/전경 색상 (ink-primary, ink-secondary, ink-tertiary, ink-disabled)
- **Paper**: 배경 색상 (paper-primary, paper-secondary, paper-tertiary)
- **Accent**: 브랜드 강조 색상 (primary #6b4fd9, success #357a46)

---

## Phase 1: 토큰 완성도 강화

### 1.1 DTCG 표준 완전 준수 ✅ 완료
**파일**: `tokens/**/*.json`

모든 토큰에 `$type` 속성 추가:
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

**$type 매핑**:
- color/*.json → `"$type": "color"` ✅
- typography/*.json → `"$type": "fontFamily"`, `"$type": "dimension"` ✅
- spacing.json → `"$type": "dimension"` ✅
- radius.json → `"$type": "dimension"` ✅
- transition.json → `"$type": "transition"` ✅

### 1.2 누락된 토큰 추가 ✅ 완료

- [x] **tokens/color/semantic.json** - warning, info (WCAG AA 준수)
- [x] **tokens/layout/z-index.json** - dropdown~tooltip
- [x] **tokens/layout/breakpoint.json** - sm, md, lg, xl, 2xl
- [x] **tokens/typography/line-height.json** - tight, normal, relaxed
- [x] **tokens/spacing/fixed-space.json** - 1px, 2px, 4px, 8px (추가)

### 1.3 Ink 효과 애니메이션 토큰화 ✅ 완료

**tokens/animation/ink-effect.json** 생성 완료

---

## Phase 2: 테마 시스템 ✅ 완료

### 2.1 다크 모드 지원 ✅ 완료

- [x] **sd.config.ts** 수정 - 테마별 빌드
- [x] **sd.config.dark.ts** 생성 - 다크 테마 전용 빌드
- [x] **tokens/themes/dark.json** 생성

선택자 구조:
- `:root, [data-theme="light"]` - 라이트 테마
- `[data-theme="dark"]` - 다크 테마

### 2.2 브랜딩 토큰 분리 ✅ 완료

**tokens/brand/transcodes.json** 생성 완료

---

## Phase 3: 컴포넌트 CSS 개선

### 3.1 css/components 포맷 토큰 참조로 변환 ✅ 완료

- [x] **config/formats/css-components.ts** 모듈화
- [x] var() 참조 사용 (하드코딩 제거)

### 3.2 tc-ui-components 호환성 ⏳ 대기

tc-ui-components의 하드코딩된 `tokens.css`를 npm 패키지로 대체:
```typescript
// tc-ui-components/src/styles/tokens.ts
import '@transcodes/design-tokens';
import '@transcodes/design-tokens/components.css';
```

> npm publish 후 진행

---

## Phase 4: 배포 및 통합

### 4.1 npm 패키지 설정 ✅ 완료

**package.json** 업데이트:
```json
{
  "name": "@transcodes/design-tokens",
  "version": "0.1.0",
  "private": false,
  "publishConfig": {
    "access": "public"
  },
  "exports": {
    ".": "./build/tokens.css",
    "./tokens.css": "./build/tokens.css",
    "./tokens-dark.css": "./build/tokens-dark.css",
    "./components.css": "./build/components.css",
    "./types": "./build/tokens.d.ts",
    "./json": "./build/tokens.json"
  },
  "files": ["build/", "README.md"]
}
```

### 4.2 CI/CD 파이프라인 ❌ 미완료

**.github/workflows/publish.yml** (필요시 생성):
- 버전 태그 시 npm 자동 배포
- build 검증

---

## 추가 완료 작업

### WCAG AA 접근성 ✅ 완료

모든 주요 색상 4.5:1+ 대비율 준수:
- accent-primary: #7c5cff → #6b4fd9
- accent-success: #3d8a50 → #357a46
- semantic-warning: #d97706 → #b45309
- semantic-info: #0284c7 → #0369a1

### 모듈화된 설정 구조 ✅ 완료

```
config/
├── transforms/
│   ├── name-kebab-flat.ts
│   └── name-camel-flat.ts
└── formats/
    └── css-components.ts
```

### showcase.html 동적 대비율 ✅ 완료

JavaScript 실시간 WCAG 대비율 계산 및 Pass/Fail 표시

---

## Critical Files

| 파일 | 상태 |
|------|------|
| `sd.config.ts` | ✅ 완료 |
| `sd.config.dark.ts` | ✅ 완료 |
| `tokens/**/*.json` | ✅ $type 추가 완료 |
| `tokens/color/semantic.json` | ✅ 생성 완료 |
| `tokens/layout/z-index.json` | ✅ 생성 완료 |
| `tokens/layout/breakpoint.json` | ✅ 생성 완료 |
| `tokens/typography/line-height.json` | ✅ 생성 완료 |
| `tokens/animation/ink-effect.json` | ✅ 생성 완료 |
| `tokens/themes/dark.json` | ✅ 생성 완료 |
| `tokens/brand/transcodes.json` | ✅ 생성 완료 |
| `package.json` | ✅ exports, publishConfig 완료 |
| `README.md` | ✅ 문서화 완료 |

---

## 진행 상태

| Phase | 상태 | 완료율 |
|-------|------|--------|
| Phase 1: 토큰 완성도 | ✅ 완료 | 100% |
| Phase 2: 테마 시스템 | ✅ 완료 | 100% |
| Phase 3: 컴포넌트 CSS | ⚠️ 부분 완료 | 90% |
| Phase 4: 배포 | ⏳ 대기 | 80% |

**다음 단계**: `npm publish --access public` 실행
