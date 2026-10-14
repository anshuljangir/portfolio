/**
 * ANSHUL JANGIR - PORTFOLIO INTERACTIVITY
 * Zero-dependency modern JavaScript
 */

document.addEventListener('DOMContentLoaded', () => {
  initTheme();
  initNavigation();
  initCounters();
  initSkillsFilter();
  initProjectModals();
  initContactInteractions();
});

/* --------------------------------------------------------------------------
   THEME TOGGLE (DARK / LIGHT)
   -------------------------------------------------------------------------- */
function initTheme() {
  const themeToggleBtn = document.getElementById('themeToggleBtn');
  if (!themeToggleBtn) return;

  const savedTheme = localStorage.getItem('portfolio-theme');
  const prefersLight = window.matchMedia('(prefers-color-scheme: light)').matches;

  if (savedTheme === 'light' || (!savedTheme && prefersLight)) {
    document.body.classList.add('light-theme');
    updateThemeIcon(true);
  } else {
    document.body.classList.remove('light-theme');
    updateThemeIcon(false);
  }

  themeToggleBtn.addEventListener('click', () => {
    const isLight = document.body.classList.toggle('light-theme');
    localStorage.setItem('portfolio-theme', isLight ? 'light' : 'dark');
    updateThemeIcon(isLight);
    showToast(isLight ? 'Switched to Light theme' : 'Switched to Dark theme');
  });
}

function updateThemeIcon(isLight) {
  const icon = document.getElementById('themeIcon');
  if (!icon) return;

  if (isLight) {
    // Show Moon icon for switching back to dark
    icon.innerHTML = `
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
      </svg>
    `;
    icon.setAttribute('aria-label', 'Switch to dark theme');
  } else {
    // Show Sun icon for switching to light
    icon.innerHTML = `
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <circle cx="12" cy="12" r="5"></circle>
        <line x1="12" y1="1" x2="12" y2="3"></line>
        <line x1="12" y1="21" x2="12" y2="23"></line>
        <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line>
        <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line>
        <line x1="1" y1="12" x2="3" y2="12"></line>
        <line x1="21" y1="12" x2="23" y2="12"></line>
        <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line>
        <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>
      </svg>
    `;
    icon.setAttribute('aria-label', 'Switch to light theme');
  }
}

/* --------------------------------------------------------------------------
   NAVBAR & SCROLL SPY
   -------------------------------------------------------------------------- */
