/**
 * Build script to convert components.css to a JS module
 * This allows Lit components to import and use the styles with adoptedStyleSheets
 */

const buildDir = `${import.meta.dir}/../build`;

// Read the CSS file
const componentsCss = await Bun.file(`${buildDir}/components.css`).text();

// Generate JS module with the CSS as a string
const jsContent = `/**
 * Do not edit directly, this file was auto-generated.
 * Component styles from design-tokens for use with Lit's adoptedStyleSheets
 */

export const componentStyles = \`${componentsCss.replace(/`/g, '\\`').replace(/\$/g, '\\$')}\`;

export default componentStyles;
`;

// Write the JS module
await Bun.write(`${buildDir}/components.js`, jsContent);

// Generate TypeScript declaration
const dtsContent = `/**
 * Do not edit directly, this file was auto-generated.
 */

export declare const componentStyles: string;
export default componentStyles;
`;

await Bun.write(`${buildDir}/components.d.ts`, dtsContent);

console.log('✓ build/components.js');
console.log('✓ build/components.d.ts');
