# transcodes-ui-components 개선 로드맵

> 작성일: 2025-12-10
> 상태: tc-design-tokens npm publish 대기 중

## 워크스페이스 간 관계

```
┌─────────────────────────────────────────────────────────────────────┐
│                    @transcodes/design-tokens                        │
│                   (디자인 토큰 소스 of truth)                         │
│  - 60+ 토큰 (color, spacing, typography, shadow, component)         │
│  - Style Dictionary 빌드 → CSS/TS/Components.css                    │
└──────────────────────────────┬──────────────────────────────────────┘
                               │ npm import
                               ▼
┌─────────────────────────────────────────────────────────────────────┐
│                    @transcodes/ui-components                        │
│                   (Lit 웹 컴포넌트 라이브러리)                         │
│  - Primitives, Widgets, Screens, Controllers                        │
│  - 현재: 자체 tokens.css (→ tc-design-tokens로 마이그레이션 필요)     │
└──────────────────────────────┬──────────────────────────────────────┘
                               │ npm import
                               ▼
┌─────────────────────────────────────────────────────────────────────┐
│              transcode-backend-nestjs-v1/src/toolkit                │
│                   (비즈니스 로직 + 모달 시스템)                        │
│  - BaseModal, Router, GenericStore, TranscodesContextMixin          │
│  - 현재: styled-* 컴포넌트 (→ transcodes-ui-components로 교체 필요)   │
└─────────────────────────────────────────────────────────────────────┘
```

---

## 블로커

- [x] `@transcodes/design-tokens` npm publish 준비 완료
  - ~~현재 `private: true` 상태~~
  - `private: false` 변경 완료 ✅
  - README.md 문서화 완료 ✅
  - **npm publish 실행 대기 중**

- [ ] `@transcodes/ui-components` npm publish 필요
  - toolkit에서 import하려면 publish 필요
  - Phase 1 완료 후 진행

---

## Phase 0: npm publish 준비 (ui-components)

### 체크리스트

1. **package.json 수정**
   ```json
   {
     "private": false,
     "version": "0.1.0",
     "files": ["dist", "src", "README.md"],
     "main": "./dist/index.js",
     "module": "./dist/index.js",
     "types": "./dist/index.d.ts",
     "exports": {
       ".": {
         "types": "./dist/index.d.ts",
         "import": "./dist/index.js"
       },
       "./primitives": {
         "types": "./dist/primitives/index.d.ts",
         "import": "./dist/primitives/index.js"
       },
       "./widgets": {
         "types": "./dist/widgets/index.d.ts",
         "import": "./dist/widgets/index.js"
       },
       "./screens": {
         "types": "./dist/screens/index.d.ts",
         "import": "./dist/screens/index.js"
       },
       "./controllers": {
         "types": "./dist/controllers/index.d.ts",
         "import": "./dist/controllers/index.js"
       },
       "./styles/*": "./dist/styles/*"
     },
     "peerDependencies": {
       "lit": "^3.0.0"
     }
   }
   ```

2. **빌드 설정 확인**
   - `vite.config.ts`에서 library mode 설정
   - TypeScript declaration 파일 생성 확인

3. **LICENSE 파일 추가** (MIT 권장)

4. **README.md 업데이트**
   - 설치 방법
   - 사용 예시
   - API 문서 링크

5. **npm publish**
   ```bash
   bun run build
   npm publish --access public
   ```

---

## Phase 1: 토큰 시스템 통합

**전제조건**: @transcodes/design-tokens npm publish 완료

### 작업 항목

1. transcodes-ui-components에 의존성 추가
   ```bash
   bun add @transcodes/design-tokens
   ```

2. `src/styles/tokens.css` 삭제

3. `src/index.ts`에서 import 변경
   ```typescript
   import '@transcodes/design-tokens/tokens.css';
   ```

4. 누락된 토큰 확인 및 tc-design-tokens에 추가 요청
   - 현재 확인된 누락: 없음 (`--shadow-otp-cell-focus`는 tc-design-tokens에 존재)

---

## Phase 2: 테스트 인프라 구축

### 작업 항목

1. Vitest + @open-wc/testing 설치
   ```bash
   bun add -D vitest @open-wc/testing @vitest/browser
   ```

2. 테스트 설정 파일 생성 (`vitest.config.ts`)

3. 주요 컴포넌트별 테스트 작성
   - `tc-button` 테스트
   - `tc-input` 테스트
   - `tc-otp-input` 테스트
   - Controllers 테스트

4. CI 파이프라인에 테스트 추가

---

## Phase 3: Responsive 유틸리티 추가

### 참고: toolkit 패턴

```typescript
// toolkit/template/utils/responsive.ts
export class Responsive {
  static readonly BREAKPOINTS = {
    MOBILE_MAX: 767,
    TABLET_MIN: 768,
    DESKTOP_MIN: 768,
  };

  static isMobile = (): boolean => window.innerWidth <= BREAKPOINTS.MOBILE_MAX;
  static subscribe = (callback): (() => void) => { ... };
}
```

### 작업 항목

1. `src/utils/responsive.ts` 생성
2. `MatchMediaController` 확장하여 통합
3. 위젯에서 반응형 레이아웃 적용

---

## Phase 4: a11y 테스트 활성화

### 작업 항목

1. `.storybook/main.ts`에서 addon-a11y 설정 확인
2. 각 스토리에 a11y 규칙 적용
3. CI에서 a11y 검사 자동화

---

## Phase 5: 애니메이션 시스템 확장

### 참고: universal-callback 애니메이션

