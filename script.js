/* ============================================
   PORTFOLIO â€” Interactive Scripts
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {
  initNavbar();
  initMobileMenu();
  initParticles();
  initSmoothScroll();
  initParallax();
  initScrollReveal();
  initSkillBars();
  initStatCounter();
  initActiveNavOnScroll();
  initContactForm();
  initCertificatesScrollAnimation();
  initAboutScrollAnimation();
  initProjectsCurve();
  initHeroVideo();
  initHeroShrinkAnimation();
  initHeroMouseParallax();
});

/* ---------- Navbar scroll effect ---------- */
function initNavbar() {
  const navbar = document.getElementById('navbar');
  if (!navbar) return;
  let ticking = false;

  window.addEventListener('scroll', () => {
    if (!ticking) {
      requestAnimationFrame(() => {
        navbar.classList.toggle('scrolled', window.scrollY > 60);
        ticking = false;
      });
      ticking = true;
    }
  });
}

/* ---------- Mobile menu ---------- */
function initMobileMenu() {
  const toggle = document.getElementById('nav-toggle');
  const menu   = document.getElementById('nav-menu');
  if (!toggle || !menu) return;

  toggle.addEventListener('click', () => {
    toggle.classList.toggle('open');
    menu.classList.toggle('open');
  });

  // Close menu on link click
  menu.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
      toggle.classList.remove('open');
      menu.classList.remove('open');
    });
  });
}

/* ---------- Floating particles ---------- */
function initParticles() {
  const container = document.getElementById('particles');
  if (!container) return;
  const count = 30;

  for (let i = 0; i < count; i++) {
    const p = document.createElement('div');
    p.classList.add('particle');

    const size = Math.random() * 3 + 1;
    p.style.width  = size + 'px';
    p.style.height = size + 'px';
    p.style.left   = Math.random() * 100 + '%';
    p.style.top    = Math.random() * 100 + '%';
    p.style.animationDuration = (Math.random() * 15 + 10) + 's';
    p.style.animationDelay    = (Math.random() * 10) + 's';
    p.style.opacity = Math.random() * 0.4 + 0.1;

    container.appendChild(p);
  }
}

/* ---------- Smooth scrolling ---------- */
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const href = this.getAttribute('href');
      if (href === '#') return;
      const target = document.querySelector(href);
      if (target) {
        e.preventDefault();
        const navHeight = document.getElementById('navbar').offsetHeight;
        const top = target.getBoundingClientRect().top + window.scrollY - navHeight;
        window.scrollTo({ top, behavior: 'smooth' });
      }
    });
  });
}

/* ---------- Parallax on hero background ---------- */
function initParallax() {
  const hero = document.querySelector('.hero');
  if (!hero) return;
  let ticking = false;

  window.addEventListener('scroll', () => {
    if (!ticking) {
      requestAnimationFrame(() => {
        const scrolled = window.scrollY;
        if (scrolled < window.innerHeight) {
          hero.style.backgroundPositionY = (scrolled * 0.35) + 'px';
        }
        ticking = false;
      });
      ticking = true;
    }
  });
}

/* ---------- Scroll Reveal Animation ---------- */
function initScrollReveal() {
  // Add reveal class to elements
  const selectors = [
    '.about-grid',
    '.skill-card',
    '.project-card',
    '.resume-col',
    '.resume-download',
    '.case-card',
    '.contact-info',
    '.contact-form'
  ];

  selectors.forEach(sel => {
    document.querySelectorAll(sel).forEach((el, i) => {
      el.classList.add('reveal');
      el.style.transitionDelay = (i * 0.1) + 's';
    });
  });

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  });

  document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
}

/* ---------- Skill Bar Animation ---------- */
function initSkillBars() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const fills = entry.target.querySelectorAll('.skill-fill');
        fills.forEach(fill => {
          const width = fill.getAttribute('data-width');
          fill.style.width = width + '%';
        });
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.3 });

  const skillsSection = document.getElementById('skills');
  if (skillsSection) observer.observe(skillsSection);
}