function initNavigation() {
  const navbar = document.getElementById('navbar');
  const mobileMenuBtn = document.getElementById('mobileMenuBtn');
  const navLinks = document.getElementById('navLinks');
  const links = document.querySelectorAll('.nav-link');
  const sections = document.querySelectorAll('section[id]');

  // Scroll navbar background shadow
  window.addEventListener('scroll', () => {
    if (window.scrollY > 20) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }

    // ScrollSpy active link
    let current = '';
    const scrollPosition = window.scrollY + 120;

    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;
      if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
        current = section.getAttribute('id');
      }
    });

    links.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${current}`) {
        link.classList.add('active');
      }
    });
  });

  // Mobile Menu Toggle
  if (mobileMenuBtn && navLinks) {
    mobileMenuBtn.addEventListener('click', () => {
      navLinks.classList.toggle('open');
      const isOpen = navLinks.classList.contains('open');
      mobileMenuBtn.setAttribute('aria-expanded', isOpen);
    });

    // Close menu on link click
    links.forEach(link => {
      link.addEventListener('click', () => {
        navLinks.classList.remove('open');
      });
    });

    // Close menu on click outside
    document.addEventListener('click', (e) => {
      if (!navLinks.contains(e.target) && !mobileMenuBtn.contains(e.target)) {
        navLinks.classList.remove('open');
      }
    });
  }
}

/* --------------------------------------------------------------------------
   STAT COUNTER ANIMATION
   -------------------------------------------------------------------------- */
function initCounters() {
  const counters = document.querySelectorAll('.stat-num[data-target]');
  if (!counters.length) return;

  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animateCounter(entry.target);
        obs.unobserve(entry.target);
      }
    });
  }, { threshold: 0.3 });

  counters.forEach(counter => observer.observe(counter));
}

function animateCounter(counter) {
  const rawTarget = counter.getAttribute('data-target');
  const prefix = counter.getAttribute('data-prefix') || '';
  const suffix = counter.getAttribute('data-suffix') || '';
  const target = parseFloat(rawTarget);
  const duration = 1600;
  const startTime = performance.now();

  function updateCount(currentTime) {
    const elapsed = currentTime - startTime;
    const progress = Math.min(elapsed / duration, 1);
    // Ease out quartic
    const easeProgress = 1 - Math.pow(1 - progress, 4);
    
    let currentVal;
    if (Number.isInteger(target)) {
      currentVal = Math.floor(easeProgress * target);
    } else {
      currentVal = (easeProgress * target).toFixed(1);
    }

    counter.textContent = `${prefix}${currentVal}${suffix}`;

    if (progress < 1) {
      requestAnimationFrame(updateCount);
    } else {
      counter.textContent = `${prefix}${rawTarget}${suffix}`;
    }
  }

  requestAnimationFrame(updateCount);
}

/* --------------------------------------------------------------------------
   SKILLS FILTER
   -------------------------------------------------------------------------- */
function initSkillsFilter() {
  const filterBtns = document.querySelectorAll('.skill-filter-btn');
  const cards = document.querySelectorAll('.skill-category-card');

  if (!filterBtns.length || !cards.length) return;

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.getAttribute('data-filter');

      cards.forEach(card => {
        const category = card.getAttribute('data-category');
        if (filter === 'all' || category === filter) {
          card.style.display = 'block';
          setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
          }, 10);
        } else {
          card.style.opacity = '0';
          card.style.transform = 'translateY(10px)';
          setTimeout(() => {
            card.style.display = 'none';
          }, 200);
        }
      });
    });
  });
}

/* --------------------------------------------------------------------------
   PROJECT / INITIATIVE DEEP-DIVE MODALS
   -------------------------------------------------------------------------- */
const PROJECT_DETAILS = {
  ascend: {
    title: 'ASCEND Classification Engine',
    subtitle: 'Enterprise AI & Analytics-Driven Classification Platform',
    organization: 'SLB (Schlumberger)',
    impact: 'Automated complex multi-source classification & analyst workflow decisioning',
    tags: ['Dataiku', 'Python', 'GCP Pipelines', 'ERP Data', 'Descartes', 'WCO Data'],
    overview: `Developed ASCEND, an analytics-driven classification solution that consolidated fragmented enterprise data streams from ERP, Descartes, and the World Customs Organization (WCO) into a single unified analytical intelligence platform.`,
    highlights: [
      'Built automated data pipelines using Dataiku and Python deployed on Google Cloud Platform (GCP).',
      'Engineered granular feature mappings and classification lookup algorithms to assist analyst workflows.',
      'Drastically reduced manual lookup latency for trade compliance officers across global operations.',
      'Ensured full auditability and trace history for each classification event across ERP transactions.'
    ],
    techStack: 'Python, Dataiku DSS, Google Cloud Platform (GCP), SQL, REST APIs, Enterprise ERP'
  },
  migration: {
    title: 'Post-Acquisition Enterprise Data Migration',
    subtitle: '5M+ Legacy Records Migrated & Reconciled into SAP GTS',
    organization: 'SLB (Schlumberger)',
    impact: 'Transferred 5M+ records with zero compliance downtime & 100% data auditability',
    tags: ['Informatica', 'Python', 'SAP GTS', 'Data Validation', 'Reconciliation', 'Audit Trails'],
    overview: `Led a critical post-acquisition data migration and reconciliation initiative to transfer more than 5 million sensitive enterprise trade records from disparate legacy databases into SAP Global Trade Services (GTS).`,
    highlights: [
      'Engineered high-throughput ETL workflows using Informatica and automated Python reconciliation scripts.',
      'Constructed automated data validation controls and custom exception-reporting alerts for edge cases.',
      'Designed end-to-end data lineage and traceability mechanisms meeting stringent regulatory audit standards.',
      'Enabled reliable availability of clean data assets for downstream enterprise reporting and executive decision-making.'
    ],
    techStack: 'Informatica PowerCenter, Python, SAP GTS, SQL Server, Oracle ERP, Advanced Excel'
  },
  compliance: {
    title: 'HS Code Auditing & Anomaly Detection',
    subtitle: 'Global Compliance Optimization & Penalty Prevention',
    organization: 'SLB (Schlumberger)',
    impact: 'Prevented $2M USD annually in potential revenue penalties & 100% release compliance',
    tags: ['SQL', 'Statistical Modeling', 'Trend Analysis', 'KPI Architecture', 'SAP Release'],
    overview: `Designed and deployed business-critical KPIs and statistical anomaly detection mechanisms to audit HS Code completeness across Sales and Purchase Orders across global ERP systems.`,
    highlights: [
      'Applied statistical trend identification and outlier detection on multi-million row transactional datasets.',
      'Identified critical misclassifications proactively before customs clearance, mitigating an estimated $2M USD in annual revenue penalties.',
      'Supported data quality across 800,000+ materials across 20+ countries and multiple major SAP releases.',
      'Delivered recurring, executive-ready dashboards for SAP Release Managers, maintaining 100% classification compliance for TCC releases.'
    ],
    techStack: 'Advanced SQL, Python (Pandas/Scipy), Informatica, SAP ERP/GTS, Executive Dashboards'
  },
  experiments: {
    title: 'Payment Experimentation & Revenue Optimization',
    subtitle: 'A/B Testing & Product Monetization Analytics',
    organization: 'WorkIndia',
    impact: 'Supported strategic product decisions driving 40M INR in incremental revenue',
    tags: ['SQL', 'A/B Testing', 'Hypothesis Testing', 'Metabase', 'Product Analytics'],
    overview: `Spearheaded data analysis on test-versus-control payment experiments across WorkIndia\'s high-velocity platform to optimize user checkout flow, pricing tiers, and conversion rates.`,
    highlights: [
      'Formulated statistical test frameworks and analyzed behavioral cohorts using complex SQL queries on transaction logs.',
      'Translated ambiguous conversion metrics into actionable recommendations for product managers and C-suite leadership.',
      'Directly guided pricing model rollouts and feature adoption that contributed to 40M INR in incremental platform revenue.',
      'Constructed real-time visual analytics dashboards in Metabase and Excel for leadership tracking.'
    ],
    techStack: 'PostgreSQL/MySQL, Metabase, Advanced Excel (VBA/Power Query), Cohort Analysis, A/B Testing'
  }
};

