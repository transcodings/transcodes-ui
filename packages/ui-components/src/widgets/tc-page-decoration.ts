import { css, html, LitElement } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { sharedStyles } from '../styles/shared.js';

/**
 * Decorative floating blob background for pages.
 * Uses CSS custom properties for color variants and inkFloat/inkDrift animations from design-tokens.
 *
 * @csspart decoration - The decoration container
 * @csspart blob - Individual blob element
 */
@customElement('tc-page-decoration')
export class TcPageDecoration extends LitElement {
  @property({ type: String }) variant: 'primary' | 'success' | 'error' =
    'primary';

  static override styles = [
    sharedStyles,
    css`
    :host {
      position: fixed;
      inset: 0;
      z-index: 0;
      pointer-events: none;
      overflow: hidden;
    }

    .decoration {
      position: absolute;
      inset: 0;
    }

    .blob {
      position: absolute;
      border-radius: 50%;
      opacity: 0.35;
      filter: blur(0.0625rem);
    }

    /* Primary (purple) variant */
    :host([variant='primary']) .blob {
      background: radial-gradient(
        circle,
        var(--accent-primary) 0%,
        transparent 70%
      );
    }

    /* Success (green) variant */
    :host([variant='success']) .blob {
      background: radial-gradient(
        circle,
        var(--accent-success) 0%,
        transparent 70%
      );
    }

    /* Error (red) variant */
    :host([variant='error']) .blob {
      background: radial-gradient(
        circle,
        var(--error-base) 0%,
        transparent 70%
      );
    }

    .blob-1 {
      width: 18rem;
      height: 18rem;
      top: -6rem;
      left: -5rem;
      animation: decorFloat 12s ease-in-out infinite;
    }

    .blob-2 {
      width: 14rem;
      height: 14rem;
      top: 30%;
      right: -6rem;
      animation: decorFloat 10s ease-in-out infinite reverse;
    }

    .blob-3 {
      width: var(--size-decoration-blob);
      height: var(--size-decoration-blob);
      bottom: -8rem;
      left: 20%;
      animation: decorFloat 14s ease-in-out infinite 2s;
    }

    @keyframes decorFloat {
      0%,
      100% {
        transform: translate(0, 0) scale(1);
      }
      33% {
        transform: translate(0.375rem, -0.5rem) scale(1.08);
      }
      66% {
        transform: translate(-0.25rem, -0.25rem) scale(1.15);
      }
    }

    /* Reduced motion */
    @media (prefers-reduced-motion: reduce) {
      .blob {
        animation: none;
      }
    }
  `,
  ];

  override render() {
    return html`
      <div part="decoration" class="decoration">
        <div part="blob" class="blob blob-1"></div>
        <div part="blob" class="blob blob-2"></div>
        <div part="blob" class="blob blob-3"></div>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'tc-page-decoration': TcPageDecoration;
  }
}
