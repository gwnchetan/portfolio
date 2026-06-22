const footerHTML = `
    <!-- Global Premium Footer -->
    <footer class="premium-footer" id="contact">
        <div class="footer-container">

            <!-- Top Section: 3 Columns -->
            <div class="footer-grid-top">
                <div class="footer-col left-col">
                    <span class="footer-small-label">Contact</span>
                    <a href="mailto:csakre634@gmail.com" class="footer-bold-link">csakre634@gmail.com</a>
                    <a href="tel:+919537746770" class="footer-bold-link">+91 95377 46770</a>
                </div>

                <div class="footer-col center-col">
                    <h3 class="footer-collab-text">Got a project? Want to collaborate?</h3>
                    <div style="display: flex; gap: 15px; justify-content: center; flex-wrap: wrap;">
                        <a href="mailto:csakre634@gmail.com" class="discuss-btn">
                            Discuss your project <i class="ph-fill ph-caret-right"></i>
                        </a>
                        <a href="doc/Resume.pdf" download="Chetan_Resume.pdf" class="discuss-btn" style="background: transparent; border: 1px solid rgba(255,255,255,0.3); color: #fff;">
                            Resume <i class="ph ph-download-simple"></i>
                        </a>
                    </div>
                </div>

                <div class="footer-col right-col">
                    <span class="footer-small-label">Location</span>
                    <p class="footer-bold-text">Remote / India<br>Available Worldwide</p>

                    <span class="footer-small-label" style="margin-top: 20px;">Current Status</span>
                    <p class="footer-bold-text">Accepting new projects</p>
                </div>
            </div>

            <!-- Middle Section: Massive Text -->
            <div class="footer-grid-bot">
                <h1 class="footer-massive-text">LET'S WORK TOGETHER</h1>
            </div>

            <!-- Bottom Section: Links and Copyright -->
            <div class="footer-grid-mid">
                <span class="footer-copy">© Copyright 2026. Chetan. All rights reserved.</span>
                <span id="footer-mode" class="footer-terms mode-indicator">Web Dev Mode</span>
                <div class="footer-social-icons">
                    <a href="https://github.com/gwnchetan" target="_blank"><i class="ph ph-github-logo"></i></a>
                    <a href="https://www.linkedin.com/in/chandrbhan-sakre-76a40b237/" target="_blank"><i class="ph ph-linkedin-logo"></i></a>
                    <a href="https://www.instagram.com/__chetan_sakre__?igsh=MXZsMThnbTJ2M2lteg==" target="_blank"><i class="ph ph-instagram-logo"></i></a>
                </div>
            </div>

        </div>
    </footer>
`;

// Inject footer into the DOM immediately
document.body.insertAdjacentHTML('beforeend', footerHTML);

// Mobile Menu Toggle Logic (Applied Globally)
document.addEventListener('DOMContentLoaded', () => {
    const hamburgerMenu = document.getElementById('hamburgerMenu');
    const navRight = document.getElementById('navRight');
    
    if (hamburgerMenu && navRight) {
        hamburgerMenu.addEventListener('click', () => {
            navRight.classList.toggle('nav-active');
            
            // Simple animation for the SVG lines
            const lines = hamburgerMenu.querySelectorAll('line');
            if (navRight.classList.contains('nav-active')) {
                lines[0].setAttribute('y1', '6');
                lines[0].setAttribute('y2', '18');
                lines[2].setAttribute('y1', '18');
                lines[2].setAttribute('y2', '6');
                lines[1].style.opacity = '0';
            } else {
                lines[0].setAttribute('y1', '12');
                lines[0].setAttribute('y2', '12');
                lines[2].setAttribute('y1', '18');
                lines[2].setAttribute('y2', '18');
                lines[1].style.opacity = '1';
            }
        });
        
        const navLinks = navRight.querySelectorAll('a, button');
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                navRight.classList.remove('nav-active');
                const lines = hamburgerMenu.querySelectorAll('line');
                lines[0].setAttribute('y1', '12');
                lines[0].setAttribute('y2', '12');
                lines[2].setAttribute('y1', '18');
                lines[2].setAttribute('y2', '18');
                lines[1].style.opacity = '1';
            });
        });
    }
});
