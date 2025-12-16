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

    // vite.config.ts의 설정 오버라이드
    // Storybook 정적 빌드는 애플리케이션이므로 모든 의존성을 번들에 포함해야 함
    config.build = config.build || {};
    config.build.rollupOptions = config.build.rollupOptions || {};
    config.build.rollupOptions.external = [];

    // Side-effect imports (컴포넌트 등록) 보존
    // Tree-shaking으로 인한 컴포넌트 import 제거 방지
    config.build.rollupOptions.treeshake = {
      moduleSideEffects: true,
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
