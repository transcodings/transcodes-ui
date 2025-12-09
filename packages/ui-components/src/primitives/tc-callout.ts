import { css, html, LitElement } from 'lit';
import { customElement, property } from 'lit/decorators.js';

/**
 * A callout/alert component for messages and notices.
 *
 * @slot - Callout content
 * @csspart callout - The callout container
 */
@customElement('tc-callout')
export class TcCallout extends LitElement {
  @property({ type: String }) variant:
    | 'info'
    | 'success'
    | 'warning'
    | 'error' = 'info';

  static override styles = css`
    :host {
      display: block;
      width: 100%;
    }

    .callout {
      padding: var(--space-md);
      border-radius: var(--radius-md);
      font-family: var(--font-body);
      font-size: var(--font-size-sm);
      line-height: 1.5;
    }

    .callout--info {
      background: var(--alpha-primary08);
      color: var(--accent-primary);
      border: 1px solid var(--alpha-primary20);
    }

    .callout--success {
      background: var(--alpha-success10);
      color: var(--accent-success);
      border: 1px solid var(--alpha-success20);
    }

    .callout--warning {
      background: var(--alpha-warning15);
      color: var(--semantic-warning);
      border: 1px solid var(--alpha-warning20);
    }

    .callout--error {
      background: var(--error-bg);
      color: var(--error-base);
      border: 1px solid var(--error-border);
    }
  `;

  override render() {
    return html`
      <div part="callout" class="callout callout--${this.variant}" role="alert">
        <slot></slot>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'tc-callout': TcCallout;
  }
}
