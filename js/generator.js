/* ========================================
   generator.js — Color Generator Logic
   ======================================== */

// DOM Elements
const palette = document.getElementById('palette');
const colorElements = [
  document.getElementById('color0'),
  document.getElementById('color1'),
  document.getElementById('color2'),
  document.getElementById('color3'),
  document.getElementById('color4')
];
const hexElements = [
  document.getElementById('hex0'),
  document.getElementById('hex1'),
  document.getElementById('hex2'),
  document.getElementById('hex3'),
  document.getElementById('hex4')
];
const lockButtons = document.querySelectorAll('.palette__lock');
const generateBtn = document.getElementById('generateBtn');
const copyAllBtn = document.getElementById('copyAllBtn');

// State
let colors = [];
let locked = [false, false, false, false, false];

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

// Generate Random Color
function generateRandomColor() {
  const letters = '0123456789ABCDEF';
  let color = '#';
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

// Generate Palette
function generatePalette() {
  colors = colors.map((color, index) => {
    if (locked[index]) return color;
    return generateRandomColor();
  });

  updatePalette();
}

// Update Palette UI
function updatePalette() {
  colorElements.forEach((el, index) => {
    el.style.backgroundColor = colors[index];
    hexElements[index].textContent = colors[index];
  });
}

// Lock/Unlock Color
function toggleLock(index) {
  locked[index] = !locked[index];
  lockButtons[index].classList.toggle('locked', locked[index]);

  // Animate lock icon
  gsap.to(lockButtons[index].querySelector('.palette__lock-icon'), {
    scale: locked[index] ? 1.2 : 1,
    duration: 0.2,
    yoyo: true,
    repeat: 1
  });
}

// Copy to Clipboard
function copyToClipboard(text) {
  navigator.clipboard.writeText(text).then(() => {
    // Show feedback
    return true;
  });
}

// Copy All Colors
function copyAllColors() {
  const allColors = colors.join('\n');
  copyToClipboard(allColors);

  // Button feedback
  const originalText = copyAllBtn.textContent;
  copyAllBtn.textContent = 'Copied!';
  gsap.to(copyAllBtn, {
    scale: 1.05,
    duration: 0.1,
    yoyo: true,
    repeat: 1
  });

  setTimeout(() => {
    copyAllBtn.textContent = originalText;
  }, 1000);
}

// Copy Single Color
function copySingleColor(index) {
  copyToClipboard(colors[index]);

  const hexEl = hexElements[index];
  const originalText = hexEl.textContent;
  hexEl.textContent = 'Copied!';

  gsap.to(hexEl, {
    scale: 1.1,
    duration: 0.1,
    yoyo: true,
    repeat: 1
  });

  setTimeout(() => {
    hexEl.textContent = originalText;
  }, 1000);
}

// Initialize
function init() {
  // Generate initial palette
  for (let i = 0; i < 5; i++) {
    colors.push(generateRandomColor());
  }
  updatePalette();

  // Animate initial load (Header only)
  gsap.from('.generator__header', {
    opacity: 0,
    y: 30,
    duration: 0.6,
    ease: 'power3.out'
  });

  gsap.from('.actions', {
    opacity: 0,
    y: 30,
    duration: 0.6,
    ease: 'power3.out',
    delay: 0.3
  });
}

// Event Listeners
lockButtons.forEach((btn, index) => {
  btn.addEventListener('click', (e) => {
    e.stopPropagation();
    toggleLock(index);
  });
});

colorElements.forEach((el, index) => {
  el.addEventListener('click', () => {
    copySingleColor(index);
  });
});

generateBtn.addEventListener('click', () => {
  generatePalette();
});

copyAllBtn.addEventListener('click', copyAllColors);

// Spacebar to generate
document.addEventListener('keydown', (e) => {
  if (e.code === 'Space' && e.target.tagName !== 'INPUT') {
    e.preventDefault();
    generatePalette();
  }
});

// Initialize on load
init();
