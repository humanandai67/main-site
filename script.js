// ================================================
// HUMAN AND AI STUDIOS — Landing Page Scripts
// ================================================

document.addEventListener('DOMContentLoaded', () => {

    // --- Navigation scroll effect ---
    const nav = document.getElementById('nav');
    let lastScroll = 0;

    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;
        if (currentScroll > 50) {
            nav.classList.add('scrolled');
        } else {
            nav.classList.remove('scrolled');
        }
        lastScroll = currentScroll;
    });

    // --- Mobile menu toggle ---
    const navToggle = document.getElementById('navToggle');
    const navLinks = document.getElementById('navLinks');

    navToggle.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        const spans = navToggle.querySelectorAll('span');
        if (navLinks.classList.contains('active')) {
            spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
            spans[1].style.opacity = '0';
            spans[2].style.transform = 'rotate(-45deg) translate(5px, -5px)';
        } else {
            spans[0].style.transform = '';
            spans[1].style.opacity = '';
            spans[2].style.transform = '';
        }
    });

    // Close mobile menu on link click
    navLinks.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('active');
            const spans = navToggle.querySelectorAll('span');
            spans[0].style.transform = '';
            spans[1].style.opacity = '';
            spans[2].style.transform = '';
        });
    });

    // --- Smooth scroll for anchor links ---
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const offset = 80;
                const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - offset;
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // --- Scroll reveal animations ---
    const revealElements = document.querySelectorAll(
        '.service-card, .process-step, .about-content, .about-visual, ' +
        '.youtube-card, .contact-info, .contact-form-wrapper, .section-header'
    );

    revealElements.forEach(el => el.classList.add('reveal'));

    const revealObserver = new IntersectionObserver(
        (entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    revealObserver.unobserve(entry.target);
                }
            });
        },
        { threshold: 0.15, rootMargin: '0px 0px -40px 0px' }
    );

    revealElements.forEach(el => revealObserver.observe(el));

    // --- Contact form handler ---
    const contactForm = document.getElementById('contactForm');
    contactForm.addEventListener('submit', function (e) {
        e.preventDefault();

        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const message = document.getElementById('message').value;

        // Create mailto link as fallback (no backend needed)
        const subject = encodeURIComponent(`New inquiry from ${name}`);
        const body = encodeURIComponent(
            `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`
        );
        window.location.href = `mailto:humanandai67@gmail.com?subject=${subject}&body=${body}`;

        // Show success state
        const btn = contactForm.querySelector('button[type="submit"]');
        const originalContent = btn.innerHTML;
        btn.innerHTML = '✓ Opening email client...';
        btn.style.opacity = '0.7';
        btn.disabled = true;

        setTimeout(() => {
            btn.innerHTML = originalContent;
            btn.style.opacity = '';
            btn.disabled = false;
        }, 3000);
    });

});
