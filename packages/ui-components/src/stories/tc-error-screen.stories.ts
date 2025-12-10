import type { Meta, StoryObj } from '@storybook/web-components-vite';
import { html } from 'lit';
import '../screens/tc-error-screen.js';

const meta: Meta = {
  title: 'Screens/tc-error-screen',
  component: 'tc-error-screen',
};

export default meta;

export const Default: StoryObj = {
  render: () => html`
    <div style="height: calc(100dvh - 32px); position: relative; overflow: hidden; border-radius: var(--radius-lg); border: 1px solid var(--paper-warm);">
      <tc-error-screen
        title="Connection Failed"
        message="We couldn't connect to the server. Please check your connection and try again."
        retry-label="Retry Connection"
        @tc-retry=${() => console.log('Retry clicked')}
      ></tc-error-screen>
    </div>
  `,
};

export const NoRetry: StoryObj = {
  render: () => html`
    <div style="height: calc(100dvh - 32px); position: relative; overflow: hidden; border-radius: var(--radius-lg); border: 1px solid var(--paper-warm);">
      <tc-error-screen
        title="Access Denied"
        message="You don't have permission to view this page."
        .showRetry=${false}
      ></tc-error-screen>
    </div>
  `,
};
