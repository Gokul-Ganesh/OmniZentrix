/* ============================================================
   OMNIZENTRIX — Main JavaScript
   Premium Interactions, Animations & Micro-interactions
   ============================================================ */

'use strict';

// ============================================================
// PAGE LOADER
// ============================================================
(function initLoader() {
    const loader = document.getElementById('pageLoader');
    if (!loader) return;

    document.body.classList.add('loading');

    setTimeout(() => {
        loader.classList.add('hidden');
        document.body.classList.remove('loading');

        // Trigger hero animations
        document.querySelectorAll('.title-line').forEach(el => {
            el.style.animationPlayState = 'running';
        });
    }, 2400);
})();

// ============================================================
// CUSTOM CURSOR
// ============================================================
(function initCursor() {
    const cursor = document.getElementById('cursor');
    const follower = document.getElementById('cursorFollower');

    if (!cursor || !follower) return;
    if (!window.matchMedia('(hover: hover)').matches) return;

    let mouseX = 0, mouseY = 0;
    let followerX = 0, followerY = 0;

    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
        cursor.style.left = mouseX + 'px';
        cursor.style.top = mouseY + 'px';
    });

    function animateFollower() {
        followerX += (mouseX - followerX) * 0.12;
        followerY += (mouseY - followerY) * 0.12;
        follower.style.left = followerX + 'px';
        follower.style.top = followerY + 'px';
        requestAnimationFrame(animateFollower);
    }
    animateFollower();

    // Hover interactions
    const hoverables = document.querySelectorAll('a, button, .service-card, .portfolio-card, .feature-tab, .filter-btn');
    hoverables.forEach(el => {
        el.addEventListener('mouseenter', () => {
            cursor.classList.add('cursor-hover');
            follower.classList.add('cursor-hover');
        });
        el.addEventListener('mouseleave', () => {
            cursor.classList.remove('cursor-hover');
            follower.classList.remove('cursor-hover');
        });
    });
})();

// ============================================================
// NAVIGATION
// ============================================================
(function initNavigation() {
    const navbar = document.getElementById('navbar');
    const navToggle = document.getElementById('navToggle');
    const navLinks = document.getElementById('navLinks');
    const allNavLinks = document.querySelectorAll('.nav-link');

    if (!navbar) return;

    // Scroll effect
    let lastScroll = 0;
    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;
        if (currentScroll > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
        lastScroll = currentScroll;
    }, { passive: true });

    // Mobile toggle
    if (navToggle && navLinks) {
        navToggle.addEventListener('click', () => {
            navToggle.classList.toggle('active');
            navLinks.classList.toggle('open');
        });
    }

    // Close on link click
    allNavLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (navToggle) navToggle.classList.remove('active');
            if (navLinks) navLinks.classList.remove('open');
        });
    });

    // Active link on scroll
    const sections = document.querySelectorAll('section[id]');
    window.addEventListener('scroll', () => {
        const scrollPos = window.pageYOffset + 100;
        sections.forEach(section => {
            const top = section.offsetTop;
            const bottom = top + section.offsetHeight;
            const id = section.getAttribute('id');
            const link = document.querySelector(`.nav-link[href="#${id}"]`);
            if (link) {
                if (scrollPos >= top && scrollPos < bottom) {
                    allNavLinks.forEach(l => l.classList.remove('active'));
                    link.classList.add('active');
                }
            }
        });
    }, { passive: true });
})();

