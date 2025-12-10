import type { Meta, StoryObj } from '@storybook/web-components-vite';
import { html } from 'lit';
import '../../primitives/tc-otp-input.js';

const meta: Meta = {
  title: 'Primitives/tc-otp-input',
  component: 'tc-otp-input',
  argTypes: {
    length: {
      control: { type: 'number', min: 4, max: 8 },
    },
    error: { control: 'boolean' },
    showProgress: { control: 'boolean' },
  },
};

export default meta;

export const Default: StoryObj = {
  args: {
    length: 6,
    error: false,
    showProgress: true,
  },
  render: (args) => html`
    <div style="max-width: 400px; padding: 2rem; background: var(--paper-warm); border-radius: var(--radius-lg);">
      <tc-otp-input
        length=${args.length}
        ?error=${args.error}
        .showProgress=${args.showProgress}
        @tc-change=${(e: CustomEvent) => console.log('OTP changed:', e.detail)}
        @tc-complete=${(e: CustomEvent) => console.log('OTP complete:', e.detail)}
      ></tc-otp-input>
    </div>
  `,
};

export const WithError: StoryObj = {
  render: () => html`
    <div style="max-width: 400px; padding: 2rem; background: var(--paper-warm); border-radius: var(--radius-lg);">
      <tc-otp-input error></tc-otp-input>
    </div>
  `,
};

export const NoProgress: StoryObj = {
  render: () => html`
    <div style="max-width: 400px; padding: 2rem; background: var(--paper-warm); border-radius: var(--radius-lg);">
      <tc-otp-input .showProgress=${false}></tc-otp-input>
    </div>
  `,
};

export const CustomLength: StoryObj = {
  render: () => html`
    <div style="max-width: 400px; padding: 2rem; background: var(--paper-warm); border-radius: var(--radius-lg);">
      <tc-otp-input length="4"></tc-otp-input>
    </div>
  `,
};
