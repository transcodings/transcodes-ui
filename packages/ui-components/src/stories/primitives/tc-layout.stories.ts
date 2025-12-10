import type { Meta, StoryObj } from '@storybook/web-components-vite';
import { html } from 'lit';
import '../../primitives/tc-box.js';
import '../../primitives/tc-container.js';
import '../../primitives/tc-section.js';
import '../../primitives/tc-divider.js';
import '../../primitives/tc-symbol.js';
import '../../primitives/tc-item.js';
import '../../primitives/tc-item-button.js';
import '../../primitives/tc-text.js';
import '../../primitives/tc-button.js';
import '../../primitives/tc-icon.js';

const meta: Meta = {
  title: 'Primitives/tc-layout',
};

export default meta;

export const Container: StoryObj = {
  render: () => html`
    <div style="padding: 2rem; background: var(--paper-warm); border-radius: var(--radius-lg);">
      <tc-container>
        <tc-section gap="var(--space-lg)">
          <tc-text size="xl" weight="600">Welcome</tc-text>
          <tc-text color="tertiary">
            This is a container with a section inside. The container centers content with a max-width,
            and the section provides vertical spacing.
          </tc-text>
          <tc-button variant="primary">Get Started</tc-button>
        </tc-section>
      </tc-container>
    </div>
  `,
};

export const Box: StoryObj = {
  render: () => html`
    <div style="padding: 2rem; background: var(--paper-warm); border-radius: var(--radius-lg);">
      <tc-box
        .sx=${{
          padding: 'var(--space-lg)',
          background: 'var(--paper-white)',
          borderRadius: 'var(--radius-md)',
        }}
      >
        <tc-text>Content inside a styled box</tc-text>
      </tc-box>
    </div>
  `,
};

export const Divider: StoryObj = {
  render: () => html`
    <div style="padding: 2rem; background: var(--paper-warm); border-radius: var(--radius-lg);">
      <tc-text>Content above</tc-text>
      <tc-divider></tc-divider>
      <tc-text>Content below</tc-text>
    </div>
  `,
};

export const SymbolVariants: StoryObj = {
  render: () => html`
    <div style="display: flex; gap: 1rem; align-items: center; padding: 2rem; background: var(--paper-warm); border-radius: var(--radius-lg);">
      <tc-symbol size="2rem" background="var(--accent-primary)" color="white">A</tc-symbol>
      <tc-symbol size="2.5rem" background="var(--accent-success)" color="white">
        <tc-icon name="check" size="1.25rem"></tc-icon>
      </tc-symbol>
      <tc-symbol size="3rem" background="var(--paper-cream)" color="var(--ink-dark)">JD</tc-symbol>
    </div>
  `,
};

export const Items: StoryObj = {
  render: () => html`
    <div style="display: flex; flex-direction: column; gap: 0.5rem; max-width: 400px; padding: 2rem; background: var(--paper-warm); border-radius: var(--radius-lg);">
      <tc-item>
        <tc-symbol slot="prefix" size="2.5rem" background="var(--accent-primary)" color="white">
          <tc-icon name="bell" size="1.25rem"></tc-icon>
        </tc-symbol>
        <div>
          <tc-text weight="500">Notifications</tc-text>
          <tc-text size="sm" color="tertiary">Manage your alerts</tc-text>
        </div>
      </tc-item>

      <tc-item-button @tc-click=${() => console.log('clicked')}>
        <tc-symbol slot="prefix" size="2.5rem" background="var(--accent-success)" color="white">
          <tc-icon name="passkey" size="1.25rem"></tc-icon>
        </tc-symbol>
        <div>
          <tc-text weight="500">Security</tc-text>
          <tc-text size="sm" color="tertiary">Passkeys and authentication</tc-text>
        </div>
      </tc-item-button>
    </div>
  `,
};
