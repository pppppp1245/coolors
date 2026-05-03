/* ========================================
   color-combinations.js — Color Combinations Logic
   ======================================== */

// Color Combinations Data (Background + Text pairs with unique colorful text)
const colorCombinations = [
  { bg: '#FFD700', text: '#FF1493' },
  { bg: '#32CD32', text: '#FF69B4' },
  { bg: '#87CEEB', text: '#FF4500' },
  { bg: '#DDA0DD', text: '#00CED1' },
  { bg: '#FFA500', text: '#9370DB' },
  { bg: '#98FB98', text: '#FF6347' },
  { bg: '#FFB6C1', text: '#006400' },
  { bg: '#40E0D0', text: '#FF00FF' },
  { bg: '#F0E68C', text: '#8B0000' },
  { bg: '#ADD8E6', text: '#C71585' },
  { bg: '#FF69B4', text: '#008B8B' },
  { bg: '#90EE90', text: '#8B008B' },
  { bg: '#FFC0CB', text: '#4B0082' },
  { bg: '#87CEFA', text: '#DC143C' },
  { bg: '#FFDAB9', text: '#800080' },
  { bg: '#E0FFFF', text: '#B22222' },
  { bg: '#FFE4E1', text: '#008000' },
  { bg: '#F5DEB3', text: '#9932CC' },
  { bg: '#DEB887', text: '#FF00FF' },
  { bg: '#D2691E', text: '#00CED1' },
  { bg: '#CD853F', text: '#FF69B4' },
  { bg: '#BC8F8F', text: '#9370DB' },
  { bg: '#8B4513', text: '#40E0D0' },
  { bg: '#A0522D', text: '#FF1493' },
  { bg: '#FF6B6B', text: '#20B2AA' },
  { bg: '#4ECDC4', text: '#FF00FF' },
  { bg: '#45B7D1', text: '#FF69B4' },
  { bg: '#96CEB4', text: '#8B008B' },
  { bg: '#FFEAA7', text: '#9370DB' },
  { bg: '#98D8C8', text: '#FF4500' },
  { bg: '#F7DC6F', text: '#8B0000' },
  { bg: '#BB8FCE', text: '#00CED1' },
  { bg: '#85C1E9', text: '#FF1493' },
  { bg: '#F8B500', text: '#FF00FF' },
  { bg: '#FF7F50', text: '#006400' },
  { bg: '#00CED1', text: '#FF69B4' },
  { bg: '#FF69B4', text: '#008000' },
  { bg: '#32CD32', text: '#FF00FF' },
  { bg: '#FFD700', text: '#8B008B' },
  { bg: '#FF4500', text: '#00CED1' },
  { bg: '#8A2BE2', text: '#FFD700' },
  { bg: '#00FA9A', text: '#FF1493' },
  { bg: '#FF1493', text: '#00CED1' },
  { bg: '#00BFFF', text: '#FF69B4' },
  { bg: '#FF8C00', text: '#9370DB' },
  { bg: '#9370DB', text: '#FFD700' },
  { bg: '#20B2AA', text: '#FF1493' },
  { bg: '#FF6347', text: '#00CED1' },
  { bg: '#7B68EE', text: '#FFD700' },
  { bg: '#48D1CC', text: '#FF69B4' },
  { bg: '#FFA07A', text: '#8B008B' },
  { bg: '#87CEEB', text: '#FF00FF' },
  { bg: '#FFB6C1', text: '#006400' },
  { bg: '#98FB98', text: '#8B0000' },
  { bg: '#F0E68C', text: '#FF1493' },
  { bg: '#E6E6FA', text: '#9370DB' },
  { bg: '#FFA500', text: '#00CED1' },
  { bg: '#FF6347', text: '#FF00FF' },
  { bg: '#40E0D0', text: '#8B008B' },
  { bg: '#EE82EE', text: '#006400' },
  { bg: '#90EE90', text: '#FF1493' },
  { bg: '#FFC0CB', text: '#9370DB' },
  { bg: '#87CEFA', text: '#FF4500' },
  { bg: '#FFDAB9', text: '#00CED1' },
  { bg: '#E0FFFF', text: '#FF69B4' },
  { bg: '#FFE4E1', text: '#8B008B' },
  { bg: '#F5DEB3', text: '#FF00FF' },
  { bg: '#DEB887', text: '#006400' },
  { bg: '#D2691E', text: '#FF1493' },
  { bg: '#CD853F', text: '#9370DB' },
  { bg: '#BC8F8F', text: '#FF4500' },
  { bg: '#8B4513', text: '#00CED1' },
  { bg: '#A0522D', text: '#FF69B4' },
  { bg: '#800000', text: '#FFD700' },
  { bg: '#8B0000', text: '#00CED1' },
  { bg: '#B22222', text: '#FF69B4' },
  { bg: '#DC143C', text: '#FFD700' },
  { bg: '#FF0000', text: '#00CED1' },
  { bg: '#FF4500', text: '#FF69B4' },
  { bg: '#FF6347', text: '#FFD700' },
  { bg: '#FF7F50', text: '#00CED1' },
  { bg: '#FFA500', text: '#FF69B4' },
  { bg: '#FFD700', text: '#00CED1' },
  { bg: '#FFFF00', text: '#FF1493' },
  { bg: '#ADFF2F', text: '#9370DB' },
  { bg: '#7FFF00', text: '#FF4500' },
  { bg: '#00FF00', text: '#FF69B4' },
  { bg: '#00FA9A', text: '#8B008B' },
  { bg: '#00FFFF', text: '#FF1493' },
  { bg: '#00BFFF', text: '#FF69B4' },
  { bg: '#1E90FF', text: '#FFD700' },
  { bg: '#4169E1', text: '#00CED1' },
  { bg: '#0000FF', text: '#FF69B4' },
  { bg: '#8A2BE2', text: '#FFD700' },
  { bg: '#9400D3', text: '#00CED1' },
  { bg: '#8B008B', text: '#FF69B4' },
  { bg: '#800080', text: '#FFD700' },
  { bg: '#FF00FF', text: '#00CED1' },
  { bg: '#FF1493', text: '#FF69B4' },
  { bg: '#C71585', text: '#FFD700' },
  { bg: '#DB7093', text: '#00CED1' },
  { bg: '#FF69B4', text: '#FFD700' },
  { bg: '#FFB6C1', text: '#00CED1' },
  { bg: '#FFC0CB', text: '#FF69B4' },
  { bg: '#FFE4E1', text: '#8B008B' },
  { bg: '#FFF0F5', text: '#FF1493' },
  { bg: '#FFA07A', text: '#9370DB' },
  { bg: '#FF7F50', text: '#00CED1' },
  { bg: '#FF6347', text: '#FF69B4' },
  { bg: '#FF4500', text: '#FFD700' },
  { bg: '#FFA500', text: '#00CED1' },
  { bg: '#FFD700', text: '#FF69B4' },
  { bg: '#FFFF00', text: '#8B008B' },
  { bg: '#ADFF2F', text: '#FF1493' },
  { bg: '#7FFF00', text: '#9370DB' },
  { bg: '#00FF00', text: '#FF4500' },
  { bg: '#00FA9A', text: '#FF69B4' },
  { bg: '#00FFFF', text: '#8B008B' },
  { bg: '#00BFFF', text: '#FF1493' },
  { bg: '#1E90FF', text: '#FF69B4' },
  { bg: '#4169E1', text: '#FFD700' },
  { bg: '#0000FF', text: '#00CED1' },
  { bg: '#8A2BE2', text: '#FF69B4' },
  { bg: '#9400D3', text: '#FFD700' },
  { bg: '#8B008B', text: '#00CED1' },
  { bg: '#800080', text: '#FF69B4' },
  { bg: '#FF00FF', text: '#FFD700' },
  { bg: '#FF1493', text: '#00CED1' },
  { bg: '#C71585', text: '#FF69B4' },
  { bg: '#DB7093', text: '#FFD700' },
  { bg: '#FF69B4', text: '#00CED1' },
  { bg: '#FFB6C1', text: '#FF69B4' },
  { bg: '#FFC0CB', text: '#8B008B' },
  { bg: '#FFE4E1', text: '#FF1493' },
  { bg: '#FFF0F5', text: '#9370DB' },
  { bg: '#FFF5EE', text: '#00CED1' },
  { bg: '#FFEFD5', text: '#FF69B4' },
  { bg: '#FFEBCD', text: '#FFD700' },
  { bg: '#FFDAB9', text: '#00CED1' },
  { bg: '#FFE4C4', text: '#FF69B4' },
  { bg: '#FFDEAD', text: '#8B008B' },
  { bg: '#FFD7BA', text: '#FF1493' },
  { bg: '#FFCBA4', text: '#9370DB' },
  { bg: '#FFBF94', text: '#00CED1' },
  { bg: '#FFB378', text: '#FF69B4' },
  { bg: '#FFA75C', text: '#FFD700' },
  { bg: '#FF9B40', text: '#00CED1' },
  { bg: '#FF8F24', text: '#FF69B4' },
  { bg: '#FF8308', text: '#8B008B' },
  { bg: '#FF7700', text: '#FF1493' },
  { bg: '#FF6B00', text: '#9370DB' },
  { bg: '#FF5F00', text: '#00CED1' },
  { bg: '#FF5300', text: '#FF69B4' },
  { bg: '#FF4700', text: '#FFD700' },
  { bg: '#FF3B00', text: '#00CED1' },
  { bg: '#FF2F00', text: '#FF69B4' },
  { bg: '#FF2300', text: '#8B008B' },
  { bg: '#FF1700', text: '#FF1493' },
  { bg: '#FF0B00', text: '#9370DB' },
  { bg: '#FF0000', text: '#00CED1' },
  { bg: '#F00000', text: '#FF69B4' },
  { bg: '#E00000', text: '#FFD700' },
  { bg: '#D00000', text: '#00CED1' },
  { bg: '#C00000', text: '#FF69B4' },
  { bg: '#B00000', text: '#8B008B' },
  { bg: '#A00000', text: '#FF1493' },
  { bg: '#900000', text: '#9370DB' },
  { bg: '#800000', text: '#00CED1' },
  { bg: '#700000', text: '#FF69B4' },
  { bg: '#600000', text: '#FFD700' },
  { bg: '#500000', text: '#00CED1' },
  { bg: '#400000', text: '#FF69B4' },
  { bg: '#300000', text: '#8B008B' },
  { bg: '#200000', text: '#FF1493' },
  { bg: '#100000', text: '#9370DB' },
  { bg: '#E6E6FA', text: '#FF69B4' },
  { bg: '#D8BFD8', text: '#00CED1' },
  { bg: '#DDA0DD', text: '#FFD700' },
  { bg: '#EE82EE', text: '#00CED1' },
  { bg: '#DA70D6', text: '#FF69B4' },
  { bg: '#9932CC', text: '#FFD700' },
  { bg: '#BA55D3', text: '#00CED1' },
  { bg: '#8B008B', text: '#FF69B4' },
  { bg: '#800080', text: '#FFD700' },
  { bg: '#4B0082', text: '#00CED1' },
  { bg: '#9400D3', text: '#FF69B4' },
  { bg: '#8A2BE2', text: '#FFD700' },
  { bg: '#7B68EE', text: '#00CED1' },
  { bg: '#6A5ACD', text: '#FF69B4' },
  { bg: '#483D8B', text: '#FFD700' },
  { bg: '#4169E1', text: '#00CED1' },
  { bg: '#0000FF', text: '#FF69B4' },
  { bg: '#000080', text: '#FFD700' },
  { bg: '#191970', text: '#00CED1' },
  { bg: '#00008B', text: '#FF69B4' },
  { bg: '#0000CD', text: '#FFD700' },
  { bg: '#1E90FF', text: '#00CED1' },
  { bg: '#6495ED', text: '#FF69B4' },
  { bg: '#87CEEB', text: '#FFD700' },
  { bg: '#87CEFA', text: '#00CED1' },
  { bg: '#00BFFF', text: '#FF69B4' },
  { bg: '#ADD8E6', text: '#FFD700' },
  { bg: '#B0C4DE', text: '#00CED1' },
  { bg: '#778899', text: '#FF69B4' },
  { bg: '#708090', text: '#FFD700' },
  { bg: '#5F9EA0', text: '#00CED1' },
  { bg: '#4682B4', text: '#FF69B4' },
  { bg: '#20B2AA', text: '#FFD700' },
  { bg: '#00CED1', text: '#00CED1' },
  { bg: '#40E0D0', text: '#FF69B4' },
  { bg: '#48D1CC', text: '#FFD700' },
  { bg: '#00FFFF', text: '#00CED1' },
  { bg: '#E0FFFF', text: '#FF69B4' },
  { bg: '#AFEEEE', text: '#FFD700' },
  { bg: '#7FFFD4', text: '#00CED1' },
  { bg: '#66CDAA', text: '#FF69B4' },
  { bg: '#8FBC8F', text: '#FFD700' },
  { bg: '#3CB371', text: '#00CED1' },
  { bg: '#2E8B57', text: '#FF69B4' },
  { bg: '#228B22', text: '#FFD700' },
  { bg: '#006400', text: '#00CED1' },
  { bg: '#008000', text: '#FF69B4' },
  { bg: '#32CD32', text: '#FFD700' },
  { bg: '#90EE90', text: '#00CED1' },
  { bg: '#98FB98', text: '#FF69B4' },
  { bg: '#00FA9A', text: '#FFD700' },
  { bg: '#00FF7F', text: '#00CED1' },
  { bg: '#ADFF2F', text: '#FF69B4' },
  { bg: '#7FFF00', text: '#FFD700' },
  { bg: '#00FF00', text: '#00CED1' },
  { bg: '#FFFF00', text: '#FF69B4' },
  { bg: '#FFD700', text: '#FFD700' },
  { bg: '#FFA500', text: '#00CED1' },
  { bg: '#FF8C00', text: '#FF69B4' },
  { bg: '#FF7F50', text: '#FFD700' },
  { bg: '#FF6347', text: '#00CED1' },
  { bg: '#FF4500', text: '#FF69B4' },
  { bg: '#FF0000', text: '#FFD700' },
  { bg: '#DC143C', text: '#00CED1' },
  { bg: '#B22222', text: '#FF69B4' },
  { bg: '#8B0000', text: '#FFD700' },
  { bg: '#800000', text: '#00CED1' },
  { bg: '#A0522D', text: '#FF69B4' },
  { bg: '#8B4513', text: '#FFD700' },
  { bg: '#CD853F', text: '#00CED1' },
  { bg: '#D2691E', text: '#FF69B4' },
  { bg: '#BC8F8F', text: '#FFD700' },
  { bg: '#F4A460', text: '#00CED1' },
  { bg: '#DEB887', text: '#FF69B4' },
  { bg: '#D2B48C', text: '#FFD700' },
  { bg: '#FFE4C4', text: '#00CED1' },
  { bg: '#FFDAB9', text: '#FF69B4' },
  { bg: '#FFE4B5', text: '#FFD700' },
  { bg: '#FFDEAD', text: '#00CED1' },
  { bg: '#FFEFD5', text: '#FF69B4' },
  { bg: '#FFF8DC', text: '#FFD700' },
  { bg: '#FFFACD', text: '#00CED1' },
  { bg: '#FAFAD2', text: '#FF69B4' },
  { bg: '#FFFFE0', text: '#FFD700' },
  { bg: '#FFFFF0', text: '#00CED1' },
  { bg: '#F0FFF0', text: '#FF69B4' },
  { bg: '#F5FFFA', text: '#FFD700' },
  { bg: '#FFF0F5', text: '#00CED1' },
  { bg: '#FFF5EE', text: '#FF69B4' },
  { bg: '#F5F5F5', text: '#FFD700' },
  { bg: '#FAFAFA', text: '#00CED1' },
  { bg: '#FFFAFA', text: '#FF69B4' },
  { bg: '#F8F8FF', text: '#FFD700' },
  { bg: '#F0F8FF', text: '#00CED1' },
  { bg: '#FFFAF0', text: '#FF69B4' },
  { bg: '#FFEFDB', text: '#FFD700' },
  { bg: '#FDF5E6', text: '#00CED1' },
  { bg: '#FAEBD7', text: '#FF69B4' },
  { bg: '#FFEFD5', text: '#FFD700' },
  { bg: '#FFEBCD', text: '#00CED1' },
  { bg: '#FFE4C4', text: '#FF69B4' },
  { bg: '#FFDEAD', text: '#FFD700' },
  { bg: '#FFDAB9', text: '#00CED1' },
  { bg: '#FFC0CB', text: '#FF69B4' },
  { bg: '#FFB6C1', text: '#FFD700' },
  { bg: '#FFA07A', text: '#00CED1' },
  { bg: '#FF7F50', text: '#FF69B4' },
  { bg: '#FF6347', text: '#FFD700' },
  { bg: '#FF4500', text: '#00CED1' },
  { bg: '#FFA500', text: '#FF69B4' },
  { bg: '#FFD700', text: '#FFD700' },
  { bg: '#FFFF00', text: '#00CED1' },
  { bg: '#ADFF2F', text: '#FF69B4' },
  { bg: '#7FFF00', text: '#FFD700' },
  { bg: '#00FF00', text: '#00CED1' },
  { bg: '#00FA9A', text: '#FF69B4' },
  { bg: '#00FFFF', text: '#FFD700' },
  { bg: '#00BFFF', text: '#00CED1' },
  { bg: '#1E90FF', text: '#FF69B4' },
  { bg: '#4169E1', text: '#FFD700' },
  { bg: '#0000FF', text: '#00CED1' },
  { bg: '#8A2BE2', text: '#FF69B4' },
  { bg: '#9400D3', text: '#FFD700' },
  { bg: '#8B008B', text: '#00CED1' },
  { bg: '#800080', text: '#FF69B4' },
  { bg: '#FF00FF', text: '#FFD700' },
  { bg: '#FF1493', text: '#00CED1' },
  { bg: '#C71585', text: '#FF69B4' },
  { bg: '#DB7093', text: '#FFD700' },
  { bg: '#FF69B4', text: '#00CED1' },
  { bg: '#FFB6C1', text: '#FF69B4' },
  { bg: '#FFC0CB', text: '#FFD700' },
  { bg: '#FFE4E1', text: '#00CED1' },
  { bg: '#FFF0F5', text: '#FF69B4' }
];

