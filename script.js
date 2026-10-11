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
  initMacOsDock();
  initImpactExperience();
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

    // --- 2. Staged Scroll-to-Reveal Animation ---
    let progress = 0;
    // When the top of the section hits the top of the viewport
    if (rect.top <= 0) {
      const scrolled = -rect.top;
      const totalScrollable = rect.height - windowHeight;
      if (totalScrollable > 0) {
        progress = scrolled / totalScrollable;
      }
    }
    
    // Clamp between 0 and 1
    progress = Math.max(0, Math.min(1, progress));
    section.style.setProperty('--scroll-progress', progress);

    // Stage 1: Picture glides from center to left dock position (0.0 to 0.50)
    const picProgress = Math.min(1, progress / 0.50);
    section.style.setProperty('--pic-progress', picProgress);

    // Stage 2: Text reveals on the right AFTER picture clears center (0.45 to 0.85)
    const textProgress = Math.max(0, Math.min(1, (progress - 0.45) / 0.40));
    section.style.setProperty('--text-progress', textProgress);
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
    title: 'Enterprise Office Network & Server Infrastructure',
    badge: 'Network Infrastructure • Systems Administration',
    description: 'A full-scale physical and logical network deployment for a corporate office. Engineered with Cat6 T568B structured cabling, 24-port patch panel distribution, managed 802.1Q department VLANs, and Windows Server 2022 Active Directory & DHCP services.',
    specs: [
      { label: 'Physical Layer', val: 'Cat6 UTP, T568B Termination, 24-Port Patch Panel' },
      { label: 'Segmentation', val: 'VLAN 10 (Admin), VLAN 20 (Staff), VLAN 30 (Guest)' },
      { label: 'Server Services', val: 'Active Directory (corp.local), DHCP Scopes, DNS' },
      { label: 'Security & Access', val: 'Guest Wi-Fi Isolation, NTFS Permissions, GPO Drive Mapping' }
    ],
    primaryAction: {
      text: 'Launch Interactive Network Workbench ↗',
      url: 'projects/cloud-infra.html'
    }
  },
  'zero-trust': {
    title: 'Smart Automatic Tollgate System (Arduino Uno & IoT)',
    badge: 'Embedded Systems • Hardware Automation',
    description: 'An automated vehicle access control prototype powered by an ATmega328P microcontroller (Arduino Uno). Integrates an HC-SR04 ultrasonic distance sensor for vehicle detection and an SG90 micro-servo motor to actuate the boom barrier with non-blocking timing routines.',
    specs: [
      { label: 'Microcontroller', val: 'Arduino Uno R3 (ATmega328P @ 16MHz, 5V Logic)' },
      { label: 'Ultrasonic Sensor', val: 'HC-SR04 (40kHz, 2cm–400cm, 3mm Precision)' },
      { label: 'Actuator Motor', val: 'TowerPro SG90 Micro-Servo (0° to 90° Sweep)' },
      { label: 'Firmware Logic', val: 'Embedded C++, Servo.h PWM, 9600 Baud Telemetry' }
    ],
    primaryAction: {
      text: 'Launch Hardware Demo & Video ↗',
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

/* ========================================================
   UNIVERSAL PORTFOLIO MODAL CONTROLLER (PHASE 3)
   ======================================================== */

window.openPortfolioModal = function(title, categoryBadge, htmlContent) {
  const modal = document.getElementById('portfolio-app-modal');
  const badgeEl = document.getElementById('modal-category-badge');
  const titleEl = document.getElementById('modal-title-heading');
  const bodyEl = document.getElementById('portfolio-modal-body');
  
  if (!modal || !badgeEl || !titleEl || !bodyEl) return;

  badgeEl.textContent = categoryBadge;
  titleEl.textContent = title;
  bodyEl.innerHTML = htmlContent;

  modal.classList.add('open');
  modal.setAttribute('aria-hidden', 'false');
  document.body.style.overflow = 'hidden';
};

window.closePortfolioModal = function() {
  const modal = document.getElementById('portfolio-app-modal');
  if (!modal) return;
  modal.classList.remove('open');
  modal.setAttribute('aria-hidden', 'true');
  document.body.style.overflow = '';
};

// Global keydown listener for Escape
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    closeProjectModal();
    closePortfolioModal();
  }
});

// Global backdrop click listener
document.addEventListener('click', (e) => {
  const projModal = document.getElementById('project-modal');
  if (projModal && e.target === projModal) {
    closeProjectModal();
  }
  const appModal = document.getElementById('portfolio-app-modal');
  if (appModal && e.target === appModal) {
    closePortfolioModal();
  }
});

/* ========================================================
   STEP 17: 5 IT TROUBLESHOOTING CASES CONTROLLER
   ======================================================== */

