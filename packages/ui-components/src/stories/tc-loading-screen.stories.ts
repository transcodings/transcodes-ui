import type { Meta, StoryObj } from '@storybook/web-components-vite';
import { html } from 'lit';
import '../screens/tc-loading-screen.js';

const meta: Meta = {
  title: 'Screens/tc-loading-screen',
  component: 'tc-loading-screen',
};

export default meta;

export const Default: StoryObj = {
  render: () => html`
    <div style="height: calc(100dvh - 32px); position: relative; overflow: hidden; border-radius: var(--radius-lg); border: 1px solid var(--paper-warm);">
      <tc-loading-screen message="Loading your data..."></tc-loading-screen>
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
