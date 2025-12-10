import type { Meta, StoryObj } from '@storybook/web-components-vite';
import { css, html, LitElement } from 'lit';
import { customElement } from 'lit/decorators.js';
import {
  FormValidationController,
  type ValidationRule,
} from '../../controllers/form-validation.controller.js';
import '../../primitives/tc-button.js';
import '../../primitives/tc-input.js';
import '../../primitives/tc-text.js';
import '../../primitives/tc-section.js';

@customElement('demo-form-validation')
export class DemoFormValidation extends LitElement {
  private validation = new FormValidationController(this);

  private _email = '';
  private _password = '';

  private emailRules: ValidationRule[] = [
    { type: 'required', message: 'Email is required' },
    { type: 'email', message: 'Please enter a valid email' },
  ];

  private passwordRules: ValidationRule[] = [
    { type: 'required', message: 'Password is required' },
    {
      type: 'minLength',
      value: 8,
      message: 'Password must be at least 8 characters',
    },
  ];

  static override styles = css`
    :host {
      display: block;
    }
    .status {
      margin-top: var(--space-md);
      padding: var(--space-sm);
      background: var(--paper-cream);
      border-radius: var(--radius-sm);
      font-family: monospace;
    }
  `;

  private handleEmailInput(e: CustomEvent) {
    this._email = e.detail.value;
    this.requestUpdate();
  }

  private handlePasswordInput(e: CustomEvent) {
    this._password = e.detail.value;
    this.requestUpdate();
  }

  private handleEmailBlur() {
    this.validation.validate('email', this._email, this.emailRules);
  }

  private handlePasswordBlur() {
    this.validation.validate('password', this._password, this.passwordRules);
  }

  private handleSubmit() {
    const emailValid = this.validation.validate(
      'email',
      this._email,
      this.emailRules,
    );
    const passwordValid = this.validation.validate(
      'password',
      this._password,
      this.passwordRules,
    );

    if (emailValid && passwordValid) {
      console.log('Form submitted!');
      this.validation.reset();
      this._email = '';
      this._password = '';
      this.requestUpdate();
    }
  }

  override render() {
    return html`
      <tc-section gap="var(--space-md)">
        <tc-input
          label="Email"
          type="email"
          placeholder="you@example.com"
          .value=${this._email}
          error=${this.validation.getError('email') || ''}
          @tc-input=${this.handleEmailInput}
          @tc-blur=${this.handleEmailBlur}
        ></tc-input>
        <tc-input
          label="Password"
          type="password"
          placeholder="Enter password"
          .value=${this._password}
          error=${this.validation.getError('password') || ''}
          @tc-input=${this.handlePasswordInput}
          @tc-blur=${this.handlePasswordBlur}
        ></tc-input>
        <tc-button variant="primary" @tc-click=${this.handleSubmit}>Submit</tc-button>
        <div class="status">
          <tc-text size="sm">isValid: ${this.validation.isValid}</tc-text>
        </div>
      </tc-section>
    `;
  }
}

const meta: Meta = {
  title: 'Controllers/FormValidationController',
  parameters: {
    docs: {
      description: {
        component: `
A controller for form field validation with built-in rules and error tracking.

## Usage

\`\`\`ts
class LoginForm extends LitElement {
  private validation = new FormValidationController(this);
  private email = '';

  private emailRules: ValidationRule[] = [
    { type: 'required', message: 'Email is required' },
    { type: 'email', message: 'Please enter a valid email' },
  ];

  handleBlur() {
    this.validation.validate('email', this.email, this.emailRules);
  }

  render() {
    return html\`
      <tc-input
        error=\${this.validation.getError('email') || ''}
        @tc-blur=\${this.handleBlur}
      ></tc-input>
    \`;
  }
}
\`\`\`

## Validation Rules

- \`required\`: Value must not be empty
- \`email\`: Must be valid email format
- \`minLength\`: Minimum character length
- \`maxLength\`: Maximum character length
- \`pattern\`: Custom regex pattern
- \`custom\`: Custom validation function

## API

- \`validate(field, value, rules)\`: Validates a field, returns boolean
- \`getError(field)\`: Get error message for a field
- \`isValid\`: True if no validation errors
- \`reset()\`: Clear all errors
        `,
      },
    },
  },
};

export default meta;

export const Default: StoryObj = {
  render: () => html`
    <div style="padding: 2rem; background: var(--paper-warm); border-radius: var(--radius-lg); max-width: 400px;">
      <demo-form-validation></demo-form-validation>
    </div>
  `,
};
