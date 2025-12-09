import StyleDictionary from 'style-dictionary';
import { transformTypes } from 'style-dictionary/enums';

/**
 * Custom name transform for TypeScript (camelCase)
 * e.g., ['ink', 'black'] -> 'inkBlack'
 * e.g., ['accent', 'primary-hover'] -> 'accentPrimaryHover'
 */
StyleDictionary.registerTransform({
  name: 'name/camel-flat',
  type: transformTypes.name,
  transform: (token) => {
    return token.path
      .map((part, index) => {
        if (index === 0) {
          return part.replace(/-([a-z])/g, (_, c) => c.toUpperCase());
        }
        const cleaned = part.replace(/-([a-z])/g, (_, c) => c.toUpperCase());
        return cleaned.charAt(0).toUpperCase() + cleaned.slice(1);
      })
      .join('');
  },
});
