import type { Meta, StoryObj } from '@storybook/web-components-vite';
import { css, html, LitElement } from 'lit';
import { customElement, state } from 'lit/decorators.js';
import { HistoryController } from '../../controllers/history.controller.js';
import '../../primitives/tc-button.js';
import '../../primitives/tc-text.js';
import '../../primitives/tc-section.js';

@customElement('demo-history-controller')
export class DemoHistoryController extends LitElement {
  private history = new HistoryController(this);

  @state() private isOpen = false;
  @state() private message = '';

  static override styles = css`
    :host {
      display: block;
    }
    .modal-overlay {
      position: fixed;
      inset: 0;
      background: rgba(0, 0, 0, 0.5);
      display: flex;
      align-items: center;
      justify-content: center;
      z-index: 1000;
    }
    .modal {
      background: var(--paper-white);
      padding: var(--space-xl);
      border-radius: var(--radius-lg);
      max-width: 300px;
      text-align: center;
    }
    .status {
      margin-top: var(--space-md);
      padding: var(--space-sm);
      background: var(--paper-cream);
      border-radius: var(--radius-sm);
      font-family: monospace;
    }
    .info {
      margin-top: var(--space-md);
      padding: var(--space-md);
      background: var(--alpha-primary10);
      border-radius: var(--radius-sm);
    }
  `;

  private openModal() {
    this.isOpen = true;
    this.message = 'Modal opened';
    this.history.push({ modal: 'demo-modal' });
    this.history.onPopState(() => {
      this.closeModal(true);
    });
  }

  private closeModal(fromHistory = false) {
    this.isOpen = false;
    this.message = fromHistory ? 'Closed via back button' : 'Closed via button';
    if (!fromHistory) {
      this.history.pop();
    }
  }

  override render() {
    return html`
      <tc-section gap="var(--space-md)">
        <tc-button variant="primary" @tc-click=${this.openModal}>
          Open Modal
        </tc-button>

        <div class="status">
          <tc-text size="sm">${this.message || 'Click to open modal'}</tc-text>
        </div>

        <div class="info">
          <tc-text size="sm" color="primary">
            Try using the browser's back button to close the modal.
          </tc-text>
        </div>
      </tc-section>

      ${
        this.isOpen
          ? html`
            <div class="modal-overlay" @click=${() => this.closeModal()}>
              <div class="modal" @click=${(e: Event) => e.stopPropagation()}>
                <tc-text size="lg" weight="600">Demo Modal</tc-text>
                <tc-text size="sm" color="tertiary" style="margin-top: var(--space-sm);">
                  Press browser back button or close button
                </tc-text>
                <tc-button
                  style="margin-top: var(--space-lg);"
                  @tc-click=${() => this.closeModal()}
                >
                  Close
                </tc-button>
              </div>
            </div>
          `
          : ''
      }
    `;
  }
}

const meta: Meta = {
  title: 'Controllers/HistoryController',
  parameters: {
    docs: {
      description: {
        component: `
A controller for managing browser history for modals and overlays.

## Usage

\`\`\`ts
class MyModal extends LitElement {
  private history = new HistoryController(this);

  open() {
    this.history.push({ modal: 'my-modal' });
    this.history.onPopState(() => this.close());
    // show modal
  }

  close() {
    this.history.pop();
    // hide modal
  }
}
\`\`\`

## Features

- Adds history entry when modal opens
- Handles back button navigation
- Prevents duplicate history entries
- Automatically cleans up on disconnect

## API

- \`push(state?)\`: Add a history entry
- \`pop()\`: Mark entry as consumed
- \`onPopState(callback)\`: Register handler for back navigation
        `,
      },
    },
  },
};

export default meta;

export const Default: StoryObj = {
  render: () => html`
    <div style="padding: 2rem; background: var(--paper-warm); border-radius: var(--radius-lg);">
      <demo-history-controller></demo-history-controller>
    </div>
  `,
};
