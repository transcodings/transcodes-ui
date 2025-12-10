import type { Meta, StoryObj } from '@storybook/web-components-vite';
import { html } from 'lit';
import '../../widgets/tc-authenticator-card.js';

const meta: Meta = {
  title: 'Widgets/tc-authenticator-card',
  component: 'tc-authenticator-card',
  argTypes: {
    name: { control: 'text' },
    type: {
      control: 'select',
      options: ['passkey', 'totp', 'usb', 'phone', 'email'],
    },
    lastUsed: { control: 'text' },
    enabled: { control: 'boolean' },
    deletable: { control: 'boolean' },
    clickable: { control: 'boolean' },
  },
};

export default meta;

export const Default: StoryObj = {
  args: {
    name: 'MacBook Pro',
    type: 'passkey',
    lastUsed: 'Last used 2 hours ago',
    enabled: true,
    deletable: true,
    clickable: false,
  },
  render: (args) => html`
    <div style="max-width: 400px; padding: 2rem;">
      <tc-authenticator-card
        name=${args.name}
        type=${args.type}
        last-used=${args.lastUsed}
        ?enabled=${args.enabled}
        ?deletable=${args.deletable}
        ?clickable=${args.clickable}
        @tc-delete=${() => console.log('Delete clicked')}
      ></tc-authenticator-card>
    </div>
  `,
};

export const Types: StoryObj = {
  render: () => html`
    <div style="max-width: 400px; padding: 2rem; display: flex; flex-direction: column; gap: 0.75rem;">
      <tc-authenticator-card
        name="MacBook Pro"
        type="passkey"
        last-used="Last used 2 hours ago"
      ></tc-authenticator-card>
      <tc-authenticator-card
        name="Google Authenticator"
        type="totp"
        last-used="Added Dec 1, 2024"
      ></tc-authenticator-card>
      <tc-authenticator-card
        name="YubiKey 5"
        type="usb"
        last-used="Last used yesterday"
      ></tc-authenticator-card>
      <tc-authenticator-card
        name="+1 (555) 123-4567"
        type="phone"
        last-used="SMS verification"
      ></tc-authenticator-card>
      <tc-authenticator-card
        name="user@example.com"
        type="email"
        last-used="Email verification"
      ></tc-authenticator-card>
    </div>
  `,
};

export const PasskeyList: StoryObj = {
  render: () => html`
    <div style="max-width: 400px; padding: 2rem;">
      <h3 style="margin: 0 0 1rem; color: var(--ink-black);">Registered Passkeys</h3>
      <div style="display: flex; flex-direction: column; gap: 0.5rem;">
        <tc-authenticator-card
          name="MacBook Pro"
          type="passkey"
          last-used="Last used 2 hours ago"
          @tc-delete=${() => console.log('Delete MacBook')}
        ></tc-authenticator-card>
        <tc-authenticator-card
          name="iPhone 15 Pro"
          type="passkey"
          last-used="Last used yesterday"
          @tc-delete=${() => console.log('Delete iPhone')}
        ></tc-authenticator-card>
        <tc-authenticator-card
          name="iPad Pro"
          type="passkey"
          last-used="Added Dec 5, 2024"
          @tc-delete=${() => console.log('Delete iPad')}
        ></tc-authenticator-card>
      </div>
    </div>
  `,
};

export const Disabled: StoryObj = {
  render: () => html`
    <div style="max-width: 400px; padding: 2rem; display: flex; flex-direction: column; gap: 0.75rem;">
      <tc-authenticator-card
        name="MacBook Pro"
        type="passkey"
        last-used="Last used 2 hours ago"
        enabled
      ></tc-authenticator-card>
      <tc-authenticator-card
        name="Old Device"
        type="passkey"
        last-used="Disabled"
        ?enabled=${false}
      ></tc-authenticator-card>
    </div>
  `,
};

export const Clickable: StoryObj = {
  render: () => html`
    <div style="max-width: 400px; padding: 2rem; display: flex; flex-direction: column; gap: 0.75rem;">
      <tc-authenticator-card
        name="MacBook Pro"
        type="passkey"
        last-used="Click to view details"
        clickable
        ?deletable=${false}
        @tc-click=${() => console.log('Card clicked')}
      ></tc-authenticator-card>
      <tc-authenticator-card
        name="iPhone 15 Pro"
        type="passkey"
        last-used="Click to view details"
        clickable
        ?deletable=${false}
        @tc-click=${() => console.log('Card clicked')}
      ></tc-authenticator-card>
    </div>
  `,
};

export const NonDeletable: StoryObj = {
  render: () => html`
    <div style="max-width: 400px; padding: 2rem;">
      <tc-authenticator-card
        name="Primary Device"
        type="passkey"
        last-used="Cannot be deleted"
        ?deletable=${false}
      ></tc-authenticator-card>
    </div>
  `,
};
