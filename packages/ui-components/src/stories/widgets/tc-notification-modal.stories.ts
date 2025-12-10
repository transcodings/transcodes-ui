import type { Meta, StoryObj } from '@storybook/web-components-vite';
import { html } from 'lit';
import '../../widgets/tc-notification-modal.js';
import '../../primitives/tc-button.js';

const meta: Meta = {
  title: 'Widgets/tc-notification-modal',
  component: 'tc-notification-modal',
  argTypes: {
    title: {
      control: 'text',
      description: 'Modal title',
    },
    description: {
      control: 'text',
      description: 'Modal description',
    },
    allowLabel: {
      control: 'text',
      description: 'Allow button label',
    },
    denyLabel: {
      control: 'text',
      description: 'Deny button label',
    },
    storageKey: {
      control: 'text',
      description: 'localStorage key for dismissal state',
    },
  },
};

export default meta;

export const Default: StoryObj = {
  args: {
    title: 'Stay Updated',
    description:
      'Enable notifications to receive important updates about your account.',
    allowLabel: 'Enable',
    denyLabel: 'Maybe Later',
    storageKey: 'storybook-notification-modal',
  },
  render: (args) => {
    const showModal = () => {
      // Clear storage for demo
      localStorage.removeItem(args.storageKey as string);
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
          title=${args.title}
          description=${args.description}
          allow-label=${args.allowLabel}
          deny-label=${args.denyLabel}
          storage-key=${args.storageKey}
          @tc-allow=${() => console.log('Notifications allowed')}
          @tc-deny=${() => console.log('Notifications denied')}
          @tc-close=${() => console.log('Modal closed')}
        ></tc-notification-modal>
      </div>
    `;
  },
};

export const CustomContent: StoryObj = {
  render: () => {
    const showModal = () => {
      localStorage.removeItem('storybook-custom-notification');
      const modal = document.querySelector(
        '#custom-notification',
      ) as HTMLElement & {
        show: () => void;
      };
      modal?.show();
    };

    return html`
      <div>
        <tc-button variant="primary" @tc-click=${showModal}>Show Custom Modal</tc-button>
        <tc-notification-modal
          id="custom-notification"
          title="Get Push Notifications"
          description="Never miss important updates. We'll only send notifications that matter to you."
          allow-label="Yes, notify me"
          deny-label="No thanks"
          storage-key="storybook-custom-notification"
        ></tc-notification-modal>
      </div>
    `;
  },
};