/* ---------- Stat Counter Animation ---------- */
function initStatCounter() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const numbers = entry.target.querySelectorAll('.stat-number');
        numbers.forEach(num => {
          const target = parseInt(num.getAttribute('data-count'));
          animateCount(num, 0, target, 1500);
        });
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });

  const aboutSection = document.getElementById('about');
  if (aboutSection) observer.observe(aboutSection);
}

function animateCount(element, start, end, duration) {
  const range = end - start;
  const startTime = performance.now();

  function update(currentTime) {
    const elapsed = currentTime - startTime;
    const progress = Math.min(elapsed / duration, 1);
    // Ease out cubic
    const eased = 1 - Math.pow(1 - progress, 3);
    const current = Math.round(start + range * eased);
    element.textContent = current;

    if (progress < 1) {
      requestAnimationFrame(update);
    }
  }

  requestAnimationFrame(update);
}

/* ---------- Active Nav on Scroll ---------- */
function initActiveNavOnScroll() {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link');

  window.addEventListener('scroll', () => {
    let current = '';
    const navHeight = document.getElementById('navbar').offsetHeight;

    sections.forEach(section => {
      const sectionTop = section.offsetTop - navHeight - 100;
      if (window.scrollY >= sectionTop) {
        current = section.getAttribute('id');
      }
    });

    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === '#' + current) {
        link.classList.add('active');
      }
    });
  });
}

/* ---------- Contact Form ---------- */
function initContactForm() {
  const form = document.getElementById('contact-form');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const btn = form.querySelector('.btn-submit');
    const originalText = btn.innerHTML;

    btn.innerHTML = `
      <span class="btn-icon">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
      </span>
      MESSAGE SENT!
    `;
    btn.style.pointerEvents = 'none';

    setTimeout(() => {
      btn.innerHTML = originalText;
      btn.style.pointerEvents = '';
      form.reset();
    }, 3000);
  });
}

/* ---------- Certificates Scroll Animation ---------- */
function initCertificatesScrollAnimation() {
  const section = document.querySelector('.cert-scroll-section');
  if (!section) return;

  window.addEventListener('scroll', () => {
    const rect = section.getBoundingClientRect();
    const sectionTop = rect.top;
    const sectionHeight = rect.height;
    const windowHeight = window.innerHeight;

    let progress = 0;
    if (sectionTop <= 0) {
      const scrolled = -sectionTop;
      const totalScrollable = sectionHeight - windowHeight;
      if (totalScrollable > 0) {
        progress = scrolled / totalScrollable;
      }
    }
    
    // Clamp between 0 and 1
    progress = Math.max(0, Math.min(1, progress));
    section.style.setProperty('--cert-progress', progress);
  });
}

/* ---------- About Section Scroll Animation ---------- */
function initAboutScrollAnimation() {
  const section = document.querySelector('.scroll-animation-section');
  if (!section) return;

  window.addEventListener('scroll', () => {
    const rect = section.getBoundingClientRect();
    const windowHeight = window.innerHeight;

    // --- 1. Curve Animation ---
    // When the top of the section comes into the viewport
    if (rect.top <= windowHeight && rect.top >= 0) {
      const scrolledIn = windowHeight - rect.top;
      let curve = 400 - (scrolledIn * 0.7); 
      curve = Math.max(0, curve);
      section.style.setProperty('--about-curve', curve);
    } else if (rect.top < 0) {
      section.style.setProperty('--about-curve', 0);
    }

    // --- 2. Text Reveal Animation ---
    let progress = 0;
    // When the top of the section hits the top of the viewport
    if (rect.top <= 0) {
      const scrolled = -rect.top;
      const totalScrollable = rect.height - windowHeight;
      if (totalScrollable > 0) {
        // Multiply by 1.5 to finish the animation before the section ends,
        progress = (scrolled / totalScrollable) * 1.5;
      }
    }
    
    // Clamp between 0 and 1
    progress = Math.max(0, Math.min(1, progress));
    section.style.setProperty('--scroll-progress', progress);
  });
}

