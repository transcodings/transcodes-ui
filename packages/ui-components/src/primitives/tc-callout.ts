import { css, html, LitElement } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js';
import { sharedStyles } from '../styles/shared.js';

/**
 * A callout/alert component for messages and notices.
 * Uses design-tokens notice classes (.notice, .notice-info, .notice-success, etc.)
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
