import { css, html, LitElement } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { styleMap } from 'lit/directives/style-map.js';

/**
 * Primary button component with loading states.
 *
 * @fires tc-click - Fired when button is clicked
 * @slot - Button content
 * @csspart button - The button element
 * @csspart spinner - The loading spinner
 */
@customElement('tc-button')
export class TcButton extends LitElement {
  @property({ type: Boolean }) disabled = false;
  @property({ type: Boolean }) loading = false;
  @property({ type: String }) variant: 'primary' | 'secondary' | 'success' =
    'primary';
  @property({ type: Object }) sx: Record<string, string | number> = {};

  static override styles = css`
    :host {
      display: block;
      width: 100%;
    }

    .button {
      position: relative;
      width: 100%;
      height: var(--button-height);
      padding: 0 var(--space-lg);
      border: none;
      border-radius: var(--button-radius);
      font-family: var(--font-body);
      font-size: var(--button-font-size);
      font-weight: var(--button-font-weight);
      letter-spacing: var(--button-letter-spacing);
      cursor: pointer;
      transition: background var(--transition-fast),
        box-shadow var(--transition-fast),
        transform var(--transition-fast);
      display: flex;
      align-items: center;
      justify-content: center;
      gap: var(--space-sm);
      overflow: hidden;
    }

    /* Radial gradient glow overlay */
    .button::before {
      content: '';
      position: absolute;
      inset: 0;
      border-radius: inherit;
      background: radial-gradient(
        circle at center,
        transparent 0%,
        var(--overlay-glow-white) 100%
      );
      opacity: var(--opacity-hidden);
      transition: opacity 600ms ease;
      pointer-events: none;
    }

    .button:hover:not(:disabled)::before {
      opacity: 1;
    }

    .button:disabled {
      opacity: var(--opacity-disabled);
      cursor: not-allowed;
    }

    /* Loading pulse animation */
    .button--loading {
      animation: pulse 1s ease-in-out infinite;
    }

    @keyframes pulse {
      0%,
      100% {
        opacity: var(--opacity-visible);
      }
      50% {
        opacity: var(--opacity-loading);
      }
    }

    .button--primary {
      background: var(--accent-primary);
      color: var(--paper-white);
    }

    .button--primary:hover:not(:disabled) {
      background: var(--accent-primary-hover);
      box-shadow: var(--shadow-button-hover-primary);
      transform: translateY(-0.0625rem);
    }

    .button--primary:active:not(:disabled) {
      background: var(--accent-primary-pressed);
      transform: translateY(0);
      box-shadow: none;
    }

    .button--success {
      background: var(--accent-success);
      color: var(--paper-white);
    }

    .button--success:hover:not(:disabled) {
      background: var(--accent-success-hover);
      box-shadow: var(--shadow-button-hover-success);
      transform: translateY(-0.0625rem);
    }

    .button--success:active:not(:disabled) {
      background: var(--accent-success-pressed);
      transform: translateY(0);
      box-shadow: none;
    }

    .button--secondary {
      height: var(--button-height-secondary);
      background: transparent;
      color: var(--ink-dark);
      border: 0.09375rem solid var(--ink-faint);
    }

    .button--secondary:hover:not(:disabled) {
      color: var(--accent-primary);
      border-color: var(--accent-primary);
      background: var(--alpha-primary04);
    }

    .button--secondary:active:not(:disabled) {
      background: var(--alpha-primary08);
    }

    /* Hide glow on secondary variant */
    .button--secondary::before {
      display: none;
    }

    .button-content {
      position: relative;
      z-index: 1;
      display: flex;
      align-items: center;
      justify-content: center;
      gap: var(--space-sm);
    }

    .spinner {
      width: var(--size-spinner-button);
      height: var(--size-spinner-button);
      border: var(--size-border-width-thick) solid var(--overlay-spinner-track);
      border-top-color: currentColor;
      border-radius: 50%;
      animation: spin 0.8s linear infinite;
    }

    .button--secondary .spinner {
      border-color: var(--alpha-primary30);
      border-top-color: var(--accent-primary);
    }

    @keyframes spin {
      to {
        transform: rotate(360deg);
      }
    }

    /* Focus visible state */
    .button:focus-visible {
      outline: var(--size-border-width-thick) solid var(--accent-primary);
      outline-offset: var(--size-border-width-thick);
    }

    /* Reduced motion */
    @media (prefers-reduced-motion: reduce) {
      .button,
      .button::before {
        transition-duration: 0.01ms !important;
      }

      .button--loading {
        animation: none;
      }

      .spinner {
        animation-duration: 1.5s;
      }
    }
  `;

  override render() {
    const classes = [
      'button',
      `button--${this.variant}`,
      this.loading ? 'button--loading' : '',
    ]
      .filter(Boolean)
      .join(' ');

    return html`
      <button
        part="button"
        class=${classes}
        style=${styleMap(this.sx)}
        ?disabled=${this.disabled || this.loading}
        type="button"
        @click=${this.handleClick}
      >
        <span class="button-content">
          ${this.loading ? html`<div part="spinner" class="spinner"></div>` : ''}
          <slot></slot>
        </span>
      </button>
    `;
  }

  private handleClick(e: Event) {
    if (this.disabled || this.loading) return;

    this.dispatchEvent(
      new CustomEvent('tc-click', {
        bubbles: true,
        composed: true,
        detail: { originalEvent: e },
      }),
    );
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'tc-button': TcButton;
  }
}
