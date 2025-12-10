import type { Meta, StoryObj } from '@storybook/web-components-vite';
import { html } from 'lit';
import '../widgets/tc-installation-banner.js';
import '../primitives/tc-button.js';

const meta: Meta = {
  title: 'Widgets/tc-installation-banner',
  component: 'tc-installation-banner',
};

export default meta;

export const Default: StoryObj = {
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