// ============================================================
// HERO CANVAS — PARTICLE NETWORK
// ============================================================
(function initHeroCanvas() {
    const canvas = document.getElementById('heroCanvas');
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let animFrame;
    let particles = [];
    const PARTICLE_COUNT = window.innerWidth < 768 ? 40 : 80;
    const MAX_DISTANCE = 140;

    function resize() {
        canvas.width = canvas.offsetWidth;
        canvas.height = canvas.offsetHeight;
    }

    class Particle {
        constructor() {
            this.reset();
        }

        reset() {
            this.x = Math.random() * canvas.width;
            this.y = Math.random() * canvas.height;
            this.vx = (Math.random() - 0.5) * 0.4;
            this.vy = (Math.random() - 0.5) * 0.4;
            this.radius = Math.random() * 1.5 + 0.5;
            this.opacity = Math.random() * 0.4 + 0.1;
        }

        update() {
            this.x += this.vx;
            this.y += this.vy;

            if (this.x < 0 || this.x > canvas.width) this.vx *= -1;
            if (this.y < 0 || this.y > canvas.height) this.vy *= -1;
        }

        draw() {
            ctx.save();
            ctx.globalAlpha = this.opacity;
            ctx.fillStyle = '#ffffff';
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
            ctx.fill();
            ctx.restore();
        }
    }

    function createParticles() {
        particles = [];
        for (let i = 0; i < PARTICLE_COUNT; i++) {
            particles.push(new Particle());
        }
    }

    function drawConnections() {
        for (let i = 0; i < particles.length; i++) {
            for (let j = i + 1; j < particles.length; j++) {
                const dx = particles[i].x - particles[j].x;
                const dy = particles[i].y - particles[j].y;
                const dist = Math.sqrt(dx * dx + dy * dy);

                if (dist < MAX_DISTANCE) {
                    const opacity = (1 - dist / MAX_DISTANCE) * 0.12;
                    ctx.save();
                    ctx.globalAlpha = opacity;
                    ctx.strokeStyle = '#ffffff';
                    ctx.lineWidth = 0.5;
                    ctx.beginPath();
                    ctx.moveTo(particles[i].x, particles[i].y);
                    ctx.lineTo(particles[j].x, particles[j].y);
                    ctx.stroke();
                    ctx.restore();
                }
            }
        }
    }

    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        particles.forEach(p => {
            p.update();
            p.draw();
        });

        drawConnections();
        animFrame = requestAnimationFrame(animate);
    }

    resize();
    createParticles();
    animate();

    // Handle resize with debounce
    let resizeTimer;
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(() => {
            resize();
            createParticles();
        }, 300);
    }, { passive: true });
})();

// ============================================================
// SCROLL ANIMATIONS (Intersection Observer)
// ============================================================
(function initScrollAnimations() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1, rootMargin: '0px 0px -60px 0px' });

    // Service cards
    document.querySelectorAll('.service-card').forEach((card, idx) => {
        card.style.animationDelay = (idx * 0.1) + 's';
        observer.observe(card);
    });

    // Generic fade-in elements
    document.querySelectorAll('.section-header, .about-grid, .contact-grid, .footer-top').forEach(el => {
        el.classList.add('fade-in-up');
        observer.observe(el);
    });

    // Portfolio cards
    document.querySelectorAll('.portfolio-card').forEach((card, idx) => {
        card.classList.add('fade-in-up');
        card.style.transitionDelay = (idx * 0.08) + 's';
        observer.observe(card);
    });

    // Testimonial cards
    document.querySelectorAll('.testimonial-inner').forEach((card, idx) => {
        card.classList.add('fade-in-up');
        card.style.transitionDelay = (idx * 0.08) + 's';
        observer.observe(card);
    });
})();

// ============================================================
// STATS COUNTER ANIMATION
// ============================================================
(function initStatsCounter() {
    const statNumbers = document.querySelectorAll('.stat-number');
    if (!statNumbers.length) return;

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const el = entry.target;
                const target = parseInt(el.getAttribute('data-target'), 10);
                animateCount(el, 0, target, 2000);
                observer.unobserve(el);
            }
        });
    }, { threshold: 0.5 });

    statNumbers.forEach(el => observer.observe(el));

    function animateCount(el, start, end, duration) {
        const startTime = performance.now();
        function update(currentTime) {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            const eased = easeOutExpo(progress);
            el.textContent = Math.round(start + (end - start) * eased);
            if (progress < 1) {
                requestAnimationFrame(update);
            }
        }
        requestAnimationFrame(update);
    }

    function easeOutExpo(t) {
        return t === 1 ? 1 : 1 - Math.pow(2, -10 * t);
    }
})();

// ============================================================
// FEATURES TABS
// ============================================================
(function initFeatureTabs() {
    const tabs = document.querySelectorAll('.feature-tab');
    const panels = document.querySelectorAll('.feature-panel');

    if (!tabs.length) return;

    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            const targetId = 'tab-' + tab.getAttribute('data-tab');

            // Update tabs
            tabs.forEach(t => t.classList.remove('active'));
            tab.classList.add('active');

            // Update panels
            panels.forEach(panel => {
                panel.classList.remove('active');
                if (panel.id === targetId) {
                    panel.classList.add('active');

                    // Animate metric bars
                    setTimeout(() => {
                        panel.querySelectorAll('.metric-fill').forEach(fill => {
                            fill.style.width = fill.style.getPropertyValue('--width') || getComputedStyle(fill).getPropertyValue('--width');
                        });
                    }, 50);
                }
            });
        });
    });
})();

