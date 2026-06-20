// ============================================================
// DYNAMIC PROJECT PAGE LOGIC
// ============================================================

document.addEventListener('DOMContentLoaded', () => {
    // 1. Get Project ID from URL
    const urlParams = new URLSearchParams(window.location.search);
    const projectId = urlParams.get('id');

    // 2. Find Project in Data
    const project = typeof projectsData !== 'undefined' ? projectsData[projectId] : null;

    if (!project) {
        window.location.href = 'index.html#projects';
        return;
    }

    // 3. Hydrate DOM with Project Data
    document.title = `${project.name} — Project Details`;
    
    document.getElementById('proj-name').innerText = project.name;
    document.getElementById('proj-tag').innerText = `/${project.tag.toLowerCase()}`;
    document.getElementById('proj-desc').innerText = project.desc;
    document.getElementById('proj-details').innerText = project.details;
    document.getElementById('proj-role').innerText = project.role;

    // Apply Cyber Mode styling if it's a cyber project
    if (project.type === 'cy') {
        document.body.classList.add('cyber-mode');
        document.documentElement.style.setProperty('--primary-color', '#00ff41'); // Using cyber green
        document.documentElement.style.setProperty('--bg-color', '#050505');
        document.documentElement.style.setProperty('--text-color', '#e0e0e0');
        if (typeof window.particleSetMode === 'function') {
            window.particleSetMode('cyber');
        }
    } else {
        if (typeof window.particleSetMode === 'function') {
            window.particleSetMode('dev');
        }
    }

    // Links
    const liveLink = document.getElementById('proj-live');
    if (project.live && project.live !== '#') {
        liveLink.href = project.live;
        liveLink.style.display = 'inline-flex';
    }

    const githubLink = document.getElementById('proj-github');
    if (project.github && project.github !== '#') {
        githubLink.href = project.github;
        githubLink.style.display = 'inline-flex';
    }

    // Tech Stack
    const stackContainer = document.getElementById('proj-stack');
    stackContainer.innerHTML = project.stack.map((s, i) => 
        `<span class="stack-tag ${i % 2 === 0 ? 'active' : ''}">${s}</span>`
    ).join('');

    // Features
    const featuresContainer = document.getElementById('proj-features');
    if (project.features && project.features.length > 0) {
        featuresContainer.innerHTML = project.features.map(f => `<li>${f}</li>`).join('');
    }

    // Logo
    const logoImg = document.getElementById('proj-logo');
    const logoContainer = document.querySelector('.hero-logo-container');
    const projNameText = document.getElementById('proj-name');
    
    if (project.logo) {
        logoImg.src = project.logo;
        logoContainer.style.display = 'block';
    } else {
        logoContainer.style.display = 'none';
    }

    // Media (Video & Screenshots)
    const gallerySection = document.getElementById('gallery-section');
    let hasMedia = false;

    if (project.videoDemo) {
        const videoContainer = document.getElementById('proj-video-container');
        const videoEl = document.getElementById('proj-video');
        videoEl.src = project.videoDemo;
        videoContainer.style.display = 'block';
        hasMedia = true;
    }

    if (project.screenshots && project.screenshots.length > 0) {
        const screenshotsContainer = document.getElementById('proj-screenshots');
        // Filter out placeholder text if it's not a real image, but for now we'll just render them
        screenshotsContainer.innerHTML = project.screenshots.map(src => 
            `<div class="screenshot-wrapper" style="border-radius: 12px; overflow: hidden; border: 1px solid rgba(255,255,255,0.1); height: 60vh; flex-shrink: 0; box-shadow: 0 10px 30px rgba(0,0,0,0.5); transform-origin: center center;">
                <img src="${src}" alt="${project.name} screenshot" style="height: 100%; width: auto; display: block; object-fit: contain; background: #0a0a0a;">
            </div>`
        ).join('');
        hasMedia = true;
    }

    if (hasMedia) {
        gallerySection.style.display = 'block';
    }

    // 4. Trigger Animations
    initProjectAnimations();
});

