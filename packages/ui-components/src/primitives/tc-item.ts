import { css, html, LitElement } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { styleMap } from 'lit/directives/style-map.js';

/**
 * A non-clickable item container for displaying content.
 *
 * @slot - Item content
 * @slot prefix - Left side content (icon, symbol)
 * @slot suffix - Right side content (badge, action)
 * @csspart item - The item container
 * @csspart prefix - The prefix container
 * @csspart content - The main content container
 * @csspart suffix - The suffix container
 */
@customElement('tc-item')
export class TcItem extends LitElement {
  @property({ type: String }) gap = 'var(--space-md)';
  @property({ type: String }) padding = 'var(--space-md)';
  @property({ type: Object }) sx: Record<string, string | number> = {};

  static override styles = css`
    :host {
      display: block;
      width: 100%;
    }

    .item {
      display: flex;
      align-items: center;
      width: 100%;
      padding: var(--item-padding);
      gap: var(--item-gap);
      background: var(--paper-cream);
      border-radius: var(--radius-md);
      box-sizing: border-box;
    }

    .prefix {
      flex-shrink: 0;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .content {
      flex: 1;
      min-width: 0;
      font-family: var(--font-body);
      font-size: var(--font-size-base);
      color: var(--ink-dark);
    }

    .suffix {
      flex-shrink: 0;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    /* Hide empty slots */
    .prefix:not(:has(*)),
    .suffix:not(:has(*)) {
      display: none;
    }
  `;

  override render() {
    const itemStyles = {
      '--item-padding': this.padding,
      '--item-gap': this.gap,
      ...this.sx,
    };

    return html`
      <div part="item" class="item" style=${styleMap(itemStyles)}>
        <div part="prefix" class="prefix">
          <slot name="prefix"></slot>
        </div>
        <div part="content" class="content">
          <slot></slot>
        </div>
        <div part="suffix" class="suffix">
          <slot name="suffix"></slot>
        </div>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'tc-item': TcItem;
  }
}
