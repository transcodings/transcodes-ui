import { css, html, LitElement } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { styleMap } from 'lit/directives/style-map.js';

/**
 * A simple container component without default flex layout.
 * Use for wrapping content with custom styles.
 *
 * @slot - Content to display inside the box
 * @csspart box - The container element
 */
@customElement('tc-box')
export class TcBox extends LitElement {
  @property({ type: Object }) sx: Record<string, string | number> = {};

  static override styles = css`
    :host {
      display: contents;
    }

    .box {
      display: block;
    }
  `;

  override render() {
    return html`
      <div part="box" class="box" style=${styleMap(this.sx)}>
        <slot></slot>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'tc-box': TcBox;
  }
}
