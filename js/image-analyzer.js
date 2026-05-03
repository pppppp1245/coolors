/* ========================================
   image-analyzer.js — Image Color Extraction
   ======================================== */

// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', () => {
  initImageAnalyzer();
});

function initImageAnalyzer() {
  // DOM Elements
  const uploadArea = document.getElementById('uploadArea');
  const fileInput = document.getElementById('fileInput');
  const imagePreview = document.getElementById('imagePreview');
  const previewImage = document.getElementById('previewImage');
  const removeBtn = document.getElementById('removeBtn');
  const controls = document.getElementById('controls');
  const colorCount = document.getElementById('colorCount');
  const colorCountValue = document.getElementById('colorCountValue');
  const extractBtn = document.getElementById('extractBtn');
  const palette = document.getElementById('palette');
  const paletteGrid = document.getElementById('paletteGrid');

  // Check if all elements exist
  if (!uploadArea || !fileInput || !imagePreview || !previewImage || !removeBtn || !controls || !colorCount || !colorCountValue || !extractBtn || !palette || !paletteGrid) {
    console.error('Some DOM elements are missing');
    return;
  }

  // Mobile Menu Toggle
  const menuToggle = document.querySelector('.header__menu-toggle');
  const mobileMenu = document.querySelector('.mobile-menu');

  if (menuToggle) {
    menuToggle.addEventListener('click', () => {
      menuToggle.classList.toggle('active');
      mobileMenu.classList.toggle('active');
      document.body.style.overflow = mobileMenu.classList.contains('active') ? 'hidden' : '';
    });

    mobileMenu.querySelectorAll('.mobile-menu__link').forEach(link => {
      link.addEventListener('click', () => {
        menuToggle.classList.remove('active');
        mobileMenu.classList.remove('active');
        document.body.style.overflow = '';
      });
    });
  }

  // Upload Area Events
  uploadArea.addEventListener('click', () => fileInput.click());

  uploadArea.addEventListener('dragover', (e) => {
    e.preventDefault();
    uploadArea.classList.add('dragover');
  });

  uploadArea.addEventListener('dragleave', () => {
    uploadArea.classList.remove('dragover');
  });

  uploadArea.addEventListener('drop', (e) => {
    e.preventDefault();
    uploadArea.classList.remove('dragover');
    const file = e.dataTransfer.files[0];
    if (file && file.type.startsWith('image/')) {
      handleImageUpload(file);
    }
  });

  fileInput.addEventListener('change', (e) => {
    const file = e.target.files[0];
    if (file) {
      handleImageUpload(file);
    }
  });

  // Handle Image Upload
  function handleImageUpload(file) {
    const reader = new FileReader();
    reader.onload = (e) => {
      previewImage.src = e.target.result;

      // Wait for image to fully load
      previewImage.onload = () => {
        uploadArea.hidden = true;
        imagePreview.hidden = false;
        controls.hidden = false;
        palette.hidden = true;
      };

      previewImage.onerror = () => {
        // Silent error - no alert shown
      };
    };
    reader.readAsDataURL(file);
  }

  // Remove Image
  removeBtn.addEventListener('click', () => {
    previewImage.src = '';
    fileInput.value = '';
    uploadArea.hidden = false;
    imagePreview.hidden = true;
    controls.hidden = true;
    palette.hidden = true;
    paletteGrid.innerHTML = '';
  });

  // Slider Value Update - Only update display, no auto-extraction
  colorCount.addEventListener('input', (e) => {
    colorCountValue.textContent = e.target.value;
  });

  // Extract Button Click
  extractBtn.addEventListener('click', () => {
    extractColors();
  });

  function extractColors() {
    if (!previewImage.src || imagePreview.hidden) {
      alert('Please upload an image first');
      return;
    }

    // Check if image is fully loaded
    if (!previewImage.complete || previewImage.naturalWidth === 0 || previewImage.naturalHeight === 0) {
      alert('Image is still loading. Please wait a moment and try again.');
      return;
    }

    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');

    // Limit canvas size for performance (max 800px)
    let width = previewImage.naturalWidth;
    let height = previewImage.naturalHeight;
    const maxSize = 800;

    if (width > maxSize || height > maxSize) {
      const ratio = Math.min(maxSize / width, maxSize / height);
      width = Math.floor(width * ratio);
      height = Math.floor(height * ratio);
    }

    canvas.width = width;
    canvas.height = height;

    // Draw the image to canvas
    ctx.drawImage(previewImage, 0, 0, width, height);

    try {
      // Get pixel data
      const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
      const colors = extractDominantColors(imageData.data, canvas.width, canvas.height, parseInt(colorCount.value));

      if (colors.length === 0) {
        alert('Could not extract colors from this image. Please try another image.');
        return;
      }

      displayPalette(colors);
    } catch (error) {
      console.error('Error extracting colors:', error);
      alert('Error extracting colors. Please try another image.');
    }
  }

  // Extract Dominant Colors using Advanced Median Cut with Smart Filtering
  function extractDominantColors(pixels, width, height, colorCount) {
    const colors = [];
    const totalPixels = width * height;
    const sampleStep = Math.max(1, Math.floor(totalPixels / 40000));

    // Sample pixels with smart filtering
    for (let i = 0; i < pixels.length; i += 4 * sampleStep) {
      const r = pixels[i];
      const g = pixels[i + 1];
      const b = pixels[i + 2];
      const a = pixels[i + 3];

      // Skip fully transparent pixels
      if (a < 128) continue;

      // Filter out background colors (very light or very dark grays)
      const brightness = (r + g + b) / 3;
      const rDiff = Math.abs(r - g) + Math.abs(g - b) + Math.abs(b - r);

      // Skip very light colors (>220) and very dark colors (<25)
      if (brightness > 220 || brightness < 25) continue;

      // Skip near-gray colors (low saturation) unless they're part of main subjects
      const maxC = Math.max(r, g, b);
      const minC = Math.min(r, g, b);
      const saturation = maxC === 0 ? 0 : (maxC - minC) / maxC;

      // More aggressive filtering of grayish background colors
      if (rDiff < 30 && saturation < 0.2) continue;

      colors.push([r, g, b]);
    }

    if (colors.length === 0) {
      return [{ hex: '#667eea' }];
    }

    // Apply enhanced Median Cut
    const buckets = medianCut(colors, Math.min(colorCount, colors.length));

    // Calculate average color and get results
    const result = buckets.map(bucket => {
      if (bucket.length === 0) return null;

      const avg = {
        r: Math.round(bucket.reduce((sum, c) => sum + c[0], 0) / bucket.length),
        g: Math.round(bucket.reduce((sum, c) => sum + c[1], 0) / bucket.length),
        b: Math.round(bucket.reduce((sum, c) => sum + c[2], 0) / bucket.length),
        count: bucket.length
      };

      return {
        hex: rgbToHex(avg.r, avg.g, avg.b),
        count: avg.count
      };
    }).filter(item => item !== null);

    // Sort by count (most dominant first) and then by saturation
    result.sort((a, b) => {
      const [rA, gA, bA] = hexToRgb(a.hex);
      const [rB, gB, bB] = hexToRgb(b.hex);

      const satA = getSaturation(rA, gA, bA);
      const satB = getSaturation(rB, gB, bB);

      // Prioritize higher saturation (more vivid colors)
      if (satA !== satB) return satB - satA;
      return b.count - a.count;
    });

    return result;
  }

  // Helper: Get saturation of a color
  function getSaturation(r, g, b) {
    const maxC = Math.max(r, g, b);
    const minC = Math.min(r, g, b);
    return maxC === 0 ? 0 : (maxC - minC) / maxC;
  }

  // Helper: Convert hex to RGB
  function hexToRgb(hex) {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? [
      parseInt(result[1], 16),
      parseInt(result[2], 16),
      parseInt(result[3], 16)
    ] : [0, 0, 0];
  }

  // Median Cut Algorithm - Optimal color quantization
  function medianCut(colors, maxColors) {
    let buckets = [colors.slice()];

    // Iteratively divide color space by the axis with maximum range
    while (buckets.length < maxColors && buckets.some(b => b.length > 1)) {
      // Find bucket with largest color range
      let largestIdx = 0;
      let largestRange = 0;

      buckets.forEach((bucket, idx) => {
        if (bucket.length <= 1) return;

        const rRange = Math.max(...bucket.map(c => c[0])) - Math.min(...bucket.map(c => c[0]));
        const gRange = Math.max(...bucket.map(c => c[1])) - Math.min(...bucket.map(c => c[1]));
        const bRange = Math.max(...bucket.map(c => c[2])) - Math.min(...bucket.map(c => c[2]));

        // Weight each channel by perceptual importance
        const range = rRange * 0.3 + gRange * 0.59 + bRange * 0.11;
        if (range > largestRange) {
          largestRange = range;
          largestIdx = idx;
        }
      });

      const bucket = buckets[largestIdx];
      if (bucket.length <= 1) break;

      // Calculate range for each channel
      const rRange = Math.max(...bucket.map(c => c[0])) - Math.min(...bucket.map(c => c[0]));
      const gRange = Math.max(...bucket.map(c => c[1])) - Math.min(...bucket.map(c => c[1]));
      const bRange = Math.max(...bucket.map(c => c[2])) - Math.min(...bucket.map(c => c[2]));

      // Find axis with maximum range
      let axis = 0;
      if (rRange >= gRange && rRange >= bRange) axis = 0;
      else if (gRange >= rRange && gRange >= bRange) axis = 1;
      else axis = 2;

      // Sort by selected axis and split in half
      bucket.sort((a, b) => a[axis] - b[axis]);
      const mid = Math.floor(bucket.length / 2);
      const newBucket = bucket.splice(mid);

      buckets.push(newBucket);
    }

    return buckets;
  }

  // RGB to Hex
  function rgbToHex(r, g, b) {
    return '#' + [r, g, b].map(x => {
      const hex = Math.round(x).toString(16);
      return hex.length === 1 ? '0' + hex : hex;
    }).join('').toUpperCase();
  }

  // Display Palette
  function displayPalette(colors) {
    paletteGrid.innerHTML = '';

    colors.forEach((item, index) => {
      const colorEl = document.createElement('div');
      colorEl.className = 'palette__color';
      colorEl.style.backgroundColor = item.hex;
      colorEl.style.animationDelay = `${index * 0.1}s`;

      const infoEl = document.createElement('div');
      infoEl.className = 'palette__info';

      const hexEl = document.createElement('span');
      hexEl.className = 'palette__hex';
      hexEl.textContent = item.hex;

      infoEl.appendChild(hexEl);

      colorEl.appendChild(infoEl);

      colorEl.addEventListener('click', () => {
        navigator.clipboard.writeText(item.hex).then(() => {
          hexEl.textContent = 'Copied!';
          setTimeout(() => {
            hexEl.textContent = item.hex;
          }, 1000);
        });
      });

      paletteGrid.appendChild(colorEl);
    });

    palette.hidden = false;
  }
}
