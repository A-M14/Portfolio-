// DOM Elements
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');
const navItems = document.querySelectorAll('.nav-links li');
const sections = document.querySelectorAll('section');
const header = document.querySelector('header');
const yearSpan = document.getElementById('year');

// Set current year in footer
if (yearSpan) {
    yearSpan.textContent = new Date().getFullYear();
}

// Mobile menu toggle
hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    hamburger.classList.toggle('active');
    document.body.style.overflow = navLinks.classList.contains('active') ? 'hidden' : '';
});

// Close mobile menu when clicking on a nav link
navItems.forEach(item => {
    item.addEventListener('click', () => {
        navLinks.classList.remove('active');
        hamburger.classList.remove('active');
        document.body.style.overflow = '';
    });
});

// Sticky header on scroll
let lastScroll = 0;
window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    // Add/remove scrolled class to header
    if (currentScroll > 50) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
    
    // Hide/show header on scroll
    if (currentScroll <= 0) {
        header.classList.remove('scroll-up');
        return;
    }
    
    if (currentScroll > lastScroll && !header.classList.contains('scroll-down')) {
        // Scroll down
        header.classList.remove('scroll-up');
        header.classList.add('scroll-down');
    } else if (currentScroll < lastScroll && header.classList.contains('scroll-down')) {
        // Scroll up
        header.classList.remove('scroll-down');
        header.classList.add('scroll-up');
    }
    
    lastScroll = currentScroll;
});

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop - 80,
                behavior: 'smooth'
            });
        }
    });
});

// Active navigation link on scroll
function setActiveNavLink() {
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        
        if (pageYOffset >= (sectionTop - sectionHeight / 3)) {
            current = section.getAttribute('id');
        }
    });
    
    navItems.forEach(item => {
        item.querySelector('a').classList.remove('active');
        if (item.querySelector(`a[href*="${current}"]`)) {
            item.querySelector('a').classList.add('active');
        }
    });
}

// Initialize scroll reveal animations
function initScrollReveal() {
    const sr = ScrollReveal({
        origin: 'bottom',
        distance: '50px',
        duration: 1000,
        delay: 200,
        reset: false,
        mobile: true
    });
    
    // Hero section
    sr.reveal('.greeting', { origin: 'left' });
    sr.reveal('.name', { origin: 'left', delay: 200 });
    sr.reveal('.role', { origin: 'left', delay: 400 });
    sr.reveal('.summary', { origin: 'left', delay: 600 });
    sr.reveal('.cta-buttons', { origin: 'left', delay: 800 });
    sr.reveal('.social-links', { origin: 'left', delay: 1000 });
    sr.reveal('.hero-image', { origin: 'right', delay: 800 });
    
    // About section
    sr.reveal('.about-text', { origin: 'left', interval: 100 });
    
    // Skills section
    sr.reveal('.skill-category', { interval: 200 });
    
    // Projects section
    sr.reveal('.project-card', { interval: 200 });
    
    // Education section
    sr.reveal('.timeline-item', { interval: 200 });
    
    // Certificates section
    sr.reveal('.certificate-card', { interval: 200 });
    
    // Achievements section
    sr.reveal('.achievement-card', { interval: 200 });
    
    // Contact section
    sr.reveal('.contact-info', { origin: 'left' });
    sr.reveal('.contact-form', { origin: 'right', delay: 200 });
}

// Form submission handling
const contactForm = document.querySelector('.contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(this);
        const formObject = {};
        formData.forEach((value, key) => {
            formObject[key] = value;
        });
        
        // Here you would typically send the form data to a server
        console.log('Form submitted:', formObject);
        
        // Show success message
        const submitButton = this.querySelector('button[type="submit"]');
        const originalButtonText = submitButton.textContent;
        
        submitButton.textContent = 'Sending...';
        submitButton.disabled = true;
        
        // Simulate form submission
        setTimeout(() => {
            submitButton.textContent = 'Message Sent!';
            submitButton.style.backgroundColor = '#4CAF50';
            
            // Reset form
            this.reset();
            
            // Reset button after delay
            setTimeout(() => {
                submitButton.textContent = originalButtonText;
                submitButton.style.backgroundColor = '';
                submitButton.disabled = false;
            }, 3000);
        }, 1500);
    });
}

