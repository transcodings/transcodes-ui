import type { Meta, StoryObj } from '@storybook/web-components-vite';
import { html } from 'lit';
import '../../primitives/tc-container.js';
import '../../primitives/tc-text.js';
import '../../primitives/tc-button.js';
import '../../primitives/tc-section.js';

const meta: Meta = {
  title: 'Primitives/tc-container',
  component: 'tc-container',
  argTypes: {
    wide: { control: 'boolean' },
  },
};

export default meta;

export const Default: StoryObj = {
  render: () => html`
    <div style="padding: 2rem; background: var(--paper-warm); border-radius: var(--radius-lg);">
      <tc-container>
        <tc-section>
          <tc-text size="xl" weight="600">Default Container</tc-text>
          <tc-text color="tertiary">
            This container centers content with a max-width of 25rem (400px).
            It's useful for forms and focused content areas.
          </tc-text>
        </tc-section>
      </tc-container>
    </div>
  `,
};

export const Wide: StoryObj = {
  render: () => html`
    <div style="padding: 2rem; background: var(--paper-warm); border-radius: var(--radius-lg);">
      <tc-container wide>
        <tc-section>
          <tc-text size="xl" weight="600">Wide Container</tc-text>
          <tc-text color="tertiary">
            This container has a wider max-width of 26.25rem (420px).
            Use it when you need slightly more horizontal space.
          </tc-text>
        </tc-section>
      </tc-container>
    </div>
  `,
};

export const WithForm: StoryObj = {
  render: () => html`
    <div style="padding: 2rem; background: var(--paper-warm); border-radius: var(--radius-lg);">
      <tc-container>
        <tc-section .sx=${{ gap: 'var(--space-lg)' }}>
          <tc-text size="xl" weight="600">Sign In</tc-text>
          <div style="display: flex; flex-direction: column; gap: var(--space-md);">
            <input
              type="email"
              placeholder="Email"
              style="padding: var(--space-sm) var(--space-md); border: 1px solid var(--ink-faint); border-radius: var(--radius-md); font-size: var(--font-size-base);"
            />
            <input
              type="password"
              placeholder="Password"
              style="padding: var(--space-sm) var(--space-md); border: 1px solid var(--ink-faint); border-radius: var(--radius-md); font-size: var(--font-size-base);"
            />
            <tc-button variant="primary">Sign In</tc-button>
          </div>
        </tc-section>
      </tc-container>
    </div>
  `,
};
