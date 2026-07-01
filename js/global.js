// ============================================================
// GLOBAL SHARED LOGIC
// ============================================================

document.addEventListener("DOMContentLoaded", () => {
    
    // 1. SMOOTH SCROLLING (LENIS)
    // Export globally so other scripts can pause/resume
    if (typeof Lenis !== 'undefined') {
        window.lenis = new Lenis({
            duration: 1.2,
            easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
            smooth: true
        });

        function raf(time) {
            window.lenis.raf(time);
            requestAnimationFrame(raf);
        }
        requestAnimationFrame(raf);
    }

    // 2. 3D FLIP TEXT HOVER ANIMATION
    function initFlipText(selector) {
        // Skip on mobile to prevent overlay issues
        if (window.innerWidth <= 768) return;
        
        const elements = document.querySelectorAll(selector);
    
        elements.forEach(link => {
            if (link.querySelector('.flip-wrapper')) return; // Already initialized
    
            const text = link.textContent.trim();
            link.textContent = "";
    
            const wrapper = document.createElement("span");
            wrapper.className = "flip-wrapper";
            wrapper.style.position = "relative";
            wrapper.style.display = "inline-block";
            wrapper.style.overflow = "hidden";
            wrapper.style.perspective = "500px";
            wrapper.style.verticalAlign = "middle";
    
            const front = document.createElement("span");
            front.textContent = text;
            front.style.display = "inline-block";
            front.style.transformOrigin = "50% 50% -10px";
    
            const back = document.createElement("span");
            back.textContent = text;
            back.style.position = "absolute";
            back.style.left = "0";
            back.style.top = "0";
            back.style.display = "inline-block";
            back.style.color = "#ff5500";
            back.style.transformOrigin = "50% 50% -10px";
    
            if (typeof gsap !== 'undefined') {
                gsap.set(back, { rotationX: -90, opacity: 0 });
    
                let tl = gsap.timeline({ paused: true });
                tl.to(front, {
                    rotationX: 90,
                    opacity: 0,
                    duration: 0.35,
                    ease: "power2.inOut"
                }, 0)
                    .to(back, {
                        rotationX: 0,
                        opacity: 1,
                        duration: 0.35,
                        ease: "power2.inOut"
                    }, 0.08); // Slight delay for the sequential feel
    
                link.addEventListener("mouseenter", () => tl.play());
                link.addEventListener("mouseleave", () => tl.reverse());
            }
    
            wrapper.appendChild(front);
            wrapper.appendChild(back);
            link.appendChild(wrapper);
        });
    }

    // Apply to navbar on load
    initFlipText(".nav-right a:not(.nav-logo), .mode-toggle");


    // 3. CYBER MODE TOGGLE LOGIC
    // Moved here to allow global state toggling across all pages
    window.isCyber = sessionStorage.getItem('cyberModeActive') === 'true';
    
    // Apply initial state if already true
    if(window.isCyber) {
        document.body.classList.add('cyber-mode');
        const webdevContent = document.getElementById('webdev-content');
        const cyberContent = document.getElementById('cyber-content');
        const btn = document.getElementById('modeToggle');
        const footerMode = document.getElementById('footer-mode');
        
        if(webdevContent) webdevContent.style.display = 'none';
        if(cyberContent) cyberContent.style.display = 'block';
        if(btn) btn.textContent = '◈ Dev Mode';
        if(footerMode) footerMode.textContent = 'Cyber Mode';
    }

    let overlay = document.getElementById('mode-overlay');
    if (!overlay) {
        overlay = document.createElement('div');
        overlay.id = 'mode-overlay';
        overlay.style.position = 'fixed';
        overlay.style.top = '0';
        overlay.style.left = '0';
        overlay.style.width = '100%';
        overlay.style.height = '100%';
        overlay.style.pointerEvents = 'none';
        overlay.style.zIndex = '9999';
        overlay.style.opacity = '0';
        document.body.appendChild(overlay);
    }

    const modeToggles = document.querySelectorAll('.mode-toggle, #modeToggle');
    
    modeToggles.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            // Subtle text glitch effect
            document.body.classList.add('mode-transitioning');
        
            overlay.style.background = window.isCyber ? '#ff5500' : '#00ff41';
        
            // Smooth transition overlay
            if (typeof gsap !== 'undefined') {
                gsap.to(overlay, {
                    opacity: 1,
                    duration: 0.25,
                    ease: 'power2.in',
                    onComplete: toggleTheme
                });
            } else {
                toggleTheme();
            }
        });
    });

    function toggleTheme() {
        window.isCyber = !window.isCyber;
        sessionStorage.setItem('cyberModeActive', window.isCyber);

        const btn = document.getElementById('modeToggle');
        const webdevContent = document.getElementById('webdev-content');
        const cyberContent = document.getElementById('cyber-content');
        const footerMode = document.getElementById('footer-mode');

        if (window.isCyber) {
            document.body.classList.add('cyber-mode');
            if(webdevContent) webdevContent.style.display = 'none';
            if(cyberContent) cyberContent.style.display = 'block';
            if(btn) btn.textContent = '◈ Dev Mode';
            if(footerMode) footerMode.textContent = 'Cyber Mode';
        } else {
            document.body.classList.remove('cyber-mode');
            if(webdevContent) webdevContent.style.display = 'block';
            if(cyberContent) cyberContent.style.display = 'none';
            if(btn) btn.textContent = '⚡ Cyber Mode';
            if(footerMode) footerMode.textContent = 'Web Dev Mode';
        }

        window.scrollTo(0, 0);
        
        // Re-initialize specific layout functions if they exist in global scope
        if(typeof window.initReveal === 'function') window.initReveal();
        if(typeof window.initTiltEffect === 'function') window.initTiltEffect();
        if(typeof window.initScrollCardsAnimation === 'function') window.initScrollCardsAnimation();
        if(typeof window.initTimelineAnimation === 'function') window.initTimelineAnimation();
        if(typeof window.initScrollLineAnimation === 'function') window.initScrollLineAnimation();
        if(typeof window.initProject3DScenes === 'function') setTimeout(window.initProject3DScenes, 100);
        if(typeof window.particleSetMode === 'function') window.particleSetMode(window.isCyber ? 'cyber' : 'dev');

        // Recalculate ScrollTrigger positions after layout toggle
        if (typeof ScrollTrigger !== 'undefined') {
            ScrollTrigger.refresh();
        }

        if (typeof gsap !== 'undefined') {
            gsap.to(overlay, { opacity: 0, duration: 0.35, delay: 0.05, ease: 'power2.out' });
        } else {
            overlay.style.opacity = '0';
        }

        setTimeout(() => {
            document.body.classList.remove('mode-transitioning');
        }, 100);
    }
});