// ============================================================
// PORTFOLIO FILTER
// ============================================================
(function initPortfolioFilter() {
    const filterBtns = document.querySelectorAll('.filter-btn');
    const portfolioCards = document.querySelectorAll('.portfolio-card');

    if (!filterBtns.length) return;

    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const filter = btn.getAttribute('data-filter');

            // Update active button
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            // Filter cards
            portfolioCards.forEach(card => {
                const category = card.getAttribute('data-category');
                if (filter === 'all' || category === filter) {
                    card.classList.remove('hide');
                    card.style.opacity = '0';
                    card.style.transform = 'translateY(20px)';
                    setTimeout(() => {
                        card.style.opacity = '';
                        card.style.transform = '';
                        card.style.transition = 'opacity 0.4s ease, transform 0.4s ease, border-color 0.3s ease, box-shadow 0.3s ease';
                    }, 10);
                } else {
                    card.style.opacity = '0';
                    card.style.transform = 'translateY(10px)';
                    setTimeout(() => {
                        card.classList.add('hide');
                    }, 300);
                }
            });
        });
    });
})();

// ============================================================
// TESTIMONIALS SLIDER
// ============================================================
(function initTestimonialsSlider() {
    const track = document.getElementById('testimonialsTrack');
    const prevBtn = document.getElementById('testimPrev');
    const nextBtn = document.getElementById('testimNext');
    const dotsContainer = document.getElementById('testimonialsDots');

    if (!track) return;

    const cards = track.querySelectorAll('.testimonial-card');
    let currentSlide = 0;
    let autoPlayInterval;
    let cardsPerView = getCardsPerView();

    function getCardsPerView() {
        if (window.innerWidth < 768) return 1;
        if (window.innerWidth < 1024) return 2;
        return 3;
    }

    const totalSlides = Math.ceil(cards.length / cardsPerView);

    // Create dots
    function createDots() {
        if (!dotsContainer) return;
        dotsContainer.innerHTML = '';
        for (let i = 0; i < totalSlides; i++) {
            const dot = document.createElement('div');
            dot.classList.add('dot');
            if (i === 0) dot.classList.add('active');
            dot.addEventListener('click', () => goToSlide(i));
            dotsContainer.appendChild(dot);
        }
    }

    function updateDots() {
        if (!dotsContainer) return;
        dotsContainer.querySelectorAll('.dot').forEach((dot, idx) => {
            dot.classList.toggle('active', idx === currentSlide);
        });
    }

    function goToSlide(index) {
        currentSlide = Math.max(0, Math.min(index, totalSlides - 1));
        const offset = currentSlide * cardsPerView;
        const cardWidth = cards[0].offsetWidth + 24; // gap
        track.style.transform = `translateX(-${offset * cardWidth}px)`;
        updateDots();
    }

    function nextSlide() {
        const next = (currentSlide + 1) % totalSlides;
        goToSlide(next);
    }

    function prevSlide() {
        const prev = (currentSlide - 1 + totalSlides) % totalSlides;
        goToSlide(prev);
    }

    if (nextBtn) nextBtn.addEventListener('click', () => {
        nextSlide();
        resetAutoPlay();
    });

    if (prevBtn) prevBtn.addEventListener('click', () => {
        prevSlide();
        resetAutoPlay();
    });

    function startAutoPlay() {
        autoPlayInterval = setInterval(nextSlide, 5000);
    }

    function resetAutoPlay() {
        clearInterval(autoPlayInterval);
        startAutoPlay();
    }

    // Touch/Swipe support
    let touchStartX = 0;
    track.addEventListener('touchstart', (e) => {
        touchStartX = e.touches[0].clientX;
    }, { passive: true });

    track.addEventListener('touchend', (e) => {
        const diff = touchStartX - e.changedTouches[0].clientX;
        if (Math.abs(diff) > 50) {
            if (diff > 0) nextSlide();
            else prevSlide();
            resetAutoPlay();
        }
    }, { passive: true });

    createDots();
    startAutoPlay();

    window.addEventListener('resize', () => {
        cardsPerView = getCardsPerView();
        currentSlide = 0;
        goToSlide(0);
    }, { passive: true });
})();

