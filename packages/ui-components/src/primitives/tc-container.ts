import { css, html, LitElement } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { styleMap } from 'lit/directives/style-map.js';
import type { SxProps } from '../types.js';

/**
 * A flex container component with column layout by default.
 *
 * @slot - Content to display inside the container
 * @csspart container - The container element
 */
@customElement('tc-container')
export class TcContainer extends LitElement {
  @property({ type: Boolean }) wide = false;
  @property({ type: Object }) sx: SxProps = {};

  private defaultStyles: Record<string, string> = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'flex-start',
  };

  static override styles = css`
    :host {
      display: block;
      width: 100%;
      min-width: 0;
    }

    .container {
      position: relative;
      width: 100%;
      max-width: var(--container-max-width);
      margin: 0 auto;
      box-sizing: border-box;
    }

    .container--wide {
      max-width: var(--container-max-width-wide);
    }
  `;

  override render() {
    const mergedStyles = {
      ...this.defaultStyles,
      ...this.sx,
    };

    return html`
      <div
        part="container"
        class="container ${this.wide ? 'container--wide' : ''}"
        style=${styleMap(mergedStyles)}
      >
        <slot></slot>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'tc-container': TcContainer;
  }
}
