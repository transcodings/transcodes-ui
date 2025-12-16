import { css, html, LitElement } from 'lit';
import { customElement, property } from 'lit/decorators.js';

/**
 * A horizontal divider line with optional text.
 *
 * @csspart divider - The divider element (simple mode)
 * @csspart container - The container element (text mode)
 * @csspart line - The line elements (text mode)
 * @csspart text - The text element (text mode)
 */
@customElement('tc-divider')
export class TcDivider extends LitElement {
  @property({ type: String }) color = 'var(--ink-faint)';
  @property({ type: String }) spacing = 'var(--space-md)';
  @property({ type: String }) text = '';

  static override styles = css`
    :host {
      display: block;
      width: 100%;
      min-width: 0;
    }

    /* Simple divider (no text) */
    .divider {
      border: none;
      height: 1px;
      background-color: var(--divider-color);
      margin: var(--divider-spacing) 0;
    }

    /* Divider with text */
    .divider-container {
      display: flex;
      align-items: center;
      gap: var(--space-md);
      margin: var(--divider-spacing) 0;
    }

    .divider-line {
      flex: 1;
      border: none;
      height: 1px;
      background-color: var(--divider-color);
      margin: 0;
    }

    .divider-text {
      flex-shrink: 0;
      font-size: var(--font-size-sm);
      color: var(--ink-light);
      font-family: var(--font-body);
    }
  `;

  override render() {
    const styleVars = `--divider-color: ${this.color}; --divider-spacing: ${this.spacing};`;

    if (this.text) {
      return html`
        <div part="container" class="divider-container" style=${styleVars}>
          <hr part="line" class="divider-line" />
          <span part="text" class="divider-text">${this.text}</span>
          <hr part="line" class="divider-line" />
        </div>
      `;
    }

    return html`
      <hr part="divider" class="divider" style=${styleVars} />
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'tc-divider': TcDivider;
  }
}
