/* ========================================
   color-library.js — Color Library Logic
   ======================================== */

// Register ScrollTrigger
gsap.registerPlugin(ScrollTrigger);

// Helper: hex -> normalized rgb (0..1)
function hexToRgb(hex) {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return { r: r / 255, g: g / 255, b: b / 255 };
}

// Helper: rgb (0..1) -> hsl (h:0-360, s:0-1, l:0-1)
function rgbToHsl(r, g, b) {
  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  let h = 0;
  const l = (max + min) / 2;
  let s = 0;
  if (max !== min) {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    switch (max) {
      case r: h = (g - b) / d + (g < b ? 6 : 0); break;
      case g: h = (b - r) / d + 2; break;
      case b: h = (r - g) / d + 4; break;
    }
    h = h * 60;
  }
  return { h, s, l };
}

// Helper: hsl -> hex
function hslToHex(h, s, l) {
  h = ((h % 360) + 360) % 360;
  s = Math.max(0, Math.min(1, s));
  l = Math.max(0, Math.min(1, l));
  const c = (1 - Math.abs(2 * l - 1)) * s;
  const x = c * (1 - Math.abs(((h / 60) % 2) - 1));
  const m = l - c / 2;
  let r = 0, g = 0, b = 0;
  if (h < 60) { r = c; g = x; b = 0; }
  else if (h < 120) { r = x; g = c; b = 0; }
  else if (h < 180) { r = 0; g = c; b = x; }
  else if (h < 240) { r = 0; g = x; b = c; }
  else if (h < 300) { r = x; g = 0; b = c; }
  else { r = c; g = 0; b = x; }
  const R = Math.round((r + m) * 255);
  const G = Math.round((g + m) * 255);
  const B = Math.round((b + m) * 255);
  return '#' + [R, G, B].map(v => v.toString(16).padStart(2, '0')).join('').toUpperCase();
}

// Base hue map for main categories
const baseHue = {
  red: 0,
  orange: 30,
  yellow: 60,
  green: 140,
  blue: 220,
  purple: 280
};

// Palette generation configuration and density presets
const paletteConfig = {
  // default maximum cards to render
  maxCards: 60,
  // optional per-category overrides for max cards
  perCategoryMax: {
    red: 60,
    orange: 50,
    yellow: 60,
    green: 80,
    blue: 80,
    purple: 60,
    black: 70,
    white: 80
  },
  // density presets determine how many saturation/lightness steps are generated
  presets: {
    dense: {
      sats: [0.98,0.9,0.8,0.7,0.6,0.5,0.35,0.2],
      lights: [0.08,0.18,0.28,0.4,0.52,0.64,0.76,0.88]
    },
    sparse: {
      sats: [0.95,0.7,0.4],
      lights: [0.2,0.5,0.8]
    }
  },
  // choose active preset key ('dense' or 'sparse')
  activePreset: 'dense'
};

// Utility to switch density at runtime (exposed for manual tweaking)
function setDensity(presetKey) {
  if (paletteConfig.presets[presetKey]) {
    paletteConfig.activePreset = presetKey;
    // rebuild colorData with new density
    ['red','orange','yellow','green','blue','purple','black','white'].forEach(cat => {
      colorData[cat] = generatePalette(cat);
    });
    // re-render currently active category if grid exists
    if (categoryTabs && colorGrid) {
      const active = document.querySelector('.category-tab.category-tab--active');
      const cat = active ? active.dataset.category : 'red';
      renderColors(cat);
    }
  }
}

// Raw pools (fallback curated colors)
const rawPools = {
  red: ['#FF3B30'], blue: ['#007AFF'], green: ['#34C759'], yellow: ['#FFCC00'], orange: ['#FF9500'], purple: ['#5856D6'],
  black: ['#0A0A0A'], white: ['#FFFFFF']
};

