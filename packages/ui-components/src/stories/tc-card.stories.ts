import type { Meta, StoryObj } from '@storybook/web-components-vite';
import { html } from 'lit';
import '../primitives/tc-card.js';
import '../primitives/tc-section.js';
import '../primitives/tc-text.js';
import '../primitives/tc-button.js';

const meta: Meta = {
  title: 'Primitives/tc-card',
  component: 'tc-card',
};

export default meta;

export const Default: StoryObj = {
  render: () => html`
    <div style="padding: 2rem; background: var(--paper-cream); border-radius: var(--radius-lg);">
      <tc-card>
        <tc-section gap="var(--space-md)">
          <tc-text size="xl" weight="600">Card Title</tc-text>
          <tc-text color="tertiary">
            This is a card component with layered shadows and an optional inner border effect.
          </tc-text>
          <tc-button variant="primary">Action</tc-button>
        </tc-section>
      </tc-card>
    </div>
  `,
};

export const NoBorder: StoryObj = {
  render: () => html`
    <div style="padding: 2rem; background: var(--paper-cream); border-radius: var(--radius-lg);">
      <tc-card no-border>
        <tc-text>Card without inner border effect</tc-text>
      </tc-card>
    </div>
  `,
};
