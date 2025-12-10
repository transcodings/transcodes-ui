import type { Meta, StoryObj } from '@storybook/web-components-vite';
import { html } from 'lit';
import '../screens/tc-success-screen.js';

const meta: Meta = {
  title: 'Screens/tc-success-screen',
  component: 'tc-success-screen',
};

export default meta;

export const Default: StoryObj = {
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

export const NoAction: StoryObj = {
  render: () => html`
    <div style="height: calc(100dvh - 32px); position: relative; overflow: hidden; border-radius: var(--radius-lg); border: 1px solid var(--paper-warm);">
      <tc-success-screen
        title="Email Verified"
        message="Your email address has been successfully verified."
      ></tc-success-screen>
    </div>
  `,
};