// Manual hex lists provided by user (will take precedence when present)
const manualPools = {
  red: [
    '#FF006E','#FF2D95','#FF4FD8','#FF66C4','#FF1493','#FF0080','#FF3CAC','#FF007F',
    '#FF595E','#FF4D6D','#F72585','#E63946','#D00000','#D90429',
    '#FFF0F6','#FFDEEB','#FCC2D7','#FAA2C1','#F783AC','#F06595','#E64980','#D6336C','#C2255C','#A61E4D',
    '#FFB3C6','#FF8FAB','#FB6F92','#FFAFCC','#FFC2D1','#FFE5EC','#FFCAD4','#FF99AC','#FFCCD5'
  ],
  orange: [
    '#FF5400','#FF6B00','#FF8500','#FF9100','#FF9E00','#FFAA00','#FFBE0B','#FFD60A',
    '#FF9F1C','#FFB4A2','#F28482','#E76F51','#FF7B00','#FF8800','#F77F00','#E85D04','#DC2F02','#D9480F',
    '#FF6B35','#FF7F51','#FFADAD','#FFD6A5','#FB8500','#FF6700','#FF4800','#FF3C38'
  ],
  yellow: ['#FDFFB6','#FFE66D','#FFD60A','#FFBE0B','#FFAA00','#FDF0D5','#FEFAE0','#FAEDCD','#FFF1E6','#F6E7CB','#E9D8A6','#FFD64A'],
  green: [
    '#39FF14','#00FF88','#06FFA5','#70E000','#9EF01A','#CCFF33','#BAFFC9','#CAFFBF',
    '#08C23C','#06A82F','#05FF6A','#E6FCF5','#C3FAE8','#96F2D7','#63E6BE','#38D9A9','#20C997','#12B886',
    '#0CA678','#099268','#087F5B','#75C9C8','#A8DADC','#B7E4C7','#95D5B2','#74C69D','#52B788','#40916C','#2D6A4F','#1B4332','#D8F3DC',
    '#C1FF1A','#F0FFF0'
  ],
  blue: [
    '#00D4FF','#00B4D8','#0096C7','#0077B6','#48CAE4','#90E0EF','#ADE8F4','#CAF0F8',
    '#E7F5FF','#D0EBFF','#A5D8FF','#74C0FC','#4DABF7','#339AF0','#228BE6','#1C7ED6','#1971C2','#1864AB',
    '#4CC9F0','#BDE0FE','#A2D2FF','#90DBF4','#89C2D9','#61A5C2','#468FAF','#2C7DA0','#1E6091','#023E8A',
    '#00FFF7','#0036FF','#00A8E8'
  ],
  purple: [
    '#7B2CBF','#9D4EDD','#C77DFF','#E0AAFF','#7209B7','#560BAD','#480CA8','#3A0CA3','#4361EE',
    '#A9A4CE','#B197FC','#9775FA','#845EF7','#7950F2','#7048E8','#6741D9','#5F3DC4','#5A189A','#F3C4FB','#E5DBFF','#D0BFFF','#FFC8DD',
    '#C54B8C','#FF00AE'
  ],
  brown: [
    '#EDE0D4','#E6CCB2','#DDB892','#B08968','#A98467','#7F5539','#9C6644','#6F4518','#5A3E2B','#4E342E',
    '#3E2723','#8D6E63','#795548','#6D4C41','#5D4037','#4B2E2B','#3C2F2F','#2F1B0C','#8B5E34','#C19A6B','#A0522D','#8B4513','#7C2D12','#6F4E37','#5E4730'
  ],
  beige: [
    '#FAF3E0','#F5EBE0','#EAE0D5','#EDE0D4','#FDF0D5','#FFE5B4','#FFD6A5','#FFECD1','#F8EDEB','#FAEDCD',
    '#FEFAE0','#FFF1E6','#F1E3D3','#E8D5C4','#D5BDAD','#FFE8D6','#F6E7CB','#E9D8A6','#F0EAD2','#F5DEB3','#F0E6C8','#EADBC3','#DCC9A6','#F7E7CE','#ECD9B0'
  ],
  black: ['#000000','#0A0A0A','#121212','#1A1A1A','#222222','#2C2C2C','#383131','#444444','#555555','#1C1919','#2B2B2B','#141414','#101010','#080808','#0E100F','#111111','#171717','#1A1A1A','#202020','#262626','#212529','#343A40','#495057'],
  white: ['#FFFFFF','#F5F5F5','#EDEDED','#CCCCCC','#999999','#F8F9FA','#F1F3F5','#FDFDFD','#FCFCFC','#FAFAFA','#DEE2E6','#E9ECEF','#CED4DA','#ADB5BD','#F5EBE0','#EAE0D5','#EDE0D4','#F1E3D3','#E8D5C4','#D5BDAF','#FFE8D6','#F0F0F0','#202020'],
  rainbow: ['#433832','#5A463C','#6B4F4F','#7F5A58','#8D6E63','#A1887F','#BCAAA4','#D7CCC8','#4E342E','#3E2723','#6D4C41','#795548','#A98274','#C19A6B','#9C6644','#7F5539','#5E3C2C','#4B2E2B','#2F1B0C','#CDB4DB','#F7EDE2','#F5CAC3','#F4A261']
};