const TROUBLESHOOTING_CASES_DATA = [
  {
    id: 1,
    title: "IP Address Conflict & DHCP Scope Exhaustion",
    layer: "Layer 3 (Network Layer)",
    problem: "Multiple workstations in Computer Lab 2 intermittently dropped LAN connectivity, displaying Windows notification 'There is an IP address conflict with another system on the network'. Systems were unable to ping the default gateway (192.168.20.1) or reach shared campus servers.",
    causes: [
      "Static IP address (192.168.20.105) manually assigned to a legacy network printer overlapped with the dynamic DHCP address pool range (192.168.20.100 - 192.168.20.200).",
      "DHCP lease duration was set to 8 days, causing rapid exhaustion of available IP leases as high-volume student laptops connected to the subnet.",
      "A rogue consumer wireless router connected to Wall Port #14 was broadcasting unauthorized DHCP ACK responses on VLAN 20."
    ],
    cliTitle: "Command Prompt & Cisco IOS Diagnostic Terminal",
    cliOutput: `<span class="term-prompt">C:\\Users\\jcastro&gt;</span> <span class="term-cmd">ipconfig /all</span>
<span class="term-output">Ethernet adapter Local Area Connection:
   Connection-specific DNS Suffix  . : lab2.datamex.local
   Link-local IPv6 Address . . . . . : fe80::4a52:62ff:fe33:28a1%12
   IPv4 Address. . . . . . . . . . . : 192.168.20.105 <span class="term-error">(Duplicate)</span>
   Subnet Mask . . . . . . . . . . . : 255.255.255.0
   Autoconfiguration IPv4 Address. . : 169.254.82.11
   Default Gateway . . . . . . . . . : 192.168.20.1
   DHCP Server . . . . . . . . . . . : 192.168.20.254</span>

<span class="term-prompt">C:\\Users\\jcastro&gt;</span> <span class="term-cmd">arp -a 192.168.20.105</span>
<span class="term-output">Internet Address      Physical Address      Type
192.168.20.105        d4-6d-6d-12-34-56     dynamic   <span class="term-highlight">&lt;-- Workstation NIC</span>
192.168.20.105        00-1a-2b-3c-4d-5e     dynamic   <span class="term-error">&lt;-- Conflict Detected (Printer MAC)</span></span>

<span class="term-prompt">Switch-Catalyst-2960#</span> <span class="term-cmd">show ip dhcp snooping binding</span>
<span class="term-output">MacAddress          IpAddress        Lease(sec)  Type           VLAN  Interface
------------------  ---------------  ----------  -------------  ----  --------------------
00:1A:2B:3C:4D:5E   192.168.20.105   N/A         <span class="term-error">STATIC_UNAUTH</span>  20    FastEthernet0/14</span>`,
    solution: "1. Isolated the printer on FastEthernet0/14 and re-assigned it a dedicated static IP outside the dynamic scope (192.168.20.250/24).\n2. Configured DHCP Snooping on Cisco Catalyst 2960 ('ip dhcp snooping', 'ip dhcp snooping vlan 20', 'ip dhcp snooping trust' on uplink Gi0/1) to block rogue DHCP offers.\n3. Reduced DHCP lease duration to 4 hours in Windows Server DHCP Scope Options to facilitate rapid address recycling.\n4. Flushed network stack with 'ipconfig /release' and 'ipconfig /renew' across affected lab workstations.",
    lesson: "Never assign static IP addresses inside an active dynamic DHCP pool. Enforce strict Layer 2 DHCP Snooping and create dedicated infrastructure management subnets for all shared peripherals."
  },
  {
    id: 2,
    title: "Domain Name System (DNS) Resolution Failure & Stale Records",
    layer: "Layer 7 (Application Layer)",
    problem: "Staff could access web applications using raw IPv4 addresses (http://192.168.10.25:8080), but all internal domain lookups (portal.datamex.edu.ph) failed with 'DNS_PROBE_FINISHED_NXDOMAIN', halting campus administrative workflows.",
    causes: [
      "The secondary DNS forwarder configured in Windows Server DNS manager was pointing to a decommissioned ISP recursive resolver (203.177.54.1).",
      "Local workstation DNS cache held stale negative response records with aggressive TTL settings.",
      "The local DNS Server daemon service hung following an automatic operating system security patch."
    ],
    cliTitle: "Network Diagnostics & Resolver Inspection",
    cliOutput: `<span class="term-prompt">C:\\Users\\jcastro&gt;</span> <span class="term-cmd">nslookup portal.datamex.edu.ph</span>
<span class="term-output">Server:  UnKnown
Address:  192.168.10.2

*** UnKnown can't find portal.datamex.edu.ph: <span class="term-error">Server failed</span></span>

<span class="term-prompt">C:\\Users\\jcastro&gt;</span> <span class="term-cmd">nslookup portal.datamex.edu.ph 1.1.1.1</span>
<span class="term-output">Server:  one.one.one.one
Address:  1.1.1.1

Non-authoritative answer:
Name:    portal.datamex.edu.ph
Address:  <span class="term-success">192.168.10.25</span>   <span class="term-highlight">&lt;-- Public resolver succeeds, isolating internal server issue</span></span>

<span class="term-prompt">C:\\Users\\jcastro&gt;</span> <span class="term-cmd">ipconfig /displaydns</span>
<span class="term-output">portal.datamex.edu.ph
----------------------------------------
Record Name . . . . . : portal.datamex.edu.ph
Record Type . . . . . : 1
Time To Live  . . . . : 3594
Data Length . . . . . : 4
Section . . . . . . . : Answer
A (IPv4) Record . . . : <span class="term-error">10.0.0.12 (Obsolete Staging IP)</span></span>`,
    solution: "1. Remoted into DNS Server (192.168.10.2) and restarted Windows DNS Service via 'Restart-Service DNS' in PowerShell.\n2. Replaced dead upstream ISP forwarders with redundant enterprise DNS resolvers (1.1.1.1 and 8.8.8.8).\n3. Cleared local DNS Server cache ('dnscmd /clearcache') and published authoritative A record for 'portal.datamex.edu.ph -> 192.168.10.25'.\n4. Issued 'ipconfig /flushdns' and verified resolution latency under 2ms.",
    lesson: "Ensure mission-critical DNS servers have active service heartbeats, maintain dual diverse forwarders, and configure monitoring alarms for expired forwarder latency."
  },
  {
    id: 3,
    title: "High Latency, Packet Drops & Duplex Mismatch",
    layer: "Layer 1 & Layer 2 (Physical & Data Link)",
    problem: "Accounting department VoIP phones experienced audio stutter and SQL ERP queries timed out intermittently with round-trip delays spiking to 480ms and 24% dropped packets over a 100-meter backbone link.",
    causes: [
      "Duplex mismatch: The distribution switch port was hard-coded to 100Mbps Full Duplex, while the client managed switch was left on IEEE Auto-Negotiation, defaulting to Half Duplex.",
      "Physical Layer 1 cable degradation: A damaged RJ-45 boot on Patch Cable #3 introduced high return loss and near-end crosstalk (NEXT).",
      "Late collision storms triggered by unmonitored half-duplex transmission under heavy traffic loads."
    ],
    cliTitle: "Cisco Catalyst Port Telemetry & Ping Diagnostic",
    cliOutput: `<span class="term-prompt">C:\\Users\\jcastro&gt;</span> <span class="term-cmd">ping -n 20 192.168.10.1</span>
<span class="term-output">Reply from 192.168.10.1: bytes=32 time=420ms TTL=64
Reply from 192.168.10.1: bytes=32 time=3ms TTL=64
<span class="term-error">Request timed out.</span>
Reply from 192.168.10.1: bytes=32 time=485ms TTL=64
<span class="term-error">Request timed out.</span>
Packets: Sent = 20, Received = 15, Lost = 5 <span class="term-error">(25% loss)</span>, Average = 285ms</span>

<span class="term-prompt">Core-Switch-3750#</span> <span class="term-cmd">show interfaces GigabitEthernet1/0/24</span>
<span class="term-output">GigabitEthernet1/0/24 is up, line protocol is up (connected)
  Full-duplex, 100Mb/s, link type is auto, media type is 10/100/1000BaseTX
  <span class="term-error">14820 input errors, 8910 CRC, 0 frame, 5910 overrun, 0 ignored</span>
  <span class="term-error">12340 late collision, 2341 deferred, 15 lost carrier</span>   <span class="term-highlight">&lt;-- Classic Duplex Mismatch Symptom</span></span>`,
    solution: "1. Verified cable pinout with Fluke MicroScanner2; identified intermittent continuity on pin 3 (Tx+); replaced cable with certified Cat6 STP patch lead.\n2. Reconfigured both connecting switch interfaces to standard IEEE auto-negotiation ('speed auto', 'duplex auto').\n3. Cleared interface counters ('clear counters Gi1/0/24') and verified 0 CRC errors, 0 late collisions, and sub-1ms ping latency over 500 consecutive ICMP packets.",
    lesson: "Never set one end of an Ethernet link to manual speed/duplex while leaving the other end on auto-negotiation. Under IEEE 802.3u, an auto-negotiating device defaults to Half Duplex if partner pulses are undetected."
  },
  {
    id: 4,
    title: "Switch Port Failure & VLAN Tagging Mismatch",
    layer: "Layer 2 (Data Link Layer)",
    problem: "A newly provisioned workstation in Registrar Office received an IP address on VLAN 30, but could not reach Registrar database servers (192.168.30.10) or any other host on the campus network.",
    causes: [
      "Access switch port Fa0/18 was accidentally assigned to Default VLAN 1 instead of Registrar VLAN 30.",
      "The 802.1Q trunk link between the Access Switch and Core Switch had an explicit 'switchport trunk allowed vlan' list that omitted VLAN 30.",
      "Native VLAN mismatch between switches causing Spanning Tree Protocol (PVST+) to block the uplink."
    ],
    cliTitle: "Cisco Catalyst VLAN & Trunking Audit",
    cliOutput: `<span class="term-prompt">SW-Floor2-Access#</span> <span class="term-cmd">show vlan brief</span>
<span class="term-output">VLAN Name                             Status    Ports
---- -------------------------------- --------- -------------------------------
1    default                          active    Fa0/1, Fa0/2, <span class="term-error">Fa0/18</span> <span class="term-highlight">&lt;-- Incorrect VLAN</span>
10   Students                         active    Fa0/3, Fa0/4, Fa0/5
20   Faculty                          active    Fa0/6, Fa0/7, Fa0/8
30   Registrar                        active    Fa0/9, Fa0/10</span>

<span class="term-prompt">SW-Floor2-Access#</span> <span class="term-cmd">show interfaces trunk</span>
<span class="term-output">Port        Mode             Encapsulation  Status        Native vlan
Gi0/1       on               802.1q         trunking      1

Port        Vlans allowed on trunk
Gi0/1       1-10,20 <span class="term-error">(VLAN 30 MISSING FROM TRUNK LIST)</span></span>`,
    solution: "1. Reassigned the access port to VLAN 30:\n   'interface FastEthernet0/18' -> 'switchport mode access' -> 'switchport access vlan 30'.\n2. Updated the trunk uplink on Gi0/1 on both Access and Core switches:\n   'interface GigabitEthernet0/1' -> 'switchport trunk allowed vlan add 30'.\n3. Verified trunking status and connectivity using 'ping 192.168.30.10' with 0% loss.",
    lesson: "Maintain centralized VLAN allocation tables and establish standardized trunking templates ('switchport trunk allowed vlan all' or strictly documented pruning policies) to prevent blackholing newly provisioned subnets."
  },
  {
    id: 5,
    title: "Default Gateway Unreachable & Routing Loop",
    layer: "Layer 3 (Network Layer)",
    problem: "Workstations in Administration could communicate with local subnet peers (192.168.50.0/24), but all internet traffic and inter-VLAN access timed out with 'Destination host unreachable'.",
    causes: [
      "A technician manually added a persistent static route (0.0.0.0 mask 0.0.0.0 192.168.50.254) with a lower metric (10), overriding the true gateway (192.168.50.1).",
      "A routing loop occurred on the multi-homed workstation with both active Wi-Fi and wired Ethernet adapters configured with conflicting default gateways.",
      "Corrupted ARP table cache mapping the gateway IP to an unresolved broadcast MAC address."
    ],
    cliTitle: "Windows Route Print & Traceroute Trace",
    cliOutput: `<span class="term-prompt">C:\\Users\\jcastro&gt;</span> <span class="term-cmd">route print -4</span>
<span class="term-output">===========================================================================
Active Routes:
Network Destination        Netmask          Gateway       Interface  Metric
          0.0.0.0          0.0.0.0   192.168.50.254   192.168.50.45      <span class="term-error">10 (Dead Next-Hop)</span>
          0.0.0.0          0.0.0.0     192.168.50.1   192.168.50.45      25 (Valid Gateway)
===========================================================================</span>

<span class="term-prompt">C:\\Users\\jcastro&gt;</span> <span class="term-cmd">tracert -d 8.8.8.8</span>
<span class="term-output">Tracing route to 8.8.8.8 over a maximum of 30 hops
  1  192.168.50.254  reports: <span class="term-error">Destination host unreachable.</span>
Trace complete.</span>`,
    solution: "1. Deleted the invalid static route via 'route delete 0.0.0.0 192.168.50.254'.\n2. Set explicit metric priorities on the network interface properties, giving priority (metric 10) to the wired Ethernet connection.\n3. Flushed ARP table with 'arp -d *' and verified default gateway connectivity with 'ping 192.168.50.1' and successful internet traversal through 'tracert 8.8.8.8'.",
    lesson: "Audit workstation routing tables when multiple network interfaces (Ethernet + Wi-Fi) are active, and lock down local administrator privileges to prevent unauthorized persistent route additions."
  }
];

window.openTroubleshootingModal = function(caseIndex = 0) {
  renderTroubleshootingCase(caseIndex);
};

window.switchTroubleshootingCase = function(index) {
  renderTroubleshootingCase(index);
};

