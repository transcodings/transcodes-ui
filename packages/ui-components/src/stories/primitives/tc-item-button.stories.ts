import type { Meta, StoryObj } from '@storybook/web-components-vite';
import { html } from 'lit';
import '../../primitives/tc-item-button.js';
import '../../primitives/tc-icon.js';
import '../../primitives/tc-chip.js';

const meta: Meta = {
  title: 'Primitives/tc-item-button',
  component: 'tc-item-button',
  argTypes: {
    gap: {
      control: 'text',
      description: 'Gap between prefix, content, and suffix',
    },
    padding: {
      control: 'text',
      description: 'Inner padding of the button',
    },
    disabled: {
      control: 'boolean',
      description: 'Disable the button',
    },
    showArrow: {
      control: 'boolean',
      description: 'Show arrow indicator',
    },
  },
};

export default meta;

export const Default: StoryObj = {
  args: {
    gap: 'var(--space-md)',
    padding: 'var(--space-md)',
    disabled: false,
    showArrow: true,
  },
  render: (args) => html`
    <div style="max-width: 400px; padding: 2rem;">
      <tc-item-button
        gap=${args.gap}
        padding=${args.padding}
        ?disabled=${args.disabled}
        ?show-arrow=${args.showArrow}
        @tc-click=${() => console.log('Item button clicked!')}
      >
        Click me
      </tc-item-button>
    </div>
  `,
};

export const WithPrefix: StoryObj = {
  render: () => html`
    <div style="max-width: 400px; padding: 2rem; display: flex; flex-direction: column; gap: 1rem;">
      <tc-item-button @tc-click=${() => console.log('Profile clicked')}>
        <tc-icon slot="prefix" name="person" size="1.5rem"></tc-icon>
        View Profile
      </tc-item-button>
      <tc-item-button @tc-click=${() => console.log('Settings clicked')}>
        <tc-icon slot="prefix" name="lock" size="1.5rem"></tc-icon>
        Security Settings
      </tc-item-button>
      <tc-item-button @tc-click=${() => console.log('Device clicked')}>
        <tc-icon slot="prefix" name="device" size="1.5rem"></tc-icon>
        Manage Devices
      </tc-item-button>
    </div>
  `,
};

export const WithSuffix: StoryObj = {
  render: () => html`
    <div style="max-width: 400px; padding: 2rem; display: flex; flex-direction: column; gap: 1rem;">
      <tc-item-button>
        Notifications
        <tc-chip slot="suffix" variant="info" size="sm">5</tc-chip>
      </tc-item-button>
      <tc-item-button>
        Updates Available
        <tc-chip slot="suffix" variant="success" size="sm">New</tc-chip>
      </tc-item-button>
    </div>
  `,
};

export const WithoutArrow: StoryObj = {
  render: () => html`
    <div style="max-width: 400px; padding: 2rem; display: flex; flex-direction: column; gap: 1rem;">
      <tc-item-button ?show-arrow=${false}>
        <tc-icon slot="prefix" name="success" size="1.5rem"></tc-icon>
        No arrow indicator
      </tc-item-button>
    </div>
  `,
};

export const Disabled: StoryObj = {
  render: () => html`
    <div style="max-width: 400px; padding: 2rem; display: flex; flex-direction: column; gap: 1rem;">
      <tc-item-button disabled>
        <tc-icon slot="prefix" name="lock" size="1.5rem"></tc-icon>
        Disabled item button
      </tc-item-button>
      <tc-item-button>
        <tc-icon slot="prefix" name="person" size="1.5rem"></tc-icon>
        Enabled item button
      </tc-item-button>
    </div>
  `,
};

export const MenuExample: StoryObj = {
  render: () => html`
    <div style="max-width: 400px; padding: 2rem; display: flex; flex-direction: column; gap: 0.5rem;">
      <tc-item-button>
        <tc-icon slot="prefix" name="person" size="1.5rem"></tc-icon>
        Account
      </tc-item-button>
      <tc-item-button>
        <tc-icon slot="prefix" name="lock" size="1.5rem"></tc-icon>
        Privacy & Security
      </tc-item-button>
      <tc-item-button>
        <tc-icon slot="prefix" name="device" size="1.5rem"></tc-icon>
        Connected Devices
        <tc-chip slot="suffix" variant="info" size="sm">3</tc-chip>
      </tc-item-button>
      <tc-item-button>
        <tc-icon slot="prefix" name="email" size="1.5rem"></tc-icon>
        Notifications
      </tc-item-button>
      <tc-item-button disabled>
        <tc-icon slot="prefix" name="key" size="1.5rem"></tc-icon>
        Premium Features
        <tc-chip slot="suffix" variant="default" size="sm">Locked</tc-chip>
      </tc-item-button>
    </div>
  `,
};
