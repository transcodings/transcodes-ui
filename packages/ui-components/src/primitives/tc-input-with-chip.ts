import { css, html, LitElement } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js';
import { sharedStyles } from '../styles/shared.js';
import './tc-chip.js';
import './tc-icon.js';
import type { IconName } from './tc-icon.js';

/**
 * An input field with an attached chip indicator.
 * Useful for showing authentication method alongside email/username input.
 *
 * @fires tc-input - Fired when input value changes
 * @fires tc-blur - Fired when input loses focus
 * @fires tc-keydown - Fired on keydown
 * @csspart wrapper - The input wrapper container
 * @csspart input - The input element
 * @csspart chip - The chip element
 */
@customElement('tc-input-with-chip')
export class TcInputWithChip extends LitElement {
  @property({ type: String }) label = '';
  @property({ type: String }) placeholder = '';
  @property({ type: String }) value = '';
  @property({ type: String }) error = '';
  @property({ type: Boolean }) disabled = false;
  @property({ type: Boolean }) readonly = false;
  @property({ type: String, attribute: 'chip-label' }) chipLabel = '';
  @property({ type: String, attribute: 'chip-icon' }) chipIcon = '';
  @property({ type: String, attribute: 'chip-variant' }) chipVariant:
    | 'default'
    | 'success'
    | 'error'
    | 'info' = 'default';

  @state() private inputId =
    `tc-input-chip-${Math.random().toString(36).slice(2)}`;
  @state() private isFocused = false;

  static override styles = [
    sharedStyles,
    css`
      :host {
        display: block;
        width: 100%;
        min-width: 0;
      }

      .field-group {
        width: 100%;
      }

      .field-group.focused .field-label {
        color: var(--accent-primary);
      }

      .field-group.has-error .field-label {
        color: var(--error-base);
      }

      .input-container {
        position: relative;
        display: flex;
        align-items: center;
        width: 100%;
        background: var(--paper-white);
        border: 1px solid var(--ink-faint);
        border-radius: var(--form-input-radius);
        transition: var(--transition-fast);
      }

      .input-container:focus-within {
        border-color: var(--accent-primary);
        box-shadow: 0 0 0 var(--shadow-focus-ring-width) var(--alpha-primary10);
      }

      .input-container.has-error {
        border-color: var(--error-base);
        background: var(--error-bg);
      }

      .input-container.has-error:focus-within {
        box-shadow: 0 0 0 var(--shadow-focus-ring-width) var(--error-border);
      }

      .input {
        flex: 1;
        min-width: 0;
        padding: var(--form-input-padding-y) var(--form-input-padding-x);
        font-family: var(--font-body);
        font-size: var(--form-input-font-size);
        color: var(--ink-black);
        background: transparent;
        border: none;
        outline: none;
      }

      .input::placeholder {
        color: var(--ink-light);
      }

      .input:disabled {
        opacity: var(--opacity-disabled);
        cursor: not-allowed;
      }

      .input:read-only {
        cursor: default;
      }

      .chip-container {
        display: flex;
        align-items: center;
        padding-right: var(--space-sm);
      }

      .chip-content {
        display: flex;
        align-items: center;
        gap: var(--space-xs);
      }

      .error-text {
        font-size: var(--font-size-sm);
        color: var(--error-base);
        margin: var(--space-xs) 0 0;
        animation: slideDown 300ms ease backwards;
      }

      @keyframes slideDown {
        from {
          opacity: 0;
          transform: translateY(calc(-1 * var(--offset-slide-up-sm)));
        }
        to {
          opacity: 1;
          transform: translateY(0);
        }
      }

      @media (prefers-reduced-motion: reduce) {
        .input-container,
        .error-text {
          transition-duration: 0.01ms !important;
          animation-duration: 0.01ms !important;
        }
      }
    `,
  ];

  override render() {
    const hasError = this.error.length > 0;

    const fieldGroupClasses = {
      'field-group': true,
      focused: this.isFocused,
      'has-error': hasError,
    };

    const containerClasses = {
      'input-container': true,
      'has-error': hasError,
    };

    return html`
      <div class=${classMap(fieldGroupClasses)}>
        ${
          this.label
            ? html`<label part="label" class="field-label" for=${this.inputId}>${this.label}</label>`
            : ''
        }
        <div part="wrapper" class=${classMap(containerClasses)}>
          <input
            part="input"
            id=${this.inputId}
            class="input"
            type="text"
            placeholder=${this.placeholder}
            .value=${this.value}
            ?disabled=${this.disabled}
            ?readonly=${this.readonly}
            aria-invalid=${hasError ? 'true' : 'false'}
            aria-describedby=${hasError ? `${this.inputId}-error` : ''}
            @input=${this.handleInput}
            @focus=${this.handleFocus}
            @blur=${this.handleBlur}
            @keydown=${this.handleKeydown}
          />
          ${
            this.chipLabel
              ? html`
                <div class="chip-container">
                  <tc-chip part="chip" variant=${this.chipVariant} size="sm">
                    <span class="chip-content">
                      ${
                        this.chipIcon
                          ? html`<tc-icon name=${this.chipIcon as IconName} size="0.875rem"></tc-icon>`
                          : ''
                      }
                      ${this.chipLabel}
                    </span>
                  </tc-chip>
                </div>
              `
              : ''
          }
        </div>
        ${
          hasError
            ? html`<p part="error" id="${this.inputId}-error" class="error-text" role="alert">
              ${this.error}
            </p>`
            : ''
        }
      </div>
    `;
  }

  private handleInput(e: Event) {
    const input = e.target as HTMLInputElement;
    this.value = input.value;

    this.dispatchEvent(
      new CustomEvent('tc-input', {
        bubbles: true,
        composed: true,
        detail: { value: input.value },
      }),
    );
  }

  private handleFocus() {
    this.isFocused = true;
  }

  private handleBlur(e: Event) {
    const input = e.target as HTMLInputElement;
    this.isFocused = false;

    this.dispatchEvent(
      new CustomEvent('tc-blur', {
        bubbles: true,
        composed: true,
        detail: { value: input.value },
      }),
    );
  }

  private handleKeydown(e: KeyboardEvent) {
    this.dispatchEvent(
      new CustomEvent('tc-keydown', {
        bubbles: true,
        composed: true,
        detail: { key: e.key, value: this.value, originalEvent: e },
      }),
    );
  }

  focus() {
    const input = this.shadowRoot?.querySelector('input');
    input?.focus();
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'tc-input-with-chip': TcInputWithChip;
  }
}