function renderTroubleshootingCase(caseIndex) {
  const currentCase = TROUBLESHOOTING_CASES_DATA[caseIndex] || TROUBLESHOOTING_CASES_DATA[0];

  const tabsHtml = `
    <div class="modal-tabs-bar">
      ${TROUBLESHOOTING_CASES_DATA.map((c, i) => `
        <button type="button" class="modal-tab-btn ${i === caseIndex ? 'active' : ''}" onclick="switchTroubleshootingCase(${i})">
          Case ${c.id}: ${c.title.split('&')[0].trim()}
        </button>
      `).join('')}
    </div>
  `;

  const causesList = currentCase.causes.map(cause => `<li>${cause}</li>`).join('');

  const contentHtml = `
    ${tabsHtml}
    
    <div style="display: flex; align-items: center; justify-content: space-between; flex-wrap: gap: 12px; margin-bottom: 16px;">
      <h3 style="font-family: var(--font-heading); font-size: 1.3rem; font-weight: 800; color: #ffffff; margin: 0;">
        Case ${currentCase.id}: ${currentCase.title}
      </h3>
      <span style="font-size: 0.75rem; font-weight: 700; color: #5ce1e6; background: rgba(92, 225, 230, 0.1); border: 1px solid rgba(92, 225, 230, 0.25); padding: 4px 10px; border-radius: 9999px;">
        ${currentCase.layer}
      </span>
    </div>

    <!-- 1. Problem Description -->
    <div class="modal-detail-card">
      <div class="modal-detail-title">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="12"></line><line x1="12" y1="16" x2="12.01" y2="16"></line></svg>
        1. Problem Statement & Incident Description
      </div>
      <div class="modal-detail-body">
        ${currentCase.problem}
      </div>
    </div>

    <!-- 2. Possible Causes -->
    <div class="modal-detail-card">
      <div class="modal-detail-title">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"></circle><line x1="15" y1="9" x2="9" y2="15"></line><line x1="9" y1="9" x2="15" y2="15"></line></svg>
        2. Potential Root Causes Investigated
      </div>
      <div class="modal-detail-body">
        <ul>${causesList}</ul>
      </div>
    </div>

    <!-- 3. Terminal Diagnostics -->
    <div class="terminal-box">
      <div class="terminal-topbar">
        <div class="terminal-dots">
          <span class="t-dot red"></span>
          <span class="t-dot yellow"></span>
          <span class="t-dot green"></span>
        </div>
        <span class="terminal-title">3. Step-by-Step Diagnostic Telemetry &mdash; ${currentCase.cliTitle}</span>
        <span style="font-size: 0.7rem; color: #5ce1e6;">Live Session Logs</span>
      </div>
      <div class="terminal-body">${currentCase.cliOutput}</div>
    </div>

    <!-- 4. Solution Applied -->
    <div class="modal-detail-card">
      <div class="modal-detail-title" style="color: #4ade80;">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>
        4. Technical Remediation & Solution
      </div>
      <div class="modal-detail-body" style="white-space: pre-line;">
        ${currentCase.solution}
      </div>
    </div>

    <!-- 5. Lesson Learned -->
    <div class="modal-detail-card" style="border-color: rgba(243, 112, 30, 0.3); background: rgba(243, 112, 30, 0.03);">
      <div class="modal-detail-title">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path></svg>
        5. Key Lesson Learned & Preventative Policy
      </div>
      <div class="modal-detail-body">
        <strong>Takeaway:</strong> ${currentCase.lesson}
      </div>
    </div>
  `;

  openPortfolioModal(
    "IT Troubleshooting Portfolio (5 Cases)",
    "Step 17 Rubric • Page 10 Template",
    contentHtml
  );
}

/* ========================================================
   STEP 18: CYBERSECURITY CASE STUDY (SQL INJECTION)
   ======================================================== */

window.openCybersecurityModal = function() {
  const contentHtml = `
    <div style="margin-bottom: 24px;">
      <div style="display: inline-block; padding: 4px 12px; border-radius: 9999px; background: rgba(239, 68, 68, 0.15); border: 1px solid rgba(239, 68, 68, 0.35); color: #ef4444; font-size: 0.75rem; font-weight: 700; text-transform: uppercase; letter-spacing: 0.08em; margin-bottom: 12px;">
        Vulnerability Audit • OWASP Top 10 A03:2021
      </div>
      <h3 style="font-family: var(--font-heading); font-size: 1.5rem; font-weight: 800; color: #ffffff; line-height: 1.3; margin-bottom: 10px;">
        Anatomy of SQL Injection (SQLi) &amp; Defensive Prepared Statements
      </h3>
      <p style="color: rgba(255, 255, 255, 0.7); font-size: 0.92rem; line-height: 1.6;">
        A comprehensive security analysis evaluating authentication bypass vectors in IT helpdesk ticketing software, contrasting vulnerable string concatenation with parameterized defense.
      </p>
    </div>

    <!-- Prompt 1: What is the vulnerability? -->
    <div class="modal-detail-card">
      <div class="modal-detail-title">
        1. What is the Vulnerability?
      </div>
      <div class="modal-detail-body">
        <strong>SQL Injection (SQLi)</strong> is an application-layer injection vulnerability that occurs when untrusted user input is directly concatenated or interpolated into a dynamic database query without proper sanitization, escaping, or parameterization. It violates the fundamental security boundary between executable SQL code and data input, allowing attackers to manipulate the database interpreter's syntax structure.
      </div>
    </div>

    <!-- Prompt 2: How can it happen? Code Comparison -->
    <div class="modal-detail-card">
      <div class="modal-detail-title">
        2. How Can It Happen? (Attack Vector &amp; Code Contrast)
      </div>
      <div class="modal-detail-body">
        When a web backend constructs SQL queries via string concatenation, an attacker inputting characters such as single quotes (<code>'</code>), double hyphens (<code>--</code>), or logical operators (<code>OR 1=1</code>) can alter the boolean evaluation of the SQL command, completely bypassing authentication.
      </div>

      <div class="code-compare-wrap">
        <div class="code-compare-card vulnerable">
          <div class="code-compare-header">
            <span>❌ Vulnerable Code (String Concatenation)</span>
          </div>
          <div class="code-compare-snippet">// User Input: username = "admin' OR '1'='1"
// Resulting Query:
SELECT * FROM technicians 
WHERE username = 'admin' OR '1'='1' 
  AND password_hash = '...';

<span style="color: #ef4444;">// Result: '1'='1' always evaluates to TRUE.
// Attacker logs in as ADMIN without password!</span></div>
        </div>

        <div class="code-compare-card secure">
          <div class="code-compare-header">
            <span>✅ Secure Code (Parameterized Query / Prepared Statement)</span>
          </div>
          <div class="code-compare-snippet">// Input is treated strictly as literal data:
const query = "SELECT * FROM technicians WHERE username = $1 AND password_hash = $2";
const values = [usernameInput, hashedPassword];
const result = await db.query(query, values);

<span style="color: #22c55e;">// Result: Database engine treats input as raw string literal.
// Quote characters cannot alter SQL grammar!</span></div>
        </div>
      </div>
    </div>

    <!-- Prompt 3: What are the risks? -->
    <div class="modal-detail-card">
      <div class="modal-detail-title">
        3. What Are the Critical Risks to the Organization?
      </div>
      <div class="modal-detail-body">
        <ul>
          <li><strong>Confidentiality Breach:</strong> Exfiltration of sensitive customer records, technician passwords, and proprietary hardware schematics.</li>
          <li><strong>Authentication &amp; Privilege Escalation:</strong> Bypassing login credentials to gain full administrative or superuser privileges on the database.</li>
          <li><strong>Data Tampering &amp; Deletion:</strong> Execution of malicious DDL/DML statements such as <code>DROP TABLE tickets;</code> or unauthorized alterations to financial invoice records.</li>
          <li><strong>Operating System Compromise:</strong> Under database engines with privileged procedural extensions (e.g., MSSQL <code>xp_cmdshell</code> or Postgres <code>COPY TO PROGRAM</code>), SQLi can escalate to Remote Code Execution (RCE) on the underlying host.</li>
        </ul>
      </div>
    </div>

    <!-- Prompt 4: How can developers prevent it? -->
    <div class="modal-detail-card">
      <div class="modal-detail-title">
        4. How Can Developers Prevent It?
      </div>
      <div class="modal-detail-body">
        <ul>
          <li><strong>Parameterized Queries (Prepared Statements):</strong> Ensure the database engine compiles the SQL statement template before binding parameter values, preventing data from being interpreted as code.</li>
          <li><strong>Object-Relational Mapping (ORM):</strong> Utilize secure query builder abstractions (e.g., Prisma, Supabase PostgREST, Sequelize) that enforce parameterization natively.</li>
          <li><strong>Strict Input Type Validation &amp; Allowlisting:</strong> Enforce strong type validations (e.g., Zod, regex schema checks) rejecting unexpected characters before they reach the database interface.</li>
        </ul>
      </div>
    </div>

    <!-- Prompt 5: Security practices -->
    <div class="modal-detail-card">
      <div class="modal-detail-title">
        5. Enterprise Security Best Practices to Implement
      </div>
      <div class="modal-detail-body">
        <ul>
          <li><strong>Principle of Least Privilege:</strong> Configure the application's database connection user with minimal permissions (only SELECT, INSERT, UPDATE on necessary tables; revoke DROP, ALTER, and administrative privileges).</li>
          <li><strong>Web Application Firewall (WAF):</strong> Deploy Cloudflare or AWS WAF to inspect incoming HTTP payloads and block known SQL injection attack signatures at the network edge.</li>
          <li><strong>Automated Security Auditing (SAST &amp; DAST):</strong> Integrate tools like SonarQube, Snyk, and OWASP ZAP into CI/CD build pipelines to continuously detect injection vectors.</li>
        </ul>
      </div>
    </div>
  `;

  openPortfolioModal(
    "Cybersecurity Case Study (SQLi Audit)",
    "Step 18 Rubric • 5-Prompt Framework",
    contentHtml
  );
};

/* ========================================================
   STEP 19: AI LITERACY EVIDENCE & USAGE LOG
   ======================================================== */

