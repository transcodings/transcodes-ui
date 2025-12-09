import { css, LitElement } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { styleMap } from 'lit/directives/style-map.js';
import { html as staticHtml, unsafeStatic } from 'lit/static-html.js';

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

/**
 * A text component with dynamic tag rendering.
 * Supports semantic HTML tags for accessibility.
 *
 * @slot - Text content
 * @csspart text - The text element
 */
@customElement('tc-text')
export class TcText extends LitElement {
  @property({ type: String }) tag: TextTag = 'p';
  @property({ type: Object }) sx: Record<string, string | number> = {};

  private defaultStyles: Record<string, string> = {
    margin: '0',
    padding: '0',
    lineHeight: '1.4',
  };

  static override styles = css`
    :host {
      display: contents;
    }
  `;

  override render() {
    const tag = unsafeStatic(this.tag);
    const mergedStyles = {
      ...this.defaultStyles,
      ...this.sx,
    };

    return staticHtml`
      <${tag} part="text" style=${styleMap(mergedStyles)}>
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
