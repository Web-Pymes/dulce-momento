// ===== DOM Elements =====
const navbar = document.getElementById('navbar');
const navToggle = document.getElementById('navToggle');
const navLinks = document.getElementById('navLinks');
const contactForm = document.getElementById('contactForm');
const formSuccess = document.getElementById('formSuccess');

// ===== Navbar Scroll Effect =====
window.addEventListener('scroll', () => {
    if (window.scrollY > 20) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// ===== Mobile Menu Toggle =====
navToggle.addEventListener('click', () => {
    navToggle.classList.toggle('active');
    navLinks.classList.toggle('mobile-open');
});

// ===== Close Mobile Menu on Link Click =====
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        navToggle.classList.remove('active');
        navLinks.classList.remove('mobile-open');
    });
});

// ===== Smooth Scroll for Navigation Links =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// ===== Contact Form Submission =====
contactForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const submitBtn = contactForm.querySelector('button[type="submit"]');
    const originalContent = submitBtn.innerHTML;

    // Show loading state
    submitBtn.disabled = true;
    submitBtn.innerHTML = `
        <span class="spinner"></span>
        Enviando...
    `;

    // Add spinner styles dynamically
    const style = document.createElement('style');
    style.textContent = `
        .spinner {
            width: 1.25rem;
            height: 1.25rem;
            border: 2px solid rgba(255,255,255,0.3);
            border-top-color: white;
            border-radius: 50%;
            animation: spin 0.8s linear infinite;
        }
        @keyframes spin {
            to { transform: rotate(360deg); }
        }
    `;
    document.head.appendChild(style);

    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 1500));

    // Log form data (in production, send to server)
    const formData = new FormData(contactForm);
    console.log('Formulario enviado:', Object.fromEntries(formData));

    // Show success message
    contactForm.style.display = 'none';
    formSuccess.style.display = 'block';

    // Reset after 3 seconds
    setTimeout(() => {
        contactForm.style.display = 'flex';
        formSuccess.style.display = 'none';
        contactForm.reset();
        submitBtn.disabled = false;
        submitBtn.innerHTML = originalContent;
    }, 3000);
});

// ===== Close Mobile Menu on Outside Click =====
document.addEventListener('click', (e) => {
    if (!navToggle.contains(e.target) && !navLinks.contains(e.target)) {
        navToggle.classList.remove('active');
        navLinks.classList.remove('mobile-open');
    }
});

// ===== Add Active State to Current Section Link =====
const sections = document.querySelectorAll('section[id]');

window.addEventListener('scroll', () => {
    const scrollY = window.pageYOffset;

    sections.forEach(section => {
        const sectionHeight = section.offsetHeight;
        const sectionTop = section.offsetTop - 100;
        const sectionId = section.getAttribute('id');
        const navLink = document.querySelector(`.nav-link[href="#${sectionId}"]`);

        if (navLink) {
            if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                navLink.classList.add('active');
            } else {
                navLink.classList.remove('active');
            }
        }
    });
});

// ===== Hero Image Carousel =====
const heroImages = document.querySelectorAll('.hero-image');
let currentImageIndex = 0;

if (heroImages.length > 0) {
    setInterval(() => {
        // Remove active class from current image
        heroImages[currentImageIndex].classList.remove('active');

        // Calculate next index
        currentImageIndex = (currentImageIndex + 1) % heroImages.length;

        // Add active class to next image
        heroImages[currentImageIndex].classList.add('active');
    }, 3000); // 3 seconds
}
