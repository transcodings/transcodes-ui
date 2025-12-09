import StyleDictionary from 'style-dictionary';
import { transformTypes } from 'style-dictionary/enums';

/**
 * Custom name transform for CSS variables (kebab-case)
 * e.g., ['ink', 'black'] -> 'ink-black'
 */
StyleDictionary.registerTransform({
  name: 'name/kebab-flat',
  type: transformTypes.name,
  transform: (token) => {
    return token.path.join('-');
  },
});
