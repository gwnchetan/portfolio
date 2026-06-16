document.addEventListener("DOMContentLoaded", () => {
    // Basic GSAP timeline for entry animations
    // Added a slight delay so the browser can finish painting and loading fonts/particles
    const tl = gsap.timeline({ delay: 0.4 });

    // 1. Image fade and slide up
    tl.fromTo(".hero-image",
        { y: 100, opacity: 0, scale: 0.95 },
        { y: 0, opacity: 1, scale: 1, duration: 1.5, ease: "power3.out" }
    )

        // 2. Text slide up reveal (staggered)
        .fromTo(".ed-inner",
            { y: "150%", opacity: 0 },
            { y: "0%", opacity: 1, duration: 1.2, stagger: 0.15, ease: "power4.out" },
            "-=1.0" // overlap with image animation
        )
        // 3. Corner text fade in
        .fromTo(".corner-text",
            { opacity: 0, y: 20 },
            { opacity: 1, y: 0, duration: 1, stagger: 0.1, ease: "power3.out" },
            "-=0.5"
        );

    // Optional: Mouse move parallax effect
    const hero = document.getElementById("hero");
    const edTextBack = document.getElementById("ed-text-back");
    const edTextFront = document.getElementById("ed-text-front");
    const image = document.querySelector(".hero-image");

    if (hero && edTextBack && edTextFront && image) {
        hero.addEventListener("mousemove", (e) => {
            const xPos = (e.clientX / window.innerWidth - 0.5) * 30; // Amount of movement
            const yPos = (e.clientY / window.innerHeight - 0.5) * 30;

            // Move text opposite to mouse
            gsap.to([edTextBack, edTextFront], {
                x: xPos * -1,
                y: yPos * -1,
                duration: 1,
                ease: "power2.out"
            });

            // Move image with mouse slightly
            gsap.to(image, {
                x: xPos * 0.5,
                y: yPos * 0.5,
                duration: 1,
                ease: "power2.out"
            });

            // Move background circles to create depth parallax
            gsap.to(".circle-1", { x: xPos * -1.5, y: yPos * -1.5, duration: 1, ease: "power2.out" });
            gsap.to(".circle-2", { x: xPos * -2.5, y: yPos * -2.5, duration: 1, ease: "power2.out" });
        });

        hero.addEventListener("mouseleave", () => {
            gsap.to([edTextBack, edTextFront, image], {
                x: 0,
                y: 0,
                duration: 1,
                ease: "power2.out"
            });
            gsap.to([".circle-1", ".circle-2"], {
                x: 0,
                y: 0,
                duration: 1,
                ease: "power2.out"
            });
        });
    }

    // ============================================================
    // BACKGROUND CIRCLES ANIMATION
    // ============================================================
    // Center the circles using GSAP to ensure smooth rotation
    gsap.set(".bg-circle", { xPercent: -50, yPercent: -50 });

    // Defer the infinite rotation until the main hero timeline is almost done
    // This prevents lag during the initial load
    tl.add(() => {
        gsap.to(".circle-1", {
            rotation: 360,
            duration: 18, 
            repeat: -1,
            ease: "none"
        });

        gsap.to(".circle-2", {
            rotation: -360,
            duration: 10, 
            repeat: -1,
            ease: "none"
        });
    }, "-=0.5");

    // Hover scale effect when mousing near the center
    const heroSection = document.querySelector('.editorial-hero');
    if (heroSection) {
        heroSection.addEventListener('mouseenter', () => {
            gsap.to([".circle-1", ".circle-2"], {
                scale: 1.05,
                duration: 0.6,
                ease: "power2.out"
            });
        });

        heroSection.addEventListener('mouseleave', () => {
            gsap.to([".circle-1", ".circle-2"], {
                scale: 1,
                duration: 0.6,
                ease: "power2.out"
            });
        });
    }

    // ============================================================
    // SMOOTH SCROLLING (LENIS)
    // ============================================================
    const lenis = new Lenis({
        duration: 1.2,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        smooth: true
    });

    function raf(time) {
        lenis.raf(time);
        requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    // ============================================================
    // NAVBAR COLOR TOGGLE
    // ============================================================
    const mainNav = document.getElementById("main-nav");
    if (mainNav) {
        ScrollTrigger.create({
            trigger: "#story-container",
            start: "top 80px", // When the top of the dark section hits the navbar area
            onEnter: () => mainNav.classList.remove("nav-orange"),
            onLeaveBack: () => mainNav.classList.add("nav-orange")
        });
    }


    // ============================================================
    // STORY SECTIONS GSAP SCROLLTRIGGER
    // ============================================================
    gsap.registerPlugin(ScrollTrigger);

    const revealElements = document.querySelectorAll('.reveal-text');

    revealElements.forEach(el => {
        gsap.to(el, {
            y: 0,
            opacity: 1,
            duration: 1.2,
            ease: "power3.out",
            scrollTrigger: {
                trigger: el,
                start: "top 85%", // Trigger when the top of the element hits 85% of the viewport height
                toggleActions: "play none none reverse" // Play on scroll down, reverse on scroll up
            }
        });
    });

    // ============================================================
    // NEW ABOUT SECTIONS ANIMATIONS
    // ============================================================

    // 0. GSAP Hero Text Reveal (Word by Word 3D Reveal)
    const gsapHeroTexts = document.querySelectorAll('.gsap-hero-text');
    
    gsapHeroTexts.forEach(text => {
        // Safe word splitter that preserves HTML tags like highlights
        const walkDOM = (node) => {
            if (node.nodeType === 3) { // Text node
                const words = node.nodeValue.split(/(\s+)/);
                const fragment = document.createDocumentFragment();
                let hasWords = false;
                
                words.forEach(word => {
                    if (word.trim().length > 0) {
                        const span = document.createElement('span');
                        span.className = 'gsap-word';
                        span.style.display = 'inline-block';
                        span.textContent = word;
                        fragment.appendChild(span);
                        hasWords = true;
                    } else {
                        fragment.appendChild(document.createTextNode(word));
                    }
                });
                
                if (hasWords) {
                    node.parentNode.replaceChild(fragment, node);
                }
            } else if (node.nodeType === 1) { // Element node
                if (!node.classList.contains('gsap-word')) {
                    Array.from(node.childNodes).forEach(walkDOM);
                }
            }
        };
        
        // Clone the text content, split it, and replace
        Array.from(text.childNodes).forEach(walkDOM);
    });

    // Animate all words sequentially across all paragraphs with a performant y-axis and opacity fade
    const allStoryWords = document.querySelectorAll('.gsap-story-container .gsap-word');
    if (allStoryWords.length > 0) {
        gsap.fromTo(allStoryWords, 
            { 
                opacity: 0, 
                y: 15
            },
            {
                opacity: 1,
                y: 0,
                duration: 0.6,
                stagger: 0.015, // Fast sequential wave
                ease: "power2.out",
                scrollTrigger: {
                    trigger: '.gsap-story-container',
                    start: "top 75%",
                    toggleActions: "play none none reverse"
                }
            }
        );
    }

    // 0.5. Scroll-linked Card Expansion
    const storySection = document.querySelector('.gsap-story-section');
    const storyCard = document.querySelector('.gsap-story-container');

    if (storySection && storyCard) {
        // Use scale for smooth hardware-accelerated zoom without text reflow
        gsap.set(storyCard, { scale: 0.8 });

        gsap.to(storyCard, {
            scale: 1,
            ease: "none",
            scrollTrigger: {
                trigger: storySection,
                start: "top bottom", // Start expanding when section enters from bottom
                end: "top top",      // Fully expanded when section hits top of viewport
                scrub: true
            }
        });
    }

    // 1. General Staggered Reveal for Grid Items
    const gsRevealElements = document.querySelectorAll('.gs-reveal');
    gsRevealElements.forEach(el => {
        gsap.fromTo(el, 
            { y: 50, opacity: 0 },
            {
                y: 0,
                opacity: 1,
                duration: 1,
                ease: "power3.out",
                scrollTrigger: {
                    trigger: el,
                    start: "top 85%",
                    toggleActions: "play none none reverse"
                }
            }
        );
    });

    // 2. Animate Skill Bars
    const skillBars = document.querySelectorAll('.bar-fill');
    skillBars.forEach(bar => {
        const targetWidth = bar.getAttribute('data-width');
        gsap.to(bar, {
            width: targetWidth,
            duration: 1.5,
            ease: "power4.out",
            scrollTrigger: {
                trigger: bar.parentElement,
                start: "top 90%",
                toggleActions: "play none none reverse"
            }
        });
    });


});

// ============================================================
// 3D FLIP TEXT HOVER ANIMATION
// ============================================================
function initFlipText(selector) {
    const elements = document.querySelectorAll(selector);
    
    elements.forEach(link => {
        if(link.querySelector('.flip-wrapper')) return; // Already initialized
        
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
window.addEventListener("DOMContentLoaded", () => {
    initFlipText(".nav-right a:not(.nav-logo), .mode-toggle");
});
