import { css, LitElement } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { styleMap } from 'lit/directives/style-map.js';
import { html as staticHtml, unsafeStatic } from 'lit/static-html.js';
import { sharedStyles } from '../styles/shared.js';
import type { SxProps } from '../types.js';

type TextTag =
  | 'p'
  | 'span'
  | 'div'
  | 'h1'
  | 'h2'
  | 'h3'
  | 'h4'
  | 'h5'
  | 'h6'
  | 'label';

type TextSize = 'sm' | 'base' | 'lg' | 'xl' | '2xl';
type TextWeight = '400' | '500' | '600' | '700';
type TextColor =
  | 'primary'
  | 'secondary'
  | 'tertiary'
  | 'muted'
  | 'accent'
  | 'success'
  | 'error'
  | 'warning'
  | 'info';

/**
 * A text component with dynamic tag rendering.
 * Supports semantic HTML tags for accessibility.
 * Uses design-tokens for consistent theming across light/dark modes.
 *
 * @slot - Text content
 * @csspart text - The text element
 */
@customElement('tc-text')
export class TcText extends LitElement {
  @property({ type: String }) tag: TextTag = 'p';
  @property({ type: String }) size?: TextSize;
  @property({ type: String }) weight?: TextWeight;
  @property({ type: String }) color?: TextColor | string;
  @property({ type: Object }) sx: SxProps = {};

  static override styles = [
    sharedStyles,
    css`
      :host {
        display: contents;
      }

      .text {
        margin: 0;
        padding: 0;
        font-family: var(--font-body);
        line-height: 1.4;
        color: var(--ink-black);
      }

      /* Size variants using design-tokens */
      .text--sm {
        font-size: var(--font-size-sm);
      }
      .text--base {
        font-size: var(--font-size-base);
      }
      .text--lg {
        font-size: var(--font-size-lg);
      }
      .text--xl {
        font-size: var(--font-size-xl);
      }
      .text--2xl {
        font-size: var(--font-size-2xl);
      }

      /* Weight variants */
      .text--w400 {
        font-weight: 400;
      }
      .text--w500 {
        font-weight: 500;
      }
      .text--w600 {
        font-weight: 600;
      }
      .text--w700 {
        font-weight: 700;
      }

      /* Color variants using design-tokens - these will respond to theme changes */
      .text--primary {
        color: var(--ink-black);
      }
      .text--secondary {
        color: var(--ink-dark);
      }
      .text--tertiary {
        color: var(--ink-medium);
      }
      .text--muted {
        color: var(--ink-light);
      }
      .text--accent {
        color: var(--accent-primary);
      }
      .text--success {
        color: var(--accent-success);
      }
      .text--error {
        color: var(--error-base);
      }
      .text--warning {
        color: var(--semantic-warning);
      }
      .text--info {
        color: var(--semantic-info);
      }
    `,
  ];

  private getColorClass(): string {
    if (!this.color) return '';

    // Semantic color names map to CSS classes
    const semanticColors: Record<string, string> = {
      primary: 'text--primary',
      secondary: 'text--secondary',
      tertiary: 'text--tertiary',
      muted: 'text--muted',
      accent: 'text--accent',
      success: 'text--success',
      error: 'text--error',
      warning: 'text--warning',
      info: 'text--info',
    };

    return semanticColors[this.color] || '';
  }

  private getColorStyle(): string | undefined {
    if (!this.color) return undefined;

    // If it's a CSS variable or raw color value, use inline style
    if (
      this.color.startsWith('var(') ||
      this.color.startsWith('#') ||
      this.color.startsWith('rgb')
    ) {
      return this.color;
    }

    // Semantic colors are handled by CSS classes
    return undefined;
  }

  override render() {
    const tag = unsafeStatic(this.tag);

    const classes = [
      'text',
      this.size ? `text--${this.size}` : '',
      this.weight ? `text--w${this.weight}` : '',
      this.getColorClass(),
    ]
      .filter(Boolean)
      .join(' ');

    const colorStyle = this.getColorStyle();
    const mergedStyles = {
      ...(colorStyle ? { color: colorStyle } : {}),
      ...this.sx,
    };

    return staticHtml`
      <${tag} part="text" class=${classes} style=${styleMap(mergedStyles)}>
        <slot></slot>
      </${tag}>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'tc-text': TcText;
  }
}
