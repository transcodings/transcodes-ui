import type { Meta, StoryObj } from '@storybook/web-components-vite';
import { html } from 'lit';

import '../screens/tc-loading-screen.js';
import '../screens/tc-error-screen.js';
import '../screens/tc-success-screen.js';

// ============= tc-loading-screen =============
const loadingMeta: Meta = {
  title: 'Screens/tc-loading-screen',
  component: 'tc-loading-screen',
};

export default loadingMeta;

export const LoadingScreen: StoryObj = {
  render: () => html`
    <div style="height: calc(100dvh - 32px); position: relative; overflow: hidden; border-radius: var(--radius-lg); border: 1px solid var(--paper-warm);">
      <tc-loading-screen message="Loading your data..."></tc-loading-screen>
    </div>
  `,
};

export const LoadingScreenNoMessage: StoryObj = {
  render: () => html`
    <div style="height: calc(100dvh - 32px); position: relative; overflow: hidden; border-radius: var(--radius-lg); border: 1px solid var(--paper-warm);">
      <tc-loading-screen></tc-loading-screen>
    </div>
  `,
};

// ============= tc-error-screen =============
export const ErrorScreen: StoryObj = {
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

export const ErrorScreenNoRetry: StoryObj = {
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

// ============= tc-success-screen =============
export const SuccessScreen: StoryObj = {
  render: () => html`
    <div style="height: calc(100dvh - 32px); position: relative; overflow: hidden; border-radius: var(--radius-lg); border: 1px solid var(--paper-warm);">
      <tc-success-screen
        title="Payment Complete!"
        message="Your order has been successfully processed."
        action-label="Continue Shopping"
        @tc-action=${() => console.log('Action clicked')}
      ></tc-success-screen>
    </div>
  `,
};

export const SuccessScreenNoAction: StoryObj = {
  render: () => html`
    <div style="height: calc(100dvh - 32px); position: relative; overflow: hidden; border-radius: var(--radius-lg); border: 1px solid var(--paper-warm);">
      <tc-success-screen
        title="Email Verified"
        message="Your email address has been successfully verified."
      ></tc-success-screen>
    </div>
  `,
};
