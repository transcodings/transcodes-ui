import { css, html, LitElement } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { styleMap } from 'lit/directives/style-map.js';
import { sharedStyles } from '../styles/shared.js';
import type { SxProps } from '../types.js';

/**
 * OTP (One-Time Password) input component with individual cells and progress indicator.
 * Uses shake animation from design-tokens.
 *
 * @fires tc-complete - Fired when all cells are filled
 * @fires tc-change - Fired when the OTP value changes
 * @csspart cells - The cells container
 * @csspart cell - Individual cell input
 * @csspart progress - The progress bar container
 * @csspart progress-bar - The progress bar fill
 */
@customElement('tc-otp-input')
export class TcOtpInput extends LitElement {
  @property({ type: Number }) length = 6;
  @property({ type: Boolean }) error = false;
  @property({ type: Boolean }) disabled = false;
  @property({ type: Boolean, attribute: 'show-progress' }) showProgress = true;
  @property({ type: Object }) sx: SxProps = {};

  @state() private values: string[] = [];

  static override styles = [
    sharedStyles,
    css`
      :host {
        display: block;
        width: 100%;
        min-width: 0;
      }

      .container {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: var(--space-md);
      }

      .cells {
        display: flex;
        gap: var(--space-sm);
        justify-content: center;
      }

      .cell {
        width: clamp(2.625rem, 2.35rem + 1.36vw, 3rem);
        height: clamp(3.125rem, 2.78rem + 1.74vw, 3.5rem);
        border: var(--size-border-width-thick) solid transparent;
        border-radius: var(--radius-md);
        background: var(--paper-cream);
        font-family: var(--font-body);
        font-size: clamp(1.25rem, 1.14rem + 0.54vw, 1.5rem);
        font-weight: 600;
        text-align: center;
        color: var(--ink-black);
        transition: all var(--duration-instant) ease;
        caret-color: var(--accent-primary);
      }

      .cell:focus {
        outline: none;
        background: var(--paper-white);
        border-color: var(--accent-primary);
        box-shadow: var(--shadow-otp-cell-focus);
      }

      .cell--filled {
        background: var(--paper-white);
        border-color: var(--ink-faint);
      }

      .cell--error {
        border-color: var(--error-base) !important;
        animation: shake var(--duration-smooth) ease;
      }

      .cell:disabled {
        opacity: var(--opacity-disabled);
        cursor: not-allowed;
      }

      /* Progress bar */
      .progress {
        width: 100%;
        max-width: var(--size-progress-bar-width);
        height: var(--size-border-width-heavy);
        background: var(--paper-warm);
        border-radius: var(--radius-full);
        overflow: hidden;
      }

      .progress-bar {
        height: 100%;
        background: linear-gradient(
          90deg,
          var(--accent-primary) 0%,
          var(--accent-primary-hover) 100%
        );
        transition: width var(--duration-instant) ease;
      }

      /* Reduced motion */
      @media (prefers-reduced-motion: reduce) {
        .cell,
        .progress-bar {
          transition-duration: 0.01ms !important;
        }

        .cell--error {
          animation: none;
        }
      }
    `,
  ];

  override connectedCallback() {
    super.connectedCallback();
    this.values = new Array(this.length).fill('');
  }

  override render() {
    const filledCount = this.values.filter((v) => v.length > 0).length;
    const progress = (filledCount / this.length) * 100;

    return html`
      <div class="container" style=${styleMap(this.sx)}>
        <div part="cells" class="cells" role="group" aria-label="OTP input">
          ${this.values.map((value, index) => {
            const isFilled = value.length > 0;
            const classes = [
              'cell',
              isFilled ? 'cell--filled' : '',
              this.error ? 'cell--error' : '',
            ]
              .filter(Boolean)
              .join(' ');

            return html`
              <input
                part="cell"
                class=${classes}
                type="text"
                inputmode="numeric"
                maxlength="1"
                pattern="[0-9]"
                .value=${value}
                ?disabled=${this.disabled}
                aria-label="Digit ${index + 1}"
                @input=${(e: Event) => this.handleInput(e, index)}
                @keydown=${(e: KeyboardEvent) => this.handleKeydown(e, index)}
                @paste=${(e: ClipboardEvent) => this.handlePaste(e)}
              />
            `;
          })}
        </div>
        ${
          this.showProgress
            ? html`
              <div part="progress" class="progress">
                <div
                  part="progress-bar"
                  class="progress-bar"
                  style="width: ${progress}%"
                ></div>
              </div>
            `
            : ''
        }
      </div>
    `;
  }

  private handleInput(e: Event, index: number) {
    const input = e.target as HTMLInputElement;
    const value = input.value.replace(/\D/g, '').slice(0, 1);

    this.values = [...this.values];
    this.values[index] = value;

    this.dispatchEvent(
      new CustomEvent('tc-change', {
        bubbles: true,
        composed: true,
        detail: { value: this.values.join(''), values: [...this.values] },
      }),
    );

    // Move to next cell if value entered
    if (value && index < this.length - 1) {
      this.focusCell(index + 1);
    }

    // Check if complete
    if (this.values.every((v) => v.length > 0)) {
      this.dispatchEvent(
        new CustomEvent('tc-complete', {
          bubbles: true,
          composed: true,
          detail: { value: this.values.join('') },
        }),
      );
    }
  }

  private handleKeydown(e: KeyboardEvent, index: number) {
    if (e.key === 'Backspace' && !this.values[index] && index > 0) {
      e.preventDefault();
      this.values = [...this.values];
      this.values[index - 1] = '';
      this.focusCell(index - 1);
    } else if (e.key === 'ArrowLeft' && index > 0) {
      e.preventDefault();
      this.focusCell(index - 1);
    } else if (e.key === 'ArrowRight' && index < this.length - 1) {
      e.preventDefault();
      this.focusCell(index + 1);
    }
  }

  private handlePaste(e: ClipboardEvent) {
    e.preventDefault();
    const pastedData = e.clipboardData?.getData('text') || '';
    const digits = pastedData.replace(/\D/g, '').slice(0, this.length);

    if (digits) {
      this.values = new Array(this.length).fill('');
      digits.split('').forEach((digit, i) => {
        this.values[i] = digit;
      });
      this.values = [...this.values];

      // Focus appropriate cell
      const nextIndex = Math.min(digits.length, this.length - 1);
      this.focusCell(nextIndex);

      this.dispatchEvent(
        new CustomEvent('tc-change', {
          bubbles: true,
          composed: true,
          detail: { value: this.values.join(''), values: [...this.values] },
        }),
      );

      if (digits.length >= this.length) {
        this.dispatchEvent(
          new CustomEvent('tc-complete', {
            bubbles: true,
            composed: true,
            detail: { value: this.values.join('') },
          }),
        );
      }
    }
  }

  private focusCell(index: number) {
    requestAnimationFrame(() => {
      const cells = this.shadowRoot?.querySelectorAll(
        '.cell',
      ) as NodeListOf<HTMLInputElement>;
      cells?.[index]?.focus();
    });
  }

  /** Focus the first empty cell or the last cell */
  focus() {
    const emptyIndex = this.values.findIndex((v) => !v);
    const targetIndex = emptyIndex >= 0 ? emptyIndex : this.length - 1;
    this.focusCell(targetIndex);
  }

  /** Clear all values */
  clear() {
    this.values = new Array(this.length).fill('');
    this.focusCell(0);
  }

  /** Get the current OTP value */
  getValue(): string {
    return this.values.join('');
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'tc-otp-input': TcOtpInput;
  }
}
