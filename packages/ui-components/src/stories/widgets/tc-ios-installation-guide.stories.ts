import type { Meta, StoryObj } from '@storybook/web-components-vite';
import { html } from 'lit';
import '../../widgets/tc-ios-installation-guide.js';
import '../../primitives/tc-button.js';

const meta: Meta = {
  title: 'Widgets/tc-ios-installation-guide',
  component: 'tc-ios-installation-guide',
  argTypes: {
    title: {
      control: 'text',
      description: 'Guide title',
    },
    steps: {
      control: 'object',
      description: 'Array of installation steps',
    },
  },
};

export default meta;

export const Default: StoryObj = {
  args: {
    title: 'Add to Home Screen',
    steps: [
      'Tap the Share button below',
      'Scroll and tap "Add to Home Screen"',
      'Tap "Add" to confirm',
    ],
  },
  render: (args) => {
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
          title=${args.title}
          .steps=${args.steps}
          @tc-close=${() => console.log('Guide closed')}
        ></tc-ios-installation-guide>
      </div>
    `;
  },
};

export const CustomSteps: StoryObj = {
  render: () => {
    const showGuide = () => {
      const guide = document.querySelector('#custom-guide') as HTMLElement & {
        show: () => void;
      };
      guide?.show();
    };

    return html`
      <div>
        <tc-button variant="primary" @tc-click=${showGuide}>Show Custom Guide</tc-button>
        <tc-ios-installation-guide
          id="custom-guide"
          title="Install Our App"
          .steps=${[
            'Open Safari browser',
            'Tap the Share icon at the bottom',
            'Find and tap "Add to Home Screen"',
            'Name it and tap "Add"',
          ]}
        ></tc-ios-installation-guide>
      </div>
    `;
  },
};