window.openAiUsageLogModal = function() {
  const contentHtml = `
    <div style="margin-bottom: 24px;">
      <div style="display: inline-block; padding: 4px 12px; border-radius: 9999px; background: rgba(92, 225, 230, 0.15); border: 1px solid rgba(92, 225, 230, 0.35); color: #5ce1e6; font-size: 0.75rem; font-weight: 700; text-transform: uppercase; letter-spacing: 0.08em; margin-bottom: 12px;">
        Verifiable Academic AI Log • Page 10 Template
      </div>
      <h3 style="font-family: var(--font-heading); font-size: 1.5rem; font-weight: 800; color: #ffffff; line-height: 1.3; margin-bottom: 10px;">
        AI Literacy Evidence &amp; Verification Audit Log
      </h3>
      <p style="color: rgba(255, 255, 255, 0.7); font-size: 0.92rem; line-height: 1.6;">
        Complete documented record demonstrating ethical, responsible, and verifiable utilization of Artificial Intelligence tools throughout capstone system development.
      </p>
    </div>

    <!-- Part 1: Official Table -->
    <div class="ai-table-container">
      <table class="ai-log-table">
        <thead>
          <tr>
            <th style="width: 15%;">Date</th>
            <th style="width: 25%;">Task &amp; Context</th>
            <th style="width: 30%;">AI Assistance Prompt</th>
            <th style="width: 30%;">My Personal Verification &amp; Result</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><strong>Oct 2, 2026</strong></td>
            <td>
              <strong>Supabase PostgreSQL Schema &amp; RLS Policies</strong><br>
              <span style="font-size: 0.75rem; color: #9ca3af;">AI Repair System</span>
            </td>
            <td>Prompted Gemini 1.5 Pro to generate PostgreSQL tables with Row-Level Security policies enforcing technician vs customer data access.</td>
            <td>
              <span class="ai-verified-tag">✓ Verified &amp; Corrected</span><br>
              Identified that AI omitted a foreign key CASCADE rule on ticket_logs; corrected syntax and tested in Supabase SQL editor to ensure unauthenticated users could not read private client phone numbers.
            </td>
          </tr>
          <tr>
            <td><strong>Oct 4, 2026</strong></td>
            <td>
              <strong>Gemini API Diagnostic Engine Logic</strong><br>
              <span style="font-size: 0.75rem; color: #9ca3af;">api/diagnose.js</span>
            </td>
            <td>Requested prompt structuring logic for parsing hardware symptoms into JSON output schema with recommended diagnostic steps.</td>
            <td>
              <span class="ai-verified-tag">✓ Verified &amp; Hardened</span><br>
              Audited AI-generated error handling. AI assumed the API would never fail; added robust try/catch with fallback local rule-based troubleshooting dictionaries when API keys or network fail.
            </td>
          </tr>
          <tr>
            <td><strong>Oct 6, 2026</strong></td>
            <td>
              <strong>Store Sales Analytics Pivot Formulations</strong><br>
              <span style="font-size: 0.75rem; color: #9ca3af;">Excel Case Study</span>
            </td>
            <td>Asked AI for nested IFS and SUMIFS formulas to calculate tiered profit margins across 50 retail PC component transactions.</td>
            <td>
              <span class="ai-verified-tag">✓ Verified Manually</span><br>
              Manually verified financial computations for 10 sample hardware transactions against calculator output. Discovered an error where AI inverted the markup percentage calculation; fixed formula.
            </td>
          </tr>
          <tr>
            <td><strong>Oct 8, 2026</strong></td>
            <td>
              <strong>WebGL Topography Canvas Shader</strong><br>
              <span style="font-size: 0.75rem; color: #9ca3af;">Portfolio Visuals</span>
            </td>
            <td>Prompted AI for WebGL fragment shader math simulating topographic network elevation curves with mouse interactivity.</td>
            <td>
              <span class="ai-verified-tag">✓ Verified &amp; Optimized</span><br>
              Tested on mobile device; found severe frame drops (18 FPS). Refactored canvas render loop with DevicePixelRatio capping and window resize throttling to achieve a silky 60 FPS.
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Part 2: 4 Reflection Questions -->
    <h4 style="font-family: var(--font-heading); font-size: 1.15rem; font-weight: 700; color: #ffffff; margin-bottom: 16px;">
      Critical AI Literacy Reflection (4 Mandatory Questions)
    </h4>

    <div class="modal-detail-card">
      <div class="modal-detail-title">
        1. What Did AI Help Me Accomplish?
      </div>
      <div class="modal-detail-body">
        AI functioned as an efficient technical accelerator and pair programming companion. It eliminated repetitive boilerplate coding (such as drafting preliminary SQL schemas and mathematical formula skeletons), allowed rapid exploration of alternative architectural patterns, and helped brainstorm comprehensive diagnostic edge-cases for computer hardware troubleshooting.
      </div>
    </div>

    <div class="modal-detail-card">
      <div class="modal-detail-title">
        2. What Did I Personally Verify?
      </div>
      <div class="modal-detail-body">
        I personally validated 100% of all generated outputs. Specifically, I conducted manual mathematical recalculations on data analytics formulas, executed database policy assertions to ensure zero unauthorized data leakage under Row-Level Security, tested API rate-limiting thresholds, and ensured all network configuration scripts strictly conformed to Cisco IOS and IEEE standards.
      </div>
    </div>

    <div class="modal-detail-card">
      <div class="modal-detail-title">
        3. What Did I Learn from Using AI?
      </div>
      <div class="modal-detail-body">
        I learned that AI is a powerful assistant, not an authoritative engineer. High-quality results depend directly on the technical depth and clarity of the engineer's prompt. An IT professional must possess foundational subject matter expertise; otherwise, one cannot distinguish between a robust architectural pattern and a dangerous hallucination.
      </div>
    </div>

    <div class="modal-detail-card">
      <div class="modal-detail-title">
        4. What Limitations and Errors Did I Discover?
      </div>
      <div class="modal-detail-body">
        I discovered that AI frequently suggests deprecated libraries, produces subtle off-by-one errors in complex calculations, and routinely overlooks resilient defensive engineering—such as omitting network timeout handling, edge-case null checks, and security boundaries. Critical human verification remains irreplaceable.
      </div>
    </div>
  `;

  openPortfolioModal(
    "AI Literacy Evidence & Usage Log",
    "Step 19 Rubric • Page 10 Template",
    contentHtml
  );
};

/* ========================================================
   STEP 21: MOCK JOB INTERVIEW (VIDEO PLACEHOLDER & 12 Q&AS)
   ======================================================== */

const MOCK_INTERVIEW_QUESTIONS = [
  {
    q: "Tell me about yourself.",
    a: "I am Jhay L. Castro, a graduating BSIT student from Datamex College of Saint Adeline specializing in Network Engineering and Systems Administration. I hold an NC II Certification in Computer Systems Servicing, which gave me hands-on proficiency in hardware diagnostics, structured cabling, and client-server configurations. During my academic career, I served as Technical Lead for our capstone project, architecting an AI-Assisted Repair Shop Management System that unified cloud databases with automated diagnostic telemetry. I am passionate about enterprise network resilience, zero-trust security backbones, and structured problem-solving."
  },
  {
    q: "Why did you choose BSIT at Datamex College of Saint Adeline?",
    a: "I chose BSIT at Datamex because of its rigorous balance between theoretical computer science and hands-on laboratory application. The curriculum directly emphasized real-world networking equipment, physical hardware maintenance, and modern full-stack development, giving me practical technical competencies that prepare me to contribute to enterprise IT operations from day one."
  },
  {
    q: "What are your greatest technical strengths?",
    a: "My greatest strength is structured root-cause diagnostic methodology across the OSI model. Rather than guessing, I isolate network and systems issues systematically from Layer 1 physical connectivity up through Layer 7 application protocols. Additionally, I have strong competencies in Cisco routing/switching (VLANs, trunking, DHCP, subnetting) and full-stack database state synchronization."
  },
  {
    q: "What is a technical weakness you are currently working to improve?",
    a: "Historically, my focus has been heavily concentrated on manual CLI configuration and physical hardware diagnostics. Recognizing that modern enterprise networks require programmatic scalability, I have been actively training in Network Automation using Python (Netmiko/NAPALM) and Infrastructure as Code using Terraform to automate multi-device provisioning."
  },
  {
    q: "How do you handle strict deadlines and high-pressure situations?",
    a: "I prioritize tasks through systematic triage: identifying critical path dependencies first, breaking deliverables into time-boxed milestones, and maintaining transparent communication with stakeholders. During our capstone deployment when we encountered unexpected database latency 48 hours before review, I maintained composure, isolated the bottleneck to unindexed foreign keys, and deployed the fix calmly."
  },
  {
    q: "Describe a time you resolved a conflict or disagreement within a technical project team.",
    a: "During our capstone system design, our team was divided between using a complex multi-tier microservices architecture versus a streamlined cloud-native architecture. As Technical Lead, I facilitated an objective decision matrix evaluating our development timeline, hosting cost, and maintenance overhead. By grounding our discussion in measurable constraints rather than personal preference, the team reached unanimous alignment."
  },
  {
    q: "How do you stay updated with rapidly changing IT technologies?",
    a: "I actively follow Cisco Learning Network publications, enterprise engineering blogs (Cloudflare, AWS Architecture), and participate in GitHub developer communities. I also maintain a home lab environment where I experiment with packet captures in Wireshark and configure virtual routing topologies in Cisco Packet Tracer."
  },
  {
    q: "Where do you see yourself in 3 to 5 years in the IT industry?",
    a: "In 3 years, I plan to have achieved my Cisco CCNA and CompTIA Network+ certifications, operating as an established Network Administrator or NOC Specialist leading VLAN segmentation and firewall migrations. In 5 years, I aim to attain CCNP Enterprise credentials and step into a Senior Infrastructure Architect role designing fault-tolerant multi-cloud networks."
  },
  {
    q: "Why are you specifically interested in becoming a Network Engineer?",
    a: "Networking is the foundational backbone of every digital service on the planet—without high-availability routing, switching, and security policies, no application, database, or AI model can function. I find immense satisfaction in understanding how millions of packets traverse complex topologies seamlessly and ensuring zero-downtime reliability."
  },
  {
    q: "Describe how you troubleshoot an issue when you have never encountered it before.",
    a: "I apply a disciplined scientific approach: First, I document the exact symptoms and examine system logs for error codes. Second, I isolate the failure domain using binary elimination across the OSI model. Third, I consult authoritative documentation and RFC standards. Fourth, I formulate a hypothesis and test changes incrementally in an isolated environment before applying fixes to production."
  },
  {
    q: "How has your NC II in Computer Systems Servicing prepared you for professional IT support?",
    a: "The TESDA NC II credential rigorously validated my skills in physical assembly, Cat6 patch cable termination, punch-down blocks, BIOS configuration, OS deployment, and peripheral bench testing. It ensured that before I ever touch logical enterprise configurations, I possess master-level physical craftsmanship and electrical safety discipline."
  },
  {
    q: "Why should our organization hire you over other BSIT graduates?",
    a: "You should hire me because my skills are backed by verifiable evidence, not just classroom grades. I come with hands-on NC II certified craftsmanship, proven leadership as a Capstone Technical Project Lead, real experience deploying full-stack systems and cloud topologies, and an unrelenting work ethic dedicated to continuous technical excellence."
  }
];

