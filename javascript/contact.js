document.addEventListener('DOMContentLoaded', function() {
    
    // Elementos del formulario
    const contactForm = document.getElementById('contactForm');
    const successModal = new bootstrap.Modal(document.getElementById('successModal'));
    
    // Manejar el envío del formulario
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Obtener los datos del formulario
        const formData = {
            name: document.getElementById('name').value,
            email: document.getElementById('email').value,
            subject: document.getElementById('subject').value,
            message: document.getElementById('message').value
        };
        
        // Validar que los campos no estén vacíos
        if (!formData.name || !formData.email || !formData.subject || !formData.message) {
            alert('Por favor, preencha todos os campos!');
            return;
        }
        
        // Simular el envío del email
        sendEmail(formData);
    });
    
    // Función para enviar el email
    function sendEmail(data) {
        // Deshabilitar el botón de envío
        const submitBtn = contactForm.querySelector('.btn-submit');
        const originalText = submitBtn.innerHTML;
        submitBtn.disabled = true;
        submitBtn.innerHTML = '<span class="spinner-border spinner-border-sm me-2"></span>Enviando...';
        
        // Simular una petición al servidor (puedes reemplazar esto con tu API real)
        setTimeout(() => {
            const mailtoLink = `mailto:claudia.rojas.aramayo@gmail.com?subject=${encodeURIComponent(data.subject)}&body=${encodeURIComponent(`Nome: ${data.name}\nEmail: ${data.email}\n\nMensagem:\n${data.message}`)}`;
            window.location.href = mailtoLink;
            
            // Mostrar el modal de éxito
            showSuccessModal();
            
            // Restaurar el botón
            submitBtn.disabled = false;
            submitBtn.innerHTML = originalText;
            
        }, 1000);
    }
    
    // Función para mostrar el modal de éxito
    function showSuccessModal() {
        // Limpiar el formulario
        contactForm.reset();
        
        // Mostrar el modal
        successModal.show();
        
        // Opcional: cerrar automáticamente después de 3 segundos
        // setTimeout(() => {
        //     successModal.hide();
        // }, 3000);
    }
    
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
    
    // Animación de entrada para las redes sociales
    const socialLinks = document.querySelectorAll('.social-link');
    
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateX(0)';
                }, index * 100);
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    socialLinks.forEach(link => {
        link.style.opacity = '0';
        link.style.transform = 'translateX(-30px)';
        link.style.transition = 'all 0.5s ease';
        observer.observe(link);
    });
    
    // Validación en tiempo real
    const emailInput = document.getElementById('email');
    
    emailInput.addEventListener('blur', function() {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        
        if (this.value && !emailRegex.test(this.value)) {
            this.classList.add('is-invalid');
            if (!this.nextElementSibling || !this.nextElementSibling.classList.contains('invalid-feedback')) {
                const feedback = document.createElement('div');
                feedback.className = 'invalid-feedback';
                feedback.textContent = 'Por favor, insira um email válido.';
                this.parentNode.appendChild(feedback);
            }
        } else {
            this.classList.remove('is-invalid');
            const feedback = this.parentNode.querySelector('.invalid-feedback');
            if (feedback) {
                feedback.remove();
            }
        }
    });
    
});