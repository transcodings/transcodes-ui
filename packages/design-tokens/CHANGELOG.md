# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

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
