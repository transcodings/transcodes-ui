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
    autoAnimate: {
      control: 'boolean',
      description: 'Auto-animate on mount',
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
    autoAnimate: true,
  },
  render: (args) => html`
    <div style="height: calc(100dvh - 32px); position: relative; overflow: hidden; border-radius: var(--radius-lg); border: 1px solid var(--paper-warm);">
      <tc-error-screen
        title=${args.title}
        message=${args.message}
        retry-label=${args.retryLabel}
        .showRetry=${args.showRetry}
        .autoAnimate=${args.autoAnimate}
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

export const FlexibleHeight: StoryObj = {
  render: () => html`
    <div style="display: flex; flex-direction: column; gap: 1rem;">
      <p style="color: var(--ink-medium); font-size: var(--font-size-sm);">
        Screens now use <code>min-height: inherit</code> for flexible sizing.
      </p>
      <div style="height: 350px; border-radius: var(--radius-lg); border: 1px solid var(--paper-warm); overflow: hidden;">
        <tc-error-screen
          title="Error"
          message="Something went wrong in this 350px container."
          retry-label="Retry"
        ></tc-error-screen>
      </div>
    </div>
  `,
};
