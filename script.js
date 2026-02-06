// script.js - interactive behaviors for V1 Steel site

document.addEventListener('DOMContentLoaded', function () {
  // Nav toggle for small screens
  const navToggle = document.getElementById('navToggle');
  const mainNav = document.getElementById('mainNav');

  if (navToggle && mainNav) {
    navToggle.addEventListener('click', () => {
      const expanded = navToggle.getAttribute('aria-expanded') === 'true';
      navToggle.setAttribute('aria-expanded', String(!expanded));
      const visible = !expanded;
      mainNav.setAttribute('aria-hidden', String(!visible));
      // for styling mobile nav
      if (visible) mainNav.style.transform = 'translateY(0)';
      else mainNav.style.transform = '';
    });
  }

  // Smooth scroll for internal links
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', function (e) {
      const targetId = this.getAttribute('href').slice(1);
      const target = document.getElementById(targetId);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        // collapse mobile nav
        if (window.innerWidth < 720 && mainNav) {
          mainNav.style.transform = '';
          navToggle.setAttribute('aria-expanded', 'false');
          mainNav.setAttribute('aria-hidden', 'true');
        }
      }
    });
  });

  // Contact form validation & simulated submission
  const form = document.getElementById('contactForm');
  const status = document.getElementById('formStatus');

  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      status.textContent = '';

      const name = form.elements['name'].value.trim();
      const email = form.elements['email'].value.trim();
      const message = form.elements['message'].value.trim();

      // Basic validation
      if (!name) { status.textContent = 'Please enter your name.'; form.elements['name'].focus(); return; }
      if (!validateEmail(email)) { status.textContent = 'Please provide a valid email address.'; form.elements['email'].focus(); return; }
      if (!message) { status.textContent = 'Please describe your project.'; form.elements['message'].focus(); return; }

      // Simulate async submission
      const submitButton = form.querySelector('button[type="submit"]');
      submitButton.disabled = true;
      submitButton.textContent = 'Sending...';
      status.textContent = 'Submitting request...';

      setTimeout(() => {
        submitButton.disabled = false;
        submitButton.textContent = 'Send Request';
        status.textContent = 'Thank you — your request has been received. We will contact you shortly.';
        form.reset();
      }, 1200);
    });
  }

  // Year in footer
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();
});

// Basic email regex (simple)
function validateEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}