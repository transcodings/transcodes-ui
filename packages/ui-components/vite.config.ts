import { defineConfig } from 'vite';
import dts from 'vite-plugin-dts';

const isStorybook = process.argv[1]?.includes('storybook');

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
  esbuild: {
    legalComments: 'none',
    treeShaking: true,
  },
  // Storybook은 애플리케이션 빌드이므로 lib 모드 불필요
  build: isStorybook
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
          formats: ['es'],
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
        minify: 'esbuild',
        target: 'es2020',
      },
});
