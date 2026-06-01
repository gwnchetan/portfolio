// ============================================================
// DATA
// ============================================================
const wdSkills = ['Node.js', 'Express', 'React', 'Python', 'Flask', 'MongoDB', 'Socket.IO', 'JWT Auth', 'REST APIs', 'Redux', 'Git', 'Linux'];
const cySkills = ['Kali Linux', 'Burp Suite', 'Nmap', 'Wireshark', 'Web App Sec', 'OWASP Top 10', 'Recon', 'Python Scripts', 'Networking', 'SQLi / XSS', 'OSINT', 'Metasploit'];

const wdProjects = [
    {
        name: 'chatterBOX',
        tag: 'Full Stack',
        desc: 'Social media platform inspired by X and Instagram. Real-time chat, notifications, follow system.',
        stack: ['React', 'Node.js', 'Socket.IO', 'MongoDB', 'JWT', 'Multer'],
        details: 'Full-stack social platform with real-time WebSocket chat, JWT auth, Socket.IO notifications, and a follow/request system modeled on Instagram. Migrated from Flask + MongoDB Atlas to React + Node.js. Features file uploads, like system, and real-time notification delivery.',
        github: '#', live: '#'
    },
    {
        name: 'Movie Times',
        tag: 'Frontend',
        desc: 'Netflix-style movie app with glassmorphism UI, infinite scroll, genre filtering, trailer modals.',
        stack: ['React', 'Vite', 'Redux Toolkit', 'Axios', 'TMDB API'],
        details: 'Netflix-inspired movie web app built with React + Vite and Redux Toolkit. Pulls from the TMDB API. Glassmorphism dark UI with purple accents (#7c3aed), infinite scroll, genre filtering, trailer modal, and a Skeleton loader system. Built for a batch competition.',
        github: '#', live: '#'
    },
    {
        name: 'logdrop',
        tag: 'CLI Tool',
        desc: 'Node.js CLI that strips debug console.log before push, while preserving console.error and console.warn.',
        stack: ['Node.js', 'CLI', 'NPM'],
        details: 'An open-source CLI tool born from a real frustration — accidentally pushing debug logs to production. logdrop strips console.log statements pre-commit while intelligently preserving .error and .warn. Small, focused, actually useful.',
        github: '#', live: null
    },
    {
        name: 'N.O.V.A.',
        tag: 'AI Agent',
        desc: 'Privacy-first local AI agent for Kali Linux. File system control, terminal access, offline voice.',
        stack: ['Python', 'Flask', 'Ollama', 'ChromaDB', 'Whisper', 'SQLite'],
        details: 'Locally-running, privacy-first AI agent for Kali Linux. Flask + Tailwind UI, Ollama as local brain (Llama 3.2 / Phi-3.5). Python Safety Gate classifies terminal commands as Safe/Risky/Dangerous. Features real-time security monitoring, offline voice via Whisper, local SQLite memory, and a bug bounty module with RAG over CVE/OWASP data.',
        github: '#', live: null
    }
];

const cyProjects = [
    {
        name: 'N.O.V.A.',
        tag: 'Security Tool',
        desc: 'Local AI with Safety Gate, CVE/exploit-db RAG module, and full offline operation on Kali.',
        stack: ['Python', 'Kali Linux', 'ChromaDB', 'Ollama', 'RAG', 'OWASP'],
        details: 'The security brain of N.O.V.A. Dedicated bug bounty module powered by RAG over local CVE, exploit-db, and OWASP data in ChromaDB. Safety Gate classifies every terminal command before execution — Safe/Risky/Dangerous. Fully offline. Never deletes permanently, never auto-submits.',
        github: '#', live: null
    },
    {
        name: 'Instagram Intercept',
        tag: 'Research',
        desc: 'TLS MITM research using mitmproxy to intercept Instagram API responses and study private API patterns.',
        stack: ['mitmproxy', 'Python', 'Burp Suite', 'TLS MITM'],
        details: 'A serious learning experiment in private API reverse engineering and proxy interception. Using mitmproxy and Burp Suite to intercept decrypted Instagram API traffic (reels, posts, feed). Goal: understand undocumented API structures and TLS MITM techniques in a controlled environment.',
        github: null, live: null
    }
];

