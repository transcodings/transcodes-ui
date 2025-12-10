import type { Meta, StoryObj } from '@storybook/web-components-vite';
import { html } from 'lit';
import '../../widgets/tc-iframe-modal.js';
import '../../primitives/tc-button.js';

const meta: Meta = {
  title: 'Widgets/tc-iframe-modal',
  component: 'tc-iframe-modal',
  argTypes: {
    src: {
      control: 'text',
      description: 'URL to load in the iframe',
    },
    title: {
      control: 'text',
      description: 'Modal title',
    },
    closeOnEscape: {
      control: 'boolean',
      description: 'Close modal on Escape key',
    },
    closeOnOverlay: {
      control: 'boolean',
      description: 'Close modal on overlay click',
    },
    useHistory: {
      control: 'boolean',
      description: 'Add history entry for back button navigation',
    },
  },
};

export default meta;

export const Default: StoryObj = {
  args: {
    src: 'https://example.com',
    title: 'External Content',
    closeOnEscape: true,
    closeOnOverlay: true,
    useHistory: true,
  },
  render: (args) => {
    const openModal = () => {
      const modal = document.querySelector('tc-iframe-modal') as HTMLElement & {
        open: () => void;
      };
      modal?.open();
    };

    return html`
      <div>
        <tc-button variant="primary" @tc-click=${openModal}>Open Modal</tc-button>
        <tc-iframe-modal
          src=${args.src}
          title=${args.title}
          ?close-on-escape=${args.closeOnEscape}
          ?close-on-overlay=${args.closeOnOverlay}
          ?use-history=${args.useHistory}
          @tc-close=${() => console.log('Modal closed')}
          @tc-load=${() => console.log('Iframe loaded')}
          @tc-message=${(e: CustomEvent) => console.log('Message:', e.detail)}
        ></tc-iframe-modal>
      </div>
    `;
  },
};

export const NoOverlayClose: StoryObj = {
  render: () => {
    const openModal = () => {
      const modal = document.querySelector(
        '#no-overlay-modal',
      ) as HTMLElement & {
        open: () => void;
      };
      modal?.open();
    };

    return html`
      <div>
        <tc-button variant="primary" @tc-click=${openModal}>Open Modal (No Overlay Close)</tc-button>
        <tc-iframe-modal
          id="no-overlay-modal"
          src="https://example.com"
          title="Strict Modal"
          close-on-overlay="false"
        ></tc-iframe-modal>
      </div>
    `;
  },
};
