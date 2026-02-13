/* ╔══════════════════════════════════════════════════╗
   ║  Valentine Website — Script                      ║
   ╚══════════════════════════════════════════════════╝ */

document.addEventListener('DOMContentLoaded', () => {
    initCursorHearts();
    initFloatingHearts();
    initParticles();
    initMessageHearts();
    initHeartCollage();
    initLoveCounter();
    initLightbox();
    initGalleryScrollReveal();
    initGSAPAnimations();
});

/* ═══════════════════════════════════════════════════
   CURSOR HEARTS — Canvas-based heart trail
   ═══════════════════════════════════════════════════ */
function initCursorHearts() {
    const canvas = document.getElementById('cursor-canvas');
    const ctx = canvas.getContext('2d');
    let hearts = [];
    let mouseX = -100, mouseY = -100;
    let lastSpawn = 0;

    function resize() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }
    resize();
    window.addEventListener('resize', resize);

    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
    });

    function drawHeart(ctx, x, y, size) {
        ctx.beginPath();
        const topCurveHeight = size * 0.3;
        ctx.moveTo(x, y + topCurveHeight);
        // Left curve
        ctx.bezierCurveTo(x, y, x - size / 2, y, x - size / 2, y + topCurveHeight);
        ctx.bezierCurveTo(x - size / 2, y + (size + topCurveHeight) / 2, x, y + (size + topCurveHeight) / 1.4, x, y + size);
        // Right curve
        ctx.bezierCurveTo(x, y + (size + topCurveHeight) / 1.4, x + size / 2, y + (size + topCurveHeight) / 2, x + size / 2, y + topCurveHeight);
        ctx.bezierCurveTo(x + size / 2, y, x, y, x, y + topCurveHeight);
        ctx.closePath();
    }

    function spawnHeart() {
        hearts.push({
            x: mouseX + (Math.random() - 0.5) * 14,
            y: mouseY + (Math.random() - 0.5) * 14,
            size: 6 + Math.random() * 8,
            life: 1,
            decay: 0.008 + Math.random() * 0.006,
            vx: (Math.random() - 0.5) * 0.8,
            vy: -0.4 - Math.random() * 0.6,
            rotation: (Math.random() - 0.5) * 0.3
        });
    }

    function animate(timestamp) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        // Spawn hearts every ~200ms for gentle, smooth trail
        if (timestamp - lastSpawn > 200 && mouseX > 0) {
            spawnHeart();
            lastSpawn = timestamp;
        }

        hearts = hearts.filter(h => h.life > 0);

        hearts.forEach(h => {
            h.x += h.vx * 0.4;
            h.y += h.vy * 0.4;
            h.life -= h.decay;
            h.rotation += 0.008;

            ctx.save();
            ctx.translate(h.x, h.y);
            ctx.rotate(h.rotation);
            ctx.globalAlpha = h.life * 0.6;

            drawHeart(ctx, 0, -h.size / 2, h.size);

            ctx.fillStyle = `rgba(110, 193, 255, ${h.life})`;
            ctx.shadowColor = 'rgba(110, 193, 255, 0.5)';
            ctx.shadowBlur = 12;
            ctx.fill();

            ctx.restore();
        });

        requestAnimationFrame(animate);
    }

    requestAnimationFrame(animate);
}

/* ═══════════════════════════════════════════════════
   FLOATING HEARTS — Ambient background hearts
   ═══════════════════════════════════════════════════ */
function initFloatingHearts() {
    const container = document.getElementById('floating-hearts-bg');
    const heartChars = ['♥', '♡', '❤', '💙'];

    function spawnHeart() {
        const el = document.createElement('span');
        el.className = 'floating-heart';
        el.textContent = heartChars[Math.floor(Math.random() * heartChars.length)];
        el.style.left = Math.random() * 100 + '%';
        el.style.fontSize = (12 + Math.random() * 18) + 'px';
        el.style.animationDuration = (12 + Math.random() * 18) + 's';
        el.style.animationDelay = Math.random() * 5 + 's';
        container.appendChild(el);

        setTimeout(() => el.remove(), 35000);
    }

    // Initial burst
    for (let i = 0; i < 15; i++) {
        setTimeout(() => spawnHeart(), i * 600);
    }

    // Continuous spawning
    setInterval(spawnHeart, 3000);
}

/* ═══════════════════════════════════════════════════
   PARTICLES — Subtle floating dots
   ═══════════════════════════════════════════════════ */
function initParticles() {
    const container = document.getElementById('particles-container');

    function spawnParticle() {
        const el = document.createElement('div');
        el.className = 'particle';
        el.style.left = Math.random() * 100 + '%';
        el.style.bottom = '-5px';
        el.style.width = (2 + Math.random() * 4) + 'px';
        el.style.height = el.style.width;
        el.style.animationDuration = (15 + Math.random() * 20) + 's';
        el.style.animationDelay = Math.random() * 10 + 's';
        container.appendChild(el);

        setTimeout(() => el.remove(), 40000);
    }

    for (let i = 0; i < 25; i++) {
        setTimeout(() => spawnParticle(), i * 400);
    }

    setInterval(spawnParticle, 2000);
}

