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
        rollupTypes: true,
      }),
  ].filter(Boolean),
  esbuild: {
    legalComments: 'none', // 라이선스 주석 제거
    treeShaking: true,
  },
  build: {
    lib: {
      entry: 'src/index.ts',
      formats: ['es'],
    },
    rollupOptions: {
      output: {
        preserveModules: true, // 모듈 구조 유지
        preserveModulesRoot: 'src', // src/ 구조 보존
        entryFileNames: '[name].js', // 파일명 패턴
        // 추가 최적화
        generatedCode: {
          constBindings: true, // const 바인딩 사용
        },
        compact: true, // 불필요한 공백 제거
      },
      external: ['lit', /^lit\//, /@transcodes\/design-tokens/],
      treeshake: {
        moduleSideEffects: false, // 더 적극적인 tree-shaking
        propertyReadSideEffects: false,
        unknownGlobalSideEffects: false,
      },
    },
    minify: 'esbuild',
    target: 'es2020', // 최신 브라우저 타겟
  },
});
