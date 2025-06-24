// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Get the current year for the footer copyright
    document.getElementById('current-year').textContent = new Date().getFullYear();

    // Theme toggling functionality
    const themeToggle = document.getElementById('theme-toggle');
    const themeIcon = themeToggle.querySelector('i');

    // Check if a user has a theme preference stored
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
        document.body.classList.add('dark-mode');
        themeIcon.classList.remove('fa-moon');
        themeIcon.classList.add('fa-sun');
    }

    // Toggle theme when button is clicked
    themeToggle.addEventListener('click', function() {
        document.body.classList.toggle('dark-mode');

        // Toggle icon
        if (document.body.classList.contains('dark-mode')) {
            themeIcon.classList.remove('fa-moon');
            themeIcon.classList.add('fa-sun');
            localStorage.setItem('theme', 'dark');
        } else {
            themeIcon.classList.remove('fa-sun');
            themeIcon.classList.add('fa-moon');
            localStorage.setItem('theme', 'light');
        }
    });

    // Mobile menu toggle
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const header = document.querySelector('header');

    mobileMenuBtn.addEventListener('click', function() {
        header.classList.toggle('mobile-menu-open');

        // Toggle menu icon
        const menuIcon = mobileMenuBtn.querySelector('i');
        if (header.classList.contains('mobile-menu-open')) {
            menuIcon.classList.remove('fa-bars');
            menuIcon.classList.add('fa-times');
        } else {
            menuIcon.classList.remove('fa-times');
            menuIcon.classList.add('fa-bars');
        }
    });

    // Close mobile menu when clicking a nav link
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            // Close the mobile menu regardless of target attribute
            header.classList.remove('mobile-menu-open');
            const menuIcon = mobileMenuBtn.querySelector('i');
            menuIcon.classList.remove('fa-times');
            menuIcon.classList.add('fa-bars');
        });
    });

    // Form submission handling
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        // Add a loading state to the form
        const submitBtn = contactForm.querySelector('button[type="submit"]');
        const originalBtnText = submitBtn.textContent;

        // Add a status message div after the form
        const statusDiv = document.createElement('div');
        statusDiv.className = 'form-status';
        statusDiv.style.marginTop = '1rem';
        statusDiv.style.padding = '0.75rem';
        statusDiv.style.borderRadius = '0.5rem';
        statusDiv.style.display = 'none';
        contactForm.parentNode.insertBefore(statusDiv, contactForm.nextSibling);

        contactForm.addEventListener('submit', function(event) {
            event.preventDefault();

            // Show loading state
            submitBtn.disabled = true;
            submitBtn.textContent = 'Sending...';
            statusDiv.style.display = 'none';

            // Get form values
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const subject = document.getElementById('subject').value;
            const message = document.getElementById('message').value;

            // Prepare template parameters for EmailJS
            const templateParams = {
                from_name: name,
                from_email: email,
                subject: subject,
                message: message
            };

            // Send email using EmailJS
            // Replace 'YOUR_SERVICE_ID' and 'YOUR_TEMPLATE_ID' with your actual EmailJS service and template IDs
            emailjs.send('YOUR_SERVICE_ID', 'YOUR_TEMPLATE_ID', templateParams)
                .then(function(response) {
                    console.log('Email sent successfully:', response);

                    // Show success message
                    statusDiv.textContent = 'Thanks for your message! I\'ll get back to you soon.';
                    statusDiv.style.backgroundColor = 'rgba(16, 185, 129, 0.1)';
                    statusDiv.style.color = '#10b981';
                    statusDiv.style.border = '1px solid rgba(16, 185, 129, 0.2)';
                    statusDiv.style.display = 'block';

                    // Reset the form
                    contactForm.reset();
                })
                .catch(function(error) {
                    console.error('Email sending failed:', error);

                    // Show error message
                    statusDiv.textContent = 'Sorry, there was a problem sending your message. Please try again later.';
                    statusDiv.style.backgroundColor = 'rgba(239, 68, 68, 0.1)';
                    statusDiv.style.color = '#ef4444';
                    statusDiv.style.border = '1px solid rgba(239, 68, 68, 0.2)';
                    statusDiv.style.display = 'block';
                })
                .finally(function() {
                    // Reset button state
                    submitBtn.disabled = false;
                    submitBtn.textContent = originalBtnText;
                });
        });
    }

    // Animation on scroll
    const animatedElements = document.querySelectorAll('.animate');

    // Initial check for elements in viewport
    checkAnimatedElements();

    // Check when scrolling
    window.addEventListener('scroll', checkAnimatedElements);

    function checkAnimatedElements() {
        animatedElements.forEach(element => {
            const elementPosition = element.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;

            if (elementPosition < windowHeight - 100) {
                element.style.opacity = '1';
            }
        });
    }

    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();

            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                window.scrollTo({
                    top: target.offsetTop - 70, // Adjust for header height
                    behavior: 'smooth'
                });
            }
        });
    });
});
