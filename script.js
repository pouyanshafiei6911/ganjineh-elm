document.addEventListener("DOMContentLoaded", () => {
    /* ========================================
       Mobile Menu
    ======================================== */

    const menuToggle = document.querySelector(".menu-toggle");
    const mobileNav = document.querySelector(".mobile-nav");

    if (menuToggle && mobileNav) {
        menuToggle.addEventListener("click", () => {
            const isOpen = mobileNav.classList.toggle("active");

            menuToggle.setAttribute("aria-expanded", isOpen);
            menuToggle.classList.toggle("active", isOpen);
        });

        const mobileLinks = mobileNav.querySelectorAll("a");

        mobileLinks.forEach((link) => {
            link.addEventListener("click", () => {
                mobileNav.classList.remove("active");
                menuToggle.classList.remove("active");
                menuToggle.setAttribute("aria-expanded", "false");
            });
        });
    }

    /* ========================================
       Smooth Scroll
    ======================================== */

    const anchorLinks = document.querySelectorAll('a[href^="#"]');

    anchorLinks.forEach((link) => {
        link.addEventListener("click", (event) => {
            const targetId = link.getAttribute("href");

            if (!targetId || targetId === "#") {
                return;
            }

            const targetElement = document.querySelector(targetId);

            if (targetElement) {
                event.preventDefault();

                targetElement.scrollIntoView({
                    behavior: "smooth",
                    block: "start"
                });
            }
        });
    });

    /* ========================================
       Back To Top Button
    ======================================== */

    const backToTop = document.querySelector(".back-to-top");

    if (backToTop) {
        window.addEventListener("scroll", () => {
            if (window.scrollY > 500) {
                backToTop.classList.add("show");
            } else {
                backToTop.classList.remove("show");
            }
        });

        backToTop.addEventListener("click", () => {
            window.scrollTo({
                top: 0,
                behavior: "smooth"
            });
        });
    }

    /* ========================================
       Header Scroll Effect
    ======================================== */

    const header = document.querySelector(".site-header");

    if (header) {
        window.addEventListener("scroll", () => {
            if (window.scrollY > 50) {
                header.classList.add("scrolled");
            } else {
                header.classList.remove("scrolled");
            }
        });
    }

    /* ========================================
       Reveal Animations
    ======================================== */

    const revealElements = document.querySelectorAll(
        ".section-header, .about-content, .about-image, .feature-card, .stat-card, .news-card, .gallery-item, .staff-card, .contact-card, .contact-form"
    );

    if ("IntersectionObserver" in window && revealElements.length > 0) {
        const revealObserver = new IntersectionObserver(
            (entries, observer) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add("revealed");
                        observer.unobserve(entry.target);
                    }
                });
            },
            {
                threshold: 0.12
            }
        );

        revealElements.forEach((element) => {
            element.classList.add("reveal");
            revealObserver.observe(element);
        });
    }

    /* ========================================
       Statistics Counter
    ======================================== */

    const counters = document.querySelectorAll(".counter");

    const animateCounter = (counter) => {
        const target = Number(counter.dataset.target || 0);
        const duration = 1600;
        const startTime = performance.now();

        const updateCounter = (currentTime) => {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);

            const easedProgress = 1 - Math.pow(1 - progress, 3);
            const currentValue = Math.floor(target * easedProgress);

            counter.textContent = currentValue.toLocaleString("fa-IR");

            if (progress < 1) {
                requestAnimationFrame(updateCounter);
            } else {
                counter.textContent = target.toLocaleString("fa-IR");
            }
        };

        requestAnimationFrame(updateCounter);
    };

    if ("IntersectionObserver" in window && counters.length > 0) {
        const counterObserver = new IntersectionObserver(
            (entries, observer) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        animateCounter(entry.target);
                        observer.unobserve(entry.target);
                    }
                });
            },
            {
                threshold: 0.5
            }
        );

        counters.forEach((counter) => {
            counterObserver.observe(counter);
        });
    }

    /* ========================================
       Contact Form
    ======================================== */

    const contactForm = document.querySelector(".contact-form");

    if (contactForm) {
        contactForm.addEventListener("submit", (event) => {
            event.preventDefault();

            const submitButton = contactForm.querySelector(
                'button[type="submit"]'
            );

            if (!submitButton) {
                return;
            }

            const originalText = submitButton.textContent;

            submitButton.textContent = "پیام شما ثبت شد ✓";
            submitButton.disabled = true;

            setTimeout(() => {
                contactForm.reset();
                submitButton.textContent = originalText;
                submitButton.disabled = false;
            }, 2500);
        });
    }

    /* ========================================
       Current Year
    ======================================== */

    const yearElement = document.querySelector("#current-year");

    if (yearElement) {
        yearElement.textContent = new Date().getFullYear();
    }

    /* ========================================
       Page Loaded
    ======================================== */

    document.body.classList.add("page-loaded");
});

/* ========================================
   Mobile Menu Fix
======================================== */

const mobileMenuButton = document.getElementById("mobileMenuButton");
const mobileNavigation = document.getElementById("mobileNavigation");

if (mobileMenuButton && mobileNavigation) {
    mobileMenuButton.onclick = function () {
        mobileNavigation.classList.toggle("active");

        const isOpen = mobileNavigation.classList.contains("active");

        mobileMenuButton.setAttribute(
            "aria-expanded",
            isOpen ? "true" : "false"
        );

        const icon = mobileMenuButton.querySelector("i");

        if (icon) {
            if (isOpen) {
                icon.classList.remove("fa-bars");
                icon.classList.add("fa-xmark");
            } else {
                icon.classList.remove("fa-xmark");
                icon.classList.add("fa-bars");
            }
        }
    };

    const mobileMenuLinks =
        mobileNavigation.querySelectorAll(".mobile-nav-link");

    mobileMenuLinks.forEach(function (link) {
        link.onclick = function () {
            mobileNavigation.classList.remove("active");

            mobileMenuButton.setAttribute(
                "aria-expanded",
                "false"
            );

            const icon = mobileMenuButton.querySelector("i");

            if (icon) {
                icon.classList.remove("fa-xmark");
                icon.classList.add("fa-bars");
            }
        };
    });
}