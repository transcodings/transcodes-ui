import type { Meta, StoryObj } from '@storybook/web-components-vite';
import { css, html, LitElement } from 'lit';
import { customElement } from 'lit/decorators.js';
import { LoadingController } from '../../controllers/loading.controller.js';
import '../../primitives/tc-button.js';
import '../../primitives/tc-text.js';
import '../../primitives/tc-section.js';

@customElement('demo-loading-controller')
export class DemoLoadingController extends LitElement {
  private loading = new LoadingController(this);

  static override styles = css`
    :host {
      display: block;
    }
    .status {
      margin-top: var(--space-md);
      padding: var(--space-sm);
      background: var(--paper-cream);
      border-radius: var(--radius-sm);
      font-family: monospace;
    }
  `;

  private handleToggle() {
    if (this.loading.isLoading) {
      this.loading.complete();
    } else {
      this.loading.start();
      setTimeout(() => this.loading.complete(), 2000);
    }
  }

  override render() {
    return html`
      <tc-section gap="var(--space-md)">
        <tc-button
          variant="primary"
          ?loading=${this.loading.isLoading}
          @tc-click=${this.handleToggle}
        >
          ${this.loading.isLoading ? 'Loading...' : 'Start Loading'}
        </tc-button>
        <div class="status">
          <tc-text size="sm">isLoading: ${this.loading.isLoading}</tc-text>
        </div>
      </tc-section>
    `;
  }
}

const meta: Meta = {
  title: 'Controllers/LoadingController',
  parameters: {
    docs: {
      description: {
        component: `
A simple controller for managing loading states.

## Usage

\`\`\`ts
class MyComponent extends LitElement {
  private loading = new LoadingController(this);

  async fetchData() {
    this.loading.start();
    try {
      await fetch('/api/data');
    } finally {
      this.loading.complete();
    }
  }

  render() {
    return html\`
      <button ?disabled=\${this.loading.isLoading}>
        \${this.loading.isLoading ? 'Loading...' : 'Fetch'}
      </button>
    \`;
  }
}
\`\`\`

## API

- \`start()\`: Set loading state to true
- \`complete()\`: Set loading state to false
- \`isLoading\`: Current loading state (readonly)
        `,
      },
    },
  },
};

export default meta;

export const Default: StoryObj = {
  render: () => html`
    <div style="padding: 2rem; background: var(--paper-cream); border-radius: var(--radius-lg);">
      <demo-loading-controller></demo-loading-controller>
    </div>
  `,
};
