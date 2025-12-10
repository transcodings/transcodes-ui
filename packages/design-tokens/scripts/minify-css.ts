/**
 * Minify CSS files using lightningcss
 */
import { transform } from 'lightningcss';

const buildDir = `${import.meta.dir}/../build`;

const cssFiles = ['tokens.css', 'tokens-dark.css', 'components.css'];

for (const filename of cssFiles) {
  const inputPath = `${buildDir}/${filename}`;
  const file = Bun.file(inputPath);

  if (!(await file.exists())) {
    console.warn(`⚠ ${filename} not found, skipping...`);
    continue;
  }

  const code = await file.text();

  // Transform and minify CSS
  const { code: minified } = transform({
    filename,
    code: Buffer.from(code),
    minify: true,
    targets: {
      // 최신 브라우저 타겟 (2년 이내)
      chrome: (120 << 16) | (0 << 8),
      firefox: (120 << 16) | (0 << 8),
      safari: (17 << 16) | (0 << 8),
    },
  });

  // Write minified CSS
  await Bun.write(inputPath, minified);

  const originalSize = code.length;
  const minifiedSize = minified.length;
  const reduction = ((1 - minifiedSize / originalSize) * 100).toFixed(1);

  console.log(
    `✓ ${filename}: ${(originalSize / 1024).toFixed(1)}KB → ${(minifiedSize / 1024).toFixed(1)}KB (-${reduction}%)`,
  );
}
