import type { Meta, StoryObj } from '@storybook/web-components-vite';
import { html } from 'lit';
import '../primitives/tc-text.js';

const meta: Meta = {
  title: 'Primitives/tc-text',
  component: 'tc-text',
  argTypes: {
    tag: {
      control: 'select',
      options: [
        'p',
        'span',
        'div',
        'h1',
        'h2',
        'h3',
        'h4',
        'h5',
        'h6',
        'label',
      ],
    },
    size: {
      control: 'select',
      options: ['sm', 'base', 'lg', 'xl', '2xl'],
    },
    weight: {
      control: 'select',
      options: ['400', '500', '600', '700'],
    },
    color: {
      control: 'select',
      options: [
        'primary',
        'secondary',
        'tertiary',
        'muted',
        'accent',
        'success',
        'error',
        'warning',
        'info',
      ],
    },
  },
};

export default meta;

export const Default: StoryObj = {
  args: {
    tag: 'p',
    size: 'base',
    weight: '400',
    color: 'primary',
  },
  render: (args) => html`
    <div style="padding: 2rem; background: var(--paper-cream); border-radius: var(--radius-lg);">
      <tc-text tag=${args.tag} size=${args.size} weight=${args.weight} color=${args.color}>
        The quick brown fox jumps over the lazy dog
      </tc-text>
    </div>
  `,
};

export const Sizes: StoryObj = {
  render: () => html`
    <div style="display: flex; flex-direction: column; gap: 0.5rem; padding: 2rem; background: var(--paper-cream); border-radius: var(--radius-lg);">
      <tc-text size="2xl" weight="600">Heading 2XL</tc-text>
      <tc-text size="xl" weight="600">Heading XL</tc-text>
      <tc-text size="lg" weight="500">Heading LG</tc-text>
      <tc-text size="base">Body text at base size</tc-text>
      <tc-text size="sm" color="tertiary">Small muted text</tc-text>
    </div>
  `,
};

export const Colors: StoryObj = {
  render: () => html`
    <div style="display: flex; flex-direction: column; gap: 0.5rem; padding: 2rem; background: var(--paper-cream); border-radius: var(--radius-lg);">
      <tc-text color="primary">Primary (default)</tc-text>
      <tc-text color="secondary">Secondary</tc-text>
      <tc-text color="tertiary">Tertiary</tc-text>
      <tc-text color="muted">Muted</tc-text>
      <tc-text color="accent">Accent</tc-text>
      <tc-text color="success">Success</tc-text>
      <tc-text color="error">Error</tc-text>
      <tc-text color="warning">Warning</tc-text>
      <tc-text color="info">Info</tc-text>
    </div>
  `,
};

export const SemanticTags: StoryObj = {
  render: () => html`
    <div style="display: flex; flex-direction: column; gap: 0.5rem; padding: 2rem; background: var(--paper-cream); border-radius: var(--radius-lg);">
      <tc-text tag="h1" size="2xl" weight="700">H1 Heading</tc-text>
      <tc-text tag="h2" size="xl" weight="600">H2 Heading</tc-text>
      <tc-text tag="h3" size="lg" weight="600">H3 Heading</tc-text>
      <tc-text tag="p">Paragraph text</tc-text>
      <tc-text tag="span" size="sm">Inline span text</tc-text>
    </div>
  `,
};
