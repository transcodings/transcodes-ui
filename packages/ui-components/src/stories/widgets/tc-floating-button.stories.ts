import type { Meta, StoryObj } from '@storybook/web-components-vite';
import { html } from 'lit';
import '../../widgets/tc-floating-button.js';
import '../../primitives/tc-icon.js';

const meta: Meta = {
  title: 'Widgets/tc-floating-button',
  component: 'tc-floating-button',
  argTypes: {
    position: {
      control: 'select',
      options: ['bottom-right', 'bottom-left', 'top-right', 'top-left'],
      description: 'Position of the floating button',
    },
    size: {
      control: 'text',
      description: 'Button size (CSS value)',
    },
    disabled: {
      control: 'boolean',
      description: 'Disabled state',
    },
  },
};

export default meta;

export const Default: StoryObj = {
  args: {
    position: 'bottom-right',
    size: '3.5rem',
    disabled: false,
  },
  render: (args) => html`
    <div style="height: 300px; position: relative; background: var(--paper-cream); border-radius: var(--radius-lg);">
      <tc-floating-button
        position=${args.position}
        size=${args.size}
        ?disabled=${args.disabled}
        style="position: absolute;"
        @tc-click=${() => console.log('FAB clicked')}
      >
        <tc-icon name="bell" size="1.5rem"></tc-icon>
      </tc-floating-button>
    </div>
  `,
};

export const Positions: StoryObj = {
  render: () => html`
    <div style="height: 300px; position: relative; background: var(--paper-cream); border-radius: var(--radius-lg);">
      <tc-floating-button position="top-left" style="position: absolute;">
        <tc-icon name="bell" size="1.5rem"></tc-icon>
      </tc-floating-button>
      <tc-floating-button position="top-right" style="position: absolute;">
        <tc-icon name="download" size="1.5rem"></tc-icon>
      </tc-floating-button>
      <tc-floating-button position="bottom-left" style="position: absolute;">
        <tc-icon name="info" size="1.5rem"></tc-icon>
      </tc-floating-button>
      <tc-floating-button position="bottom-right" style="position: absolute;">
        <tc-icon name="check" size="1.5rem"></tc-icon>
      </tc-floating-button>
    </div>
  `,
};

export const Sizes: StoryObj = {
  render: () => html`
    <div style="display: flex; gap: 1rem; align-items: center; padding: 2rem; background: var(--paper-cream); border-radius: var(--radius-lg);">
      <tc-floating-button size="2.5rem" style="position: relative;">
        <tc-icon name="bell" size="1rem"></tc-icon>
      </tc-floating-button>
      <tc-floating-button size="3.5rem" style="position: relative;">
        <tc-icon name="bell" size="1.5rem"></tc-icon>
      </tc-floating-button>
      <tc-floating-button size="4.5rem" style="position: relative;">
        <tc-icon name="bell" size="2rem"></tc-icon>
      </tc-floating-button>
    </div>
  `,
};

export const Disabled: StoryObj = {
  render: () => html`
    <div style="display: flex; gap: 1rem; padding: 2rem; background: var(--paper-cream); border-radius: var(--radius-lg);">
      <tc-floating-button style="position: relative;">
        <tc-icon name="bell" size="1.5rem"></tc-icon>
      </tc-floating-button>
      <tc-floating-button disabled style="position: relative;">
        <tc-icon name="bell" size="1.5rem"></tc-icon>
      </tc-floating-button>
    </div>
  `,
};
