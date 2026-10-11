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
  initProjectsStickyScroll();
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

/* ---------- Projects Sticky Multi-Layer Showcase Animation ---------- */
function initProjectsStickyScroll() {
  const section = document.getElementById('projects');
  if (!section) return;

  const cards = section.querySelectorAll('.project-slide-card');
  const steps = section.querySelectorAll('.timeline-step');
  const dotBoxes = section.querySelectorAll('.step-dot-box');
  const navContainer = section.querySelector('.projects-timeline-nav');
  const track = document.getElementById('timelineNavTrack');
  const lineFill = document.getElementById('timelineNavFill');
  const totalCards = cards.length;

  if (totalCards === 0) return;

  // Calibrate line position to run from exact center of Dot 0 to center of Dot 3
  function calibrateTrackLine() {
    if (!track || dotBoxes.length < 2 || !navContainer) return;
    const navRect = navContainer.getBoundingClientRect();
    const firstBoxRect = dotBoxes[0].getBoundingClientRect();
    const lastBoxRect = dotBoxes[dotBoxes.length - 1].getBoundingClientRect();

    // Horizontal center of the dot boxes
    const centerX = (firstBoxRect.left + firstBoxRect.width / 2) - navRect.left;
    // Vertical center of first and last dots
    const startY = (firstBoxRect.top + firstBoxRect.height / 2) - navRect.top;
    const endY = (lastBoxRect.top + lastBoxRect.height / 2) - navRect.top;
    const totalTrackHeight = Math.max(0, endY - startY);

    track.style.top = `${startY}px`;
    track.style.height = `${totalTrackHeight}px`;
    track.style.left = `${(centerX - 0.75).toFixed(1)}px`;
  }

  function updateScrollProgress() {
    const rect = section.getBoundingClientRect();
    const windowHeight = window.innerHeight;
    const sectionHeight = rect.height;
    const totalScrollable = sectionHeight - windowHeight;

    let progress = 0;
    if (rect.top <= 0) {
      const scrolled = -rect.top;
      progress = totalScrollable > 0 ? (scrolled / totalScrollable) : 0;
    }
    progress = Math.max(0, Math.min(1, progress));

    // Smooth cubic easing for natural card slide
    function easeInOut(t) {
      return t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
    }

    // Configure slide-up intervals for cards 1, 2, 3
    const intervals = [
      { start: 0.12, end: 0.35 }, // Card 1 reveals
      { start: 0.44, end: 0.67 }, // Card 2 reveals
      { start: 0.74, end: 0.95 }  // Card 3 reveals
    ];

    cards.forEach((card) => {
      const idx = parseInt(card.getAttribute('data-index'), 10);
      if (idx === 0) {
        card.style.transform = 'translateY(0%)';
        return;
      }

      const interval = intervals[idx - 1];
      if (!interval) return;

      if (progress <= interval.start) {
        card.style.transform = 'translateY(105%)';
      } else if (progress >= interval.end) {
        card.style.transform = 'translateY(0%)';
      } else {
        const rawT = (progress - interval.start) / (interval.end - interval.start);
        const t = easeInOut(Math.max(0, Math.min(1, rawT)));
        const transY = 105 * (1 - t);
        card.style.transform = `translateY(${transY.toFixed(2)}%)`;
      }
    });

    // Continuous line fill that travels from Dot 0 down to Dot 3
    let lineProgress = 0;
    if (progress <= 0.06) {
      lineProgress = 0;
    } else if (progress <= 0.35) {
      const t = (progress - 0.06) / (0.35 - 0.06);
      lineProgress = t * 33.33;
    } else if (progress <= 0.67) {
      const t = (progress - 0.35) / (0.67 - 0.35);
      lineProgress = 33.33 + t * 33.33;
    } else {
      const t = (progress - 0.67) / (0.95 - 0.67);
      lineProgress = 66.67 + Math.min(1, t) * 33.33;
    }
    lineProgress = Math.max(0, Math.min(100, lineProgress));

    if (lineFill) {
      lineFill.style.height = `${lineProgress}%`;
    }

    // Circles light up as the line reaches them, matching reference exactly!
    const isDot0Lit = true;
    const isDot1Lit = lineProgress >= 32;
    const isDot2Lit = lineProgress >= 65;
    const isDot3Lit = lineProgress >= 98;
    const litFlags = [isDot0Lit, isDot1Lit, isDot2Lit, isDot3Lit];

    // Determine current active card for text highlight
    let currentIdx = 0;
    if (progress < 0.25) {
      currentIdx = 0;
    } else if (progress < 0.55) {
      currentIdx = 1;
    } else if (progress < 0.82) {
      currentIdx = 2;
    } else {
      currentIdx = 3;
    }

    steps.forEach((step, idx) => {
      step.classList.toggle('is-lit', litFlags[idx]);
      step.classList.toggle('is-current', idx === currentIdx);
    });
  }

  // Recalibrate on layout changes
  calibrateTrackLine();
  window.addEventListener('resize', () => {
    calibrateTrackLine();
    updateScrollProgress();
  }, { passive: true });

  window.addEventListener('scroll', updateScrollProgress, { passive: true });
  updateScrollProgress();

  // Allow clicking on timeline step to smoothly scroll to that project card
  steps.forEach((step) => {
    step.addEventListener('click', () => {
      const idx = parseInt(step.getAttribute('data-index'), 10);
      const targetFractions = [0.03, 0.38, 0.70, 0.98];
      const targetFraction = targetFractions[idx] || 0;

      const rect = section.getBoundingClientRect();
      const currentScrollY = window.scrollY || window.pageYOffset;
      const sectionTop = currentScrollY + rect.top;
      const totalScrollable = rect.height - window.innerHeight;
      const targetY = sectionTop + (targetFraction * totalScrollable);

      window.scrollTo({
        top: targetY,
        behavior: 'smooth'
      });
    });
  });
}

