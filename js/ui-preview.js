/* ========================================
   ui-preview.js — UI Preview Logic
   ======================================== */

// DOM Elements
const buttonColor = document.getElementById('buttonColor');
const buttonColorValue = document.getElementById('buttonColorValue');
const buttonTextColor = document.getElementById('buttonTextColor');
const buttonTextColorValue = document.getElementById('buttonTextColorValue');
const cardColor = document.getElementById('cardColor');
const cardColorValue = document.getElementById('cardColorValue');
const cardTextColor = document.getElementById('cardTextColor');
const cardTextColorValue = document.getElementById('cardTextColorValue');

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

// Color Picker Synchronization
function syncColorPicker(input, valueSpan) {
  input.addEventListener('input', (e) => {
    valueSpan.textContent = e.target.value.toUpperCase();
    updatePreview();
  });
  
  valueSpan.addEventListener('click', () => {
    input.click();
  });
}

syncColorPicker(buttonColor, buttonColorValue);
syncColorPicker(buttonTextColor, buttonTextColorValue);
syncColorPicker(cardColor, cardColorValue);
syncColorPicker(cardTextColor, cardTextColorValue);

// Update Preview
function updatePreview() {
  // Update CSS variables
  document.documentElement.style.setProperty('--button-color', buttonColor.value);
  document.documentElement.style.setProperty('--button-text-color', buttonTextColor.value);
  document.documentElement.style.setProperty('--card-color', cardColor.value);
  document.documentElement.style.setProperty('--card-text-color', cardTextColor.value);
}

// Initialize
updatePreview();

// GSAP Animations
gsap.from('.ui-preview__header', {
  opacity: 0,
  y: 40,
  duration: 0.8,
  ease: 'power3.out'
});

gsap.from('.color-controls', {
  opacity: 0,
  y: 30,
  duration: 0.6,
  stagger: 0.1,
  ease: 'power3.out',
  delay: 0.2
});

gsap.from('.preview-section', {
  opacity: 0,
  y: 30,
  duration: 0.6,
  stagger: 0.1,
  ease: 'power3.out',
  delay: 0.4
});

// Hover micro interactions
document.querySelectorAll('.preview-btn').forEach(btn => {
  btn.addEventListener('mouseenter', () => {
    gsap.to(btn, {
      scale: 1.02,
      duration: 0.2,
      ease: 'power2.out'
    });
  });
  
  btn.addEventListener('mouseleave', () => {
    gsap.to(btn, {
      scale: 1,
      duration: 0.2,
      ease: 'power2.out'
    });
  });
});

document.querySelectorAll('.preview-card').forEach(card => {
  card.addEventListener('mouseenter', () => {
    gsap.to(card, {
      y: -4,
      duration: 0.3,
      ease: 'power2.out'
    });
  });
  
  card.addEventListener('mouseleave', () => {
    gsap.to(card, {
      y: 0,
      duration: 0.3,
      ease: 'power2.out'
    });
  });
});
