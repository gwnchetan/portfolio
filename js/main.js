// ============================================================
// DATA
// ============================================================
const wdSkills = [
    { name: 'Node.js', icon: 'ph-hexagon' },
    { name: 'Express', icon: 'ph-file-code' },
    { name: 'React', icon: 'ph-atom' },
    { name: 'Python', icon: 'ph-code' },
    { name: 'Flask', icon: 'ph-flask' },
    { name: 'MongoDB', icon: 'ph-database' },
    { name: 'Socket.IO', icon: 'ph-share-network' },
    { name: 'JWT Auth', icon: 'ph-lock-key' },
    { name: 'REST APIs', icon: 'ph-plugs' },
    { name: 'Redux', icon: 'ph-arrows-clockwise' },
    { name: 'Git', icon: 'ph-git-branch' },
    { name: 'Linux', icon: 'ph-linux-logo' }
];

const cySkills = [
    { name: 'Kali Linux', icon: 'ph-linux-logo' },
    { name: 'Burp Suite', icon: 'ph-spider' },
    { name: 'Nmap', icon: 'ph-radar' },
    { name: 'Wireshark', icon: 'ph-waves' },
    { name: 'Web App Sec', icon: 'ph-shield-check' },
    { name: 'OWASP Top 10', icon: 'ph-warning' },
    { name: 'Recon', icon: 'ph-binoculars' },
    { name: 'Python Scripts', icon: 'ph-terminal' },
    { name: 'Networking', icon: 'ph-hard-drives' },
    { name: 'SQLi / XSS', icon: 'ph-code' },
    { name: 'OSINT', icon: 'ph-globe-hemisphere-west' },
    { name: 'Metasploit', icon: 'ph-skull' }
];

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
    const el = document.getElementById(id);
    if (el) {
        el.innerHTML = data.map(s =>
            `<div class="skill-item reveal">
                <i class="ph ${s.icon} skill-icon"></i>
                <span class="skill-name">${s.name}</span>
            </div>`
        ).join('');
    }
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
                            <div class="card-action-btn">
                                <i class="ph ph-arrow-right btn-arrow-left"></i>
                                <span class="btn-text">Know More</span>
                                <i class="ph ph-arrow-right btn-arrow-right"></i>
                            </div>
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

function renderTimelineProjects(data, containerId) {
    const c = document.getElementById(containerId);

    let html = `
    <div class="timeline-container">
        <div class="timeline-line"></div>
        <div class="timeline-indicator"></div>
        <div class="timeline-cards">
    `;

    html += data.map((p, i) => {
        const urlId = p.name.toLowerCase().replace(/\s+/g, '-');
        const side = i % 2 === 0 ? 'left' : 'right';
        const num = (i + 1).toString().padStart(2, '0');

        return `
        <div class="timeline-card-wrapper ${side}">
            <div class="timeline-connector"></div>
            <a href="project.html?id=${urlId}" class="timeline-card">
                <div class="timeline-card-header">
                    <span class="timeline-number">${num}</span>
                    <span class="timeline-arrow">↗</span>
                </div>
                <div class="timeline-canvas-container" id="canvas-${urlId}" data-project="${p.name}">
                </div>
                <div class="timeline-card-body">
                    <h3 class="timeline-name">${p.name}</h3>
                    <p class="timeline-desc">${p.desc}</p>
                    <div class="timeline-stack">
                        ${p.stack.map(s => `<span class="timeline-stack-tag">${s}</span>`).join('')}
                    </div>
                </div>
            </a>
        </div>
        `;
    }).join('');

    html += `
        </div>
    </div>
    `;
    c.innerHTML = html;
}

renderCards(wdProjects, 'wd-projects-grid');
renderCards(cyProjects, 'cy-projects-grid');

// ============================================================
// PROJECT CARD SCROLL ANIMATION (GSAP SCROLLTRIGGER)
// ============================================================
function initScrollCardsAnimation() {
    gsap.registerPlugin(ScrollTrigger);

    ScrollTrigger.getAll().forEach(t => {
        if (t.vars.trigger && (t.vars.trigger.classList.contains('project-card-wrapper') || t.vars.trigger.classList.contains('project-card'))) {
            t.kill();
        }
    });

    const wrappers = document.querySelectorAll('.project-card-wrapper');
    wrappers.forEach(wrapper => {
        gsap.set(wrapper, {
            opacity: 0.3
        });

        gsap.to(wrapper, {
            opacity: 1,
            ease: "none",
            scrollTrigger: {
                trigger: wrapper,
                start: "top 90%",
                end: "top 50%",
                scrub: 1,
                invalidateOnRefresh: true
            }
        });
    });
}
initScrollCardsAnimation();

