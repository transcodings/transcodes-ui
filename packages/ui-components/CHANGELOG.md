# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

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