function initProjectModals() {
  const modalOverlay = document.getElementById('projectModal');
  const modalCloseBtn = document.getElementById('modalCloseBtn');
  const modalContent = document.getElementById('modalBody');
  const triggerBtns = document.querySelectorAll('[data-project-trigger]');

  if (!modalOverlay || !modalContent) return;

  function openModal(projectId) {
    const data = PROJECT_DETAILS[projectId];
    if (!data) return;

    modalContent.innerHTML = `
      <div style="margin-bottom: 24px;">
        <span class="project-card-badge">${data.organization}</span>
        <h2 style="font-size: 1.8rem; font-weight: 800; color: var(--text-heading); margin: 8px 0;">${data.title}</h2>
        <p style="font-size: 1.05rem; color: var(--accent-primary); font-weight: 600;">${data.subtitle}</p>
      </div>

      <div class="project-highlight-box" style="margin-bottom: 24px;">
        <span class="impact-label">Key Business Impact</span>
        <span class="impact-text">${data.impact}</span>
      </div>

      <div style="margin-bottom: 24px;">
        <h4 style="font-size: 1rem; font-weight: 700; color: var(--text-heading); margin-bottom: 8px;">Overview & Challenge</h4>
        <p style="color: var(--text-muted); line-height: 1.7; font-size: 0.95rem;">${data.overview}</p>
      </div>

      <div style="margin-bottom: 24px;">
        <h4 style="font-size: 1rem; font-weight: 700; color: var(--text-heading); margin-bottom: 12px;">Key Contributions & Technical Execution</h4>
        <ul style="display: flex; flex-direction: column; gap: 10px;">
          ${data.highlights.map(h => `
            <li style="display: flex; align-items: flex-start; gap: 10px; color: var(--text-muted); font-size: 0.92rem; line-height: 1.6;">
              <span style="color: var(--accent-primary); margin-top: 2px;">▸</span>
              <span>${h}</span>
            </li>
          `).join('')}
        </ul>
      </div>

      <div style="border-top: 1px solid var(--border-subtle); padding-top: 16px;">
        <h4 style="font-size: 0.85rem; font-weight: 700; text-transform: uppercase; color: var(--text-dim); letter-spacing: 0.05em; margin-bottom: 8px;">Technologies & Tools</h4>
        <p style="font-family: var(--font-mono); font-size: 0.88rem; color: var(--text-main);">${data.techStack}</p>
      </div>
    `;

    modalOverlay.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function closeModal() {
    modalOverlay.classList.remove('active');
    document.body.style.overflow = '';
  }

  triggerBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const id = btn.getAttribute('data-project-trigger');
      openModal(id);
    });
  });

  if (modalCloseBtn) {
    modalCloseBtn.addEventListener('click', closeModal);
  }

  modalOverlay.addEventListener('click', (e) => {
    if (e.target === modalOverlay) closeModal();
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modalOverlay.classList.contains('active')) {
      closeModal();
    }
  });
}

