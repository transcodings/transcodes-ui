import { defineConfig } from 'vite';
import dts from 'vite-plugin-dts';

export default defineConfig({
  plugins: [
    dts({
      include: ['src'],
      exclude: ['src/stories'],
      rollupTypes: false,
    }),
  ],
  esbuild: {
    legalComments: 'none',
    treeShaking: true,
  },
  build: {
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
