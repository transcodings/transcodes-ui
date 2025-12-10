import type { Meta, StoryObj } from '@storybook/web-components-vite';
import { html } from 'lit';
import '../widgets/tc-page-decoration.js';
import '../primitives/tc-text.js';

const meta: Meta = {
  title: 'Widgets/tc-page-decoration',
  component: 'tc-page-decoration',
};

export default meta;

export const Primary: StoryObj = {
  render: () => html`
    <div style="height: 400px; position: relative; overflow: hidden; border-radius: var(--radius-lg); background: var(--paper-cream);">
      <tc-page-decoration variant="primary" style="position: absolute;"></tc-page-decoration>
      <div style="position: relative; z-index: 1; padding: 2rem; text-align: center;">
        <tc-text size="xl" weight="600">Primary Decoration</tc-text>
        <tc-text color="tertiary">Purple floating blobs in the background</tc-text>
      </div>
    </div>
  `,
};

export const Success: StoryObj = {
  render: () => html`
    <div style="height: 400px; position: relative; overflow: hidden; border-radius: var(--radius-lg); background: var(--paper-cream);">
      <tc-page-decoration variant="success" style="position: absolute;"></tc-page-decoration>
      <div style="position: relative; z-index: 1; padding: 2rem; text-align: center;">
        <tc-text size="xl" weight="600">Success Decoration</tc-text>
        <tc-text color="tertiary">Green floating blobs for success states</tc-text>
      </div>
    </div>
  `,
};

export const ErrorVariant: StoryObj = {
  render: () => html`
    <div style="height: 400px; position: relative; overflow: hidden; border-radius: var(--radius-lg); background: var(--paper-cream);">
      <tc-page-decoration variant="error" style="position: absolute;"></tc-page-decoration>
      <div style="position: relative; z-index: 1; padding: 2rem; text-align: center;">
        <tc-text size="xl" weight="600">Error Decoration</tc-text>
        <tc-text color="tertiary">Red floating blobs for error states</tc-text>
      </div>
    </div>
  `,
};