/* ---------- Projects Curve Animation ---------- */
function initProjectsCurve() {
  const section = document.querySelector('.projects-section');
  if (!section) return;

  window.addEventListener('scroll', () => {
    const rect = section.getBoundingClientRect();
    const windowHeight = window.innerHeight;
    
    // When the top of the section is visible in the viewport
    if (rect.top <= windowHeight) {
      let progress = 1 - (rect.top / windowHeight);
      
      // Clamp between 0 and 1
      progress = Math.max(0, Math.min(1, progress));
      
      // Calculate curve: starts at 200 down to 0
      const curve = 200 * (1 - Math.pow(progress, 0.5)); // slightly non-linear ease out
      section.style.setProperty('--curve', curve);
    }
  });
}

/* ---------- Hero Video Animation ---------- */
function initHeroVideo() {
  const heroVideo = document.getElementById('hero-bg-video');
  if (heroVideo) {
    // Slow down the video playback to 50% for a smooth, endless feel
    heroVideo.playbackRate = 0.5;

    // Fade to black right before the video loops to hide the hard cut
    heroVideo.addEventListener('timeupdate', () => {
      // With playbackRate at 0.5, 0.5 seconds of video time is 1 second of real time
      const timeRemaining = heroVideo.duration - heroVideo.currentTime;
      
      if (timeRemaining < 0.5) {
        // Start fading out to 0 opacity
        heroVideo.style.opacity = '0';
      } else if (heroVideo.currentTime < 0.5) {
        // Start fading back in right as the video restarts
        heroVideo.style.opacity = '0.7';
      } else {
        // Keep it at target opacity during the rest of the playback
        heroVideo.style.opacity = '0.7';
      }
    });
  }
}

/* ---------- Hero Shrink and Cards Parallax Animation ---------- */
function initHeroShrinkAnimation() {
  const wrapper = document.querySelector('.hero-scroll-wrapper');
  const hero = document.getElementById('home');
  const cardsBg = document.querySelector('.hero-cards-bg');
  if (!wrapper || !hero) return;

  window.addEventListener('scroll', () => {
    const rect = wrapper.getBoundingClientRect();
    const windowHeight = window.innerHeight;
    
    // Check if the wrapper is in view
    if (rect.top <= windowHeight && rect.bottom >= 0) {
      let scrolled = -rect.top;
      scrolled = Math.max(0, scrolled);
      
      const totalScrollable = rect.height - windowHeight;
      let progress = scrolled / totalScrollable;
      progress = Math.max(0, Math.min(1, progress));
      
      // Hero shrinking: from 1 down to 0.45
      const scale = 1 - (progress * 0.55);
      hero.style.transform = `scale(${scale})`;
      
      // Round corners smoothly as it shrinks
      hero.style.borderRadius = `${progress * 48}px`;

      // Blur effect fades out as progress goes from 0 to 0.5
      if (cardsBg) {
        let blurAmount = 20 - (progress * 40);
        blurAmount = Math.max(0, blurAmount);
        cardsBg.style.filter = `blur(${blurAmount}px)`;
      }
    }
  });
}

/* ---------- Hero Mouse Parallax Effect ---------- */
function initHeroMouseParallax() {
  const hero = document.getElementById('home');
  const text = document.querySelector('.hero-massive-text');
  const bottom = document.querySelector('.hero-bottom-ref');
  const portrait = document.querySelector('.hero-portrait-ref');
  
  if (!hero) return;

  hero.addEventListener('mousemove', (e) => {
    const rect = hero.getBoundingClientRect();
    const x = e.clientX - rect.left - (rect.width / 2);
    const y = e.clientY - rect.top - (rect.height / 2);

    const xNorm = x / (rect.width / 2);
    const yNorm = y / (rect.height / 2);

    // Unify the movement so they all move as a single solid group (pan effect)
    const moveX = xNorm * -25;
    const moveY = yNorm * -25;

    if(text) text.style.transform = `translate(${moveX}px, ${moveY}px)`;
    if(bottom) bottom.style.transform = `translate(${moveX}px, ${moveY}px)`;
    // Portrait is now a floating circle frame, so it can safely move on Y axis too
    if(portrait) portrait.style.transform = `translate(calc(-50% + ${moveX}px), ${moveY}px)`;
  });

  hero.addEventListener('mouseleave', () => {
    if(text) text.style.transform = `translate(0, 0)`;
    if(bottom) bottom.style.transform = `translate(0, 0)`;
    if(portrait) portrait.style.transform = `translate(-50%, 0)`;
  });
}
