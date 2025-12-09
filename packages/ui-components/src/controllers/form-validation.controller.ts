import { BaseController } from './base.controller.js';

export type ValidationType =
  | 'required'
  | 'email'
  | 'minLength'
  | 'maxLength'
  | 'pattern'
  | 'custom';

export interface ValidationRule {
  type: ValidationType;
  value?: string | number | RegExp;
  message: string;
  validator?: (value: string) => boolean;
}

/**
 * Controller for form field validation.
 * Manages validation rules and error states.
 *
 * @example
 * ```ts
 * class MyForm extends LitElement {
 *   private validation = new FormValidationController(this);
 *
 *   private emailRules: ValidationRule[] = [
 *     { type: 'required', message: 'Email is required' },
 *     { type: 'email', message: 'Please enter a valid email' },
 *   ];
 *
 *   handleBlur(e: Event) {
 *     const input = e.target as HTMLInputElement;
 *     this.validation.validate('email', input.value, this.emailRules);
 *   }
 *
 *   render() {
 *     const error = this.validation.getError('email');
 *     return html`
 *       <input @blur=${this.handleBlur} />
 *       ${error ? html`<span class="error">${error}</span>` : ''}
 *     `;
 *   }
 * }
 * ```
 */
export class FormValidationController extends BaseController {
  private errors = new Map<string, string>();

  get isValid(): boolean {
    return this.errors.size === 0;
  }

  getError(field: string): string | undefined {
    return this.errors.get(field);
  }

  getAllErrors(): Map<string, string> {
    return new Map(this.errors);
  }

  validate(field: string, value: string, rules: ValidationRule[]): boolean {
    this.clearError(field);

    for (const rule of rules) {
      if (!this.runRule(value, rule)) {
        this.errors.set(field, rule.message);
        this.host.requestUpdate();
        return false;
      }
    }

    return true;
  }

  clearError(field: string): void {
    if (this.errors.has(field)) {
      this.errors.delete(field);
      this.host.requestUpdate();
    }
  }

  reset(): void {
    this.errors.clear();
    this.host.requestUpdate();
  }

  private runRule(value: string, rule: ValidationRule): boolean {
    switch (rule.type) {
      case 'required':
        return value.trim().length > 0;

      case 'email':
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);

      case 'minLength':
        return value.length >= (rule.value as number);

      case 'maxLength':
        return value.length <= (rule.value as number);

      case 'pattern':
        return (rule.value as RegExp).test(value);

      case 'custom':
        return rule.validator ? rule.validator(value) : true;

      default:
        return true;
    }
  }
}
