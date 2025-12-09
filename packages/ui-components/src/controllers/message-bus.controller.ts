import type { ReactiveControllerHost } from 'lit';
import { BaseController } from './base.controller.js';

export type MessageHandler = (payload: unknown) => void;
export type WildcardMessageHandler = (type: string, payload: unknown) => void;

/**
 * Controller for postMessage communication with iframes or other windows.
 *
 * @example
 * ```ts
 * class MyIframeHost extends LitElement {
 *   private messageBus = new MessageBusController(this);
 *
 *   connectedCallback() {
 *     super.connectedCallback();
 *     this.messageBus.onMessage('READY', (payload) => {
 *       console.log('Iframe is ready', payload);
 *     });
 *   }
 *
 *   sendToIframe() {
 *     this.messageBus.send('COMMAND', { action: 'do-something' });
 *   }
 * }
 * ```
 */
export class MessageBusController extends BaseController {
  private handlers = new Map<string, Set<MessageHandler>>();
  private wildcardHandlers = new Set<WildcardMessageHandler>();
  private targetOrigin: string;

  /**
   * @param host - The reactive controller host
   * @param targetOrigin - The origin to accept messages from and send messages to.
   *   SECURITY NOTE: Using '*' accepts messages from any origin which can be dangerous.
   *   Always specify an explicit origin in production environments.
   */
  constructor(host: ReactiveControllerHost, targetOrigin = '*') {
    super(host);
    this.targetOrigin = targetOrigin;

    if (
      targetOrigin === '*' &&
      typeof window !== 'undefined' &&
      window.location.protocol !== 'file:'
    ) {
      console.warn(
        '[MessageBusController] Using targetOrigin="*" accepts messages from any origin. ' +
          'For security, specify an explicit origin in production.',
      );
    }
  }

  send(type: string, payload: unknown, targetWindow: Window = window): void {
    targetWindow.postMessage({ type, payload }, this.targetOrigin);
  }

  sendToFrame(iframe: HTMLIFrameElement, type: string, payload: unknown): void {
    iframe.contentWindow?.postMessage({ type, payload }, this.targetOrigin);
  }

  onMessage(type: string, handler: MessageHandler): () => void;
  onMessage(type: '*', handler: WildcardMessageHandler): () => void;
  onMessage(
    type: string,
    handler: MessageHandler | WildcardMessageHandler,
  ): () => void {
    if (type === '*') {
      this.wildcardHandlers.add(handler as WildcardMessageHandler);
      return () => {
        this.wildcardHandlers.delete(handler as WildcardMessageHandler);
      };
    }

    if (!this.handlers.has(type)) {
      this.handlers.set(type, new Set());
    }
    this.handlers.get(type)?.add(handler as MessageHandler);

    return () => {
      this.handlers.get(type)?.delete(handler as MessageHandler);
    };
  }

  private handleMessage = (event: MessageEvent): void => {
    // Origin validation when a specific origin is set
    if (this.targetOrigin !== '*' && event.origin !== this.targetOrigin) {
      return;
    }

    if (
      event.data &&
      typeof event.data === 'object' &&
      typeof event.data.type === 'string'
    ) {
      const { type, payload } = event.data;

      // Call specific handlers
      const handlers = this.handlers.get(type);
      handlers?.forEach((handler) => {
        handler(payload);
      });

      // Call wildcard handlers
      this.wildcardHandlers.forEach((handler) => {
        handler(type, payload);
      });
    }
  };

  override hostConnected(): void {
    window.addEventListener('message', this.handleMessage);
  }

  override hostDisconnected(): void {
    window.removeEventListener('message', this.handleMessage);
    this.handlers.clear();
  }
}
