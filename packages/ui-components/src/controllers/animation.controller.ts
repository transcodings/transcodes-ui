import type { ReactiveControllerHost } from 'lit';
import { BaseController } from './base.controller.js';

export type AnimationState = 'hidden' | 'showing' | 'visible' | 'hiding';

/**
 * Controller for managing show/hide animation states.
 * Provides a state machine for coordinating CSS transitions.
 *
 * @example
 * ```ts
 * class MyModal extends LitElement {
 *   private animation = new AnimationController(this);
 *
 *   async open() {
 *     await this.animation.show();
 *   }
 *
 *   async close() {
 *     await this.animation.hide();
 *   }
 *
 *   render() {
 *     return html`
 *       <div class="modal modal--${this.animation.state}">
 *         <slot></slot>
 *       </div>
 *     `;
 *   }
 * }
 * ```
 */
export interface AnimationControllerOptions {
  showDuration?: number;
  hideDuration?: number;
}

export class AnimationController extends BaseController {
  private _state: AnimationState = 'hidden';
  private showDuration: number;
  private hideDuration: number;

  constructor(
    host: ReactiveControllerHost,
    options: AnimationControllerOptions | number = 300,
  ) {
    super(host);
    if (typeof options === 'number') {
      this.showDuration = options;
      this.hideDuration = options;
    } else {
      this.showDuration = options.showDuration ?? 300;
      this.hideDuration = options.hideDuration ?? 300;
    }
  }

  get state(): AnimationState {
    return this._state;
  }

  get isVisible(): boolean {
    return this._state === 'visible' || this._state === 'showing';
  }

  get isHidden(): boolean {
    return this._state === 'hidden';
  }

  async show(): Promise<void> {
    if (this._state === 'visible' || this._state === 'showing') {
      return;
    }

    this._state = 'showing';
    this.host.requestUpdate();

    await this.waitForTransition(this.showDuration);

    this._state = 'visible';
    this.host.requestUpdate();
  }

  async hide(): Promise<void> {
    if (this._state === 'hidden' || this._state === 'hiding') {
      return;
    }

    this._state = 'hiding';
    this.host.requestUpdate();

    await this.waitForTransition(this.hideDuration);

    this._state = 'hidden';
    this.host.requestUpdate();
  }

  toggle(): Promise<void> {
    return this.isVisible ? this.hide() : this.show();
  }

  private waitForTransition(duration: number): Promise<void> {
    return new Promise((resolve) => {
      setTimeout(resolve, duration);
    });
  }
}
