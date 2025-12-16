import type { Meta, StoryObj } from '@storybook/web-components-vite';
import { html } from 'lit';
import '../../primitives/tc-callout.js';
import '../../primitives/tc-icon.js';

const meta: Meta = {
  title: 'Primitives/tc-callout',
  component: 'tc-callout',
  argTypes: {
    variant: {
      control: 'select',
      options: ['info', 'success', 'warning', 'error'],
      description: 'Visual style variant',
    },
  },
};

export default meta;

export const Default: StoryObj = {
  args: {
    variant: 'info',
  },
  render: (args) => html`
    <div style="max-width: 400px; padding: 2rem; background: var(--paper-cream); border-radius: var(--radius-lg);">
      <tc-callout variant=${args.variant}>
        This is a callout message. Change the variant to see different styles.
      </tc-callout>
    </div>
  `,
};

export const Variants: StoryObj = {
  render: () => html`
    <div style="display: flex; flex-direction: column; gap: 1rem; max-width: 400px; padding: 2rem; background: var(--paper-cream); border-radius: var(--radius-lg);">
      <tc-callout variant="info">This is an informational message.</tc-callout>
      <tc-callout variant="success">Operation completed successfully!</tc-callout>
      <tc-callout variant="warning">Please review before proceeding.</tc-callout>
      <tc-callout variant="error">An error occurred. Please try again.</tc-callout>
    </div>
  `,
};

export const WithIcon: StoryObj = {
  render: () => html`
    <div style="display: flex; flex-direction: column; gap: 1rem; max-width: 400px; padding: 2rem; background: var(--paper-cream); border-radius: var(--radius-lg);">
      <tc-callout variant="info">
        <tc-icon slot="icon" name="info" size="1.25rem"></tc-icon>
        This is an info callout with an icon.
      </tc-callout>
      <tc-callout variant="success">
        <tc-icon slot="icon" name="success" size="1.25rem"></tc-icon>
        Your changes have been saved successfully.
      </tc-callout>
      <tc-callout variant="warning">
        <tc-icon slot="icon" name="warning" size="1.25rem"></tc-icon>
        This action cannot be undone.
      </tc-callout>
      <tc-callout variant="error">
        <tc-icon slot="icon" name="error" size="1.25rem"></tc-icon>
        Failed to connect to the server.
      </tc-callout>
    </div>
  `,
};

export const Info: StoryObj = {
  render: () => html`
    <div style="max-width: 400px; padding: 2rem; background: var(--paper-cream); border-radius: var(--radius-lg);">
      <tc-callout variant="info">
        This is an informational callout for tips and notices.
      </tc-callout>
    </div>
  `,
};
