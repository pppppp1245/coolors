/* ========================================
   main.js — GSAP Animations
   ======================================== */

// Register ScrollTrigger
gsap.registerPlugin(ScrollTrigger);

// Mobile Menu Toggle
const menuToggle = document.querySelector('.header__menu-toggle');
const mobileMenu = document.querySelector('.mobile-menu');

if (menuToggle) {
  menuToggle.addEventListener('click', () => {
    menuToggle.classList.toggle('active');
    mobileMenu.classList.toggle('active');
    document.body.style.overflow = mobileMenu.classList.contains('active') ? 'hidden' : '';
  });

  // Close menu on link click
  mobileMenu.querySelectorAll('.mobile-menu__link').forEach(link => {
    link.addEventListener('click', () => {
      menuToggle.classList.remove('active');
      mobileMenu.classList.remove('active');
      document.body.style.overflow = '';
    });
  });
}

// Header scroll effect
const header = document.querySelector('.header');
window.addEventListener('scroll', () => {
  if (window.scrollY > 50) {
    header.style.background = 'rgba(10, 10, 10, 0.95)';
  } else {
    header.style.background = 'rgba(10, 10, 10, 0.8)';
  }
});

// Hero Animations
const heroTimeline = gsap.timeline({ defaults: { ease: 'power3.out' } });

heroTimeline
  .to('.hero__title-line', {
    opacity: 1,
    y: 0,
    duration: 1,
    stagger: 0.15,
    delay: 0.3
  })
  .to('.hero__actions', {
    opacity: 1,
    y: 0,
    duration: 0.8
  }, '-=0.4');

// Hero Color Bars Animation
gsap.from('.color-bar', {
  scaleY: 0,
  duration: 1.5,
  stagger: 0.1,
  ease: 'power3.inOut',
  delay: 0.5
});

// Animation Section 1: Floating Orbs
gsap.to('.orb', {
  x: 'random(-100, 100)',
  y: 'random(-100, 100)',
  scale: 'random(0.8, 1.2)',
  rotation: 'random(-30, 30)',
  duration: 'random(4, 6)',
  repeat: -1,
  yoyo: true,
  ease: 'sine.inOut',
  stagger: {
    each: 0.5,
    from: 'random'
  }
});

// Animation Section 2: Wave Effect
gsap.to('.wave', {
  rotation: 360,
  duration: 20,
  repeat: -1,
  ease: 'none',
  stagger: 2
});

gsap.to('.wave', {
  scale: 'random(1, 1.3)',
  duration: 'random(3, 5)',
  repeat: -1,
  yoyo: true,
  ease: 'sine.inOut',
  stagger: 1
});

// CTA section
gsap.from('.cta__title', {
  scrollTrigger: {
    trigger: '.cta',
    start: 'top 80%',
  },
  opacity: 0,
  y: 40,
  duration: 0.8,
  ease: 'power3.out'
});

gsap.from('.cta__subtitle', {
  scrollTrigger: {
    trigger: '.cta',
    start: 'top 75%',
  },
  opacity: 0,
  y: 30,
  duration: 0.8,
  ease: 'power3.out',
  delay: 0.1
});

gsap.from('.cta__btn', {
  scrollTrigger: {
    trigger: '.cta',
    start: 'top 70%',
  },
  opacity: 0,
  y: 30,
  duration: 0.8,
  ease: 'power3.out',
  delay: 0.2
});

// Footer
gsap.from('.footer__content', {
  scrollTrigger: {
    trigger: '.footer',
    start: 'top 90%',
  },
  opacity: 0,
  y: 30,
  duration: 0.8,
  ease: 'power3.out'
});

gsap.from('.footer__copyright', {
  scrollTrigger: {
    trigger: '.footer',
    start: 'top 85%',
  },
  opacity: 0,
  duration: 0.8,
  ease: 'power3.out',
  delay: 0.2
});
