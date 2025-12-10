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
  build: {
    lib: {
      entry: 'src/index.ts',
      formats: ['es'],
      fileName: 'ui-components',
    },
    rollupOptions: {
      external: ['lit', /^lit\//, '@transcodes/design-tokens'],
    },
  },
});
