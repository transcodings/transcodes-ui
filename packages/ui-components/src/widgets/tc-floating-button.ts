import { css, html, LitElement } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { styleMap } from 'lit/directives/style-map.js';

/**
 * A floating action button positioned fixed on the screen.
 *
 * @slot - Button content (icon recommended)
 * @fires tc-click - Fired when the button is clicked
 * @csspart button - The button element
 */
@customElement('tc-floating-button')
export class TcFloatingButton extends LitElement {
  @property({ type: String }) position:
    | 'bottom-right'
    | 'bottom-left'
    | 'top-right'
    | 'top-left' = 'bottom-right';
  @property({ type: String }) size = '3.5rem';
  @property({ type: Boolean }) disabled = false;
  @property({ type: Object }) sx: Record<string, string | number> = {};

  static override styles = css`
    :host {
      display: block;
      position: fixed;
      z-index: 100;
    }

    :host([position='bottom-right']) {
      bottom: var(--space-lg);
      right: var(--space-lg);
    }

    :host([position='bottom-left']) {
      bottom: var(--space-lg);
      left: var(--space-lg);
    }

    :host([position='top-right']) {
      top: var(--space-lg);
      right: var(--space-lg);
    }

    :host([position='top-left']) {
      top: var(--space-lg);
      left: var(--space-lg);
    }

    .button {
      display: flex;
      align-items: center;
      justify-content: center;
      width: var(--fab-size);
      height: var(--fab-size);
      padding: 0;
      border: none;
      border-radius: var(--radius-full);
      background: var(--accent-primary);
      color: white;
      cursor: pointer;
      box-shadow: 0 4px 12px var(--alpha-primary40);
      transition: var(--transition-smooth);
    }

    .button:hover:not(:disabled) {
      background: var(--accent-primary-hover);
      transform: scale(1.05);
      box-shadow: 0 6px 16px var(--alpha-primary50);
    }

    .button:active:not(:disabled) {
      background: var(--accent-primary-pressed);
      transform: scale(0.98);
    }

    .button:focus-visible {
      outline: 2px solid var(--accent-primary);
      outline-offset: 3px;
    }

    .button:disabled {
      opacity: var(--opacity-disabled);
      cursor: not-allowed;
      box-shadow: none;
    }
  `;

  override connectedCallback() {
    super.connectedCallback();
    this.setAttribute('position', this.position);
  }

  override updated(changedProperties: Map<string, unknown>) {
    if (changedProperties.has('position')) {
      this.setAttribute('position', this.position);
    }
  }

  private handleClick() {
    if (this.disabled) return;

    this.dispatchEvent(
      new CustomEvent('tc-click', {
        bubbles: true,
        composed: true,
      }),
    );
  }

  override render() {
    const buttonStyles = {
      '--fab-size': this.size,
      ...this.sx,
    };

    return html`
      <button
        part="button"
        class="button"
        ?disabled=${this.disabled}
        style=${styleMap(buttonStyles)}
        @click=${this.handleClick}
        aria-label="Floating action"
      >
        <slot></slot>
      </button>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'tc-floating-button': TcFloatingButton;
  }
}
