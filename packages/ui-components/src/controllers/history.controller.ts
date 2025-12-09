import { BaseController } from './base.controller.js';

/**
 * Controller for managing browser history for modals and overlays.
 * Adds a history entry when opened and handles back button navigation.
 *
 * @example
 * ```ts
 * class MyModal extends LitElement {
 *   private history = new HistoryController(this);
 *
 *   open() {
 *     this.history.push({ modal: 'my-modal' });
 *     this.history.onPopState(() => this.close());
 *     // show modal
 *   }
 *
 *   close() {
 *     this.history.pop();
 *     // hide modal
 *   }
 * }
 * ```
 */
export class HistoryController extends BaseController {
  private hasAddedEntry = false;
  private onPopCallback?: () => void;

  push(state: object = { modal: true }): void {
    if (!this.hasAddedEntry) {
      history.pushState(state, '');
      this.hasAddedEntry = true;
    }
  }

  pop(): void {
    if (this.hasAddedEntry) {
      this.hasAddedEntry = false;
    }
  }

  onPopState(callback: () => void): void {
    this.onPopCallback = callback;
  }

  private handlePopState = (): void => {
    if (this.hasAddedEntry) {
      this.hasAddedEntry = false;
      this.onPopCallback?.();
    }
  };

  override hostConnected(): void {
    window.addEventListener('popstate', this.handlePopState);
  }

  override hostDisconnected(): void {
    window.removeEventListener('popstate', this.handlePopState);
    this.onPopCallback = undefined;
  }
}
