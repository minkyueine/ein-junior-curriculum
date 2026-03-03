// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            e.preventDefault();
            target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    });
});

// Intersection Observer for fade-in animations
const observerOptions = { threshold: 0.15, rootMargin: '0px 0px -40px 0px' };
const fadeObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            fadeObserver.unobserve(entry.target);
        }
    });
}, observerOptions);

document.querySelectorAll('.hero-photo-card, .video-review-card, .book-cover, .app-feature-card, .lt-step, .cur-step, .att-card, .feature-pill, .reason-card').forEach(el => {
    el.classList.add('fade-in');
    fadeObserver.observe(el);
});

// Add fade-in CSS dynamically
const style = document.createElement('style');
style.textContent = `
.fade-in {
    opacity: 0;
    transform: translateY(30px);
    transition: opacity 0.6s ease-out, transform 0.6s ease-out;
}
.fade-in.visible {
    opacity: 1;
    transform: translateY(0);
}
.hero-photo-card.fade-in { transition-delay: calc(var(--i, 0) * 0.1s); }
.reason-card.fade-in { transition-delay: calc(var(--i, 0) * 0.15s); }
`;
document.head.appendChild(style);

// Stagger hero photo animations
document.querySelectorAll('.hero-photo-card').forEach((card, i) => {
    card.style.setProperty('--i', i);
});

// Stagger reason card animations
document.querySelectorAll('.reason-card').forEach((card, i) => {
    card.style.setProperty('--i', i);
});

// ── 마퀴 터치 일시정지 (모바일) ────────────────────────────
const marqueeRows = document.querySelectorAll('#reviewsRow1, #reviewsRow2');
const marqueeWrap = document.querySelector('.real-reviews__rows');
if (marqueeWrap && marqueeRows.length) {
    marqueeWrap.addEventListener('touchstart', () => {
        marqueeRows.forEach(r => r.style.animationPlayState = 'paused');
    }, { passive: true });
    marqueeWrap.addEventListener('touchend', () => {
        marqueeRows.forEach(r => r.style.animationPlayState = 'running');
    }, { passive: true });
}
