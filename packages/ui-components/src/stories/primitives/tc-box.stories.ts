import type { Meta, StoryObj } from '@storybook/web-components-vite';
import { html } from 'lit';
import '../../primitives/tc-box.js';
import '../../primitives/tc-text.js';
import '../../primitives/tc-section.js';

const meta: Meta = {
  title: 'Primitives/tc-box',
  component: 'tc-box',
};

export default meta;

export const Default: StoryObj = {
  render: () => html`
    <div style="padding: 2rem; background: var(--paper-warm); border-radius: var(--radius-lg);">
      <tc-box>
        <tc-text>Default box with no styling</tc-text>
      </tc-box>
    </div>
  `,
};

export const WithCustomStyles: StoryObj = {
  render: () => html`
    <div style="padding: 2rem; background: var(--paper-warm); border-radius: var(--radius-lg);">
      <tc-box
        .sx=${{
          padding: 'var(--space-lg)',
          background: 'var(--paper-white)',
          borderRadius: 'var(--radius-md)',
          boxShadow: 'var(--shadow-card)',
        }}
      >
        <tc-text>Content inside a styled box</tc-text>
      </tc-box>
    </div>
  `,
};

export const NestedBoxes: StoryObj = {
  render: () => html`
    <div style="padding: 2rem; background: var(--paper-warm); border-radius: var(--radius-lg);">
      <tc-box
        .sx=${{
          padding: 'var(--space-lg)',
          background: 'var(--paper-white)',
          borderRadius: 'var(--radius-md)',
        }}
      >
        <tc-section>
          <tc-text weight="600">Outer Box</tc-text>
          <tc-box
            .sx=${{
              padding: 'var(--space-md)',
              background: 'var(--paper-cream)',
              borderRadius: 'var(--radius-sm)',
            }}
          >
            <tc-text>Inner Box</tc-text>
          </tc-box>
        </tc-section>
      </tc-box>
    </div>
  `,
};
