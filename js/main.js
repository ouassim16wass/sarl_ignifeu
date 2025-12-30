/* ============================================
   IGNIFEU - Main JavaScript
   Site vitrine SARL IGNIFEU
   Sécurité Incendie - Rouiba, Alger
============================================ */

// Initialize preloader immediately
initPreloader();

document.addEventListener('DOMContentLoaded', function() {
    // Initialize all modules
    initNavbar();
    initMobileMenu();
    initSmoothScroll();
    initCounters();
    initFadeInSections();
    initMap();
});

/* ============================================
   Preloader
============================================ */
function initPreloader() {
    const preloader = document.getElementById('preloader');
    const progressBar = document.getElementById('preloader-progress');

    if (!preloader) return;

    let progress = 0;
    const minLoadTime = 1500; // Minimum time to show preloader (1.5s)
    const startTime = Date.now();

    // Simulate progress
    const progressInterval = setInterval(() => {
        if (progress < 90) {
            progress += Math.random() * 15;
            progress = Math.min(progress, 90);
            if (progressBar) {
                progressBar.style.width = progress + '%';
            }
        }
    }, 100);

    // Hide preloader when page is fully loaded
    window.addEventListener('load', function() {
        clearInterval(progressInterval);

        // Complete progress bar
        if (progressBar) {
            progressBar.style.width = '100%';
        }

        // Calculate remaining time to meet minimum load time
        const elapsedTime = Date.now() - startTime;
        const remainingTime = Math.max(0, minLoadTime - elapsedTime);

        // Hide preloader after minimum time
        setTimeout(() => {
            preloader.style.opacity = '0';
            preloader.style.pointerEvents = 'none';

            // Remove from DOM after animation
            setTimeout(() => {
                preloader.style.display = 'none';
                // Trigger entrance animations
                document.body.classList.add('loaded');
            }, 500);
        }, remainingTime + 300); // Extra 300ms to show 100%
    });

    // Fallback: hide preloader after max time (5s) in case load event doesn't fire
    setTimeout(() => {
        if (preloader.style.display !== 'none') {
            clearInterval(progressInterval);
            if (progressBar) progressBar.style.width = '100%';
            preloader.style.opacity = '0';
            preloader.style.pointerEvents = 'none';
            setTimeout(() => {
                preloader.style.display = 'none';
                document.body.classList.add('loaded');
            }, 500);
        }
    }, 5000);
}

/* ============================================
   Navbar Scroll Effect
============================================ */
function initNavbar() {
    const navbar = document.getElementById('navbar');
    const scrollThreshold = 50;

    function handleScroll() {
        if (window.scrollY > scrollThreshold) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    }

    // Initial check
    handleScroll();

    // Add scroll listener with throttling for performance
    let ticking = false;
    window.addEventListener('scroll', function() {
        if (!ticking) {
            window.requestAnimationFrame(function() {
                handleScroll();
                ticking = false;
            });
            ticking = true;
        }
    });
}

/* ============================================
   Mobile Menu Toggle
============================================ */
function initMobileMenu() {
    const menuBtn = document.getElementById('mobile-menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');
    const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');
    const menuIcon = menuBtn.querySelector('.material-symbols-outlined');

    let isMenuOpen = false;

    function toggleMenu() {
        isMenuOpen = !isMenuOpen;

        if (isMenuOpen) {
            mobileMenu.classList.remove('hidden');
            mobileMenu.classList.add('active');
            menuIcon.textContent = 'close';
        } else {
            mobileMenu.classList.remove('active');
            menuIcon.textContent = 'menu';
            // Wait for animation to complete before hiding
            setTimeout(() => {
                if (!isMenuOpen) {
                    mobileMenu.classList.add('hidden');
                }
            }, 300);
        }
    }

    function closeMenu() {
        if (isMenuOpen) {
            toggleMenu();
        }
    }

    // Toggle menu on button click
    menuBtn.addEventListener('click', toggleMenu);

    // Close menu when clicking on a link
    mobileNavLinks.forEach(link => {
        link.addEventListener('click', closeMenu);
    });

    // Close menu when clicking outside
    document.addEventListener('click', function(event) {
        if (isMenuOpen && !mobileMenu.contains(event.target) && !menuBtn.contains(event.target)) {
            closeMenu();
        }
    });

    // Close menu on escape key
    document.addEventListener('keydown', function(event) {
        if (event.key === 'Escape' && isMenuOpen) {
            closeMenu();
        }
    });

    // Close menu on resize to desktop
    window.addEventListener('resize', function() {
        if (window.innerWidth >= 1024 && isMenuOpen) {
            closeMenu();
        }
    });
}

