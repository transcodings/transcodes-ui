import type { Meta, StoryObj } from '@storybook/web-components-vite';
import { html } from 'lit';
import '../../screens/tc-loading-screen.js';

const meta: Meta = {
  title: 'Screens/tc-loading-screen',
  component: 'tc-loading-screen',
  argTypes: {
    message: {
      control: 'text',
      description: 'Loading message',
    },
    spinnerSize: {
      control: 'text',
      description: 'Spinner size (CSS value)',
    },
  },
};

export default meta;

export const Default: StoryObj = {
  args: {
    message: 'Loading your data...',
    spinnerSize: '3rem',
  },
  render: (args) => html`
    <div style="height: calc(100dvh - 32px); position: relative; overflow: hidden; border-radius: var(--radius-lg); border: 1px solid var(--paper-warm);">
      <tc-loading-screen
        message=${args.message}
        spinner-size=${args.spinnerSize}
      ></tc-loading-screen>
    </div>
  `,
};

export const NoMessage: StoryObj = {
  render: () => html`
    <div style="height: calc(100dvh - 32px); position: relative; overflow: hidden; border-radius: var(--radius-lg); border: 1px solid var(--paper-warm);">
      <tc-loading-screen></tc-loading-screen>
    </div>
  `,
};

export const CustomSize: StoryObj = {
  render: () => html`
    <div style="height: calc(100dvh - 32px); position: relative; overflow: hidden; border-radius: var(--radius-lg); border: 1px solid var(--paper-warm);">
      <tc-loading-screen
        message="Please wait..."
        spinner-size="4rem"
      ></tc-loading-screen>
    </div>
  `,
};
