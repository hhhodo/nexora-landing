// NEXORA landing — nav toggle, scroll-reveal, stat count-up (marquee itself runs on pure CSS animation)
(function () {
  const toggle = document.getElementById('navToggle');
  const links = document.getElementById('navLinks');
  if (toggle && links) {
    toggle.addEventListener('click', () => {
      const isOpen = links.classList.toggle('is-open');
      toggle.setAttribute('aria-expanded', String(isOpen));
    });
    links.querySelectorAll('a').forEach((a) => {
      a.addEventListener('click', () => {
        links.classList.remove('is-open');
        toggle.setAttribute('aria-expanded', 'false');
      });
    });
  }

  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // Stagger index for grid/list children so CSS transition-delay can step through them.
  document.querySelectorAll('.services__grid, .news__list').forEach((group) => {
    group.querySelectorAll('[data-reveal]').forEach((el, i) => {
      el.style.setProperty('--reveal-i', i);
    });
  });

  const revealTargets = document.querySelectorAll('[data-reveal]');
  if (revealTargets.length) {
    if (reduceMotion) {
      revealTargets.forEach((el) => el.classList.add('is-visible'));
    } else {
      const revealObserver = new IntersectionObserver(
        (entries, obs) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add('is-visible');
              obs.unobserve(entry.target);
            }
          });
        },
        { threshold: 0.15, rootMargin: '0px 0px -8% 0px' }
      );
      revealTargets.forEach((el) => revealObserver.observe(el));
    }
  }

  // Count-up for TRACK RECORDS stats.
  const counters = document.querySelectorAll('.count[data-count]');
  if (counters.length) {
    const animateCount = (el) => {
      const target = parseFloat(el.getAttribute('data-count'));
      const decimals = parseInt(el.getAttribute('data-decimals') || '0', 10);
      const suffix = el.getAttribute('data-suffix') || '';
      if (reduceMotion) {
        el.textContent = target.toFixed(decimals) + suffix;
        return;
      }
      const duration = 1400;
      const start = performance.now();
      const tick = (now) => {
        const p = Math.min((now - start) / duration, 1);
        const eased = 1 - Math.pow(1 - p, 3);
        el.textContent = (target * eased).toFixed(decimals) + suffix;
        if (p < 1) requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
    };

    const statsEl = document.querySelector('.track__stats');
    if (statsEl) {
      const countObserver = new IntersectionObserver(
        (entries, obs) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              counters.forEach(animateCount);
              obs.disconnect();
            }
          });
        },
        { threshold: 0.4 }
      );
      countObserver.observe(statsEl);
    }
  }
})();