// Generate palette: main color + variations in saturation/lightness
function generatePalette(category) {
  const colors = [];
  if (category === 'black') {
    // generate a large set of deep values for black/charcoal variants
    const ls = [];
    for (let l = 0.02; l <= 0.38; l += 0.02) ls.push(Number(l.toFixed(2)));
    ls.forEach(l => colors.push(hslToHex(0, 0, l)));
    // include some common dark hexes explicitly
    colors.unshift('#222222', '#111111', '#0A0A0A');
    return [...new Set(colors)];
  }
  if (category === 'white') {
    // many bright/off-white variants
    const ls = [];
    for (let l = 1.0; l >= 0.6; l -= 0.02) ls.push(Number(l.toFixed(2)));
    // create pure whites and slightly warm/cool off-whites
    ls.forEach(l => colors.push(hslToHex(50, 0.02, l)));
    colors.unshift('#FFFFFF', '#FEFEFE', '#FFFFF0');
    return [...new Set(colors)];
  }
  // (gray category removed — grays will be covered by black/white ranges)

  // Colored categories: use base hue and produce grid of s/l variations
  const h = baseHue[category] ?? 0;
  let preset = paletteConfig.presets[paletteConfig.activePreset] || paletteConfig.presets.dense;
  let sats = preset.sats;
  let lights = preset.lights;
  // prepare hue neighbors to produce mint/aqua/baby-blue/teal variants
  const hueOffsetsMap = {
    blue: [-30, -15, 0, 15, 30],
    green: [-25, -12, 0, 12, 25],
    red: [-8, 0, 8],
    orange: [-6, 0, 6],
    purple: [-12, 0, 12],
    yellow: [-6, 0, 6]
  };
  const offsets = hueOffsetsMap[category] || [0];
  const hueVariants = offsets.map(o => ((h + o + 360) % 360));
  // Special-case yellow to avoid olive/greenish outputs — favor higher lightness and saturation for true yellows
  if (category === 'yellow') {
    // nudge hue slightly towards warmer yellow and prefer brighter lights
    // we'll use a slightly different preset focused on yellow tones
    sats = [0.98, 0.9, 0.78, 0.6, 0.45, 0.3, 0.18, 0.08];
    lights = [0.18, 0.28, 0.4, 0.52, 0.66, 0.78, 0.88];
  }
  // Also include pastel variants for all categories (low saturation, high lightness)
  const pastelSats = [0.28, 0.18, 0.12];
  const pastelLights = [0.86, 0.9, 0.94];
  // main color first
  // produce colors across the hue variants for richer families (mint, baby-blue, teal, etc.)
  hueVariants.forEach((hv, hi) => {
    // add a main-ish swatch for each variant
    colors.push(hslToHex(hv, 0.95, 0.5));

    // standard sats/lights grid
    sats.forEach(s => {
      lights.forEach(l => {
        if (l < 0.04 || l > 0.98) return;
        colors.push(hslToHex(hv, s, l));
      });
    });

    // high-saturation bright variants (vibrant tints/highlights)
    const satsHigh = [0.98, 0.92, 0.86];
    const lightsHigh = [0.58, 0.66, 0.74];
    satsHigh.forEach(sh => lightsHigh.forEach(lh => colors.push(hslToHex(hv, sh, lh))));

    // pastel mixes for this hue variant
    pastelSats.forEach(ps => pastelLights.forEach(pl => colors.push(hslToHex(hv, ps, pl))));
    // subtle near-white pastels with slight hue shift
    pastelSats.forEach(ps => pastelLights.forEach(pl => colors.push(hslToHex((hv + 8) % 360, ps * 0.9, pl))));
  });
  // remove duplicates and return
  return [...new Set(colors)];
}

// Build dynamic colorData mapping used by render — use manual pools when provided, pad/truncate to 50
const colorData = {};
const categories = ['red','pink','orange','yellow','green','mint','blue','skyblue','purple','brown','beige','gray','black','white','neon','rainbow'];
categories.forEach(cat => {
  if (manualPools[cat] && Array.isArray(manualPools[cat])) {
    // normalize hex (uppercase) and ensure unique
    const normalized = [...new Set(manualPools[cat].map(h => h.toUpperCase()))];
    // pad by repeating if fewer than 50
    while (normalized.length < 50) normalized.push(...normalized.slice(0, 50 - normalized.length));
    colorData[cat] = normalized.slice(0, 50);
  } else {
    colorData[cat] = generatePalette(cat);
    // ensure at least 50 by padding from generated palette (if generation returns fewer)
    if (colorData[cat].length < 50) {
      const copy = [...colorData[cat]];
      while (colorData[cat].length < 50 && copy.length) {
        colorData[cat].push(...copy.slice(0, 50 - colorData[cat].length));
      }
    }
    colorData[cat] = colorData[cat].slice(0,50);
  }
});


