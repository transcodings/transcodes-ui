import type { Meta, StoryObj } from '@storybook/web-components-vite';
import { html } from 'lit';
import '../../primitives/tc-input-with-chip.js';

const meta: Meta = {
  title: 'Primitives/tc-input-with-chip',
  component: 'tc-input-with-chip',
  argTypes: {
    label: { control: 'text' },
    placeholder: { control: 'text' },
    value: { control: 'text' },
    error: { control: 'text' },
    chipLabel: { control: 'text' },
    chipIcon: { control: 'text' },
    chipVariant: {
      control: 'select',
      options: ['default', 'success', 'error', 'info'],
    },
    disabled: { control: 'boolean' },
    readonly: { control: 'boolean' },
  },
};

export default meta;

export const Default: StoryObj = {
  args: {
    label: 'Email',
    placeholder: 'Enter your email',
    chipLabel: 'Passkey',
    chipIcon: 'key',
    chipVariant: 'success',
    disabled: false,
    readonly: false,
  },
  render: (args) => html`
    <div style="max-width: 400px; padding: 2rem;">
      <tc-input-with-chip
        label=${args.label}
        placeholder=${args.placeholder}
        value=${args.value || ''}
        error=${args.error || ''}
        chip-label=${args.chipLabel}
        chip-icon=${args.chipIcon}
        chip-variant=${args.chipVariant}
        ?disabled=${args.disabled}
        ?readonly=${args.readonly}
      ></tc-input-with-chip>
    </div>
  `,
};

export const WithValue: StoryObj = {
  render: () => html`
    <div style="max-width: 400px; padding: 2rem;">
      <tc-input-with-chip
        label="Email"
        value="user@example.com"
        chip-label="Passkey"
        chip-icon="key"
        chip-variant="success"
        readonly
      ></tc-input-with-chip>
    </div>
  `,
};

export const AuthenticationMethods: StoryObj = {
  render: () => html`
    <div style="max-width: 400px; padding: 2rem; display: flex; flex-direction: column; gap: 1.5rem;">
      <tc-input-with-chip
        label="Email"
        value="user@example.com"
        chip-label="Passkey"
        chip-icon="key"
        chip-variant="success"
        readonly
      ></tc-input-with-chip>
      <tc-input-with-chip
        label="Phone"
        value="+1 (555) 123-4567"
        chip-label="SMS"
        chip-icon="phone"
        chip-variant="info"
        readonly
      ></tc-input-with-chip>
      <tc-input-with-chip
        label="Email"
        value="user@example.com"
        chip-label="TOTP"
        chip-icon="totp"
        chip-variant="default"
        readonly
      ></tc-input-with-chip>
    </div>
  `,
};

export const WithError: StoryObj = {
  render: () => html`
    <div style="max-width: 400px; padding: 2rem;">
      <tc-input-with-chip
        label="Email"
        placeholder="Enter your email"
        error="Please enter a valid email address"
        chip-label="Passkey"
        chip-icon="key"
        chip-variant="error"
      ></tc-input-with-chip>
    </div>
  `,
};

export const Disabled: StoryObj = {
  render: () => html`
    <div style="max-width: 400px; padding: 2rem;">
      <tc-input-with-chip
        label="Email"
        value="user@example.com"
        chip-label="Passkey"
        chip-icon="key"
        chip-variant="success"
        disabled
      ></tc-input-with-chip>
    </div>
  `,
};

export const NoChip: StoryObj = {
  render: () => html`
    <div style="max-width: 400px; padding: 2rem;">
      <tc-input-with-chip
        label="Username"
        placeholder="Enter your username"
      ></tc-input-with-chip>
    </div>
  `,
};
