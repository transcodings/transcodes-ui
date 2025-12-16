import type { Meta, StoryObj } from '@storybook/web-components-vite';
import { html } from 'lit';
import '../../primitives/tc-spinner.js';

const meta: Meta = {
  title: 'Primitives/tc-spinner',
  component: 'tc-spinner',
  argTypes: {
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg', 'auto'],
    },
  },
};

export default meta;

export const Default: StoryObj = {
  args: {
    size: 'md',
  },
  render: (args) => html`
    <div style="padding: 2rem; background: var(--paper-cream); border-radius: var(--radius-lg);">
      <tc-spinner size=${args.size}></tc-spinner>
    </div>
  `,
};

export const Sizes: StoryObj = {
  render: () => html`
    <div style="display: flex; gap: 2rem; align-items: center; padding: 2rem; background: var(--paper-cream); border-radius: var(--radius-lg);">
      <tc-spinner size="sm"></tc-spinner>
      <tc-spinner size="md"></tc-spinner>
      <tc-spinner size="lg"></tc-spinner>
    </div>
  `,
};

export const CustomSize: StoryObj = {
  render: () => html`
    <div style="display: flex; gap: 2rem; align-items: center; padding: 2rem; background: var(--paper-cream); border-radius: var(--radius-lg);">
      <tc-spinner size="1.5rem"></tc-spinner>
      <tc-spinner size="2rem"></tc-spinner>
      <tc-spinner size="3rem"></tc-spinner>
    </div>
  `,
};

export const Auto: StoryObj = {
  render: () => html`
    <div style="padding: 2rem; background: var(--paper-cream); border-radius: var(--radius-lg);">
      <p style="margin-bottom: 1rem; color: var(--ink-dark); font-size: 0.875rem;">
        Auto size adapts to screen width: larger on desktop, smaller on mobile.
      </p>
      <tc-spinner size="auto"></tc-spinner>
    </div>
  `,
};
