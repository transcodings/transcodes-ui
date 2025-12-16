import { css, html, LitElement } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { AnimationController } from '../controllers/animation.controller.js';
import { sharedStyles } from '../styles/shared.js';
import '../primitives/tc-icon.js';
import '../primitives/tc-text.js';
import '../primitives/tc-button.js';
import '../primitives/tc-section.js';

/**
 * A modal displayed when the device goes offline.
 * Automatically shows/hides based on network status.
 *
 * @fires tc-retry - Fired when the retry button is clicked
 * @fires tc-online - Fired when the device comes back online
 * @fires tc-offline - Fired when the device goes offline
 * @csspart overlay - The backdrop overlay
 * @csspart modal - The modal container
 * @csspart icon - The offline icon
 * @csspart title - The modal title
 * @csspart description - The modal description
 * @csspart action - The action button container
 */
@customElement('tc-offline-modal')
export class TcOfflineModal extends LitElement {
  @property({ type: String }) title = 'No Connection';
  @property({ type: String }) description =
    'Please check your internet connection and try again.';
  @property({ type: String, attribute: 'retry-label' }) retryLabel =
    'Try Again';
  @property({ type: Boolean, attribute: 'auto-detect' }) autoDetect = true;

  @state() private isOffline = false;

  private animation = new AnimationController(this, {
    showDuration: 300,
    hideDuration: 200,
  });

  static override styles = [
    sharedStyles,
    css`
    :host {
      display: contents;
    }

    .overlay {
      position: fixed;
      inset: 0;
      z-index: 1001;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: var(--space-lg);
      background: var(--overlay-dark);
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
      align-items: center;
      width: 100%;
      max-width: var(--modal-max-width-sm);
      padding: var(--space-xl);
      background: var(--paper-white);
      border-radius: var(--radius-lg);
      box-shadow: 0 20px 60px var(--overlay-shadow-heavy);
      text-align: center;
      transform: scale(0.95);
      transition: transform var(--transition-smooth);
    }

    :host([data-state='showing']) .modal,
    :host([data-state='visible']) .modal {
      transform: scale(1);
    }

    :host([data-state='hiding']) .modal {
      transform: scale(0.95);
    }

    .icon-container {
      display: flex;
      align-items: center;
      justify-content: center;
      width: var(--size-screen-icon-sm);
      height: var(--size-screen-icon-sm);
      margin-bottom: var(--space-lg);
      background: var(--error-bg);
      border-radius: var(--radius-full);
      color: var(--error-base);
    }

    .content {
      margin-bottom: var(--space-xl);
    }

    .title {
      margin-bottom: var(--space-sm);
    }

    .action {
      width: 100%;
    }
  `,
  ];

  override connectedCallback() {
    super.connectedCallback();
    this.updateDataState();

    if (this.autoDetect) {
      this.isOffline = !navigator.onLine;
      if (this.isOffline) {
        this.show();
      }

      window.addEventListener('online', this.handleOnline);
      window.addEventListener('offline', this.handleOffline);
    }
  }

  override disconnectedCallback() {
    super.disconnectedCallback();
    window.removeEventListener('online', this.handleOnline);
    window.removeEventListener('offline', this.handleOffline);
  }

  private handleOnline = () => {
    this.isOffline = false;
    this.hide();

    this.dispatchEvent(
      new CustomEvent('tc-online', {
        bubbles: true,
        composed: true,
      }),
    );
  };

  private handleOffline = () => {
    this.isOffline = true;
    this.show();

    this.dispatchEvent(
      new CustomEvent('tc-offline', {
        bubbles: true,
        composed: true,
      }),
    );
  };

  private updateDataState() {
    this.dataset.state = this.animation.state;
  }

  async show() {
    await this.animation.show();
    this.updateDataState();
  }

  async hide() {
    await this.animation.hide();
    this.updateDataState();
  }

  private handleRetry() {
    this.dispatchEvent(
      new CustomEvent('tc-retry', {
        bubbles: true,
        composed: true,
      }),
    );

    // Check if we're back online
    if (navigator.onLine) {
      this.handleOnline();
    }
  }

  override render() {
    return html`
      <div part="overlay" class="overlay">
        <div
          part="modal"
          class="modal"
          role="alertdialog"
          aria-modal="true"
          aria-labelledby="offline-title"
          aria-describedby="offline-description"
        >
          <div part="icon" class="icon-container">
            <tc-icon name="wifi-off" size="var(--size-icon-lg)"></tc-icon>
          </div>
          <tc-section part="content" class="content" gap="var(--space-sm)">
            <tc-text
              id="offline-title"
              part="title"
              class="title"
              tag="h2"
              size="lg"
              weight="600"
            >
              ${this.title}
            </tc-text>
            <tc-text
              id="offline-description"
              part="description"
              size="base"
              color="tertiary"
            >
              ${this.description}
            </tc-text>
          </tc-section>
          <div part="action" class="action">
            <tc-button variant="primary" @tc-click=${this.handleRetry}>
              ${this.retryLabel}
            </tc-button>
          </div>
        </div>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'tc-offline-modal': TcOfflineModal;
  }
}
