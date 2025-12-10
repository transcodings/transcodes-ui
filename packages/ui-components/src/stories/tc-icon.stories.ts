import type { Meta, StoryObj } from '@storybook/web-components-vite';
import { html } from 'lit';
import '../primitives/tc-icon.js';
import '../primitives/tc-text.js';

const meta: Meta = {
  title: 'Primitives/tc-icon',
  component: 'tc-icon',
  argTypes: {
    name: {
      control: 'select',
      options: ['check', 'x', 'chevron-right', 'chevron-left', 'alert-circle', 'info', 'loader', 'bell', 'download', 'wifi-off', 'passkey'],
    },
    size: {
      control: 'text',
    },
  },
};

export default meta;

export const Default: StoryObj = {
  args: {
    name: 'bell',
    size: '1.5rem',
  },
  render: (args) => html`
    <div style="padding: 2rem; background: var(--paper-cream); border-radius: var(--radius-lg);">
      <tc-icon name=${args.name} size=${args.size}></tc-icon>
    </div>
  `,
};

export const AllIcons: StoryObj = {
  render: () => html`
    <div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(100px, 1fr)); gap: 1rem; padding: 2rem; background: var(--paper-cream); border-radius: var(--radius-lg);">
      ${[
        'check',
        'x',
        'chevron-right',
        'chevron-left',
        'alert-circle',
        'info',
        'loader',
        'bell',
        'download',
        'wifi-off',
        'passkey',
      ].map(
        (name) => html`
          <div
            style="display: flex; flex-direction: column; align-items: center; gap: 0.5rem; padding: 1rem; background: var(--paper-white); border-radius: var(--radius-md);"
          >
            <tc-icon name=${name} size="1.5rem"></tc-icon>
            <tc-text size="sm">${name}</tc-text>
          </div>
        `,
      )}
    </div>
  `,
};

export const Sizes: StoryObj = {
  render: () => html`
    <div style="display: flex; gap: 1rem; align-items: center; padding: 2rem; background: var(--paper-cream); border-radius: var(--radius-lg);">
      <tc-icon name="bell" size="1rem"></tc-icon>
      <tc-icon name="bell" size="1.5rem"></tc-icon>
      <tc-icon name="bell" size="2rem"></tc-icon>
      <tc-icon name="bell" size="2.5rem"></tc-icon>
    </div>
  `,
};
