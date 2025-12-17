import { css, html, LitElement } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { styleMap } from 'lit/directives/style-map.js';
import type { SxProps } from '../types.js';

/**
 * A circular symbol/avatar component.
 *
 * @slot - Symbol content (icon or text)
 * @csspart symbol - The symbol container
 */
@customElement('tc-symbol')
export class TcSymbol extends LitElement {
  @property({ type: Object }) sx: SxProps = {};

  static override styles = css`
    :host {
      display: inline-flex;
      align-items: center;
      justify-content: center;
    }

    .symbol {
      display: flex;
      align-items: center;
      justify-content: center;
      border-radius: var(--radius-full);
      background: var(--symbol-bg);
      color: var(--symbol-color);
      width: var(--symbol-size);
      height: var(--symbol-size);
      font-family: var(--font-body);
      font-weight: 600;
    }
  `;

  override render() {
    const baseStyles = {
      '--symbol-size': '3rem',
      '--symbol-bg': 'var(--paper-cream)',
      '--symbol-color': 'var(--ink-dark)',
    };
    const mergedStyles = { ...baseStyles, ...this.sx };

    return html`
      <div part="symbol" class="symbol" style=${styleMap(mergedStyles)}>
        <slot></slot>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'tc-symbol': TcSymbol;
  }
}
