import StyleDictionary from 'style-dictionary';
import { fileHeader } from 'style-dictionary/utils';

/**
 * Custom format for component CSS classes
 * Generates CSS classes for components using token references (var())
 */
StyleDictionary.registerFormat({
  name: 'css/components',
  format: async ({ dictionary, file }) => {
    const header = await fileHeader({ file });

    // Group tokens by component
    const components: Record<string, Record<string, string>> = {};

    for (const token of dictionary.allTokens) {
      const [component, ...rest] = token.path;
      if (!components[component]) {
        components[component] = {};
      }
      const prop = rest.join('-');
      components[component][prop] = token.name;
    }

    // Generate CSS classes
    const classes: string[] = [];

    // =====================
    // Keyframe Animations
    // =====================
    classes.push(`/* Animations */
@keyframes fadeInUp {
  0% {
    opacity: 0;
    transform: translateY(1rem);
  }
  100% {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes slideDown {
  0% {
    opacity: 0;
    transform: translateY(-0.5rem);
  }
  100% {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes slideUp {
  0% {
    opacity: 0;
    transform: translateY(0.5rem);
  }
  100% {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}

@keyframes shake {
  0%, 100% {
    transform: translateX(0);
  }
  25% {
    transform: translateX(-0.25rem);
  }
  75% {
    transform: translateX(0.25rem);
  }
}

@keyframes inkFloat {
  0%, 100% {
    transform: translate(0, 0) scale(1);
    opacity: 0.5;
  }
  50% {
    transform: translate(0.625rem, -0.625rem) scale(1.1);
    opacity: 0.7;
  }
}

@keyframes inkDrift {
  0%, 100% {
    transform: translate(0, 0) rotate(0deg);
    opacity: 0.4;
  }
  33% {
    transform: translate(-0.5rem, 0.5rem) rotate(-5deg);
    opacity: 0.6;
  }
  66% {
    transform: translate(0.375rem, -0.375rem) rotate(3deg);
    opacity: 0.5;
  }
}

@keyframes inkSpread {
  0% {
    transform: scale(0);
    opacity: 0.4;
  }
  100% {
    transform: scale(var(--ink-effect-spread-scale, 2.5));
    opacity: 0;
  }
}`);

    // =====================
    // Page Layout Components
    // =====================
    if (components.page) {
      classes.push(`/* Page Layout */
.page-container {
  position: relative;
  width: 100%;
  max-width: var(--${components.page['container-max-width']});
  margin: 0 auto;
  padding: 0 var(--${components.page['container-padding']});
  animation: fadeInUp 600ms var(--transition-smooth) both;
}

.page-container--wide {
  max-width: var(--${components.page['container-max-width-wide']});
}

.page-card {
  background: var(--paper-white);
  padding: var(--${components.page['card-padding']});
  border-radius: var(--${components.page['card-radius']});
  box-shadow: var(--shadow-card);
  position: relative;
  overflow: hidden;
}

.page-card::before {
  content: '';
  position: absolute;
  inset: 0;
  border-radius: inherit;
  padding: var(--space-fixed-2xs);
  background: linear-gradient(135deg, var(--alpha-primary08) 0%, transparent 50%, var(--alpha-primary04) 100%);
  -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
  -webkit-mask-composite: xor;
  mask-composite: exclude;
  pointer-events: none;
}

.page-card--centered {
  text-align: center;
}

/* Page Decoration - Ink effect backgrounds */
.page-decoration {
  position: absolute;
  border-radius: 50%;
  filter: blur(3.75rem);
  pointer-events: none;
  z-index: 0;
}

.page-decoration--primary {
  background: var(--alpha-primary15);
}

.page-decoration--success {
  background: var(--alpha-success15);
}

.page-decoration--float {
  animation: inkFloat 4s ease-in-out infinite;
}

.page-decoration--drift {
  animation: inkDrift 5s ease-in-out infinite;
}`);
    }

    // =====================
    // Button component
    // =====================
    if (components.button) {
      classes.push(`/* Buttons */
.button {
  height: var(--${components.button.height});
  padding: 0 var(--space-lg);
  font-family: var(--font-body);
  font-size: var(--${components.button['font-size']});
  font-weight: var(--${components.button['font-weight']});
  letter-spacing: var(--${components.button['letter-spacing']});
  border: var(--space-fixed-2xs) solid transparent;
  border-radius: var(--${components.button.radius});
  cursor: pointer;
  transition: background var(--transition-fast), transform var(--transition-fast);
}

.button-primary {
  background: var(--accent-primary);
  color: var(--paper-white);
}

.button-primary:hover:not(:disabled) {
  background: var(--accent-primary-hover);
  box-shadow: var(--shadow-button-hover-primary);
  transform: translateY(calc(-1 * var(--space-fixed-2xs)));
}

.button-success {
  background: var(--accent-success);
  color: var(--paper-white);
}

.button-success:hover:not(:disabled) {
  background: var(--accent-success-hover);
  box-shadow: var(--shadow-button-hover-success);
  transform: translateY(calc(-1 * var(--space-fixed-2xs)));
}

.button-secondary {
  height: var(--${components.button['height-secondary']});
  background: transparent;
  color: var(--ink-dark);
  border: var(--space-fixed-2xs) solid var(--ink-faint);
}

.button-secondary:hover:not(:disabled) {
  color: var(--accent-primary);
  border-color: var(--accent-primary);
  background: var(--alpha-primary04);
}

.button:disabled {
  cursor: not-allowed;
  opacity: 0.7;
}

/* Text Button */
.text-button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  height: var(--${components.button['text-height']});
  padding: var(--space-sm) var(--space-md);
  font-family: var(--font-body);
  font-size: var(--${components.button['text-font-size']});
  font-weight: 500;
  color: var(--ink-dark);
  background: transparent;
  border: none;
  border-radius: var(--radius-md);
  cursor: pointer;
  transition: background var(--transition-fast), color var(--transition-fast);
}

.text-button:hover {
  background: var(--paper-cream);
  color: var(--accent-primary);
}

.text-button-sm {
  height: auto;
  padding: var(--space-xs) var(--space-sm);
  font-size: 0.8125rem;
}

.text-button-md {
  height: auto;
  padding: var(--space-sm) var(--space-md);
}

/* Button Content Layout */
.button-content {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: var(--${components.button['content-gap']});
}

.button-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.button-text {
  flex: 1;
  text-align: center;
}

/* Button Spinner */
.button-spinner {
  width: var(--${components.button['spinner-size']});
  height: var(--${components.button['spinner-size']});
  border: var(--${components.button['spinner-border-width']}) solid currentColor;
  border-top-color: transparent;
  border-radius: 50%;
  animation: spin 600ms linear infinite;
}

/* Button Ink Ripple Effect */
.button-ink {
  position: relative;
  overflow: hidden;
}

.button-ink::after {
  content: '';
  position: absolute;
  top: 50%;
  left: 50%;
  width: 21.875rem;
  height: 21.875rem;
  background: radial-gradient(circle, rgba(255, 255, 255, 0.5) 0%, transparent 70%);
  transform: translate(-50%, -50%) scale(0);
  border-radius: 50%;
  pointer-events: none;
  transition: transform var(--ink-effect-ripple-duration, 600ms) var(--ink-effect-ripple-easing, cubic-bezier(0.4, 0, 0.2, 1)),
              opacity var(--ink-effect-fade-duration, 300ms) ease;
  opacity: 0;
}

.button-ink:hover::after {
  transform: translate(-50%, -50%) scale(1);
  opacity: 1;
}

.button-ink:active::after {
  transform: translate(-50%, -50%) scale(0.8);
  opacity: 0.8;
}`);
    }

    // =====================
    // Card component
    // =====================
    if (components.card) {
      classes.push(`/* Card */
.card {
  background: var(--paper-white);
  padding: var(--${components.card.padding});
  border-radius: var(--${components.card.radius});
  box-shadow: var(--shadow-card);
  position: relative;
  overflow: hidden;
}`);
    }

    // =====================
    // Container component
    // =====================
    if (components.container) {
      classes.push(`/* Container */
.container {
  position: relative;
  width: 100%;
  max-width: var(--${components.container['max-width']});
}

.container-wide {
  max-width: var(--${components.container['max-width-wide']});
}`);
    }

    // =====================
    // Form components
    // =====================
    if (components.form) {
      classes.push(`/* Form Layout */
.form-header {
  text-align: center;
  margin-bottom: var(--${components.form['header-margin-bottom']});
}

.form-title {
  font-family: var(--font-body);
  font-size: var(--title-font-size);
  font-weight: var(--title-font-weight);
  color: var(--ink-black);
  letter-spacing: var(--title-letter-spacing);
  animation: slideDown 400ms var(--transition-smooth) 200ms both;
}

.form-subtitle {
  font-size: var(--${components.form['subtitle-font-size']});
  color: var(--ink-medium);
  margin-top: var(--space-sm);
  animation: fadeInUp 400ms var(--transition-smooth) 400ms both;
}

.form-fields {
  display: flex;
  flex-direction: column;
  gap: var(--${components.form['fields-gap']});
}

.form-footer {
  margin-top: var(--${components.form['footer-margin-top']});
  text-align: center;
  animation: fadeInUp 400ms var(--transition-smooth) 600ms both;
}`);
    }

    // Field group
    if (components.field) {
      classes.push(`/* Field Group */
.field-group {
  display: flex;
  flex-direction: column;
  gap: var(--${components.field['group-gap']});
}

.field-label {
  display: block;
  font-size: var(--label-font-size);
  font-weight: var(--label-font-weight);
  text-transform: uppercase;
  letter-spacing: var(--label-letter-spacing);
  color: var(--ink-medium);
  transition: color var(--transition-fast);
}

.field-group.focused .field-label {
  color: var(--accent-primary);
}

.required-mark {
  color: var(--accent-primary);
  margin-left: var(--space-2xs);
}`);
    }

    // Input component
    if (components.input) {
      classes.push(`/* Input */
.input {
  width: 100%;
  padding: var(--${components.input['padding-y']}) var(--${components.input['padding-x']});
  font-family: var(--font-body);
  font-size: var(--${components.input['font-size']});
  color: var(--ink-black);
  background: var(--paper-cream);
  border: var(--space-fixed-2xs) solid transparent;
  border-radius: var(--${components.input.radius});
  transition: background var(--transition-smooth), border-color var(--transition-smooth), box-shadow var(--transition-smooth);
}

.input::placeholder {
  color: var(--ink-faint);
}

.input:hover {
  background: var(--paper-warm);
}

.input:focus {
  outline: none;
  background: var(--paper-white);
  border-color: var(--ink-faint);
  box-shadow: var(--shadow-input-focus);
}`);
    }

    // Label component
    if (components.label) {
      classes.push(`/* Label */
.label {
  display: block;
  font-size: var(--${components.label['font-size']});
  font-weight: var(--${components.label['font-weight']});
  text-transform: uppercase;
  letter-spacing: var(--${components.label['letter-spacing']});
  color: var(--ink-medium);
  margin-bottom: var(--space-sm);
  transition: color var(--transition-fast);
}`);
    }

    // Title component
    if (components.title) {
      classes.push(`/* Title */
.title {
  font-family: var(--font-body);
  font-size: var(--${components.title['font-size']});
  font-weight: var(--${components.title['font-weight']});
  color: var(--ink-black);
  letter-spacing: var(--${components.title['letter-spacing']});
}`);
    }

    // =====================
    // Feedback components
    // =====================
    if (components.feedback) {
      classes.push(`/* Feedback */
.error-message {
  display: flex;
  align-items: flex-start;
  gap: var(--${components.feedback['error-gap']});
  padding: var(--${components.feedback['error-padding']});
  background: var(--error-bg);
  border: var(--space-fixed-2xs) solid var(--error-border);
  border-radius: var(--${components.feedback['error-radius']});
  color: var(--error-base);
  animation: slideDown 300ms var(--transition-smooth) both;
}

.error-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  width: var(--${components.feedback['error-icon-size']});
  height: var(--${components.feedback['error-icon-size']});
  color: var(--error-base);
}

.error-message.shake {
  animation: shake 400ms var(--transition-smooth);
}

/* Notice */
.notice {
  display: flex;
  align-items: flex-start;
  gap: var(--${components.feedback['notice-gap']});
  padding: var(--${components.feedback['notice-padding']});
  border-radius: var(--${components.feedback['notice-radius']});
  animation: slideUp 400ms var(--transition-smooth) both;
}

.notice-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  width: var(--${components.feedback['notice-icon-size']});
  height: var(--${components.feedback['notice-icon-size']});
}

.notice-success {
  background: rgba(53, 122, 70, 0.08);
  border: var(--space-fixed-2xs) solid rgba(53, 122, 70, 0.2);
  color: var(--accent-success);
}

.notice-warning {
  background: rgba(180, 83, 9, 0.08);
  border: var(--space-fixed-2xs) solid rgba(180, 83, 9, 0.2);
  color: var(--semantic-warning);
}

.notice-info {
  background: rgba(3, 105, 161, 0.08);
  border: var(--space-fixed-2xs) solid rgba(3, 105, 161, 0.2);
  color: var(--semantic-info);
}`);
    }

    return header + classes.join('\n\n') + '\n';
  },
});
