import type { Meta, StoryObj } from '@storybook/web-components-vite';
import { html } from 'lit';
import '../primitives/tc-button.js';

const meta: Meta = {
  title: 'Primitives/tc-button',
  component: 'tc-button',
  argTypes: {
    variant: {
      control: 'select',
      options: ['primary', 'secondary', 'success'],
    },
    loading: { control: 'boolean' },
    disabled: { control: 'boolean' },
  },
};

export default meta;

export const Default: StoryObj = {
  args: {
    variant: 'primary',
    loading: false,
    disabled: false,
  },
  render: (args) => html`
    <div style="padding: 2rem; background: var(--paper-cream); border-radius: var(--radius-lg);">
      <tc-button
        variant=${args.variant}
        ?loading=${args.loading}
        ?disabled=${args.disabled}
      >
        Click me
      </tc-button>
    </div>
  `,
};

export const Variants: StoryObj = {
  render: () => html`
    <div style="display: flex; gap: 1rem; flex-wrap: wrap; padding: 2rem; background: var(--paper-cream); border-radius: var(--radius-lg);">
      <tc-button variant="primary">Primary</tc-button>
      <tc-button variant="secondary">Secondary</tc-button>
      <tc-button variant="success">Success</tc-button>
    </div>
  `,
};

export const States: StoryObj = {
  render: () => html`
    <div style="display: flex; gap: 1rem; flex-wrap: wrap; padding: 2rem; background: var(--paper-cream); border-radius: var(--radius-lg);">
      <tc-button variant="primary">Normal</tc-button>
      <tc-button variant="primary" loading>Loading</tc-button>
      <tc-button variant="primary" disabled>Disabled</tc-button>
    </div>
  `,
};
