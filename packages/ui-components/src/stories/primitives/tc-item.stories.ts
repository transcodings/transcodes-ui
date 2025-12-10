import type { Meta, StoryObj } from '@storybook/web-components-vite';
import { html } from 'lit';
import '../../primitives/tc-item.js';
import '../../primitives/tc-icon.js';
import '../../primitives/tc-chip.js';

const meta: Meta = {
  title: 'Primitives/tc-item',
  component: 'tc-item',
  argTypes: {
    gap: {
      control: 'text',
      description: 'Gap between prefix, content, and suffix',
    },
    padding: {
      control: 'text',
      description: 'Inner padding of the item',
    },
  },
};

export default meta;

export const Default: StoryObj = {
  args: {
    gap: 'var(--space-md)',
    padding: 'var(--space-md)',
  },
  render: (args) => html`
    <div style="max-width: 400px; padding: 2rem;">
      <tc-item gap=${args.gap} padding=${args.padding}>
        Basic item content
      </tc-item>
    </div>
  `,
};

export const WithPrefix: StoryObj = {
  render: () => html`
    <div style="max-width: 400px; padding: 2rem; display: flex; flex-direction: column; gap: 1rem;">
      <tc-item>
        <tc-icon slot="prefix" name="person" size="1.5rem"></tc-icon>
        User profile
      </tc-item>
      <tc-item>
        <tc-icon slot="prefix" name="email" size="1.5rem"></tc-icon>
        Email settings
      </tc-item>
      <tc-item>
        <tc-icon slot="prefix" name="lock" size="1.5rem"></tc-icon>
        Security options
      </tc-item>
    </div>
  `,
};

export const WithSuffix: StoryObj = {
  render: () => html`
    <div style="max-width: 400px; padding: 2rem; display: flex; flex-direction: column; gap: 1rem;">
      <tc-item>
        Notifications
        <tc-chip slot="suffix" variant="info" size="sm">3</tc-chip>
      </tc-item>
      <tc-item>
        Messages
        <tc-chip slot="suffix" variant="success" size="sm">New</tc-chip>
      </tc-item>
    </div>
  `,
};

export const WithPrefixAndSuffix: StoryObj = {
  render: () => html`
    <div style="max-width: 400px; padding: 2rem; display: flex; flex-direction: column; gap: 1rem;">
      <tc-item>
        <tc-icon slot="prefix" name="device" size="1.5rem"></tc-icon>
        My Device
        <tc-chip slot="suffix" variant="success" size="sm">Active</tc-chip>
      </tc-item>
      <tc-item>
        <tc-icon slot="prefix" name="phone" size="1.5rem"></tc-icon>
        Mobile Phone
        <tc-chip slot="suffix" variant="default" size="sm">Pending</tc-chip>
      </tc-item>
    </div>
  `,
};

export const CustomStyling: StoryObj = {
  render: () => html`
    <div style="max-width: 400px; padding: 2rem; display: flex; flex-direction: column; gap: 1rem;">
      <tc-item padding="var(--space-lg)" .sx=${{ background: 'var(--accent-primary)', color: 'white', borderRadius: 'var(--radius-lg)' }}>
        <tc-icon slot="prefix" name="success" size="1.5rem" color="white"></tc-icon>
        Custom styled item
      </tc-item>
    </div>
  `,
};
