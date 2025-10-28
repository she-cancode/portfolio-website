fetch('navbar.html').then(response => response.text()).then(data => {
    document.getElementById('navbar').innerHTML = data;
    
    // Initialize hamburger menu after navbar is loaded
    initializeHamburgerMenu();
})
.catch(error => console.error('Error loading navbar:', error));

function initializeHamburgerMenu() {
    const navToggle = document.querySelector('.nav-toggle');
    const navLinks = document.querySelector('.nav-links');
    const navLinkItems = document.querySelectorAll('.nav-links a');
    
    if (!navToggle || !navLinks) return;
    
    // Toggle mobile menu
    navToggle.addEventListener('click', () => {
        const isExpanded = navToggle.getAttribute('aria-expanded') === 'true';
        
        navToggle.setAttribute('aria-expanded', !isExpanded);
        navToggle.classList.toggle('active');
        navLinks.classList.toggle('active');
        
        // Prevent body scroll when menu is open
        document.body.style.overflow = navLinks.classList.contains('active') ? 'hidden' : '';
    });
    
    // Close menu when clicking on a link
    navLinkItems.forEach(link => {
        link.addEventListener('click', () => {
            navToggle.classList.remove('active');
            navLinks.classList.remove('active');
            navToggle.setAttribute('aria-expanded', 'false');
            document.body.style.overflow = '';
        });
    });
    
    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
        if (!navToggle.contains(e.target) && !navLinks.contains(e.target)) {
            navToggle.classList.remove('active');
            navLinks.classList.remove('active');
            navToggle.setAttribute('aria-expanded', 'false');
            document.body.style.overflow = '';
        }
    });
    
    // Close menu on escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && navLinks.classList.contains('active')) {
            navToggle.classList.remove('active');
            navLinks.classList.remove('active');
            navToggle.setAttribute('aria-expanded', 'false');
            document.body.style.overflow = '';
        }
    });
    
    // Handle window resize
    window.addEventListener('resize', () => {
        if (window.innerWidth > 768) {
            navToggle.classList.remove('active');
            navLinks.classList.remove('active');
            navToggle.setAttribute('aria-expanded', 'false');
            document.body.style.overflow = '';
        }
    });
}