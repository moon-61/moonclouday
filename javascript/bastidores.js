document.addEventListener('DOMContentLoaded', function() {
    
    // Inicializar AOS (Animate On Scroll)
    AOS.init({
        duration: 800,
        easing: 'ease-in-out',
        once: true,
        offset: 100
    });
    // Remove decorative circle behind Projects title for consistency
    const headerDeco = document.querySelector('.header-decoration');
    if (headerDeco) headerDeco.remove();
    
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
    
    // Efecto parallax suave en las decoraciones
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        
        // Decoraciones de las imágenes
        const decorations = document.querySelectorAll('.image-decoration');
        decorations.forEach((decoration, index) => {
            const speed = 0.3 + (index * 0.1);
            const yPos = -(scrolled * speed);
            decoration.style.transform = `translateY(${yPos}px) rotate(${index % 2 === 0 ? '10deg' : '-10deg'})`;
        });
        
        // Header decoration
        const headerDecoration = document.querySelector('.header-decoration');
        if (headerDecoration) {
            const speed = 0.2;
            const yPos = scrolled * speed;
            headerDecoration.style.transform = `translateX(-50%) translateY(${yPos}px) scale(${1 + scrolled * 0.001})`;
        }
    });
    
    // Efecto hover mejorado para las tarjetas de proyecto
    const projectCards = document.querySelectorAll('.project-card');
    
    projectCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            // Añadir efecto de escala a la imagen
            const image = this.querySelector('.project-image');
            if (image) {
                image.style.transform = 'scale(1.05) rotate(2deg)';
            }
        });
        
        card.addEventListener('mouseleave', function() {
            const image = this.querySelector('.project-image');
            if (image) {
                image.style.transform = 'scale(1) rotate(0deg)';
            }
        });
    });
    
    // Efecto de inclinación 3D en las tarjetas de proyecto (opcional)
    projectCards.forEach(card => {
        const contentBox = card.querySelector('.project-content-box');
        
        if (contentBox) {
            contentBox.addEventListener('mousemove', function(e) {
                const rect = this.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                
                const centerX = rect.width / 2;
                const centerY = rect.height / 2;
                
                const rotateX = (y - centerY) / 30;
                const rotateY = (centerX - x) / 30;
                
                this.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.02)`;
            });
            
            contentBox.addEventListener('mouseleave', function() {
                this.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale(1)';
            });
        }
    });
    
    // Animación del título principal
    const pageTitle = document.querySelector('.page-title');
    if (pageTitle) {
        const text = pageTitle.textContent;
        pageTitle.textContent = '';
        pageTitle.style.opacity = '1';
        
        let index = 0;
        function typeWriter() {
            if (index < text.length) {
                pageTitle.textContent += text.charAt(index);
                index++;
                setTimeout(typeWriter, 100);
            }
        }
        
        // Iniciar después de 300ms
        setTimeout(typeWriter, 300);
    }
    
    // Intersection Observer para animaciones adicionales
    const observerOptions = {
        threshold: 0.2,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    // Observar las tarjetas de proyecto
    projectCards.forEach(card => {
        observer.observe(card);
    });
    
    // Detectar si el usuario está en la parte superior de la página
    window.addEventListener('scroll', function() {
        const navbar = document.querySelector('.custom-navbar');
        
        if (window.scrollY > 100) {
            navbar.style.boxShadow = '0 8px 20px rgba(0, 0, 0, 0.15)';
        } else {
            navbar.style.boxShadow = '0 4px 15px rgba(0, 0, 0, 0.1)';
        }
    });
    
        
    // Añadir cursor personalizado en las imágenes (opcional)
    const projectImages = document.querySelectorAll('.project-image');
    
    projectImages.forEach(img => {
        img.style.cursor = 'pointer';
        
        img.addEventListener('click', function() {
            // Aquí podrías abrir un modal con la imagen ampliada
            console.log('Imagen clickeada:', this.alt);
        });
    });
    
    // Log de bienvenida en consola
    console.log('%c🎨 Bastidores - Moon Cloudsy ', 'background: linear-gradient(135deg, #FF9933, #FFB366); color: white; padding: 10px 20px; border-radius: 5px; font-size: 16px; font-weight: bold;');
    console.log('%cMeu diário de design e processo criativo', 'color: #FF9933; font-size: 12px;');
    
});