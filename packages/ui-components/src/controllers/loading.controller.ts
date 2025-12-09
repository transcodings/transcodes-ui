import { BaseController } from './base.controller.js';

/**
 * Controller for managing loading states and progress.
 *
 * @example
 * ```ts
 * class MyComponent extends LitElement {
 *   private loading = new LoadingController(this);
 *
 *   async handleSubmit() {
 *     this.loading.start();
 *     await doSomething();
 *     this.loading.complete();
 *   }
 *
 *   render() {
 *     return html`
 *       <button ?disabled=${this.loading.isLoading}>
 *         ${this.loading.isLoading ? 'Loading...' : 'Submit'}
 *       </button>
 *     `;
 *   }
 * }
 * ```
 */
export class LoadingController extends BaseController {
  private _isLoading = false;
  private _progress = 0;

  get isLoading(): boolean {
    return this._isLoading;
  }

  get progress(): number {
    return this._progress;
  }

  start(): void {
    this._isLoading = true;
    this._progress = 0;
    this.host.requestUpdate();
  }

  setProgress(value: number): void {
    this._progress = Math.max(0, Math.min(100, value));
    this.host.requestUpdate();
  }

  complete(): void {
    this._progress = 100;
    this._isLoading = false;
    this.host.requestUpdate();
  }

  reset(): void {
    this._isLoading = false;
    this._progress = 0;
    this.host.requestUpdate();
  }
}
