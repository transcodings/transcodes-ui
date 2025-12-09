import type { ReactiveController, ReactiveControllerHost } from 'lit';

/**
 * Base controller class that all reactive controllers extend from.
 * Provides common functionality for registering with a host element.
 */
export abstract class BaseController implements ReactiveController {
  protected host: ReactiveControllerHost;

  constructor(host: ReactiveControllerHost) {
    this.host = host;
    this.host.addController(this);
  }

  hostConnected?(): void;
  hostDisconnected?(): void;
  hostUpdate?(): void;
  hostUpdated?(): void;
}