// ============================================================
// TIMELINE GSAP ANIMATION
// ============================================================
function initTimelineAnimation() {
    gsap.registerPlugin(ScrollTrigger);

    const container = document.querySelector('.timeline-container');
    if (!container) return;

    const indicator = document.querySelector('.timeline-indicator');
    const cards = document.querySelectorAll('.timeline-card-wrapper');

    // Indicator scrolling down the line
    gsap.to(indicator, {
        top: "100%",
        ease: "none",
        scrollTrigger: {
            trigger: container,
            start: "top center",
            end: "bottom center",
            scrub: true
        }
    });

    // Cards sliding in
    cards.forEach(card => {
        const isLeft = card.classList.contains('left');

        gsap.fromTo(card,
            {
                x: isLeft ? -100 : 100,
                opacity: 0
            },
            {
                x: 0,
                opacity: 1,
                duration: 0.8,
                ease: "power3.out",
                scrollTrigger: {
                    trigger: card,
                    start: "top 75%", // Triggers when top of card hits 75% down viewport
                    toggleActions: "play none none reverse"
                }
            }
        );
    });
}

// ============================================================
// THREE.JS TIMELINE CANVASES
// ============================================================
let timelineRenderers = [];

function initProject3DScenes() {
    const containers = document.querySelectorAll('.timeline-canvas-container');
    if (containers.length === 0) return;

    // Clean up old renderers if re-initializing
    timelineRenderers.forEach(r => r.dispose());
    timelineRenderers = [];

    const scenes = [];

    containers.forEach(container => {
        container.innerHTML = ''; // clear

        const width = container.clientWidth || 300;
        const height = container.clientHeight || 200;

        const scene = new THREE.Scene();
        scene.background = new THREE.Color('#111111');

        const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
        camera.position.z = 4;

        const renderer = new THREE.WebGLRenderer({ antialias: true });
        renderer.setSize(width, height);
        renderer.setPixelRatio(window.devicePixelRatio);
        container.appendChild(renderer.domElement);

        const material = new THREE.MeshBasicMaterial({ color: 0xff5500, wireframe: true });
        let geometry;
        const projName = container.getAttribute('data-project');

        if (projName === 'chatterBOX') geometry = new THREE.TorusGeometry(1, 0.4, 16, 32);
        else if (projName === 'Movie Times') geometry = new THREE.SphereGeometry(1.2, 16, 16);
        else if (projName === 'logdrop') geometry = new THREE.BoxGeometry(1.5, 1.5, 1.5);
        else if (projName === 'N.O.V.A.') geometry = new THREE.IcosahedronGeometry(1.2, 0);
        else geometry = new THREE.BoxGeometry(1, 1, 1);

        const mesh = new THREE.Mesh(geometry, material);
        scene.add(mesh);

        scenes.push({ scene, camera, renderer, mesh });
        timelineRenderers.push(renderer);
    });

    function animate() {
        requestAnimationFrame(animate);
        scenes.forEach(({ scene, camera, renderer, mesh }) => {
            mesh.rotation.x += 0.005;
            mesh.rotation.y += 0.01;
            renderer.render(scene, camera);
        });
    }
    animate();
}

// Ensure it initializes when DOM is ready
window.addEventListener('DOMContentLoaded', () => {
    // Other inits might already exist, but we must call ours
    initTimelineAnimation();
    // Delay 3D init slightly to ensure container dimensions are calculated
    setTimeout(initProject3DScenes, 100);
});



