import { transformGroups } from 'style-dictionary/enums';

// Import modular transforms
import './config/transforms/name-kebab-flat';

export default {
  source: ['tokens/themes/dark.json'],
  platforms: {
    // Dark theme - only dark theme overrides
    'css-dark': {
      transformGroup: transformGroups.css,
      transforms: ['name/kebab-flat'],
      buildPath: 'build/',
      files: [
        {
          destination: 'tokens-dark.css',
          format: 'css/variables',
          options: {
            selector: '[data-theme="dark"]',
            outputReferences: false,
          },
        },
      ],
    },
  },
};
