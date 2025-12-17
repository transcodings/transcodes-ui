import type { Meta, StoryObj } from '@storybook/web-components-vite';
import { html } from 'lit';
import '../../primitives/tc-symbol.js';

const meta: Meta = {
  title: 'Primitives/tc-symbol',
  component: 'tc-symbol',
};

export default meta;

export const Default: StoryObj = {
  render: () => html`
    <div style="padding: 2rem;">
      <tc-symbol>A</tc-symbol>
    </div>
  `,
};

export const Initials: StoryObj = {
  render: () => html`
    <div style="display: flex; gap: 1rem; padding: 2rem;">
      <tc-symbol>JD</tc-symbol>
      <tc-symbol .sx=${{ '--symbol-bg': 'var(--accent-primary)', '--symbol-color': 'white' }}>AB</tc-symbol>
      <tc-symbol .sx=${{ '--symbol-bg': 'var(--accent-success)', '--symbol-color': 'white' }}>XY</tc-symbol>
      <tc-symbol .sx=${{ '--symbol-bg': 'var(--error-base)', '--symbol-color': 'white' }}>Z</tc-symbol>
    </div>
  `,
};

export const Sizes: StoryObj = {
  render: () => html`
    <div style="display: flex; gap: 1rem; align-items: center; padding: 2rem;">
      <tc-symbol .sx=${{ '--symbol-size': '2rem' }}>S</tc-symbol>
      <tc-symbol>M</tc-symbol>
      <tc-symbol .sx=${{ '--symbol-size': '4rem' }}>L</tc-symbol>
      <tc-symbol .sx=${{ '--symbol-size': '5rem' }}>XL</tc-symbol>
    </div>
  `,
};

export const WithEmoji: StoryObj = {
  render: () => html`
    <div style="display: flex; gap: 1rem; padding: 2rem;">
      <tc-symbol .sx=${{ '--symbol-bg': 'var(--paper-warm)' }}>🎉</tc-symbol>
      <tc-symbol .sx=${{ '--symbol-bg': 'var(--paper-warm)' }}>✨</tc-symbol>
      <tc-symbol .sx=${{ '--symbol-bg': 'var(--paper-warm)' }}>🔒</tc-symbol>
      <tc-symbol .sx=${{ '--symbol-bg': 'var(--paper-warm)' }}>📱</tc-symbol>
    </div>
  `,
};

export const AvatarList: StoryObj = {
  render: () => html`
    <div style="padding: 2rem;">
      <div style="display: flex; gap: 1rem; align-items: center; margin-bottom: 1rem;">
        <tc-symbol .sx=${{ '--symbol-size': '2.5rem', '--symbol-bg': 'var(--accent-primary)', '--symbol-color': 'white' }}>JD</tc-symbol>
        <div>
          <div style="font-weight: 600; color: var(--ink-black);">John Doe</div>
          <div style="font-size: 0.875rem; color: var(--ink-light);">john@example.com</div>
        </div>
      </div>
      <div style="display: flex; gap: 1rem; align-items: center; margin-bottom: 1rem;">
        <tc-symbol .sx=${{ '--symbol-size': '2.5rem', '--symbol-bg': 'var(--accent-success)', '--symbol-color': 'white' }}>AS</tc-symbol>
        <div>
          <div style="font-weight: 600; color: var(--ink-black);">Alice Smith</div>
          <div style="font-size: 0.875rem; color: var(--ink-light);">alice@example.com</div>
        </div>
      </div>
      <div style="display: flex; gap: 1rem; align-items: center;">
        <tc-symbol .sx=${{ '--symbol-size': '2.5rem', '--symbol-bg': 'var(--semantic-warning)', '--symbol-color': 'white' }}>BJ</tc-symbol>
        <div>
          <div style="font-weight: 600; color: var(--ink-black);">Bob Johnson</div>
          <div style="font-size: 0.875rem; color: var(--ink-light);">bob@example.com</div>
        </div>
      </div>
    </div>
  `,
};

export const StackedAvatars: StoryObj = {
  render: () => html`
    <div style="padding: 2rem;">
      <div style="display: flex;">
        <tc-symbol .sx=${{ '--symbol-size': '2.5rem', '--symbol-bg': 'var(--accent-primary)', '--symbol-color': 'white' }} style="margin-right: -0.75rem; border: 2px solid white; box-sizing: content-box;">JD</tc-symbol>
        <tc-symbol .sx=${{ '--symbol-size': '2.5rem', '--symbol-bg': 'var(--accent-success)', '--symbol-color': 'white' }} style="margin-right: -0.75rem; border: 2px solid white; box-sizing: content-box;">AS</tc-symbol>
        <tc-symbol .sx=${{ '--symbol-size': '2.5rem', '--symbol-bg': 'var(--semantic-warning)', '--symbol-color': 'white' }} style="margin-right: -0.75rem; border: 2px solid white; box-sizing: content-box;">BJ</tc-symbol>
        <tc-symbol .sx=${{ '--symbol-size': '2.5rem', '--symbol-bg': 'var(--ink-light)', '--symbol-color': 'white' }} style="border: 2px solid white; box-sizing: content-box;">+3</tc-symbol>
      </div>
    </div>
  `,
};