// ============================================================
// CONTACT FORM
// ============================================================
(function initContactForm() {
    const form = document.getElementById('contactForm');
    if (!form) return;

    const successMsg = document.getElementById('formSuccess');
    const submitBtn = form.querySelector('button[type="submit"]');

    form.addEventListener('submit', async (e) => {
        e.preventDefault();

        const btnText = submitBtn.querySelector('.btn-text');
        const btnLoading = submitBtn.querySelector('.btn-loading');
        const btnIcon = submitBtn.querySelector('.btn-icon');

        // Show loading state
        if (btnText) btnText.style.display = 'none';
        if (btnLoading) btnLoading.style.display = 'inline-flex';
        if (btnIcon) btnIcon.style.display = 'none';
        submitBtn.disabled = true;

        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 2000));

        // Success state
        if (btnText) btnText.style.display = 'inline';
        if (btnLoading) btnLoading.style.display = 'none';
        if (btnIcon) btnIcon.style.display = '';
        submitBtn.disabled = false;

        if (successMsg) {
            successMsg.classList.add('visible');
            setTimeout(() => successMsg.classList.remove('visible'), 5000);
        }

        // Store form data
        const formData = new FormData(form);
        const data = Object.fromEntries(formData.entries());
        await saveContact(data);

        form.reset();
    });

    async function saveContact(data) {
        try {
            await fetch('tables/contacts', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    name: (data.firstName || '') + ' ' + (data.lastName || ''),
                    email: data.email || '',
                    company: data.company || '',
                    service: data.service || '',
                    message: data.message || '',
                    submitted_at: new Date().toISOString()
                })
            });
        } catch (err) {
            console.log('Form submission stored locally');
        }
    }
})();

// ============================================================
// SMOOTH SCROLL (enhanced)
// ============================================================
(function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(link => {
        link.addEventListener('click', (e) => {
            const href = link.getAttribute('href');
            if (href === '#') return;

            const target = document.querySelector(href);
            if (!target) return;

            e.preventDefault();
            const offset = 80;
            const targetPos = target.getBoundingClientRect().top + window.pageYOffset - offset;

            window.scrollTo({
                top: targetPos,
                behavior: 'smooth'
            });
        });
    });
})();

// ============================================================
// MAGNETIC BUTTONS (micro-interaction)
// ============================================================
(function initMagneticButtons() {
    const magneticBtns = document.querySelectorAll('.btn');

    if (!window.matchMedia('(hover: hover)').matches) return;

    magneticBtns.forEach(btn => {
        btn.addEventListener('mousemove', (e) => {
            const rect = btn.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;
            btn.style.transform = `translate(${x * 0.1}px, ${y * 0.15}px) translateY(-2px)`;
        });

        btn.addEventListener('mouseleave', () => {
            btn.style.transform = '';
        });
    });
})();

// ============================================================
// SERVICE CARD GLOW (mouse tracking)
// ============================================================
(function initCardGlow() {
    const cards = document.querySelectorAll('.service-card, .contact-form-wrapper');

    if (!window.matchMedia('(hover: hover)').matches) return;

    cards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = ((e.clientX - rect.left) / rect.width) * 100;
            const y = ((e.clientY - rect.top) / rect.height) * 100;

            const glow = card.querySelector('.card-glow');
            if (glow) {
                glow.style.background = `radial-gradient(circle at ${x}% ${y}%, rgba(255,255,255,0.06) 0%, transparent 60%)`;
            }
        });
    });
})();

// ============================================================
// TILT EFFECT (Portfolio Cards)
// ============================================================
(function initTiltEffect() {
    const tiltCards = document.querySelectorAll('.portfolio-card, .testimonial-inner');

    if (!window.matchMedia('(hover: hover)').matches) return;

    tiltCards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = (e.clientX - rect.left) / rect.width - 0.5;
            const y = (e.clientY - rect.top) / rect.height - 0.5;

            const tiltX = y * 6;
            const tiltY = -x * 6;

            card.style.transform = `perspective(800px) rotateX(${tiltX}deg) rotateY(${tiltY}deg) translateY(-8px)`;
            card.style.transition = 'transform 0.1s ease';
        });

        card.addEventListener('mouseleave', () => {
            card.style.transform = '';
            card.style.transition = 'transform 0.4s ease, border-color 0.3s ease, box-shadow 0.3s ease';
        });
    });
})();

