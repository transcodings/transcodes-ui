import { css, html, LitElement } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { styleMap } from 'lit/directives/style-map.js';
import { sharedStyles } from '../styles/shared.js';

/**
 * Form header component with animated title, subtitle, and optional notice.
 * Uses design-tokens form classes (.form-title, .form-subtitle).
 *
 * @csspart header - The header container
 * @csspart title - The title element
 * @csspart subtitle - The subtitle element
 * @csspart notice - The notice element
 */
@customElement('tc-form-header')
export class TcFormHeader extends LitElement {
  @property({ type: String }) title = '';
  @property({ type: String }) subtitle = '';
  @property({ type: String }) notice = '';
  @property({ type: Boolean, attribute: 'no-animation' }) noAnimation = false;
  @property({ type: Object }) sx: Record<string, string | number> = {};

  static override styles = [
    sharedStyles,
    css`
      :host {
        display: block;
        text-align: center;
      }

      .header {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: var(--space-sm);
      }

      /* Extend design-tokens .form-title */
      .form-title {
        margin: 0;
        line-height: 1.2;
      }

      .form-title--animated {
        animation: slideDown var(--duration-fast) var(--easing-ease-in-out) backwards;
      }

      /* Extend design-tokens .form-subtitle */
      .form-subtitle {
        margin: 0;
        max-width: 28ch;
      }

      .form-subtitle--animated {
        animation: slideUp var(--duration-smooth) var(--easing-ease-in-out) 100ms backwards;
      }

      .notice {
        margin-top: var(--space-sm);
        padding: var(--space-sm) var(--space-md);
        background: var(--paper-warm);
        border-radius: var(--radius-md);
        font-size: var(--font-size-sm);
        color: var(--ink-medium);
      }

      .notice--animated {
        animation: noticeReveal 500ms var(--easing-ease-in-out) 200ms backwards;
      }

      @keyframes noticeReveal {
        from {
          opacity: 0;
          transform: scale(0.95);
        }
        to {
          opacity: 1;
          transform: scale(1);
        }
      }

      /* Reduced motion */
      @media (prefers-reduced-motion: reduce) {
        .form-title--animated,
        .form-subtitle--animated,
        .notice--animated {
          animation: none;
        }
      }
    `,
  ];

  override render() {
    const animated = !this.noAnimation;

    return html`
      <header part="header" class="header" style=${styleMap(this.sx)}>
        ${
          this.title
            ? html`<h1 part="title" class="form-title ${animated ? 'form-title--animated' : ''}">
              ${this.title}
            </h1>`
            : ''
        }
        ${
          this.subtitle
            ? html`<p part="subtitle" class="form-subtitle ${animated ? 'form-subtitle--animated' : ''}">
              ${this.subtitle}
            </p>`
            : ''
        }
        ${
          this.notice
            ? html`<div part="notice" class="notice ${animated ? 'notice--animated' : ''}">
              ${this.notice}
            </div>`
            : ''
        }
      </header>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'tc-form-header': TcFormHeader;
  }
}
