/* ==========================================================
                RIPPLENCE SOFTWARE COMPANY WEBSITE
   ========================================================== */

// -------------------- SELECT REQUIRED ELEMENTS --------------------

// We will add this button in HTML (explained later)
const themeToggleBtn = document.getElementById("theme-toggle");

// Root HTML element (<html>)
const htmlElement = document.documentElement;

// -------------------- CHECK SAVED USER PREFERENCE --------------------

// localStorage stores data even after browser is closed
const savedTheme = localStorage.getItem("theme");

if (savedTheme) {
    // If user has already chosen a theme, use it
    htmlElement.setAttribute("data-theme", savedTheme);
} else {
    // Otherwise, detect system preference
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;

    if (prefersDark) {
        htmlElement.setAttribute("data-theme", "dark");
    } else {
        htmlElement.setAttribute("data-theme", "light");
    }
}

// -------------------- TOGGLE FUNCTION --------------------

function toggleTheme() {
    const currentTheme = htmlElement.getAttribute("data-theme");

    if (currentTheme === "dark") {
        htmlElement.setAttribute("data-theme", "light");
        localStorage.setItem("theme", "light");
        themeToggleBtn.textContent = "🌙";
    } else {
        htmlElement.setAttribute("data-theme", "dark");
        localStorage.setItem("theme", "dark");
        themeToggleBtn.textContent = "☀️";
    }
}

// -------------------- SWAP MAP TOGGLE FUNCTION --------------------

const mapFrame = document.getElementById("mapFrame");

function updateMapTheme(theme) {
    if (!mapFrame) return;

    if (theme === "dark") {
        mapFrame.src = "https://www.google.com/maps?q=Haryana,India&output=embed&maptype=satellite";
    } else {
        mapFrame.src = "https://www.google.com/maps?q=Haryana,India&output=embed";
    }
}

// Initial load
updateMapTheme(htmlElement.getAttribute("data-theme"));

// Update on toggle
const originalToggle = toggleTheme;
toggleTheme = function () {
    originalToggle();

    const newTheme = htmlElement.getAttribute("data-theme");

    updateMapTheme(newTheme);
    

    // Reload particles with new theme
    tsParticles.domItem(0)?.destroy();

    tsParticles.load(
        "particles-js",
        getParticleConfig(newTheme)
    );

// Swap logo based on theme
const logoImg = document.querySelector(".logo-img");

if (logoImg) {
    logoImg.src =
        htmlElement.getAttribute("data-theme") === "dark"
            ? "assets/logo/logo.svg"
            : "assets/logo/logo.svg";
}    
};


document.addEventListener("DOMContentLoaded", () => {
    const logoImg = document.querySelector(".logo-img");
    if (!logoImg) return;

    logoImg.src =
        htmlElement.getAttribute("data-theme") === "dark"
            ? "assets/logo/logo.svg"
            : "assets/logo/logo.svg";
});




// ================= SCROLL-AWARE NAVBAR =================

const header = document.getElementById("site-header");

window.addEventListener("scroll", () => {
    if (window.scrollY > 20) {
        header.classList.add("scrolled");
    } else {
        header.classList.remove("scrolled");
    }
});

// -------------------- BUTTON EVENT LISTENER --------------------

if (themeToggleBtn) {
    themeToggleBtn.addEventListener("click", toggleTheme);
}

// -------------------- SET INITIAL ICON --------------------

const activeTheme = htmlElement.getAttribute("data-theme");

if (themeToggleBtn) {
    themeToggleBtn.textContent = activeTheme === "dark" ? "☀️" : "🌙";
}

// -------------------- PORTFOLIO FILTER --------------------

const filterButtons = document.querySelectorAll('.filter-btn');
const portfolioItems = document.querySelectorAll('.portfolio-grid > div');

filterButtons.forEach(button => {
    button.addEventListener('click', () => {
        filterButtons.forEach(btn => btn.classList.remove('active'));
        button.classList.add('active');

        const filter = button.dataset.filter;

        portfolioItems.forEach(item => {
            const category = item.dataset.category;

            if (filter === 'all' || filter === category) {
                item.style.display = 'block';
            } else {
                item.style.display = 'none';
            }
        });
    });
});

// -------------------- CONTACT FORM VALIDATION SCRIPT --------------------

const contactForm = document.getElementById('contactForm');
const successMsg = document.getElementById('formSuccess');

