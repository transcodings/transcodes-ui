import type { Meta, StoryObj } from '@storybook/web-components-vite';
import { html } from 'lit';
import '../widgets/tc-floating-button.js';
import '../primitives/tc-icon.js';

const meta: Meta = {
  title: 'Widgets/tc-floating-button',
  component: 'tc-floating-button',
};

export default meta;

export const Default: StoryObj = {
  render: () => html`
    <div style="height: 300px; position: relative; background: var(--paper-cream); border-radius: var(--radius-lg);">
      <tc-floating-button
        position="bottom-right"
        @tc-click=${() => console.log('FAB clicked')}
        style="position: absolute;"
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
