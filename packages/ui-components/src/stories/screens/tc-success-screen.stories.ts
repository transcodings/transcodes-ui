import type { Meta, StoryObj } from '@storybook/web-components-vite';
import { html } from 'lit';
import '../../screens/tc-success-screen.js';

const meta: Meta = {
  title: 'Screens/tc-success-screen',
  component: 'tc-success-screen',
  argTypes: {
    title: {
      control: 'text',
      description: 'Success title',
    },
    message: {
      control: 'text',
      description: 'Success message',
    },
    actionLabel: {
      control: 'text',
      description: 'Action button label (empty to hide)',
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
    title: 'Payment Complete!',
    message: 'Your order has been successfully processed.',
    actionLabel: 'Continue Shopping',
    autoAnimate: true,
  },
  render: (args) => html`
    <div style="height: calc(100dvh - 32px); position: relative; overflow: hidden; border-radius: var(--radius-lg); border: 1px solid var(--paper-warm);">
      <tc-success-screen
        title=${args.title}
        message=${args.message}
        action-label=${args.actionLabel}
        .autoAnimate=${args.autoAnimate}
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

export const AccountCreated: StoryObj = {
  render: () => html`
    <div style="height: calc(100dvh - 32px); position: relative; overflow: hidden; border-radius: var(--radius-lg); border: 1px solid var(--paper-warm);">
      <tc-success-screen
        title="Welcome!"
        message="Your account has been created successfully."
        action-label="Get Started"
      ></tc-success-screen>
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
        <tc-success-screen
          title="Done!"
          message="Task completed in 350px container."
          action-label="Continue"
        ></tc-success-screen>
      </div>
    </div>
  `,
};
