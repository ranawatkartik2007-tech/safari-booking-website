/* ============================================
   Nature-Inspired Safari Website JavaScript
   ============================================ */

// ============================================
// MOBILE NAVIGATION TOGGLE
// ============================================
const navToggle = document.getElementById('navToggle');
const navMenu = document.getElementById('navMenu');
const navLinks = document.querySelectorAll('.nav-link');

navToggle.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    navToggle.classList.toggle('active');
});

// Close mobile menu when clicking on a link
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        navToggle.classList.remove('active');
    });
});

// ============================================
// NAVBAR SCROLL EFFECT
// ============================================
const navbar = document.getElementById('navbar');
let lastScroll = 0;

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    // Add shadow when scrolled
    if (currentScroll > 100) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
    
    lastScroll = currentScroll;
});

// ============================================
// SMOOTH SCROLLING FOR ANCHOR LINKS
// ============================================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        
        if (target) {
            const offsetTop = target.offsetTop - 80; // Account for fixed navbar
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// ============================================
// SCROLL ANIMATIONS (AOS-like)
// ============================================
const observerOptions = {
    threshold: 0.15,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('aos-animate');
        }
    });
}, observerOptions);

// Observe all elements with data-aos attribute
document.querySelectorAll('[data-aos]').forEach(el => {
    observer.observe(el);
});

// ============================================
// CONTACT FORM HANDLING
// ============================================
const contactForm = document.getElementById('contactForm');

contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    // Get form data
    const formData = new FormData(contactForm);
    const data = Object.fromEntries(formData);
    
    // Here you would typically send the data to a server
    // For now, we'll just show a success message
    
    console.log('Form submitted:', data);
    
    // Show success message (you can customize this)
    alert('Thank you for your inquiry! We will get back to you soon.');
    
    // Reset form
    contactForm.reset();
    
    // TODO: Replace this with actual form submission to your backend
    // Example:
    // fetch('/api/contact', {
    //     method: 'POST',
    //     headers: { 'Content-Type': 'application/json' },
    //     body: JSON.stringify(data)
    // })
    // .then(response => response.json())
    // .then(result => {
    //     alert('Thank you for your inquiry!');
    //     contactForm.reset();
    // })
    // .catch(error => {
    //     console.error('Error:', error);
    //     alert('Sorry, there was an error. Please try again.');
    // });
});

// ============================================
// NEWSLETTER FORM HANDLING
// ============================================
const newsletterForm = document.querySelector('.newsletter-form');

if (newsletterForm) {
    newsletterForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const email = newsletterForm.querySelector('input[type="email"]').value;
        
        console.log('Newsletter signup:', email);
        
        // Show success message
        alert('Thank you for subscribing to our newsletter!');
        
        // Reset form
        newsletterForm.reset();
        
        // TODO: Replace with actual newsletter signup API
    });
}

// ============================================
// SAFARI CARD CLICK HANDLING
// ============================================
document.querySelectorAll('.btn-safari').forEach(button => {
    button.addEventListener('click', (e) => {
        e.preventDefault();
        
        // Get the safari card details
        const card = button.closest('.safari-card');
        const title = card.querySelector('.safari-title').textContent;
        const price = card.querySelector('.price-amount').textContent;
        
        // Scroll to contact form
        const contactSection = document.getElementById('contact');
        const offsetTop = contactSection.offsetTop - 80;
        
        window.scrollTo({
            top: offsetTop,
            behavior: 'smooth'
        });
        
        // Pre-fill the safari selection in the form
        setTimeout(() => {
            const safariSelect = document.getElementById('safari');
            const options = safariSelect.options;
            
            // Try to match the title with an option
            for (let i = 0; i < options.length; i++) {
                if (title.toLowerCase().includes(options[i].text.toLowerCase())) {
                    safariSelect.selectedIndex = i;
                    break;
                }
            }
            
            // Highlight the form
            const formWrapper = document.querySelector('.contact-form-wrapper');
            formWrapper.style.animation = 'pulse 0.5s ease-in-out';
            setTimeout(() => {
                formWrapper.style.animation = '';
            }, 500);
        }, 800);
    });
});

// ============================================
// GALLERY IMAGE MODAL (Optional Enhancement)
// ============================================
// This creates a simple lightbox effect when clicking gallery images
const galleryItems = document.querySelectorAll('.gallery-item');

