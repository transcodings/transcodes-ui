import path from 'node:path';
import { fileURLToPath } from 'node:url';
import type { Alias } from 'vite';
import { defineConfig } from 'vite';
import dts from 'vite-plugin-dts';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

/**
 * Storybook vs Library 빌드 분기
 *
 * 이 분기는 필수입니다. viteFinal에서 오버라이드해도 lib 모드의
 * entry points, output 형식 등이 Storybook 빌드를 방해하기 때문입니다.
 *
 * - Storybook: 애플리케이션 빌드 (모든 의존성 번들링)
 * - Library: npm 배포용 빌드 (외부 의존성 external)
 */
const isStorybook = process.argv[1]?.includes('storybook');

// ─────────────────────────────────────────────────────────────────────────────
// Library Build Config (npm 배포용)
// ─────────────────────────────────────────────────────────────────────────────
const libBuildConfig = isStorybook
  ? {}
  : {
      lib: {
        entry: {
          index: 'src/index.ts',
          'primitives/index': 'src/primitives/index.ts',
          'widgets/index': 'src/widgets/index.ts',
          'screens/index': 'src/screens/index.ts',
          'controllers/index': 'src/controllers/index.ts',
        },
        formats: ['es'] as ['es'],
      },
      rollupOptions: {
        output: {
          preserveModules: true,
          preserveModulesRoot: 'src',
          entryFileNames: '[name].js',
          generatedCode: { constBindings: true },
          compact: true,
        },
        external: ['lit', /^lit\//, /@transcodes\/design-tokens/],
        treeshake: {
          moduleSideEffects: false,
          propertyReadSideEffects: false,
          unknownGlobalSideEffects: false,
        },
      },
    };

// ─────────────────────────────────────────────────────────────────────────────
// Storybook Aliases (design-tokens 로컬 빌드 참조)
// ─────────────────────────────────────────────────────────────────────────────
const designTokensPath = path.resolve(__dirname, '.storybook/design-tokens');
const storybookAliases: Alias[] = isStorybook
  ? [
      {
        find: '@transcodes/design-tokens/components',
        replacement: path.join(designTokensPath, 'components.js'),
      },
      {
        find: '@transcodes/design-tokens/css',
        replacement: path.join(designTokensPath, 'tokens.css'),
      },
      {
        find: '@transcodes/design-tokens/tokens-dark.css',
        replacement: path.join(designTokensPath, 'tokens-dark.css'),
      },
      {
        find: '@transcodes/design-tokens/components.css',
        replacement: path.join(designTokensPath, 'components.css'),
      },
      { find: '@transcodes/design-tokens', replacement: designTokensPath },
    ]
  : [];

// ─────────────────────────────────────────────────────────────────────────────
// Vite Config
// ─────────────────────────────────────────────────────────────────────────────
export default defineConfig({
  plugins: [
    !isStorybook &&
      dts({
        include: ['src'],
        exclude: ['src/stories'],
        rollupTypes: false,
      }),
  ].filter(Boolean),
  resolve: {
    alias: storybookAliases,
  },
  esbuild: {
    legalComments: 'none',
    treeShaking: true,
  },
  build: {
    ...libBuildConfig,
    minify: 'esbuild',
    target: 'es2020',
  },
});
