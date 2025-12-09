import { css, html, LitElement } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { AnimationController } from '../controllers/animation.controller.js';
import { HistoryController } from '../controllers/history.controller.js';
import { MessageBusController } from '../controllers/message-bus.controller.js';
import '../primitives/tc-spinner.js';

/**
 * A modal that displays an iframe with loading states and message communication.
 *
 * @fires tc-close - Fired when the modal is closed
 * @fires tc-message - Fired when a message is received from the iframe
 * @fires tc-load - Fired when the iframe content is loaded
 * @csspart overlay - The backdrop overlay
 * @csspart modal - The modal container
 * @csspart header - The modal header
 * @csspart close - The close button
 * @csspart content - The content area
 * @csspart iframe - The iframe element
 * @csspart loader - The loading overlay
 */
@customElement('tc-iframe-modal')
export class TcIframeModal extends LitElement {
  @property({ type: String }) src = '';
  @property({ type: String }) title = '';
  @property({ type: Boolean, attribute: 'close-on-escape' }) closeOnEscape =
    true;
  @property({ type: Boolean, attribute: 'close-on-overlay' }) closeOnOverlay =
    true;
  @property({ type: Boolean, attribute: 'use-history' }) useHistory = true;

  @state() private isLoading = true;

  private animation = new AnimationController(this, {
    showDuration: 300,
    hideDuration: 200,
  });

  private history = new HistoryController(this);
  private messageBus = new MessageBusController(this);

  static override styles = css`
    :host {
      display: contents;
    }

    .overlay {
      position: fixed;
      inset: 0;
      z-index: 1000;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: var(--space-lg);
      background: var(--overlay-dim);
      opacity: 0;
      visibility: hidden;
      transition: opacity var(--transition-smooth), visibility var(--transition-smooth);
    }

    :host([data-state='showing']) .overlay,
    :host([data-state='visible']) .overlay {
      opacity: 1;
      visibility: visible;
    }

    :host([data-state='hiding']) .overlay {
      opacity: 0;
    }

    :host([data-state='hidden']) .overlay {
      visibility: hidden;
    }

    .modal {
      display: flex;
      flex-direction: column;
      width: 100%;
      max-width: 600px;
      max-height: 90vh;
      max-height: 90dvh;
      background: var(--paper-white);
      border-radius: var(--radius-lg);
      box-shadow: 0 20px 60px var(--overlay-shadow-strong);
      overflow: hidden;
      transform: scale(0.95) translateY(20px);
      transition: transform var(--transition-smooth);
    }

    :host([data-state='showing']) .modal,
    :host([data-state='visible']) .modal {
      transform: scale(1) translateY(0);
    }

    :host([data-state='hiding']) .modal {
      transform: scale(0.95) translateY(20px);
    }

    .header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: var(--space-md) var(--space-lg);
      border-bottom: 1px solid var(--paper-warm);
    }

    .title {
      font-family: var(--font-body);
      font-size: var(--font-size-lg);
      font-weight: 600;
      color: var(--ink-dark);
      margin: 0;
    }

    .close {
      display: flex;
      align-items: center;
      justify-content: center;
      width: var(--size-close-button);
      height: var(--size-close-button);
      padding: 0;
      border: none;
      background: transparent;
      color: var(--ink-medium);
      cursor: pointer;
      border-radius: var(--radius-sm);
      transition: var(--transition-fast);
    }

    .close:hover {
      background: var(--paper-warm);
      color: var(--ink-dark);
    }

    .close svg {
      width: 1.25rem;
      height: 1.25rem;
    }

    .content {
      position: relative;
      flex: 1;
      overflow: hidden;
    }

    .iframe {
      width: 100%;
      height: 100%;
      min-height: 400px;
      border: none;
    }

    .loader {
      position: absolute;
      inset: 0;
      display: flex;
      align-items: center;
      justify-content: center;
      background: var(--paper-white);
      opacity: 1;
      transition: opacity var(--transition-smooth);
    }

    .loader.hidden {
      opacity: 0;
      pointer-events: none;
    }
  `;

  override connectedCallback() {
    super.connectedCallback();
    this.updateDataState();

    if (this.closeOnEscape) {
      document.addEventListener('keydown', this.handleKeyDown);
    }

    // Set up message bus listener
    this.messageBus.onMessage('*', (type, payload) => {
      this.dispatchEvent(
        new CustomEvent('tc-message', {
          bubbles: true,
          composed: true,
          detail: { type, payload },
        }),
      );
    });

    // Set up history back handler
    if (this.useHistory) {
      this.history.onPopState(() => {
        if (this.animation.state === 'visible') {
          this.close();
        }
      });
    }
  }

  override disconnectedCallback() {
    super.disconnectedCallback();
    document.removeEventListener('keydown', this.handleKeyDown);
  }

  private handleKeyDown = (e: KeyboardEvent) => {
    if (e.key === 'Escape' && this.animation.state === 'visible') {
      this.close();
    }
  };

  private updateDataState() {
    this.dataset.state = this.animation.state;
  }

  async open() {
    if (this.useHistory) {
      this.history.push({ modal: 'iframe' });
    }
    this.isLoading = true;
    await this.animation.show();
    this.updateDataState();
  }

  async close() {
    if (this.useHistory) {
      this.history.pop();
    }
    await this.animation.hide();
    this.updateDataState();

    this.dispatchEvent(
      new CustomEvent('tc-close', {
        bubbles: true,
        composed: true,
      }),
    );
  }

  private handleOverlayClick(e: Event) {
    if (this.closeOnOverlay && e.target === e.currentTarget) {
      this.close();
    }
  }

  private handleIframeLoad() {
    this.isLoading = false;

    this.dispatchEvent(
      new CustomEvent('tc-load', {
        bubbles: true,
        composed: true,
      }),
    );
  }

  sendMessage(type: string, payload?: unknown) {
    const iframe = this.shadowRoot?.querySelector('iframe');
    if (iframe?.contentWindow) {
      this.messageBus.send(type, payload, iframe.contentWindow);
    }
  }

  override render() {
    return html`
      <div part="overlay" class="overlay" @click=${this.handleOverlayClick}>
        <div part="modal" class="modal" role="dialog" aria-modal="true" aria-labelledby="modal-title">
          ${
            this.title
              ? html`
                <div part="header" class="header">
                  <h2 id="modal-title" class="title">${this.title}</h2>
                  <button
                    part="close"
                    class="close"
                    @click=${this.close}
                    aria-label="Close modal"
                  >
                    <svg
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    >
                      <line x1="18" y1="6" x2="6" y2="18"></line>
                      <line x1="6" y1="6" x2="18" y2="18"></line>
                    </svg>
                  </button>
                </div>
              `
              : ''
          }
          <div part="content" class="content">
            <iframe
              part="iframe"
              class="iframe"
              src=${this.src}
              @load=${this.handleIframeLoad}
              title=${this.title || 'Modal content'}
            ></iframe>
            <div part="loader" class="loader ${this.isLoading ? '' : 'hidden'}">
              <tc-spinner size="2rem"></tc-spinner>
            </div>
          </div>
        </div>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'tc-iframe-modal': TcIframeModal;
  }
}
