// ===========================
// Custom Cursor
// ===========================
const cursor = document.getElementById('cursor');
const cursorFollower = document.getElementById('cursorFollower');

if (cursor && cursorFollower) {
    let mouseX = 0, mouseY = 0;
    let followerX = 0, followerY = 0;

    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;

        cursor.style.left = mouseX + 'px';
        cursor.style.top = mouseY + 'px';
    });

    function animateFollower() {
        followerX += (mouseX - followerX) * 0.1;
        followerY += (mouseY - followerY) * 0.1;

        cursorFollower.style.left = followerX + 'px';
        cursorFollower.style.top = followerY + 'px';

        requestAnimationFrame(animateFollower);
    }
    animateFollower();

    // Cursor hover effects
    const interactiveElements = document.querySelectorAll('a, button, .work-card');
    interactiveElements.forEach(el => {
        el.addEventListener('mouseenter', () => {
            cursorFollower.style.transform = 'scale(1.5)';
        });
        el.addEventListener('mouseleave', () => {
            cursorFollower.style.transform = 'scale(1)';
        });
    });
}

// ===========================
// Mobile Navigation
// ===========================
const mobileToggle = document.getElementById('mobileToggle');
const navMenu = document.getElementById('navMenu');
const navLinks = document.querySelectorAll('.nav-link');

mobileToggle.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    mobileToggle.classList.toggle('active');
});

navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        mobileToggle.classList.remove('active');
    });
});

// ===========================
// Active Navigation on Scroll
// ===========================
const navbar = document.getElementById('navbar');
const sections = document.querySelectorAll('section[id]');

function updateActiveNav() {
    const scrollY = window.scrollY;

    // Add background to navbar on scroll
    if (scrollY > 50) {
        navbar.style.background = 'rgba(15, 14, 16, 0.95)';
    } else {
        navbar.style.background = 'rgba(15, 14, 16, 0.9)';
    }

    // Update active link
    sections.forEach(section => {
        const sectionHeight = section.offsetHeight;
        const sectionTop = section.offsetTop - 100;
        const sectionId = section.getAttribute('id');

        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${sectionId}`) {
                    link.classList.add('active');
                }
            });
        }
    });
}

window.addEventListener('scroll', updateActiveNav);

// ===========================
// Smooth Scroll
// ===========================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (href !== '#' && document.querySelector(href)) {
            e.preventDefault();
            const target = document.querySelector(href);
            const offsetTop = target.offsetTop - 80;

            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// ===========================
// Stats Counter Animation
// ===========================
const statNumbers = document.querySelectorAll('.stat-number');

function animateCounter(element) {
    const target = parseInt(element.getAttribute('data-target'));
    const duration = 2000;
    const increment = target / (duration / 16);
    let current = 0;

    const counter = setInterval(() => {
        current += increment;
        if (current >= target) {
            element.textContent = target + '+';
            clearInterval(counter);
        } else {
            element.textContent = Math.floor(current) + '+';
        }
    }, 16);
}

// ===========================
// Testimonial Slider
// ===========================
const testimonialTrack = document.getElementById('testimonialTrack');
const testimonialDots = document.getElementById('testimonialDots');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');
const testimonials = document.querySelectorAll('.testimonial-card');

let currentTestimonial = 0;

// Create dots
testimonials.forEach((_, index) => {
    const dot = document.createElement('button');
    dot.classList.add('slider-dot');
    if (index === 0) dot.classList.add('active');
    dot.addEventListener('click', () => goToTestimonial(index));
    testimonialDots.appendChild(dot);
});

const dots = document.querySelectorAll('.slider-dot');

function goToTestimonial(index) {
    currentTestimonial = index;
    testimonialTrack.style.transform = `translateX(-${currentTestimonial * 100}%)`;

    dots.forEach(dot => dot.classList.remove('active'));
    dots[currentTestimonial].classList.add('active');
}

prevBtn.addEventListener('click', () => {
    currentTestimonial = currentTestimonial === 0 ? testimonials.length - 1 : currentTestimonial - 1;
    goToTestimonial(currentTestimonial);
});

nextBtn.addEventListener('click', () => {
    currentTestimonial = (currentTestimonial + 1) % testimonials.length;
    goToTestimonial(currentTestimonial);
});

// Auto-play
let autoplayInterval = setInterval(() => {
    currentTestimonial = (currentTestimonial + 1) % testimonials.length;
    goToTestimonial(currentTestimonial);
}, 5000);

// Pause autoplay on hover
const testimonialSlider = document.querySelector('.testimonials-slider');
testimonialSlider.addEventListener('mouseenter', () => {
    clearInterval(autoplayInterval);
});

testimonialSlider.addEventListener('mouseleave', () => {
    autoplayInterval = setInterval(() => {
        currentTestimonial = (currentTestimonial + 1) % testimonials.length;
        goToTestimonial(currentTestimonial);
    }, 5000);
});

// ===========================
// Intersection Observer for Animations
// ===========================
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('aos-animate');

            // Trigger counter animation for stats
            if (entry.target.classList.contains('stat-number')) {
                const textContent = entry.target.textContent;
                if (textContent === '0' || textContent === '0+') {
                    animateCounter(entry.target);
                }
            }
        }
    });
}, observerOptions);

// Observe all elements with data-aos attribute
const animatedElements = document.querySelectorAll('[data-aos]');
animatedElements.forEach(el => observer.observe(el));

// Observe stat numbers
statNumbers.forEach(stat => observer.observe(stat));

// ===========================
// Contact Form Handling
// ===========================
const contactForm = document.getElementById('contactForm');

if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const formData = {
            name: document.getElementById('name').value,
            email: document.getElementById('email').value,
            subject: document.getElementById('subject').value,
            message: document.getElementById('message').value
        };

        console.log('Form submitted:', formData);

        // Show success message
        alert('Thank you for reaching out! I will get back to you soon.');

        // Reset form
        contactForm.reset();
    });
}

// ===========================
// Parallax Effect on Scroll
// ===========================
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;

    const heroImages = document.querySelector('.hero-images');
    if (heroImages) {
        heroImages.style.transform = `translateY(${scrolled * 0.3}px)`;
    }

    const heroImageFloat = document.querySelector('.hero-image-float');
    if (heroImageFloat) {
        heroImageFloat.style.transform = `translateY(${-scrolled * 0.2}px)`;
    }
});

// ===========================
// Preload Animation
// ===========================
window.addEventListener('load', () => {
    document.body.style.opacity = '0';
    setTimeout(() => {
        document.body.style.transition = 'opacity 0.5s ease';
        document.body.style.opacity = '1';
    }, 100);
});

// ===========================
// Add smooth reveal on load
// ===========================
document.addEventListener('DOMContentLoaded', () => {
    // Trigger animations for elements in viewport
    const elementsInView = document.querySelectorAll('[data-aos]');
    elementsInView.forEach(el => {
        const rect = el.getBoundingClientRect();
        if (rect.top < window.innerHeight && rect.bottom >= 0) {
            el.classList.add('aos-animate');
        }
    });
});

// ===========================
// Performance: Throttle scroll events
// ===========================
function throttle(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Apply throttle to scroll-heavy functions
const throttledScroll = throttle(() => {
    updateActiveNav();
}, 100);

window.addEventListener('scroll', throttledScroll);