/* ═══════════════════════════════════════════════════
   MESSAGE HEARTS — Hearts behind message card
   ═══════════════════════════════════════════════════ */
function initMessageHearts() {
    const container = document.getElementById('messageHearts');
    if (!container) return;

    const positions = [
        { top: '5%', left: '10%' }, { top: '15%', left: '80%' },
        { top: '40%', left: '5%' }, { top: '60%', left: '90%' },
        { top: '75%', left: '15%' }, { top: '20%', left: '50%' },
        { top: '80%', left: '70%' }, { top: '50%', left: '25%' },
        { top: '35%', left: '75%' }, { top: '90%', left: '45%' },
    ];

    positions.forEach((pos, i) => {
        const heart = document.createElement('span');
        heart.className = 'message-float-heart';
        heart.textContent = '💙';
        heart.style.top = pos.top;
        heart.style.left = pos.left;
        heart.style.animationDelay = (i * 0.8) + 's';
        heart.style.fontSize = (16 + Math.random() * 12) + 'px';
        container.appendChild(heart);
    });
}

/* ═══════════════════════════════════════════════════
   HEART COLLAGE — Parametric heart shape
   ═══════════════════════════════════════════════════ */
function initHeartCollage() {
    const container = document.getElementById('heartCollage');
    if (!container) return;

    const count = 48;
    const photos = [];

    // Heart parametric equation
    for (let i = 0; i < count; i++) {
        const t = (i / count) * 2 * Math.PI;
        const x = 16 * Math.pow(Math.sin(t), 3);
        const y = -(13 * Math.cos(t) - 5 * Math.cos(2 * t) - 2 * Math.cos(3 * t) - Math.cos(4 * t));

        // Normalize to 0..1 range
        const nx = (x + 17) / 34;
        const ny = (y + 16) / 32;

        photos.push({ nx, ny, t });
    }

    // Add inner fill points
    const innerCount = 12;
    for (let i = 0; i < innerCount; i++) {
        const t = (i / innerCount) * 2 * Math.PI;
        const scale = 0.5 + Math.random() * 0.2;
        const x = 16 * Math.pow(Math.sin(t), 3) * scale;
        const y = -(13 * Math.cos(t) - 5 * Math.cos(2 * t) - 2 * Math.cos(3 * t) - Math.cos(4 * t)) * scale;

        const nx = (x + 17) / 34;
        const ny = (y + 16) / 32;

        photos.push({ nx, ny, t });
    }

    photos.forEach((p, i) => {
        const div = document.createElement('div');
        div.className = 'heart-photo';

        const imgIndex = (i % 60) + 1; // Cycles through 1-60
        const img = document.createElement('img');
        // Use picsum as default, try local image if available
        img.src = `https://picsum.photos/80/80?random=${i + 100}`;
        img.alt = 'Memory';
        img.loading = 'lazy';
        // Try loading local image — swap in only if it loads successfully
        const localImg = new Image();
        localImg.onload = function () { img.src = localImg.src; };
        localImg.src = `images/moments/${imgIndex}.jpeg`;

        div.appendChild(img);
        div.style.left = (p.nx * 88 + 6) + '%';
        div.style.top = (p.ny * 88 + 6) + '%';
        div.style.animationDelay = (i * 0.1) + 's';
        div.style.transform = `translate(-50%, -50%)`;

        container.appendChild(div);
    });
}

/* ═══════════════════════════════════════════════════
   LOVE COUNTER — Years/months/weeks/days/hours/minutes/seconds
   ═══════════════════════════════════════════════════ */
function initLoveCounter() {
    const startDate = new Date('2017-06-21T15:30:00');
    const els = {
        years: document.getElementById('counterYears'),
        months: document.getElementById('counterMonths'),
        weeks: document.getElementById('counterWeeks'),
        days: document.getElementById('counterDays'),
        hours: document.getElementById('counterHours'),
        minutes: document.getElementById('counterMinutes'),
        seconds: document.getElementById('counterSeconds'),
    };

    function update() {
        const now = new Date();
        const diff = now - startDate;

        // Total counts
        const totalDays = Math.floor(diff / (1000 * 60 * 60 * 24));
        const totalWeeks = Math.floor(totalDays / 7);

        // Years and months calculation
        let years = now.getFullYear() - startDate.getFullYear();
        let months = now.getMonth() - startDate.getMonth();

        if (months < 0) {
            years--;
            months += 12;
        }

        // Remaining time units
        const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
        const minutes = Math.floor((diff / (1000 * 60)) % 60);
        const seconds = Math.floor((diff / 1000) % 60);

        els.years.textContent = String(years).padStart(2, '0');
        els.months.textContent = String(months).padStart(2, '0');
        els.weeks.textContent = String(totalWeeks).padStart(3, '0');
        els.days.textContent = String(totalDays).padStart(4, '0');
        els.hours.textContent = String(hours).padStart(2, '0');
        els.minutes.textContent = String(minutes).padStart(2, '0');
        els.seconds.textContent = String(seconds).padStart(2, '0');
    }

    update();
    setInterval(update, 1000);
}

