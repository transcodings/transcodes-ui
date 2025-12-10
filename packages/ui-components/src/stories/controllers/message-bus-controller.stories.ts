import type { Meta, StoryObj } from '@storybook/web-components-vite';
import { css, html, LitElement } from 'lit';
import { customElement, state } from 'lit/decorators.js';
import { MessageBusController } from '../../controllers/message-bus.controller.js';
import '../../primitives/tc-button.js';
import '../../primitives/tc-text.js';
import '../../primitives/tc-section.js';
import '../../primitives/tc-input.js';

@customElement('demo-message-bus')
export class DemoMessageBus extends LitElement {
  private messageBus = new MessageBusController(this, '*');

  @state() private messages: Array<{ type: string; payload: unknown }> = [];
  @state() private messageType = 'GREETING';
  @state() private messagePayload = 'Hello!';

  static override styles = css`
    :host {
      display: block;
    }
    .log {
      margin-top: var(--space-md);
      padding: var(--space-md);
      background: var(--paper-cream);
      border-radius: var(--radius-sm);
      max-height: 200px;
      overflow-y: auto;
      font-family: monospace;
      font-size: var(--font-size-sm);
    }
    .log-entry {
      padding: var(--space-xs) 0;
      border-bottom: 1px solid var(--ink-faint);
    }
    .log-entry:last-child {
      border-bottom: none;
    }
    .type {
      color: var(--accent-primary);
      font-weight: 500;
    }
    .info {
      margin-top: var(--space-md);
      padding: var(--space-md);
      background: var(--alpha-primary10);
      border-radius: var(--radius-sm);
    }
  `;

  override connectedCallback() {
    super.connectedCallback();
    this.messageBus.onMessage('*', (type, payload) => {
      this.messages = [{ type, payload }, ...this.messages.slice(0, 9)];
    });
  }

  private sendMessage() {
    this.messageBus.send(this.messageType, this.messagePayload);
  }

  private handleTypeChange(e: CustomEvent) {
    this.messageType = e.detail.value;
  }

  private handlePayloadChange(e: CustomEvent) {
    this.messagePayload = e.detail.value;
  }

  private clearLog() {
    this.messages = [];
  }

  override render() {
    return html`
      <tc-section gap="var(--space-md)">
        <tc-input
          label="Message Type"
          .value=${this.messageType}
          @tc-input=${this.handleTypeChange}
        ></tc-input>
        <tc-input
          label="Payload"
          .value=${this.messagePayload}
          @tc-input=${this.handlePayloadChange}
        ></tc-input>

        <div style="display: flex; gap: var(--space-sm);">
          <tc-button variant="primary" @tc-click=${this.sendMessage}>
            Send Message
          </tc-button>
          <tc-button variant="ghost" @tc-click=${this.clearLog}>
            Clear Log
          </tc-button>
        </div>

        <div class="log">
          ${
            this.messages.length === 0
              ? html`<tc-text size="sm" color="tertiary">No messages yet</tc-text>`
              : this.messages.map(
                  (msg) => html`
                  <div class="log-entry">
                    <span class="type">${msg.type}</span>: ${JSON.stringify(msg.payload)}
                  </div>
                `,
                )
          }
        </div>

        <div class="info">
          <tc-text size="sm" color="primary">
            This demo sends messages to the same window. In real usage, you would send
            messages to iframes or other windows.
          </tc-text>
        </div>
      </tc-section>
    `;
  }
}

const meta: Meta = {
  title: 'Controllers/MessageBusController',
  parameters: {
    docs: {
      description: {
        component: `
A controller for postMessage communication with iframes or other windows.

## Usage

\`\`\`ts
class IframeHost extends LitElement {
  private messageBus = new MessageBusController(this, 'https://trusted-origin.com');

  connectedCallback() {
    super.connectedCallback();
    this.messageBus.onMessage('READY', (payload) => {
      console.log('Iframe ready:', payload);
    });

    // Listen to all messages
    this.messageBus.onMessage('*', (type, payload) => {
      console.log('Received:', type, payload);
    });
  }

  sendToIframe() {
    const iframe = this.shadowRoot.querySelector('iframe');
    this.messageBus.sendToFrame(iframe, 'COMMAND', { action: 'refresh' });
  }
}
\`\`\`

## Security

- **Always specify a target origin in production**
- Using '*' accepts messages from any origin (development only)
- The controller validates message origin when a specific origin is set

## API

- \`send(type, payload, window?)\`: Send a message
- \`sendToFrame(iframe, type, payload)\`: Send to an iframe
- \`onMessage(type, handler)\`: Register a message handler
- \`onMessage('*', handler)\`: Listen to all messages
        `,
      },
    },
  },
};

export default meta;

export const Default: StoryObj = {
  render: () => html`
    <div style="padding: 2rem; background: var(--paper-warm); border-radius: var(--radius-lg); max-width: 400px;">
      <demo-message-bus></demo-message-bus>
    </div>
  `,
};
