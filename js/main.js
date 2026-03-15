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

// Add cyclic click listener to theme switcher container (more robust for mobile)
const themeSwitcher = document.querySelector('.theme-switcher');
const themeCycle = ['light', 'dark', 'system'];

if (themeSwitcher) {
    themeSwitcher.addEventListener('click', (e) => {
        e.preventDefault();
        const currentTheme = localStorage.getItem('theme-preference') || 'system';
        let currentIndex = themeCycle.indexOf(currentTheme);
        if (currentIndex === -1) currentIndex = 2; // Default to system if corrupted
        
        const nextIndex = (currentIndex + 1) % themeCycle.length;
        const nextTheme = themeCycle[nextIndex];
        
        setTheme(nextTheme);
    });
}

// GDPR Cookie Banner Logic
document.addEventListener('DOMContentLoaded', () => {
    const cookieBanner = document.createElement('div');
    cookieBanner.id = 'cookieBanner';
    cookieBanner.className = 'cookie-banner';
    cookieBanner.innerHTML = `
        <button id="closeCookieBanner" class="cookie-close" aria-label="Chiudi e rifiuta">&times;</button>
        <div class="cookie-content">
            <h4>Informativa sui Cookie</h4>
            <p>Questo sito utilizza cookie tecnici per garantirti la migliore esperienza di navigazione. Puoi scegliere di accettare tutti i cookie, rifiutarli o proseguire con quelli necessari. Consulta la nostra <a href="cookies.html">Cookie Policy</a> per maggiori dettagli.</p>
            <div class="cookie-buttons">
                <button id="acceptCookies" class="btn btn-cookie-accept">Accetta Tutti</button>
                <button id="minimalCookies" class="btn btn-cookie-minimal">Solo Necessari</button>
                <button id="rejectCookies" class="btn btn-cookie-reject">Rifiuta</button>
            </div>
        </div>
    `;
    document.body.appendChild(cookieBanner);

    const hasSetPreference = localStorage.getItem('cookie-consent');

    if (!hasSetPreference) {
        setTimeout(() => {
            cookieBanner.classList.add('show');
        }, 1000);
    }

    const handleConsent = (preference) => {
        localStorage.setItem('cookie-consent', preference);
        cookieBanner.classList.remove('show');
    };

    document.getElementById('acceptCookies')?.addEventListener('click', () => handleConsent('accepted'));
    document.getElementById('minimalCookies')?.addEventListener('click', () => handleConsent('minimal'));
    document.getElementById('rejectCookies')?.addEventListener('click', () => handleConsent('rejected'));
    document.getElementById('closeCookieBanner')?.addEventListener('click', () => handleConsent('rejected'));
});

// Form Handling (AJAX)
document.addEventListener('DOMContentLoaded', () => {
    const contactForm = document.getElementById('contact-form');
    if (!contactForm) return;

    const status = document.getElementById('form-status');
    const submitBtn = document.getElementById('submit-btn');

    contactForm.addEventListener('submit', async (event) => {
        event.preventDefault();
        
        // Disable button and show loading state
        submitBtn.disabled = true;
        const originalBtnText = submitBtn.textContent;
        submitBtn.textContent = 'Invio in corso...';
        
        const data = new FormData(event.target);
        
        // Rimuoviamo il consenso dalla mail (è già validato lato client)
        // per rendere l'email più pulita
        data.delete('privacy-consent');
        
        try {
            const response = await fetch(event.target.action, {
                method: contactForm.method,
                body: data,
                headers: {
                    'Accept': 'application/json'
                }
            });

            if (response.ok) {
                status.innerHTML = "Grazie! Il tuo messaggio è stato inviato correttamente.";
                status.className = "form-status success show";
                contactForm.reset();
            } else {
                let message = "Si è verificato un errore durante l'invio. Riprova più tardi.";
                try {
                    const result = await response.json();
                    if (result && result.errors) {
                        message = result.errors.map(error => error.message).join(", ");
                    }
                } catch (e) {
                    // Se non è JSON, manteniamo il messaggio di default
                }
                status.innerHTML = message;
                status.className = "form-status error show";
            }
        } catch (error) {
            status.innerHTML = "Ops! Si è verificato un errore di connessione. Controlla la tua rete.";
            status.className = "form-status error show";
        } finally {
            submitBtn.disabled = false;
            submitBtn.textContent = originalBtnText;
            
            // Auto-hide status message after 5 seconds
            setTimeout(() => {
                status.classList.remove('show');
            }, 5000);
        }
    });
});

