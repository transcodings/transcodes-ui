import type { Meta, StoryObj } from '@storybook/web-components-vite';
import { css, html, LitElement } from 'lit';
import { customElement } from 'lit/decorators.js';
import { StorageController } from '../../controllers/storage.controller.js';
import '../../primitives/tc-button.js';
import '../../primitives/tc-text.js';
import '../../primitives/tc-section.js';

@customElement('demo-storage-controller')
export class DemoStorageController extends LitElement {
  private counter = new StorageController<number>(this, 'demo-counter');
  private user = new StorageController<{ name: string; visits: number }>(
    this,
    'demo-user',
  );

  static override styles = css`
    :host {
      display: block;
    }
    .card {
      padding: var(--space-md);
      background: var(--paper-cream);
      border-radius: var(--radius-md);
      margin-bottom: var(--space-md);
    }
    .card-title {
      margin-bottom: var(--space-sm);
      font-weight: 600;
    }
    .value {
      font-family: monospace;
      background: var(--paper-white);
      padding: var(--space-xs) var(--space-sm);
      border-radius: var(--radius-sm);
      margin: var(--space-sm) 0;
    }
    .actions {
      display: flex;
      gap: var(--space-sm);
      margin-top: var(--space-sm);
    }
  `;

  private increment() {
    this.counter.set((this.counter.value ?? 0) + 1);
  }

  private decrement() {
    this.counter.set((this.counter.value ?? 0) - 1);
  }

  private resetCounter() {
    this.counter.remove();
  }

  private setUser() {
    const current = this.user.value ?? { name: 'Guest', visits: 0 };
    this.user.set({
      name: current.name === 'Guest' ? 'John Doe' : 'Guest',
      visits: current.visits + 1,
    });
  }

  private clearUser() {
    this.user.remove();
  }

  override render() {
    return html`
      <div class="card">
        <tc-text class="card-title">Counter (Simple Value)</tc-text>
        <div class="value">
          <tc-text size="sm">Value: ${this.counter.value ?? 0}</tc-text>
        </div>
        <div class="actions">
          <tc-button size="small" @tc-click=${this.decrement}>-</tc-button>
          <tc-button size="small" @tc-click=${this.increment}>+</tc-button>
          <tc-button size="small" variant="ghost" @tc-click=${this.resetCounter}>Reset</tc-button>
        </div>
      </div>

      <div class="card">
        <tc-text class="card-title">User (Object Value)</tc-text>
        <div class="value">
          <tc-text size="sm">
            Name: ${this.user.value?.name ?? 'Not set'}<br>
            Visits: ${this.user.value?.visits ?? 0}
          </tc-text>
        </div>
        <div class="actions">
          <tc-button size="small" @tc-click=${this.setUser}>Toggle User</tc-button>
          <tc-button size="small" variant="ghost" @tc-click=${this.clearUser}>Clear</tc-button>
        </div>
      </div>

      <tc-text size="xs" color="tertiary">
        Data persists in localStorage. Refresh the page to verify.
      </tc-text>
    `;
  }
}

const meta: Meta = {
  title: 'Controllers/StorageController',
  parameters: {
    docs: {
      description: {
        component: `
A controller for syncing component state with localStorage or sessionStorage.

## Usage

\`\`\`ts
class MyComponent extends LitElement {
  // Simple value
  private dismissed = new StorageController<boolean>(this, 'banner-dismissed');

  // Complex object
  private settings = new StorageController<{ theme: string; fontSize: number }>(
    this,
    'user-settings',
  );

  handleDismiss() {
    this.dismissed.set(true);
  }

  render() {
    if (this.dismissed.value) return html\`\`;
    return html\`<div class="banner">...</div>\`;
  }
}
\`\`\`

## Features

- Automatic JSON serialization/deserialization
- Cross-tab synchronization via storage events
- Graceful handling of quota exceeded errors
- TypeScript generics for type safety

## API

- \`value\`: Current stored value (null if not set)
- \`set(value)\`: Store a new value
- \`remove()\`: Remove the stored value
        `,
      },
    },
  },
};

export default meta;

export const Default: StoryObj = {
  render: () => html`
    <div style="padding: 2rem; background: var(--paper-warm); border-radius: var(--radius-lg); max-width: 400px;">
      <demo-storage-controller></demo-storage-controller>
    </div>
  `,
};