window.openMockInterviewModal = function() {
  const questionsHtml = MOCK_INTERVIEW_QUESTIONS.map((item, idx) => `
    <div class="interview-accordion-item ${idx === 0 ? 'open' : ''}" id="interview-item-${idx}">
      <button type="button" class="interview-accordion-btn" onclick="toggleInterviewAccordion(${idx})">
        <span>
          <span class="interview-q-num">Q${idx + 1}</span>
          ${item.q}
        </span>
        <svg class="interview-chevron" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="6 9 12 15 18 9"></polyline></svg>
      </button>
      <div class="interview-accordion-body">
        ${item.a}
      </div>
    </div>
  `).join('');

  const contentHtml = `
    <!-- Mock Video Player Frame -->
    <div class="video-mock-frame">
      <div class="video-mock-overlay">
        <div class="video-play-ring" title="Play Mock Interview Recording">
          ▶
        </div>
        <div>
          <h4 style="font-family: var(--font-heading); font-size: 1.15rem; font-weight: 700; color: #ffffff; margin-bottom: 4px;">
            Jhay Castro &mdash; Professional Mock Job Interview
          </h4>
          <p class="video-mock-notice">
            📁 Video Placeholder Frame &bull; Ready for upload to <code>assets/mock-interview.mp4</code> or YouTube embed.
          </p>
        </div>
      </div>
      <div class="video-mock-controls">
        <span>Session Duration: 14:32</span>
        <span>Resolution: 1080p HD &bull; Stereo Audio</span>
      </div>
      <div class="video-progress-bar">
        <div class="video-progress-fill"></div>
      </div>
    </div>

    <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 16px;">
      <div>
        <h4 style="font-family: var(--font-heading); font-size: 1.25rem; font-weight: 800; color: #ffffff; margin-bottom: 4px;">
          Full 12-Question Interview Q&amp;A Transcript
        </h4>
        <p style="font-size: 0.85rem; color: rgba(255, 255, 255, 0.6); margin: 0;">
          Transcribed responses to the official Step 21 IT Employment Readiness Rubric.
        </p>
      </div>
      <span class="emp-badge">12 Complete Questions</span>
    </div>

    <div class="interview-accordion-container">
      ${questionsHtml}
    </div>
  `;

  openPortfolioModal(
    "Mock Job Interview (Recording & Transcript)",
    "Step 21 Rubric • 20 Points Evidence",
    contentHtml
  );
};

window.toggleInterviewAccordion = function(idx) {
  const item = document.getElementById(`interview-item-${idx}`);
  if (item) {
    item.classList.toggle('open');
  }
};

/* ========================================================
   STEP 21: TECHNICAL INTERVIEW Q&A ACCORDION
   ======================================================== */

const TECHNICAL_INTERVIEW_QUESTIONS = [
  {
    q: "Explain the OSI 7-Layer Model and how you use it to troubleshoot a real-world network failure.",
    a: `<strong>The OSI 7-Layer Model</strong> divides network communication into seven functional abstraction layers:
<ul>
  <li><strong>Layer 1 (Physical):</strong> Cables, NICs, electrical pulses, fiber light.</li>
  <li><strong>Layer 2 (Data Link):</strong> Ethernet frames, MAC addresses, switch ASICs, VLANs, ARP.</li>
  <li><strong>Layer 3 (Network):</strong> IP packets, logical routing, routers, ICMP.</li>
  <li><strong>Layer 4 (Transport):</strong> TCP/UDP segments, port numbers, flow control, windowing.</li>
  <li><strong>Layer 5 (Session):</strong> Session establishment, management, RPC.</li>
  <li><strong>Layer 6 (Presentation):</strong> Data serialization, encryption (TLS/SSL), formatting.</li>
  <li><strong>Layer 7 (Application):</strong> End-user protocols (HTTP, DNS, SSH, DHCP, FTP).</li>
</ul>
<strong>Troubleshooting Methodology:</strong> I employ the bottom-up approach. For example, if a client cannot access a web app, I verify physical link lights (Layer 1), verify MAC table entries and VLAN tagging (Layer 2), test gateway ping and routing tables (Layer 3), verify TCP port 443 handshake (Layer 4), and inspect HTTP response codes and DNS resolution (Layer 7). This eliminates 90% of false assumptions immediately.`
  },
  {
    q: "Compare TCP vs. UDP: What are the fundamental differences, headers, and protocol use-cases?",
    a: `<strong>TCP (Transmission Control Protocol)</strong> is connection-oriented, providing reliable, ordered, and error-checked byte stream delivery via the Three-Way Handshake (SYN &rarr; SYN-ACK &rarr; ACK). It features flow control (sliding window), congestion control, and a 20-byte minimum header. Used for HTTP/HTTPS, SSH, FTP, and database transactions where zero packet loss is mandatory.
<br><br>
<strong>UDP (User Datagram Protocol)</strong> is connectionless, lightweight, and best-effort with an 8-byte header and no retransmission or handshake overhead. Used in real-time scenarios like VoIP, DNS queries, video streaming, and online gaming where minimal latency is favored over lost packet retransmission.`
  },
  {
    q: "Subnetting & VLSM: How would you subnet a 192.168.1.0/24 network to support 4 departments requiring 25 hosts each?",
    a: `<strong>Analysis:</strong> A <code>/24</code> network provides 256 total IP addresses (254 usable hosts). We need 4 subnets with at least 25 usable hosts each.
<br><br>
To accommodate 25 hosts, we need a host bit length <code>h</code> satisfying <code>2^h - 2 &ge; 25</code>. For <code>h = 5</code>: <code>2^5 - 2 = 30</code> usable hosts per subnet. Borrowing 3 network bits from the host portion gives a <code>/27</code> prefix (24 + 3 = 27), with subnet mask <code>255.255.255.224</code>:
<ul>
  <li><strong>Subnet 1 (Admin):</strong> Network: <code>192.168.1.0/27</code> | Usable Range: <code>192.168.1.1 - 192.168.1.30</code> | Broadcast: <code>192.168.1.31</code></li>
  <li><strong>Subnet 2 (Sales):</strong> Network: <code>192.168.1.32/27</code> | Usable Range: <code>192.168.1.33 - 192.168.1.62</code> | Broadcast: <code>192.168.1.63</code></li>
  <li><strong>Subnet 3 (IT):</strong> Network: <code>192.168.1.64/27</code> | Usable Range: <code>192.168.1.65 - 192.168.1.94</code> | Broadcast: <code>192.168.1.95</code></li>
  <li><strong>Subnet 4 (Support):</strong> Network: <code>192.168.1.96/27</code> | Usable Range: <code>192.168.1.97 - 192.168.1.126</code> | Broadcast: <code>192.168.1.127</code></li>
</ul>
This leaves subnets 5 through 8 (128 addresses) available for future growth.`
  },
  {
    q: "Explain Database Normalization (1NF, 2NF, 3NF) and why it matters in enterprise software.",
    a: `<strong>Database Normalization</strong> is the systematic process of organizing relational database schemas to eliminate redundant data and avoid insertion, update, and deletion anomalies:
<ul>
  <li><strong>1NF (First Normal Form):</strong> Eliminates repeating groups; ensures all table attributes contain atomic (indivisible) values and each row has a primary key.</li>
  <li><strong>2NF (Second Normal Form):</strong> Meets 1NF AND removes partial functional dependencies (all non-key attributes must depend on the entire primary key, not a subset of a composite key).</li>
  <li><strong>3NF (Third Normal Form):</strong> Meets 2NF AND removes transitive dependencies (non-key columns must depend strictly on the primary key and nothing else; 'the key, the whole key, and nothing but the key').</li>
</ul>
In our Capstone Repair System, normalizing tickets, parts inventory, and technicians into distinct 3NF tables ensured that changing a technician's phone number never created inconsistent historical records across 1,000 work orders.`
  },
  {
    q: "Explain RESTful API architecture principles and standard HTTP status code taxonomy.",
    a: `<strong>REST (Representational State Transfer)</strong> is a stateless architectural style for web services utilizing standard HTTP verbs:
<ul>
  <li><code>GET</code> (Retrieve resource &mdash; safe &amp; idempotent)</li>
  <li><code>POST</code> (Create new resource &mdash; non-idempotent)</li>
  <li><code>PUT</code> (Replace complete resource &mdash; idempotent)</li>
  <li><code>PATCH</code> (Partial modification &mdash; non-idempotent)</li>
  <li><code>DELETE</code> (Remove resource &mdash; idempotent)</li>
</ul>
<strong>Key HTTP Status Codes:</strong>
<ul>
  <li><code>200 OK</code>: Request succeeded.</li>
  <li><code>201 Created</code>: Resource created successfully (e.g. new repair ticket).</li>
  <li><code>400 Bad Request</code>: Malformed payload or validation error.</li>
  <li><code>401 Unauthorized</code>: Missing or invalid authentication token.</li>
  <li><code>403 Forbidden</code>: Authenticated user lacks RBAC permissions.</li>
  <li><code>404 Not Found</code>: Resource URI does not exist.</li>
  <li><code>500 Internal Server Error</code>: Unhandled server-side application exception.</li>
</ul>`
  },
  {
    q: "What is Zero-Trust Network Architecture (ZTNA) and how does micro-segmentation protect against lateral movement?",
    a: `<strong>Zero-Trust Architecture</strong> operates on the core maxim: <em>'Never Trust, Always Verify'</em>. Unlike legacy perimeter-based security models where any internal host was implicitly trusted, Zero-Trust assumes that attackers have already breached the perimeter.
<br><br>
<strong>Core Pillars:</strong>
<ul>
  <li><strong>Continuous Cryptographic Identity:</strong> Mutual TLS (mTLS) authentication for every service-to-service communication.</li>
  <li><strong>Least-Privilege RBAC:</strong> Granular role-based authorization granted only for specific transactions and revoked immediately upon completion.</li>
  <li><strong>Micro-Segmentation:</strong> Isolating application workloads into granular network security zones with software-defined firewalls. If a compromised IoT camera in a branch office is infected, strict Layer 4 ACLs and identity tokens prevent the attacker from laterally scanning or pivoting into the core PostgreSQL database.</li>
</ul>`
  }
];

