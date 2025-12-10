// Design Token Showcase - Main JavaScript

// WCAG Contrast Ratio Calculator
const ContrastChecker = {
  // Parse CSS color to RGB
  parseColor(colorStr) {
    const temp = document.createElement('div');
    temp.style.color = colorStr;
    document.body.appendChild(temp);
    const computed = getComputedStyle(temp).color;
    document.body.removeChild(temp);

    const match = computed.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)/);
    if (match) {
      return {
        r: parseInt(match[1], 10),
        g: parseInt(match[2], 10),
        b: parseInt(match[3], 10),
      };
    }
    return { r: 0, g: 0, b: 0 };
  },

  // Get relative luminance (WCAG formula)
  getLuminance(rgb) {
    const [r, g, b] = [rgb.r, rgb.g, rgb.b].map((v) => {
      v /= 255;
      return v <= 0.03928 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4;
    });
    return 0.2126 * r + 0.7152 * g + 0.0722 * b;
  },

  // Calculate contrast ratio
  getContrastRatio(color1, color2) {
    const l1 = this.getLuminance(this.parseColor(color1));
    const l2 = this.getLuminance(this.parseColor(color2));
    const lighter = Math.max(l1, l2);
    const darker = Math.min(l1, l2);
    return (lighter + 0.05) / (darker + 0.05);
  },

  // Get CSS variable value
  getCSSVar(name) {
    return getComputedStyle(document.documentElement)
      .getPropertyValue(name)
      .trim();
  },
};

// Color combinations to check
const colorCombinations = [
  { fg: '--ink-black', bg: '--paper-white', name: 'ink-black on paper-white' },
  { fg: '--ink-dark', bg: '--paper-white', name: 'ink-dark on paper-white' },
  {
    fg: '--ink-medium',
    bg: '--paper-white',
    name: 'ink-medium on paper-white',
  },
  { fg: '--ink-light', bg: '--paper-white', name: 'ink-light on paper-white' },
  {
    fg: '--ink-faint',
    bg: '--paper-white',
    name: 'ink-faint on paper-white',
    decorative: true,
  },
  {
    fg: '--accent-primary',
    bg: '--paper-white',
    name: 'accent-primary on paper-white',
  },
  {
    fg: '--paper-white',
    bg: '--accent-primary',
    name: 'paper-white on accent-primary',
  },
  {
    fg: '--accent-success',
    bg: '--paper-white',
    name: 'accent-success on paper-white',
  },
  {
    fg: '--paper-white',
    bg: '--accent-success',
    name: 'paper-white on accent-success',
  },
  {
    fg: '--error-base',
    bg: '--paper-white',
    name: 'error-base on paper-white',
  },
  {
    fg: '--semantic-warning',
    bg: '--paper-white',
    name: 'semantic-warning on paper-white',
  },
  {
    fg: '--semantic-info',
    bg: '--paper-white',
    name: 'semantic-info on paper-white',
  },
];

function updateContrastTable() {
  const tbody = document.querySelector('#contrast-table tbody');
  if (!tbody) return;
  tbody.innerHTML = '';

  colorCombinations.forEach((combo) => {
    const fgColor = ContrastChecker.getCSSVar(combo.fg);
    const bgColor = ContrastChecker.getCSSVar(combo.bg);
    const ratio = ContrastChecker.getContrastRatio(fgColor, bgColor);

    const passAA = ratio >= 4.5;
    const passAALarge = ratio >= 3;
    const passAAA = ratio >= 7;

    const tr = document.createElement('tr');

    // Color preview + name
    const tdName = document.createElement('td');
    tdName.innerHTML = `
      <span style="display: inline-flex; align-items: center; gap: 0.5rem;">
        <span style="width: 1rem; height: 1rem; background: ${fgColor}; border: 1px solid var(--ink-faint); border-radius: 2px;"></span>
        <span style="width: 1rem; height: 1rem; background: ${bgColor}; border: 1px solid var(--ink-faint); border-radius: 2px;"></span>
        ${combo.name}
      </span>
    `;
    tr.appendChild(tdName);

    // Ratio
    const tdRatio = document.createElement('td');
    tdRatio.textContent = `${ratio.toFixed(2)}:1`;
    tdRatio.style.fontFamily = 'monospace';
    tr.appendChild(tdRatio);

    // AA status
    const tdAA = document.createElement('td');
    if (combo.decorative) {
      tdAA.textContent = 'N/A (Decorative)';
      tdAA.style.color = 'var(--ink-light)';
    } else if (passAA) {
      tdAA.textContent = 'Pass';
      tdAA.className = 'contrast-pass';
    } else if (passAALarge) {
      tdAA.textContent = 'Large text only';
      tdAA.style.color = 'var(--semantic-warning)';
    } else {
      tdAA.textContent = 'Fail';
      tdAA.className = 'contrast-fail';
    }
    tr.appendChild(tdAA);

    // AAA status
    const tdAAA = document.createElement('td');
    if (combo.decorative) {
      tdAAA.textContent = 'N/A';
      tdAAA.style.color = 'var(--ink-light)';
    } else if (passAAA) {
      tdAAA.textContent = 'Pass';
      tdAAA.className = 'contrast-pass';
    } else {
      tdAAA.textContent = 'Fail';
      tdAAA.className = 'contrast-fail';
    }
    tr.appendChild(tdAAA);

    tbody.appendChild(tr);
  });
}