// DOM Elements
const customTextInput = document.getElementById('customText');
const combinationsGrid = document.getElementById('combinationsGrid');

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

// Copy to Clipboard
function copyToClipboard(text) {
  navigator.clipboard.writeText(text).then(() => {
    return true;
  });
}

// Render Combinations
function renderCombinations() {
  const text = customTextInput.value || 'Hello World';
  combinationsGrid.innerHTML = '';
  
  colorCombinations.forEach((combo, index) => {
    const card = document.createElement('div');
    card.className = 'combination-card';
    
    const preview = document.createElement('div');
    preview.className = 'combination-card__preview';
    preview.style.backgroundColor = combo.bg;
    preview.style.color = combo.text;
    
    const textEl = document.createElement('div');
    textEl.className = 'combination-card__text';
    textEl.textContent = text;
    
    preview.appendChild(textEl);
    
    const actions = document.createElement('div');
    actions.className = 'combination-card__actions';
    
    const bgAction = document.createElement('button');
    bgAction.className = 'combination-card__action combination-card__action--bg';
    bgAction.innerHTML = `Background<span class="combination-card__hex">${combo.bg}</span>`;
    bgAction.addEventListener('click', (e) => {
      e.stopPropagation();
      copyToClipboard(combo.bg);
      bgAction.innerHTML = `Copied!<span class="combination-card__hex">${combo.bg}</span>`;
      setTimeout(() => {
        bgAction.innerHTML = `Background<span class="combination-card__hex">${combo.bg}</span>`;
      }, 1000);
    });
    
    const textAction = document.createElement('button');
    textAction.className = 'combination-card__action combination-card__action--text';
    textAction.innerHTML = `Text<span class="combination-card__hex">${combo.text}</span>`;
    textAction.addEventListener('click', (e) => {
      e.stopPropagation();
      copyToClipboard(combo.text);
      textAction.innerHTML = `Copied!<span class="combination-card__hex">${combo.text}</span>`;
      setTimeout(() => {
        textAction.innerHTML = `Text<span class="combination-card__hex">${combo.text}</span>`;
      }, 1000);
    });
    
    actions.appendChild(bgAction);
    actions.appendChild(textAction);
    
    card.appendChild(preview);
    card.appendChild(actions);
    
    // Hover effect
    card.addEventListener('mouseenter', () => {
      gsap.to(card, {
        scale: 1.02,
        y: -4,
        duration: 0.3,
        ease: 'power2.out'
      });
    });
    
    card.addEventListener('mouseleave', () => {
      gsap.to(card, {
        scale: 1,
        y: 0,
        duration: 0.3,
        ease: 'power2.out'
      });
    });
    
    combinationsGrid.appendChild(card);
  });
  
  // Animate cards
  gsap.from('.combination-card', {
    opacity: 0,
    y: 30,
    scale: 0.95,
    duration: 0.5,
    stagger: 0.05,
    ease: 'power3.out'
  });
}

// Text Input Change
customTextInput.addEventListener('input', () => {
  renderCombinations();
});

// Initialize
function init() {
  renderCombinations();
  
  // Header animation
  gsap.from('.color-combinations__header', {
    opacity: 0,
    y: 40,
    duration: 0.8,
    ease: 'power3.out'
  });
  
  // Text input animation
  gsap.from('.text-input', {
    opacity: 0,
    y: 30,
    duration: 0.6,
    ease: 'power3.out',
    delay: 0.2
  });
}

// Initialize on load
init();
