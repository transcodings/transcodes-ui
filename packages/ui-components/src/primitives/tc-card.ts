import { css, html, LitElement } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js';
import { styleMap } from 'lit/directives/style-map.js';
import { sharedStyles } from '../styles/shared.js';
import type { SxProps } from '../types.js';

/**
 * Card component with layered shadows and optional inner border effect.
 * Uses design-tokens .card class.
 *
 * @slot - Card content
 * @csspart card - The card container
 */
@customElement('tc-card')
export class TcCard extends LitElement {
  @property({ type: Boolean, attribute: 'no-border' }) noBorder = false;
  @property({ type: Object }) sx: SxProps = {};

  static override styles = [
    sharedStyles,
    css`
      :host {
        display: block;
        min-width: 0;
      }

      /* Inner border effect using mask - extends design-tokens .card */
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
    `,
  ];

  override render() {
    const classes = {
      card: true,
      'card--no-border': this.noBorder,
    };

    return html`
      <div part="card" class=${classMap(classes)} style=${styleMap(this.sx)}>
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
