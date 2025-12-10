# transcodes-ui

Turborepo monorepo for Transcodes UI packages.

## Packages

| Package | Description | Version |
|---------|-------------|---------|
| [@transcodes/design-tokens](./packages/design-tokens) | Design tokens with dark mode support | 0.1.0 |
| [@transcodes/ui-components](./packages/ui-components) | Lit 3.x component library | 0.1.0 |

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
| `bun run dev` | Start Storybook dev server |
| `bun run clean` | Clean all build outputs |
| `bun run lint` | Lint all packages |
| `bun run format` | Format all files with Biome |
| `bun run check` | Check linting and formatting |

## Package Dependencies

```
ui-components
    └── design-tokens
```

`ui-components` depends on `design-tokens`, so Turborepo automatically builds `design-tokens` first.

## Development

Each package can be developed independently:

```bash
# Build only design-tokens
turbo run build --filter=@transcodes/design-tokens

# Build only ui-components
turbo run build --filter=@transcodes/ui-components
```

## Publishing

Each package is published independently to npm:

```bash
cd packages/design-tokens && npm publish
cd packages/ui-components && npm publish
```

## License

MIT