/* ═══════════════════════════════════════════════════
   GALLERY SCROLL REVEAL — Simple stagger animation
   ═══════════════════════════════════════════════════ */
function initGalleryScrollReveal() {
    // Gallery items are animated via GSAP in initGSAPAnimations
}

/* ═══════════════════════════════════════════════════
   LIGHTBOX — Gallery click popup
   ═══════════════════════════════════════════════════ */
function initLightbox() {
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightboxImg');
    const lightboxClose = document.getElementById('lightboxClose');
    const galleryItems = document.querySelectorAll('.gallery-item');

    galleryItems.forEach(item => {
        item.addEventListener('click', () => {
            const src = item.getAttribute('data-src');
            lightboxImg.src = src;
            lightbox.classList.add('active');
            document.body.style.overflow = 'hidden';
        });
    });

    function closeLightbox() {
        lightbox.classList.remove('active');
        document.body.style.overflow = '';
    }

    lightboxClose.addEventListener('click', closeLightbox);
    lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox) closeLightbox();
    });
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') closeLightbox();
    });
}

/* ═══════════════════════════════════════════════════
   GSAP SCROLL ANIMATIONS
   ═══════════════════════════════════════════════════ */
function initGSAPAnimations() {
    gsap.registerPlugin(ScrollTrigger);

    // ── Section titles fade in ──
    gsap.utils.toArray('.section-title').forEach(title => {
        gsap.from(title, {
            scrollTrigger: {
                trigger: title,
                start: 'top 85%',
                toggleActions: 'play none none reverse'
            },
            y: 40,
            opacity: 0,
            duration: 1,
            ease: 'power3.out'
        });
    });

    gsap.utils.toArray('.section-subtitle').forEach(sub => {
        gsap.from(sub, {
            scrollTrigger: {
                trigger: sub,
                start: 'top 85%',
                toggleActions: 'play none none reverse'
            },
            y: 30,
            opacity: 0,
            duration: 1,
            delay: 0.2,
            ease: 'power3.out'
        });
    });

    // ── Timeline items slide in from sides ──
    document.querySelectorAll('.timeline-item').forEach(item => {
        const isLeft = item.classList.contains('left');
        gsap.to(item, {
            scrollTrigger: {
                trigger: item,
                start: 'top 80%',
                toggleActions: 'play none none reverse'
            },
            x: 0,
            opacity: 1,
            duration: 0.9,
            ease: 'power3.out'
        });
        gsap.set(item, { x: isLeft ? -80 : 80, opacity: 0 });
    });

    // ── Gallery items stagger in ──
    gsap.utils.toArray('.gallery-item').forEach((item, i) => {
        gsap.to(item, {
            scrollTrigger: {
                trigger: item,
                start: 'top 88%',
                toggleActions: 'play none none reverse'
            },
            y: 0,
            opacity: 1,
            duration: 0.7,
            delay: (i % 4) * 0.1,
            ease: 'power3.out'
        });
        gsap.set(item, { y: 50, opacity: 0 });
    });

    // ── Journey years fade in ──
    document.querySelectorAll('.journey-year').forEach((year, i) => {
        gsap.to(year, {
            scrollTrigger: {
                trigger: year,
                start: 'top 82%',
                toggleActions: 'play none none reverse'
            },
            y: 0,
            opacity: 1,
            duration: 0.9,
            delay: i * 0.15,
            ease: 'power3.out'
        });
        gsap.set(year, { y: 60, opacity: 0 });
    });

    // ── Heart collage scale in ──
    const collageContainer = document.querySelector('.heart-collage-container');
    if (collageContainer) {
        gsap.from(collageContainer, {
            scrollTrigger: {
                trigger: collageContainer,
                start: 'top 80%',
                toggleActions: 'play none none reverse'
            },
            scale: 0.7,
            opacity: 0,
            duration: 1.2,
            ease: 'back.out(1.7)'
        });
    }

    // ── Message card ──
    const msgCard = document.querySelector('.message-card');
    if (msgCard) {
        gsap.from(msgCard, {
            scrollTrigger: {
                trigger: msgCard,
                start: 'top 80%',
                toggleActions: 'play none none reverse'
            },
            y: 60,
            opacity: 0,
            duration: 1.2,
            ease: 'power3.out'
        });
    }

    // ── Counter boxes ──
    document.querySelectorAll('.counter-box').forEach((box, i) => {
        gsap.from(box, {
            scrollTrigger: {
                trigger: box,
                start: 'top 88%',
                toggleActions: 'play none none reverse'
            },
            y: 40,
            opacity: 0,
            scale: 0.9,
            duration: 0.8,
            delay: i * 0.12,
            ease: 'back.out(1.7)'
        });
    });

    // ── Parallax on hero ──
    gsap.to('.hero-content', {
        scrollTrigger: {
            trigger: '#hero',
            start: 'top top',
            end: 'bottom top',
            scrub: 1
        },
        y: 150,
        opacity: 0.3,
        ease: 'none'
    });
}
