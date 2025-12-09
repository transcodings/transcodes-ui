import type { Meta, StoryObj } from '@storybook/web-components-vite';
import { html } from 'lit';

// Import all primitives
import '../primitives/tc-box.js';
import '../primitives/tc-text.js';
import '../primitives/tc-icon.js';
import '../primitives/tc-divider.js';
import '../primitives/tc-chip.js';
import '../primitives/tc-spinner.js';
import '../primitives/tc-button.js';
import '../primitives/tc-input.js';
import '../primitives/tc-container.js';
import '../primitives/tc-section.js';
import '../primitives/tc-callout.js';
import '../primitives/tc-symbol.js';
import '../primitives/tc-item.js';
import '../primitives/tc-item-button.js';
import '../primitives/tc-toast.js';
import '../primitives/tc-card.js';
import '../primitives/tc-form-header.js';
import '../primitives/tc-otp-input.js';

// ============= tc-button =============
const buttonMeta: Meta = {
  title: 'Primitives/tc-button',
  component: 'tc-button',
  argTypes: {
    variant: {
      control: 'select',
      options: ['primary', 'secondary', 'success'],
    },
    size: {
      control: 'select',
      options: ['default', 'small'],
    },
    loading: { control: 'boolean' },
    disabled: { control: 'boolean' },
    fullWidth: { control: 'boolean' },
  },
};

export default buttonMeta;

export const Button: StoryObj = {
  args: {
    variant: 'primary',
    size: 'default',
    loading: false,
    disabled: false,
    fullWidth: false,
  },
  render: (args) => html`
    <tc-button
      variant=${args.variant}
      size=${args.size}
      ?loading=${args.loading}
      ?disabled=${args.disabled}
      ?full-width=${args.fullWidth}
    >
      Click me
    </tc-button>
  `,
};

export const ButtonVariants: StoryObj = {
  render: () => html`
    <div style="display: flex; gap: 1rem; flex-wrap: wrap;">
      <tc-button variant="primary">Primary</tc-button>
      <tc-button variant="secondary">Secondary</tc-button>
      <tc-button variant="success">Success</tc-button>
    </div>
  `,
};

export const ButtonStates: StoryObj = {
  render: () => html`
    <div style="display: flex; gap: 1rem; flex-wrap: wrap;">
      <tc-button variant="primary">Normal</tc-button>
      <tc-button variant="primary" loading>Loading</tc-button>
      <tc-button variant="primary" disabled>Disabled</tc-button>
    </div>
  `,
};

// ============= tc-input =============
export const Input: StoryObj = {
  render: () => html`
    <div style="max-width: 300px;">
      <tc-input label="Email" placeholder="Enter your email" type="email"></tc-input>
    </div>
  `,
};

export const InputWithError: StoryObj = {
  render: () => html`
    <div style="max-width: 300px;">
      <tc-input
        label="Email"
        placeholder="Enter your email"
        value="invalid-email"
        error="Please enter a valid email address"
      ></tc-input>
    </div>
  `,
};

// ============= tc-text =============
export const Text: StoryObj = {
  render: () => html`
    <div style="display: flex; flex-direction: column; gap: 0.5rem;">
      <tc-text size="2xl" weight="600">Heading 2XL</tc-text>
      <tc-text size="xl" weight="600">Heading XL</tc-text>
      <tc-text size="lg" weight="500">Heading LG</tc-text>
      <tc-text size="base">Body text at base size</tc-text>
      <tc-text size="sm" color="var(--ink-medium)">Small muted text</tc-text>
    </div>
  `,
};

// ============= tc-icon =============
export const Icons: StoryObj = {
  render: () => html`
    <div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(100px, 1fr)); gap: 1rem;">
      ${[
        'check',
        'x',
        'chevron-right',
        'chevron-left',
        'alert-circle',
        'info',
        'loader',
        'bell',
        'download',
        'wifi-off',
        'passkey',
      ].map(
        (name) => html`
          <div
            style="display: flex; flex-direction: column; align-items: center; gap: 0.5rem; padding: 1rem; background: var(--paper-cream); border-radius: var(--radius-md);"
          >
            <tc-icon name=${name} size="1.5rem"></tc-icon>
            <tc-text size="sm">${name}</tc-text>
          </div>
        `,
      )}
    </div>
  `,
};

// ============= tc-chip =============
export const Chips: StoryObj = {
  render: () => html`
    <div style="display: flex; gap: 0.5rem; flex-wrap: wrap;">
      <tc-chip variant="default">Default</tc-chip>
      <tc-chip variant="primary">Primary</tc-chip>
      <tc-chip variant="success">Success</tc-chip>
      <tc-chip variant="warning">Warning</tc-chip>
      <tc-chip variant="error">Error</tc-chip>
    </div>
  `,
};

// ============= tc-callout =============
export const Callouts: StoryObj = {
  render: () => html`
    <div style="display: flex; flex-direction: column; gap: 1rem; max-width: 400px;">
      <tc-callout variant="info">This is an informational message.</tc-callout>
      <tc-callout variant="success">Operation completed successfully!</tc-callout>
      <tc-callout variant="warning">Please review before proceeding.</tc-callout>
      <tc-callout variant="error">An error occurred. Please try again.</tc-callout>
    </div>
  `,
};