galleryItems.forEach(item => {
    item.addEventListener('click', () => {
        const img = item.querySelector('img');
        const caption = item.querySelector('.gallery-caption');
        
        // Create modal
        const modal = document.createElement('div');
        modal.className = 'gallery-modal';
        modal.innerHTML = `
            <div class="modal-overlay"></div>
            <div class="modal-content">
                <button class="modal-close">&times;</button>
                <img src="${img.src}" alt="${img.alt}">
                ${caption ? `<p class="modal-caption">${caption.textContent}</p>` : ''}
            </div>
        `;
        
        document.body.appendChild(modal);
        
        // Add styles for modal (if not in CSS)
        modal.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            z-index: 10000;
            display: flex;
            align-items: center;
            justify-content: center;
            animation: fadeIn 0.3s ease;
        `;
        
        const overlay = modal.querySelector('.modal-overlay');
        overlay.style.cssText = `
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(44, 36, 22, 0.95);
        `;
        
        const content = modal.querySelector('.modal-content');
        content.style.cssText = `
            position: relative;
            max-width: 90%;
            max-height: 90%;
            z-index: 2;
            animation: zoomIn 0.3s ease;
        `;
        
        const closeBtn = modal.querySelector('.modal-close');
        closeBtn.style.cssText = `
            position: absolute;
            top: -40px;
            right: 0;
            background: none;
            border: none;
            color: white;
            font-size: 40px;
            cursor: pointer;
            transition: transform 0.3s ease;
        `;
        
        const modalImg = modal.querySelector('img');
        modalImg.style.cssText = `
            max-width: 100%;
            max-height: 80vh;
            border-radius: 12px;
            box-shadow: 0 20px 60px rgba(0, 0, 0, 0.5);
        `;
        
        const modalCaption = modal.querySelector('.modal-caption');
        if (modalCaption) {
            modalCaption.style.cssText = `
                color: white;
                text-align: center;
                margin-top: 1rem;
                font-size: 1.25rem;
                font-family: 'Syne', sans-serif;
            `;
        }
        
        // Close modal functionality
        const closeModal = () => {
            modal.style.animation = 'fadeOut 0.3s ease';
            setTimeout(() => {
                modal.remove();
            }, 300);
        };
        
        closeBtn.addEventListener('click', closeModal);
        overlay.addEventListener('click', closeModal);
        
        // Close on Escape key
        document.addEventListener('keydown', function escHandler(e) {
            if (e.key === 'Escape') {
                closeModal();
                document.removeEventListener('keydown', escHandler);
            }
        });
    });
});

// ============================================
// PARALLAX EFFECT FOR HERO IMAGE
// ============================================
window.addEventListener('scroll', () => {
    const heroImage = document.querySelector('.hero-image');
    if (heroImage) {
        const scrolled = window.pageYOffset;
        const parallax = scrolled * 0.5;
        heroImage.style.transform = `translateY(${parallax}px) scale(1.1)`;
    }
});

// ============================================
// COUNTER ANIMATION FOR STATS
// ============================================
const animateCounter = (element, target, duration = 2000) => {
    const start = 0;
    const increment = target / (duration / 16);
    let current = start;
    
    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            element.textContent = target + (element.dataset.suffix || '');
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(current) + (element.dataset.suffix || '');
        }
    }, 16);
};

// Observe stats section and trigger counter animation
const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const statNumbers = entry.target.querySelectorAll('.stat-number');
            statNumbers.forEach(stat => {
                const text = stat.textContent;
                const number = parseInt(text.replace(/\D/g, ''));
                const suffix = text.replace(/\d/g, '');
                stat.dataset.suffix = suffix;
                animateCounter(stat, number);
            });
            statsObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

const heroStats = document.querySelector('.hero-stats');
if (heroStats) {
    statsObserver.observe(heroStats);
}

// ============================================
// ADD ANIMATION KEYFRAMES DYNAMICALLY
// ============================================
const style = document.createElement('style');
style.textContent = `
    @keyframes fadeIn {
        from { opacity: 0; }
        to { opacity: 1; }
    }
    
    @keyframes fadeOut {
        from { opacity: 1; }
        to { opacity: 0; }
    }
    
    @keyframes zoomIn {
        from { 
            opacity: 0;
            transform: scale(0.8);
        }
        to { 
            opacity: 1;
            transform: scale(1);
        }
    }
    
    @keyframes pulse {
        0%, 100% {
            transform: scale(1);
        }
        50% {
            transform: scale(1.05);
        }
    }
`;
document.head.appendChild(style);

// ============================================
// PAGE LOAD OPTIMIZATION
// ============================================
window.addEventListener('load', () => {
    // Remove any loading screens or preloaders
    document.body.classList.add('loaded');
    
    // Lazy load images if needed
    const images = document.querySelectorAll('img[data-src]');
    images.forEach(img => {
        img.src = img.dataset.src;
        img.removeAttribute('data-src');
    });
});

// ============================================
// CONSOLE MESSAGE (Optional)
// ============================================
console.log('%c🦁 Wild Encounters Safari Website', 'font-size: 20px; color: #2D5016; font-weight: bold;');
console.log('%cDesigned with nature-inspired aesthetics', 'font-size: 12px; color: #D2691E;');
console.log('%cReady for your adventure!', 'font-size: 12px; color: #4A7C28;');
