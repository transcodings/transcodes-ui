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

    // vite.config.ts의 external 설정 오버라이드
    // Storybook 빌드 시 design-tokens를 번들에 포함
    config.build = config.build || {};
    config.build.rollupOptions = config.build.rollupOptions || {};
    config.build.rollupOptions.external = (id: string) => {
      // design-tokens는 번들에 포함 (alias로 해석됨)
      if (id.includes('@transcodes/design-tokens')) return false;
      // lit은 Storybook이 자체적으로 제공하므로 external 유지
      if (id === 'lit' || id.startsWith('lit/')) return true;
      return false;
    };

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
