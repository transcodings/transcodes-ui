import { css, html, LitElement } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import '../primitives/tc-icon.js';
import '../primitives/tc-text.js';
import '../primitives/tc-button.js';
import '../primitives/tc-container.js';
import '../primitives/tc-section.js';

/**
 * A full-screen error state with icon, message, and retry action.
 *
 * @fires tc-retry - Fired when the retry button is clicked
 * @csspart screen - The screen container
 * @csspart content - The content wrapper
 * @csspart icon - The error icon
 * @csspart title - The error title
 * @csspart message - The error message
 * @csspart action - The action button container
 */
@customElement('tc-error-screen')
export class TcErrorScreen extends LitElement {
  @property({ type: String }) title = 'Something went wrong';
  @property({ type: String }) message =
    'An unexpected error occurred. Please try again.';
  @property({ type: String, attribute: 'retry-label' }) retryLabel =
    'Try Again';
  @property({ type: Boolean, attribute: 'show-retry' }) showRetry = true;

  static override styles = css`
    :host {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 100%;
      min-height: inherit;
    }

    .screen {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 100%;
      min-height: inherit;
      padding: var(--space-lg);
      box-sizing: border-box;
      background: var(--paper-white);
    }

    .content {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: var(--space-lg);
      text-align: center;
      max-width: 20rem;
    }

    .icon-container {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 4rem;
      height: 4rem;
      background: var(--error-bg);
      border-radius: var(--radius-full);
      color: var(--error-base);
    }

    .title {
      margin: 0;
    }

    .message {
      color: var(--ink-medium);
    }

    .action {
      width: 100%;
      margin-top: var(--space-md);
    }
  `;

  private handleRetry() {
    this.dispatchEvent(
      new CustomEvent('tc-retry', {
        bubbles: true,
        composed: true,
      }),
    );
  }

  override render() {
    return html`
      <div part="screen" class="screen">
        <tc-container>
          <div part="content" class="content">
            <div part="icon" class="icon-container">
              <tc-icon name="alert-circle" size="2rem"></tc-icon>
            </div>
            <tc-section gap="var(--space-sm)">
              <tc-text part="title" tag="h1" size="xl" weight="600" class="title">
                ${this.title}
              </tc-text>
              <tc-text part="message" size="base" color="tertiary" class="message">
                ${this.message}
              </tc-text>
            </tc-section>
            ${
              this.showRetry
                ? html`
                  <div part="action" class="action">
                    <tc-button variant="primary" @tc-click=${this.handleRetry}>
                      ${this.retryLabel}
                    </tc-button>
                  </div>
                `
                : ''
            }
          </div>
        </tc-container>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'tc-error-screen': TcErrorScreen;
  }
}
