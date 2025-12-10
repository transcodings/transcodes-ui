import type { Meta, StoryObj } from '@storybook/web-components-vite';
import { html } from 'lit';
import '../widgets/tc-ios-installation-guide.js';
import '../primitives/tc-button.js';

const meta: Meta = {
  title: 'Widgets/tc-ios-installation-guide',
  component: 'tc-ios-installation-guide',
};

export default meta;

export const Default: StoryObj = {
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
