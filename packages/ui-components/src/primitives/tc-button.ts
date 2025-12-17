import { css, html, LitElement } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js';
import { styleMap } from 'lit/directives/style-map.js';
import { sharedStyles } from '../styles/shared.js';
import type { SxProps } from '../types.js';

/**
 * Primary button component with loading states.
 * Uses design-tokens component classes (.button, .button-primary, etc.)
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
  @property({ type: Object }) sx: SxProps = {};

  static override styles = [
    sharedStyles,
    css`
      :host {
        display: block;
        width: 100%;
        min-width: 0;
      }

      /* Extend base .button from design-tokens */
      .button {
        position: relative;
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
        gap: var(--space-sm);
        overflow: hidden;
      }

      /* Radial gradient glow overlay for primary/success */
      .button-ink::before {
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

      .button-ink:hover:not(:disabled)::before {
        opacity: 1;
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

      /* Active states - design-tokens doesn't include these */
      .button-primary:active:not(:disabled) {
        background: var(--accent-primary-pressed);
        transform: translateY(0);
        box-shadow: none;
      }

      .button-success:active:not(:disabled) {
        background: var(--accent-success-pressed);
        transform: translateY(0);
        box-shadow: none;
      }

      .button-secondary:active:not(:disabled) {
        background: var(--alpha-primary08);
      }

      /* Secondary spinner override */
      .button-secondary .button-spinner {
        border-color: var(--alpha-primary30);
        border-top-color: var(--accent-primary);
      }

      /* Focus visible state */
      .button:focus-visible {
        outline: var(--size-border-width-thick) solid var(--accent-primary);
        outline-offset: var(--size-border-width-thick);
      }

      /* Reduced motion */
      @media (prefers-reduced-motion: reduce) {
        .button,
        .button-ink::before {
          transition-duration: 0.01ms !important;
        }

        .button--loading {
          animation: none;
        }

        .button-spinner {
          animation-duration: 1.5s;
        }
      }
    `,
  ];

  override render() {
    // Use design-tokens class naming: button-primary, button-secondary, button-success
    const classes = {
      button: true,
      'button-ink': this.variant !== 'secondary',
      'button-primary': this.variant === 'primary',
      'button-secondary': this.variant === 'secondary',
      'button-success': this.variant === 'success',
      'button--loading': this.loading,
    };

    return html`
      <button
        part="button"
        class=${classMap(classes)}
        style=${styleMap(this.sx)}
        ?disabled=${this.disabled || this.loading}
        type="button"
        @click=${this.handleClick}
      >
        <span class="button-content">
          ${this.loading ? html`<div part="spinner" class="button-spinner"></div>` : ''}
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
