import { css, html, LitElement } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js';
import { sharedStyles } from '../styles/shared.js';

/**
 * A callout/alert component for messages and notices.
 * Uses design-tokens notice classes (.notice, .notice-info, .notice-success, etc.)
 *
 * @slot - Callout content
 * @slot icon - Optional icon slot
 * @csspart callout - The callout container
 * @csspart icon - The icon container
 * @csspart content - The content container
 */
@customElement('tc-callout')
export class TcCallout extends LitElement {
  @property({ type: String }) variant:
    | 'info'
    | 'success'
    | 'warning'
    | 'error' = 'info';

  static override styles = [
    sharedStyles,
    css`
      :host {
        display: block;
        width: 100%;
      }

      /* Override animation from design-tokens for immediate display */
      .notice {
        animation: none;
      }

      /* Error variant uses error-message class from design-tokens */
      .error-message {
        animation: none;
      }

      /* Icon + content layout */
      .callout-inner {
        display: flex;
        align-items: flex-start;
        gap: var(--space-sm);
      }

      .callout-icon {
        flex-shrink: 0;
        display: flex;
        align-items: center;
      }

      /* Hide icon container when empty */
      .callout-icon:empty {
        display: none;
      }

      .callout-content {
        flex: 1;
        min-width: 0;
      }
    `,
  ];

  override render() {
    // Map callout variants to design-tokens notice classes
    // Error uses error-message class, others use notice-* classes
    const isError = this.variant === 'error';
    const classes = {
      notice: !isError,
      'notice-info': this.variant === 'info',
      'notice-success': this.variant === 'success',
      'notice-warning': this.variant === 'warning',
      'error-message': isError,
    };

    return html`
      <div part="callout" class=${classMap(classes)} role="alert">
        <div class="callout-inner">
          <div part="icon" class="callout-icon">
            <slot name="icon"></slot>
          </div>
          <div part="content" class="callout-content">
            <slot></slot>
          </div>
        </div>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'tc-callout': TcCallout;
  }
}
