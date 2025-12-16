import type { Meta, StoryObj } from '@storybook/web-components-vite';
import { html } from 'lit';
import '../../primitives/tc-toast.js';
import '../../primitives/tc-button.js';
import type { TcToast } from '../../primitives/tc-toast.js';

const meta: Meta = {
  title: 'Primitives/tc-toast',
  component: 'tc-toast',
  argTypes: {
    variant: {
      control: 'select',
      options: ['info', 'success', 'warning', 'error'],
      description: 'Visual variant of the toast',
    },
    duration: {
      control: 'number',
      description: 'Auto-dismiss duration in milliseconds',
    },
    autoDismiss: {
      control: 'boolean',
      description: 'Whether to auto-dismiss after duration',
    },
    dismissible: {
      control: 'boolean',
      description: 'Whether to show close button',
    },
  },
};

export default meta;

export const Default: StoryObj = {
  args: {
    variant: 'info',
    duration: 5000,
    autoDismiss: false,
    dismissible: true,
  },
  render: (args) => html`
    <div style="padding: 2rem; min-height: 200px;">
      <tc-button
        variant="primary"
        @tc-click=${() => {
          const toast = document.querySelector('#demo-toast') as TcToast;
          toast?.show();
        }}
      >
        Show Toast
      </tc-button>
      <tc-toast
        id="demo-toast"
        variant=${args.variant}
        duration=${args.duration}
        ?auto-dismiss=${args.autoDismiss}
        ?dismissible=${args.dismissible}
      >
        This is a toast notification message.
      </tc-toast>
    </div>
  `,
};

export const Variants: StoryObj = {
  render: () => html`
    <div style="padding: 2rem; min-height: 300px;">
      <div style="display: flex; gap: 1rem; flex-wrap: wrap; margin-bottom: 2rem;">
        <tc-button
          variant="secondary"
          @tc-click=${() => {
            const toast = document.querySelector('#toast-info') as TcToast;
            toast?.show();
          }}
        >
          Info
        </tc-button>
        <tc-button
          variant="success"
          @tc-click=${() => {
            const toast = document.querySelector('#toast-success') as TcToast;
            toast?.show();
          }}
        >
          Success
        </tc-button>
        <tc-button
          variant="secondary"
          @tc-click=${() => {
            const toast = document.querySelector('#toast-warning') as TcToast;
            toast?.show();
          }}
        >
          Warning
        </tc-button>
        <tc-button
          variant="secondary"
          @tc-click=${() => {
            const toast = document.querySelector('#toast-error') as TcToast;
            toast?.show();
          }}
        >
          Error
        </tc-button>
      </div>
      <tc-toast id="toast-info" variant="info" ?auto-dismiss=${false}>
        This is an info message.
      </tc-toast>
      <tc-toast id="toast-success" variant="success" ?auto-dismiss=${false}>
        Operation completed successfully!
      </tc-toast>
      <tc-toast id="toast-warning" variant="warning" ?auto-dismiss=${false}>
        Please review your settings.
      </tc-toast>
      <tc-toast id="toast-error" variant="error" ?auto-dismiss=${false}>
        An error occurred. Please try again.
      </tc-toast>
    </div>
  `,
};

export const AutoDismiss: StoryObj = {
  render: () => html`
    <div style="padding: 2rem; min-height: 200px;">
      <div style="display: flex; gap: 1rem; margin-bottom: 1rem;">
        <tc-button
          variant="primary"
          @tc-click=${() => {
            const toast = document.querySelector('#toast-auto') as TcToast;
            toast?.show();
          }}
        >
          Show Auto-dismiss Toast (3s)
        </tc-button>
      </div>
      <p style="color: var(--ink-light); font-size: 0.875rem;">
        Toast will automatically disappear after 3 seconds.
      </p>
      <tc-toast id="toast-auto" variant="success" auto-dismiss duration="3000">
        This toast will disappear in 3 seconds.
      </tc-toast>
    </div>
  `,
};

export const NonDismissible: StoryObj = {
  render: () => html`
    <div style="padding: 2rem; min-height: 200px;">
      <div style="display: flex; gap: 1rem; margin-bottom: 1rem;">
        <tc-button
          variant="primary"
          @tc-click=${() => {
            const toast = document.querySelector('#toast-nodismiss') as TcToast;
            toast?.show();
          }}
        >
          Show Non-dismissible Toast
        </tc-button>
        <tc-button
          variant="secondary"
          @tc-click=${() => {
            const toast = document.querySelector('#toast-nodismiss') as TcToast;
            toast?.hide();
          }}
        >
          Hide Programmatically
        </tc-button>
      </div>
      <p style="color: var(--ink-light); font-size: 0.875rem;">
        This toast has no close button. It can only be hidden programmatically.
      </p>
      <tc-toast id="toast-nodismiss" variant="warning" ?dismissible=${false} ?auto-dismiss=${false}>
        This toast cannot be dismissed by clicking.
      </tc-toast>
    </div>
  `,
};

export const EventHandling: StoryObj = {
  render: () => html`
    <div style="padding: 2rem; min-height: 200px;">
      <div style="display: flex; gap: 1rem; margin-bottom: 1rem;">
        <tc-button
          variant="primary"
          @tc-click=${() => {
            const toast = document.querySelector('#toast-events') as TcToast;
            toast?.show();
          }}
        >
          Show Toast
        </tc-button>
      </div>
      <div id="event-log" style="padding: 1rem; background: var(--paper-cream); border-radius: var(--radius-md); font-family: monospace; font-size: 0.875rem; color: var(--ink-dark);">
        Event log will appear here...
      </div>
      <tc-toast
        id="toast-events"
        variant="info"
        auto-dismiss
        duration="3000"
        @tc-dismiss=${() => {
          const log = document.querySelector('#event-log');
          if (log) {
            log.textContent = `[${new Date().toLocaleTimeString()}] tc-dismiss event fired`;
          }
        }}
      >
        Dismiss this toast to see the event.
      </tc-toast>
    </div>
  `,
};

export const Success: StoryObj = {
  render: () => html`
    <div style="padding: 2rem; min-height: 150px;">
      <tc-button
        variant="success"
        @tc-click=${() => {
          const toast = document.querySelector(
            '#toast-success-single',
          ) as TcToast;
          toast?.show();
        }}
      >
        Show Success Toast
      </tc-button>
      <tc-toast id="toast-success-single" variant="success" ?auto-dismiss=${false}>
        Operation completed successfully!
      </tc-toast>
    </div>
  `,
};