/* ============================================
   Smooth Scroll for Anchor Links
============================================ */
function initSmoothScroll() {
    const links = document.querySelectorAll('a[href^="#"]');
    const navbarHeight = 80; // Offset for fixed navbar

    links.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');

            // Skip if it's just "#"
            if (href === '#') return;

            const target = document.querySelector(href);

            if (target) {
                e.preventDefault();

                const targetPosition = target.getBoundingClientRect().top + window.scrollY - navbarHeight;

                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

/* ============================================
   Animated Counters
============================================ */
function initCounters() {
    const counters = document.querySelectorAll('.counter');
    const statItems = document.querySelectorAll('.stat-item');
    const duration = 2000; // Animation duration in ms

    function animateCounter(counter) {
        const target = parseInt(counter.getAttribute('data-target'));
        const start = 0;
        const startTime = performance.now();

        function updateCounter(currentTime) {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);

            // Easing function (ease-out)
            const easeOut = 1 - Math.pow(1 - progress, 3);
            const current = Math.floor(start + (target - start) * easeOut);

            counter.textContent = current;

            if (progress < 1) {
                requestAnimationFrame(updateCounter);
            } else {
                counter.textContent = target;
            }
        }

        requestAnimationFrame(updateCounter);
    }

    // Intersection Observer for triggering animation
    const observerOptions = {
        threshold: 0.5,
        rootMargin: '0px'
    };

    let hasAnimated = false;

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !hasAnimated) {
                hasAnimated = true;

                // Animate stat items
                statItems.forEach((item, index) => {
                    setTimeout(() => {
                        item.classList.add('visible');
                    }, index * 150);
                });

                // Animate counters
                counters.forEach(counter => {
                    animateCounter(counter);
                });

                observer.disconnect();
            }
        });
    }, observerOptions);

    // Observe the stats section
    const statsSection = document.querySelector('.stat-item')?.parentElement;
    if (statsSection) {
        observer.observe(statsSection);
    }
}

/* ============================================
   Fade In Sections on Scroll
============================================ */
function initFadeInSections() {
    const sections = document.querySelectorAll('.fade-in-section');

    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    sections.forEach(section => {
        observer.observe(section);
    });
}

