import type { Meta, StoryObj } from '@storybook/web-components-vite';
import { html } from 'lit';

import '../widgets/tc-floating-button.js';
import '../widgets/tc-iframe-modal.js';
import '../widgets/tc-installation-banner.js';
import '../widgets/tc-ios-installation-guide.js';
import '../widgets/tc-notification-modal.js';
import '../widgets/tc-offline-modal.js';
import '../widgets/tc-page-decoration.js';
import '../primitives/tc-icon.js';
import '../primitives/tc-button.js';
import '../primitives/tc-text.js';

// ============= tc-floating-button =============
const floatingMeta: Meta = {
  title: 'Widgets/tc-floating-button',
  component: 'tc-floating-button',
};

export default floatingMeta;

export const FloatingButton: StoryObj = {
  render: () => html`
    <div style="height: 300px; position: relative; background: var(--paper-cream); border-radius: var(--radius-lg);">
      <tc-floating-button
        position="bottom-right"
        @tc-click=${() => console.log('FAB clicked')}
        style="position: absolute;"
      >
        <tc-icon name="bell" size="1.5rem"></tc-icon>
      </tc-floating-button>
    </div>
  `,
};

// ============= tc-iframe-modal =============
export const IframeModal: StoryObj = {
  render: () => {
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
          src="https://example.com"
          title="External Content"
          @tc-close=${() => console.log('Modal closed')}
        ></tc-iframe-modal>
      </div>
    `;
  },
};

// ============= tc-installation-banner =============
export const InstallationBanner: StoryObj = {
  render: () => {
    const showBanner = () => {
      const banner = document.querySelector(
        'tc-installation-banner',
      ) as HTMLElement & {
        show: () => void;
      };
      banner?.show();
    };

    return html`
      <div style="height: 200px; position: relative;">
        <tc-button variant="primary" @tc-click=${showBanner}>Show Banner</tc-button>
        <tc-installation-banner
          title="Install Our App"
          description="Get quick access from your home screen"
          install-label="Install Now"
          storage-key="storybook-install-banner"
          @tc-install=${() => console.log('Install clicked')}
          @tc-dismiss=${() => console.log('Banner dismissed')}
          style="position: absolute;"
        ></tc-installation-banner>
      </div>
    `;
  },
};

// ============= tc-ios-installation-guide =============
export const IosInstallationGuide: StoryObj = {
  render: () => {
    const showGuide = () => {
      const guide = document.querySelector(
        'tc-ios-installation-guide',
      ) as HTMLElement & {
        show: () => void;
      };
      guide?.show();
    };

    return html`
      <div>
        <tc-button variant="primary" @tc-click=${showGuide}>Show iOS Guide</tc-button>
        <tc-ios-installation-guide
          title="Add to Home Screen"
          .steps=${[
            'Tap the [share] Share button below',
            'Scroll and tap "Add to Home Screen"',
            'Tap "Add" to confirm',
          ]}
          @tc-close=${() => console.log('Guide closed')}
        ></tc-ios-installation-guide>
      </div>
    `;
  },
};

// ============= tc-notification-modal =============
export const NotificationModal: StoryObj = {
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

// ============= tc-offline-modal =============
export const OfflineModal: StoryObj = {
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

// ============= tc-page-decoration =============
export const PageDecorationPrimary: StoryObj = {
  render: () => html`
    <div style="height: 400px; position: relative; overflow: hidden; border-radius: var(--radius-lg); background: var(--paper-cream);">
      <tc-page-decoration variant="primary" style="position: absolute;"></tc-page-decoration>
      <div style="position: relative; z-index: 1; padding: 2rem; text-align: center;">
        <tc-text size="xl" weight="600">Primary Decoration</tc-text>
        <tc-text color="var(--ink-medium)">Purple floating blobs in the background</tc-text>
      </div>
    </div>
  `,
};

export const PageDecorationSuccess: StoryObj = {
  render: () => html`
    <div style="height: 400px; position: relative; overflow: hidden; border-radius: var(--radius-lg); background: var(--paper-cream);">
      <tc-page-decoration variant="success" style="position: absolute;"></tc-page-decoration>
      <div style="position: relative; z-index: 1; padding: 2rem; text-align: center;">
        <tc-text size="xl" weight="600">Success Decoration</tc-text>
        <tc-text color="var(--ink-medium)">Green floating blobs for success states</tc-text>
      </div>
    </div>
  `,
};

export const PageDecorationError: StoryObj = {
  render: () => html`
    <div style="height: 400px; position: relative; overflow: hidden; border-radius: var(--radius-lg); background: var(--paper-cream);">
      <tc-page-decoration variant="error" style="position: absolute;"></tc-page-decoration>
      <div style="position: relative; z-index: 1; padding: 2rem; text-align: center;">
        <tc-text size="xl" weight="600">Error Decoration</tc-text>
        <tc-text color="var(--ink-medium)">Red floating blobs for error states</tc-text>
      </div>
    </div>
  `,
};
