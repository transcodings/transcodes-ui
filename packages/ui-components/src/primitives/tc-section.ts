import { css, html, LitElement } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { styleMap } from 'lit/directives/style-map.js';

/**
 * A section container with flex column layout.
 *
 * @slot - Section content
 * @csspart section - The section element
 */
@customElement('tc-section')
export class TcSection extends LitElement {
  @property({ type: String }) gap = 'var(--space-md)';
  @property({ type: Object }) sx: Record<string, string | number> = {};

  static override styles = css`
    :host {
      display: block;
      width: 100%;
      min-width: 0;
    }

    .section {
      display: flex;
      flex-direction: column;
      width: 100%;
      box-sizing: border-box;
    }
  `;

  override render() {
    const mergedStyles = {
      gap: this.gap,
      ...this.sx,
    };

    return html`
      <section part="section" class="section" style=${styleMap(mergedStyles)}>
        <slot></slot>
      </section>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'tc-section': TcSection;
  }
}
