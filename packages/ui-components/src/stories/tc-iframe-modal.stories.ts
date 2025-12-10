import type { Meta, StoryObj } from '@storybook/web-components-vite';
import { html } from 'lit';
import '../widgets/tc-iframe-modal.js';
import '../primitives/tc-button.js';

const meta: Meta = {
  title: 'Widgets/tc-iframe-modal',
  component: 'tc-iframe-modal',
};

export default meta;

export const Default: StoryObj = {
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
