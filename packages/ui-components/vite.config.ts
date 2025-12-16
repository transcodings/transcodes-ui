import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { defineConfig } from 'vite';
import dts from 'vite-plugin-dts';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const isStorybook = process.argv[1]?.includes('storybook');

// Storybook은 애플리케이션 빌드이므로 lib 모드와 external 설정 불필요
// 라이브러리 빌드 시에만 적용
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
        formats: ['es'] as const,
      },
      rollupOptions: {
        output: {
          preserveModules: true,
          preserveModulesRoot: 'src',
          entryFileNames: '[name].js',
          generatedCode: {
            constBindings: true,
          },
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

// Storybook 빌드 시 design-tokens alias 설정
// npm 패키지보다 로컬 빌드 결과물을 우선 사용
const designTokensPath = path.resolve(__dirname, '.storybook/design-tokens');
const storybookAliases: Record<string, string>[] = isStorybook
  ? [
      // 정확한 경로 매칭 (먼저 처리됨)
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
      // 패키지 전체 매핑 (fallback)
      { find: '@transcodes/design-tokens', replacement: designTokensPath },
    ]
  : [];

export default defineConfig({
  plugins: [
    // Storybook 빌드 시에는 dts 플러그인 비활성화
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