// Function to generate and download resume as PDF
function generateResumePDF() {
    // Create a temporary div to hold the resume content
    const tempDiv = document.createElement('div');
    tempDiv.style.position = 'absolute';
    tempDiv.style.left = '-9999px';
    tempDiv.style.padding = '20mm';
    tempDiv.style.width = '210mm';
    tempDiv.style.background = 'white';
    tempDiv.style.color = '#333';
    
    // Add resume content
    tempDiv.innerHTML = `
        <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; }
            h1 { color: #2c3e50; text-align: center; margin-bottom: 10px; }
            .contact-info { text-align: center; margin-bottom: 20px; color: #666; }
            .section { margin-bottom: 20px; }
            .section-title { 
                color: #f4b400; 
                border-bottom: 2px solid #f4b400; 
                padding-bottom: 5px; 
                margin-bottom: 10px;
            }
            .item { margin-bottom: 15px; }
            .item h3 { margin: 5px 0; }
            .date { color: #666; font-style: italic; }
            ul { margin: 5px 0; padding-left: 20px; }
        </style>
        <div class="header">
            <h1>AKSHATA VADDODAGI</h1>
            <div class="contact-info">Mysuru, Karnataka, India</div>
            <div class="contact-info">+91 6360460934 | akshatavaddodagi@gmail.com</div>
            <div class="contact-info">
                LinkedIn: linkedin.com/in/akshata-vaddodagi-0629592b1 | 
                GitHub: github.com/A-M14
            </div>
        </div>

        <div class="section">
            <h2 class="section-title">PROFESSIONAL SUMMARY</h2>
            <p>Motivated Computer Science Student skilled in programming, machine learning and web development. Experienced in developing AI-integrated projects that address real-world problems efficiently.</p>
        </div>

        <div class="section">
            <h2 class="section-title">EDUCATION</h2>
            <div class="item">
                <h3>VTU Regional Center Mysuru</h3>
                <div>B.Tech in Computer Science & Engineering</div>
                <div class="date">2022 - 2026 | CGPA: 8.95</div>
            </div>
            <div class="item">
                <h3>Prarthana PU Science College</h3>
                <div>Pre-University (PCMB)</div>
                <div class="date">2020 - 2022 | Percentage: 90.16%</div>
            </div>
            <div class="item">
                <h3>New English High School</h3>
                <div>High School (SSLC)</div>
                <div class="date">2017 - 2020 | Percentage: 89.96%</div>
            </div>
        </div>

        <div class="section">
            <h2 class="section-title">TECHNICAL SKILLS</h2>
            <div style="display: flex; flex-wrap: wrap; gap: 20px;">
                <div style="flex: 1; min-width: 200px;">
                    <h3>Programming</h3>
                    <ul>
                        <li>Python</li>
                        <li>C</li>
                        <li>C++</li>
                        <li>Java</li>
                    </ul>
                </div>
                <div style="flex: 1; min-width: 200px;">
                    <h3>Web Development</h3>
                    <ul>
                        <li>HTML</li>
                        <li>CSS</li>
                        <li>JavaScript</li>
                    </ul>
                </div>
                <div style="flex: 1; min-width: 200px;">
                    <h3>AI/ML</h3>
                    <ul>
                        <li>TensorFlow</li>
                        <li>Pandas</li>
                        <li>NumPy</li>
                        <li>Matplotlib</li>
                        <li>OpenCV</li>
                    </ul>
                </div>
                <div style="flex: 1; min-width: 200px;">
                    <h3>Tools & Technologies</h3>
                    <ul>
                        <li>SQL, MySQL</li>
                        <li>Git, VS Code</li>
                        <li>Google Colab</li>
                        <li>Make, Vector Shift</li>
                        <li>Gemini, ChatGPT, Claude</li>
                    </ul>
                </div>
            </div>
        </div>

        <div class="section">
            <h2 class="section-title">PROJECTS</h2>
            <div class="item">
                <h3>Crop Recommendation and Yield Prediction</h3>
                <ul>
                    <li>Developed ML model using Scikit-learn achieving 90% accuracy</li>
                    <li>Helps farmers choose optimal crops based on environmental factors</li>
                </ul>
            </div>
            <div class="item">
                <h3>Voice-Based Virtual Assistant</h3>
                <ul>
                    <li>Built a voice-controlled assistant using HTML/CSS/JS + APIs</li>
                    <li>Enables hands-free operation of various computer functions</li>
                </ul>
            </div>
            <div class="item">
                <h3>AI YouTube Automation</h3>
                <ul>
                    <li>Created an AI-powered agent that generates and uploads daily AI tools update videos</li>
                    <li>Automated the entire content creation and upload process</li>
                </ul>
            </div>
        </div>

        <div class="section">
            <h2 class="section-title">CERTIFICATIONS</h2>
            <ul>
                <li>AI & ML Internship – Internz Learn (2024)</li>
                <li>Generative AI for Beginners – Simplilearn (2025)</li>
                <li>Generative AI Mastermind – OutSkill</li>
            </ul>
        </div>

        <div class="section">
            <h2 class="section-title">ACHIEVEMENTS</h2>
            <ul>
                <li>Represented VTU in South Zone All India Baseball Championship (Women), 2023</li>
                <li>Participated in VTU Hackathon, Mysore</li>
            </ul>
        </div>

        <div class="section">
            <h2 class="section-title">LANGUAGES</h2>
            <ul>
                <li>English (Professional)</li>
                <li>Kannada (Native)</li>
                <li>Hindi (Conversational)</li>
            </ul>
        </div>
    `;
    
    // Add to document
    document.body.appendChild(tempDiv);
    
    // Generate PDF
    const element = tempDiv;
    const opt = {
        margin: 10,
        filename: 'Akshata_Vaddodagi_Resume.pdf',
        image: { type: 'jpeg', quality: 0.98 },
        html2canvas: { scale: 2 },
        jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
    };
    
    // Load html2pdf library dynamically if not already loaded
    if (typeof html2pdf === 'undefined') {
        const script = document.createElement('script');
        script.src = 'https://cdnjs.cloudflare.com/ajax/libs/html2pdf.js/0.10.1/html2pdf.bundle.min.js';
        script.onload = () => generatePDF(element, opt);
        document.head.appendChild(script);
    } else {
        generatePDF(element, opt);
    }
    
    function generatePDF(element, opt) {
        html2pdf().set(opt).from(element).save().then(() => {
            // Clean up
            document.body.removeChild(tempDiv);
        });
    }
}

