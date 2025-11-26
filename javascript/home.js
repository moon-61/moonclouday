document.addEventListener('DOMContentLoaded', function() {
    // Inicializar AOS (Animate On Scroll)
    AOS.init({
        duration: 800,
        easing: 'ease-in-out',
        once: true,
        offset: 100
    });

    // Ensure favicon on Home page
    (function ensureFavicon() {
        if (!document.querySelector('link[rel*="icon"]')) {
            const link = document.createElement('link');
            link.rel = 'icon';
            link.type = 'image/png';
            link.href = '/img/stickers_blog/star.png';
            link.sizes = '32x32';
            document.head.appendChild(link);
        }
    })();

    // Normalize document title occurrences to "Moon Clouday"
    (function normalizeTitle() {
        if (document.title) {
            document.title = document.title.replace(/moon\s*clouds?y?/ig, 'Moon Clouday').replace(/cloudsy/ig, 'Clouday');
        }
    })();

    // Replace visible occurrences of Cloudsy -> Clouday (text nodes and image alts)
    (function normalizeBrandingText() {
        // Update image alt attributes
        document.querySelectorAll('img[alt]').forEach(img => {
            if (img.alt) img.alt = img.alt.replace(/Cloudsy/gi, 'Clouday');
        });
        // Replace in text nodes
        const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT, null);
        const toChange = [];
        let node;
        while ((node = walker.nextNode())) {
            if (node.nodeValue && /Cloudsy/i.test(node.nodeValue)) {
                toChange.push(node);
            }
        }
        toChange.forEach(n => {
            n.nodeValue = n.nodeValue.replace(/Cloudsy/gi, 'Clouday');
        });
    })();
    
    // Smooth scroll para los links de navegación
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            if (href !== '#' && href.length > 1) {
                e.preventDefault();
                const target = document.querySelector(href);
                
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                    
                    // Cerrar el navbar en móvil después de hacer click
                    const navbarCollapse = document.querySelector('.navbar-collapse');
                    if (navbarCollapse && navbarCollapse.classList.contains('show')) {
                        const bsCollapse = new bootstrap.Collapse(navbarCollapse);
                        bsCollapse.hide();
                    }
                }
            }
        });
    });
    
    // Cerrar navbar automáticamente al hacer click fuera en móvil
    document.addEventListener('click', function(e) {
        const navbar = document.querySelector('.navbar-collapse');
        const toggler = document.querySelector('.navbar-toggler');
        
        if (navbar && navbar.classList.contains('show')) {
            if (!navbar.contains(e.target) && !toggler.contains(e.target)) {
                const bsCollapse = new bootstrap.Collapse(navbar);
                bsCollapse.hide();
            }
        }
    });
    // Language Selector
const langBtn = document.getElementById('langBtn');
const langDropdown = document.getElementById('langDropdown');

