import type { ReactiveControllerHost } from 'lit';
import { BaseController } from './base.controller.js';

/**
 * Controller for syncing component state with localStorage/sessionStorage.
 * Automatically updates when storage changes in other tabs.
 *
 * @example
 * ```ts
 * class MyBanner extends LitElement {
 *   private dismissed = new StorageController<boolean>(this, 'banner-dismissed');
 *
 *   handleDismiss() {
 *     this.dismissed.set(true);
 *   }
 *
 *   render() {
 *     if (this.dismissed.value) return null;
 *     return html`
 *       <div class="banner">
 *         <button @click=${this.handleDismiss}>Dismiss</button>
 *       </div>
 *     `;
 *   }
 * }
 * ```
 */
export class StorageController<T = unknown> extends BaseController {
  private key: string;
  private storage: Storage;
  private _value: T | null = null;

  constructor(
    host: ReactiveControllerHost,
    key: string,
    storage: Storage = localStorage,
  ) {
    super(host);
    this.key = key;
    this.storage = storage;
    this.load();
  }

  get value(): T | null {
    return this._value;
  }

  set(value: T): void {
    this._value = value;
    try {
      this.storage.setItem(this.key, JSON.stringify(value));
    } catch {
      // Handle quota exceeded or other storage errors
      console.warn(`Failed to save to storage: ${this.key}`);
    }
    this.host.requestUpdate();
  }

  remove(): void {
    this._value = null;
    this.storage.removeItem(this.key);
    this.host.requestUpdate();
  }

  private load(): void {
    try {
      const stored = this.storage.getItem(this.key);
      if (stored !== null) {
        this._value = JSON.parse(stored) as T;
      }
    } catch {
      this._value = null;
    }
  }

  private handleStorageChange = (e: StorageEvent): void => {
    if (e.key === this.key && e.storageArea === this.storage) {
      this.load();
      this.host.requestUpdate();
    }
  };

  override hostConnected(): void {
    window.addEventListener('storage', this.handleStorageChange);
  }

  override hostDisconnected(): void {
    window.removeEventListener('storage', this.handleStorageChange);
  }
}