// ============================================================
// TECH NODE CONNECTIONS (About Section)
// ============================================================
(function initTechNodes() {
    const techGrid = document.querySelector('.about-tech-grid');
    if (!techGrid) return;

    const observer = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting) {
            document.querySelectorAll('.conn-line').forEach(line => {
                line.style.animationPlayState = 'running';
            });
            observer.disconnect();
        }
    }, { threshold: 0.3 });

    observer.observe(techGrid);
})();

// ============================================================
// METRIC BARS ANIMATION
// ============================================================
(function initMetricBars() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const fills = entry.target.querySelectorAll('.metric-fill');
                fills.forEach(fill => {
                    const width = fill.style.cssText.match(/--width:\s*([^;]+)/)?.[1] || '0%';
                    fill.style.width = width;
                });
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    const featuresSection = document.getElementById('features');
    if (featuresSection) observer.observe(featuresSection);
})();

// ============================================================
// SCROLL PROGRESS INDICATOR
// ============================================================
(function initScrollProgress() {
    const progressBar = document.createElement('div');
    progressBar.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        height: 2px;
        background: linear-gradient(90deg, rgba(255,255,255,0.8), rgba(255,255,255,0.4));
        z-index: 99999;
        transition: width 0.1s linear;
        box-shadow: 0 0 8px rgba(255,255,255,0.4);
        pointer-events: none;
        width: 0%;
    `;
    document.body.appendChild(progressBar);

    window.addEventListener('scroll', () => {
        const scrollTop = window.pageYOffset;
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;
        const progress = (scrollTop / docHeight) * 100;
        progressBar.style.width = progress + '%';
    }, { passive: true });
})();

// ============================================================
// TYPEWRITER EFFECT (Hero Badge)
// ============================================================
(function initTypewriter() {
    const badge = document.querySelector('.hero-badge span:last-child');
    if (!badge) return;

    const phrases = [
        'Next-Gen Digital Infrastructure',
        'AI-Powered Systems',
        'Built for Scale',
        'Zero Compromise Performance'
    ];

    let phraseIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let isPaused = false;

    function typeEffect() {
        if (isPaused) return;

        const currentPhrase = phrases[phraseIndex];

        if (!isDeleting) {
            badge.textContent = currentPhrase.substring(0, charIndex + 1);
            charIndex++;

            if (charIndex === currentPhrase.length) {
                isDeleting = false;
                isPaused = true;
                setTimeout(() => {
                    isPaused = false;
                    isDeleting = true;
                    typeEffect();
                }, 2500);
                return;
            }
        } else {
            badge.textContent = currentPhrase.substring(0, charIndex - 1);
            charIndex--;

            if (charIndex === 0) {
                isDeleting = false;
                phraseIndex = (phraseIndex + 1) % phrases.length;
            }
        }

        const speed = isDeleting ? 40 : 80;
        setTimeout(typeEffect, speed);
    }

    // Start after loader
    setTimeout(typeEffect, 3500);
})();

// ============================================================
// GLOW TRAIL EFFECT (subtle mouse glow)
// ============================================================
(function initGlowTrail() {
    if (!window.matchMedia('(hover: hover)').matches) return;

    const hero = document.querySelector('.hero');
    if (!hero) return;

    hero.addEventListener('mousemove', (e) => {
        const rect = hero.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        const orbs = hero.querySelectorAll('.orb');
        orbs[0].style.transform = `translate(${x * 0.02}px, ${y * 0.02}px)`;
    }, { passive: true });
})();

// ============================================================
// PAGE REVEAL ANIMATION
// ============================================================
window.addEventListener('load', () => {
    document.querySelectorAll('.fade-in-up').forEach(el => {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });
        observer.observe(el);
    });
});

// ============================================================
// SECTION REVEAL (individual elements)
// ============================================================
(function initSectionReveal() {
    const revealElements = document.querySelectorAll(
        '.service-card, .portfolio-card, .testimonial-card, .pillar, .contact-item, .feature-tab'
    );

    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry, idx) => {
            if (entry.isIntersecting) {
                entry.target.style.animationDelay = (idx * 0.05) + 's';
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });

    revealElements.forEach(el => observer.observe(el));
})();

console.log('%cOmnizentrix — Engineering Digital Intelligence', 'color: #ffffff; background: #000; padding: 10px 20px; font-size: 14px; font-weight: bold; border: 1px solid #333;');
