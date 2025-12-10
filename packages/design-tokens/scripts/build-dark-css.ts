/**
 * Transform dark theme CSS to dual selector format
 * Converts :root selector to both:
 * 1. @media (prefers-color-scheme: dark) { :root:not([data-theme="light"]) }
 * 2. [data-theme="dark"]
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

// Generate dual selector CSS
const darkCss = `/**
 * Do not edit directly, this file was auto-generated.
 */

/**
 * Dark theme design tokens
 * Applies to both:
 * - System dark mode (prefers-color-scheme: dark) unless explicitly set to light
 * - Manual dark mode ([data-theme="dark"])
 */

@media (prefers-color-scheme: dark) {
	:root:not([data-theme="light"]) {
${variables}
	}
}

[data-theme="dark"] {
${variables}
}
`;

// Write the final dark CSS file
await Bun.write(`${buildDir}/tokens-dark.css`, darkCss);

// Remove temp file
const fs = await import('fs/promises');
try {
  await fs.unlink(`${buildDir}/tokens-dark-temp.css`);
} catch {
  // Ignore if file doesn't exist
}

console.log('✓ build/tokens-dark.css');
