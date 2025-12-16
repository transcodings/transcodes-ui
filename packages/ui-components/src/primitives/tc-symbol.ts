import { css, html, LitElement } from 'lit';
import { customElement, property } from 'lit/decorators.js';

/**
 * A circular symbol/avatar component.
 *
 * @slot - Symbol content (icon or text)
 * @csspart symbol - The symbol container
 */
@customElement('tc-symbol')
export class TcSymbol extends LitElement {
  @property({ type: String }) size = '3rem';
  @property({ type: String }) background = 'var(--paper-cream)';
  @property({ type: String }) color = 'var(--ink-dark)';

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
    return html`
      <div
        part="symbol"
        class="symbol"
        style="--symbol-size: ${this.size}; --symbol-bg: ${this.background}; --symbol-color: ${this.color};"
      >
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
