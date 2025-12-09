import { transformGroups } from 'style-dictionary/enums';
import type { TransformedToken } from 'style-dictionary/types';

// Import modular transforms and formats
import './config/transforms/name-kebab-flat';
import './config/transforms/name-camel-flat';
import './config/formats/css-components';

export default {
  source: [
    'tokens/animation/*.json',
    'tokens/appearance/*.json',
    'tokens/brand/*.json',
    'tokens/color/*.json',
    'tokens/components/*.json',
    'tokens/layout/*.json',
    'tokens/sizing/*.json',
    'tokens/spacing/*.json',
    'tokens/typography/*.json',
  ],
  platforms: {
    // Light theme (default) - all tokens except themes
    'css-light': {
      transformGroup: transformGroups.css,
      transforms: ['name/kebab-flat'],
      buildPath: 'build/',
      files: [
        {
          destination: 'tokens.css',
          format: 'css/variables',
          options: {
            selector: ':root, [data-theme="light"]',
            outputReferences: true,
          },
        },
      ],
    },

    // Components CSS (theme-agnostic, uses token references)
    'css-components': {
      transformGroup: transformGroups.css,
      transforms: ['name/kebab-flat'],
      buildPath: 'build/',
      files: [
        {
          destination: 'components.css',
          format: 'css/components',
          filter: (token: TransformedToken) => {
            // Only include component tokens
            const componentPaths = [
              'button',
              'card',
              'container',
              'feedback',
              'field',
              'form',
              'input',
              'label',
              'page',
              'title',
            ];
            return componentPaths.includes(token.path[0]);
          },
        },
      ],
    },

    // TypeScript type declarations
    ts: {
      transformGroup: transformGroups.js,
      transforms: ['name/camel-flat'],
      buildPath: 'build/',
      files: [
        {
          destination: 'tokens.d.ts',
          format: 'typescript/es6-declarations',
        },
      ],
    },

    // JSON export (for tooling integration)
    json: {
      transformGroup: transformGroups.js,
      buildPath: 'build/',
      files: [
        {
          destination: 'tokens.json',
          format: 'json/flat',
        },
      ],
    },
  },
};
