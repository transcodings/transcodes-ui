/**
 * Build script to generate index.js as the main package entry point
 * This provides a JS entry point for bundlers that don't handle CSS imports
 */

const buildDir = `${import.meta.dir}/../build`;

// Read tokens.json to get all token values
const tokensJson = await Bun.file(`${buildDir}/tokens.json`).json();

// Convert PascalCase keys to camelCase
function toCamelCase(str: string): string {
  return str.charAt(0).toLowerCase() + str.slice(1);
}

// Generate tokens object with camelCase keys
const tokenEntries = Object.entries(tokensJson)
  .map(([key, value]) => `  ${toCamelCase(key)}: ${JSON.stringify(value)}`)
  .join(',\n');

// Generate JS module
const jsContent = `/**
 * Do not edit directly, this file was auto-generated.
 * Design tokens as JavaScript object for use in JS/TS environments
 */

// CSS side-effect imports (auto-loaded when package is imported)
import './tokens.css';
import './tokens-dark.css';

/**
 * All design tokens as a JavaScript object
 * Keys are camelCase versions of CSS variable names
 * @example
 * import { tokens } from '@transcodes/design-tokens';
 * console.log(tokens.accentPrimary); // '#6b4fd9'
 */
export const tokens = {
${tokenEntries}
};

/**
 * CSS variable names mapped to their values
 * @example
 * import { cssVars } from '@transcodes/design-tokens';
 * console.log(cssVars['--accent-primary']); // '#6b4fd9'
 */
export const cssVars = {
${Object.entries(tokensJson)
  .map(([key, value]) => {
    // Convert PascalCase to kebab-case for CSS variable names
    const kebabKey = key
      .replace(/([a-z])([A-Z])/g, '$1-$2')
      .replace(/([A-Z])([A-Z][a-z])/g, '$1-$2')
      .toLowerCase();
    return `  '--${kebabKey}': ${JSON.stringify(value)}`;
  })
  .join(',\n')}
};

export default tokens;
`;

// Write the JS module
await Bun.write(`${buildDir}/index.js`, jsContent);

// Read tokens.d.ts to extract type declarations
const tokensDts = await Bun.file(`${buildDir}/tokens.d.ts`).text();

// Extract all export declarations
const exportMatches = tokensDts.matchAll(/export const (\w+): string;/g);
const tokenTypes = Array.from(exportMatches).map((m) => m[1]);

// Generate TypeScript declaration
const dtsContent = `/**
 * Do not edit directly, this file was auto-generated.
 */

/**
 * Design tokens object type
 */
export interface Tokens {
${tokenTypes.map((name) => `  ${name}: string;`).join('\n')}
}

/**
 * All design tokens as a JavaScript object
 */
export declare const tokens: Tokens;

/**
 * CSS variable names mapped to their values
 */
export declare const cssVars: Record<string, string>;

export default tokens;
`;

await Bun.write(`${buildDir}/index.d.ts`, dtsContent);

console.log('✓ build/index.js');
console.log('✓ build/index.d.ts');
