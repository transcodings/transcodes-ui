import type { Meta, StoryObj } from '@storybook/web-components-vite';
import { html } from 'lit';
import '../../primitives/tc-divider.js';
import '../../primitives/tc-text.js';

const meta: Meta = {
  title: 'Primitives/tc-divider',
  component: 'tc-divider',
  argTypes: {
    text: {
      control: 'text',
      description: 'Optional text to display in the center of the divider',
    },
    color: {
      control: 'color',
      description: 'Divider line color',
    },
    spacing: {
      control: 'text',
      description: 'Vertical margin (CSS value)',
    },
  },
};

export default meta;

export const Default: StoryObj = {
  args: {
    text: '',
    color: 'var(--ink-faint)',
    spacing: 'var(--space-md)',
  },
  render: (args) => html`
    <div style="max-width: 400px; padding: 2rem; background: var(--paper-cream); border-radius: var(--radius-lg);">
      <tc-text>Content above the divider</tc-text>
      <tc-divider
        text=${args.text}
        color=${args.color}
        spacing=${args.spacing}
      ></tc-divider>
      <tc-text>Content below the divider</tc-text>
    </div>
  `,
};

export const Simple: StoryObj = {
  render: () => html`
    <div style="max-width: 400px; padding: 2rem; background: var(--paper-cream); border-radius: var(--radius-lg);">
      <tc-text>First section</tc-text>
      <tc-divider></tc-divider>
      <tc-text>Second section</tc-text>
      <tc-divider></tc-divider>
      <tc-text>Third section</tc-text>
    </div>
  `,
};

export const WithText: StoryObj = {
  render: () => html`
    <div style="max-width: 400px; padding: 2rem; background: var(--paper-cream); border-radius: var(--radius-lg);">
      <tc-text>Sign in with your email</tc-text>
      <tc-divider text="OR"></tc-divider>
      <tc-text>Continue with social login</tc-text>
    </div>
  `,
};

export const TextVariations: StoryObj = {
  render: () => html`
    <div style="display: flex; flex-direction: column; gap: 2rem; max-width: 400px; padding: 2rem; background: var(--paper-cream); border-radius: var(--radius-lg);">
      <div>
        <tc-divider text="OR"></tc-divider>
      </div>
      <div>
        <tc-divider text="Continue with"></tc-divider>
      </div>
      <div>
        <tc-divider text="More options"></tc-divider>
      </div>
    </div>
  `,
};

export const CustomColors: StoryObj = {
  render: () => html`
    <div style="display: flex; flex-direction: column; gap: 1rem; max-width: 400px; padding: 2rem; background: var(--paper-cream); border-radius: var(--radius-lg);">
      <tc-divider color="var(--accent-primary)"></tc-divider>
      <tc-divider color="var(--error-base)" text="Error"></tc-divider>
      <tc-divider color="var(--accent-success)" text="Success"></tc-divider>
    </div>
  `,
};
