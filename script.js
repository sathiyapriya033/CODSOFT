/**
 * DEVELOPER PORTFOLIO - JAVASCRIPT
 * This script handles interactivity: responsive navigation, header style changes on scroll,
 * active navigation highlighting, and contact form validation.
 */

document.addEventListener('DOMContentLoaded', () => {

    // ==========================================
    // 1. SELECTING DOM ELEMENTS
    // ==========================================
    const header = document.querySelector('.navbar-header');
    const navToggle = document.getElementById('navToggle');
    const navMenu = document.getElementById('navMenu');
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('section');
    const contactForm = document.getElementById('contactForm');
    const formStatus = document.getElementById('formStatus');

    // ==========================================
    // 2. MOBILE NAVIGATION MENU TOGGLE
    // ==========================================
    // Toggles mobile menu view when hamburger button is clicked
    if (navToggle && navMenu) {
        navToggle.addEventListener('click', () => {
            navMenu.classList.toggle('active');
            
            // Toggle hamburger icon between menu bars and "X" close mark
            const icon = navToggle.querySelector('i');
            if (navMenu.classList.contains('active')) {
                icon.className = 'fa-solid fa-xmark';
            } else {
                icon.className = 'fa-solid fa-bars';
            }
        });
    }

    // Close the mobile menu automatically when a navigation link is clicked
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (navMenu.classList.contains('active')) {
                navMenu.classList.remove('active');
                const icon = navToggle.querySelector('i');
                icon.className = 'fa-solid fa-bars';
            }
        });
    });

    // ==========================================
    // 3. HEADER STYLE CHANGE ON SCROLL
    // ==========================================
    // Adds a background blur and shadow to header after scrolling down
    const handleHeaderScroll = () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    };
    
    // Listen to window scroll events
    window.addEventListener('scroll', handleHeaderScroll);
    // Run once on load to verify initial scroll status
    handleHeaderScroll();

    // ==========================================
    // 4. ACTIVE NAVIGATION LINK ON SCROLL (ScrollSpy)
    // ==========================================
    // Tracks current scroll position to highlight corresponding link in Navbar
    const highlightActiveLink = () => {
        let currentSectionId = 'home'; // Default
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 100; // Offset accounts for fixed navbar height
            const sectionHeight = section.offsetHeight;
            const scrollPos = window.scrollY;

            if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
                currentSectionId = section.getAttribute('id');
            }
        });

        // Loop through navigation links and set 'active' on matching section
        navLinks.forEach(link => {
            link.classList.remove('active');
            const hrefAttr = link.getAttribute('href');
            if (hrefAttr === `#${currentSectionId}`) {
                link.classList.add('active');
            }
        });
    };

    window.addEventListener('scroll', highlightActiveLink);
    // Run once on load to set initial active class
    highlightActiveLink();

    // ==========================================
    // 5. CONTACT FORM VALIDATION
    // ==========================================
    if (contactForm) {
        contactForm.addEventListener('submit', (event) => {
            // Prevent default form action (prevent reloading the page)
            event.preventDefault();

            // Clear previous form status messages
            formStatus.className = 'form-status';
            formStatus.textContent = '';
            formStatus.style.display = 'none';

            // Retrieve input fields
            const nameInput = document.getElementById('name');
            const emailInput = document.getElementById('email');
            const messageInput = document.getElementById('message');

            // Flag to track form validity
            let isFormValid = true;

            // Define Email Regular Expression for syntax validation
            const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

            // Validate Name Field
            if (nameInput.value.trim() === '') {
                nameInput.parentElement.classList.add('invalid');
                isFormValid = false;
            } else {
                nameInput.parentElement.classList.remove('invalid');
            }

            // Validate Email Field (Syntax and Presence Check)
            if (emailInput.value.trim() === '') {
                emailInput.parentElement.classList.add('invalid');
                isFormValid = false;
            } else if (!emailPattern.test(emailInput.value.trim())) {
                emailInput.parentElement.classList.add('invalid');
                // Customize error text slightly if email matches syntax pattern failure
                document.getElementById('emailError').textContent = 'Please enter a valid email address';
                isFormValid = false;
            } else {
                emailInput.parentElement.classList.remove('invalid');
            }

            // Validate Message Field
            if (messageInput.value.trim() === '') {
                messageInput.parentElement.classList.add('invalid');
                isFormValid = false;
            } else {
                messageInput.parentElement.classList.remove('invalid');
            }

            // Display overall feedback based on validation results
            if (isFormValid) {
                // Display success message
                formStatus.textContent = 'Thank you! Your message has been sent successfully.';
                formStatus.classList.add('success');
                formStatus.style.display = 'block';

                // Reset form inputs
                contactForm.reset();

                // Clear input invalid styling states
                nameInput.parentElement.classList.remove('invalid');
                emailInput.parentElement.classList.remove('invalid');
                messageInput.parentElement.classList.remove('invalid');
            } else {
                // Display error message
                formStatus.textContent = 'Please correct the errors in the form before submitting.';
                formStatus.classList.add('error');
                formStatus.style.display = 'block';
            }
        });

        // Add real-time input change checks to remove error borders as user types
        const inputs = contactForm.querySelectorAll('input, textarea');
        inputs.forEach(input => {
            input.addEventListener('input', () => {
                if (input.value.trim() !== '') {
                    input.parentElement.classList.remove('invalid');
                }
            });
        });
    }
});