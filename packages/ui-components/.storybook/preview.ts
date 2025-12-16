import type { Preview } from '@storybook/web-components-vite';
// Design tokens (alias로 .storybook/design-tokens/에서 로드)
import '@transcodes/design-tokens/css';
import '@transcodes/design-tokens/tokens-dark.css';
import '@transcodes/design-tokens/components.css';
// Local styles
import '../src/styles/reset.css';

// 모든 컴포넌트 등록 (tree-shaking 방지)
import '../src/primitives/index.js';
import '../src/widgets/index.js';
import '../src/screens/index.js';

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/,
      },
    },
    backgrounds: { disable: true },
  },
  initialGlobals: {
    theme: 'light',
  },
  globalTypes: {
    theme: {
      description: 'Global theme for components',
      toolbar: {
        title: 'Theme',
        icon: 'circlehollow',
        items: [
          { value: 'light', icon: 'sun', title: 'Light' },
          { value: 'dark', icon: 'moon', title: 'Dark' },
        ],
        dynamicTitle: true,
      },
    },
  },
  decorators: [
    (story, context) => {
      const theme = context.globals.theme || 'light';
      document.documentElement.setAttribute('data-theme', theme);
      return story();
    },
  ],
};

export default preview;
