import { transformGroups } from 'style-dictionary/enums';

// Import custom transform
import './config/transforms/name-kebab-flat';

export default {
  source: ['tokens/themes/dark.json'],
  platforms: {
    // Dark theme - generates temp file, will be transformed by build script
    'css-dark': {
      transformGroup: transformGroups.css,
      transforms: ['name/kebab-flat'],
      buildPath: 'build/',
      files: [
        {
          destination: 'tokens-dark-temp.css',
          format: 'css/variables',
          options: {
            selector: ':root',
            outputReferences: false,
          },
        },
      ],
    },
  },
};
