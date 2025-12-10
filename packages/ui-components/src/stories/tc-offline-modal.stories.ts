import type { Meta, StoryObj } from '@storybook/web-components-vite';
import { html } from 'lit';
import '../widgets/tc-offline-modal.js';
import '../primitives/tc-button.js';

const meta: Meta = {
  title: 'Widgets/tc-offline-modal',
  component: 'tc-offline-modal',
};

export default meta;

export const Default: StoryObj = {
  render: () => {
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
          title="You're Offline"
          description="Please check your internet connection and try again."
          retry-label="Retry"
          .autoDetect=${false}
          @tc-retry=${() => {
            console.log('Retry clicked');
            const modal = document.querySelector(
              'tc-offline-modal',
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
