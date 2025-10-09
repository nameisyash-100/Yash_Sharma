// Hamburger Menu Toggle
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

function toggleMenu() {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
    document.body.classList.toggle('no-scroll');
}

hamburger.addEventListener('click', toggleMenu);

// Close menu when clicking a link
document.querySelectorAll('.nav-menu a').forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
        document.body.classList.remove('no-scroll');
    });
});

// Close menu when clicking outside
document.addEventListener('click', (e) => {
    if (!hamburger.contains(e.target) && !navMenu.contains(e.target) && navMenu.classList.contains('active')) {
        toggleMenu();
    }
});

// Matrix Rain Animation
const canvas = document.getElementById('matrixCanvas');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const katakana = 'アァカサタナハマヤャラワガザダバパイィキシチニヒミリヰギジヂビピウゥクスツヌフムユュルグズブヅプエェケセテネヘメレヱゲゼデベペオォコソトノホモヨョロヲゴゾドボポヴッン';
const latin = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
const nums = '0123456789';
const alphabet = katakana + latin + nums;

const fontSize = 16;
const columns = canvas.width/fontSize;

const rainDrops = Array(Math.floor(columns)).fill(1);

function draw() {
    ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.fillStyle = '#0F0';
    ctx.font = fontSize + 'px monospace';

    for(let i = 0; i < rainDrops.length; i++) {
        const text = alphabet.charAt(Math.floor(Math.random() * alphabet.length));
        ctx.fillText(text, i*fontSize, rainDrops[i]*fontSize);
        
        if(rainDrops[i]*fontSize > canvas.height && Math.random() > 0.975) {
            rainDrops[i] = 0;
        }
        rainDrops[i]++;
    }
}

window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
});

setInterval(draw, 30);

// Typing Animation
const typingText = document.querySelector('.typing-text');
const text = "Hi, I'm Yash Sharma.";
let index = 0;

function type() {
    if (index < text.length) {
        typingText.textContent += text.charAt(index);
        index++;
        setTimeout(type, 100);
    }
}

// Start typing animation after a delay
setTimeout(type, 1000);

// Certificate Slider functionality
let currentPosition = 0;
const slider = document.querySelector('.cert-slider');
const slides = document.querySelectorAll('.cert-slide');
const slideWidth = 320; // Width of slide + gap
let autoSlideInterval;

function moveSlider(direction) {
    // Reverse the direction logic for correct UX
    const maxPosition = -(slides.length - 3) * slideWidth;
    currentPosition -= direction * slideWidth;
    // Loop back to start/end when reaching bounds
    if (currentPosition > 0) {
        currentPosition = maxPosition;
    }
    if (currentPosition < maxPosition) {
        currentPosition = 0;
    }
    slider.style.transform = `translateX(${currentPosition}px)`;
}

// Auto slide function
function startAutoSlide() {
    autoSlideInterval = setInterval(() => {
        moveSlider(-1); // Move left by one slide
    }, 3000); // Change slide every 3 seconds
}

// Pause auto slide on hover
const sliderContainer = document.querySelector('.cert-slider-container');
sliderContainer.addEventListener('mouseenter', () => {
    clearInterval(autoSlideInterval);
});

sliderContainer.addEventListener('mouseleave', () => {
    startAutoSlide();
});

// Start auto sliding when page loads
startAutoSlide();
// =====================
// Testimonials Slider functionality
let testCurrentPosition = 0;
const testSlider = document.querySelector('.test-slider');
const testSlides = document.querySelectorAll('.test-slide');
const testSlideWidth = 670; // Match the testimonial image width
let testAutoSlideInterval;

function moveTestSlider(direction) {
    // Reverse the direction logic for correct UX
    const maxPosition = -(testSlides.length - 1) * testSlideWidth;
    testCurrentPosition -= direction * testSlideWidth;
    // Loop back to start/end when reaching bounds
    if (testCurrentPosition > 0) {
        testCurrentPosition = maxPosition;
    }
    if (testCurrentPosition < maxPosition) {
        testCurrentPosition = 0;
    }
    testSlider.style.transform = `translateX(${testCurrentPosition}px)`;
}

function startTestAutoSlide() {
    testAutoSlideInterval = setInterval(() => {
        moveTestSlider(-1);
    }, 3000);
}

const testSliderContainer = document.querySelector('.test-slider-container');
if (testSliderContainer && testSlider && testSlides.length > 0) {
    testSliderContainer.addEventListener('mouseenter', () => {
        clearInterval(testAutoSlideInterval);
    });
    testSliderContainer.addEventListener('mouseleave', () => {
        startTestAutoSlide();
    });
    startTestAutoSlide();
}

// Attach button events for testimonials
window.moveTestSlider = moveTestSlider;

// Modal functionality
function openModal(img) {
    const modal = document.getElementById('certModal');
    const modalImg = document.getElementById('modalImg');
    modal.classList.add('show');
    modalImg.src = img.src;
}

function closeModal() {
    const modal = document.getElementById('certModal');
    modal.classList.remove('show');
}

// Set data-text attribute for section titles
document.querySelectorAll('.section-title').forEach(title => {
    title.setAttribute('data-text', title.textContent);
});

// Intersection Observer for Animations
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            // Add animation classes based on the section
            if (entry.target.classList.contains('skill-bar')) {
                entry.target.querySelector('.fill').classList.add('animate-skill');
            } else {
                entry.target.classList.add('fade-in');
            }
            
            // Add glitch effect to visible section titles
            if (entry.target.querySelector('.section-title')) {
                entry.target.querySelector('.section-title').style.animation = 'cyberpunkGlow 2s infinite';
            }
        }
    });
}, {
    threshold: 0.1
});

// Observe all sections and skill bars
document.querySelectorAll('.section, .skill-bar').forEach(section => {
    observer.observe(section);
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Active section highlight on scroll
const sections = document.querySelectorAll('section[id]');
window.addEventListener('scroll', () => {
    const scrollY = window.pageYOffset;
    
    sections.forEach(section => {
        const sectionHeight = section.offsetHeight;
        const sectionTop = section.offsetTop - 100;
        const sectionId = section.getAttribute('id');
        
        if(scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
            document.querySelector(`nav a[href*=${sectionId}]`).classList.add('active');
        } else {
            document.querySelector(`nav a[href*=${sectionId}]`).classList.remove('active');
        }
    });
});

// Contact Form Submission
document.getElementById('contact-form').addEventListener('submit', function(e) {
    e.preventDefault();
    alert('Thanks! I will get back to you shortly. (Demo form)');
    this.reset();
});
