import type { Meta, StoryObj } from '@storybook/web-components-vite';
import { css, html, LitElement } from 'lit';
import { customElement } from 'lit/decorators.js';
import { AnimationController } from '../controllers/animation.controller.js';
import {
  FormValidationController,
  type ValidationRule,
} from '../controllers/form-validation.controller.js';
import { LoadingController } from '../controllers/loading.controller.js';
import { MatchMediaController } from '../controllers/match-media.controller.js';
import '../primitives/tc-button.js';
import '../primitives/tc-input.js';
import '../primitives/tc-text.js';
import '../primitives/tc-section.js';

// Demo component for LoadingController
@customElement('demo-loading-controller')
export class DemoLoadingController extends LitElement {
  private loading = new LoadingController(this);

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

  private handleToggle() {
    if (this.loading.isLoading) {
      this.loading.complete();
    } else {
      this.loading.start();
      // Auto-complete after 2 seconds
      setTimeout(() => this.loading.complete(), 2000);
    }
  }

  override render() {
    return html`
      <tc-section gap="var(--space-md)">
        <tc-button
          variant="primary"
          ?loading=${this.loading.isLoading}
          @tc-click=${this.handleToggle}
        >
          ${this.loading.isLoading ? 'Loading...' : 'Start Loading'}
        </tc-button>
        <div class="status">
          <tc-text size="sm">isLoading: ${this.loading.isLoading}</tc-text>
        </div>
      </tc-section>
    `;
  }
}

// Demo component for AnimationController
@customElement('demo-animation-controller')
export class DemoAnimationController extends LitElement {
  private animation = new AnimationController(this, {
    showDuration: 300,
    hideDuration: 200,
  });

  static override styles = css`
    :host {
      display: block;
    }
    .box {
      margin-top: var(--space-md);
      padding: var(--space-lg);
      background: var(--accent-primary);
      color: white;
      border-radius: var(--radius-md);
      text-align: center;
      opacity: 0;
      transform: translateY(20px);
      transition: opacity 300ms ease, transform 300ms ease;
    }
    .box.visible {
      opacity: 1;
      transform: translateY(0);
    }
    .status {
      margin-top: var(--space-md);
      padding: var(--space-sm);
      background: var(--paper-cream);
      border-radius: var(--radius-sm);
      font-family: monospace;
    }
  `;

  private async handleToggle() {
    if (this.animation.state === 'visible') {
      await this.animation.hide();
    } else {
      await this.animation.show();
    }
    this.requestUpdate();
  }

  override render() {
    const isVisible =
      this.animation.state === 'visible' || this.animation.state === 'showing';

    return html`
      <tc-section gap="var(--space-md)">
        <tc-button variant="primary" @tc-click=${this.handleToggle}>
          ${isVisible ? 'Hide' : 'Show'}
        </tc-button>
        <div class="box ${isVisible ? 'visible' : ''}">
          <tc-text weight="500">Animated Content</tc-text>
        </div>
        <div class="status">
          <tc-text size="sm">state: ${this.animation.state}</tc-text>
        </div>
      </tc-section>
    `;
  }
}

// Demo component for FormValidationController
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

// Demo component for MatchMediaController
@customElement('demo-match-media')
export class DemoMatchMedia extends LitElement {
  private desktop = new MatchMediaController(this, '(min-width: 1024px)');
  private tablet = new MatchMediaController(this, '(min-width: 768px)');
  private prefersDark = new MatchMediaController(
    this,
    '(prefers-color-scheme: dark)',
  );

  static override styles = css`
    :host {
      display: block;
    }
    .grid {
      display: grid;
      gap: var(--space-sm);
    }
    .item {
      padding: var(--space-sm) var(--space-md);
      background: var(--paper-cream);
      border-radius: var(--radius-sm);
      display: flex;
      justify-content: space-between;
      font-family: monospace;
    }
    .match {
      color: var(--accent-success);
    }
    .no-match {
      color: var(--ink-light);
    }
  `;

  override render() {
    return html`
      <div class="grid">
        <div class="item">
          <span>Desktop (≥1024px)</span>
          <span class=${this.desktop.matches ? 'match' : 'no-match'}>
            ${this.desktop.matches ? '✓ matches' : '✗ no match'}
          </span>
        </div>
        <div class="item">
          <span>Tablet (≥768px)</span>
          <span class=${this.tablet.matches ? 'match' : 'no-match'}>
            ${this.tablet.matches ? '✓ matches' : '✗ no match'}
          </span>
        </div>
        <div class="item">
          <span>Prefers Dark</span>
          <span class=${this.prefersDark.matches ? 'match' : 'no-match'}>
            ${this.prefersDark.matches ? '✓ matches' : '✗ no match'}
          </span>
        </div>
      </div>
    `;
  }
}

// Storybook meta
const meta: Meta = {
  title: 'Controllers',
};

export default meta;

export const LoadingControllerDemo: StoryObj = {
  name: 'LoadingController',
  render: () => html`
    <div style="padding: 2rem; background: var(--paper-cream); border-radius: var(--radius-lg);">
      <demo-loading-controller></demo-loading-controller>
    </div>
  `,
};

export const AnimationControllerDemo: StoryObj = {
  name: 'AnimationController',
  render: () => html`
    <div style="padding: 2rem; background: var(--paper-cream); border-radius: var(--radius-lg);">
      <demo-animation-controller></demo-animation-controller>
    </div>
  `,
};

export const FormValidationControllerDemo: StoryObj = {
  name: 'FormValidationController',
  render: () => html`
    <div style="padding: 2rem; background: var(--paper-warm); border-radius: var(--radius-lg); max-width: 400px;">
      <demo-form-validation></demo-form-validation>
    </div>
  `,
};

export const MatchMediaControllerDemo: StoryObj = {
  name: 'MatchMediaController',
  render: () => html`
    <div style="padding: 2rem; background: var(--paper-warm); border-radius: var(--radius-lg);">
      <demo-match-media></demo-match-media>
    </div>
  `,
};
