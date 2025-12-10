import type { Meta, StoryObj } from '@storybook/web-components-vite';
import { html } from 'lit';
import '../widgets/tc-notification-modal.js';
import '../primitives/tc-button.js';

const meta: Meta = {
  title: 'Widgets/tc-notification-modal',
  component: 'tc-notification-modal',
};

export default meta;

export const Default: StoryObj = {
  render: () => {
    const showModal = () => {
      const modal = document.querySelector(
        'tc-notification-modal',
      ) as HTMLElement & {
        show: () => void;
      };
      modal?.show();
    };

    return html`
      <div>
        <tc-button variant="primary" @tc-click=${showModal}>Request Notifications</tc-button>
        <tc-notification-modal
          title="Stay Updated"
          description="Enable notifications to receive important updates about your account."
          allow-label="Enable"
          deny-label="Maybe Later"
          storage-key="storybook-notification-modal"
          @tc-allow=${() => console.log('Notifications allowed')}
          @tc-deny=${() => console.log('Notifications denied')}
        ></tc-notification-modal>
      </div>
    `;
  },
};