// ============================================================
// RENDER SKILLS
// ============================================================
function renderSkills(data, id) {
    document.getElementById(id).innerHTML = data.map(s =>
        `<div class="skill-item reveal">${s}</div>`
    ).join('');
}
renderSkills(wdSkills, 'wd-skills');
renderSkills(cySkills, 'cy-skills');

// ============================================================
// RENDER PROJECT CARDS
// ============================================================
function renderCards(data, containerId) {
    const c = document.getElementById(containerId);
    c.innerHTML = data.map((p, i) => {
        const urlId = p.name.toLowerCase().replace(/\s+/g, '-');
        return `
        <div class="project-card-wrapper">
            <a href="project.html?id=${urlId}" class="project-card reveal">
                <div class="card-glow-blob"></div>
                <div class="card-content-split">
                    <div class="card-text-side">
                        <div class="project-tag">${p.tag}</div>
                        <h3 class="project-name">${p.name}</h3>
                        <div class="expandable-drawer">
                            <p class="project-desc">${p.desc}</p>
                            <div class="project-stack">${p.stack.map(s => `<span class="stack-tag">${s}</span>`).join('')}</div>
                        </div>
                    </div>
                    <div class="card-media-side">
                        <div class="media-placeholder">
                            <span class="card-arrow">↗</span>
                            <div class="media-overlay">View Project</div>
                        </div>
                    </div>
                </div>
            </a>
        </div>
        `;
    }).join('');
}
renderCards(wdProjects, 'wd-projects-grid');
renderCards(cyProjects, 'cy-projects-grid');

// ============================================================
// PROJECT CARD SCROLL ANIMATION (GSAP SCROLLTRIGGER)
// ============================================================
function initScrollCardsAnimation() {
    gsap.registerPlugin(ScrollTrigger);

    // Clean up any existing ScrollTriggers to prevent leaks and duplication
    ScrollTrigger.getAll().forEach(t => {
        if (t.vars.trigger && (t.vars.trigger.classList.contains('project-card-wrapper') || t.vars.trigger.classList.contains('project-card'))) {
            t.kill();
        }
    });

    const wrappers = document.querySelectorAll('.project-card-wrapper');
    wrappers.forEach(wrapper => {
        // Set the 3D perspective and starting values for the scroll expansion
        gsap.set(wrapper, {
            transformOrigin: "top center",
            scale: 0.88,
            rotationX: 12,
            y: 80
        });

        // Bind the scroll-linked GSAP scale and flatten animation
        gsap.to(wrapper, {
            scale: 1.0,
            rotationX: 0,
            y: 0,
            ease: "none",
            scrollTrigger: {
                trigger: wrapper,
                start: "top 95%",   // When the card top enters the bottom of screen
                end: "top 25%",     // Fully expanded when top of card is at 25% from top of screen
                scrub: 1.2,         // Smooth link to scrolling speed
                invalidateOnRefresh: true
            }
        });
    });
}
initScrollCardsAnimation();



// ============================================================
// MODAL (REMOVED: Cards now redirect to project.html)
// ============================================================

// ============================================================
// MODE TOGGLE
// ============================================================
let isCyber = false;
const overlay = document.getElementById('mode-overlay');

document.getElementById('modeToggle').addEventListener('click', () => {
    const btn = document.getElementById('modeToggle');

    // Subtle text glitch effect
    document.body.classList.add('mode-transitioning');

    overlay.style.background = isCyber ? '#ff5500' : '#00ff41';

    // Smooth transition overlay
    gsap.to(overlay, {
        opacity: 1,
        duration: 0.25,
        ease: 'power2.in',
        onComplete: () => {
            isCyber = !isCyber;

            if (isCyber) {
                document.body.classList.add('cyber-mode');
                document.getElementById('webdev-content').style.display = 'none';
                document.getElementById('cyber-content').style.display = 'block';
                btn.textContent = '◈ Dev Mode';
                document.getElementById('footer-mode').textContent = 'Cyber Mode';
            } else {
                document.body.classList.remove('cyber-mode');
                document.getElementById('webdev-content').style.display = 'block';
                document.getElementById('cyber-content').style.display = 'none';
                btn.textContent = '⚡ Cyber Mode';
                document.getElementById('footer-mode').textContent = 'Web Dev Mode';
            }

            window.scrollTo(0, 0);
            initReveal();
            initTiltEffect();
            initScrollCardsAnimation();
            if (window.particleSetMode) window.particleSetMode(isCyber ? 'cyber' : 'dev');

            // Recalculate ScrollTrigger positions after layout toggle
            ScrollTrigger.refresh();

            gsap.to(overlay, { opacity: 0, duration: 0.35, delay: 0.05, ease: 'power2.out' });

            setTimeout(() => {
                document.body.classList.remove('mode-transitioning');
            }, 100);
        }
    });
});

