document.addEventListener("DOMContentLoaded", () => {
    // Basic GSAP timeline for entry animations
    const tl = gsap.timeline();

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
        });

        // Reset positions on mouse leave
        hero.addEventListener("mouseleave", () => {
            gsap.to([edTextBack, edTextFront, image], {
                x: 0,
                y: 0,
                duration: 1,
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
    // PARALLAX BACKGROUND OBJECTS
    // ============================================================
    const bgObjects = document.querySelectorAll('.bg-object');
    bgObjects.forEach(obj => {
        const speed = parseFloat(obj.getAttribute('data-speed')) || 0.5;
        gsap.to(obj, {
            y: () => (window.innerHeight * speed),
            ease: "none",
            scrollTrigger: {
                trigger: obj.parentElement,
                start: "top bottom",
                end: "bottom top",
                scrub: true
            }
        });
    });
});
