import { css, html, LitElement } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { AnimationController } from '../controllers/animation.controller.js';
import { StorageController } from '../controllers/storage.controller.js';
import '../primitives/tc-icon.js';
import '../primitives/tc-button.js';
import '../primitives/tc-text.js';

/**
 * A banner prompting users to install the PWA.
 * Remembers dismissal state via localStorage.
 *
 * @fires tc-install - Fired when the install button is clicked
 * @fires tc-dismiss - Fired when the banner is dismissed
 * @csspart banner - The banner container
 * @csspart content - The content area
 * @csspart icon - The app icon
 * @csspart text - The text container
 * @csspart title - The banner title
 * @csspart description - The banner description
 * @csspart actions - The actions container
 * @csspart install - The install button
 * @csspart close - The close button
 */
@customElement('tc-installation-banner')
export class TcInstallationBanner extends LitElement {
  @property({ type: String }) title = 'Install App';
  @property({ type: String }) description =
    'Add to your home screen for quick access';
  @property({ type: String, attribute: 'install-label' }) installLabel =
    'Install';
  @property({ type: String, attribute: 'storage-key' }) storageKey =
    'tc-install-banner-dismissed';
  @property({ type: Number, attribute: 'dismiss-days' }) dismissDays = 7;

  @state() private isDismissed = false;

  private animation = new AnimationController(this, {
    showDuration: 400,
    hideDuration: 300,
  });

  private storage = new StorageController<{ dismissedAt: number }>(
    this,
    this.storageKey,
  );

  static override styles = css`
    :host {
      display: block;
      position: fixed;
      bottom: 0;
      left: 0;
      right: 0;
      z-index: 100;
      padding: var(--space-md);
      pointer-events: none;
    }

    .banner {
      display: flex;
      align-items: center;
      gap: var(--space-md);
      padding: var(--space-md) var(--space-lg);
      background: var(--paper-white);
      border-radius: var(--radius-lg);
      box-shadow: 0 -4px 20px var(--overlay-shadow-light);
      pointer-events: auto;
      opacity: 0;
      transform: translateY(100%);
      transition: opacity var(--transition-smooth), transform var(--transition-smooth);
    }

    :host([data-state='showing']) .banner,
    :host([data-state='visible']) .banner {
      opacity: 1;
      transform: translateY(0);
    }

    :host([data-state='hiding']) .banner {
      opacity: 0;
      transform: translateY(100%);
    }

    :host([data-state='hidden']) {
      display: none;
    }

    .icon {
      flex-shrink: 0;
      display: flex;
      align-items: center;
      justify-content: center;
      width: 3rem;
      height: 3rem;
      background: linear-gradient(135deg, var(--accent-primary), var(--accent-primary-hover));
      border-radius: var(--radius-md);
      color: white;
    }

    .content {
      flex: 1;
      min-width: 0;
    }

    .title {
      font-weight: 600;
      color: var(--ink-dark);
    }

    .description {
      color: var(--ink-medium);
      margin-top: 2px;
    }

    .actions {
      display: flex;
      align-items: center;
      gap: var(--space-sm);
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
      color: var(--ink-light);
      cursor: pointer;
      border-radius: var(--radius-sm);
      transition: var(--transition-fast);
    }

    .close:hover {
      background: var(--paper-warm);
      color: var(--ink-medium);
    }

    .close svg {
      width: 1.25rem;
      height: 1.25rem;
    }

    @media (max-width: 480px) {
      .banner {
        flex-wrap: wrap;
      }

      .content {
        flex-basis: calc(100% - 4rem);
      }

      .actions {
        flex-basis: 100%;
        justify-content: flex-end;
      }
    }
  `;

  override connectedCallback() {
    super.connectedCallback();
    this.updateDataState();
    this.checkDismissState();
  }

  private checkDismissState() {
    const stored = this.storage.value;
    if (stored?.dismissedAt) {
      const daysSinceDismiss =
        (Date.now() - stored.dismissedAt) / (1000 * 60 * 60 * 24);
      if (daysSinceDismiss < this.dismissDays) {
        this.isDismissed = true;
      } else {
        this.storage.remove();
      }
    }
  }

  private updateDataState() {
    this.dataset.state = this.animation.state;
  }

  async show() {
    if (this.isDismissed) return;
    await this.animation.show();
    this.updateDataState();
  }

  async dismiss() {
    this.storage.set({ dismissedAt: Date.now() });
    await this.animation.hide();
    this.updateDataState();

    this.dispatchEvent(
      new CustomEvent('tc-dismiss', {
        bubbles: true,
        composed: true,
      }),
    );
  }

  private handleInstall() {
    this.dispatchEvent(
      new CustomEvent('tc-install', {
        bubbles: true,
        composed: true,
      }),
    );
  }

  private handleClose() {
    this.dismiss();
  }

  override render() {
    return html`
      <div part="banner" class="banner" role="banner">
        <div part="icon" class="icon">
          <tc-icon name="download" size="1.5rem"></tc-icon>
        </div>
        <div part="content" class="content">
          <tc-text part="title" class="title" size="base" weight="600">
            ${this.title}
          </tc-text>
          <tc-text part="description" class="description" size="sm" color="var(--ink-medium)">
            ${this.description}
          </tc-text>
        </div>
        <div part="actions" class="actions">
          <tc-button
            part="install"
            variant="primary"
            size="small"
            @tc-click=${this.handleInstall}
          >
            ${this.installLabel}
          </tc-button>
          <button part="close" class="close" @click=${this.handleClose} aria-label="Dismiss">
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
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'tc-installation-banner': TcInstallationBanner;
  }
}
