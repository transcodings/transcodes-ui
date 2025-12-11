# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [0.3.4] - 2025-12-11

### Changed

- design-tokens 버전 동기화: ^0.3.4 (다크모드 수동 제어만 지원)

## [0.3.3] - 2025-12-11

### Fixed

- **CRITICAL**: `sideEffects: false` 설정으로 웹 컴포넌트가 등록되지 않는 문제 수정
  - `sideEffects: ["dist/**/*.js"]`로 변경하여 `customElements.define()` 부작용 보존
  - esbuild 경고 해결: "Ignoring this import because ... was marked as having no side effects"

## [0.3.2] - 2025-12-11

### Fixed

- Vite 빌드 설정: multiple entries 추가로 하위 폴더 index.js 파일 생성
- package.json exports의 실제 파일 경로 문제 해결

## [0.3.1] - 2025-12-11

### Added

- Tree-shaking 지원: preserveModules 빌드로 사용하는 컴포넌트만 번들에 포함
- package.json exports 개선: 계층별 subpath exports 추가 (`/primitives`, `/widgets`, `/screens`, `/controllers`)
- esbuild minification 및 적극적 tree-shaking 설정

### Changed

- design-tokens CSS import 제거 (design-tokens에서 자동 로드)
- package.json `sideEffects: false` 설정으로 더 나은 tree-shaking 지원
- Vite 빌드 최적화: constBindings, compact, es2020 target

### Fixed

- vite.config.ts 타입 에러 수정: esbuild 옵션을 최상위 레벨로 이동

## [0.3.0] - 2025-12-11

### Added

- **tc-error-message**: 에러/경고/정보 메시지 컴포넌트 (tc-callout 래퍼)
- **tc-input-with-chip**: 칩 인디케이터가 붙은 입력 필드
- **tc-authenticator-card**: 인증기 정보 카드 (passkey, TOTP, USB 등)
- 누락된 primitives 스토리 추가 (tc-item, tc-item-button, tc-symbol, tc-toast)
- 스크린 컴포넌트에 FlexibleHeight 스토리 추가

### Changed

- 스크린 컴포넌트 `min-height` 개선: `100vh/100dvh` → `inherit` (유연한 컨테이너 크기 지원)
- design-tokens import 경로 변경: `@transcodes/design-tokens/css` 사용
- Stories 폴더 구조 재편성 (primitives, widgets, screens, controllers 분리)

### Fixed

- Vercel 배포를 위한 public/ 폴더 구조 수정

## [0.2.0] - 2025-12-10

### Added

- npm publish 준비 완료 (package.json 메타데이터, README 개선)
- Storybook 개선 및 design-tokens 통합
- tc-callout: `icon` 슬롯 추가, CSS parts 확장 (icon, content)
- tc-divider: `text` prop 추가 (텍스트 구분선 지원)
- tc-icon: 브랜드/인증 아이콘 추가 (apple, google, windows, samsung, totp, qrcode 등)
- tc-input: `tc-keydown`, `tc-paste` 이벤트 추가

### Fixed

- Storybook 빌드 시 vite-plugin-dts 비활성화 문제 해결
- Vercel 빌드 시 workspace 의존성 해결

## [0.1.0] - 2025-12-10

### Added

- Initial release of Lit 3.x component library
- **Primitives**: tc-button, tc-input, tc-text, tc-icon, tc-divider, tc-callout, tc-chip, tc-spinner, tc-otp-input, tc-box, tc-container, tc-item, tc-item-button
- **Widgets**: tc-modal, tc-fab, tc-toast, tc-floating-button
- **Controllers**: BaseController, MatchMediaController, FormSubmissionController
- tc-input: `tc-keydown`, `tc-paste` events
- tc-callout: `icon` named slot
- tc-divider: `text` prop for divider with text
- tc-icon: 32 icons including brand icons (apple, google, windows, samsung)
- Storybook documentation
- Vercel deployment support
- TypeScript type definitions