/* ---------- Project Quick Specs Modal ---------- */
const projectModalData = {
  'repair-system': {
    title: 'AI-Assisted Computer Repair Shop Management System',
    badge: 'Production Web App • AI Diagnostics',
    description: 'A full-stack enterprise ticket management and troubleshooting platform built to streamline repair workflows, customer intake, inventory synchronization, and hardware diagnostics.',
    specs: [
      { label: 'Architecture', val: 'Full-Stack JavaScript / Node.js & SQLite' },
      { label: 'Core Features', val: 'CRUD Operations, Live Ticket Tracking, Role Authentication' },
      { label: 'AI Capabilities', val: 'NLP Automated Hardware Diagnostic Log Ingestion' },
      { label: 'Deployment', val: 'Live Production Demo Available' }
    ],
    primaryAction: {
      text: 'Launch Full Web Application ↗',
      url: 'projects/repair-system.html'
    }
  },
  'cloud-infra': {
    title: 'Enterprise Cloud & Network Infrastructure',
    badge: 'Network Engineering • Cloud DevOps',
    description: 'A scalable multi-VPC cloud network topology engineered for zero-single-point-of-failure operations, dynamic BGP routing, and automated infrastructure deployment.',
    specs: [
      { label: 'Topology', val: 'Dual Transit Gateway, Multi-AZ Peering' },
      { label: 'Reliability', val: '99.99% SLA Automated Subnet Failover' },
      { label: 'Automation', val: 'Terraform IaC, Ansible Configuration Playbooks' },
      { label: 'Monitoring', val: 'Prometheus Telemetry, Flow Log Packet Inspection' }
    ],
    primaryAction: {
      text: 'View Full Architecture Blueprint ↗',
      url: 'projects/cloud-infra.html'
    }
  },
  'zero-trust': {
    title: 'Zero-Trust Security & Threat Detection',
    badge: 'Defensive Operations • Threat Telemetry',
    description: 'An enterprise defensive security architecture implementing micro-segmentation, continuous cryptographic authentication, and automated SIEM threat containment.',
    specs: [
      { label: 'Access Model', val: 'Zero Implicit Trust (ZTNA), Mutual TLS' },
      { label: 'Intrusion Defense', val: 'Automated Suricata IDS/IPS Rules & Containment' },
      { label: 'Containment Speed', val: '< 300ms Automated Network Quarantine' },
      { label: 'Compliance', val: 'Least-Privilege RBAC, Immutable Audit Logs' }
    ],
    primaryAction: {
      text: 'Open Security Protocol Suite ↗',
      url: 'projects/zero-trust.html'
    }
  }
};

