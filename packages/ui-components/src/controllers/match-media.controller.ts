import type { ReactiveControllerHost } from 'lit';
import { BaseController } from './base.controller.js';

/**
 * Controller for reactive media query matching.
 * Automatically updates the host when the media query matches or unmatches.
 *
 * @example
 * ```ts
 * class MyComponent extends LitElement {
 *   private mobile = new MatchMediaController(this, '(max-width: 768px)');
 *   private darkMode = new MatchMediaController(this, '(prefers-color-scheme: dark)');
 *
 *   render() {
 *     return html`
 *       <div class=${this.mobile.matches ? 'mobile' : 'desktop'}>
 *         ${this.darkMode.matches ? 'Dark mode' : 'Light mode'}
 *       </div>
 *     `;
 *   }
 * }
 * ```
 */
export class MatchMediaController extends BaseController {
  private mediaQuery: MediaQueryList;
  private _matches = false;

  constructor(host: ReactiveControllerHost, query: string) {
    super(host);
    this.mediaQuery = window.matchMedia(query);
    this._matches = this.mediaQuery.matches;
  }

  get matches(): boolean {
    return this._matches;
  }

  private handleChange = (e: MediaQueryListEvent): void => {
    this._matches = e.matches;
    this.host.requestUpdate();
  };

  override hostConnected(): void {
    this.mediaQuery.addEventListener('change', this.handleChange);
  }

  override hostDisconnected(): void {
    this.mediaQuery.removeEventListener('change', this.handleChange);
  }
}
