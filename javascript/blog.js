document.addEventListener('DOMContentLoaded', function() {
    
    // Inicializar AOS
    AOS.init({
        duration: 600,
        easing: 'ease-out',
        once: true,
        offset: 50
    });

    // Ensure favicon (site-wide for blog pages)
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

    // Normalize document title occurrences of "moon cloudsy" -> "Moon Clouday"
    (function normalizeTitle() {
        if (document.title) {
            document.title = document.title.replace(/moon\s*clouds?y?/ig, 'Moon Clouday');
        }
    })();

    // Inject focus-visible styles to improve keyboard accessibility on blog pages
    (function injectFocusStyles() {
        const style = document.createElement('style');
        style.textContent = `
            :focus-visible { outline: 3px solid #B882D9; outline-offset: 2px; }
            .custom-navbar .nav-link:focus-visible,
            .btn-read-more:focus-visible,
            .btn-load-more:focus-visible,
            .dropdown-item:focus-visible,
            .filter-btn:focus-visible { outline: 3px solid #B882D9; outline-offset: 2px; }
        `;
        document.head.appendChild(style);
    })();
    
    // Elementos del DOM
    const orderBtn = document.getElementById('orderBtn');
    const orderText = document.getElementById('orderText');
    const dropdownMenu = document.getElementById('dropdownMenu');
    const blogPosts = document.getElementById('blogPosts');
    const dropdownItems = document.querySelectorAll('.dropdown-item');
    const loadMoreBtn = document.getElementById('loadMoreBtn');
    
    let currentOrder = 'newest';
    let postsLoaded = 4; // Posts inicialmente visibles (Nov, Oct, Sep, Ago)
    const postsPerLoad = 3; // Posts a cargar por click
    
    // CRÍTICO: Función para posicionar el dropdown correctamente
    function positionDropdown() {
        if (!orderBtn || !dropdownMenu) return;
        
        const rect = orderBtn.getBoundingClientRect();
        dropdownMenu.style.top = `${rect.bottom + 10}px`;
        
        // En móvil, centrar; en desktop, alinear a la derecha del botón
        if (window.innerWidth <= 768) {
            dropdownMenu.style.left = `${rect.left + (rect.width / 2)}px`;
            dropdownMenu.style.transform = 'translateX(-50%)';
        } else {
            dropdownMenu.style.left = `${rect.right}px`;
            dropdownMenu.style.transform = 'translateX(-100%)';
        }
    }
    
    // Toggle del dropdown con posicionamiento correcto
    orderBtn.addEventListener('click', function(e) {
        e.stopPropagation();
        positionDropdown();
        dropdownMenu.classList.toggle('active');
        orderBtn.classList.toggle('active');
    });
    
    // Reposicionar dropdown al cambiar tamaño de ventana
    window.addEventListener('resize', function() {
        if (dropdownMenu.classList.contains('active')) {
            positionDropdown();
        }
    });
    
    // Reposicionar dropdown al hacer scroll
    window.addEventListener('scroll', function() {
        if (dropdownMenu.classList.contains('active')) {
            positionDropdown();
        }
    });
    
    // Cerrar dropdown al hacer click fuera
    document.addEventListener('click', function(e) {
        if (!orderBtn.contains(e.target) && !dropdownMenu.contains(e.target)) {
            dropdownMenu.classList.remove('active');
            orderBtn.classList.remove('active');
        }
    });
    
    // Función para ordenar los posts
    function sortPosts(order) {
        const allPosts = Array.from(blogPosts.querySelectorAll('.blog-card:not(.coming-soon)'));
        const comingSoon = blogPosts.querySelector('.blog-card.coming-soon');
        
        // Ordenar los posts según la fecha
        allPosts.sort((a, b) => {
            const dateA = new Date(a.dataset.date);
            const dateB = new Date(b.dataset.date);
            
            if (order === 'newest') {
                return dateB - dateA;
            } else {
                return dateA - dateB;
            }
        });
        
        // Animar salida
        blogPosts.style.opacity = '0';
        blogPosts.style.transform = 'translateY(20px)';
        
        setTimeout(() => {
            // Limpiar contenedor
            blogPosts.innerHTML = '';
            
            // Si es "más reciente", el coming soon va primero
            if (order === 'newest' && comingSoon) {
                blogPosts.appendChild(comingSoon);
            }
            
            // Agregar posts ordenados
            allPosts.forEach((post, index) => {
                post.setAttribute('data-aos', 'fade-up');
                post.setAttribute('data-aos-delay', index * 50);
                blogPosts.appendChild(post);
            });
            
            // Si es "más antiguo", el coming soon va al final
            if (order === 'oldest' && comingSoon) {
                blogPosts.appendChild(comingSoon);
            }
            
            // Animar entrada
            blogPosts.style.opacity = '1';
            blogPosts.style.transform = 'translateY(0)';
            
            // Reiniciar AOS
            AOS.refresh();
            
            // Actualizar visibilidad de posts
            updatePostsVisibility();
        }, 300);
    }
    
    // Función para actualizar visibilidad de posts
    function updatePostsVisibility() {
        const allPosts = blogPosts.querySelectorAll('.blog-card:not(.coming-soon)');
        let visibleCount = 0;
        
        allPosts.forEach((post, index) => {
            if (index < postsLoaded) {
                post.classList.remove('hidden-post');
                post.style.display = '';
                visibleCount++;
            } else {
                post.classList.add('hidden-post');
                post.style.display = 'none';
            }
        });
        
        // Mostrar/ocultar botón de cargar más
        if (visibleCount >= allPosts.length) {
            loadMoreBtn.classList.add('hidden');
            loadMoreBtn.style.display = 'none';
        } else {
            loadMoreBtn.classList.remove('hidden');
            loadMoreBtn.style.display = 'inline-flex';
        }
    }
    
    // Event listeners para los items del dropdown
    dropdownItems.forEach(item => {
        item.addEventListener('click', function() {
            const order = this.dataset.order;
            const text = this.textContent.trim();
            
            orderText.textContent = text;
            currentOrder = order;
            
            sortPosts(order);
            
            dropdownMenu.classList.remove('active');
            orderBtn.classList.remove('active');
            
            // Feedback visual
            orderBtn.style.transform = 'scale(1.05)';
            setTimeout(() => {
                orderBtn.style.transform = 'scale(1)';
            }, 200);
        });
    });
    
    // Load More Button - FUNCIONAL
    if (loadMoreBtn) {
        loadMoreBtn.addEventListener('click', function() {
            const originalHTML = this.innerHTML;
            
            // Animación de carga
            this.innerHTML = '<span class="spinner-border spinner-border-sm me-2"></span>Carregando...';
            this.disabled = true;
            
            setTimeout(() => {
                // Incrementar posts cargados
                postsLoaded += postsPerLoad;
                
                // Mostrar posts ocultos con animación
                const hiddenPosts = blogPosts.querySelectorAll('.blog-card.hidden-post');
                let revealed = 0;
                
                hiddenPosts.forEach((post, index) => {
                    if (revealed < postsPerLoad) {
                        post.classList.remove('hidden-post');
                        post.style.display = '';
                        post.style.opacity = '0';
                        post.style.transform = 'translateY(30px)';
                        
                        // Animación escalonada
                        setTimeout(() => {
                            post.style.transition = 'all 0.5s ease';
                            post.style.opacity = '1';
                            post.style.transform = 'translateY(0)';
                        }, index * 150);
                        
                        revealed++;
                    }
                });
                
                // Actualizar visibilidad
                updatePostsVisibility();
                
                // Restaurar botón
                this.innerHTML = originalHTML;
                this.disabled = false;
                
                // Scroll suave a los nuevos posts
                if (revealed > 0) {
                    const newlyVisible = blogPosts.querySelectorAll('.blog-card:not(.hidden-post):not(.coming-soon)');
                    const lastVisible = newlyVisible[newlyVisible.length - postsPerLoad];
                    if (lastVisible) {
                        setTimeout(() => {
                            lastVisible.scrollIntoView({ behavior: 'smooth', block: 'center' });
                        }, 500);
                    }
                }
                
                // Reiniciar AOS
                AOS.refresh();
                
            }, 800);
        });
    }
    
    // Botón "Leer más" ahora navega en la MISMA pestaña (para <button> o <a>)
    document.addEventListener('click', function(e) {
        const trigger = e.target.closest('.btn-read-more');
        if (!trigger) return;

        const card = trigger.closest('.blog-card');
        const month = card?.dataset.date || '';

        // Feedback visual
        trigger.style.transform = 'scale(0.95)';
        setTimeout(() => {
            trigger.style.transform = 'scale(1)';
        }, 150);

        // Si es un enlace con href válido, dejamos que el navegador navegue normalmente en la misma pestaña
        const directHref = trigger.getAttribute('href');
        if (directHref && directHref !== '#') {
            // No prevenimos el default para que respete focus/estilos; pero
            // si queremos forzar via JS y evitar posibles scrolls, descomenta:
            e.preventDefault();
            window.location.href = directHref;
            return;
        }

        // Si es un botón (sin href), resolvemos la URL por fecha conocida
        e.preventDefault();
        const knownPT = {
            '2025-10': '/html/octuber-PT.html',
            '2025-09': '/html/september-PT.html',
            '2025-08': '/html/august-PT.html',
            '2025-07': '/html/july-PT.html'
        };

        const targetUrl = knownPT[month];
        if (targetUrl) {
            window.location.href = targetUrl; // misma pestaña
            return;
        }

        // Fallback: contenido aún no disponible
        console.warn('Conteúdo não disponível para:', month);
        try {
            alert('Conteúdo em breve.');
        } catch (_) {}
    });
    
    //NAVBAR MOBILE
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
    
    //Pa que Scrollee 
    const createScrollIndicator = () => {
        const indicator = document.createElement('div');
        indicator.style.cssText = `position: fixed; top: 0; left: 0; height: 4px; background: linear-gradient(90deg, #B882D9, #A3CFD9); z-index: 9999; transition: width 0.3s ease; width: 0%;`;
        document.body.appendChild(indicator);
        window.addEventListener('scroll', () => {
            const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
            const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
            const scrolled = (winScroll / height) * 100;
            indicator.style.width = scrolled + '%';
        });
    };
    
    createScrollIndicator();
    
    // Pa ordenar los post mensuales 
    sortPosts('newest');
    
    console.log('%c📝 Blog Moon Cloudsy ', 'background: linear-gradient(135deg, #B882D9, #A3CFD9); color: white; padding: 10px 20px; border-radius: 5px; font-size: 16px; font-weight: bold;');
    console.log('%cMeu diário como estudante de design!', 'color: #FF9933; font-size: 12px;');
    
});