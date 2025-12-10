import type { Meta, StoryObj } from '@storybook/web-components-vite';
import { html } from 'lit';
import '../../primitives/tc-icon.js';
import '../../primitives/tc-text.js';

const allIcons = [
  // Navigation
  'arrow-left',
  'arrow-right',
  'chevron-left',
  'chevron-right',
  // Actions
  'check',
  'x',
  'close',
  // Status
  'error',
  'alert-circle',
  'info',
  'warning',
  'success',
  // Loading
  'loading',
  'loader',
  // Features
  'biometric',
  'email',
  'passkey',
  'bell',
  'download',
  'wifi-off',
  // Brand
  'apple',
  'google',
  'windows',
  'samsung',
  // General
  'phone',
  'lock',
  'person',
  'device',
  // Auth
  'totp',
  'email-otp',
  'qrcode',
  'key',
];

const meta: Meta = {
  title: 'Primitives/tc-icon',
  component: 'tc-icon',
  argTypes: {
    name: {
      control: 'select',
      options: allIcons,
      description: 'Icon name',
    },
    size: {
      control: 'text',
      description: 'Icon size (CSS value)',
    },
    color: {
      control: 'color',
      description: 'Icon color',
    },
  },
};

export default meta;

export const Default: StoryObj = {
  args: {
    name: 'bell',
    size: '1.5rem',
    color: 'currentColor',
  },
  render: (args) => html`
    <div style="padding: 2rem; background: var(--paper-cream); border-radius: var(--radius-lg);">
      <tc-icon name=${args.name} size=${args.size} color=${args.color}></tc-icon>
    </div>
  `,
};

export const AllIcons: StoryObj = {
  render: () => html`
    <div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(100px, 1fr)); gap: 1rem; padding: 2rem; background: var(--paper-cream); border-radius: var(--radius-lg);">
      ${allIcons.map(
        (name) => html`
          <div
            style="display: flex; flex-direction: column; align-items: center; gap: 0.5rem; padding: 1rem; background: var(--paper-white); border-radius: var(--radius-md);"
          >
            <tc-icon name=${name} size="1.5rem"></tc-icon>
            <tc-text size="xs" color="tertiary">${name}</tc-text>
          </div>
        `,
      )}
    </div>
  `,
};

export const BrandIcons: StoryObj = {
  render: () => html`
    <div style="display: flex; gap: 2rem; padding: 2rem; background: var(--paper-cream); border-radius: var(--radius-lg);">
      ${['apple', 'google', 'windows', 'samsung'].map(
        (name) => html`
          <div style="display: flex; flex-direction: column; align-items: center; gap: 0.5rem;">
            <tc-icon name=${name} size="2rem"></tc-icon>
            <tc-text size="sm">${name}</tc-text>
          </div>
        `,
      )}
    </div>
  `,
};

export const AuthIcons: StoryObj = {
  render: () => html`
    <div style="display: flex; gap: 2rem; padding: 2rem; background: var(--paper-cream); border-radius: var(--radius-lg);">
      ${['passkey', 'biometric', 'totp', 'email-otp', 'qrcode', 'key'].map(
        (name) => html`
          <div style="display: flex; flex-direction: column; align-items: center; gap: 0.5rem;">
            <tc-icon name=${name} size="2rem" color="var(--accent-primary)"></tc-icon>
            <tc-text size="sm">${name}</tc-text>
          </div>
        `,
      )}
    </div>
  `,
};

export const Sizes: StoryObj = {
  render: () => html`
    <div style="display: flex; gap: 1.5rem; align-items: center; padding: 2rem; background: var(--paper-cream); border-radius: var(--radius-lg);">
      <div style="text-align: center;">
        <tc-icon name="bell" size="1rem"></tc-icon>
        <tc-text size="xs" color="tertiary">1rem</tc-text>
      </div>
      <div style="text-align: center;">
        <tc-icon name="bell" size="1.5rem"></tc-icon>
        <tc-text size="xs" color="tertiary">1.5rem</tc-text>
      </div>
      <div style="text-align: center;">
        <tc-icon name="bell" size="2rem"></tc-icon>
        <tc-text size="xs" color="tertiary">2rem</tc-text>
      </div>
      <div style="text-align: center;">
        <tc-icon name="bell" size="2.5rem"></tc-icon>
        <tc-text size="xs" color="tertiary">2.5rem</tc-text>
      </div>
      <div style="text-align: center;">
        <tc-icon name="bell" size="3rem"></tc-icon>
        <tc-text size="xs" color="tertiary">3rem</tc-text>
      </div>
    </div>
  `,
};

export const Colors: StoryObj = {
  render: () => html`
    <div style="display: flex; gap: 1.5rem; padding: 2rem; background: var(--paper-cream); border-radius: var(--radius-lg);">
      <tc-icon name="info" size="2rem" color="var(--accent-primary)"></tc-icon>
      <tc-icon name="success" size="2rem" color="var(--accent-success)"></tc-icon>
      <tc-icon name="warning" size="2rem" color="var(--accent-warning)"></tc-icon>
      <tc-icon name="error" size="2rem" color="var(--error-base)"></tc-icon>
      <tc-icon name="bell" size="2rem" color="var(--ink-dark)"></tc-icon>
      <tc-icon name="bell" size="2rem" color="var(--ink-light)"></tc-icon>
    </div>
  `,
};