window.openTechnicalInterviewModal = function() {
  const questionsHtml = TECHNICAL_INTERVIEW_QUESTIONS.map((item, idx) => `
    <div class="interview-accordion-item ${idx === 0 ? 'open' : ''}" id="tech-item-${idx}">
      <button type="button" class="interview-accordion-btn" onclick="toggleTechAccordion(${idx})">
        <span>
          <span class="interview-q-num">TECH Q${idx + 1}</span>
          ${item.q}
        </span>
        <svg class="interview-chevron" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="6 9 12 15 18 9"></polyline></svg>
      </button>
      <div class="interview-accordion-body">
        ${item.a}
      </div>
    </div>
  `).join('');

  const contentHtml = `
    <div style="margin-bottom: 24px;">
      <div style="display: inline-block; padding: 4px 12px; border-radius: 9999px; background: rgba(243, 112, 30, 0.15); border: 1px solid rgba(243, 112, 30, 0.35); color: #f3701e; font-size: 0.75rem; font-weight: 700; text-transform: uppercase; letter-spacing: 0.08em; margin-bottom: 12px;">
        Technical Interview Assessment • 25 Points Evidence
      </div>
      <h3 style="font-family: var(--font-heading); font-size: 1.5rem; font-weight: 800; color: #ffffff; line-height: 1.3; margin-bottom: 10px;">
        Core Network, Systems &amp; Software Engineering Q&amp;A
      </h3>
      <p style="color: rgba(255, 255, 255, 0.7); font-size: 0.92rem; line-height: 1.6;">
        Rigorous technical articulation across the OSI model, TCP/IP protocol internals, subnetting calculations, database normalization, REST APIs, and Zero-Trust defense.
      </p>
    </div>

    <div class="interview-accordion-container">
      ${questionsHtml}
    </div>
  `;

  openPortfolioModal(
    "Technical Interview Assessment",
    "Step 21 Rubric • 25 Points Evidence",
    contentHtml
  );
};

window.toggleTechAccordion = function(idx) {
  const item = document.getElementById(`tech-item-${idx}`);
  if (item) {
    item.classList.toggle('open');
  }
};

/* ========================================================
   STEP 22: 11-STEP CAPSTONE PROJECT DEFENSE SLIDESHOW
   ======================================================== */

const PROJECT_DEFENSE_SLIDES = [
  {
    step: 1,
    title: "Project Identity, Title & Team Credentials",
    badge: "Step 01 • Introduction",
    bullets: [
      "<strong>Project Title:</strong> AI-Assisted Computer Repair Shop Management System",
      "<strong>Institution:</strong> Datamex College of Saint Adeline &mdash; BSIT Capstone 2026",
      "<strong>Lead Developer &amp; Technical Architect:</strong> Jhay L. Castro (NC II CSS Certified)",
      "<strong>Executive Summary:</strong> An enterprise full-stack ticket tracking and hardware diagnostic suite modernizing traditional manual repair shop workflows through automated cloud synchronization and AI-driven troubleshooting telemetry."
    ]
  },
  {
    step: 2,
    title: "Problem Statement & Industry Inefficiencies",
    badge: "Step 02 • Problem Formulation",
    bullets: [
      "<strong>Paper-Based Inefficiency:</strong> Over 70% of local computer repair shops rely on handwritten logbooks or unlinked spreadsheets, leading to lost customer diagnostic histories.",
      "<strong>Lack of Real-Time Tracking:</strong> Customers lack visibility into repair stages (Intake &rarr; Diagnostic &rarr; Parts Ordered &rarr; Ready for Pickup), causing excessive inbound inquiry overhead.",
      "<strong>Inconsistent Hardware Diagnostics:</strong> Junior technicians frequently misdiagnose intermittent hardware faults (e.g. RAM timing vs power supply ripple), prolonging customer turnaround time by an average of 4.2 days."
    ]
  },
  {
    step: 3,
    title: "Project Objectives & Scope Boundaries",
    badge: "Step 03 • Scope & Goals",
    bullets: [
      "<strong>Primary Objective:</strong> Build an interactive full-stack management web platform consolidating repair ticketing, customer intake, and automated diagnostics into a single dashboard.",
      "<strong>AI Diagnostic Integration:</strong> Deploy a natural-language diagnostic ingestion pipeline categorizing hardware symptoms and suggesting targeted component test suites.",
      "<strong>Data Integrity &amp; Security:</strong> Enforce strict Row-Level Security (RLS) guaranteeing that customers access only their respective repair work orders.",
      "<strong>Scope Boundaries:</strong> Web-first application optimized for desktop repair counters and technician tablets, integrating with Supabase PostgreSQL and Gemini API."
    ]
  },
  {
    step: 4,
    title: "System Architecture & Full-Stack Tech Stack",
    badge: "Step 04 • System Architecture",
    bullets: [
      "<strong>Frontend Presentation:</strong> Vanilla HTML5, Modern CSS3 Glassmorphism, and Modular ES6 JavaScript with sub-millisecond DOM responsiveness.",
      "<strong>Backend API Layer:</strong> Node.js serverless functions (<code>/api/diagnose.js</code>) with exponential backoff retry algorithms.",
      "<strong>Cloud Database Engine:</strong> Supabase (PostgreSQL 15) with automated migrations and real-time WebSocket state replication.",
      "<strong>AI Telemetry Engine:</strong> Google Gemini 1.5 API with strict JSON schema response enforcement.",
      "<strong>Deployment Infrastructure:</strong> Vercel Edge Network with SSL/TLS 1.3 encryption and automated GitHub CI/CD build webhooks."
    ]
  },
  {
    step: 5,
    title: "Gemini AI Diagnostic Engine & Prompt Pipeline",
    badge: "Step 05 • AI Integration",
    bullets: [
      "<strong>Prompt Engineering Architecture:</strong> Designed a structured system prompt priming the AI as a certified Senior PC Hardware Engineer (CompTIA A+ / Cisco IT Essentials).",
      "<strong>JSON Schema Enforcement:</strong> Forces AI responses into a strict machine-readable payload containing: <code>primary_failure</code>, <code>confidence_score</code>, <code>diagnostic_steps</code>, and <code>estimated_bench_time</code>.",
      "<strong>Defensive Resilience:</strong> Built a dual-layer fallback mechanism: if the external API reaches quota limits or encounters network timeouts, the system gracefully reverts to an embedded client-side diagnostic rule engine without crashing the UI."
    ]
  },
  {
    step: 6,
    title: "Database Entity-Relationship (ERD) & RLS Policies",
    badge: "Step 06 • Database Design",
    bullets: [
      "<strong>Normalized 3NF Relational Architecture:</strong> 5 core tables: <code>customers</code>, <code>technicians</code>, <code>repair_tickets</code>, <code>hardware_components</code>, and <code>diagnostic_logs</code>.",
      "<strong>Foreign Key Constraints:</strong> Enforced referential integrity with cascading updates ensuring clean audit trails.",
      "<strong>Row-Level Security (RLS):</strong> Implemented PostgreSQL security policies restricting ticket reads to authenticated technicians and the specific customer's UUID token.",
      "<strong>Indexing &amp; Performance:</strong> Added B-Tree indexes on <code>ticket_status</code> and <code>customer_phone</code> to maintain sub-10ms query execution across 10,000+ records."
    ]
  },
  {
    step: 7,
    title: "Core Functional Modules & Work Order Lifecycle",
    badge: "Step 07 • Features Walkthrough",
    bullets: [
      "<strong>Intake &amp; Device Triage:</strong> Fast client check-in recording device serial numbers, reported symptoms, and cosmetic condition photos.",
      "<strong>Work Order Lifecycle Manager:</strong> Visual Kanban ticket states: <em>Logged &rarr; In Triage &rarr; Waiting on Parts &rarr; Testing &rarr; Ready for Collection</em>.",
      "<strong>Automated Parts Depletion:</strong> Deducts hardware parts (SSDs, RAM modules) from live inventory when assigned to a work order.",
      "<strong>Digital Invoice &amp; Print Ready Receipts:</strong> Generates clean itemized PDF receipts calculating VAT, parts, and labor rates automatically."
    ]
  },
  {
    step: 8,
    title: "Technical Challenges Overcome & Resilience",
    badge: "Step 08 • Technical Adversity",
    bullets: [
      "<strong>Asynchronous State Drift:</strong> Early testing revealed that slow cellular network connections caused ticket status updates to trigger race conditions. Resolved by implementing optimistic UI updates with rollback confirmation.",
      "<strong>Rate Limiting &amp; Latency Spikes:</strong> AI API calls occasionally took 4+ seconds during peak hours. Added an interactive animated diagnostic oscilloscope to reassure the user and cached common symptom profiles locally.",
      "<strong>CSS Cross-Browser Rendering:</strong> Resolved mobile Safari backdrop-filter blur artifacts by configuring fallback opaque dark gradients."
    ]
  },
  {
    step: 9,
    title: "User Acceptance Testing (UAT) & Performance Benchmarks",
    badge: "Step 09 • Testing & Quality",
    bullets: [
      "<strong>UAT Participant Pool:</strong> Evaluated with 3 local repair shop technicians and 12 end-users over a 1-week pilot testing period.",
      "<strong>Efficiency Gain:</strong> Reduced average customer check-in time from 8.5 minutes (paper) to 1.8 minutes (digital), achieving a <strong>78% operational speedup</strong>.",
      "<strong>Diagnostic Accuracy:</strong> AI symptom suggestions matched verified hardware faults in <strong>91.4% of recorded test cases</strong>.",
      "<strong>Lighthouse Audit Scores:</strong> Performance: 98/100, Accessibility: 100/100, Best Practices: 100/100, SEO: 100/100."
    ]
  },
  {
    step: 10,
    title: "Live Demonstration Flow & Key Deliverables",
    badge: "Step 10 • Demonstration Flow",
    bullets: [
      "<strong>Step 1 (Intake):</strong> Technician enters customer 'Maria Santos' with a laptop reporting 'Blue Screen of Death (UNEXPECTED_STORE_EXCEPTION)'.",
      "<strong>Step 2 (AI Diagnosis):</strong> Engine ingests error code and identifies 94% probability of NVMe SSD controller failure with bad sectors; outputs SMART drive scan procedure.",
      "<strong>Step 3 (Work Order):</strong> Technician assigns replacement 500GB Kingston NVMe SSD from inventory; stock decreases automatically.",
      "<strong>Step 4 (Resolution &amp; Billing):</strong> Work order moves to Ready; system outputs receipt with labor + component invoice."
    ]
  },
  {
    step: 11,
    title: "Future Roadmap, Committee Q&A & Conclusion",
    badge: "Step 11 • Defense Conclusion",
    bullets: [
      "<strong>Future Enhancements:</strong> SMS Twilio notifications to customers upon ticket stage changes; automated optical character recognition (OCR) of component serial numbers via device camera.",
      "<strong>Anticipated Defense Committee Q&A Prep:</strong> Pre-calculated security answers regarding database injection defense, offline network survivability, and GDPR/DPA compliance.",
      "<strong>Closing Statement:</strong> The AI-Assisted Repair System proves that modern software engineering and disciplined network architecture can transform small business operations into scalable, high-efficiency digital workflows."
    ]
  }
];

