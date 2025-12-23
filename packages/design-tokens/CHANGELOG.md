# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [0.4.3] - 2025-12-23

### Changed

- 빌드 파일 최신화를 위한 재배포 (코드 변경 없음)

## [0.4.0] - 2025-12-17

### Changed

- 버전 동기화: ui-components와 버전 통일 (코드 변경 없음)

## [0.3.6] - 2025-12-17

### Added

- 다크모드 토큰 대폭 확장 (21→58개): alpha, accent, semantic, error 토큰 추가
- Utopia 스타일 fluid 토큰: `space-xs-sm`, `space-sm-md`, `space-md-lg`, `space-lg-xl` pair 토큰
- 새 사이즈 토큰: `size-icon-action`, `size-screen-icon-fluid`, `size-decoration-blob`
- 애니메이션 오프셋 토큰: `offset-slide-up-sm`, `offset-slide-up-md`
- 모달 토큰: `modal-max-width-sm/md/lg/fluid`, `modal-min-height`
- Focus ring 토큰: `shadow-focus-ring-width`
- Alpha 색상 확장: `alpha-onAccent`, `alpha-onAccentMuted`, `alpha-black15/30/90`

### Fixed

- 다크모드 대비 문제 수정: accent 배경 텍스트, showcase 페이지
- shadow colors 다크모드 오버라이드 불필요 항목 제거

## [0.3.5] - 2025-12-11

### Changed

- 버전 동기화: ui-components와 버전 통일 (코드 변경 없음)

## [0.3.4] - 2025-12-11

### Changed

- **BREAKING**: 다크모드를 수동 제어만 지원하도록 변경
  - `prefers-color-scheme` 자동 감지 제거
  - `[data-theme="dark"]` 수동 제어만 사용
  - tokens-dark.css 용량 73.7% 감소 (2.0KB → 0.5KB)

## [0.3.3] - 2025-12-11

### Changed

- 버전 동기화: ui-components와 버전 통일 (코드 변경 없음)

## [0.3.2] - 2025-12-11

### Changed

- 버전 동기화: ui-components와 버전 통일 (코드 변경 없음)

## [0.3.1] - 2025-12-11

### Added

- CSS auto-import: `import '@transcodes/design-tokens'`로 CSS 자동 로드 (하위 호환성 복구)
- 다크모드 dual selector 지원: `prefers-color-scheme` 자동 감지 + `data-theme` 수동 오버라이드
- CSS minification: lightningcss 기반 압축 (평균 45% 용량 감소)

### Changed

- 다크모드 CSS 선택자 개선: `@media (prefers-color-scheme: dark) { :root:not([data-theme="light"]) }` + `[data-theme="dark"]`
- package.json에 `sideEffects` 필드 추가로 번들러 최적화 지원

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