// Update color swatch WCAG badges
function updateSwatchBadges() {
  document
    .querySelectorAll('.color-swatch-preview[data-wcag]')
    .forEach((el) => {
      const bgColor = getComputedStyle(el).backgroundColor;
      const paperWhite = ContrastChecker.getCSSVar('--paper-white');
      const ratio = ContrastChecker.getContrastRatio(bgColor, paperWhite);

      if (ratio >= 7) {
        el.setAttribute('data-wcag', `AAA ${ratio.toFixed(1)}:1`);
      } else if (ratio >= 4.5) {
        el.setAttribute('data-wcag', `AA ${ratio.toFixed(1)}:1`);
      } else if (ratio >= 3) {
        el.setAttribute('data-wcag', `AA Large ${ratio.toFixed(1)}:1`);
      } else {
        el.setAttribute('data-wcag', `${ratio.toFixed(1)}:1`);
      }
    });
}

// Theme toggle
function toggleTheme() {
  const html = document.documentElement;
  const currentTheme = html.getAttribute('data-theme');
  const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
  html.setAttribute('data-theme', newTheme);
  localStorage.setItem('theme', newTheme);

  // Update contrast table after theme change
  requestAnimationFrame(() => {
    updateContrastTable();
    updateSwatchBadges();
  });
}

// Load saved theme on page load
function initTheme() {
  const savedTheme = localStorage.getItem('theme');
  if (savedTheme) {
    document.documentElement.setAttribute('data-theme', savedTheme);
  } else if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
    document.documentElement.setAttribute('data-theme', 'dark');
  }
}

// Load version from package.json
async function loadVersion() {
  try {
    const response = await fetch('../package.json');
    const pkg = await response.json();
    const version = `v${pkg.version}`;
    const versionBadge = document.getElementById('version-badge');
    const footerVersion = document.getElementById('footer-version');
    if (versionBadge)
      versionBadge.textContent = `${version} - Dark Mode Enabled`;
    if (footerVersion) footerVersion.textContent = version;
  } catch {
    const versionBadge = document.getElementById('version-badge');
    const footerVersion = document.getElementById('footer-version');
    if (versionBadge) versionBadge.textContent = 'v0.2.0 - Dark Mode Enabled';
    if (footerVersion) footerVersion.textContent = 'v0.2.0';
  }
}

// Replay animation helper
function replayAnimation(element, animationName) {
  element.style.animation = 'none';
  element.offsetHeight; // Trigger reflow
  element.style.animation = `${animationName} ${animationName === 'shake' ? '400ms' : '600ms'} ease both`;
}

// Ink spread demo
function triggerInkSpread(container) {
  const demo = container.querySelector('.ink-spread-demo');
  if (!demo) return;

  // Remove existing circle if any
  demo.innerHTML = '';

  const circle = document.createElement('div');
  circle.style.cssText = `
    width: 3rem;
    height: 3rem;
    background: var(--accent-primary);
    opacity: 0.6;
    border-radius: 50%;
    animation: inkSpread 600ms cubic-bezier(0.4, 0, 0.2, 1) forwards;
  `;
  demo.appendChild(circle);

  // Clean up after animation
  setTimeout(() => {
    demo.innerHTML = '';
  }, 700);
}

// Initialize on page load
initTheme();

document.addEventListener('DOMContentLoaded', () => {
  updateContrastTable();
  updateSwatchBadges();
  loadVersion();
});

// Expose functions globally for onclick handlers
window.toggleTheme = toggleTheme;
window.replayAnimation = replayAnimation;
window.triggerInkSpread = triggerInkSpread;