let currentDefenseSlideIndex = 0;

window.openProjectDefenseModal = function(slideIndex = 0) {
  currentDefenseSlideIndex = slideIndex;
  renderDefenseSlide(currentDefenseSlideIndex);
};

window.switchDefenseSlide = function(slideIndex) {
  if (slideIndex < 0 || slideIndex >= PROJECT_DEFENSE_SLIDES.length) return;
  currentDefenseSlideIndex = slideIndex;
  renderDefenseSlide(currentDefenseSlideIndex);
};

function renderDefenseSlide(slideIndex) {
  const slide = PROJECT_DEFENSE_SLIDES[slideIndex];
  const totalSlides = PROJECT_DEFENSE_SLIDES.length;

  const dotsHtml = PROJECT_DEFENSE_SLIDES.map((s, i) => `
    <span class="defense-dot ${i === slideIndex ? 'active' : ''}" onclick="switchDefenseSlide(${i})" title="Slide ${i + 1}"></span>
  `).join('');

  const bulletsHtml = slide.bullets.map(b => `<li>${b}</li>`).join('');

  const contentHtml = `
    <div class="defense-slide-stage">
      <div>
        <div class="defense-slide-header">
          <span class="defense-slide-badge">${slide.badge}</span>
          <span class="defense-slide-counter">SLIDE ${slide.step} OF ${totalSlides}</span>
        </div>
        <h3 class="defense-slide-title">${slide.title}</h3>
        <div class="defense-slide-content">
          <ul>${bulletsHtml}</ul>
        </div>
      </div>

      <div>
        <div class="defense-dots-row" style="margin-bottom: 14px;">
          ${dotsHtml}
        </div>
        <div class="defense-nav-bar">
          <button type="button" class="defense-nav-btn" onclick="switchDefenseSlide(${slideIndex - 1})" ${slideIndex === 0 ? 'disabled' : ''}>
            &larr; Previous Slide
          </button>
          <span style="font-size: 0.8rem; color: rgba(255, 255, 255, 0.5);">
            Use &larr; / &rarr; keys to navigate
          </span>
          <button type="button" class="defense-nav-btn" onclick="switchDefenseSlide(${slideIndex + 1})" ${slideIndex === totalSlides - 1 ? 'disabled' : ''}>
            Next Slide &rarr;
          </button>
        </div>
      </div>
    </div>
  `;

  openPortfolioModal(
    "Capstone Project Defense Presentation",
    "Step 22 Rubric • 30 Points Evidence (11 Slides)",
    contentHtml
  );
}

// Arrow key navigation for Defense Presentation
document.addEventListener('keydown', (e) => {
  const modal = document.getElementById('portfolio-app-modal');
  if (modal && modal.classList.contains('open')) {
    if (e.key === 'ArrowRight') {
      switchDefenseSlide(currentDefenseSlideIndex + 1);
    } else if (e.key === 'ArrowLeft') {
      switchDefenseSlide(currentDefenseSlideIndex - 1);
    }
  }
});

/* ========================================================
   STEP 23: ONE-PAGE IT CAREER DEVELOPMENT PLAN
   ======================================================== */

