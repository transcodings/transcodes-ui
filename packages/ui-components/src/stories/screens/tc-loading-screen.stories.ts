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
      control: 'select',
      options: ['sm', 'md', 'lg', 'auto'],
      description: 'Spinner size',
    },
  },
};

export default meta;

export const Default: StoryObj = {
  args: {
    message: 'Loading your data...',
    spinnerSize: 'md',
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

export const Sizes: StoryObj = {
  render: () => html`
    <div style="display: flex; flex-direction: column; gap: 1rem;">
      <div style="height: 200px; border-radius: var(--radius-lg); border: 1px solid var(--paper-warm); overflow: hidden;">
        <tc-loading-screen message="Small spinner" spinner-size="sm"></tc-loading-screen>
      </div>
      <div style="height: 200px; border-radius: var(--radius-lg); border: 1px solid var(--paper-warm); overflow: hidden;">
        <tc-loading-screen message="Medium spinner" spinner-size="md"></tc-loading-screen>
      </div>
      <div style="height: 200px; border-radius: var(--radius-lg); border: 1px solid var(--paper-warm); overflow: hidden;">
        <tc-loading-screen message="Large spinner" spinner-size="lg"></tc-loading-screen>
      </div>
    </div>
  `,
};

export const FlexibleHeight: StoryObj = {
  render: () => html`
    <div style="display: flex; flex-direction: column; gap: 1rem;">
      <p style="color: var(--ink-medium); font-size: var(--font-size-sm);">
        Screens now use <code>min-height: inherit</code> for flexible sizing.
        The height is determined by the parent container.
      </p>
      <div style="height: 300px; border-radius: var(--radius-lg); border: 1px solid var(--paper-warm); overflow: hidden;">
        <tc-loading-screen message="Loading in 300px container..."></tc-loading-screen>
      </div>
      <div style="height: 200px; border-radius: var(--radius-lg); border: 1px solid var(--paper-warm); overflow: hidden;">
        <tc-loading-screen message="Loading in 200px container..." spinner-size="sm"></tc-loading-screen>
      </div>
    </div>
  `,
};