// ============================================================
// 3D TILT EFFECT FOR PROJECT CARDS
// ============================================================
function initTiltEffect() {
    const cards = document.querySelectorAll('.project-card');
    cards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left; // x position within the element
            const y = e.clientY - rect.top;  // y position within the element

            const centerX = rect.width / 2;
            const centerY = rect.height / 2;

            const rotateX = ((y - centerY) / centerY) * -5; // max tilt 5deg
            const rotateY = ((x - centerX) / centerX) * 5;

            gsap.to(card, {
                transform: `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`,
                duration: 0.4,
                ease: 'power2.out'
            });
        });

        card.addEventListener('mouseleave', () => {
            gsap.to(card, {
                transform: `perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)`,
                duration: 0.8,
                ease: 'elastic.out(1, 0.3)'
            });
        });
    });
}
initTiltEffect();



// ============================================================
// SMOOTH SCROLLING (LENIS)
// ============================================================
const lenis = new Lenis({
    duration: 1.2,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    direction: 'vertical',
    gestureDirection: 'vertical',
    smooth: true,
    mouseMultiplier: 1,
    smoothTouch: false,
    touchMultiplier: 2,
    infinite: false,
});

function raf(time) {
    lenis.raf(time);
    requestAnimationFrame(raf);
}
requestAnimationFrame(raf);

// ============================================================
// SCRAMBLE TEXT FUNCTION
// ============================================================
function scrambleText(element, finalString, duration = 1500) {
    const chars = '!<>-_\\/[]{}—=+*^?#________';
    const finalChars = finalString.split('');
    let iterations = 0;
    const maxIterations = duration / 30;

    const interval = setInterval(() => {
        element.innerText = finalChars.map((char, index) => {
            if (index < iterations / (maxIterations / finalChars.length)) {
                return char;
            }
            return chars[Math.floor(Math.random() * chars.length)];
        }).join('');

        iterations++;
        if (iterations >= maxIterations) {
            clearInterval(interval);
            element.innerText = finalString;
        }
    }, 30);
}

