/**
 * Shared styles from design-tokens for use with Lit components
 * Import these styles and add them to your component's static styles array
 */
import { unsafeCSS, type CSSResult } from 'lit';
import { componentStyles } from '@transcodes/design-tokens/components';

/**
 * Design-tokens component styles as Lit CSSResult
 * Use this in your component's static styles:
 *
 * @example
 * ```ts
 * import { sharedStyles } from '../styles/shared.js';
 *
 * @customElement('my-component')
 * export class MyComponent extends LitElement {
 *   static override styles = [sharedStyles, css`
 *     // component-specific styles
 *   `];
 * }
 * ```
 */
export const sharedStyles: CSSResult = unsafeCSS(componentStyles);

export default sharedStyles;