function initProjectAnimations() {
    // Hide Loader
    const tlLoader = gsap.timeline();
    tlLoader.to('.loader-logo', { opacity: 0, duration: 0.5 })
        .to('.shutter', {
            yPercent: -100,
            duration: 0.8,
            stagger: 0.1,
            ease: 'power4.inOut'
        })
        .to('.loader-overlay', { display: 'none', duration: 0 })
        .to('#project-content', { opacity: 1, duration: 0.5 }, "-=0.2");

    // Shery text animation for main title and description
    setTimeout(() => {
        if(typeof Shery !== 'undefined') {
            Shery.textAnimate("#proj-name", {
                style: 2,
                y: 10,
                delay: 0.1,
                duration: 0.8,
                ease: "cubic-bezier(0.23, 1, 0.320, 1)",
                multiplier: 0.1,
            });
            // Try to animate logo if exists
            const logo = document.getElementById('proj-logo');
            if(logo && logo.src) {
                gsap.fromTo(logo, 
                    { opacity: 0, y: 50, scale: 0.8 },
                    { opacity: 1, y: 0, scale: 1, duration: 1.5, ease: "elastic.out(1, 0.5)", delay: 0.5 }
                );
                
                // Continuous floating animation
                gsap.to(logo, {
                    y: "-=15",
                    rotation: 2,
                    duration: 3,
                    repeat: -1,
                    yoyo: true,
                    ease: "sine.inOut",
                    delay: 2
                });
            }
        }
    }, 200);

    // Magnetic Buttons
    const magnets = document.querySelectorAll('.magnetic-btn');
    magnets.forEach(btn => {
        btn.addEventListener('mousemove', (e) => {
            const rect = btn.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;
            gsap.to(btn, { x: x * 0.4, y: y * 0.4, duration: 0.3, ease: 'power2.out' });
        });
        btn.addEventListener('mouseleave', () => {
            gsap.to(btn, { x: 0, y: 0, duration: 0.5, ease: 'elastic.out(1, 0.3)' });
        });
    });

    // GSAP Scroll Reveals
    gsap.registerPlugin(ScrollTrigger);
    
    const reveals = document.querySelectorAll('.reveal');
    reveals.forEach(el => {
        gsap.fromTo(el, 
            { opacity: 0, y: 30 },
            { 
                opacity: 1, 
                y: 0, 
                duration: 0.5, 
                ease: "power3.out",
                scrollTrigger: {
                    trigger: el,
                    start: "top 95%",
                    toggleActions: "play none none reverse"
                }
            }
        );
    });

    // Animate stack tags staggering
    gsap.fromTo(".stack-tag", 
        { opacity: 0, scale: 0.8 },
        {
            opacity: 1,
            scale: 1,
            duration: 0.4,
            stagger: 0.05,
            ease: "back.out(1.7)",
            scrollTrigger: {
                trigger: "#proj-stack",
                start: "top 95%"
            }
        }
    );

    // Animate features list
    gsap.fromTo("#proj-features li", 
        { opacity: 0, x: -20 },
        {
            opacity: 1,
            x: 0,
            duration: 0.4,
            stagger: 0.05,
            ease: "power2.out",
            scrollTrigger: {
                trigger: "#proj-features",
                start: "top 95%"
            }
        }
    );

    // Refresh ScrollTrigger to catch any missed layout recalculations
    setTimeout(() => {
        ScrollTrigger.refresh();
    }, 500);

    // Horizontal scroll for gallery with Zoom Effect
    const pinContainer = document.getElementById('gallery-pin-container');
    const scrollContainer = document.getElementById('proj-screenshots');

    if (pinContainer && scrollContainer && scrollContainer.children.length > 0) {
        setTimeout(() => {
            const isMobile = window.innerWidth <= 1024 || /Android|webOS|iPhone|iPad|iPod/i.test(navigator.userAgent);
            const images = gsap.utils.toArray('.screenshot-wrapper');

            if (isMobile) {
                // On Mobile: Disable GSAP pinning, use native scrolling and an auto-scroll slideshow
                gsap.set(images, { clearProps: "all" });
                gsap.set(scrollContainer, { clearProps: "all" });
                gsap.set(pinContainer, { clearProps: "all" });

                const wrapper = document.querySelector('.horizontal-scroll-wrapper');
                let currentIndex = 0;
                let autoScrollInterval;
                let interactionTimeout;

                const startAutoScroll = () => {
                    clearInterval(autoScrollInterval);
                    autoScrollInterval = setInterval(() => {
                        currentIndex++;
                        if (currentIndex >= images.length) currentIndex = 0;
                        
                        // Calculate the target scroll position to center the image
                        const targetLeft = images[currentIndex].offsetLeft - wrapper.offsetLeft - (wrapper.clientWidth - images[currentIndex].clientWidth) / 2;
                        wrapper.scrollTo({ left: targetLeft, behavior: 'smooth' });
                    }, 2000);
                };

                const pauseAutoScroll = () => {
                    clearInterval(autoScrollInterval);
                    clearTimeout(interactionTimeout);
                    interactionTimeout = setTimeout(() => {
                        // Resync currentIndex with the image closest to the center
                        let minDiff = Infinity;
                        images.forEach((img, idx) => {
                            const rect = img.getBoundingClientRect();
                            const center = rect.left + rect.width / 2;
                            const diff = Math.abs(center - window.innerWidth / 2);
                            if (diff < minDiff) {
                                minDiff = diff;
                                currentIndex = idx;
                            }
                        });
                        startAutoScroll();
                    }, 3000); // Wait 3 seconds after interaction before resuming auto-scroll
                };

                startAutoScroll();

                wrapper.addEventListener('touchstart', pauseAutoScroll, { passive: true });
                wrapper.addEventListener('touchmove', pauseAutoScroll, { passive: true });
                wrapper.addEventListener('scroll', pauseAutoScroll, { passive: true });

            } else {
                // On Desktop: Keep the GSAP ScrollTrigger pinning and zoom effects
                let getScrollAmount = () => -(scrollContainer.scrollWidth - window.innerWidth);

                if (scrollContainer.scrollWidth > window.innerWidth) {
                    let scrollTween = gsap.to(scrollContainer, {
                        x: getScrollAmount,
                        ease: "none",
                        scrollTrigger: {
                            trigger: pinContainer,
                            start: "top top",
                            end: () => `+=${scrollContainer.scrollWidth}`,
                            pin: true,
                            scrub: 1,
                            invalidateOnRefresh: true,
                        }
                    });

                    images.forEach((img) => {
                        gsap.set(img, { scale: 0.8, opacity: 0.3 });
                        
                        const tl = gsap.timeline({
                            scrollTrigger: {
                                trigger: img,
                                containerAnimation: scrollTween,
                                start: "left right",
                                end: "right left",
                                scrub: true,
                            }
                        });
                        
                        tl.to(img, { scale: 1.1, opacity: 1, ease: "power1.inOut", duration: 1 })
                          .to(img, { scale: 0.8, opacity: 0.3, ease: "power1.inOut", duration: 1 });
                    });
                }
            }
        }, 100);
    }
}