// ============================================================
// MODAL (REMOVED: Cards now redirect to project.html)
// ============================================================



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
    const navType = performance.getEntriesByType("navigation")[0]?.type;
    const hasLoaded = sessionStorage.getItem('hasLoaded');

    if (hasLoaded && navType !== 'reload') {
        const loader = document.getElementById('loader-overlay');
        if (loader) loader.style.display = 'none';

        // Immediately reveal nav and hero elements
        gsap.set('nav, .hero-tag, .hero-sub, .hero-scroll, .hero-visual, .hero-eyebrow, .hero-marketing-sub, .typo-line', { opacity: 1, y: 0, x: 0 });
        gsap.set('.hero-name', { opacity: 1 });

        Shery.textAnimate(".hero-name", {
            style: 2,
            y: 10,
            delay: 0.1,
            duration: 1,
            ease: "cubic-bezier(0.23, 1, 0.320, 1)",
            multiplier: 0.1,
        });

        // Start continuous floating animations
        gsap.to(".hero-tag", { y: -8, rotation: 0.01, force3D: true, duration: 2.5, repeat: -1, yoyo: true, ease: "sine.inOut" });
        gsap.to(".hero-sub", { y: -8, rotation: 0.01, force3D: true, duration: 2.8, repeat: -1, yoyo: true, ease: "sine.inOut", delay: 0.2 });
        gsap.to(".hero-scroll", { y: 8, rotation: 0.01, force3D: true, duration: 1.5, repeat: -1, yoyo: true, ease: "sine.inOut" });
        gsap.to(".hero-visual", { y: -12, rotation: 0.01, force3D: true, duration: 3, repeat: -1, yoyo: true, ease: "sine.inOut", delay: 0.4 });

        ScrollTrigger.refresh();
        return;
    }

    sessionStorage.setItem('hasLoaded', 'true');

    document.body.style.overflow = 'hidden';
    if(window.lenis) window.lenis.stop(); // Pause smooth scrolling during load

    // Scramble the logo text
    const logoEl = document.getElementById('loader-logo');
    scrambleText(logoEl, 'CHETAN', 1200);

    const tl = gsap.timeline({
        onComplete: () => {
            const loader = document.getElementById('loader-overlay');
            if (loader) loader.style.display = 'none';
            document.body.style.overflow = '';
            if(window.lenis) window.lenis.start(); // Resume scrolling
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
        .from('.hero-tag, .hero-sub, .hero-scroll, .hero-eyebrow, .hero-marketing-sub', { y: 20, opacity: 0, duration: 0.8, stagger: 0.15, ease: 'power3.out' }, "-=0.8")
        .from('.typo-line', { y: 40, opacity: 0, duration: 1, stagger: 0.1, ease: 'power3.out' }, "-=0.8")
        .from('.hero-visual', { x: 40, opacity: 0, duration: 1, ease: 'power3.out' }, "-=0.6")
        .add(() => {
            // Continuous floating animations for hero elements with GPU layer acceleration to prevent subpixel text jitter
            gsap.to(".hero-tag, .hero-eyebrow", { y: -8, rotation: 0.01, force3D: true, duration: 2.5, repeat: -1, yoyo: true, ease: "sine.inOut" });
            gsap.to(".hero-sub, .hero-marketing-sub", { y: -8, rotation: 0.01, force3D: true, duration: 2.8, repeat: -1, yoyo: true, ease: "sine.inOut", delay: 0.2 });
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

    // Blur Text Scrub Animation for .about-text
    const aboutTexts = document.querySelectorAll('.about-text');
    if (aboutTexts.length > 0 && typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
        gsap.registerPlugin(ScrollTrigger);
        aboutTexts.forEach(text => {
            // Only split text if not already split
            if (!text.classList.contains('split-done')) {
                const walkDOM = (node) => {
                    if (node.nodeType === 3) {
                        const words = node.nodeValue.split(/(\s+)/);
                        const fragment = document.createDocumentFragment();
                        let hasWords = false;
                        words.forEach(word => {
                            if (word.trim().length > 0) {
                                const span = document.createElement('span');
                                span.className = 'scrub-word';
                                span.style.display = 'inline-block';
                                span.textContent = word;
                                fragment.appendChild(span);
                                hasWords = true;
                            } else {
                                fragment.appendChild(document.createTextNode(word));
                            }
                        });
                        if (hasWords) node.parentNode.replaceChild(fragment, node);
                    } else if (node.nodeType === 1 && !node.classList.contains('scrub-word')) {
                        Array.from(node.childNodes).forEach(walkDOM);
                    }
                };
                Array.from(text.childNodes).forEach(walkDOM);
                text.classList.add('split-done');
            }

            const words = text.querySelectorAll('.scrub-word');
            gsap.fromTo(words,
                { opacity: 0.1, filter: "blur(10px)" },
                {
                    opacity: 1,
                    filter: "blur(0px)",
                    duration: 0.8,
                    stagger: 0.02,
                    ease: "power2.out",
                    scrollTrigger: {
                        trigger: text,
                        start: "top 85%",
                        toggleActions: "play none none reverse"
                    }
                }
            );
        });
    }
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

        let baseSpeed = window.innerWidth <= 768 ? 0.6 : 1.5;
        mCurrentX -= (baseSpeed + mScrollVel * 0.08);

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
