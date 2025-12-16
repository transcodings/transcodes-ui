import path from 'node:path';
import { fileURLToPath } from 'node:url';
import type { StorybookConfig } from '@storybook/web-components-vite';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const config: StorybookConfig = {
  stories: ['../src/stories/**/*.stories.@(js|jsx|ts|tsx|mdx)'],
  addons: [
    '@storybook/addon-links',
    '@storybook/addon-a11y',
    '@storybook/addon-docs',
  ],

  framework: {
    name: '@storybook/web-components-vite',
    options: {},
  },

  staticDirs: ['./public'],

  docs: {
    defaultName: 'Documentation',
  },

  viteFinal: async (config) => {
    config.resolve = config.resolve || {};
    config.resolve.alias = {
      ...config.resolve.alias,
      // CSS imports (preview.ts)
      '@transcodes/design-tokens/css': path.resolve(
        __dirname,
        '../../design-tokens/build/tokens.css',
      ),
      '@transcodes/design-tokens/tokens-dark.css': path.resolve(
        __dirname,
        '../../design-tokens/build/tokens-dark.css',
      ),
      '@transcodes/design-tokens/components.css': path.resolve(
        __dirname,
        '../../design-tokens/build/components.css',
      ),
      // JS module (shared.ts → componentStyles)
      '@transcodes/design-tokens/components': path.resolve(
        __dirname,
        '../../design-tokens/build/components.js',
      ),
    };
    return config;
  },
};

export default config;