window.openProjectModal = function(id) {
  const modal = document.getElementById('project-modal');
  const content = document.getElementById('project-modal-content');
  if (!modal || !content) return;

  const data = projectModalData[id];
  if (!data) return;

  let specsHtml = data.specs.map(s => `
    <div style="border-bottom: 1px solid rgba(255,255,255,0.08); padding: 12px 0; display: flex; justify-content: space-between; gap: 16px; font-size: 0.9rem;">
      <span style="color: rgba(255,255,255,0.5); font-weight: 500;">${s.label}</span>
      <span style="color: #ffffff; font-weight: 600; text-align: right;">${s.val}</span>
    </div>
  `).join('');

  content.innerHTML = `
    <div style="display: inline-block; padding: 4px 12px; border-radius: 9999px; background: rgba(243, 112, 30, 0.2); border: 1px solid rgba(243, 112, 30, 0.4); color: #f3701e; font-size: 0.75rem; font-weight: 700; text-transform: uppercase; letter-spacing: 0.08em; margin-bottom: 14px;">
      ${data.badge}
    </div>
    <h3 style="font-family: var(--font-heading); font-size: 1.6rem; font-weight: 800; color: #ffffff; line-height: 1.25; margin-bottom: 14px;">
      ${data.title}
    </h3>
    <p style="color: rgba(255,255,255,0.7); font-size: 0.92rem; line-height: 1.65; margin-bottom: 24px;">
      ${data.description}
    </p>
    <div style="background: rgba(0,0,0,0.3); border: 1px solid rgba(255,255,255,0.08); border-radius: 14px; padding: 16px 20px; margin-bottom: 28px;">
      ${specsHtml}
    </div>
    <div style="display: flex; gap: 12px; flex-wrap: wrap;">
      <a href="${data.primaryAction.url}" target="_blank" class="proj-action-btn proj-primary" style="text-decoration: none; padding: 12px 24px;">
        ${data.primaryAction.text}
      </a>
      <button type="button" class="proj-action-btn proj-secondary" onclick="closeProjectModal()">
        Close Window
      </button>
    </div>
  `;

  modal.classList.add('open');
  modal.setAttribute('aria-hidden', 'false');
  document.body.style.overflow = 'hidden';
};

window.closeProjectModal = function() {
  const modal = document.getElementById('project-modal');
  if (!modal) return;
  modal.classList.remove('open');
  modal.setAttribute('aria-hidden', 'true');
  document.body.style.overflow = '';
};

document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    closeProjectModal();
  }
});

document.addEventListener('click', (e) => {
  const modal = document.getElementById('project-modal');
  if (modal && e.target === modal) {
    closeProjectModal();
  }
});

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

  window.addEventListener('mousemove', (e) => {
    // Track mouse relative to the entire browser window instead of just the hero container
    const x = e.clientX - (window.innerWidth / 2);
    const y = e.clientY - (window.innerHeight / 2);

    const xNorm = x / (window.innerWidth / 2);
    const yNorm = y / (window.innerHeight / 2);

    // Unify the movement so they all move as a single solid group (pan effect)
    const moveX = xNorm * -12;
    const moveY = yNorm * -12;

    if(text) text.style.transform = `translate(${moveX}px, ${moveY}px)`;
    if(bottom) bottom.style.transform = `translate(${moveX}px, ${moveY}px)`;
    // Portrait is now a floating circle frame, so it can safely move on Y axis too
    if(portrait) portrait.style.transform = `translate(calc(-50% + ${moveX}px), ${moveY}px)`;
  });
}
