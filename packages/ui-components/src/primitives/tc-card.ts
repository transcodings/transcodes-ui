import { css, html, LitElement } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { styleMap } from 'lit/directives/style-map.js';

/**
 * Card component with layered shadows and optional inner border effect.
 *
 * @slot - Card content
 * @csspart card - The card container
 */
@customElement('tc-card')
export class TcCard extends LitElement {
  @property({ type: Boolean, attribute: 'no-border' }) noBorder = false;
  @property({ type: Object }) sx: Record<string, string | number> = {};

  static override styles = css`
    :host {
      display: block;
    }

    .card {
      position: relative;
      background: var(--paper-white);
      border-radius: var(--radius-card, clamp(0.75rem, 0.59rem + 0.78vw, 1rem));
      padding: var(--card-padding, var(--space-lg));
      box-shadow: var(--shadow-card);
    }

    /* Inner border effect using mask */
    .card::before {
      content: '';
      position: absolute;
      inset: 0;
      border-radius: inherit;
      padding: 0.0625rem;
      background: linear-gradient(
        180deg,
        var(--alpha-white90) 0%,
        var(--alpha-white30) 100%
      );
      mask:
        linear-gradient(#fff 0 0) content-box,
        linear-gradient(#fff 0 0);
      mask-composite: exclude;
      pointer-events: none;
    }

    .card--no-border::before {
      display: none;
    }

    .card-content {
      position: relative;
      z-index: 1;
    }
  `;

  override render() {
    const classes = ['card', this.noBorder ? 'card--no-border' : '']
      .filter(Boolean)
      .join(' ');

    return html`
      <div part="card" class=${classes} style=${styleMap(this.sx)}>
        <div class="card-content">
          <slot></slot>
        </div>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'tc-card': TcCard;
  }
}