if (contactForm) {
    contactForm.addEventListener('submit', async function (e) {
        e.preventDefault();

        let valid = true;
        const fields = contactForm.querySelectorAll('input, textarea');

        fields.forEach(field => {
            const error = field.nextElementSibling;
            if (!field.value.trim()) {
                error.textContent = 'This field is required';
                valid = false;
            } else {
                error.textContent = '';
            }
        });

        if (!valid) return;

        try {
            const formData = new FormData(contactForm);

            const response = await fetch(contactForm.action, {
                method: 'POST',
                body: formData
            });

            const result = await response.text();

            if (result.trim() === 'SUCCESS') {
                successMsg.style.display = 'block';
                contactForm.reset();
            } else {
                alert('Failed to send message. Please try again.');
            }
        } catch (error) {
            alert('Server error. Please try later.');
        }
    });
}


/* ================= FAQ ACCORDION ================= */

const faqItems = document.querySelectorAll(".faq-item");

faqItems.forEach(item => {
    const question = item.querySelector(".faq-question");

    question.addEventListener("click", () => {
        const isOpen = item.classList.contains("open");

        // Close all FAQs
        faqItems.forEach(i => i.classList.remove("open"));

        // Open current if it was closed
        if (!isOpen) {
            item.classList.add("open");
        }
    });
});

/* ================= SCROLL REVEAL ================= */

const revealElements = document.querySelectorAll(".reveal");

const revealObserver = new IntersectionObserver(
    entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("visible");
                revealObserver.unobserve(entry.target);
            }
        });
    },
    {
        threshold: 0.15
    }
);

revealElements.forEach(el => revealObserver.observe(el));


/* ================= MOBILE NAVBAR TOGGLE ================= */

const navToggle = document.querySelector('.nav-toggle');
const navbar = document.querySelector('.navbar');

const overlay = document.querySelector('.nav-overlay');

if (navToggle && navbar) {
    navToggle.addEventListener('click', () => {
    const isOpen = navbar.classList.toggle('active');

    navToggle.setAttribute('aria-expanded', isOpen);
    overlay.classList.toggle('active', isOpen);
    document.body.style.overflow = isOpen ? 'hidden' : '';
});



const navLinks = document.querySelectorAll('.nav-item');

navLinks.forEach(link => {
    link.addEventListener('click', () => {
        if (window.innerWidth <= 992) {
    navbar.classList.remove('active');
    overlay.classList.remove('active');
    navToggle.setAttribute('aria-expanded', false);
    document.body.style.overflow = '';
}
    });
});
}

if (overlay) {
    overlay.addEventListener('click', () => {
        navbar.classList.remove('active');
        overlay.classList.remove('active');
        navToggle.setAttribute('aria-expanded', false);
        document.body.style.overflow = '';
    });
}

/* ================= PARTICLE BACKGROUND (THEME AWARE) ================= */

function getParticleConfig(theme) {
    const isDark = theme === "dark";

    return {
        background: {
            color: { value: "transparent" }
        },
        fpsLimit: 60,

interactivity: {
                events: {
                    onHover: {
                        enable: !window.matchMedia("(pointer: coarse)").matches,
                        mode: "repulse"
                    }
                },
                modes: {
                    repulse: {
                        distance: 90,
                        duration: 0.3
                    }
                }
            },

        particles: {
            number: {
                value: 45,
                density: {
                    enable: true,
                    area: 900
                }
            },
            color: {
                value: isDark ? "#9ecbff" : "#0b5ed7"
            },
            opacity: {
                value: isDark ? 0.70 : 0.70
            },
            size: {
                value: { min: 1, max: 3 }
            },
            move: {
                enable: true,
                speed: 0.5,
                direction: "none",
                outModes: "out"
            },
            links: {
                enable: true,
                distance: 130,
                color: isDark ? "#9ecbff" : "#0b5ed7",
                opacity: isDark ? 0.70 : 0.70,
                width: 1
            },
        },
        detectRetina: true
    };
}

/* ---------- INITIAL LOAD ---------- */

const initialTheme = htmlElement.getAttribute("data-theme");

tsParticles.load(
    "particles-js",
    getParticleConfig(initialTheme)
);

/* ---------- ACCESSIBILITY ---------- */

if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    tsParticles.domItem(0)?.destroy();
}
