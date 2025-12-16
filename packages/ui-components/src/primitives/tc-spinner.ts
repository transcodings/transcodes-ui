import { css, html, LitElement } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { MatchMediaController } from '../controllers/match-media.controller.js';
import { sharedStyles } from '../styles/shared.js';

/**
 * A loading spinner with responsive sizing.
 * Uses spin animation from design-tokens.
 *
 * @csspart spinner - The spinner element
 */
@customElement('tc-spinner')
export class TcSpinner extends LitElement {
  private mobile = new MatchMediaController(this, '(max-width: 768px)');

  @property({ type: String }) size: 'sm' | 'md' | 'lg' | 'auto' = 'auto';
  @property({ type: String }) color = 'var(--accent-primary)';

  static override styles = [
    sharedStyles,
    css`
      :host {
        display: inline-flex;
        align-items: center;
        justify-content: center;
      }

      .spinner {
        display: block;
        border-radius: var(--radius-full);
        border-style: solid;
        border-color: var(--paper-cream);
        border-top-color: var(--spinner-color);
        animation: spin var(--duration-slow) linear infinite;
      }

      .spinner--sm {
        width: var(--size-spinner-sm);
        height: var(--size-spinner-sm);
        border-width: var(--size-border-width-thick);
      }

      .spinner--md {
        width: var(--size-spinner-md);
        height: var(--size-spinner-md);
        border-width: var(--size-border-width-heavy);
      }

      .spinner--lg {
        width: var(--size-spinner-lg);
        height: var(--size-spinner-lg);
        border-width: var(--size-border-width-bold);
      }

      .spinner--auto-mobile {
        width: var(--size-spinner-lg);
        height: var(--size-spinner-lg);
        border-width: var(--size-border-width-heavy);
      }

      .spinner--auto-desktop {
        width: var(--size-spinner-xl);
        height: var(--size-spinner-xl);
        border-width: var(--size-border-width-bold);
      }
    `,
  ];

  override render() {
    let sizeClass: string;

    if (this.size === 'auto') {
      sizeClass = this.mobile.matches
        ? 'spinner--auto-mobile'
        : 'spinner--auto-desktop';
    } else {
      sizeClass = `spinner--${this.size}`;
    }

    return html`
      <div
        part="spinner"
        class="spinner ${sizeClass}"
        style="--spinner-color: ${this.color};"
        role="progressbar"
        aria-label="Loading"
      ></div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'tc-spinner': TcSpinner;
  }
}
