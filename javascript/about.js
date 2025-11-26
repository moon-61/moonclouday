document.addEventListener('DOMContentLoaded', function() {
    
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
                    if (navbarCollapse.classList.contains('show')) {
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
    
    // Animación de entrada para elementos
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const fadeInObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                fadeInObserver.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    // Aplicar animación a las tarjetas de info
    const infoCards = document.querySelectorAll('.info-card');
    infoCards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = `all 0.6s ease ${index * 0.1}s`;
        fadeInObserver.observe(card);
    });
    
    // Aplicar animación a los items de propósito
    const purposeItems = document.querySelectorAll('.purpose-item');
    purposeItems.forEach((item, index) => {
        item.style.opacity = '0';
        item.style.transform = 'translateX(-30px)';
        item.style.transition = `all 0.6s ease ${index * 0.15}s`;
        fadeInObserver.observe(item);
    });
    
    // Aplicar animación a las skill cards
    const skillCards = document.querySelectorAll('.skill-card');
    skillCards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'scale(0.9)';
        card.style.transition = `all 0.5s ease ${index * 0.1}s`;
        fadeInObserver.observe(card);
    });
    
    // Aplicar animación a los items de la galería
    const galleryItems = document.querySelectorAll('.gallery-item');
    galleryItems.forEach((item, index) => {
        item.style.opacity = '0';
        item.style.transform = 'scale(0.95)';
        item.style.transition = `all 0.5s ease ${index * 0.1}s`;
        fadeInObserver.observe(item);
    });
    
    // Animación de contador para los tool badges
    const toolBadges = document.querySelectorAll('.tool-badge');
    toolBadges.forEach((badge, index) => {
        badge.style.opacity = '0';
        badge.style.transform = 'scale(0)';
        badge.style.transition = `all 0.4s ease ${index * 0.05}s`;
        fadeInObserver.observe(badge);
    });
    
    // Efecto parallax suave en las imágenes principales
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        
        const authorImage = document.querySelector('.author-image');
        if (authorImage) {
            authorImage.style.transform = `translateY(${scrolled * 0.1}px)`;
        }
        
        const purposeImage = document.querySelector('.purpose-image');
        if (purposeImage) {
            purposeImage.style.transform = `translateY(${scrolled * 0.08}px)`;
        }
    });
    
    // Efecto de hover mejorado en las imágenes de la galería
    galleryItems.forEach(item => {
        const img = item.querySelector('.gallery-image');
        
        item.addEventListener('mouseenter', function() {
            this.style.zIndex = '10';
        });
        
        item.addEventListener('mouseleave', function() {
            this.style.zIndex = '1';
        });
    });
    
    // Animación del título principal
    const mainTitle = document.querySelector('.main-title');
    if (mainTitle) {
        mainTitle.style.opacity = '0';
        mainTitle.style.transform = 'translateY(-30px)';
        
        setTimeout(() => {
            mainTitle.style.transition = 'all 0.8s ease';
            mainTitle.style.opacity = '1';
            mainTitle.style.transform = 'translateY(0)';
        }, 200);
    }
    
    // Contador animado para estadísticas (opcional - puedes agregar stats)
    function animateCounter(element, target, duration) {
        let start = 0;
        const increment = target / (duration / 16);
        
        const timer = setInterval(() => {
            start += increment;
            if (start >= target) {0
                element.textContent = Math.floor(target);
                clearInterval(timer);
            } else {
                element.textContent = Math.floor(start);
            }
        }, 16);
    }
    
    // Click para copiar email (si tienes uno visible)
    const emailElements = document.querySelectorAll('[data-email]');
    emailElements.forEach(elem => {
        elem.addEventListener('click', function() {
            const email = this.getAttribute('data-email');
            navigator.clipboard.writeText(email).then(() => {
                // Mostrar tooltip o feedback
                const originalText = this.textContent;
                this.textContent = 'Email copiado!';
                setTimeout(() => {
                    this.textContent = originalText;
                }, 2000);
            });
        });
    });
    
    // Efecto de escritura para el subtitle (opcional)
    const subtitle = document.querySelector('.hero-subtitle');
    if (subtitle) {
        const text = subtitle.textContent;
        subtitle.textContent = '';
        subtitle.style.opacity = '1';
        
        let index = 0;
        function typeWriter() {
            if (index < text.length) {
                subtitle.textContent += text.charAt(index);
                index++;
                setTimeout(typeWriter, 50);
            }
        }
        
        setTimeout(typeWriter, 1000);
    }
    
    // Añadir clase active a los items del propósito al hacer scroll
    const missionBox = document.querySelector('.mission-box');
    if (missionBox) {
        missionBox.style.opacity = '0';
        missionBox.style.transform = 'scale(0.95)';
        missionBox.style.transition = 'all 0.6s ease';
        fadeInObserver.observe(missionBox);
    }
    
    // Log para debugging
    console.log('About page loaded successfully! 🎨');
    
});