// ============================================================
// LOADER ANIMATION
// ============================================================
window.addEventListener('load', () => {
    document.body.style.overflow = 'hidden';
    lenis.stop(); // Pause smooth scrolling during load

    // Scramble the logo text
    const logoEl = document.getElementById('loader-logo');
    scrambleText(logoEl, 'CHETAN', 1200);

    const tl = gsap.timeline({
        onComplete: () => {
            document.getElementById('loader-overlay').style.display = 'none';
            document.body.style.overflow = '';
            lenis.start(); // Resume scrolling
        }
    });

    tl.to('.loader-logo', { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' })
        .to('.loader-bar', { opacity: 1, duration: 0.5 }, "-=0.4")
        .to('.loader-info', { opacity: 1, duration: 0.5 }, "-=0.5");

    // Status updates
    const statuses = ["Bypassing firewall...", "Loading modules...", "Decrypting data...", "Access granted."];
    let statusIdx = 0;
    const statusInterval = setInterval(() => {
        if (statusIdx < statuses.length) {
            document.getElementById('loader-status').innerText = statuses[statusIdx];
            statusIdx++;
        }
    }, 550);

    const progress = { val: 0 };
    tl.to(progress, {
        val: 100,
        duration: 2.2,
        ease: 'power2.inOut',
        onUpdate: () => {
            document.getElementById('loader-progress').style.width = progress.val + '%';
            document.getElementById('loader-text').innerText = Math.round(progress.val) + '%';
        }
    });

    gsap.set('.hero-name', { opacity: 0 }); // Hide initially for Shery text animate

    tl.to('.loader-content', { opacity: 0, y: -40, duration: 0.6, ease: 'power2.in', onStart: () => clearInterval(statusInterval) })
        .to('.shutter', {
            yPercent: -100,
            duration: 0.8,
            stagger: 0.1,
            ease: 'power4.inOut'
        })
        .to('.loader-overlay', { display: 'none', duration: 0 })
        .from('nav', { y: -20, opacity: 0, duration: 0.8, ease: 'power3.out' }, "-=0.4")
        .set('.hero-name', { opacity: 1 }, "-=0.6")
        .add(() => {
            Shery.textAnimate(".hero-name", {
                style: 2,
                y: 10,
                delay: 0.1,
                duration: 1,
                ease: "cubic-bezier(0.23, 1, 0.320, 1)",
                multiplier: 0.1,
            });
        }, "-=0.6")
        .from('.hero-tag, .hero-sub, .hero-scroll', { y: 20, opacity: 0, duration: 0.8, stagger: 0.15, ease: 'power3.out' }, "-=0.8")
        .from('.hero-visual', { x: 40, opacity: 0, duration: 1, ease: 'power3.out' }, "-=0.6")
        .add(() => {
            // Continuous floating animations for hero elements with GPU layer acceleration to prevent subpixel text jitter
            gsap.to(".hero-tag", { y: -8, rotation: 0.01, force3D: true, duration: 2.5, repeat: -1, yoyo: true, ease: "sine.inOut" });
            gsap.to(".hero-sub", { y: -8, rotation: 0.01, force3D: true, duration: 2.8, repeat: -1, yoyo: true, ease: "sine.inOut", delay: 0.2 });
            gsap.to(".hero-scroll", { y: 8, rotation: 0.01, force3D: true, duration: 1.5, repeat: -1, yoyo: true, ease: "sine.inOut" });
            gsap.to(".hero-visual", { y: -12, rotation: 0.01, force3D: true, duration: 3, repeat: -1, yoyo: true, ease: "sine.inOut", delay: 0.4 });

            // Refresh ScrollTrigger to calculate initial positions after content and styling have settled
            ScrollTrigger.refresh();
        });
});

// ============================================================
// SCROLL REVEAL
// ============================================================
function initReveal() {
    const els = document.querySelectorAll('.reveal');
    const obs = new IntersectionObserver(entries => {
        entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); });
    }, { threshold: 0.08 });
    els.forEach(el => { el.classList.remove('visible'); obs.observe(el); });
}
initReveal();
// ============================================================
// TECH MARQUEE ANIMATION
// ============================================================
const marqueeIconsList = [
    'ph-hexagon', 'ph-atom', 'ph-file-code', 'ph-flask', 'ph-leaf',
    'ph-git-branch', 'ph-linux-logo', 'ph-terminal', 'ph-shield', 'ph-code',
    'ph-database', 'ph-globe', 'ph-lock-key', 'ph-cpu', 'ph-share-network'
];

const marqueeTracks = document.querySelectorAll('.tech-marquee-track');

if (marqueeTracks.length > 0) {
    marqueeTracks.forEach(track => {
        for (let i = 0; i < 4; i++) {
            marqueeIconsList.forEach(icon => {
                const item = document.createElement('div');
                item.className = 'marquee-item';
                item.innerHTML = `<div class="marquee-item-inner"><i class="ph ${icon}"></i></div>`;
                track.appendChild(item);
            });
        }
    });

    const allTracks = Array.from(marqueeTracks);
    const mItems = document.querySelectorAll('.marquee-item');
    const singleSetWidth = marqueeIconsList.length * (72 + 32);

    let mTime = 0;
    let mScrollVel = 0;
    let mLastScrollY = window.scrollY;
    let mCurrentX = 0;

    function renderMarquee() {
        let currentScrollY = window.scrollY;
        let delta = currentScrollY - mLastScrollY;
        mLastScrollY = currentScrollY;

        mScrollVel += delta;
        mScrollVel *= 0.9;

        mCurrentX -= (1.5 + mScrollVel * 0.08);

        if (mCurrentX <= -singleSetWidth) {
            mCurrentX += singleSetWidth;
        } else if (mCurrentX > 0) {
            mCurrentX -= singleSetWidth;
        }

        allTracks.forEach(track => {
            track.style.transform = `translateX(${mCurrentX}px)`;
        });

        mTime += 0.05;

        mItems.forEach((item, index) => {
            const y = Math.sin(mTime + index * 0.4) * 12;
            item.style.transform = `translateY(${y}px)`;
        });

        requestAnimationFrame(renderMarquee);
    }

    requestAnimationFrame(renderMarquee);
}
