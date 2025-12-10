import type { Meta, StoryObj } from '@storybook/web-components-vite';
import { css, html, LitElement } from 'lit';
import { customElement } from 'lit/decorators.js';
import { MatchMediaController } from '../../controllers/match-media.controller.js';

@customElement('demo-match-media')
export class DemoMatchMedia extends LitElement {
  private desktop = new MatchMediaController(this, '(min-width: 1024px)');
  private tablet = new MatchMediaController(this, '(min-width: 768px)');
  private mobile = new MatchMediaController(this, '(max-width: 767px)');
  private prefersDark = new MatchMediaController(
    this,
    '(prefers-color-scheme: dark)',
  );
  private prefersReducedMotion = new MatchMediaController(
    this,
    '(prefers-reduced-motion: reduce)',
  );

  static override styles = css`
    :host {
      display: block;
    }
    .grid {
      display: grid;
      gap: var(--space-sm);
    }
    .item {
      padding: var(--space-sm) var(--space-md);
      background: var(--paper-cream);
      border-radius: var(--radius-sm);
      display: flex;
      justify-content: space-between;
      font-family: var(--font-body);
      font-size: var(--font-size-sm);
    }
    .match {
      color: var(--accent-success);
      font-weight: 500;
    }
    .no-match {
      color: var(--ink-light);
    }
  `;

  override render() {
    return html`
      <div class="grid">
        <div class="item">
          <span>Desktop (≥1024px)</span>
          <span class=${this.desktop.matches ? 'match' : 'no-match'}>
            ${this.desktop.matches ? '✓ matches' : '✗ no match'}
          </span>
        </div>
        <div class="item">
          <span>Tablet (≥768px)</span>
          <span class=${this.tablet.matches ? 'match' : 'no-match'}>
            ${this.tablet.matches ? '✓ matches' : '✗ no match'}
          </span>
        </div>
        <div class="item">
          <span>Mobile (≤767px)</span>
          <span class=${this.mobile.matches ? 'match' : 'no-match'}>
            ${this.mobile.matches ? '✓ matches' : '✗ no match'}
          </span>
        </div>
        <div class="item">
          <span>Prefers Dark Mode</span>
          <span class=${this.prefersDark.matches ? 'match' : 'no-match'}>
            ${this.prefersDark.matches ? '✓ matches' : '✗ no match'}
          </span>
        </div>
        <div class="item">
          <span>Prefers Reduced Motion</span>
          <span class=${this.prefersReducedMotion.matches ? 'match' : 'no-match'}>
            ${this.prefersReducedMotion.matches ? '✓ matches' : '✗ no match'}
          </span>
        </div>
      </div>
    `;
  }
}

const meta: Meta = {
  title: 'Controllers/MatchMediaController',
  parameters: {
    docs: {
      description: {
        component: `
A reactive controller for CSS media query matching.

## Usage

\`\`\`ts
class ResponsiveComponent extends LitElement {
  private isMobile = new MatchMediaController(this, '(max-width: 767px)');
  private prefersDark = new MatchMediaController(this, '(prefers-color-scheme: dark)');

  render() {
    return html\`
      <div class=\${this.isMobile.matches ? 'mobile-layout' : 'desktop-layout'}>
        \${this.prefersDark.matches ? 'Dark mode enabled' : 'Light mode'}
      </div>
    \`;
  }
}
\`\`\`

## Features

- Automatically updates component when media query result changes
- Cleans up listeners on disconnect
- Works with any valid CSS media query

## API

- \`matches\`: Boolean indicating if the query matches (readonly)
        `,
      },
    },
  },
};

export default meta;

export const Default: StoryObj = {
  render: () => html`
    <div style="padding: 2rem; background: var(--paper-warm); border-radius: var(--radius-lg);">
      <demo-match-media></demo-match-media>
    </div>
  `,
};
