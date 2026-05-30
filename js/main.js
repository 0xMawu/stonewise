/* ============================================================
   STONEWISE CONSTRUCTION — Main JavaScript
   ============================================================ */

   document.addEventListener('DOMContentLoaded', () => {

    /* ---------- Loading Screen ---------- */
    const loader = document.getElementById('loader');
    if (loader) {
      const hideLoader = () => loader.classList.add('done');
      if (document.readyState === 'complete') {
        setTimeout(hideLoader, 300);
      } else {
        window.addEventListener('load', () => setTimeout(hideLoader, 300), { once: true });
        setTimeout(hideLoader, 800); // safety fallback
      }
    }
  
    /* ---------- Header Scroll Effect ---------- */
    const header = document.getElementById('site-header');
    if (header) {
      const onScroll = () => header.classList.toggle('scrolled', window.scrollY > 40);
      window.addEventListener('scroll', onScroll, { passive: true });
      onScroll();
    }
  
    /* ---------- Mobile Navigation ---------- */
    const hamburger     = document.querySelector('.header__hamburger');
    const mobileNav     = document.querySelector('.mobile-nav');
    const mobileOverlay = document.querySelector('.mobile-nav__overlay');
  
    function openNav() {
      hamburger?.classList.add('open');
      mobileNav?.classList.add('open');
      mobileOverlay?.classList.add('visible');
      document.body.style.overflow = 'hidden';
      hamburger?.setAttribute('aria-expanded', 'true');
    }
    function closeNav() {
      hamburger?.classList.remove('open');
      mobileNav?.classList.remove('open');
      mobileOverlay?.classList.remove('visible');
      document.body.style.overflow = '';
      hamburger?.setAttribute('aria-expanded', 'false');
    }
  
    hamburger?.addEventListener('click', () => hamburger.classList.contains('open') ? closeNav() : openNav());
    mobileOverlay?.addEventListener('click', closeNav);
    document.querySelectorAll('.mobile-nav a').forEach(a => a.addEventListener('click', closeNav));
  
    /* ---------- Active Nav Link ---------- */
    const currentPath = window.location.pathname.split('/').pop() || 'index.html';
    document.querySelectorAll('.header__nav-left a, .header__nav-right a').forEach(link => {
      const href = link.getAttribute('href')?.split('/').pop();
      if (href === currentPath) link.classList.add('active');
    });
  
    /* ---------- Scroll Reveal ---------- */
    const reveals = document.querySelectorAll('.reveal');
    if (reveals.length && 'IntersectionObserver' in window) {
      const observer = new IntersectionObserver((entries) => {
        entries.forEach(e => {
          if (e.isIntersecting) {
            e.target.classList.add('visible');
            observer.unobserve(e.target);
          }
        });
      }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });
      reveals.forEach(el => observer.observe(el));
    } else {
      reveals.forEach(el => el.classList.add('visible'));
    }
  
    /* ---------- Back to Top ---------- */
    const btt = document.getElementById('back-to-top');
    if (btt) {
      window.addEventListener('scroll', () => btt.classList.toggle('visible', window.scrollY > 400), { passive: true });
      btt.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
    }
  
    /* ---------- Testimonials Slider ---------- */
    const slider = document.querySelector('.testimonials__slider');
    if (slider) {
      const cards = slider.querySelectorAll('.testimonial-card');
      const prevBtn = document.querySelector('.slider-btn--prev');
      const nextBtn = document.querySelector('.slider-btn--next');
      let current = 0;
      let cardWidth = cards[0]?.offsetWidth + 32 || 532;
      let autoInterval;
  
      function goTo(idx) {
        current = ((idx % cards.length) + cards.length) % cards.length;
        slider.style.transform = `translateX(-${current * cardWidth}px)`;
      }
      function next() { goTo(current + 1); }
      function prev() { goTo(current - 1); }
  
      prevBtn?.addEventListener('click', () => { clearInterval(autoInterval); prev(); startAuto(); });
      nextBtn?.addEventListener('click', () => { clearInterval(autoInterval); next(); startAuto(); });
  
      function startAuto() { autoInterval = setInterval(next, 5500); }
      startAuto();
  
      window.addEventListener('resize', () => {
        cardWidth = cards[0]?.offsetWidth + 32 || 532;
        goTo(current);
      });
    }
  
    /* ---------- Gallery Tabs ---------- */
    document.querySelectorAll('.gallery-tab').forEach(tab => {
      tab.addEventListener('click', () => {
        const target = tab.dataset.tab;
        document.querySelectorAll('.gallery-tab').forEach(t => t.classList.remove('active'));
        document.querySelectorAll('.gallery-panel').forEach(p => p.classList.remove('active'));
        tab.classList.add('active');
        document.getElementById(target)?.classList.add('active');
      });
    });
  
    /* ---------- Lightbox ---------- */
    const lightbox    = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    let lbImages = [], lbIndex = 0;
  
    function openLightbox(src, all, idx) {
      if (!lightbox || !lightboxImg) return;
      lbImages = all; lbIndex = idx;
      lightboxImg.src = src;
      lightbox.classList.add('open');
      document.body.style.overflow = 'hidden';
    }
    function closeLightbox() {
      lightbox?.classList.remove('open');
      document.body.style.overflow = '';
      if (lightboxImg) lightboxImg.src = '';
    }
    function lbPrev() { lbIndex = (lbIndex - 1 + lbImages.length) % lbImages.length; if (lightboxImg) lightboxImg.src = lbImages[lbIndex]; }
    function lbNext() { lbIndex = (lbIndex + 1) % lbImages.length; if (lightboxImg) lightboxImg.src = lbImages[lbIndex]; }
  
    document.getElementById('lightbox-close')?.addEventListener('click', closeLightbox);
    document.getElementById('lightbox-prev')?.addEventListener('click', lbPrev);
    document.getElementById('lightbox-next')?.addEventListener('click', lbNext);
    lightbox?.addEventListener('click', e => { if (e.target === lightbox) closeLightbox(); });
  
    document.addEventListener('keydown', e => {
      if (!lightbox?.classList.contains('open')) return;
      if (e.key === 'Escape')      closeLightbox();
      if (e.key === 'ArrowLeft')   lbPrev();
      if (e.key === 'ArrowRight')  lbNext();
    });
  
    document.querySelectorAll('.gallery-item[data-lightbox]').forEach((item) => {
      const allItems = [...document.querySelectorAll('.gallery-item[data-lightbox]')];
      const allSrcs  = allItems.map(i => i.querySelector('img')?.src || '');
      const idx      = allItems.indexOf(item);
      item.addEventListener('click', () => {
        const src = item.querySelector('img')?.src;
        if (src) openLightbox(src, allSrcs, idx);
      });
    });
  
    /* ---------- FAQ Accordion ---------- */
    document.querySelectorAll('.faq-item').forEach(item => {
      const question = item.querySelector('.faq-question');
      const answer   = item.querySelector('.faq-answer');
      question?.addEventListener('click', () => {
        const isOpen = item.classList.contains('open');
        document.querySelectorAll('.faq-item.open').forEach(open => {
          open.classList.remove('open');
          const a = open.querySelector('.faq-answer');
          if (a) a.style.maxHeight = null;
        });
        if (!isOpen) {
          item.classList.add('open');
          if (answer) answer.style.maxHeight = answer.scrollHeight + 'px';
        }
      });
    });
  
    /* ---------- Contact Form ---------- */
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
      const msgEl = document.getElementById('form-message');
  
      contactForm.addEventListener('submit', async (e) => {
        e.preventDefault();
  
        const submitBtn = contactForm.querySelector('[type="submit"]');
        const btnSpan   = submitBtn?.querySelector('span');
        const origText  = btnSpan?.textContent || 'Send Message';
        if (btnSpan) btnSpan.textContent = 'Sending…';
        if (submitBtn) submitBtn.disabled = true;
  
        const data = Object.fromEntries(new FormData(contactForm).entries());
  
        // Build mailto fallback
        const subject = encodeURIComponent(`[Stonewise] Enquiry from ${data.name || 'Website Visitor'}`);
        const body    = encodeURIComponent([
          `Name: ${data.name || ''}`,
          `Email: ${data.email || ''}`,
          `Phone: ${data.phone || ''}`,
          `Service: ${data.service || ''}`,
          ``,
          `Message:`,
          data.message || '',
        ].join('\n'));
        const mailtoLink = `mailto:info@stonewiseconstruction.com?subject=${subject}&body=${body}`;
  
        const endpoint = contactForm.dataset.endpoint;
  
        if (endpoint && endpoint !== '#' && !endpoint.includes('YOUR_FORM_ID')) {
          try {
            // Build payload — _replyto lets you reply directly to the enquirer from your inbox
            const payload = {
              name:      data.name     || '',
              email:     data.email    || '',
              _replyto:  data.email    || '',
              phone:     data.phone    || '',
              service:   data.service  || '',
              budget:    data.budget   || '',
              timeline:  data.timeline || '',
              message:   data.message  || '',
              _subject:  `[Stonewise] New Enquiry from ${data.name || 'Website Visitor'}`,
            };

            const res = await fetch(endpoint, {
              method: 'POST',
              headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' },
              body: JSON.stringify(payload),
            });

            const json = await res.json().catch(() => ({}));

            if (res.ok) {
              if (msgEl) {
                msgEl.className = 'form-message success';
                msgEl.textContent = 'Thank you! Your enquiry has been sent. We will get back to you within 24 hours.';
              }
              contactForm.reset();
            } else {
              // Formspree returns error details in json.errors
              const detail = json.errors?.map(e => e.message).join(', ') || 'Server error';
              throw new Error(detail);
            }
          } catch (err) {
            if (msgEl) {
              msgEl.className = 'form-message error';
              msgEl.textContent = 'There was an error sending your message. Please email us directly at info@stonewiseconstruction.com.';
            }
            console.error('Form error:', err);
          }
        } else {
          // Fallback: open mailto when Formspree is not yet configured
          window.location.href = mailtoLink;
          if (msgEl) {
            msgEl.className = 'form-message success';
            msgEl.textContent = 'Your email client has been opened with your message. You can also call us directly.';
          }
        }
  
        if (btnSpan) btnSpan.textContent = origText;
        if (submitBtn) submitBtn.disabled = false;
        msgEl?.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      });
    }
  
    /* ---------- Newsletter Form ---------- */
    const newsletterForm = document.getElementById('newsletter-form');
    if (newsletterForm) {
      newsletterForm.addEventListener('submit', e => {
        e.preventDefault();
        const input = newsletterForm.querySelector('input[type="email"]');
        const btn   = newsletterForm.querySelector('.btn span') || newsletterForm.querySelector('button');
        if (btn) btn.textContent = 'Subscribed ✓';
        if (input) input.value = '';
        setTimeout(() => { if (btn) btn.textContent = 'Subscribe'; }, 3000);
      });
    }
  
    /* ---------- Counter Animation ---------- */
    function animateCounter(el, end, duration = 2000) {
      const steps = duration / 16;
      const inc   = end / steps;
      let current = 0;
      const timer = setInterval(() => {
        current += inc;
        if (current >= end) { current = end; clearInterval(timer); }
        el.textContent = Math.floor(current) + (el.dataset.suffix || '');
      }, 16);
    }
  
    const statEls = document.querySelectorAll('[data-counter]');
    if (statEls.length && 'IntersectionObserver' in window) {
      const cObs = new IntersectionObserver(entries => {
        entries.forEach(e => {
          if (e.isIntersecting) {
            animateCounter(e.target, parseInt(e.target.dataset.counter));
            cObs.unobserve(e.target);
          }
        });
      }, { threshold: 0.5 });
      statEls.forEach(el => cObs.observe(el));
    }
  
    /* ---------- Parallax Hero ---------- */
    const heroBg = document.querySelector('.hero__bg-img');
    if (heroBg) {
      window.addEventListener('scroll', () => {
        const y = window.scrollY;
        if (y < window.innerHeight) heroBg.style.transform = `scale(1.04) translateY(${y * 0.16}px)`;
      }, { passive: true });
    }
  
    /* ---------- Auto-Scroll Tracks — reading-speed snap ---------- */
    /**
     * For every horizontal scroll track on mobile the carousel advances
     * one card at a time. The dwell time on each card is calculated from
     * its word count at 200 wpm (average comfortable reading pace) with a
     * 1.5 s minimum and a 6 s maximum. After the last card it reverses.
     * Pauses while the user is touching / hovering; resumes 3 s after.
     *
     * Tracks covered:
     *   .why-us__scroll-track   → .why-us__item cards
     *   .services__scroll-track → .service-card cards
     *   .projects__scroll-track → .project-card cards
     *   .process-scroll-track   → .process-step cards
     */
    (function initReadingScrollTracks() {
      const WPM         = 200;
      const MIN_DWELL   = 1500;   // ms
      const MAX_DWELL   = 6000;   // ms
      const SNAP_MS     = 500;    // smooth-scroll animation budget
      const PAUSE_AFTER = 3000;   // ms after user interaction before resuming

      const TRACKS = [
        { track: '.why-us__scroll-track',   cards: '.why-us__item'  },
        { track: '.services__scroll-track', cards: '.service-card'  },
        { track: '.projects__scroll-track', cards: '.project-card'  },
        { track: '.process-scroll-track',   cards: '.process-step'  },
      ];

      function wordsIn(el) {
        return (el.innerText || el.textContent || '').trim().split(/\s+/).filter(Boolean).length;
      }
      function dwellFor(words) {
        return Math.min(MAX_DWELL, Math.max(MIN_DWELL, (words / WPM) * 60 * 1000));
      }
      function smoothScrollTo(el, left) {
        // Use scrollTo with behaviour when supported, otherwise jump
        try { el.scrollTo({ left, behavior: 'smooth' }); }
        catch (_) { el.scrollLeft = left; }
      }

      TRACKS.forEach(({ track: trackSel, cards: cardSel }) => {
        const track = document.querySelector(trackSel);
        if (!track) return;

        let paused    = false;
        let pauseTimer;
        let timeoutId;
        let index     = 0;
        let direction = 1;   // 1 = forward, -1 = backward

        function getCards() {
          return [...track.querySelectorAll(cardSel)];
        }

        function advance() {
          // Only run when there's actual horizontal overflow (i.e. on mobile)
          if (track.scrollWidth <= track.clientWidth + 4) {
            timeoutId = setTimeout(advance, 1000);
            return;
          }
          if (paused) { timeoutId = setTimeout(advance, 200); return; }

          const cards = getCards();
          if (!cards.length) return;

          index += direction;

          // Reverse at ends
          if (index >= cards.length) { index = cards.length - 2; direction = -1; }
          if (index < 0)             { index = 1;                 direction =  1; }
          index = Math.max(0, Math.min(index, cards.length - 1));

          // Scroll so the target card's left edge aligns with the track's left edge
          const card       = cards[index];
          const targetLeft = card.offsetLeft - track.offsetLeft - parseInt(getComputedStyle(track).paddingLeft || 0);
          smoothScrollTo(track, Math.max(0, targetLeft));

          // Dwell = time to read this card
          const dwell = dwellFor(wordsIn(card)) + SNAP_MS;
          timeoutId = setTimeout(advance, dwell);
        }

        function pause() {
          paused = true;
          clearTimeout(pauseTimer);
        }
        function resume() {
          clearTimeout(pauseTimer);
          pauseTimer = setTimeout(() => { paused = false; }, PAUSE_AFTER);
        }

        track.addEventListener('touchstart',  pause,  { passive: true });
        track.addEventListener('touchend',    resume, { passive: true });
        track.addEventListener('pointerdown', pause,  { passive: true });
        track.addEventListener('pointerup',   resume, { passive: true });
        track.addEventListener('mouseenter',  pause,  { passive: true });
        track.addEventListener('mouseleave',  resume, { passive: true });

        // Start after a short delay so layout has settled
        timeoutId = setTimeout(advance, 1800);
      });
    })();

    /* ---------- Project Filter (projects.html) ---------- */
    const filterBtns = document.querySelectorAll('.filter-btn');
    const projCards  = document.querySelectorAll('.project-card[data-category]');
    if (filterBtns.length) {
      filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
          filterBtns.forEach(b => b.classList.remove('active'));
          btn.classList.add('active');
          const cat = btn.dataset.filter;
          projCards.forEach(card => {
            if (cat === 'all' || card.dataset.category === cat) {
              card.classList.remove('hidden');
            } else {
              card.classList.add('hidden');
            }
          });
        });
      });
    }

    /* ---------- Horizontal Scroll Carousels ---------- */
    function initScrollCarousel(trackId, dotsId) {
      const track = document.getElementById(trackId);
      const dotsEl = document.getElementById(dotsId);
      if (!track) return;

      const cards = Array.from(track.querySelectorAll('.scroll-card'));
      const prevBtn = document.querySelector(`.scroll-btn--prev[data-target="${trackId}"]`);
      const nextBtn = document.querySelector(`.scroll-btn--next[data-target="${trackId}"]`);

      /* Build dot indicators */
      if (dotsEl && cards.length > 1) {
        cards.forEach((_, i) => {
          const dot = document.createElement('button');
          dot.className = 'scroll-dot' + (i === 0 ? ' active' : '');
          dot.setAttribute('aria-label', `Go to item ${i + 1}`);
          dot.addEventListener('click', () => scrollToCard(i));
          dotsEl.appendChild(dot);
        });
      }

      function getDots() { return dotsEl ? Array.from(dotsEl.querySelectorAll('.scroll-dot')) : []; }

      function getActiveIndex() {
        const trackRect = track.getBoundingClientRect();
        let best = 0, bestDist = Infinity;
        cards.forEach((card, i) => {
          const dist = Math.abs(card.getBoundingClientRect().left - trackRect.left);
          if (dist < bestDist) { bestDist = dist; best = i; }
        });
        return best;
      }

      function updateState() {
        const idx = getActiveIndex();
        getDots().forEach((d, i) => d.classList.toggle('active', i === idx));
        if (prevBtn) prevBtn.disabled = track.scrollLeft <= 4;
        if (nextBtn) nextBtn.disabled = track.scrollLeft + track.clientWidth >= track.scrollWidth - 4;
      }

      function scrollToCard(i) {
        const card = cards[i];
        if (!card) return;
        const offset = card.offsetLeft - track.offsetLeft;
        track.scrollTo({ left: offset, behavior: 'smooth' });
      }

      prevBtn?.addEventListener('click', () => {
        const idx = Math.max(0, getActiveIndex() - 1);
        scrollToCard(idx);
      });
      nextBtn?.addEventListener('click', () => {
        const idx = Math.min(cards.length - 1, getActiveIndex() + 1);
        scrollToCard(idx);
      });

      track.addEventListener('scroll', updateState, { passive: true });

      /* Drag-to-scroll */
      let isDown = false, startX = 0, scrollStart = 0;
      track.addEventListener('mousedown', e => {
        isDown = true; startX = e.pageX - track.offsetLeft; scrollStart = track.scrollLeft;
        track.style.scrollBehavior = 'auto';
      });
      track.addEventListener('mouseleave', () => { isDown = false; track.style.scrollBehavior = ''; });
      track.addEventListener('mouseup',    () => { isDown = false; track.style.scrollBehavior = ''; });
      track.addEventListener('mousemove',  e => {
        if (!isDown) return;
        e.preventDefault();
        track.scrollLeft = scrollStart - (e.pageX - track.offsetLeft - startX);
      });

      updateState();
    }

    initScrollCarousel('values-track',   'values-dots');
    initScrollCarousel('timeline-track', 'timeline-dots');
    initScrollCarousel('team-track',     'team-dots');
    initScrollCarousel('process-track',  'process-dots');

  });