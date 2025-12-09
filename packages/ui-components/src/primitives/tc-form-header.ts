import { css, html, LitElement } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { styleMap } from 'lit/directives/style-map.js';

/**
 * Form header component with animated title, subtitle, and optional notice.
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

  static override styles = css`
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

    .title {
      font-size: var(--title-font-size, clamp(1.375rem, 1.27rem + 0.54vw, 1.75rem));
      font-weight: var(--title-font-weight, 600);
      letter-spacing: var(--title-letter-spacing, -0.02em);
      color: var(--ink-black);
      margin: 0;
      line-height: 1.2;
    }

    .title--animated {
      animation: slideDown 300ms cubic-bezier(0.4, 0, 0.2, 1) backwards;
    }

    .subtitle {
      font-size: var(--font-size-base);
      color: var(--ink-medium);
      line-height: 1.5;
      margin: 0;
      max-width: 28ch;
    }

    .subtitle--animated {
      animation: slideUp 400ms cubic-bezier(0.4, 0, 0.2, 1) 100ms backwards;
    }

    .notice {
      margin-top: var(--space-sm);
      padding: var(--space-sm) var(--space-md);
      background: var(--paper-warm);
      border-radius: 0.5rem;
      font-size: var(--font-size-sm);
      color: var(--ink-medium);
    }

    .notice--animated {
      animation: noticeReveal 500ms cubic-bezier(0.4, 0, 0.2, 1) 200ms backwards;
    }

    @keyframes slideDown {
      from {
        opacity: 0;
        transform: translateY(-0.5rem);
      }
      to {
        opacity: 1;
        transform: translateY(0);
      }
    }

    @keyframes slideUp {
      from {
        opacity: 0;
        transform: translateY(0.5rem);
      }
      to {
        opacity: 1;
        transform: translateY(0);
      }
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
      .title--animated,
      .subtitle--animated,
      .notice--animated {
        animation: none;
      }
    }
  `;

  override render() {
    const animated = !this.noAnimation;

    return html`
      <header part="header" class="header" style=${styleMap(this.sx)}>
        ${
          this.title
            ? html`<h1 part="title" class="title ${animated ? 'title--animated' : ''}">
              ${this.title}
            </h1>`
            : ''
        }
        ${
          this.subtitle
            ? html`<p part="subtitle" class="subtitle ${animated ? 'subtitle--animated' : ''}">
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
