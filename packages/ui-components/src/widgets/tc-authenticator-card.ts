import { css, html, LitElement } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js';
import '../primitives/tc-icon.js';
import '../primitives/tc-text.js';
import '../primitives/tc-chip.js';
import type { IconName } from '../primitives/tc-icon.js';

/**
 * A card component for displaying authenticator information.
 * Commonly used for passkeys, TOTP, USB security keys, etc.
 *
 * @fires tc-delete - Fired when the delete button is clicked
 * @fires tc-toggle - Fired when the enable/disable toggle is clicked
 * @fires tc-click - Fired when the card is clicked
 * @csspart card - The card container
 * @csspart icon - The authenticator type icon container
 * @csspart content - The main content area
 * @csspart name - The authenticator name
 * @csspart meta - The metadata area (last used, etc.)
 * @csspart actions - The actions area
 * @csspart delete - The delete button
 */
@customElement('tc-authenticator-card')
export class TcAuthenticatorCard extends LitElement {
  @property({ type: String }) name = '';
  @property({ type: String }) type:
    | 'passkey'
    | 'totp'
    | 'usb'
    | 'phone'
    | 'email' = 'passkey';
  @property({ type: String, attribute: 'last-used' }) lastUsed = '';
  @property({ type: Boolean }) enabled = true;
  @property({ type: Boolean }) deletable = true;
  @property({ type: Boolean }) clickable = false;

  static override styles = css`
    :host {
      display: block;
      width: 100%;
    }

    .card {
      display: flex;
      align-items: center;
      gap: var(--space-md);
      padding: var(--space-md);
      background: var(--paper-cream);
      border-radius: var(--radius-md);
      transition: var(--transition-fast);
    }

    .card.clickable {
      cursor: pointer;
    }

    .card.clickable:hover {
      background: var(--paper-warm);
    }

    .card.disabled {
      opacity: var(--opacity-disabled);
    }

    .icon-container {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 2.5rem;
      height: 2.5rem;
      background: var(--paper-white);
      border-radius: var(--radius-md);
      flex-shrink: 0;
    }

    .content {
      flex: 1;
      min-width: 0;
    }

    .name {
      font-weight: 500;
      color: var(--ink-black);
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }

    .meta {
      display: flex;
      align-items: center;
      gap: var(--space-sm);
      margin-top: var(--space-xs);
    }

    .last-used {
      font-size: var(--font-size-sm);
      color: var(--ink-light);
    }

    .actions {
      display: flex;
      align-items: center;
      gap: var(--space-sm);
      flex-shrink: 0;
    }

    .delete-btn {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 2rem;
      height: 2rem;
      padding: 0;
      background: transparent;
      border: none;
      border-radius: var(--radius-sm);
      color: var(--ink-light);
      cursor: pointer;
      transition: var(--transition-fast);
    }

    .delete-btn:hover {
      background: var(--alpha-ink04);
      color: var(--error-base);
    }

    .delete-btn:focus-visible {
      outline: 2px solid var(--accent-primary);
      outline-offset: 2px;
    }

    .status-chip {
      flex-shrink: 0;
    }
  `;

  private getIconName(): IconName {
    switch (this.type) {
      case 'passkey':
        return 'key';
      case 'totp':
        return 'totp';
      case 'usb':
        return 'device';
      case 'phone':
        return 'phone';
      case 'email':
        return 'email';
      default:
        return 'key';
    }
  }

  private handleCardClick() {
    if (this.clickable && this.enabled) {
      this.dispatchEvent(
        new CustomEvent('tc-click', {
          bubbles: true,
          composed: true,
        }),
      );
    }
  }

  private handleDelete(e: Event) {
    e.stopPropagation();
    this.dispatchEvent(
      new CustomEvent('tc-delete', {
        bubbles: true,
        composed: true,
        detail: { name: this.name, type: this.type },
      }),
    );
  }

  override render() {
    const cardClasses = {
      card: true,
      clickable: this.clickable && this.enabled,
      disabled: !this.enabled,
    };

    return html`
      <div
        part="card"
        class=${classMap(cardClasses)}
        @click=${this.handleCardClick}
        role=${this.clickable ? 'button' : 'article'}
        tabindex=${this.clickable && this.enabled ? '0' : '-1'}
      >
        <div part="icon" class="icon-container">
          <tc-icon name=${this.getIconName()} size="1.25rem" color="var(--ink-dark)"></tc-icon>
        </div>
        <div part="content" class="content">
          <div part="name" class="name">${this.name}</div>
          ${
            this.lastUsed
              ? html`
                <div part="meta" class="meta">
                  <span class="last-used">${this.lastUsed}</span>
                </div>
              `
              : ''
          }
        </div>
        <div part="actions" class="actions">
          ${
            !this.enabled
              ? html`
                <tc-chip class="status-chip" variant="default" size="sm">Disabled</tc-chip>
              `
              : ''
          }
          ${
            this.deletable
              ? html`
                <button
                  part="delete"
                  class="delete-btn"
                  @click=${this.handleDelete}
                  aria-label="Delete ${this.name}"
                >
                  <tc-icon name="x" size="1rem"></tc-icon>
                </button>
              `
              : ''
          }
        </div>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'tc-authenticator-card': TcAuthenticatorCard;
  }
}
