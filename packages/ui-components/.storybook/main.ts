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
    // design-tokens 빌드 결과물이 .storybook/design-tokens에 복사됨
    const designTokensPath = path.resolve(__dirname, './design-tokens');

    config.resolve = config.resolve || {};
    config.resolve.alias = {
      ...config.resolve.alias,
      // CSS imports
      '@transcodes/design-tokens/css': path.join(
        designTokensPath,
        'tokens.css',
      ),
      '@transcodes/design-tokens/tokens-dark.css': path.join(
        designTokensPath,
        'tokens-dark.css',
      ),
      '@transcodes/design-tokens/components.css': path.join(
        designTokensPath,
        'components.css',
      ),
      // JS module (shared.ts에서 사용)
      '@transcodes/design-tokens/components': path.join(
        designTokensPath,
        'components.js',
      ),
    };
    return config;
  },
};

export default config;
