import type { Meta, StoryObj } from '@storybook/web-components-vite';
import { html } from 'lit';
import '../../primitives/tc-form-header.js';

const meta: Meta = {
  title: 'Primitives/tc-form-header',
  component: 'tc-form-header',
  argTypes: {
    title: { control: 'text' },
    subtitle: { control: 'text' },
    notice: { control: 'text' },
    'no-animation': { control: 'boolean' },
  },
};

export default meta;

export const Default: StoryObj = {
  args: {
    title: 'Create Account',
    subtitle: 'Enter your email to get started with secure authentication',
    notice: '',
    'no-animation': false,
  },
  render: (args) => html`
    <div style="padding: 2rem; background: var(--paper-cream); border-radius: var(--radius-lg);">
      <tc-form-header
        title=${args.title}
        subtitle=${args.subtitle}
        notice=${args.notice}
        ?no-animation=${args['no-animation']}
      ></tc-form-header>
    </div>
  `,
};

export const WithNotice: StoryObj = {
  render: () => html`
    <div style="padding: 2rem; background: var(--paper-cream); border-radius: var(--radius-lg);">
      <tc-form-header
        title="Verify Your Email"
        subtitle="We've sent a 6-digit code to your email"
        notice="Check your spam folder if you don't see it"
      ></tc-form-header>
    </div>
  `,
};

export const NoAnimation: StoryObj = {
  render: () => html`
    <div style="padding: 2rem; background: var(--paper-cream); border-radius: var(--radius-lg);">
      <tc-form-header
        title="Static Header"
        subtitle="This header has no entrance animation"
        no-animation
      ></tc-form-header>
    </div>
  `,
};
