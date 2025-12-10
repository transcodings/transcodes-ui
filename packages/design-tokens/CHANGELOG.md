# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [0.3.0] - 2025-12-11

### Added

- JS main export 추가 (`index.js`, `index.d.ts`) - ESBuild 등 번들러 호환성 개선
- `tokens` 객체 export (camelCase 키)
- `cssVars` 객체 export (CSS 변수명 키)
- 버튼 시맨틱 토큰: `--button-dark`, `--button-dark-hover`, `--button-light`, `--button-light-hover`
- 시맨틱 배경 토큰: `--semantic-warning-bg`, `--semantic-warning-light`, `--semantic-success-bg`, `--semantic-info-bg`

### Changed

- package.json exports 구조 개선: main export를 CSS에서 JS로 변경
- CSS import 경로 변경: `@transcodes/design-tokens` → `@transcodes/design-tokens/css`

## [0.2.0] - 2025-12-10

### Changed

- Bun native API로 빌드 스크립트 전환 (빌드 성능 개선)

## [0.1.0] - 2025-12-10

### Added

- Initial release of design tokens
- CSS custom properties for colors, typography, spacing, shadows, and borders
- Dark mode support via `[data-theme="dark"]` selector
- TypeScript type definitions (`tokens.d.ts`)
- Component CSS classes (`.button`, `.input`, `.notice`, `.field-group`, etc.)
- WCAG AA compliant color contrast ratios (4.5:1+)
- DTCG standard compliant token format (`$value`, `$type`)