// DOM Elements (declared, assigned on DOMContentLoaded)
let categoryTabs;
let colorGrid;

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

// Render Colors
function renderColors(category) {
  if (!colorGrid) return;
  const colors = colorData[category] || colorData.red;
  colorGrid.innerHTML = '';
  // limit number of displayed cards to avoid performance issues
  const maxCards = (paletteConfig.perCategoryMax && paletteConfig.perCategoryMax[category]) || paletteConfig.maxCards || 30;
  const displayColors = colors.slice(0, maxCards);
  
  displayColors.forEach((color, index) => {
    const card = document.createElement('div');
    card.className = 'color-card';
    card.style.backgroundColor = color;
    
    // Apply border to black category
    if (category === 'black') {
      card.style.border = '2px solid #DDDDDD';
    }
    
    const hex = document.createElement('span');
    hex.className = 'color-card__hex';
    hex.textContent = color;
    
    card.appendChild(hex);
    
    // Hover effect
    card.addEventListener('mouseenter', () => {
      gsap.to(card, {
        scale: 1.05,
        y: -8,
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
    
    card.addEventListener('click', () => {
      copyToClipboard(color);
      hex.textContent = 'Copied!';
      
      gsap.to(card, {
        scale: 1.1,
        duration: 0.15,
        yoyo: true,
        repeat: 1
      });
      
      setTimeout(() => {
        hex.textContent = color;
      }, 1000);
    });
    
    colorGrid.appendChild(card);
  });
  
  // Animate cards
  gsap.from('.color-card', {
    opacity: 0,
    y: 30,
    scale: 0.9,
    duration: 0.5,
    stagger: 0.03,
    ease: 'power3.out'
  });
}

// Initialize
function init() {
  renderColors('red');

  // Header animation with stagger
  gsap.from('.color-library__header', {
    opacity: 0,
    y: 60,
    duration: 1,
    ease: 'power3.out'
  });

  // Circular tabs animation with elastic effect
  try {
    gsap.from('.category-tab', {
      scale: 0,
      opacity: 0,
      rotation: -180,
      duration: 0.8,
      stagger: 0.1,
      ease: 'elastic.out(1, 0.5)',
      delay: 0.3
    });
  } catch (e) {
    // If GSAP isn't available or animation fails, ensure tabs are visible
    if (categoryTabs) categoryTabs.forEach(t => t.style.opacity = '1');
  }

  // Continuous floating animation for tabs
  try {
    gsap.to('.category-tab', {
      y: 'random(-5, 5)',
      duration: 'random(2, 3)',
      repeat: -1,
      yoyo: true,
      ease: 'sine.inOut',
      stagger: {
        each: 0.2,
        from: 'random'
      }
    });
  } catch (e) {
    // ignore animation errors
  }

  // Scroll-triggered color card animations
  try {
    ScrollTrigger.batch('.color-card', {
      onEnter: batch => gsap.to(batch, {
        opacity: 1,
        y: 0,
        scale: 1,
        stagger: 0.05,
        duration: 0.6,
        ease: 'power3.out'
      }),
      start: 'top 90%'
    });
  } catch (e) {
    // ignore if ScrollTrigger not available
  }
}

// Attach DOM-ready handlers and wire up tab clicks
document.addEventListener('DOMContentLoaded', () => {
  categoryTabs = document.querySelectorAll('.category-tab');
  colorGrid = document.getElementById('colorGrid');

  if (categoryTabs) {
    categoryTabs.forEach(tab => {
      tab.addEventListener('click', () => {
        categoryTabs.forEach(t => t.classList.remove('category-tab--active'));
        tab.classList.add('category-tab--active');
        const category = tab.dataset.category;
        // tab click visual feedback using GSAP
        try {
          gsap.fromTo(tab, { scale: 1 }, { scale: 1.28, duration: 0.12, yoyo: true, repeat: 1, ease: 'power2.out' });
        } catch (e) {
          // GSAP may not be available; ignore animation errors
        }
        // ensure tab visible after animation
        try { tab.style.opacity = '1'; tab.style.visibility = 'visible'; tab.style.transform = 'none'; } catch (e) {}
        renderColors(category);
      });
    });
  }

  // Ensure tabs are visible even if animations left them hidden
  if (categoryTabs) {
    categoryTabs.forEach(t => {
      try { t.style.opacity = '1'; t.style.visibility = 'visible'; t.style.transform = 'none'; } catch (e) {}
    });
  }

  init();
});
