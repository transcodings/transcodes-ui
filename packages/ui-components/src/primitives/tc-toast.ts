import { css, html, LitElement } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { AnimationController } from '../controllers/animation.controller.js';

/**
 * A toast notification component with auto-dismiss and animation.
 *
 * @slot - Toast message content
 * @fires tc-dismiss - Fired when the toast is dismissed
 * @csspart toast - The toast container
 * @csspart content - The content container
 * @csspart close - The close button
 */
@customElement('tc-toast')
export class TcToast extends LitElement {
  @property({ type: String }) variant:
    | 'info'
    | 'success'
    | 'warning'
    | 'error' = 'info';
  @property({ type: Number }) duration = 5000;
  @property({ type: Boolean, attribute: 'auto-dismiss' }) autoDismiss = true;
  @property({ type: Boolean }) dismissible = true;

  private animation = new AnimationController(this, {
    showDuration: 300,
    hideDuration: 200,
  });

  private dismissTimer?: ReturnType<typeof setTimeout>;

  static override styles = css`
    :host {
      display: block;
      position: fixed;
      bottom: var(--space-lg);
      left: 50%;
      transform: translateX(-50%);
      z-index: 1000;
      pointer-events: none;
    }

    .toast {
      display: flex;
      align-items: center;
      gap: var(--space-sm);
      padding: var(--space-md) var(--space-lg);
      border-radius: var(--radius-md);
      font-family: var(--font-body);
      font-size: var(--font-size-sm);
      box-shadow: 0 4px 12px var(--overlay-shadow-subtle);
      pointer-events: auto;
      opacity: 0;
      transform: translateY(100%);
      transition: opacity var(--transition-smooth), transform var(--transition-smooth);
    }

    :host([data-state='showing']) .toast,
    :host([data-state='visible']) .toast {
      opacity: 1;
      transform: translateY(0);
    }

    :host([data-state='hiding']) .toast {
      opacity: 0;
      transform: translateY(100%);
    }

    :host([data-state='hidden']) {
      display: none;
    }

    .toast--info {
      background: var(--ink-dark);
      color: var(--paper-white);
    }

    .toast--success {
      background: var(--accent-success);
      color: white;
    }

    .toast--warning {
      background: var(--semantic-warning);
      color: white;
    }

    .toast--error {
      background: var(--error-base);
      color: white;
    }

    .content {
      flex: 1;
      line-height: 1.4;
    }

    .close {
      flex-shrink: 0;
      display: flex;
      align-items: center;
      justify-content: center;
      width: var(--size-icon-md);
      height: var(--size-icon-md);
      padding: 0;
      border: none;
      background: transparent;
      color: inherit;
      opacity: var(--opacity-hover);
      cursor: pointer;
      transition: opacity var(--transition-fast);
    }

    .close:hover {
      opacity: 1;
    }

    .close svg {
      width: var(--size-icon-sm);
      height: var(--size-icon-sm);
    }
  `;

  override connectedCallback() {
    super.connectedCallback();
    this.updateDataState();
  }

  override disconnectedCallback() {
    super.disconnectedCallback();
    this.clearDismissTimer();
  }

  private updateDataState() {
    this.dataset.state = this.animation.state;
  }

  private clearDismissTimer() {
    if (this.dismissTimer) {
      clearTimeout(this.dismissTimer);
      this.dismissTimer = undefined;
    }
  }

  private startDismissTimer() {
    if (this.autoDismiss && this.duration > 0) {
      this.clearDismissTimer();
      this.dismissTimer = setTimeout(() => {
        this.hide();
      }, this.duration);
    }
  }

  async show() {
    this.clearDismissTimer();
    await this.animation.show();
    this.updateDataState();
    this.startDismissTimer();
  }

  async hide() {
    this.clearDismissTimer();
    await this.animation.hide();
    this.updateDataState();

    this.dispatchEvent(
      new CustomEvent('tc-dismiss', {
        bubbles: true,
        composed: true,
      }),
    );
  }

  private handleClose() {
    this.hide();
  }

  override render() {
    return html`
      <div part="toast" class="toast toast--${this.variant}" role="alert" aria-live="polite">
        <div part="content" class="content">
          <slot></slot>
        </div>
        ${
          this.dismissible
            ? html`
              <button
                part="close"
                class="close"
                @click=${this.handleClose}
                aria-label="Dismiss"
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
            `
            : ''
        }
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'tc-toast': TcToast;
  }
}
