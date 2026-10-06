/* ============================================================
   AYET.ME — main.js
   Custom cursor · Mobile nav · Form handler · Reduced motion
   ============================================================ */

(function () {
  'use strict';

  // --- Reduced motion check ---
  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // --- Custom cursor ---
  const cursor = document.getElementById('cursor');
  if (cursor && window.matchMedia('(hover: hover)').matches) {
    let cx = 0, cy = 0;
    document.addEventListener('mousemove', (e) => {
      cx = e.clientX;
      cy = e.clientY;
      cursor.style.left = cx + 'px';
      cursor.style.top = cy + 'px';
    });
    document.querySelectorAll('a, button, [role="button"]').forEach((el) => {
      el.addEventListener('mouseenter', () => cursor.classList.add('hover'));
      el.addEventListener('mouseleave', () => cursor.classList.remove('hover'));
    });
  } else if (cursor) {
    cursor.style.display = 'none';
  }

  // --- Mobile nav toggle ---
  const toggle = document.getElementById('navToggle');
  const navLinks = document.getElementById('navLinks');
  if (toggle && navLinks) {
    toggle.addEventListener('click', () => {
      const open = navLinks.classList.toggle('open');
      toggle.setAttribute('aria-expanded', open);
    });
    // Close on nav link click
    navLinks.querySelectorAll('a').forEach((a) => {
      a.addEventListener('click', () => {
        navLinks.classList.remove('open');
        toggle.setAttribute('aria-expanded', 'false');
      });
    });
    // Close on outside click
    document.addEventListener('click', (e) => {
      if (!toggle.contains(e.target) && !navLinks.contains(e.target)) {
        navLinks.classList.remove('open');
        toggle.setAttribute('aria-expanded', 'false');
      }
    });
  }

  // --- Formspree contact form ---
  const form = document.getElementById('contactForm');
  const status = document.getElementById('formStatus');
  if (form && status) {
    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      const btn = form.querySelector('button[type="submit"]');
      btn.textContent = 'Sending...';
      btn.disabled = true;

      try {
        const res = await fetch(form.action, {
          method: 'POST',
          body: new FormData(form),
          headers: { Accept: 'application/json' },
        });
        if (res.ok) {
          status.textContent = '// Message sent. I\'ll get back to you soon.';
          status.style.color = 'var(--accent)';
          status.style.display = 'block';
          form.reset();
        } else {
          throw new Error('Server error');
        }
      } catch {
        status.textContent = '// Something went wrong. Email me directly at izzarith04@gmail.com';
        status.style.color = '#ff6b6b';
        status.style.display = 'block';
      } finally {
        btn.textContent = 'Send Message →';
        btn.disabled = false;
      }
    });
  }

  // --- Scroll-triggered fade for hero (reduced motion safe) ---
  if (!prefersReduced) {
    const heroChildren = document.querySelectorAll('.hero > .container > *');
    heroChildren.forEach((el, i) => {
      el.style.opacity = '0';
      el.style.transform = 'translateY(16px)';
      el.style.transition = `opacity 0.5s ease ${i * 0.08}s, transform 0.5s ease ${i * 0.08}s`;
      setTimeout(() => {
        el.style.opacity = '';
        el.style.transform = '';
      }, 50);
    });
  }

})();