if (langBtn && langDropdown) {
    langBtn.addEventListener('click', function(e) {
        e.stopPropagation();
        langDropdown.classList.toggle('active');
    });

    document.addEventListener('click', function(e) {
        if (!langBtn.contains(e.target) && !langDropdown.contains(e.target)) {
            langDropdown.classList.remove('active');
        }
    });
}
    // Efecto parallax suave en las imágenes (respetando motion preferences)
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (!prefersReducedMotion.matches) {
        let lastScrollTop = 0;
        window.addEventListener('scroll', function() {
            const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
            
            // Hero image parallax
            const heroImage = document.querySelector('.hero-main-image');
            if (heroImage) {
                const speed = 0.5;
                const yPos = -(scrollTop * speed);
                heroImage.style.transform = `translateY(${yPos}px) scale(1.05)`;
            }
            
            // Illustration parallax
            const illustration = document.querySelector('.illustration-image');
            if (illustration) {
                const speed = 0.3;
                const yPos = -(scrollTop * speed);
                illustration.style.transform = `translateY(${yPos}px)`;
            }
            
            lastScrollTop = scrollTop;
        });
    }
    
    // Efecto 3D en la tarjeta About Me
    const aboutCard = document.querySelector('.about-card-modern');
    
    if (aboutCard) {
        aboutCard.addEventListener('mousemove', function(e) {
            const rect = aboutCard.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const rotateX = (y - centerY) / 30;
            const rotateY = (centerX - x) / 30;
            
            aboutCard.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-10px)`;
        });
        
        aboutCard.addEventListener('mouseleave', function() {
            aboutCard.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateY(0)';
        });
    }
    
    // Animación de hover mejorada para las feature cards
    const featureCards = document.querySelectorAll('.feature-card');
    
    featureCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            // Añadir efecto de escala al icono
            const icon = this.querySelector('.card-icon');
            if (icon) {
                icon.style.transform = 'rotate(360deg) scale(1.1)';
            }
        });
        
        card.addEventListener('mouseleave', function() {
            const icon = this.querySelector('.card-icon');
            if (icon) {
                icon.style.transform = 'rotate(0deg) scale(1)';
            }
        });
    });
    
    // Efecto hover para la imagen de ilustración
    const illustrationImage = document.querySelector('.illustration-image');
    
    if (illustrationImage) {
        illustrationImage.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.05) rotate(2deg)';
        });
        
        illustrationImage.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1) rotate(0deg)';
        });
    }
    
    // Contador animado (opcional - para estadísticas futuras)
    function animateCounter(element, target, duration = 2000) {
        let start = 0;
        const increment = target / (duration / 16);
        
        const timer = setInterval(() => {
            start += increment;
            if (start >= target) {
                element.textContent = Math.floor(target);
                clearInterval(timer);
            } else {
                element.textContent = Math.floor(start);
            }
        }, 16);
    }
    
    // Newsletter form submission
    const newsletterForm = document.querySelector('.newsletter-form');
    
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const emailInput = this.querySelector('input[type="email"]');
            const submitBtn = this.querySelector('.btn-newsletter');
            
            if (emailInput.value) {
                // Cambiar el texto del botón
                const originalHTML = submitBtn.innerHTML;
                submitBtn.innerHTML = '<span class="spinner-border spinner-border-sm me-2"></span>Enviando...';
                submitBtn.disabled = true;
                
                // Simular envío (aquí puedes integrar con tu backend)
                setTimeout(() => {
                    submitBtn.innerHTML = '<i class="bi bi-check-circle-fill me-2"></i>Inscrito!';
                    submitBtn.style.background = '#28a745';
                    
                    // Limpiar el formulario
                    emailInput.value = '';
                    
                    // Restaurar el botón después de 3 segundos
                    setTimeout(() => {
                        submitBtn.innerHTML = originalHTML;
                        submitBtn.style.background = '';
                        submitBtn.disabled = false;
                    }, 3000);
                }, 1500);
            }
        });
    }
    
    // Añadir efecto de escritura al título hero (opcional)
    const heroTitle = document.querySelector('.hero-title h1');
    
    if (heroTitle) {
        const text = heroTitle.textContent;
        const prefersReducedMotionTW = window.matchMedia('(prefers-reduced-motion: reduce)');
        if (prefersReducedMotionTW.matches) {
            heroTitle.textContent = text;
            heroTitle.style.opacity = '1';
        } else {
            heroTitle.textContent = '';
            heroTitle.style.opacity = '1';
            let index = 0;
            function typeWriter() {
                if (index < text.length) {
                    heroTitle.textContent += text.charAt(index);
                    index++;
                    setTimeout(typeWriter, 50);
                }
            }
            setTimeout(typeWriter, 500);
        }
    }
    
    // Detectar si el usuario está en la parte superior de la página
    window.addEventListener('scroll', function() {
        const navbar = document.querySelector('.custom-navbar');
        
        if (window.scrollY > 100) {
            navbar.style.boxShadow = '0 8px 20px rgba(0, 0, 0, 0.15)';
        } else {
            navbar.style.boxShadow = '0 4px 15px rgba(0, 0, 0, 0.1)';
        }
    });
    
    // Intersection Observer para animaciones adicionales
    const observerOptions = {
        threshold: 0.2,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                
                // Si es un contador, iniciarlo
                if (entry.target.hasAttribute('data-count')) {
                    const target = parseInt(entry.target.getAttribute('data-count'));
                    animateCounter(entry.target, target);
                }
                
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    // Observar elementos con clase 'animate-on-scroll'
    document.querySelectorAll('.animate-on-scroll').forEach(elem => {
        observer.observe(elem);
    });
    
    // Efecto de partículas eliminado por usabilidad y performance
    
    // Log de bienvenida en consola
    console.log('%c🎨 Bem-vindo ao Moon Cloudsy! ', 'background: linear-gradient(135deg, #B882D9, #A3CFD9); color: white; padding: 10px 20px; border-radius: 5px; font-size: 16px; font-weight: bold;');
    console.log('%cDesigner em formação | PUC-SP', 'color: #FF9933; font-size: 12px;');
    
});