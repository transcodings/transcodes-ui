import type { Meta, StoryObj } from '@storybook/web-components-vite';
import { html } from 'lit';
import '../../primitives/tc-input.js';
import '../../primitives/tc-text.js';
import '../../primitives/tc-section.js';

const meta: Meta = {
  title: 'Primitives/tc-input',
  component: 'tc-input',
  argTypes: {
    label: { control: 'text', description: 'Input label' },
    placeholder: { control: 'text', description: 'Placeholder text' },
    value: { control: 'text', description: 'Input value' },
    type: {
      control: 'select',
      options: ['text', 'email', 'password', 'number', 'tel', 'url'],
      description: 'Input type',
    },
    error: { control: 'text', description: 'Error message' },
    disabled: { control: 'boolean', description: 'Disabled state' },
    required: { control: 'boolean', description: 'Required state' },
    maxlength: { control: 'number', description: 'Maximum input length' },
    autocomplete: { control: 'text', description: 'Autocomplete attribute' },
    inputmode: {
      control: 'select',
      options: [
        'none',
        'text',
        'decimal',
        'numeric',
        'tel',
        'search',
        'email',
        'url',
      ],
      description: 'Input mode for virtual keyboards',
    },
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
        @tc-input=${(e: CustomEvent) => console.log('tc-input:', e.detail)}
        @tc-keydown=${(e: CustomEvent) => console.log('tc-keydown:', e.detail)}
        @tc-paste=${(e: CustomEvent) => console.log('tc-paste:', e.detail)}
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

export const InputTypes: StoryObj = {
  render: () => html`
    <div style="display: flex; flex-direction: column; gap: 1rem; max-width: 300px; padding: 2rem; background: var(--paper-warm); border-radius: var(--radius-lg);">
      <tc-input label="Text" type="text" placeholder="Enter text"></tc-input>
      <tc-input label="Email" type="email" placeholder="you@example.com"></tc-input>
      <tc-input label="Password" type="password" placeholder="Enter password"></tc-input>
      <tc-input label="Number" type="number" placeholder="Enter number"></tc-input>
      <tc-input label="Phone" type="tel" placeholder="+1 (555) 000-0000" inputmode="tel"></tc-input>
    </div>
  `,
};

export const Events: StoryObj = {
  name: 'Events (tc-keydown, tc-paste)',
  render: () => html`
    <div style="max-width: 300px; padding: 2rem; background: var(--paper-warm); border-radius: var(--radius-lg);">
      <tc-section .sx=${{ gap: 'var(--space-md)' }}>
        <tc-text size="sm" color="tertiary">
          Open the console to see events. Try typing or pasting text.
        </tc-text>
        <tc-input
          label="Test Input"
          placeholder="Type or paste here"
          @tc-input=${(e: CustomEvent) => console.log('tc-input:', e.detail)}
          @tc-keydown=${(e: CustomEvent) => console.log('tc-keydown:', e.detail.key)}
          @tc-paste=${(e: CustomEvent) => console.log('tc-paste:', e.detail.data)}
          @tc-blur=${(e: CustomEvent) => console.log('tc-blur:', e.detail)}
        ></tc-input>
      </tc-section>
    </div>
  `,
};
