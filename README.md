# transcodes-ui

Turborepo monorepo for Transcodes UI packages.

## Packages

| Package | Description | Status |
|---------|-------------|--------|
| [@transcodes/design-tokens](./packages/design-tokens) | Style Dictionary 기반 디자인 토큰 (다크 모드 지원) | npm publish 준비 완료 |
| [@transcodes/ui-components](./packages/ui-components) | Lit 3.x 웹 컴포넌트 라이브러리 | 개발 중 |

## Getting Started

```bash
# Install dependencies
bun install

# Build all packages
bun run build

# Run Storybook (ui-components)
bun run dev
```

## Scripts

| Command | Description |
|---------|-------------|
| `bun run build` | Build all packages (design-tokens → ui-components) |
| `bun run dev` | Start Storybook dev server (port 6006) |
| `bun run clean` | Clean all build outputs |
| `bun run lint` | Lint all packages |
| `bun run format` | Format all files with Biome |
| `bun run check` | Check linting and formatting |

## Architecture

```
transcodes-ui/
├── packages/
│   ├── design-tokens/     # CSS 변수, 컴포넌트 CSS 클래스
│   └── ui-components/     # tc-button, tc-input 등 웹 컴포넌트
```

**의존 관계**:
```
ui-components → design-tokens
```

Turborepo가 자동으로 design-tokens를 먼저 빌드합니다.

## Development

개별 패키지 빌드:

```bash
turbo run build --filter=@transcodes/design-tokens
turbo run build --filter=@transcodes/ui-components
```

## Publishing

각 패키지는 npm에 독립적으로 배포됩니다:

```bash
# design-tokens 먼저 배포
cd packages/design-tokens && npm publish --access public

# 그 다음 ui-components 배포
cd packages/ui-components && npm publish --access public
```

## License

MIT
