import type { Preview } from '@storybook/web-components-vite';
// Design tokens
import '@transcodes/design-tokens';
import '@transcodes/design-tokens/tokens-dark.css';
import '@transcodes/design-tokens/components.css';
// Local styles
import '../src/styles/reset.css';

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/,
      },
    },
  },
};

export default preview;
