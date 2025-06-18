document.addEventListener('DOMContentLoaded', function() {

    // --- Smooth Scrolling for Navigation Links ---
    const navLinksForScroll = document.querySelectorAll('.main-nav a[href^="#"], .hero-buttons a[href^="#"], .my-approach-text a[href^="#"], .footer-links-column a[href^="#"], .logo[href^="#"]');
    navLinksForScroll.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            let targetId = this.getAttribute('href');
            // Special handling for modal triggers
            if (targetId.includes('-modal')) {
                openModal(targetId.substring(1)); // remove #
                return;
            }
            let targetElement = document.querySelector(targetId);
            if (targetElement) {
                const headerOffset = document.querySelector('.main-header').offsetHeight || 80;
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
                window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
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
        if (window.innerHeight + window.pageYOffset >= document.body.offsetHeight - 50) { 
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
    highlightNavLink(); 

    // --- Scroll-triggered Fade-in Animation ---
    const fadeInElements = document.querySelectorAll('.fade-in-element');
    const observerOptions = { root: null, rootMargin: '0px', threshold: 0.1 };
    const observer = new IntersectionObserver((entries, observerInstance) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                observerInstance.unobserve(entry.target);
            }
        });
    }, observerOptions);
    fadeInElements.forEach(element => { observer.observe(element); });

    // --- Modal Functionality ---
    const modalTriggers = document.querySelectorAll('.modal-trigger');
    const closeButtons = document.querySelectorAll('.modal .close-button');

    function openModal(modalId) {
        const modal = document.getElementById(modalId);
        if (modal) {
            modal.style.display = 'block';
        }
    }

    function closeModal(modal) {
        if (modal) {
            modal.style.display = 'none';
        }
    }

    modalTriggers.forEach(trigger => {
        trigger.addEventListener('click', function(e) {
            e.preventDefault();
            const modalId = this.getAttribute('data-modal-id');
            openModal(modalId);
        });
    });

    closeButtons.forEach(button => {
        button.addEventListener('click', function() {
            const modal = this.closest('.modal');
            closeModal(modal);
        });
    });

    // Close modal if backdrop is clicked
    window.addEventListener('click', function(event) {
        document.querySelectorAll('.modal').forEach(modal => {
            if (event.target == modal) {
                closeModal(modal);
            }
        });
    });
});