- `fadeInUp` - 600ms
- `slideDown` / `slideUp` - 300-500ms
- `inkFloat` / `inkDrift` - 8-14s 무한
- `digitPop` - 200ms (OTP 셀)
- `shake` - 400ms (에러)
- `iconPulse` - 2-2.5s 무한

### 작업 항목

1. `src/styles/animations.css` 생성
2. `AnimationController` 확장
3. 컴포넌트에 애니메이션 적용

---

## Phase 6: 보안 및 품질 개선

### 작업 항목

1. **tc-text XSS 방어**
   - `unsafeStatic` 사용 시 허용 태그 화이트리스트 검증
   - 파일: `src/primitives/tc-text.ts:43`

2. **CSS Parts 표준화**
   - toolkit과 일관된 part 네이밍 컨벤션 적용

---

## Phase 7: toolkit 마이그레이션 (nestjs-v1)

### 전제조건
- `@transcodes/design-tokens` npm publish 완료
- `@transcodes/ui-components` npm publish 완료

### 마이그레이션 전략

```
┌─────────────────────────────────────────────────────────────────┐
│                        마이그레이션 레이어                        │
├─────────────────────────────────────────────────────────────────┤
│  Layer 1: Primitives (쉬움)                                     │
│  ─────────────────────────────                                  │
│  styled-button → tc-button                                      │
│  styled-input → tc-input                                        │
│  styled-text → tc-text                                          │
│  styled-box/container/section → tc-box/container/section        │
│                                                                 │
│  Layer 2: Widgets (중간)                                        │
│  ─────────────────────────────                                  │
│  toolkit에서 tc-notification-modal, tc-offline-modal 등 직접 사용 │
│                                                                 │
│  Layer 3: BaseModal 유지 (어려움 → 유지)                         │
│  ─────────────────────────────                                  │
│  BaseModal, Router, Store는 toolkit에 유지                       │
│  → 비즈니스 로직과 강하게 결합되어 있음                            │
│  → transcodes-ui-components의 primitives만 import해서 사용       │
└─────────────────────────────────────────────────────────────────┘
```

### 작업 단계

#### Step 1: 의존성 추가 (toolkit)
```bash
# nestjs-v1/package.json
bun add @transcodes/design-tokens @transcodes/ui-components
```

#### Step 2: 토큰 import 변경
```typescript
// 기존: 자체 CSS 변수 사용
// 변경: @transcodes/design-tokens import
import '@transcodes/design-tokens/tokens.css';
```

#### Step 3: Primitives 점진적 교체

**Phase A: 신규 코드에 적용**
- 새로 작성하는 화면에서 tc-* 사용
- 기존 styled-* 코드는 당분간 유지

**Phase B: 기존 코드 마이그레이션**
```typescript
// Before
import '../common/base/styled-button.js';
html`<styled-button .sx=${{...}}>Click</styled-button>`

// After
import '@transcodes/ui-components/primitives';
html`<tc-button .sx=${{...}}>Click</tc-button>`
```

#### Step 4: styled-* 파일 삭제
- 모든 참조가 tc-*로 변경된 후
- `src/toolkit/template/modules/auth/widget/common/base/` 디렉토리 삭제

### 호환성 체크리스트

| 기능 | styled-* | tc-* | 호환 |
|------|----------|------|------|
| sx prop | ✅ | ✅ | ✅ |
| disabled | ✅ | ✅ | ✅ |
| loading | ✅ | ✅ | ✅ |
| variant | ✅ | ✅ | ✅ |
| Custom Events | `click` | `tc-click` | ⚠️ 변경 필요 |
| CSS Parts | 일부 | 전체 | ✅ |
| Slots | ✅ | ✅ | ✅ |

### 이벤트 핸들러 마이그레이션

```typescript
// Before
@click=${this.handleClick}

// After
@tc-click=${this.handleClick}
```

### 예상 작업량

| 레이어 | 파일 수 | 난이도 | 예상 시간 |
|--------|---------|--------|----------|
| Primitives | ~20개 | 쉬움 | 2-3시간 |
| Widgets | ~5개 | 중간 | 1-2시간 |
| BaseModal | 유지 | - | - |

---

## 나중에 (Phase 8+)

- [ ] FormAssociated 구현 (`tc-input`, `tc-otp-input`)
- [ ] i18n 지원 (lit-localize)
- [ ] BaseModal을 transcodes-ui-components로 추출 (선택사항)

---

## 컴포넌트 매핑 테이블 (toolkit → transcodes-ui-components)

| toolkit (styled-*) | transcodes-ui-components (tc-*) | 상태 |
|--------------------|-------------------------|------|
| styled-button | tc-button | ✅ 호환 |
| styled-input | tc-input | ✅ 호환 |
| styled-container | tc-container | ✅ 호환 |
| styled-section | tc-section | ✅ 호환 |
| styled-box | tc-box | ✅ 호환 |
| styled-text | tc-text | ✅ 호환 |
| styled-toast | tc-toast | ✅ 호환 |
| base-modal | (별도 구현 필요) | ⚠️ 미구현 |

---

## 참고 파일 경로

### toolkit (nestjs-v1)
- `/src/toolkit/template/modules/auth/widget/common/base-modal.ts`
- `/src/toolkit/template/modules/auth/widget/common/base/styled-*.ts`
- `/src/toolkit/template/modules/store/index.ts`
- `/src/toolkit/template/utils/responsive.ts`

### universal-callback
- `/src/style.global.css` - 디자인 토큰
- `/src/components/` - UI 컴포넌트
- CSS 애니메이션 패턴

### tc-design-tokens
- `/tokens/` - 소스 토큰 (JSON)
- `/build/` - 빌드 결과물 (CSS, TS, Components.css)
- `/sd.config.ts` - Style Dictionary 설정
