import type { Meta, StoryObj } from '@storybook/web-components-vite';
import { css, html, LitElement } from 'lit';
import { customElement } from 'lit/decorators.js';
import { AnimationController } from '../../controllers/animation.controller.js';
import '../../primitives/tc-button.js';
import '../../primitives/tc-text.js';
import '../../primitives/tc-section.js';

@customElement('demo-animation-controller')
export class DemoAnimationController extends LitElement {
  private animation = new AnimationController(this, {
    showDuration: 300,
    hideDuration: 200,
  });

  static override styles = css`
    :host {
      display: block;
    }
    .box {
      margin-top: var(--space-md);
      padding: var(--space-lg);
      background: var(--accent-primary);
      color: white;
      border-radius: var(--radius-md);
      text-align: center;
      opacity: 0;
      transform: translateY(20px);
      transition: opacity 300ms ease, transform 300ms ease;
    }
    .box.visible {
      opacity: 1;
      transform: translateY(0);
    }
    .status {
      margin-top: var(--space-md);
      padding: var(--space-sm);
      background: var(--paper-cream);
      border-radius: var(--radius-sm);
      font-family: monospace;
    }
  `;

  private async handleToggle() {
    if (this.animation.state === 'visible') {
      await this.animation.hide();
    } else {
      await this.animation.show();
    }
    this.requestUpdate();
  }

  override render() {
    const isVisible =
      this.animation.state === 'visible' || this.animation.state === 'showing';

    return html`
      <tc-section gap="var(--space-md)">
        <tc-button variant="primary" @tc-click=${this.handleToggle}>
          ${isVisible ? 'Hide' : 'Show'}
        </tc-button>
        <div class="box ${isVisible ? 'visible' : ''}">
          <tc-text weight="500">Animated Content</tc-text>
        </div>
        <div class="status">
          <tc-text size="sm">state: ${this.animation.state}</tc-text>
        </div>
      </tc-section>
    `;
  }
}

const meta: Meta = {
  title: 'Controllers/AnimationController',
  parameters: {
    docs: {
      description: {
        component: `
A controller for managing show/hide animations with proper timing and state tracking.

## Usage

\`\`\`ts
class MyModal extends LitElement {
  private animation = new AnimationController(this, {
    showDuration: 300,
    hideDuration: 200,
  });

  async open() {
    await this.animation.show();
  }

  async close() {
    await this.animation.hide();
  }

  render() {
    const isVisible = this.animation.state === 'visible';
    return html\`<div class="modal \${isVisible ? 'open' : ''}">...</div>\`;
  }
}
\`\`\`

## States

- \`hidden\`: Not visible
- \`showing\`: Transitioning to visible
- \`visible\`: Fully visible
- \`hiding\`: Transitioning to hidden

## API

- \`show()\`: Returns Promise that resolves when animation completes
- \`hide()\`: Returns Promise that resolves when animation completes
- \`state\`: Current animation state (readonly)
        `,
      },
    },
  },
};

export default meta;

export const Default: StoryObj = {
  render: () => html`
    <div style="padding: 2rem; background: var(--paper-cream); border-radius: var(--radius-lg);">
      <demo-animation-controller></demo-animation-controller>
    </div>
  `,
};
