import { css, html, LitElement } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { AnimationController } from '../controllers/animation.controller.js';
import { StorageController } from '../controllers/storage.controller.js';
import { sharedStyles } from '../styles/shared.js';
import '../primitives/tc-icon.js';
import '../primitives/tc-text.js';
import '../primitives/tc-button.js';
import '../primitives/tc-section.js';

/**
 * A modal for requesting notification permission with storage-based dismissal tracking.
 *
 * @fires tc-allow - Fired when the user clicks allow
 * @fires tc-deny - Fired when the user clicks deny
 * @fires tc-close - Fired when the modal is closed
 * @csspart overlay - The backdrop overlay
 * @csspart modal - The modal container
 * @csspart icon - The notification icon
 * @csspart title - The modal title
 * @csspart description - The modal description
 * @csspart actions - The action buttons container
 */
@customElement('tc-notification-modal')
export class TcNotificationModal extends LitElement {
  @property({ type: String }) title = 'Enable Notifications';
  @property({ type: String }) description =
    'Stay updated with important alerts and messages.';
  @property({ type: String, attribute: 'allow-label' }) allowLabel = 'Allow';
  @property({ type: String, attribute: 'deny-label' }) denyLabel = 'Not Now';
  @property({ type: String, attribute: 'storage-key' }) storageKey =
    'tc-notification-modal-state';

  private animation = new AnimationController(this, {
    showDuration: 300,
    hideDuration: 200,
  });

  private storage = new StorageController<{
    dismissed: boolean;
    permission: 'granted' | 'denied' | null;
  }>(this, this.storageKey);

  static override styles = [
    sharedStyles,
    css`
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
      align-items: center;
      width: 100%;
      max-width: 320px;
      padding: var(--space-xl);
      background: var(--paper-white);
      border-radius: var(--radius-lg);
      box-shadow: 0 20px 60px var(--overlay-shadow-strong);
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
      width: 4rem;
      height: 4rem;
      margin-bottom: var(--space-lg);
      background: var(--alpha-primary10);
      border-radius: var(--radius-full);
      color: var(--accent-primary);
    }

    .content {
      margin-bottom: var(--space-xl);
    }

    .title {
      margin-bottom: var(--space-sm);
    }

    .actions {
      display: flex;
      flex-direction: column;
      gap: var(--space-sm);
      width: 100%;
    }

    .deny-button {
      background: transparent;
      border: none;
      padding: var(--space-sm);
      font-family: var(--font-body);
      font-size: var(--font-size-sm);
      color: var(--ink-medium);
      cursor: pointer;
      transition: color var(--transition-fast);
    }

    .deny-button:hover {
      color: var(--ink-dark);
    }
  `,
  ];

  override connectedCallback() {
    super.connectedCallback();
    this.updateDataState();
  }

  private updateDataState() {
    this.dataset.state = this.animation.state;
  }

  /**
   * Check if the modal should be shown based on stored state.
   */
  shouldShow(): boolean {
    const stored = this.storage.value;
    if (stored?.dismissed) return false;
    if (stored?.permission === 'granted') return false;
    return true;
  }

  async show() {
    if (!this.shouldShow()) return;
    await this.animation.show();
    this.updateDataState();
  }

  async close() {
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
    if (e.target === e.currentTarget) {
      this.handleDeny();
    }
  }

  private handleAllow() {
    this.storage.set({ dismissed: true, permission: 'granted' });
    this.close();

    this.dispatchEvent(
      new CustomEvent('tc-allow', {
        bubbles: true,
        composed: true,
      }),
    );
  }

  private handleDeny() {
    this.storage.set({ dismissed: true, permission: 'denied' });
    this.close();

    this.dispatchEvent(
      new CustomEvent('tc-deny', {
        bubbles: true,
        composed: true,
      }),
    );
  }

  override render() {
    return html`
      <div part="overlay" class="overlay" @click=${this.handleOverlayClick}>
        <div
          part="modal"
          class="modal"
          role="dialog"
          aria-modal="true"
          aria-labelledby="notification-title"
          aria-describedby="notification-description"
        >
          <div part="icon" class="icon-container">
            <tc-icon name="bell" size="2rem"></tc-icon>
          </div>
          <tc-section part="content" class="content" gap="var(--space-sm)">
            <tc-text
              id="notification-title"
              part="title"
              class="title"
              tag="h2"
              size="lg"
              weight="600"
            >
              ${this.title}
            </tc-text>
            <tc-text
              id="notification-description"
              part="description"
              size="base"
              color="tertiary"
            >
              ${this.description}
            </tc-text>
          </tc-section>
          <div part="actions" class="actions">
            <tc-button variant="primary" @tc-click=${this.handleAllow}>
              ${this.allowLabel}
            </tc-button>
            <button class="deny-button" @click=${this.handleDeny}>
              ${this.denyLabel}
            </button>
          </div>
        </div>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'tc-notification-modal': TcNotificationModal;
  }
}
