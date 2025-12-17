import { css, html, LitElement } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { styleMap } from 'lit/directives/style-map.js';
import { LoadingController } from '../controllers/loading.controller.js';
import type { SxProps } from '../types.js';
import '../primitives/tc-spinner.js';
import '../primitives/tc-text.js';
import '../primitives/tc-container.js';

/**
 * A full-screen loading state with spinner and optional message.
 *
 * @csspart screen - The screen container
 * @csspart content - The content wrapper
 * @csspart spinner - The spinner element
 * @csspart message - The message text
 */
@customElement('tc-loading-screen')
export class TcLoadingScreen extends LitElement {
  @property({ type: String }) message = '';
  @property({ type: String, attribute: 'spinner-size' }) spinnerSize:
    | 'sm'
    | 'md'
    | 'lg'
    | 'auto' = 'md';
  @property({ type: Object }) sx: SxProps = {};

  private loading = new LoadingController(this);

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
      background: var(--paper-white);
    }

    .content {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: var(--space-lg);
      text-align: center;
    }

    .message {
      color: var(--ink-medium);
      max-width: 20rem;
    }
  `;

  override connectedCallback() {
    super.connectedCallback();
    this.loading.start();
  }

  override render() {
    return html`
      <div part="screen" class="screen" style=${styleMap(this.sx)}>
        <tc-container>
          <div part="content" class="content">
            <tc-spinner part="spinner" size=${this.spinnerSize}></tc-spinner>
            ${
              this.message
                ? html`
                  <tc-text part="message" class="message" size="base" color="tertiary">
                    ${this.message}
                  </tc-text>
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
    'tc-loading-screen': TcLoadingScreen;
  }
}
