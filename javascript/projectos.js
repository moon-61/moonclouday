document.addEventListener('DOMContentLoaded', function() {
    
    // INICIALIZAR AOS (ANIMACIONES)
    AOS.init({
        duration: 800,
        easing: 'ease-in-out',
        once: true,
        offset: 100
    });

    // Ensure favicon on project pages
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


    // Inject focus-visible styles (accessibility)
    (function injectFocusStyles() {
        const style = document.createElement('style');
        style.textContent = `
            :focus-visible { outline: 3px solid #B882D9; outline-offset: 2px; }
            .custom-navbar .nav-link:focus-visible,
            .btn-back-project:focus-visible,
            .btn-figma:focus-visible,
            .project-link:focus-visible,
            .btn-cta:focus-visible { outline: 3px solid #B882D9; outline-offset: 2px; }
        `;
        document.head.appendChild(style);
    })();

    // MODAL PARA IMÁGENES
    const clickableImages = document.querySelectorAll('.clickable-image');
    const imageModalElement = document.getElementById('imageModal');
    const imageModal = new bootstrap.Modal(imageModalElement);
    const modalImage = document.getElementById('modalImage');
    const imageCaption = document.getElementById('imageCaption');
    
    clickableImages.forEach(image => {
        image.addEventListener('click', function() {
            // Añadir animación de click
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = '';
            }, 200);
            
            // Configurar tamaño del modal
            const modalDialog = imageModalElement.querySelector('.modal-dialog');
            modalDialog.style.maxWidth = '700px';
            
            // Configurar imagen con tamaño controlado
            modalImage.src = this.src;
            modalImage.style.maxHeight = '65vh';
            modalImage.style.width = 'auto';
            modalImage.style.maxWidth = '100%';
            modalImage.style.objectFit = 'contain';
            modalImage.style.margin = '0 auto';
            modalImage.style.display = 'block';
            
            imageCaption.textContent = this.alt;
            imageModal.show();
        });
        
        // Efecto cursor
        image.style.cursor = 'pointer';
    });
    
    // CERRAR NAVBAR EN MÓVIL
    const navLinks = document.querySelectorAll('.nav-link');
    const navbarCollapse = document.querySelector('.navbar-collapse');
    
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (window.innerWidth < 992 && navbarCollapse.classList.contains('show')) {
                const bsCollapse = new bootstrap.Collapse(navbarCollapse);
                bsCollapse.hide();
            }
        });
    });
    
    // Cerrar al hacer click fuera
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
    
    // EFECTOS HOVER EN TARJETAS DE CONTENIDO
    const contentCards = document.querySelectorAll('.content-card');
    
    contentCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
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
    
    // EFECTOS HOVER EN TARJETAS DE IMAGEN
  
    const imageCards = document.querySelectorAll('.image-card');
    
    imageCards.forEach(card => {
        const wrapper = card.closest('.image-wrapper');
        let originalRotation = 0;
        
        // Determinar rotación original
        if (wrapper && wrapper.classList.contains('right')) {
            originalRotation = 2;
        } else if (wrapper && wrapper.classList.contains('left')) {
            originalRotation = -2;
        }
        
        card.addEventListener('mouseenter', function() {
            if (window.innerWidth > 768) {
                this.style.transform = 'rotate(0deg) translateY(-8px)';
            }
        });
        
        card.addEventListener('mouseleave', function() {
            if (window.innerWidth > 768) {
                this.style.transform = `rotate(${originalRotation}deg)`;
            }
        });
    });
    

    // SMOOTH SCROLL PARA LINKS INTERNOS
  
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href !== '#' && document.querySelector(href)) {
                e.preventDefault();
                document.querySelector(href).scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
    

    // EFECTO SUAVE EN SCROLL (SIN PARALLAX)
  
    // Throttled scroll for navbar shadow
    {
        const navbar = document.querySelector('.custom-navbar');
        let ticking = false;
        const updateShadow = () => {
            if (!navbar) return;
            if (window.scrollY > 100) {
                navbar.style.boxShadow = '0 8px 20px rgba(0, 0, 0, 0.15)';
            } else {
                navbar.style.boxShadow = '0 4px 15px rgba(0, 0, 0, 0.1)';
            }
            ticking = false;
        };
        window.addEventListener('scroll', () => {
            if (!ticking) {
                window.requestAnimationFrame(updateShadow);
                ticking = true;
            }
        }, { passive: true });
        updateShadow();
    }
    
    // LAZY LOADING PARA IFRAME (PDF)

    const pdfIframe = document.querySelector('.pdf-container iframe');
    
    if (pdfIframe) {
        const observerOptions = {
            root: null,
            rootMargin: '50px',
            threshold: 0.1
        };
        
        const iframeObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const ds = entry.target.getAttribute('data-src');
                    if (ds && !entry.target.src) {
                        entry.target.src = ds;
                    }
                    entry.target.classList.add('loaded');
                    iframeObserver.unobserve(entry.target);
                }
            });
        }, observerOptions);
        
        iframeObserver.observe(pdfIframe);
    }
    
    // EFECTO DE ESCRITURA EN NOTAS MANUSCRITAS
    const handwrittenNotes = document.querySelectorAll('.handwritten-note');
    
    handwrittenNotes.forEach(note => {
        note.addEventListener('mouseenter', function() {
            this.style.transform = 'rotate(2deg) scale(1.05)';
        });
        
        note.addEventListener('mouseleave', function() {
            this.style.transform = 'rotate(0deg) scale(1)';
        });
    });
   
    const figmaBtn = document.querySelector('.btn-figma');
    
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    
    if (prefersReducedMotion.matches) {
        document.querySelectorAll('[data-aos]').forEach(el => {
            el.removeAttribute('data-aos');
        });
        
        // Deshabilitar animaciones de stickers
        document.querySelectorAll('.sticker-space').forEach(sticker => {
            sticker.style.animation = 'none';
        });
    }
    
    // AÑADIR ANIMACIONES CSS DINÁMICAS
    const style = document.createElement('style');
    style.textContent = `
        @keyframes slideIn {
            from {
                transform: translateX(400px);
                opacity: 0;
            }
            to {
                transform: translateX(0);
                opacity: 1;
            }
        }
        
        @keyframes slideOut {
            from {
                transform: translateX(0);
                opacity: 1;
            }
            to {
                transform: translateX(400px);
                opacity: 0;
            }
        }
        /* Back section and button styling (projects pages) */
        .back-section { text-align: center; margin: 60px 0 20px; }
        .btn-back-project {
            display: inline-flex; align-items: center; gap: 12px;
            background: #fff; color: var(--color-purple-dark);
            border: 3px dashed var(--color-purple-dark);
            padding: 16px 40px; border-radius: 50px;
            font-family: 'Urbanist', sans-serif; font-weight: 700; font-size: 1.1rem;
            text-decoration: none; transition: all 0.3s ease; box-shadow: 0 4px 15px rgba(0,0,0,0.08);
        }
        .btn-back-project:hover {
            background: linear-gradient(135deg, var(--color-purple-dark), var(--color-purple));
            color: #fff; transform: translateY(-3px);
            box-shadow: 0 8px 20px rgba(184,130,217,0.3);
        }
        .back-fab {
            position: fixed; bottom: 24px; left: 24px; z-index: 1000;
            width: 48px; height: 48px; border-radius: 50%;
            display: flex; align-items: center; justify-content: center;
            background: #fff; color: var(--color-purple-dark);
            border: 2px solid var(--color-purple-dark);
            box-shadow: 0 6px 18px rgba(0,0,0,0.15);
            cursor: pointer; transition: all 0.25s ease;
        }
        .back-fab:hover { transform: translateY(-2px); background: var(--color-purple-dark); color: #fff; }
        @media (max-width: 576px) {
            .btn-back-project { padding: 14px 28px; font-size: 1rem; }
            .back-fab { bottom: 16px; left: 16px; }
        }
    `;
    document.head.appendChild(style);

    console.log(
        '%c✨ Proyecto Muva - Wearable Technology ✨',
        'background: linear-gradient(135deg, #FF9933, #B3BF54); color: white; padding: 15px 30px; font-size: 16px; font-weight: bold; border-radius: 10px; font-family: Urbanist, sans-serif;'
    );
    
    console.log(
        '%c🎨 Desarrollado por Moon Cloudsy | PUC-SP',
        'color: #D9B6F2; font-size: 12px; font-family: Quicksand, sans-serif; padding: 5px 0;'
    );
    
    console.log(
        '%c💡 Página cargada y lista para explorar!',
        'color: #A3CFD9; font-size: 11px; font-style: italic;'
    );
    
});