import { css, html, LitElement } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { AnimationController } from '../controllers/animation.controller.js';
import '../primitives/tc-icon.js';
import '../primitives/tc-text.js';
import '../primitives/tc-button.js';

/**
 * A guide modal for iOS PWA installation steps.
 *
 * @fires tc-close - Fired when the guide is closed
 * @csspart overlay - The backdrop overlay
 * @csspart modal - The modal container
 * @csspart header - The modal header
 * @csspart close - The close button
 * @csspart content - The content area
 * @csspart steps - The steps container
 * @csspart step - Individual step
 * @csspart step-number - Step number indicator
 * @csspart step-text - Step text
 */
@customElement('tc-ios-installation-guide')
export class TcIosInstallationGuide extends LitElement {
  @property({ type: String }) title = 'Install on iOS';
  @property({ type: Array }) steps = [
    'Tap the Share button in Safari',
    'Scroll down and tap "Add to Home Screen"',
    'Tap "Add" in the top right corner',
  ];

  private animation = new AnimationController(this, {
    showDuration: 300,
    hideDuration: 200,
  });

  static override styles = css`
    :host {
      display: contents;
    }

    .overlay {
      position: fixed;
      inset: 0;
      z-index: 1000;
      display: flex;
      align-items: flex-end;
      justify-content: center;
      background: var(--overlay-dim);
      opacity: 0;
      visibility: hidden;
      transition: opacity var(--transition-smooth), visibility var(--transition-smooth);
    }

    :host([data-state='showing']) .overlay,
    :host([data-state='visible']) .overlay {
      opacity: 1;
      visibility: visible;
    }

    :host([data-state='hiding']) .overlay {
      opacity: 0;
    }

    :host([data-state='hidden']) .overlay {
      visibility: hidden;
    }

    .modal {
      width: 100%;
      max-width: 400px;
      margin: var(--space-md);
      padding: var(--space-lg);
      background: var(--paper-white);
      border-radius: var(--radius-lg) var(--radius-lg) 0 0;
      transform: translateY(100%);
      transition: transform var(--transition-smooth);
    }

    :host([data-state='showing']) .modal,
    :host([data-state='visible']) .modal {
      transform: translateY(0);
    }

    :host([data-state='hiding']) .modal {
      transform: translateY(100%);
    }

    .header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-bottom: var(--space-lg);
    }

    .title {
      font-family: var(--font-body);
      font-size: var(--font-size-lg);
      font-weight: 600;
      color: var(--ink-dark);
      margin: 0;
    }

    .close {
      display: flex;
      align-items: center;
      justify-content: center;
      width: var(--size-close-button);
      height: var(--size-close-button);
      padding: 0;
      border: none;
      background: transparent;
      color: var(--ink-medium);
      cursor: pointer;
      border-radius: var(--radius-sm);
      transition: var(--transition-fast);
    }

    .close:hover {
      background: var(--paper-warm);
      color: var(--ink-dark);
    }

    .close svg {
      width: 1.25rem;
      height: 1.25rem;
    }

    .steps {
      display: flex;
      flex-direction: column;
      gap: var(--space-md);
    }

    .step {
      display: flex;
      align-items: flex-start;
      gap: var(--space-md);
    }

    .step-number {
      flex-shrink: 0;
      display: flex;
      align-items: center;
      justify-content: center;
      width: 1.75rem;
      height: 1.75rem;
      background: var(--accent-primary);
      color: white;
      font-family: var(--font-body);
      font-size: var(--font-size-sm);
      font-weight: 600;
      border-radius: var(--radius-full);
    }

    .step-text {
      flex: 1;
      padding-top: 2px;
      color: var(--ink-dark);
      line-height: 1.5;
    }

    .share-icon {
      display: inline-flex;
      vertical-align: middle;
      width: 1.25rem;
      height: 1.25rem;
      margin: 0 2px;
      color: var(--accent-primary);
    }

    .action {
      margin-top: var(--space-xl);
    }
  `;

  override connectedCallback() {
    super.connectedCallback();
    this.updateDataState();
  }

  private updateDataState() {
    this.dataset.state = this.animation.state;
  }

  async show() {
    await this.animation.show();
    this.updateDataState();
  }

  async close() {
    await this.animation.hide();
    this.updateDataState();

    this.dispatchEvent(
      new CustomEvent('tc-close', {
        bubbles: true,
        composed: true,
      }),
    );
  }

  private handleOverlayClick(e: Event) {
    if (e.target === e.currentTarget) {
      this.close();
    }
  }

  private renderStep(text: string, index: number) {
    // Replace [share] with share icon
    const parts = text.split('[share]');
    const content =
      parts.length > 1
        ? html`${parts[0]}<svg class="share-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8"></path>
              <polyline points="16 6 12 2 8 6"></polyline>
              <line x1="12" y1="2" x2="12" y2="15"></line>
            </svg>${parts[1]}`
        : text;

    return html`
      <div part="step" class="step">
        <span part="step-number" class="step-number">${index + 1}</span>
        <tc-text part="step-text" class="step-text" size="base">${content}</tc-text>
      </div>
    `;
  }

  override render() {
    return html`
      <div part="overlay" class="overlay" @click=${this.handleOverlayClick}>
        <div part="modal" class="modal" role="dialog" aria-modal="true" aria-labelledby="guide-title">
          <div part="header" class="header">
            <h2 id="guide-title" class="title">${this.title}</h2>
            <button part="close" class="close" @click=${this.close} aria-label="Close">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            </button>
          </div>
          <div part="content" class="content">
            <div part="steps" class="steps">
              ${(this.steps as string[]).map((step, i) => this.renderStep(step, i))}
            </div>
          </div>
          <div part="action" class="action">
            <tc-button variant="primary" @tc-click=${this.close}>Got it</tc-button>
          </div>
        </div>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'tc-ios-installation-guide': TcIosInstallationGuide;
  }
}
