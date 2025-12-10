import { defineConfig } from 'vite';
import dts from 'vite-plugin-dts';

export default defineConfig({
  plugins: [
    dts({
      include: ['src'],
      exclude: ['src/stories'],
      rollupTypes: true,
    }),
  ],
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
