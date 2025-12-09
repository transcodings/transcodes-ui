import { css, html, LitElement } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { styleMap } from 'lit/directives/style-map.js';

/**
 * A clickable item button with hover states and optional arrow indicator.
 *
 * @slot - Item content
 * @slot prefix - Left side content (icon, symbol)
 * @slot suffix - Right side content (replaces arrow if provided)
 * @fires tc-click - Fired when the item is clicked
 * @csspart button - The button element
 * @csspart prefix - The prefix container
 * @csspart content - The main content container
 * @csspart suffix - The suffix container
 * @csspart arrow - The arrow indicator
 */
@customElement('tc-item-button')
export class TcItemButton extends LitElement {
  @property({ type: String }) gap = 'var(--space-md)';
  @property({ type: String }) padding = 'var(--space-md)';
  @property({ type: Boolean }) disabled = false;
  @property({ type: Boolean, attribute: 'show-arrow' }) showArrow = true;
  @property({ type: Object }) sx: Record<string, string | number> = {};

  static override styles = css`
    :host {
      display: block;
      width: 100%;
    }

    .button {
      display: flex;
      align-items: center;
      width: 100%;
      padding: var(--item-padding);
      gap: var(--item-gap);
      background: var(--paper-cream);
      border: none;
      border-radius: var(--radius-md);
      box-sizing: border-box;
      cursor: pointer;
      font-family: inherit;
      text-align: left;
      transition: var(--transition-fast);
    }

    .button:hover:not(:disabled) {
      background: var(--paper-warm);
    }

    .button:active:not(:disabled) {
      transform: scale(0.995);
    }

    .button:focus-visible {
      outline: 2px solid var(--accent-primary);
      outline-offset: 2px;
    }

    .button:disabled {
      opacity: 0.6;
      cursor: not-allowed;
    }

    .prefix {
      flex-shrink: 0;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .content {
      flex: 1;
      min-width: 0;
      font-family: var(--font-body);
      font-size: var(--font-size-base);
      color: var(--ink-dark);
    }

    .suffix {
      flex-shrink: 0;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .arrow {
      flex-shrink: 0;
      width: 1.25rem;
      height: 1.25rem;
      color: var(--ink-light);
      transition: var(--transition-fast);
    }

    .button:hover:not(:disabled) .arrow {
      color: var(--ink-medium);
      transform: translateX(2px);
    }

    /* Hide empty slots */
    .prefix:not(:has(*)),
    .suffix:not(:has(*)) {
      display: none;
    }

    /* Hide arrow when suffix has content */
    .suffix:has(*) + .arrow {
      display: none;
    }
  `;

  private handleClick() {
    if (this.disabled) return;

    this.dispatchEvent(
      new CustomEvent('tc-click', {
        bubbles: true,
        composed: true,
      }),
    );
  }

  override render() {
    const buttonStyles = {
      '--item-padding': this.padding,
      '--item-gap': this.gap,
      ...this.sx,
    };

    return html`
      <button
        part="button"
        class="button"
        ?disabled=${this.disabled}
        style=${styleMap(buttonStyles)}
        @click=${this.handleClick}
      >
        <div part="prefix" class="prefix">
          <slot name="prefix"></slot>
        </div>
        <div part="content" class="content">
          <slot></slot>
        </div>
        <div part="suffix" class="suffix">
          <slot name="suffix"></slot>
        </div>
        ${
          this.showArrow
            ? html`
              <svg
                part="arrow"
                class="arrow"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                <polyline points="9 18 15 12 9 6"></polyline>
              </svg>
            `
            : ''
        }
      </button>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'tc-item-button': TcItemButton;
  }
}
