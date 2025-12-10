# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

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
