import { css, html, LitElement } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { styleMap } from 'lit/directives/style-map.js';

/**
 * Form input component with label and error states.
 *
 * @fires tc-input - Fired when input value changes
 * @fires tc-blur - Fired when input loses focus
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

  static override styles = css`
    :host {
      display: block;
    }

    .form-group {
      display: flex;
      flex-direction: column;
      gap: var(--space-sm);
      width: 100%;
    }

    .label {
      font-size: var(--label-font-size);
      font-weight: var(--label-font-weight);
      text-transform: uppercase;
      letter-spacing: var(--label-letter-spacing);
      color: var(--ink-medium);
      transition: color 300ms ease;
    }

    /* Label color change on focus */
    .form-group--focused .label {
      color: var(--accent-primary);
    }

    .form-group--error .label {
      color: var(--error-base);
    }

    .input-wrapper {
      position: relative;
      width: 100%;
    }

    .input {
      width: 100%;
      padding: var(--input-padding-y) var(--input-padding-x);
      font-family: var(--font-body);
      font-size: var(--input-font-size);
      color: var(--ink-black);
      background: var(--paper-cream);
      border: 0.0625rem solid transparent;
      border-radius: var(--input-radius);
      transition: background var(--transition-smooth),
        border-color var(--transition-smooth),
        box-shadow var(--transition-smooth);
      box-sizing: border-box;
    }

    .input::placeholder {
      color: var(--ink-faint);
    }

    .input:hover:not(:disabled) {
      background: var(--paper-warm);
    }

    .input:focus {
      outline: none;
      background: var(--paper-white);
      border-color: var(--ink-faint);
      box-shadow: var(--shadow-input-focus);
    }

    .input:disabled {
      opacity: 0.6;
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

    .input-wrapper--focused .ink-line {
      width: 60%;
    }

    /* Error states */
    .input--error {
      border-color: var(--error-base);
      background: var(--error-bg);
    }

    .input--error:focus {
      border-color: var(--error-base);
      box-shadow: 0 0 0 0.1875rem var(--error-border);
    }

    .input-wrapper--error .ink-line {
      background: linear-gradient(
        90deg,
        var(--error-base) 0%,
        var(--error-base) 100%
      );
    }

    .error-message {
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
      .label,
      .input,
      .ink-line,
      .error-message {
        transition-duration: 0.01ms !important;
        animation-duration: 0.01ms !important;
      }
    }
  `;

  override render() {
    const hasError = this.error.length > 0;

    const formGroupClasses = [
      'form-group',
      this.isFocused ? 'form-group--focused' : '',
      hasError ? 'form-group--error' : '',
    ]
      .filter(Boolean)
      .join(' ');

    const wrapperClasses = [
      'input-wrapper',
      this.isFocused ? 'input-wrapper--focused' : '',
      hasError ? 'input-wrapper--error' : '',
    ]
      .filter(Boolean)
      .join(' ');

    return html`
      <div class=${formGroupClasses}>
        ${
          this.label
            ? html`<label part="label" class="label" for=${this.inputId}>${this.label}</label>`
            : ''
        }
        <div part="wrapper" class=${wrapperClasses}>
          <input
            part="input"
            id=${this.inputId}
            class="input ${hasError ? 'input--error' : ''}"
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
          />
          <div part="ink-line" class="ink-line"></div>
        </div>
        ${
          hasError
            ? html`<p part="error" id="${this.inputId}-error" class="error-message" role="alert">
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
