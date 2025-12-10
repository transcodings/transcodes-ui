import type { Meta, StoryObj } from '@storybook/web-components-vite';
import { html } from 'lit';
import '../primitives/tc-input.js';

const meta: Meta = {
  title: 'Primitives/tc-input',
  component: 'tc-input',
  argTypes: {
    label: { control: 'text' },
    placeholder: { control: 'text' },
    value: { control: 'text' },
    type: {
      control: 'select',
      options: ['text', 'email', 'password', 'number', 'tel'],
    },
    error: { control: 'text' },
    disabled: { control: 'boolean' },
    required: { control: 'boolean' },
  },
};

export default meta;

export const Default: StoryObj = {
  args: {
    label: 'Email',
    placeholder: 'Enter your email',
    type: 'email',
    value: '',
    error: '',
    disabled: false,
    required: false,
  },
  render: (args) => html`
    <div style="max-width: 300px; padding: 2rem; background: var(--paper-warm); border-radius: var(--radius-lg);">
      <tc-input
        label=${args.label}
        placeholder=${args.placeholder}
        type=${args.type}
        value=${args.value}
        error=${args.error}
        ?disabled=${args.disabled}
        ?required=${args.required}
      ></tc-input>
    </div>
  `,
};

export const WithError: StoryObj = {
  render: () => html`
    <div style="max-width: 300px; padding: 2rem; background: var(--paper-warm); border-radius: var(--radius-lg);">
      <tc-input
        label="Email"
        placeholder="Enter your email"
        value="invalid-email"
        error="Please enter a valid email address"
      ></tc-input>
    </div>
  `,
};

export const Disabled: StoryObj = {
  render: () => html`
    <div style="max-width: 300px; padding: 2rem; background: var(--paper-warm); border-radius: var(--radius-lg);">
      <tc-input
        label="Username"
        value="john_doe"
        disabled
      ></tc-input>
    </div>
  `,
};
