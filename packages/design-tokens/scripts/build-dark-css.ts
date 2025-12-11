/**
 * Transform dark theme CSS for manual control
 * Converts :root selector to [data-theme="dark"]
 */

const buildDir = `${import.meta.dir}/../build`;

// Read the temp dark CSS file
const tempFile = Bun.file(`${buildDir}/tokens-dark-temp.css`);
const tempContent = await tempFile.text();

// Extract CSS variables (everything between :root { and })
const match = tempContent.match(/:root\s*\{([^}]+)\}/s);
if (!match) {
  console.error('Failed to parse tokens-dark-temp.css');
  process.exit(1);
}

const variables = match[1];

// Generate dark theme CSS (manual control only)
const darkCss = `/**
 * Do not edit directly, this file was auto-generated.
 */

/**
 * Dark theme design tokens
 * Applies when [data-theme="dark"] is set on any parent element
 */

[data-theme="dark"] {
${variables}
}
`;

// Write the final dark CSS file
await Bun.write(`${buildDir}/tokens-dark.css`, darkCss);

// Remove temp file
try {
  await Bun.$`rm ${buildDir}/tokens-dark-temp.css`;
} catch {
  // Ignore if file doesn't exist
}

console.log('✓ build/tokens-dark.css');