window.openCareerPlanModal = function() {
  const contentHtml = `
    <div style="margin-bottom: 24px;">
      <div style="display: inline-block; padding: 4px 12px; border-radius: 9999px; background: rgba(243, 112, 30, 0.15); border: 1px solid rgba(243, 112, 30, 0.35); color: #f3701e; font-size: 0.75rem; font-weight: 700; text-transform: uppercase; letter-spacing: 0.08em; margin-bottom: 12px;">
        Official Rubric Template • Page 11 Synthesis
      </div>
      <h3 style="font-family: var(--font-heading); font-size: 1.5rem; font-weight: 800; color: #ffffff; line-height: 1.3; margin-bottom: 10px;">
        One-Page IT Career Development Plan
      </h3>
      <p style="color: rgba(255, 255, 255, 0.7); font-size: 0.92rem; line-height: 1.6;">
        Strategic career trajectory for Jhay L. Castro, detailing target engineering specializations, immediate certification pathways, and 3-year professional milestones.
      </p>
    </div>

    <div class="career-plan-grid">
      
      <!-- Point 1: Target Position -->
      <div class="career-plan-card highlight">
        <span class="career-plan-num">01 &bull; TARGET POSITION</span>
        <h4 class="career-plan-heading">Junior Network Engineer / Infrastructure Support Specialist</h4>
        <p class="career-plan-text">
          Targeting Network Operations Center (NOC) and Enterprise Infrastructure teams handling live switch/router provisioning, inter-VLAN routing, and hardware diagnostics.
        </p>
      </div>

      <!-- Point 2: Target IT Field -->
      <div class="career-plan-card">
        <span class="career-plan-num">02 &bull; TARGET IT FIELD</span>
        <h4 class="career-plan-heading">Enterprise Networking &amp; Cloud Infrastructure</h4>
        <p class="career-plan-text">
          Focusing on campus and datacenter network backbones, hybrid cloud VPC connectivity, and zero-trust perimeter security.
        </p>
      </div>

      <!-- Point 3: Current Skills -->
      <div class="career-plan-card">
        <span class="career-plan-num">03 &bull; MY CURRENT SKILLS</span>
        <h4 class="career-plan-heading">Verified Technical Competencies</h4>
        <p class="career-plan-text">
          Cisco Packet Tracer, TCP/IP, Subnetting (VLSM), VLANs &amp; 802.1Q Trunking, DHCP/DNS configuration, NC II Computer Systems Servicing, Supabase/SQL, HTML/CSS/JS.
        </p>
      </div>

      <!-- Point 4: Skills I Need to Improve -->
      <div class="career-plan-card">
        <span class="career-plan-num">04 &bull; SKILLS TO IMPROVE</span>
        <h4 class="career-plan-heading">Active Development Areas</h4>
        <p class="career-plan-text">
          Python Network Automation (Netmiko, Paramiko, NAPALM), Docker container networking, and advanced BGP multi-homed peering.
        </p>
      </div>

      <!-- Point 5: Technologies I Plan to Learn -->
      <div class="career-plan-card">
        <span class="career-plan-num">05 &bull; TECHNOLOGIES TO LEARN</span>
        <h4 class="career-plan-heading">Next-Horizon Tech Stack</h4>
        <p class="career-plan-text">
          Terraform (Infrastructure as Code), AWS Transit Gateway &amp; Direct Connect, Ansible configuration playbooks, and Wireshark deep packet telemetry.
        </p>
      </div>

      <!-- Point 6: Certifications to Pursue -->
      <div class="career-plan-card highlight">
        <span class="career-plan-num">06 &bull; TARGET CERTIFICATIONS</span>
        <h4 class="career-plan-heading">Industry Credentials Roadmap</h4>
        <p class="career-plan-text">
          1. <strong>Cisco CCNA (200-301)</strong> &mdash; Priority 1<br>
          2. <strong>CompTIA Network+</strong><br>
          3. <strong>AWS Certified Solutions Architect &mdash; Associate</strong>
        </p>
      </div>

      <!-- Point 7: 6-Month Goal -->
      <div class="career-plan-card">
        <span class="career-plan-num">07 &bull; 6-MONTH GOAL</span>
        <h4 class="career-plan-heading">Certification &amp; Industry Placement</h4>
        <p class="career-plan-text">
          Successfully pass the Cisco CCNA (200-301) examination and secure an entry-level Network Administrator or NOC Technician position within a reputable enterprise or MSP.
        </p>
      </div>

      <!-- Point 8: 1-Year Goal -->
      <div class="career-plan-card">
        <span class="career-plan-num">08 &bull; 1-YEAR GOAL</span>
        <h4 class="career-plan-heading">Infrastructure Ownership</h4>
        <p class="career-plan-text">
          Lead internal VLAN segmentation migrations, conduct firewall policy audits, and implement automated configuration backup scripts across 50+ enterprise network nodes.
        </p>
      </div>

      <!-- Point 9: 3-Year Professional Goal -->
      <div class="career-plan-card highlight">
        <span class="career-plan-num">09 &bull; 3-YEAR GOAL</span>
        <h4 class="career-plan-heading">Senior Infrastructure Architect</h4>
        <p class="career-plan-text">
          Attain Senior Network Engineer / Infrastructure Architect status, complete CCNP Enterprise certification, and architect zero-downtime hybrid cloud network backbones.
        </p>
      </div>

    </div>
  `;

  openPortfolioModal(
    "IT Career Development Plan (1-Page Roadmap)",
    "Step 23 Rubric • Page 11 Template",
    contentHtml
  );
};


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
  const navbar = document.getElementById('navbar');
  const cardsBg = document.querySelector('.hero-cards-bg');
  const dock = document.querySelector('.macos-dock-wrapper');
  if (!wrapper || !hero) return;

  window.addEventListener('scroll', () => {
    const rect = wrapper.getBoundingClientRect();
    const windowHeight = window.innerHeight;
    
    // Check if the wrapper is in view
    if (rect.top <= windowHeight && rect.bottom >= 0) {
      let scrolled = Math.max(0, -rect.top);
      const totalScrollable = rect.height - windowHeight;
      let progress = Math.max(0, Math.min(1, scrolled / totalScrollable));
      
      // --- STAGE 1: First scroll (0% to 18%) ---
      // "JHAY CASTRO" and "BASED IN PHILIPPINES" glide smoothly up out of view
      const navProgress = Math.min(1, progress / 0.18);
      if (navbar) {
        navbar.style.transform = `translateY(-${navProgress * 110}%)`;
        navbar.style.opacity = `${1 - navProgress}`;
        navbar.style.pointerEvents = navProgress >= 0.9 ? 'none' : 'auto';
      }

      // --- STAGE 2: 2-3 scrolls later (18% to 90%) ---
      // The hero section ("NETWORK ENGINEER" text, portrait, and canvas) stays at scale(1)
      // during Stage 1, and only begins shrinking after 2-3 scroll ticks!
      if (progress <= 0.18) {
        hero.style.transform = 'scale(1)';
        hero.style.borderRadius = '0px';
        if (cardsBg) cardsBg.style.filter = 'blur(20px)';
        if (dock) dock.style.opacity = '1';
      } else {
        const shrinkProgress = Math.min(1, (progress - 0.18) / 0.72);
        const scale = 1 - (shrinkProgress * 0.52); // from 1.0 down to 0.48
        hero.style.transform = `scale(${scale.toFixed(4)})`;
        hero.style.borderRadius = `${shrinkProgress * 48}px`;

        if (cardsBg) {
          let blurAmount = Math.max(0, 20 - (shrinkProgress * 30));
          cardsBg.style.filter = `blur(${blurAmount}px)`;
        }

        // Dock smoothly fades out as hero shrinks
        if (dock) {
          const dockFade = Math.min(1, (progress - 0.18) / 0.25);
          dock.style.opacity = `${1 - dockFade}`;
        }
      }
    } else if (rect.top > 0) {
      // Scrolled to top
      if (navbar) {
        navbar.style.transform = 'translateY(0%)';
        navbar.style.opacity = '1';
        navbar.style.pointerEvents = 'auto';
      }
      hero.style.transform = 'scale(1)';
      hero.style.borderRadius = '0px';
      if (dock) dock.style.opacity = '1';
    }
  });
}

/* ---------- Hero Mouse Parallax Effect ---------- */
function initHeroMouseParallax() {
  const hero = document.getElementById('home');
  const text = document.querySelector('.hero-massive-text');
  const bottom = document.querySelector('.hero-bottom-ref');
  const portrait = document.querySelector('.hero-portrait-ref');
  const dock = document.querySelector('.macos-dock-wrapper');
  
  if (!hero) return;

  // Track whether mouse is hovering on the dock
  let isHoveringDock = false;
  if (dock) {
    dock.addEventListener('mouseenter', () => {
      isHoveringDock = true;
      // Gently return hero elements to their resting positions
      if (text) text.style.transform = 'translate(0px, 0px)';
      if (bottom) bottom.style.transform = 'translate(0px, 0px)';
      if (portrait) portrait.style.transform = 'translate(-50%, 0px)';
    });
    dock.addEventListener('mouseleave', () => {
      isHoveringDock = false;
    });
  }

  window.addEventListener('mousemove', (e) => {
    // If user is hovering or interacting with the dock, do NOT wiggle the hero
    if (isHoveringDock) return;

    // Track mouse relative to the entire browser window instead of just the hero container
    const x = e.clientX - (window.innerWidth / 2);
    const y = e.clientY - (window.innerHeight / 2);

    const xNorm = x / (window.innerWidth / 2);
    const yNorm = y / (window.innerHeight / 2);

    // Unify the movement so they all move as a single solid group (pan effect)
    const moveX = xNorm * -10;
    const moveY = yNorm * -10;

    if (text) text.style.transform = `translate(${moveX}px, ${moveY}px)`;
    if (bottom) bottom.style.transform = `translate(${moveX}px, ${moveY}px)`;
    // Portrait is a floating circle frame, so it can safely move on Y axis too
    if (portrait) portrait.style.transform = `translate(calc(-50% + ${moveX}px), ${moveY}px)`;
    // Dock stays anchored at bottom center without parallax translation
  });
}

/* ---------- macOS Liquid Glass Navigation Dock ---------- */
function initMacOsDock() {
  const dockContainer = document.querySelector('.macos-dock-container');
  if (!dockContainer) return;
  const items = dockContainer.querySelectorAll('.dock-item');
  if (!items.length) return;

  const maxScale = 1.45;
  const maxTranslateY = -8; // lift up in px
  const effectDistance = 110; // proximity radius in px

  dockContainer.addEventListener('mousemove', (e) => {
    const mouseX = e.clientX;

    items.forEach((item) => {
      const rect = item.getBoundingClientRect();
      const itemCenterX = rect.left + rect.width / 2;
      const dist = Math.abs(mouseX - itemCenterX);

      if (dist < effectDistance) {
        // Smooth cosine falloff curve
        const factor = Math.cos((dist / effectDistance) * (Math.PI / 2));
        const scale = 1 + (maxScale - 1) * factor;
        const translateY = maxTranslateY * factor;
        item.style.transform = `scale(${scale.toFixed(3)}) translateY(${translateY.toFixed(1)}px)`;
      } else {
        item.style.transform = 'scale(1) translateY(0px)';
      }
    });
  });

  dockContainer.addEventListener('mouseleave', () => {
    items.forEach((item) => {
      item.style.transform = 'scale(1) translateY(0px)';
    });
  });
}

/* ========================================================
   21ST.DEV IMPACT EXPERIENCE: TABS & DYNAMIC CURSOR GLOW
   ======================================================== */
function initImpactExperience() {
  const container = document.querySelector('.impact-experience-section');
  if (!container) return;

  const cards = container.querySelectorAll('.impact-exp-card');
  const tabButtons = container.querySelectorAll('.impact-tab-btn');

  // 1. Dynamic Cursor-Tracking Glow Effect on Cards
  cards.forEach((card) => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      // Set CSS variables for smooth radial background glow centering
      card.style.setProperty('--mouse-x', `${x}px`);
      card.style.setProperty('--mouse-y', `${y}px`);
    });

    card.addEventListener('mouseleave', () => {
      // Gracefully reset to default origin
      card.style.setProperty('--mouse-x', '30%');
      card.style.setProperty('--mouse-y', '40%');
    });
  });

  // 2. Interactive Category Tab Switching
  tabButtons.forEach((btn) => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const targetBtn = e.target.closest('.impact-tab-btn');
      if (!targetBtn) return;
      const filter = targetBtn.getAttribute('data-filter');

      // Update active tab button state
      tabButtons.forEach((b) => {
        b.classList.remove('active');
        b.setAttribute('aria-selected', 'false');
      });
      targetBtn.classList.add('active');
      targetBtn.setAttribute('aria-selected', 'true');

      // Filter cards smoothly
      cards.forEach((card) => {
        const category = card.getAttribute('data-category');
        if (filter === 'all' || category === filter) {
          card.classList.remove('is-filtered-out');
          card.classList.remove('anim-enter');
          void card.offsetWidth; // Force reflow for clean re-trigger
          card.classList.add('anim-enter');
        } else {
          card.classList.add('is-filtered-out');
        }
      });
    });
  });
}

