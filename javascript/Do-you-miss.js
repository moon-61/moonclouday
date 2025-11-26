document.addEventListener('DOMContentLoaded', function() {
    AOS.init({
        duration: 800,
        easing: 'ease-in-out',
        once: true,
        offset: 100
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
    // FILTRO DE CATEGORÍAS
    const filterTabs = document.querySelectorAll('.filter-tab');
    const newsCards = document.querySelectorAll('[data-category]');
    
    filterTabs.forEach(tab => {
        tab.addEventListener('click', function() {
            // Remover active de todos
            filterTabs.forEach(t => t.classList.remove('active'));
            
            // Añadir active al clickeado
            this.classList.add('active');
            
            const filter = this.getAttribute('data-filter');
            
            // Filtrar tarjetas
            newsCards.forEach(card => {
                const category = card.getAttribute('data-category');
                
                if (filter === 'all' || category === filter) {
                    card.style.display = 'block';
                    card.style.animation = 'fadeIn 0.5s ease';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    });
    // BOTÓN "VER NOTÍCIAS ANTERIORES"
    const loadMoreBtn = document.getElementById('loadMoreBtn');
    
    if (loadMoreBtn) {
        loadMoreBtn.addEventListener('click', function() {
            // Cambiar icono y texto
            const icon = this.querySelector('i');
            const originalHTML = this.innerHTML;
            
            this.innerHTML = '<span class="spinner-border spinner-border-sm me-2"></span>Carregando...';
            this.disabled = true;
            
            // Simular carga de más noticias
            setTimeout(() => {
                // Aquí irían las nuevas noticias cargadas
                // Por ahora solo mostramos un mensaje
                this.innerHTML = '<i class="bi bi-check-circle-fill"></i> Todas as notícias carregadas!';
                this.style.background = 'linear-gradient(135deg, var(--color-green), var(--color-green-dark))';
                this.style.color = 'white';
                this.style.borderColor = 'var(--color-green)';
                
                // Restaurar después de 3 segundos
                setTimeout(() => {
                    this.innerHTML = originalHTML;
                    this.style.background = '';
                    this.style.color = '';
                    this.style.borderColor = '';
                    this.disabled = false;
                }, 3000);
            }, 1500);
        });
    }
    // NEWSLETTER FORM
    const newsletterForm = document.querySelector('.newsletter-form');
    
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const emailInput = this.querySelector('input[type="email"]');
            const submitBtn = this.querySelector('.btn-newsletter');
            
            if (emailInput.value) {
                const originalHTML = submitBtn.innerHTML;
                submitBtn.innerHTML = '<span class="spinner-border spinner-border-sm me-2"></span>Enviando...';
                submitBtn.disabled = true;
                
                setTimeout(() => {
                    submitBtn.innerHTML = '<i class="bi bi-check-circle-fill me-2"></i>Inscrito!';
                    submitBtn.style.background = '#28a745';
                    
                    emailInput.value = '';
                    
                    setTimeout(() => {
                        submitBtn.innerHTML = originalHTML;
                        submitBtn.style.background = '';
                        submitBtn.disabled = false;
                    }, 3000);
                }, 1500);
            }
        });
    }
    // EFECTO SUAVE EN SCROLL (NAVBAR)
    window.addEventListener('scroll', function() {
        const navbar = document.querySelector('.custom-navbar');
        
        if (window.scrollY > 100) {
            navbar.style.boxShadow = '0 8px 20px rgba(0, 0, 0, 0.15)';
        } else {
            navbar.style.boxShadow = '0 4px 15px rgba(0, 0, 0, 0.1)';
        }
    });
    // ANIMACIÓN CSS PARA FILTROS
    const style = document.createElement('style');
    style.textContent = `
        @keyframes fadeIn {
            from {
                opacity: 0;
                transform: translateY(20px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }
    `;
    document.head.appendChild(style);
    // PERFORMANCE: REDUCIR ANIMACIONES
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    
    if (prefersReducedMotion.matches) {
        document.querySelectorAll('[data-aos]').forEach(el => {
            el.removeAttribute('data-aos');
        });
    }
    // CONTADOR DE TARJETAS VISIBLES
    function updateVisibleCount() {
        const visibleCards = document.querySelectorAll('[data-category]:not([style*="display: none"])');
        console.log(`📰 ${visibleCards.length} notícias visíveis`);
    }
    
    // Actualizar contador al filtrar
    filterTabs.forEach(tab => {
        tab.addEventListener('click', updateVisibleCount);
    });
    // LINKS DE NOTÍCIAS (PREVENIR COMPORTAMIENTO DEFAULT)
    const newsLinks = document.querySelectorAll('.news-link, .btn-read-more');
    
    newsLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            if (this.getAttribute('href') === '#') {
                e.preventDefault();
                
                // Crear notificación
                const notification = document.createElement('div');
                notification.style.cssText = `
                    position: fixed;
                    top: 20px;
                    right: 20px;
                    background: linear-gradient(135deg, var(--color-purple-dark), var(--color-purple));
                    color: white;
                    padding: 20px 30px;
                    border-radius: 15px;
                    box-shadow: 0 10px 30px rgba(184, 130, 217, 0.4);
                    z-index: 9999;
                    font-family: 'Urbanist', sans-serif;
                    font-weight: 600;
                    animation: slideIn 0.3s ease-out;
                `;
                notification.innerHTML = `
                    <i class="bi bi-info-circle-fill" style="margin-right: 10px;"></i>
                    Artigo completo em breve!
                `;
                
                document.body.appendChild(notification);
                
                setTimeout(() => {
                    notification.style.animation = 'slideOut 0.3s ease-in';
                    setTimeout(() => notification.remove(), 300);
                }, 2500);
            }
        });
    });
    
    // Añadir animaciones para notificaciones
    const animStyle = document.createElement('style');
    animStyle.textContent = `
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
    `;
    document.head.appendChild(animStyle);
    // LOG DE CONSOLA ESTILIZADO
    console.log(
        '%c📰 Você Perdeu Isso? - Página de Notícias 📰',
        'background: linear-gradient(135deg, #D9B6F2, #A3CFD9); color: white; padding: 15px 30px; font-size: 16px; font-weight: bold; border-radius: 10px; font-family: Urbanist, sans-serif;'
    );
    
    console.log(
        '%c🎨 Desenvolvido por Moon Cloudsy | PUC-SP',
        'color: #FF9933; font-size: 12px; font-family: Quicksand, sans-serif; padding: 5px 0;'
    );
    
    console.log(
        '%c✨ Página carregada e pronta para explorar!',
        'color: #B3BF54; font-size: 11px; font-style: italic;'
    );
    
    // Contador inicial
    updateVisibleCount();
    
});