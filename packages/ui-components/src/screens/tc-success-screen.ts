import { css, html, LitElement } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { AnimationController } from '../controllers/animation.controller.js';
import '../primitives/tc-icon.js';
import '../primitives/tc-text.js';
import '../primitives/tc-button.js';
import '../primitives/tc-container.js';
import '../primitives/tc-section.js';

/**
 * A full-screen success state with animated checkmark and message.
 *
 * @fires tc-action - Fired when the action button is clicked
 * @csspart screen - The screen container
 * @csspart content - The content wrapper
 * @csspart icon - The success icon container
 * @csspart title - The success title
 * @csspart message - The success message
 * @csspart action - The action button container
 */
@customElement('tc-success-screen')
export class TcSuccessScreen extends LitElement {
  @property({ type: String }) title = 'Success!';
  @property({ type: String }) message =
    'Your action was completed successfully.';
  @property({ type: String, attribute: 'action-label' }) actionLabel = '';
  @property({ type: Boolean, attribute: 'auto-animate' }) autoAnimate = true;

  @state() private isAnimated = false;

  private animation = new AnimationController(this, {
    showDuration: 600,
    hideDuration: 300,
  });

  static override styles = css`
    :host {
      display: block;
      width: 100%;
      min-height: 100vh;
      min-height: 100dvh;
    }

    .screen {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 100%;
      min-height: 100vh;
      min-height: 100dvh;
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
      width: 5rem;
      height: 5rem;
      background: var(--alpha-success10);
      border-radius: var(--radius-full);
      color: var(--accent-success);
      transform: scale(0);
      opacity: 0;
      transition: transform 0.6s cubic-bezier(0.34, 1.56, 0.64, 1),
        opacity 0.3s ease;
    }

    .icon-container.animated {
      transform: scale(1);
      opacity: 1;
    }

    .checkmark {
      width: 2.5rem;
      height: 2.5rem;
      stroke-dasharray: 50;
      stroke-dashoffset: 50;
    }

    .icon-container.animated .checkmark {
      animation: draw-check 0.5s ease-out 0.3s forwards;
    }

    @keyframes draw-check {
      to {
        stroke-dashoffset: 0;
      }
    }

    .title {
      margin: 0;
    }

    .message {
      color: var(--ink-medium);
    }

    .text-content {
      opacity: 0;
      transform: translateY(10px);
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
      transform: translateY(10px);
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

  private handleAction() {
    this.dispatchEvent(
      new CustomEvent('tc-action', {
        bubbles: true,
        composed: true,
      }),
    );
  }

  override render() {
    const animatedClass = this.isAnimated ? 'animated' : '';

    return html`
      <div part="screen" class="screen">
        <tc-container>
          <div part="content" class="content">
            <div part="icon" class="icon-container ${animatedClass}">
              <svg
                class="checkmark"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="3"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                <polyline points="20 6 9 17 4 12"></polyline>
              </svg>
            </div>
            <tc-section gap="var(--space-sm)" class="text-content ${animatedClass}">
              <tc-text part="title" tag="h1" size="xl" weight="600" class="title">
                ${this.title}
              </tc-text>
              <tc-text part="message" size="base" color="tertiary" class="message">
                ${this.message}
              </tc-text>
            </tc-section>
            ${
              this.actionLabel
                ? html`
                  <div part="action" class="action ${animatedClass}">
                    <tc-button variant="success" @tc-click=${this.handleAction}>
                      ${this.actionLabel}
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
    'tc-success-screen': TcSuccessScreen;
  }
}