/* --------------------------------------------------------------------------
   CONTACT & CLIPBOARD INTERACTIONS
   -------------------------------------------------------------------------- */
function initContactInteractions() {
  // Copy to clipboard triggers
  const copyButtons = document.querySelectorAll('[data-copy-target]');
  copyButtons.forEach(btn => {
    btn.addEventListener('click', async (e) => {
      e.preventDefault();
      const textToCopy = btn.getAttribute('data-copy-target');
      try {
        await navigator.clipboard.writeText(textToCopy);
        const originalText = btn.textContent;
        btn.textContent = 'Copied!';
        showToast(`Copied to clipboard: ${textToCopy}`);
        setTimeout(() => {
          btn.textContent = originalText;
        }, 2000);
      } catch (err) {
        showToast('Press Cmd+C to copy');
      }
    });
  });

  // Contact Form Submission (Mailto generator fallback)
  const contactForm = document.getElementById('contactForm');
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = document.getElementById('senderName')?.value.trim();
      const email = document.getElementById('senderEmail')?.value.trim();
      const subject = document.getElementById('senderSubject')?.value.trim() || 'Portfolio Inquiry';
      const message = document.getElementById('senderMessage')?.value.trim();

      if (!name || !email || !message) {
        showToast('Please fill out all required fields.');
        return;
      }

      // Generate mailto link
      const mailtoUrl = `mailto:jangir.anshul02@gmail.com?subject=${encodeURIComponent(`[Portfolio] ${subject} from ${name}`)}&body=${encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`)}`;
      
      window.location.href = mailtoUrl;
      showToast('Opening your email client to send message...');
      contactForm.reset();
    });
  }
}

/* --------------------------------------------------------------------------
   TOAST HELPER
   -------------------------------------------------------------------------- */
let toastTimeout;
function showToast(message) {
  let toast = document.getElementById('toastNotification');
  if (!toast) {
    toast = document.createElement('div');
    toast.id = 'toastNotification';
    toast.className = 'toast';
    document.body.appendChild(toast);
  }

  toast.innerHTML = `
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="color: var(--accent-tertiary);">
      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
      <polyline points="22 4 12 14.01 9 11.01"></polyline>
    </svg>
    <span>${message}</span>
  `;

  toast.classList.add('show');
  clearTimeout(toastTimeout);
  toastTimeout = setTimeout(() => {
    toast.classList.remove('show');
  }, 3200);
}

// Global CV print trigger
window.printResume = function() {
  window.print();
};