// Initialize functions when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    // Set active nav link on page load
    setActiveNavLink();
    
    // Initialize scroll reveal if library is loaded
    if (typeof ScrollReveal !== 'undefined') {
        initScrollReveal();
    }
    
    // Add animation class to hero elements on page load
    const heroElements = document.querySelectorAll('.greeting, .name, .role, .summary, .cta-buttons, .social-links, .hero-image');
    heroElements.forEach((el, index) => {
        setTimeout(() => {
            el.style.opacity = '1';
            el.style.transform = 'translateY(0)';
        }, index * 200);
    });
});

// Update active nav link on scroll
window.addEventListener('scroll', setActiveNavLink);

// Add animation to skills on scroll
const skillItems = document.querySelectorAll('.skill-item');
const skillsSection = document.getElementById('skills');

function animateSkills() {
    if (!skillsSection) return;
    
    const skillsTop = skillsSection.offsetTop;
    const skillsHeight = skillsSection.offsetHeight;
    const windowHeight = window.innerHeight;
    const scrollPosition = window.scrollY;
    
    if (scrollPosition > (skillsTop + skillsHeight - windowHeight)) {
        skillItems.forEach((item, index) => {
            setTimeout(() => {
                item.style.transform = 'translateY(0)';
                item.style.opacity = '1';
            }, index * 100);
        });
        
        // Remove event listener after animation
        window.removeEventListener('scroll', animateSkills);
    }
}

// Initialize skill animations
window.addEventListener('scroll', animateSkills);

// Preloader
window.addEventListener('load', () => {
    const preloader = document.querySelector('.preloader');
    if (preloader) {
        preloader.style.transition = 'opacity 0.5s ease';
        preloader.style.opacity = '0';
        
        setTimeout(() => {
            preloader.style.display = 'none';
        }, 500);
    }
});

// Add smooth scrolling to all links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop - 80,
                behavior: 'smooth'
            });
        }
    });
});
