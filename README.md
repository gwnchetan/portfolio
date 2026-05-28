# Chetan — Interactive Dual-Mode Portfolio

An immersive, high-performance personal portfolio built with Vanilla JavaScript, WebGL (Three.js), and GSAP. Designed to showcase two distinct facets of my professional identity: **Full Stack Web Development** and **Cybersecurity Research**.

## 🌟 Features

- **Dual-Mode Architecture:** Seamlessly toggle between two entirely distinct themes:
  - **Web Dev Mode (Light):** A premium, clean, glassmorphism-inspired aesthetic focusing on full-stack development.
  - **Cyber Mode (Dark):** A terminal-inspired, neon-glowing aesthetic tailored for security research and offensive tooling.
- **Advanced WebGL Background:** A custom-built, physics-based GPGPU particle system using Three.js and custom shaders. The simulation reacts to mouse movement (smear/trail effects) and transitions colors dynamically based on the active mode.
- **Infinite Tech Marquee:** A continuous, wave-animated marquee component displaying the tech stack using Phosphor Icons, featuring glassmorphism and interactive hover states.
- **Smooth & Scroll-Linked Animations:** Powered by **Lenis** for buttery-smooth scrolling and **GSAP ScrollTrigger** for 3D card flipping, parallax elements, and reveal animations.
- **Premium Micro-Interactions:** Magnetic cursor effects, text scrambling, and fluid page transitions powered by **Shery.js**.
- **Fully Modular:** Clean, organized file structure separating HTML, CSS, and modular JavaScript components.

## 🛠️ Technology Stack

- **Core:** HTML5, Vanilla CSS3, Vanilla JavaScript (ES6+)
- **3D & Graphics:** [Three.js](https://threejs.org/) (r128)
- **Animations:** [GSAP](https://greensock.com/gsap/) (v3) + ScrollTrigger
- **Scroll:** [Lenis](https://lenis.studiofreight.com/)
- **Interactions:** [Shery.js](https://sheryjs.com/)
- **Icons:** [Phosphor Icons](https://phosphoricons.com/)

## 📁 Folder Structure

```text
portpholio/mywebsite/
├── index.html        # Main entry point (markup & asset links)
├── css/
│   └── style.css     # Complete styling (Light/Dark themes, components)
└── js/
    ├── main.js       # Core logic (GSAP, Lenis, UI Interactions, Mode Toggling)
    └── particles.js  # Three.js WebGL background simulation
```

## 🚀 Getting Started

Since this project relies on ES6 modules and WebGL, it should be run through a local web server (to avoid CORS issues with local files).

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/portfolio.git
   cd portfolio/mywebsite
   ```

2. Start a local server:
   - Using Python: `python -m http.server 8000`
   - Using Node.js: `npx serve`
   - Or use the **Live Server** extension in VS Code.

3. Open your browser and navigate to `http://localhost:8000`

## 🎨 Design Philosophy

This portfolio breaks away from standard templates by providing a cinematic user experience. The bifurcation of the UI ensures that visitors looking for a web developer see an aesthetic suited to modern web standards, while those looking for a security professional see an environment that reflects terminal interfaces and hacker culture—all without needing to load a separate page.

## 📄 License

This project is open-source and available under the [MIT License](LICENSE).

---
*Built by [Chetan]*
# portfolio
