// Smooth scrolling per i link di navigazione
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
            // Chiudi menu mobile se aperto
            document.getElementById('navMenu')?.classList.remove('active');
        }
    });
});

// Menu mobile toggle
const navToggle = document.getElementById('navToggle');
const navMenu = document.getElementById('navMenu');

if (navToggle && navMenu) {
    navToggle.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        if (!navMenu.classList.contains('active')) {
            navMenu.querySelectorAll('.has-submenu').forEach(item => {
                item.classList.remove('submenu-open');
                const toggle = item.querySelector('.submenu-toggle');
                if (toggle) {
                    toggle.setAttribute('aria-expanded', 'false');
                }
            });
        }
    });
}

// Submenu toggle (mobile + click)
document.querySelectorAll('.submenu-toggle').forEach(toggle => {
    toggle.addEventListener('click', () => {
        const parent = toggle.closest('.has-submenu');
        if (!parent) {
            return;
        }
        const isOpen = parent.classList.toggle('submenu-open');
        toggle.setAttribute('aria-expanded', String(isOpen));
    });
});

// Chiudi menu mobile dopo click su un link
document.querySelectorAll('.nav-menu a').forEach(link => {
    link.addEventListener('click', () => {
        navMenu?.classList.remove('active');
    });
});

// Theme Management
const themeBtns = document.querySelectorAll('.theme-btn');
const root = document.documentElement;

function setTheme(theme) {
    if (theme === 'system') {
        const isDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        root.setAttribute('data-theme', isDark ? 'dark' : 'light');
    } else {
        root.setAttribute('data-theme', theme);
    }
    
    // Update active class on buttons
    themeBtns.forEach(btn => {
        btn.classList.toggle('active', btn.dataset.theme === theme);
    });
    
    // Save preference
    localStorage.setItem('theme-preference', theme);
}

// Initial theme setup
const savedTheme = localStorage.getItem('theme-preference') || 'system';
setTheme(savedTheme);

// Listen for system theme changes if set to system
window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
    if (localStorage.getItem('theme-preference') === 'system') {
        root.setAttribute('data-theme', e.matches ? 'dark' : 'light');
    }
});

// Add click listeners to theme buttons
themeBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        setTheme(btn.dataset.theme);
    });
});
