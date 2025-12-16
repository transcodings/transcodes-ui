import type { Meta, StoryObj } from '@storybook/web-components-vite';
import { html } from 'lit';
import '../../primitives/tc-error-message.js';

const meta: Meta = {
  title: 'Primitives/tc-error-message',
  component: 'tc-error-message',
  argTypes: {
    variant: {
      control: 'select',
      options: ['error', 'warning', 'info'],
    },
    message: {
      control: 'text',
    },
  },
};

export default meta;

export const Default: StoryObj = {
  args: {
    variant: 'error',
    message: 'Something went wrong. Please try again.',
  },
  render: (args) => html`
    <div style="max-width: 400px; padding: 2rem;">
      <tc-error-message variant=${args.variant} message=${args.message}></tc-error-message>
    </div>
  `,
};

export const Variants: StoryObj = {
  render: () => html`
    <div style="max-width: 400px; padding: 2rem; display: flex; flex-direction: column; gap: 1rem;">
      <tc-error-message variant="error" message="This is an error message."></tc-error-message>
      <tc-error-message variant="warning" message="This is a warning message."></tc-error-message>
      <tc-error-message variant="info" message="This is an info message."></tc-error-message>
    </div>
  `,
};

export const FormValidation: StoryObj = {
  render: () => html`
    <div style="max-width: 400px; padding: 2rem; display: flex; flex-direction: column; gap: 1rem;">
      <tc-error-message variant="error" message="Email address is required."></tc-error-message>
      <tc-error-message variant="error" message="Password must be at least 8 characters."></tc-error-message>
      <tc-error-message variant="warning" message="Your session will expire in 5 minutes."></tc-error-message>
    </div>
  `,
};

export const LongMessage: StoryObj = {
  render: () => html`
    <div style="max-width: 400px; padding: 2rem;">
      <tc-error-message
        variant="error"
        message="The server encountered an unexpected error while processing your request. Please try again later or contact support if the problem persists."
      ></tc-error-message>
    </div>
  `,
};

export const EmptyMessage: StoryObj = {
  render: () => html`
    <div style="max-width: 400px; padding: 2rem;">
      <p style="color: var(--ink-light); margin-bottom: 1rem;">
        When message is empty, nothing is rendered:
      </p>
      <tc-error-message variant="error" message=""></tc-error-message>
      <p style="color: var(--ink-light); margin-top: 1rem;">
        (Empty space above)
      </p>
    </div>
  `,
};

export const ErrorVariant: StoryObj = {
  render: () => html`
    <div style="max-width: 400px; padding: 2rem;">
      <tc-error-message variant="error" message="An error occurred. Please try again."></tc-error-message>
    </div>
  `,
};