// ============= tc-spinner =============
export const Spinners: StoryObj = {
  render: () => html`
    <div style="display: flex; gap: 2rem; align-items: center;">
      <tc-spinner size="1.5rem"></tc-spinner>
      <tc-spinner size="2rem"></tc-spinner>
      <tc-spinner size="3rem"></tc-spinner>
    </div>
  `,
};

// ============= tc-symbol =============
export const Symbols: StoryObj = {
  render: () => html`
    <div style="display: flex; gap: 1rem; align-items: center;">
      <tc-symbol size="2rem" background="var(--accent-primary)" color="white">A</tc-symbol>
      <tc-symbol size="2.5rem" background="var(--accent-success)" color="white">
        <tc-icon name="check" size="1.25rem"></tc-icon>
      </tc-symbol>
      <tc-symbol size="3rem" background="var(--paper-warm)" color="var(--ink-dark)">JD</tc-symbol>
    </div>
  `,
};

// ============= tc-divider =============
export const Divider: StoryObj = {
  render: () => html`
    <div style="padding: 1rem;">
      <tc-text>Content above</tc-text>
      <tc-divider></tc-divider>
      <tc-text>Content below</tc-text>
    </div>
  `,
};

// ============= tc-item & tc-item-button =============
export const Items: StoryObj = {
  render: () => html`
    <div style="display: flex; flex-direction: column; gap: 0.5rem; max-width: 400px;">
      <tc-item>
        <tc-symbol slot="prefix" size="2.5rem" background="var(--accent-primary)" color="white">
          <tc-icon name="bell" size="1.25rem"></tc-icon>
        </tc-symbol>
        <div>
          <tc-text weight="500">Notifications</tc-text>
          <tc-text size="sm" color="var(--ink-medium)">Manage your alerts</tc-text>
        </div>
      </tc-item>

      <tc-item-button @tc-click=${() => console.log('clicked')}>
        <tc-symbol slot="prefix" size="2.5rem" background="var(--accent-success)" color="white">
          <tc-icon name="passkey" size="1.25rem"></tc-icon>
        </tc-symbol>
        <div>
          <tc-text weight="500">Security</tc-text>
          <tc-text size="sm" color="var(--ink-medium)">Passkeys and authentication</tc-text>
        </div>
      </tc-item-button>
    </div>
  `,
};

// ============= tc-container & tc-section =============
export const Layout: StoryObj = {
  render: () => html`
    <tc-container>
      <tc-section gap="var(--space-lg)">
        <tc-text size="xl" weight="600">Welcome</tc-text>
        <tc-text color="var(--ink-medium)">
          This is a container with a section inside. The container centers content with a max-width,
          and the section provides vertical spacing.
        </tc-text>
        <tc-button variant="primary">Get Started</tc-button>
      </tc-section>
    </tc-container>
  `,
};

// ============= tc-box =============
export const Box: StoryObj = {
  render: () => html`
    <tc-box
      .sx=${{
        padding: 'var(--space-lg)',
        background: 'var(--paper-cream)',
        borderRadius: 'var(--radius-md)',
      }}
    >
      <tc-text>Content inside a styled box</tc-text>
    </tc-box>
  `,
};

// ============= tc-card =============
export const Card: StoryObj = {
  render: () => html`
    <div style="padding: 2rem; background: var(--paper-cream);">
      <tc-card>
        <tc-section gap="var(--space-md)">
          <tc-text size="xl" weight="600">Card Title</tc-text>
          <tc-text color="var(--ink-medium)">
            This is a card component with layered shadows and an optional inner border effect.
          </tc-text>
          <tc-button variant="primary">Action</tc-button>
        </tc-section>
      </tc-card>
    </div>
  `,
};

export const CardNoBorder: StoryObj = {
  render: () => html`
    <div style="padding: 2rem; background: var(--paper-cream);">
      <tc-card no-border>
        <tc-text>Card without inner border effect</tc-text>
      </tc-card>
    </div>
  `,
};

// ============= tc-form-header =============
export const FormHeader: StoryObj = {
  render: () => html`
    <tc-form-header
      title="Create Account"
      subtitle="Enter your email to get started with secure authentication"
    ></tc-form-header>
  `,
};

export const FormHeaderWithNotice: StoryObj = {
  render: () => html`
    <tc-form-header
      title="Verify Your Email"
      subtitle="We've sent a 6-digit code to your email"
      notice="Check your spam folder if you don't see it"
    ></tc-form-header>
  `,
};

// ============= tc-otp-input =============
export const OtpInput: StoryObj = {
  render: () => html`
    <div style="max-width: 400px;">
      <tc-otp-input
        @tc-change=${(e: CustomEvent) => console.log('OTP changed:', e.detail)}
        @tc-complete=${(e: CustomEvent) => console.log('OTP complete:', e.detail)}
      ></tc-otp-input>
    </div>
  `,
};

export const OtpInputError: StoryObj = {
  render: () => html`
    <div style="max-width: 400px;">
      <tc-otp-input error></tc-otp-input>
    </div>
  `,
};

export const OtpInputNoProgress: StoryObj = {
  render: () => html`
    <div style="max-width: 400px;">
      <tc-otp-input .showProgress=${false}></tc-otp-input>
    </div>
  `,
};