/* ============================================
   Leaflet Map Initialization
============================================ */
function initMap() {
    const mapElement = document.getElementById('map');

    if (!mapElement) return;

    // IGNIFEU coordinates (Rouiba, Alger)
    const lat = 36.7333;
    const lng = 3.2833;

    // Initialize map
    const map = L.map('map', {
        scrollWheelZoom: false, // Disable scroll zoom for better UX
        zoomControl: true
    }).setView([lat, lng], 14);

    // Add OpenStreetMap tiles
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
        maxZoom: 19
    }).addTo(map);

    // Custom fire icon for marker
    const fireIcon = L.divIcon({
        html: `
            <div style="
                width: 40px;
                height: 40px;
                background: linear-gradient(135deg, #dc2626, #F77F00);
                border-radius: 50%;
                display: flex;
                align-items: center;
                justify-content: center;
                box-shadow: 0 4px 15px rgba(220, 38, 38, 0.5);
                border: 3px solid white;
            ">
                <span style="font-size: 20px;">🔥</span>
            </div>
        `,
        className: 'custom-marker',
        iconSize: [40, 40],
        iconAnchor: [20, 40],
        popupAnchor: [0, -40]
    });

    // Add marker
    const marker = L.marker([lat, lng], { icon: fireIcon }).addTo(map);

    // Popup content
    const popupContent = `
        <div style="font-family: 'Inter', sans-serif; padding: 8px;">
            <h3 style="margin: 0 0 8px 0; font-size: 16px; font-weight: bold; color: #0d121b;">
                🔥 SARL IGNIFEU
            </h3>
            <p style="margin: 0; font-size: 14px; color: #6b7280; line-height: 1.5;">
                Cité 75 EPLF, BT 02 N°04 RDC<br>
                Rouiba 16039, Alger<br>
                <strong style="color: #dc2626;">Sécurité Incendie</strong>
            </p>
        </div>
    `;

    marker.bindPopup(popupContent).openPopup();

    // Enable scroll zoom on focus
    mapElement.addEventListener('click', function() {
        map.scrollWheelZoom.enable();
    });

    mapElement.addEventListener('mouseleave', function() {
        map.scrollWheelZoom.disable();
    });

    // Invalidate size on load to fix potential rendering issues
    setTimeout(() => {
        map.invalidateSize();
    }, 250);
}

/* ============================================
   Form Validation Enhancement (Optional)
============================================ */
function initFormValidation() {
    const form = document.querySelector('form');

    if (!form) return;

    form.addEventListener('submit', function(e) {
        const submitBtn = form.querySelector('button[type="submit"]');

        // Add loading state
        submitBtn.classList.add('loading');
        submitBtn.disabled = true;

        // The form will submit normally to Web3Forms
        // Loading state will be visible until redirect
    });

    // Real-time validation feedback
    const inputs = form.querySelectorAll('input, textarea, select');

    inputs.forEach(input => {
        input.addEventListener('blur', function() {
            validateField(this);
        });

        input.addEventListener('input', function() {
            if (this.classList.contains('error')) {
                validateField(this);
            }
        });
    });
}

function validateField(field) {
    const value = field.value.trim();
    const isRequired = field.hasAttribute('required');

    // Remove previous error state
    field.classList.remove('error', 'border-red-500');

    if (isRequired && !value) {
        field.classList.add('error', 'border-red-500');
        return false;
    }

    // Email validation
    if (field.type === 'email' && value) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(value)) {
            field.classList.add('error', 'border-red-500');
            return false;
        }
    }

    // Phone validation (basic)
    if (field.type === 'tel' && value) {
        const phoneRegex = /^[\+]?[0-9\s\-\(\)]{8,}$/;
        if (!phoneRegex.test(value)) {
            field.classList.add('error', 'border-red-500');
            return false;
        }
    }

    return true;
}

/* ============================================
   Utility Functions
============================================ */

// Debounce function for performance
function debounce(func, wait) {
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

// Throttle function for scroll events
function throttle(func, limit) {
    let inThrottle;
    return function(...args) {
        if (!inThrottle) {
            func.apply(this, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

/* ============================================
   Service Worker Registration (Optional - for PWA)
============================================ */
if ('serviceWorker' in navigator) {
    window.addEventListener('load', function() {
        // Uncomment to enable service worker
        // navigator.serviceWorker.register('/sw.js')
        //     .then(registration => console.log('SW registered'))
        //     .catch(error => console.log('SW registration failed'));
    });
}

/* ============================================
   Console Welcome Message
============================================ */
console.log('%c🔥 IGNIFEU', 'color: #dc2626; font-size: 24px; font-weight: bold;');
console.log('%cSécurité Incendie - Rouiba, Alger', 'color: #F77F00; font-size: 14px;');
console.log('%cSite développé avec passion', 'color: #6b7280; font-size: 12px;');
