import { css, html, LitElement } from 'lit';
import { customElement, property } from 'lit/decorators.js';

/**
 * A horizontal divider line.
 *
 * @csspart divider - The divider element
 */
@customElement('tc-divider')
export class TcDivider extends LitElement {
  @property({ type: String }) color = 'var(--ink-faint)';
  @property({ type: String }) spacing = 'var(--space-md)';

  static override styles = css`
    :host {
      display: block;
      width: 100%;
    }

    .divider {
      border: none;
      height: 1px;
      background-color: var(--divider-color);
      margin: var(--divider-spacing) 0;
    }
  `;

  override render() {
    return html`
      <hr
        part="divider"
        class="divider"
        style="--divider-color: ${this.color}; --divider-spacing: ${this.spacing};"
      />
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'tc-divider': TcDivider;
  }
}
