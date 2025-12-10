import type { Meta, StoryObj } from '@storybook/web-components-vite';
import { html } from 'lit';
import '../../widgets/tc-installation-banner.js';
import '../../primitives/tc-button.js';

const meta: Meta = {
  title: 'Widgets/tc-installation-banner',
  component: 'tc-installation-banner',
  argTypes: {
    title: {
      control: 'text',
      description: 'Banner title',
    },
    description: {
      control: 'text',
      description: 'Banner description',
    },
    installLabel: {
      control: 'text',
      description: 'Install button label',
    },
    storageKey: {
      control: 'text',
      description: 'localStorage key for dismissal state',
    },
    dismissDays: {
      control: 'number',
      description: 'Days before showing again after dismissal',
    },
  },
};

export default meta;

export const Default: StoryObj = {
  args: {
    title: 'Install App',
    description: 'Add to your home screen for quick access',
    installLabel: 'Install',
    storageKey: 'storybook-install-banner',
    dismissDays: 7,
  },
  render: (args) => {
    const showBanner = () => {
      // Clear storage for demo
      localStorage.removeItem(args.storageKey as string);
      const banner = document.querySelector(
        'tc-installation-banner',
      ) as HTMLElement & {
        show: () => void;
      };
      banner?.show();
    };

    return html`
      <div style="min-height: 200px; position: relative;">
        <tc-button variant="primary" @tc-click=${showBanner}>Show Banner</tc-button>
        <tc-installation-banner
          title=${args.title}
          description=${args.description}
          install-label=${args.installLabel}
          storage-key=${args.storageKey}
          dismiss-days=${args.dismissDays}
          @tc-install=${() => console.log('Install clicked')}
          @tc-dismiss=${() => console.log('Banner dismissed')}
        ></tc-installation-banner>
      </div>
    `;
  },
};

export const CustomContent: StoryObj = {
  render: () => {
    const showBanner = () => {
      localStorage.removeItem('storybook-custom-install');
      const banner = document.querySelector('#custom-banner') as HTMLElement & {
        show: () => void;
      };
      banner?.show();
    };

    return html`
      <div style="min-height: 200px; position: relative;">
        <tc-button variant="primary" @tc-click=${showBanner}>Show Custom Banner</tc-button>
        <tc-installation-banner
          id="custom-banner"
          title="Get the App"
          description="Install our app for the best experience"
          install-label="Add to Home Screen"
          storage-key="storybook-custom-install"
          dismiss-days="1"
        ></tc-installation-banner>
      </div>
    `;
  },
};
