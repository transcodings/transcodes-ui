import type { Meta, StoryObj } from '@storybook/web-components-vite';
import { html } from 'lit';
import '../../widgets/tc-offline-modal.js';
import '../../primitives/tc-button.js';

const meta: Meta = {
  title: 'Widgets/tc-offline-modal',
  component: 'tc-offline-modal',
  argTypes: {
    title: {
      control: 'text',
      description: 'Modal title',
    },
    description: {
      control: 'text',
      description: 'Modal description',
    },
    retryLabel: {
      control: 'text',
      description: 'Retry button label',
    },
    autoDetect: {
      control: 'boolean',
      description: 'Auto-detect offline status',
    },
  },
};

export default meta;

export const Default: StoryObj = {
  args: {
    title: "You're Offline",
    description: 'Please check your internet connection and try again.',
    retryLabel: 'Try Again',
    autoDetect: false,
  },
  render: (args) => {
    const showModal = () => {
      const modal = document.querySelector(
        'tc-offline-modal',
      ) as HTMLElement & {
        show: () => void;
      };
      modal?.show();
    };

    return html`
      <div>
        <tc-button variant="primary" @tc-click=${showModal}>Simulate Offline</tc-button>
        <tc-offline-modal
          title=${args.title}
          description=${args.description}
          retry-label=${args.retryLabel}
          .autoDetect=${args.autoDetect}
          @tc-retry=${() => {
            console.log('Retry clicked');
            const modal = document.querySelector(
              'tc-offline-modal',
            ) as HTMLElement & {
              hide: () => void;
            };
            modal?.hide();
          }}
          @tc-online=${() => console.log('Back online')}
          @tc-offline=${() => console.log('Went offline')}
        ></tc-offline-modal>
      </div>
    `;
  },
};

export const CustomMessages: StoryObj = {
  render: () => {
    const showModal = () => {
      const modal = document.querySelector('#custom-offline') as HTMLElement & {
        show: () => void;
      };
      modal?.show();
    };

    return html`
      <div>
        <tc-button variant="primary" @tc-click=${showModal}>Show Custom Modal</tc-button>
        <tc-offline-modal
          id="custom-offline"
          title="Connection Lost"
          description="We couldn't reach our servers. This might be a temporary issue."
          retry-label="Reconnect"
          .autoDetect=${false}
          @tc-retry=${() => {
            const modal = document.querySelector(
              '#custom-offline',
            ) as HTMLElement & {
              hide: () => void;
            };
            modal?.hide();
          }}
        ></tc-offline-modal>
      </div>
    `;
  },
};

export const AutoDetect: StoryObj = {
  render: () => html`
    <div style="padding: 2rem; background: var(--paper-cream); border-radius: var(--radius-lg);">
      <tc-offline-modal
        title="No Internet Connection"
        description="Please check your network settings."
        .autoDetect=${true}
      ></tc-offline-modal>
      <p style="color: var(--ink-medium); font-size: var(--font-size-sm);">
        This modal will automatically appear when you go offline.<br>
        Try disconnecting from the internet to see it in action.
      </p>
    </div>
  `,
};
