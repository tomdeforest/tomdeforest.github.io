// Font Preview Functionality
document.addEventListener('DOMContentLoaded', function() {
  // Get font data from window object
  const fontData = window.fontPreviewData || {};
  const fontName = fontData.fontName;
  const fontFilesData = fontData.fontFiles;
  const fontFile = fontData.fontFile;
  const fontWeightsStr = fontData.fontWeights || 'Regular';

  if (!fontName) {
    console.warn('Font preview: Missing font-name in front matter');
    return;
  }

  // Support both old single-file format and new multi-file array format
  let fontFiles = [];
  if (fontFilesData && Array.isArray(fontFilesData) && fontFilesData.length > 0) {
    fontFiles = fontFilesData;
  } else if (fontFile) {
    fontFiles = [{ path: fontFile, weight: 'Regular' }];
  } else {
    console.warn('Font preview: Missing font-file or font-files in front matter');
    return;
  }

  // Parse font weights
  const fontWeights = fontWeightsStr.split(',').map(w => w.trim()).filter(w => w);

  // Get DOM elements
  const previewText = document.getElementById('font-preview-text');
  const previewDisplay = document.getElementById('font-preview-display');
  const fontSizeSlider = document.getElementById('font-size-slider');
  const fontSizeDisplay = document.getElementById('font-size-display');
  const fontWeightSelect = document.getElementById('font-weight-select');
  const themeToggle = document.getElementById('theme-toggle');

  // Font is already loaded by inline script in layout
  // Just ensure the font is applied to preview display
  if (previewDisplay) {
    const defaultWeight = fontFiles[0].weight || 'Regular';
    const fontFamilyName = `'${fontName}-${defaultWeight}', monospace`;
    previewDisplay.style.fontFamily = fontFamilyName;
  }

  // Text input handler
  if (previewText && previewDisplay) {
    previewText.addEventListener('input', function() {
      previewDisplay.textContent = this.value || '\u00A0';
    });

    // Allow selecting/highlighting text in the preview
    previewDisplay.addEventListener('mouseup', function() {
      const selection = window.getSelection();
      if (selection.toString().length > 0) {
        previewText.select();
      }
    });
  }

  // Font size slider handler
  if (fontSizeSlider && fontSizeDisplay && previewDisplay) {
    fontSizeSlider.addEventListener('input', function() {
      const size = this.value;
      fontSizeDisplay.textContent = size;
      previewDisplay.style.fontSize = size + 'px';
    });
  }

  // Font weight handler - switches between different font files
  if (fontWeightSelect && previewDisplay) {
    fontWeightSelect.addEventListener('change', function() {
      const selectedWeight = this.value;
      applyFontWeight(selectedWeight, fontName);
    });
  }

  // Theme toggle handler - uses site's dark mode functionality
  if (themeToggle) {
    themeToggle.addEventListener('click', function() {
      toggleTheme();
    });

    // Update button appearance based on current theme
    updateThemeButtonAppearance();
  }

  function toggleTheme() {
    const html = document.documentElement;
    
    if (html.classList.contains('dark-mode')) {
      html.classList.remove('dark-mode');
      localStorage.removeItem("theme");
      html.removeAttribute("dark");
    } else {
      html.classList.add('dark-mode');
      localStorage.setItem("theme", "dark");
      html.setAttribute("dark", "");
    }

    // Update button appearance
    updateThemeButtonAppearance();
  }

  function updateThemeButtonAppearance() {
    if (!themeToggle) return;

    const isDarkMode = document.documentElement.classList.contains('dark-mode');
    const icon = themeToggle.querySelector('.theme-icon');
    const label = themeToggle.querySelector('.theme-label');
    
    if (isDarkMode) {
      icon.className = 'fa-solid fa-sun theme-icon';
      label.textContent = 'Light Mode';
    } else {
      icon.className = 'fa-solid fa-moon theme-icon';
      label.textContent = 'Dark Mode';
    }
  }

  function loadFont(fontPath, name, weights) {
    // Font is already loaded by inline script in layout
    // Now just apply it to the preview display
    if (previewDisplay) {
      previewDisplay.style.fontFamily = `'${name}', monospace`;
    }
  }

  function getWeightNumber(weight) {
    const weightMap = {
      'thin': 100,
      'extralight': 200,
      'light': 300,
      'regular': 400,
      'medium': 500,
      'semibold': 600,
      'bold': 700,
      'extrabold': 800,
      'black': 900
    };

    const normalized = weight.toLowerCase().replace(/\s+/g, '');
    return weightMap[normalized] || 400;
  }

  function applyFontWeight(selectedWeight, fontName) {
    // Switch to the unique font-family for this weight/style
    if (previewDisplay) {
      const fontFamilyName = `'${fontName}-${selectedWeight}', monospace`;
      previewDisplay.style.fontFamily = fontFamilyName;
    }
  }
});
