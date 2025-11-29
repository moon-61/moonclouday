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
    
    // COMPARTIR EN REDES SOCIALES
    const shareButtons = document.querySelectorAll('.share-btn');
    const pageTitle = document.title;
    const pageUrl = window.location.href;
    
    shareButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            
            let shareUrl = '';
            const classes = this.className;
            
            if (classes.includes('share-twitter')) {
                shareUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(pageTitle)}&url=${encodeURIComponent(pageUrl)}`;
            } else if (classes.includes('share-facebook')) {
                shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(pageUrl)}`;
            } else if (classes.includes('share-linkedin')) {
                shareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(pageUrl)}`;
            } else if (classes.includes('share-whatsapp')) {
                shareUrl = `https://wa.me/?text=${encodeURIComponent(pageTitle + ' ' + pageUrl)}`;
            }
            
            if (shareUrl) {
                window.open(shareUrl, '_blank', 'width=600,height=400');
                const originalHTML = this.innerHTML;
                this.innerHTML = '<i class="bi bi-check"></i>';
                
                setTimeout(() => {
                    this.innerHTML = originalHTML;
                }, 1000);
            }
        });
    });
    const postTitle = document.querySelector('.post-title');
    
    if (postTitle) {
        postTitle.addEventListener('dblclick', function() {
            navigator.clipboard.writeText(window.location.href).then(() => {
                // Crear notificación
                const notification = document.createElement('div');
                notification.style.cssText = `
                    position: fixed;
                    top: 20px;
                    right: 20px;
                    background: linear-gradient(135deg, var(--color-green), var(--color-green-dark));
                    color: white;
                    padding: 15px 25px;
                    border-radius: 12px;
                    box-shadow: 0 10px 30px rgba(179, 191, 84, 0.4);
                    z-index: 9999;
                    font-family: 'Urbanist', sans-serif;
                    font-weight: 600;
                    animation: slideIn 0.3s ease-out;
                `;
                notification.innerHTML = `
                    <i class="bi bi-check-circle-fill" style="margin-right: 8px;"></i>
                    Link copiado!
                `;
                
                document.body.appendChild(notification);
                
                setTimeout(() => {
                    notification.style.animation = 'slideOut 0.3s ease-in';
                    setTimeout(() => notification.remove(), 300);
                }, 2000);
            });
        });
    }
    const progressBar = document.createElement('div');
    progressBar.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 0%;
        height: 4px;
        background: linear-gradient(90deg, var(--color-purple-dark), var(--color-orange), var(--color-blue));
        z-index: 1000;
        transition: width 0.1s ease;
    `;
    document.body.appendChild(progressBar);
    
    window.addEventListener('scroll', function() {
        const article = document.querySelector('.post-article');
        if (!article) return;
        
        const articleTop = article.offsetTop;
        const articleHeight = article.offsetHeight;
        const windowHeight = window.innerHeight;
        const scrolled = window.scrollY;
        
        const progress = ((scrolled - articleTop + windowHeight) / articleHeight) * 100;
        const clampedProgress = Math.min(Math.max(progress, 0), 100);
        
        progressBar.style.width = clampedProgress + '%';
    });
    const scrollTopBtn = document.createElement('button');
    scrollTopBtn.innerHTML = '<i class="bi bi-arrow-up"></i>';
    scrollTopBtn.style.cssText = `
        position: fixed;
        bottom: 30px;
        right: 30px;
        width: 50px;
        height: 50px;
        background: linear-gradient(135deg, var(--color-purple-dark), var(--color-purple));
        color: white;
        border: none;
        border-radius: 50%;
        font-size: 1.5rem;
        cursor: pointer;
        opacity: 0;
        visibility: hidden;
        transition: all 0.3s ease;
        z-index: 999;
        box-shadow: 0 4px 15px rgba(184, 130, 217, 0.4);
    `;
    document.body.appendChild(scrollTopBtn);
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 500) {
            scrollTopBtn.style.opacity = '1';
            scrollTopBtn.style.visibility = 'visible';
        } else {
            scrollTopBtn.style.opacity = '0';
            scrollTopBtn.style.visibility = 'hidden';
        }
    });
    
    scrollTopBtn.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
    
    scrollTopBtn.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-5px) scale(1.1)';
    });
    
    scrollTopBtn.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0) scale(1)';
    });
    
    // EFECTO SUAVE EN SCROLL (NAVBAR)
    window.addEventListener('scroll', function() {
        const navbar = document.querySelector('.custom-navbar');
        
        if (window.scrollY > 100) {
            navbar.style.boxShadow = '0 8px 20px rgba(0, 0, 0, 0.15)';
        } else {
            navbar.style.boxShadow = '0 4px 15px rgba(0, 0, 0, 0.1)';
        }
    });
    
    // HIGHLIGHT DE LINKS EXTERNOS
    const contentLinks = document.querySelectorAll('.post-content a:not(.share-btn)');
    
    contentLinks.forEach(link => {
        if (link.hostname !== window.location.hostname) {
            link.setAttribute('target', '_blank');
            link.setAttribute('rel', 'noopener noreferrer');
            link.style.color = 'var(--color-orange)';
            link.style.textDecoration = 'underline';
        }
    });
    
    // ANIMACIONES PARA LOS STICKERS
    const stickers = document.querySelectorAll('.sticker-decoration');
    stickers.forEach((sticker, index) => {
        sticker.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.2) rotate(15deg)';
        });
        
        sticker.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1) rotate(0deg)';
        });
        setTimeout(() => {
            sticker.style.opacity = '0.9';
        }, 300 * index);
    });
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    
    if (prefersReducedMotion.matches) {
        document.querySelectorAll('[data-aos]').forEach(el => {
            el.removeAttribute('data-aos');
        });
        
        stickers.forEach(sticker => {
            sticker.style.animation = 'none';
        });
    }
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
        
        .sticker-decoration {
            transition: all 0.3s ease;
        }
    `;
    document.head.appendChild(style);
    
    // TABLA DE CONTENIDOS 
    const headings = document.querySelectorAll('.content-heading');
    
    if (headings.length > 0) {
        const toc = document.createElement('div');
        toc.style.cssText = `
            position: fixed;
            left: 20px;
            top: 50%;
            transform: translateY(-50%);
            background: white;
            padding: 20px;
            border-radius: 12px;
            border: 3px dashed var(--color-purple);
            max-width: 250px;
            display: none;
            z-index: 100;
        `;
        
        if (window.innerWidth > 1400) {
            toc.style.display = 'block';
        }
        
        const tocTitle = document.createElement('h4');
        tocTitle.textContent = 'Índice';
        tocTitle.style.cssText = `
            font-family: 'Urbanist', sans-serif;
            font-size: 1rem;
            font-weight: 700;
            color: var(--color-purple-dark);
            margin-bottom: 15px;
        `;
        toc.appendChild(tocTitle);
        
        const tocList = document.createElement('ul');
        tocList.style.cssText = `
            list-style: none;
            padding: 0;
            margin: 0;
        `;
        
        headings.forEach((heading, index) => {
            const id = `heading-${index}`;
            heading.id = id;
            
            const li = document.createElement('li');
            li.style.marginBottom = '10px';
            
            const link = document.createElement('a');
            link.href = `#${id}`;
            link.textContent = heading.textContent.replace(/^\d+/, '').trim();
            link.style.cssText = `
                color: #666;
                text-decoration: none;
                font-size: 0.85rem;
                transition: color 0.3s;
            `;
            
            link.addEventListener('mouseenter', function() {
                this.style.color = 'var(--color-orange)';
            });
            
            link.addEventListener('mouseleave', function() {
                this.style.color = '#666';
            });
            
            li.appendChild(link);
            tocList.appendChild(li);
        });
        
        toc.appendChild(tocList);
        document.body.appendChild(toc);
    }
    
    // LOG DE CONSOLA ESTILIZADO
    console.log(
        '%c📝 Blog Post - Moon Cloudsy 📝',
        'background: linear-gradient(135deg, #D9B6F2, #A3CFD9); color: white; padding: 15px 30px; font-size: 16px; font-weight: bold; border-radius: 10px; font-family: Urbanist, sans-serif;'
    );
    
    console.log(
        '%c🎨 Página de artículo carregada com sucesso!',
        'color: #FF9933; font-size: 12px; font-family: Quicksand, sans-serif; padding: 5px 0;'
    );
});