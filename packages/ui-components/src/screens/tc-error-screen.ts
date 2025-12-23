import { css, html, LitElement } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { styleMap } from 'lit/directives/style-map.js';
import { AnimationController } from '../controllers/animation.controller.js';
import type { SxProps } from '../types.js';
import '../primitives/tc-icon.js';
import '../primitives/tc-text.js';
import '../primitives/tc-button.js';
import '../primitives/tc-container.js';
import '../primitives/tc-section.js';

/**
 * A full-screen error state with animated icon, message, and retry action.
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
  @property({ type: Boolean, attribute: 'auto-animate' }) autoAnimate = true;
  @property({ type: Object }) sx: SxProps = {};

  @state() private isAnimated = false;

  private animation = new AnimationController(this, {
    showDuration: 600,
    hideDuration: 300,
  });

  static override styles = css`
    :host {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 100%;
      height: 100%;
      min-height: inherit;
    }

    .screen {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 100%;
      height: 100%;
      min-height: inherit;
      padding: var(--space-lg);
      box-sizing: border-box;
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
      padding: var(--space-md);
      background: var(--error-bg);
      border-radius: var(--radius-full);
      color: var(--error-base);
      transform: scale(0);
      opacity: 0;
      transition: transform 0.6s cubic-bezier(0.34, 1.56, 0.64, 1),
        opacity 0.3s ease;
    }

    .icon-container.animated {
      transform: scale(1);
      opacity: 1;
    }

    .title {
      margin: 0;
    }

    .message {
      color: var(--ink-medium);
    }

    .text-content {
      opacity: 0;
      transform: translateY(var(--offset-slide-up-md));
      transition: opacity 0.4s ease, transform 0.4s ease;
      transition-delay: 0.4s;
    }

    .text-content.animated {
      opacity: 1;
      transform: translateY(0);
    }

    .action {
      width: 100%;
      margin-top: var(--space-md);
      opacity: 0;
      transform: translateY(var(--offset-slide-up-md));
      transition: opacity 0.4s ease, transform 0.4s ease;
      transition-delay: 0.6s;
    }

    .action.animated {
      opacity: 1;
      transform: translateY(0);
    }
  `;

  override connectedCallback() {
    super.connectedCallback();
    if (this.autoAnimate) {
      requestAnimationFrame(() => {
        this.playAnimation();
      });
    }
  }

  async playAnimation() {
    await this.animation.show();
    this.isAnimated = true;
  }

  private handleRetry() {
    this.dispatchEvent(
      new CustomEvent('tc-retry', {
        bubbles: true,
        composed: true,
      }),
    );
  }

  override render() {
    const animatedClass = this.isAnimated ? 'animated' : '';

    return html`
      <div part="screen" class="screen" style=${styleMap(this.sx)}>
        <tc-container>
          <div part="content" class="content">
            <div part="icon" class="icon-container ${animatedClass}">
              <tc-icon name="alert-circle" .sx=${{ '--icon-size': 'var(--size-icon-xl)' }}></tc-icon>
            </div>
            <tc-section .sx=${{ gap: 'var(--space-sm)' }} class="text-content ${animatedClass}">
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
                  <div part="action" class="action ${animatedClass}">
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
