import { addons } from '@storybook/manager-api';
import { create } from '@storybook/theming/create';

const theme = create({
  base: 'light',
  brandTitle: 'Transcodes UI',
  brandUrl: 'https://github.com/transcodings/transcodes-ui',
  brandImage: '/favicon.png',
  brandTarget: '_blank',
});

addons.setConfig({
  theme,
});
