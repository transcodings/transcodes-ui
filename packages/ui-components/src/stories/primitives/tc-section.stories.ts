import type { Meta, StoryObj } from '@storybook/web-components-vite';
import { html } from 'lit';
import '../../primitives/tc-section.js';
import '../../primitives/tc-text.js';
import '../../primitives/tc-button.js';
import '../../primitives/tc-divider.js';

const meta: Meta = {
  title: 'Primitives/tc-section',
  component: 'tc-section',
};

export default meta;

export const Default: StoryObj = {
  render: () => html`
    <div style="padding: 2rem; background: var(--paper-warm); border-radius: var(--radius-lg);">
      <tc-section>
        <tc-text size="xl" weight="600">Section Title</tc-text>
        <tc-text color="tertiary">
          This is a section with default gap spacing between children.
        </tc-text>
        <tc-button variant="primary">Action</tc-button>
      </tc-section>
    </div>
  `,
};

export const CustomGap: StoryObj = {
  render: () => html`
    <div style="padding: 2rem; background: var(--paper-warm); border-radius: var(--radius-lg);">
      <tc-section .sx=${{ gap: 'var(--space-xl)' }}>
        <tc-text size="xl" weight="600">Large Gap Section</tc-text>
        <tc-text color="tertiary">
          This section uses a larger gap (space-xl) between elements.
        </tc-text>
        <tc-button variant="primary">Action</tc-button>
      </tc-section>
    </div>
  `,
};

export const SmallGap: StoryObj = {
  render: () => html`
    <div style="padding: 2rem; background: var(--paper-warm); border-radius: var(--radius-lg);">
      <tc-section .sx=${{ gap: 'var(--space-sm)' }}>
        <tc-text size="xl" weight="600">Compact Section</tc-text>
        <tc-text color="tertiary">Tight spacing for compact layouts.</tc-text>
        <tc-button variant="secondary">Action</tc-button>
      </tc-section>
    </div>
  `,
};

export const MultipleSections: StoryObj = {
  render: () => html`
    <div style="padding: 2rem; background: var(--paper-warm); border-radius: var(--radius-lg);">
      <tc-section .sx=${{ gap: 'var(--space-lg)' }}>
        <tc-text size="xl" weight="600">First Section</tc-text>
        <tc-text color="tertiary">Content for the first section.</tc-text>
      </tc-section>
      <tc-divider></tc-divider>
      <tc-section .sx=${{ gap: 'var(--space-lg)' }}>
        <tc-text size="xl" weight="600">Second Section</tc-text>
        <tc-text color="tertiary">Content for the second section.</tc-text>
      </tc-section>
    </div>
  `,
};
