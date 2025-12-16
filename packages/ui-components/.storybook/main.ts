import type { StorybookConfig } from '@storybook/web-components-vite';

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
    // vite.config.ts의 lib 모드 설정을 Storybook용으로 오버라이드
    // Storybook은 애플리케이션 빌드이므로 모든 의존성을 번들에 포함해야 함
    config.build = config.build || {};
    config.build.rollupOptions = config.build.rollupOptions || {};
    config.build.rollupOptions.external = [];

    // Side-effect imports (컴포넌트 등록) 보존
    // Tree-shaking으로 인한 컴포넌트 import 제거 방지
    config.build.rollupOptions.treeshake = {
      moduleSideEffects: true,
    };

    // alias 설정은 vite.config.ts에서 처리됨 (isStorybook 분기)
    return config;
  },
};

export default config;
