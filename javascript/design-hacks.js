// Base de dados de recursos de design
const designResources = [
    // Figma
    {
        id: 1,
        title: "Como criar uma nova pestaña en Figma",
        description: "Tutorial passo a passo para criar e organizar abas no Figma, incluindo shortcuts e melhores práticas.",
        type: "tutorial",
        category: "figma",
        url: "https://help.figma.com/",
        source: "Figma Help Center",
        duration: "5 min",
        level: "Iniciante",
        keywords: ["figma", "pestaña", "tab", "abas", "organizar"]
    },
    {
        id: 2,
        title: "Atalhos Essenciais do Figma",
        description: "Lista completa dos atalhos de teclado que vão acelerar seu workflow no Figma.",
        type: "tutorial",
        category: "figma",
        url: "https://www.figma.com/shortcuts/",
        source: "Figma Official",
        duration: "10 min",
        level: "Todos",
        keywords: ["figma", "shortcuts", "atalhos", "teclado", "produtividade"]
    },
    {
        id: 3,
        title: "Figma Tutorial Completo - YouTube",
        description: "Curso completo de Figma do zero ao avançado, com projetos práticos.",
        type: "video",
        category: "figma",
        url: "https://www.youtube.com/results?search_query=figma+tutorial",
        source: "YouTube",
        duration: "2h 30min",
        level: "Iniciante",
        keywords: ["figma", "tutorial", "curso", "video", "aprender"]
    },
    {
        id: 4,
        title: "Melhores Plugins para Figma",
        description: "Top 20 plugins essenciais que todo designer deveria ter instalado no Figma.",
        type: "tool",
        category: "figma",
        url: "https://www.figma.com/community/plugins",
        source: "Figma Community",
        duration: "8 min",
        level: "Intermediário",
        keywords: ["figma", "plugins", "ferramentas", "extensões"]
    },
    
    // UI/UX Design
    {
        id: 5,
        title: "Princípios Fundamentais de UI Design",
        description: "Aprenda os 10 princípios básicos que todo UI designer precisa dominar.",
        type: "article",
        category: "ui-ux",
        url: "https://www.nngroup.com/articles/ten-usability-heuristics/",
        source: "Nielsen Norman Group",
        duration: "15 min",
        level: "Iniciante",
        keywords: ["ui", "design", "princípios", "usabilidade", "interface"]
    },
    {
        id: 6,
        title: "Design System do Zero",
        description: "Como criar e manter um design system completo para seus projetos.",
        type: "tutorial",
        category: "ui-ux",
        url: "https://www.designsystems.com/",
        source: "Design Systems",
        duration: "25 min",
        level: "Avançado",
        keywords: ["design system", "ui", "componentes", "biblioteca"]
    },
    {
        id: 7,
        title: "UX Research para Iniciantes",
        description: "Métodos e técnicas de pesquisa de usuário que todo designer deveria conhecer.",
        type: "video",
        category: "ui-ux",
        url: "https://www.youtube.com/results?search_query=ux+research",
        source: "YouTube",
        duration: "45 min",
        level: "Iniciante",
        keywords: ["ux", "pesquisa", "usuário", "research", "métodos"]
    },
    
    // Color Theory
    {
        id: 8,
        title: "Teoria das Cores para Designers",
        description: "Guia completo sobre teoria das cores, psicologia e como criar paletas harmoniosas.",
        type: "article",
        category: "color",
        url: "https://color.adobe.com/",
        source: "Adobe Color",
        duration: "20 min",
        level: "Intermediário",
        keywords: ["cores", "color", "paleta", "teoria", "harmonia"]
    },
    {
        id: 9,
        title: "Criando Paletas de Cores Acessíveis",
        description: "Como garantir contraste adequado e acessibilidade nas suas escolhas de cores.",
        type: "tutorial",
        category: "color",
        url: "https://www.w3.org/WAI/WCAG21/Understanding/contrast-minimum.html",
        source: "W3C",
        duration: "12 min",
        level: "Intermediário",
        keywords: ["acessibilidade", "contraste", "wcag", "cores"]
    },
    
    // Typography
    {
        id: 10,
        title: "Hierarquia Tipográfica",
        description: "Como criar hierarquia visual efetiva usando tipografia.",
        type: "article",
        category: "typography",
        url: "https://fonts.google.com/",
        source: "Google Fonts",
        duration: "10 min",
        level: "Iniciante",
        keywords: ["tipografia", "fontes", "hierarquia", "typography"]
    },
    {
        id: 11,
        title: "Melhores Fontes para UI Design 2024",
        description: "Seleção curada das melhores fontes gratuitas para interfaces.",
        type: "tool",
        category: "typography",
        url: "https://fonts.google.com/",
        source: "Google Fonts",
        duration: "5 min",
        level: "Todos",
        keywords: ["fontes", "typography", "ui", "grátis"]
    },
    
    // Inspiration
    {
        id: 12,
        title: "Sites para Inspiração em UI",
        description: "Lista dos melhores sites para encontrar inspiração de design.",
        type: "tool",
        category: "inspiration",
        url: "https://dribbble.com/",
        source: "Dribbble",
        duration: "3 min",
        level: "Todos",
        keywords: ["inspiração", "ui", "inspiration", "referências", "portfolio"]
    },
    {
        id: 13,
        title: "Behance: Projetos de Design",
        description: "Explore milhares de projetos de design de designers ao redor do mundo.",
        type: "tool",
        category: "inspiration",
        url: "https://www.behance.net/",
        source: "Behance",
        duration: "-",
        level: "Todos",
        keywords: ["behance", "portfolio", "projetos", "inspiração"]
    },
    
    // Tools
    {
        id: 14,
        title: "Ferramentas Essenciais para Designers",
        description: "Lista completa de ferramentas, apps e recursos que todo designer precisa.",
        type: "tool",
        category: "tools",
        url: "https://www.figma.com/",
        source: "Design Resources",
        duration: "15 min",
        level: "Todos",
        keywords: ["ferramentas", "tools", "apps", "recursos", "software"]
    }
];

