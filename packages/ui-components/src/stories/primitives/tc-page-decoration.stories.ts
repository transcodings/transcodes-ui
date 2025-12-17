import type { Meta, StoryObj } from '@storybook/web-components-vite';
import { html } from 'lit';
import '../../primitives/tc-page-decoration.js';

const meta: Meta = {
  title: 'Primitives/tc-page-decoration',
  component: 'tc-page-decoration',
  argTypes: {
    variant: {
      control: 'select',
      options: ['primary', 'success', 'error'],
    },
  },
};

export default meta;

export const Default: StoryObj = {
  args: {
    variant: 'primary',
  },
  render: (args) => html`
    <div style="position: relative; width: 100%; height: 300px; border-radius: var(--radius-lg); overflow: hidden;">
      <tc-page-decoration variant=${args.variant}></tc-page-decoration>
      <div style="position: relative; z-index: 1; padding: 2rem; text-align: center;">
        <p style="color: var(--ink-dark); font-size: 1rem;">Content above decoration</p>
      </div>
    </div>
  `,
};

export const Variants: StoryObj = {
  render: () => html`
    <div style="display: flex; flex-direction: column; gap: 1rem;">
      <div style="position: relative; width: 100%; height: 200px; border-radius: var(--radius-lg); overflow: hidden; background: var(--paper-white);">
        <tc-page-decoration variant="primary"></tc-page-decoration>
        <div style="position: relative; z-index: 1; padding: 1rem; text-align: center;">
          <p style="color: var(--ink-dark);">Primary</p>
        </div>
      </div>
      <div style="position: relative; width: 100%; height: 200px; border-radius: var(--radius-lg); overflow: hidden; background: var(--paper-white);">
        <tc-page-decoration variant="success"></tc-page-decoration>
        <div style="position: relative; z-index: 1; padding: 1rem; text-align: center;">
          <p style="color: var(--ink-dark);">Success</p>
        </div>
      </div>
      <div style="position: relative; width: 100%; height: 200px; border-radius: var(--radius-lg); overflow: hidden; background: var(--paper-white);">
        <tc-page-decoration variant="error"></tc-page-decoration>
        <div style="position: relative; z-index: 1; padding: 1rem; text-align: center;">
          <p style="color: var(--ink-dark);">Error</p>
        </div>
      </div>
    </div>
  `,
};

export const InCard: StoryObj = {
  render: () => html`
    <div style="position: relative; width: 320px; height: 400px; border-radius: var(--radius-lg); overflow: hidden; background: var(--paper-white); box-shadow: var(--shadow-card);">
      <tc-page-decoration variant="success"></tc-page-decoration>
      <div style="position: relative; z-index: 1; padding: 2rem; display: flex; flex-direction: column; align-items: center; justify-content: center; height: 100%; box-sizing: border-box;">
        <p style="color: var(--ink-dark); font-size: 1.25rem; font-weight: 600; margin-bottom: 0.5rem;">Success!</p>
        <p style="color: var(--ink-dark); font-size: 0.875rem;">Your action was completed.</p>
      </div>
    </div>
  `,
};
