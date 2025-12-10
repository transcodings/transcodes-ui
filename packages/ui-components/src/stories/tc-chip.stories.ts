import type { Meta, StoryObj } from '@storybook/web-components-vite';
import { html } from 'lit';
import '../primitives/tc-chip.js';

const meta: Meta = {
  title: 'Primitives/tc-chip',
  component: 'tc-chip',
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'success', 'error', 'info'],
    },
    size: {
      control: 'radio',
      options: ['sm', 'md'],
    },
  },
};

export default meta;

export const Default: StoryObj = {
  args: {
    variant: 'default',
    size: 'md',
  },
  render: (args) => html`
    <div style="padding: 2rem; background: var(--paper-cream); border-radius: var(--radius-lg);">
      <tc-chip variant=${args.variant} size=${args.size}>Chip Label</tc-chip>
    </div>
  `,
};

export const Variants: StoryObj = {
  render: () => html`
    <div style="display: flex; gap: 0.5rem; flex-wrap: wrap; padding: 2rem; background: var(--paper-cream); border-radius: var(--radius-lg);">
      <tc-chip variant="default">Default</tc-chip>
      <tc-chip variant="success">Success</tc-chip>
      <tc-chip variant="error">Error</tc-chip>
      <tc-chip variant="info">Info</tc-chip>
    </div>
  `,
};

export const Sizes: StoryObj = {
  render: () => html`
    <div style="display: flex; gap: 0.5rem; align-items: center; padding: 2rem; background: var(--paper-cream); border-radius: var(--radius-lg);">
      <tc-chip size="sm">Small</tc-chip>
      <tc-chip size="md">Medium</tc-chip>
    </div>
  `,
};
