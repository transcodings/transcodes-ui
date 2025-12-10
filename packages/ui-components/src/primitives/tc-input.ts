import { css, html, LitElement } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js';
import { styleMap } from 'lit/directives/style-map.js';
import { sharedStyles } from '../styles/shared.js';

/**
 * Form input component with label and error states.
 * Uses design-tokens classes (.input, .label, .field-group).
 *
 * @fires tc-input - Fired when input value changes
 * @fires tc-blur - Fired when input loses focus
 * @fires tc-keydown - Fired when a key is pressed
 * @fires tc-paste - Fired when content is pasted
 * @csspart wrapper - The input wrapper element
 * @csspart input - The input element
 * @csspart label - The label element
 * @csspart ink-line - The animated ink line
 * @csspart error - The error message element
 */
@customElement('tc-input')
export class TcInput extends LitElement {
  @property({ type: String }) label = '';
  @property({ type: String }) type = 'text';
  @property({ type: String }) placeholder = '';
  @property({ type: String }) value = '';
  @property({ type: String }) error = '';
  @property({ type: Boolean }) disabled = false;
  @property({ type: Boolean }) required = false;
  @property({ type: String }) name = '';
  @property({ type: String }) autocomplete = '';
  @property({ type: String }) inputmode = '';
  @property({ type: Number }) maxlength = 0;
  @property({ type: Object }) sx: Record<string, string | number> = {};

  @state() private inputId = `tc-input-${Math.random().toString(36).slice(2)}`;
  @state() private isFocused = false;

  static override styles = [
    sharedStyles,
    css`
      :host {
        display: block;
      }

      /* Extend design-tokens .field-group */
      .field-group {
        width: 100%;
      }

      /* Label color change on focus - extends design-tokens .field-label */
      .field-group.focused .field-label {
        color: var(--accent-primary);
      }

      .field-group.has-error .field-label {
        color: var(--error-base);
      }

      .input-wrapper {
        position: relative;
        width: 100%;
      }

      /* Extend design-tokens .input */
      .input {
        width: 100%;
        box-sizing: border-box;
      }

      .input:disabled {
        opacity: var(--opacity-disabled);
        cursor: not-allowed;
      }

      /* Ink line animation */
      .ink-line {
        position: absolute;
        bottom: 0;
        left: 50%;
        transform: translateX(-50%);
        width: 0;
        height: 0.125rem;
        background: linear-gradient(
          90deg,
          var(--accent-primary) 0%,
          var(--accent-primary-hover) 100%
        );
        border-radius: 0.0625rem;
        transition: width 300ms cubic-bezier(0.4, 0, 0.2, 1);
        pointer-events: none;
      }

      .input-wrapper.focused .ink-line {
        width: 60%;
      }

      /* Error states */
      .input.has-error {
        border-color: var(--error-base);
        background: var(--error-bg);
      }

      .input.has-error:focus {
        border-color: var(--error-base);
        box-shadow: 0 0 0 0.1875rem var(--error-border);
      }

      .input-wrapper.has-error .ink-line {
        background: linear-gradient(
          90deg,
          var(--error-base) 0%,
          var(--error-base) 100%
        );
      }

      .input-error-text {
        font-size: var(--font-size-sm);
        color: var(--error-base);
        margin: 0;
        animation: slideDown 300ms ease backwards;
      }

      @keyframes slideDown {
        from {
          opacity: 0;
          transform: translateY(-0.25rem);
        }
        to {
          opacity: 1;
          transform: translateY(0);
        }
      }

      /* Reduced motion */
      @media (prefers-reduced-motion: reduce) {
        .field-label,
        .input,
        .ink-line,
        .input-error-text {
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

    const wrapperClasses = {
      'input-wrapper': true,
      focused: this.isFocused,
      'has-error': hasError,
    };

    const inputClasses = {
      input: true,
      'has-error': hasError,
    };

    return html`
      <div class=${classMap(fieldGroupClasses)}>
        ${
          this.label
            ? html`<label part="label" class="field-label" for=${this.inputId}>${this.label}</label>`
            : ''
        }
        <div part="wrapper" class=${classMap(wrapperClasses)}>
          <input
            part="input"
            id=${this.inputId}
            class=${classMap(inputClasses)}
            type=${this.type}
            name=${this.name}
            placeholder=${this.placeholder}
            .value=${this.value}
            ?disabled=${this.disabled}
            ?required=${this.required}
            autocomplete=${this.autocomplete || 'off'}
            inputmode=${this.inputmode || ''}
            maxlength=${this.maxlength || ''}
            aria-invalid=${hasError ? 'true' : 'false'}
            aria-describedby=${hasError ? `${this.inputId}-error` : ''}
            style=${styleMap(this.sx)}
            @input=${this.handleInput}
            @focus=${this.handleFocus}
            @blur=${this.handleBlur}
            @keydown=${this.handleKeydown}
            @paste=${this.handlePaste}
          />
          <div part="ink-line" class="ink-line"></div>
        </div>
        ${
          hasError
            ? html`<p part="error" id="${this.inputId}-error" class="input-error-text" role="alert">
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

  private handlePaste(e: ClipboardEvent) {
    this.dispatchEvent(
      new CustomEvent('tc-paste', {
        bubbles: true,
        composed: true,
        detail: { data: e.clipboardData?.getData('text'), originalEvent: e },
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
    'tc-input': TcInput;
  }
}
