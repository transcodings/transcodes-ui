import { css, html, LitElement } from 'lit';
import { customElement, property } from 'lit/decorators.js';

/**
 * A chip/tag component for labels and badges.
 *
 * @slot - Chip content
 * @csspart chip - The chip container
 */
@customElement('tc-chip')
export class TcChip extends LitElement {
  @property({ type: String }) variant:
    | 'default'
    | 'success'
    | 'error'
    | 'info' = 'default';
  @property({ type: String }) size: 'sm' | 'md' = 'md';

  static override styles = css`
    :host {
      display: inline-flex;
    }

    .chip {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      border-radius: var(--radius-full);
      font-family: var(--font-body);
      font-weight: 500;
    }

    .chip--sm {
      padding: var(--size-chip-padding-sm);
      font-size: 0.75rem;
    }

    .chip--md {
      padding: var(--size-chip-padding-md);
      font-size: 0.875rem;
    }

    .chip--default {
      background: var(--paper-cream);
      color: var(--ink-dark);
    }

    .chip--success {
      background: var(--alpha-success15);
      color: var(--accent-success);
    }

    .chip--error {
      background: var(--error-bg);
      color: var(--error-base);
    }

    .chip--info {
      background: var(--alpha-primary10);
      color: var(--accent-primary);
    }
  `;

  override render() {
    return html`
      <span part="chip" class="chip chip--${this.variant} chip--${this.size}">
        <slot></slot>
      </span>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'tc-chip': TcChip;
  }
}