document.addEventListener('DOMContentLoaded', function() {
    
    // Inicializar AOS
    AOS.init({
        duration: 800,
        easing: 'ease-in-out',
        once: true,
        offset: 100
    });

    // Ensure favicon
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

    // Normalize title
    (function normalizeTitle() {
        if (document.title) {
            document.title = document.title.replace(/moon\s*clouds?y?/ig, 'Moon Clouday');
        }
    })();

    // Inject focus-visible styles
    (function injectFocusStyles() {
        const style = document.createElement('style');
        style.textContent = `
            :focus-visible { outline: 3px solid #B882D9; outline-offset: 2px; }
            .custom-navbar .nav-link:focus-visible,
            .search-btn:focus-visible,
            .filter-tab:focus-visible,
            .category-card:focus-visible,
            .btn-back:focus-visible { outline: 3px solid #B882D9; outline-offset: 2px; }
        `;
        document.head.appendChild(style);
    })();
    
    // Elementos
    const searchInput = document.getElementById('searchInput');
    const searchBtn = document.getElementById('searchBtn');
    const resultsSection = document.getElementById('resultsSection');
    const resultsGrid = document.getElementById('resultsGrid');
    const noResults = document.getElementById('noResults');
    const featuredSection = document.getElementById('featuredSection');
    const resultsTitle = document.getElementById('resultsTitle');
    const resultsCount = document.getElementById('resultsCount');
    const searchQuerySpan = document.getElementById('searchQuery');
    
    // Update placeholder to PT
    if (searchInput) {
        searchInput.placeholder = 'Ex: como criar uma nova aba no Figma...';
    }

    // Event Listeners
    searchBtn.addEventListener('click', performSearch);
    searchInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            performSearch();
        }
    });
    
    // Sugestões de busca
    document.querySelectorAll('.suggestion-chip').forEach(chip => {
        chip.addEventListener('click', function() {
            const query = this.getAttribute('data-query');
            searchInput.value = query;
            performSearch();
        });
    });
    
    // Filtros
    document.querySelectorAll('.filter-tab').forEach(tab => {
        tab.addEventListener('click', function() {
            document.querySelectorAll('.filter-tab').forEach(t => t.classList.remove('active'));
            this.classList.add('active');
            
            const filter = this.getAttribute('data-filter');
            filterResults(filter);
        });
    });
    
    // Categorias
    document.querySelectorAll('.category-card').forEach(card => {
        card.addEventListener('click', function() {
            const category = this.getAttribute('data-category');
            searchInput.value = category;
            performSearch();
        });
    });
    
    // Função de busca
    function performSearch() {
        const query = searchInput.value.trim().toLowerCase();
        
        if (!query) {
            alert('Por favor, digite algo para buscar!');
            return;
        }
        
        // Buscar nos recursos
        const results = designResources.filter(resource => {
            return resource.title.toLowerCase().includes(query) ||
                   resource.description.toLowerCase().includes(query) ||
                   resource.keywords.some(keyword => keyword.toLowerCase().includes(query)) ||
                   resource.category.toLowerCase().includes(query);
        });
        
        // Mostrar resultados
        displayResults(results, query);
    }
    
    // Mostrar resultados
    function displayResults(results, query) {
        // Ocultar featured section
        featuredSection.style.display = 'none';
        
        // Mostrar results section
        resultsSection.style.display = 'block';
        
        if (results.length === 0) {
            // Sem resultados
            resultsGrid.style.display = 'none';
            noResults.style.display = 'block';
            searchQuerySpan.textContent = query;
        } else {
            // Com resultados
            resultsGrid.style.display = 'grid';
            noResults.style.display = 'none';
            
            resultsTitle.textContent = `Resultados para "${query}"`;
            resultsCount.textContent = `${results.length} resultado${results.length !== 1 ? 's' : ''} encontrado${results.length !== 1 ? 's' : ''}`;
            
            // Limpar grid
            resultsGrid.innerHTML = '';
            
            // Adicionar cards
            results.forEach((result, index) => {
                const card = createResultCard(result);
                resultsGrid.appendChild(card);
                
                // Animação
                setTimeout(() => {
                    card.style.opacity = '1';
                    card.style.transform = 'translateY(0)';
                }, index * 100);
            });
        }
        
        // Scroll suave para os resultados
        resultsSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
    
    // Criar card de resultado
    function createResultCard(resource) {
        const card = document.createElement('a');
        card.href = resource.url;
        card.target = '_blank';
        card.className = 'result-card';
        card.setAttribute('data-type', resource.type);
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        card.style.transition = 'all 0.5s ease';
        
        const typeIcons = {
            tutorial: 'bi-book-fill',
            video: 'bi-play-circle-fill',
            tool: 'bi-tools',
            article: 'bi-file-text-fill'
        };
        
        const typeLabels = {
            tutorial: 'Tutorial',
            video: 'Vídeo',
            tool: 'Ferramenta',
            article: 'Artigo'
        };
        
        card.innerHTML = `
            <div class="result-header">
                <div class="result-icon ${resource.type}">
                    <i class="bi ${typeIcons[resource.type]}"></i>
                </div>
                <div class="result-content">
                    <div class="result-type">${typeLabels[resource.type]}</div>
                    <h3 class="result-title">${resource.title}</h3>
                </div>
            </div>
            <p class="result-description">${resource.description}</p>
            <div class="result-link">
                <span>${resource.source}</span>
                <i class="bi bi-box-arrow-up-right"></i>
            </div>
            <div class="result-meta">
                <span><i class="bi bi-clock"></i> ${resource.duration}</span>
                <span><i class="bi bi-bar-chart-fill"></i> ${resource.level}</span>
            </div>
        `;
        
        return card;
    }
    
    // Filtrar resultados
    function filterResults(filter) {
        const cards = resultsGrid.querySelectorAll('.result-card');
        
        cards.forEach(card => {
            if (filter === 'all' || card.getAttribute('data-type') === filter) {
                card.style.display = 'block';
            } else {
                card.style.display = 'none';
            }
        });
    }
    
    // Smooth scroll
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
                }
            }
        });
    });
    
    // Cerrar navbar en móvil
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
    
    // Navbar shadow on scroll
    window.addEventListener('scroll', function() {
        const navbar = document.querySelector('.custom-navbar');
        
        if (window.scrollY > 100) {
            navbar.style.boxShadow = '0 8px 20px rgba(0, 0, 0, 0.15)';
        } else {
            navbar.style.boxShadow = '0 4px 15px rgba(0, 0, 0, 0.1)';
        }
    });
    
    console.log('%c💡 Design Hacks - Moon Cloudsy ', 'background: linear-gradient(135deg, #FFD93D, #FF9933); color: white; padding: 10px 20px; border-radius: 5px; font-size: 16px; font-weight: bold;');
    console.log(`%c${designResources.length} recursos disponíveis na base de dados`, 'color: #FF9933; font-size: 12px;');
    
});

// Função global para limpar busca
function clearSearch() {
    document.getElementById('resultsSection').style.display = 'none';
    document.getElementById('featuredSection').style.display = 'block';
    document.getElementById('searchInput').value = '';
    document.getElementById('searchInput').focus();
}