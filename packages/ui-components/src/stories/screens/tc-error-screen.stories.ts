import type { Meta, StoryObj } from '@storybook/web-components-vite';
import { html } from 'lit';
import '../../screens/tc-error-screen.js';

const meta: Meta = {
  title: 'Screens/tc-error-screen',
  component: 'tc-error-screen',
  argTypes: {
    title: {
      control: 'text',
      description: 'Error title',
    },
    message: {
      control: 'text',
      description: 'Error message',
    },
    retryLabel: {
      control: 'text',
      description: 'Retry button label',
    },
    showRetry: {
      control: 'boolean',
      description: 'Show retry button',
    },
  },
};

export default meta;

export const Default: StoryObj = {
  args: {
    title: 'Connection Failed',
    message:
      "We couldn't connect to the server. Please check your connection and try again.",
    retryLabel: 'Retry Connection',
    showRetry: true,
  },
  render: (args) => html`
    <div style="height: calc(100dvh - 32px); position: relative; overflow: hidden; border-radius: var(--radius-lg); border: 1px solid var(--paper-warm);">
      <tc-error-screen
        title=${args.title}
        message=${args.message}
        retry-label=${args.retryLabel}
        .showRetry=${args.showRetry}
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

export const NetworkError: StoryObj = {
  render: () => html`
    <div style="height: calc(100dvh - 32px); position: relative; overflow: hidden; border-radius: var(--radius-lg); border: 1px solid var(--paper-warm);">
      <tc-error-screen
        title="No Internet Connection"
        message="Please check your network settings and try again."
        retry-label="Try Again"
      ></tc-error-screen>
    </div>
  `,
};
