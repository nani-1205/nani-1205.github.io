document.addEventListener('DOMContentLoaded', function() {

    // --- Smooth Scrolling for Navigation Links ---
    const navLinksForScroll = document.querySelectorAll('.main-nav a[href^="#"], .hero-buttons a[href^="#"], .my-approach-text a[href^="#"], .footer-links-column a[href^="#"], .logo[href^="#"]');
    navLinksForScroll.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            let targetId = this.getAttribute('href');
            let targetElement = document.querySelector(targetId);
            if (targetElement) {
                // Calculate position considering sticky header
                const headerOffset = document.querySelector('.main-header').offsetHeight || 80;
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // --- Active Navigation Link on Scroll ---
    const sections = document.querySelectorAll('section[id]');
    const navLinksObserver = document.querySelectorAll('.main-nav a'); 

    function highlightNavLink() {
        let scrollY = window.pageYOffset;
        let currentSectionId = "";
        const headerOffsetForHighlight = (document.querySelector('.main-header').offsetHeight || 80) + 50;


        sections.forEach(current => {
            const sectionHeight = current.offsetHeight;
            const sectionTop = current.offsetTop - headerOffsetForHighlight; 

            if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
                currentSectionId = current.getAttribute('id');
            }
        });
        
        // Handle case for bottom of page where last section might not fill screen
        if (window.innerHeight + window.pageYOffset >= document.body.offsetHeight - 50) { // Check if near bottom
            const lastSection = sections[sections.length-1];
            if(lastSection) currentSectionId = lastSection.id;
        }


        navLinksObserver.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === '#' + currentSectionId) {
                link.classList.add('active');
            }
        });
    }
    window.addEventListener('scroll', highlightNavLink);
    highlightNavLink(); // Initial call


    // --- Scroll-triggered Fade-in Animation ---
    const fadeInElements = document.querySelectorAll('.fade-in-element');
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1 
    };

    const observer = new IntersectionObserver((entries, observerInstance) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                observerInstance.unobserve(entry.target);
            }
        });
    }, observerOptions);

    fadeInElements.forEach(element => {
        observer.observe(element);
    });

});