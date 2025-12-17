import { css, html, LitElement } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import type { SxProps } from '../types.js';
import './tc-callout.js';
import './tc-icon.js';
import './tc-text.js';

/**
 * A simplified error/warning/info message component.
 * Wraps tc-callout with appropriate icon and text styling.
 *
 * @csspart callout - The underlying callout container
 * @csspart icon - The icon element
 * @csspart message - The message text
 */
@customElement('tc-error-message')
export class TcErrorMessage extends LitElement {
  @property({ type: String }) variant: 'warning' | 'info' | 'error' = 'error';
  @property({ type: String }) message = '';
  @property({ type: Object }) sx: SxProps = {};

  static override styles = css`
    :host {
      display: block;
      width: 100%;
      min-width: 0;
    }

    tc-callout::part(callout) {
      padding: var(--space-sm) var(--space-md);
    }

    .message-text {
      line-height: 1.4;
    }
  `;

  private getIconName(): string {
    switch (this.variant) {
      case 'warning':
        return 'alert-triangle';
      case 'info':
        return 'info';
      default:
        return 'alert-circle';
    }
  }

  private getIconColor(): string {
    switch (this.variant) {
      case 'warning':
        return 'var(--semantic-warning)';
      case 'info':
        return 'var(--semantic-info)';
      default:
        return 'var(--error-base)';
    }
  }

  override render() {
    if (!this.message) {
      return null;
    }

    return html`
      <tc-callout part="callout" variant=${this.variant} .sx=${this.sx}>
        <tc-icon
          slot="icon"
          part="icon"
          name=${this.getIconName()}
          size="var(--size-icon-action)"
          color=${this.getIconColor()}
        ></tc-icon>
        <tc-text part="message" class="message-text" size="sm">
          ${this.message}
        </tc-text>
      </tc-callout>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'tc-error-message': TcErrorMessage;
  }
}
