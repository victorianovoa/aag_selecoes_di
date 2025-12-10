// ===== INICIALIZAÇÃO =====
document.addEventListener('DOMContentLoaded', () => {
    initializeApp();
});

function initializeApp() {
    setupNavigation();
    setupThemeToggle();
    setupUserMenu();
    setupCarousel(); // NOVO
    setupContactForm(); // NOVO
    setupNewsletterForm(); // NOVO
    loadPages();
    checkStoredTheme();
}

// ===== NAVEGAÇÃO =====
function setupNavigation() {
    const navLinks = document.querySelectorAll('.nav-link');
    const dropdownLinks = document.querySelectorAll('.dropdown-menu a[data-page]');
    const footerLinks = document.querySelectorAll('.footer-links a[data-page]'); // NOVO
    
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const page = link.dataset.page;
            navigateToPage(page);
            
            // Atualiza link ativo
            navLinks.forEach(l => l.classList.remove('active'));
            link.classList.add('active');
        });
    });
    
    dropdownLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const page = link.dataset.page;
            navigateToPage(page);
            
            // Remove active de todos os nav links
            navLinks.forEach(l => l.classList.remove('active'));
        });
    });
    
    // NOVO: Links do footer
    footerLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const page = link.dataset.page;
            navigateToPage(page);
            window.scrollTo({ top: 0, behavior: 'smooth' });
            
            navLinks.forEach(l => l.classList.remove('active'));
            const targetNavLink = document.querySelector(`.nav-link[data-page="${page}"]`);
            if (targetNavLink) targetNavLink.classList.add('active');
        });
    });
}

function navigateToPage(pageName) {
    const pages = document.querySelectorAll('.page');
    pages.forEach(page => page.classList.remove('active'));
    
    const targetPage = document.getElementById(`${pageName}-page`);
    if (targetPage) {
        targetPage.classList.add('active');
        
        // Carrega conteúdo dinâmico se necessário
        if (targetPage.innerHTML.trim() === '') {
            loadPageContent(pageName, targetPage);
        }
    }
}

// ===== TEMA DARK/LIGHT =====
function setupThemeToggle() {
    const themeToggle = document.getElementById('themeToggle');
    
    themeToggle.addEventListener('click', () => {
        document.body.classList.toggle('dark-mode');
        
        const icon = themeToggle.querySelector('i');
        if (document.body.classList.contains('dark-mode')) {
            icon.classList.remove('fa-moon');
            icon.classList.add('fa-sun');
            localStorage.setItem('theme', 'dark');
        } else {
            icon.classList.remove('fa-sun');
            icon.classList.add('fa-moon');
            localStorage.setItem('theme', 'light');
        }
    });
}

function checkStoredTheme() {
    const theme = localStorage.getItem('theme');
    if (theme === 'dark') {
        document.body.classList.add('dark-mode');
        const icon = document.querySelector('#themeToggle i');
        icon.classList.remove('fa-moon');
        icon.classList.add('fa-sun');
    }
}

// ===== USER MENU =====
function setupUserMenu() {
    const logoutBtn = document.querySelector('.logout');
    
    logoutBtn.addEventListener('click', (e) => {
        e.preventDefault();
        if (confirm('Tem certeza que deseja sair?')) {
            alert('Logout realizado com sucesso!');
            // Aqui implementaria a lógica de logout real
        }
    });
}

// ===== CAROUSEL (NOVO) =====
let currentSlide = 0;
let autoplayInterval;

function setupCarousel() {
    const slides = document.querySelectorAll('.carousel-slide');
    const track = document.getElementById('carouselTrack');
    const indicatorsContainer = document.getElementById('indicators');
    
    if (!slides.length || !indicatorsContainer) return;
    
    // Create indicators
    slides.forEach((_, index) => {
        const indicator = document.createElement('div');
        indicator.className = 'indicator' + (index === 0 ? ' active' : '');
        indicator.onclick = () => goToSlide(index);
        indicatorsContainer.appendChild(indicator);
    });
    
    // Start autoplay
    startAutoplay();
    
    // Pause autoplay on hover
    const carouselContainer = document.querySelector('.carousel-container');
    carouselContainer.addEventListener('mouseenter', stopAutoplay);
    carouselContainer.addEventListener('mouseleave', startAutoplay);
}

function updateCarousel() {
    const track = document.getElementById('carouselTrack');
    const slides = document.querySelectorAll('.carousel-slide');
    
    if (!track || !slides.length) return;
    
    track.style.transform = `translateX(-${currentSlide * 100}%)`;
    
    document.querySelectorAll('.indicator').forEach((ind, idx) => {
        ind.classList.toggle('active', idx === currentSlide);
    });
}

function nextSlide() {
    const slides = document.querySelectorAll('.carousel-slide');
    currentSlide = (currentSlide + 1) % slides.length;
    updateCarousel();
}

function prevSlide() {
    const slides = document.querySelectorAll('.carousel-slide');
    currentSlide = (currentSlide - 1 + slides.length) % slides.length;
    updateCarousel();
}

function goToSlide(index) {
    currentSlide = index;
    updateCarousel();
}

function startAutoplay() {
    stopAutoplay();
    autoplayInterval = setInterval(nextSlide, 5000);
}

function stopAutoplay() {
    if (autoplayInterval) {
        clearInterval(autoplayInterval);
    }
}

// Expose carousel functions globally
window.nextSlide = nextSlide;
window.prevSlide = prevSlide;

// ===== FORMULÁRIO DE CONTATO (NOVO) =====
function setupContactForm() {
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            // Validação básica já é feita pelo HTML5
            alert('✅ Mensagem enviada com sucesso!\n\nEntraremos em contato em breve.');
            contactForm.reset();
        });
    }
}

// ===== FORMULÁRIO DE NEWSLETTER (NOVO) =====
function setupNewsletterForm() {
    const newsletterForm = document.getElementById('newsletterForm');
    
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            const email = newsletterForm.querySelector('input[type="email"]').value;
            alert(`✅ Inscrição realizada com sucesso!\n\nVocê receberá nossas novidades em: ${email}`);
            newsletterForm.reset();
        });
    }
}

// ===== MODAIS =====
function createModal(title, content) {
    const modalContainer = document.getElementById('modalContainer');
    
    const modal = document.createElement('div');
    modal.className = 'modal-overlay';
    modal.innerHTML = `
        <div class="modal">
            <div class="modal-header">
                <h2>${title}</h2>
                <button class="modal-close">
                    <i class="fas fa-times"></i>
                </button>
            </div>
            <div class="modal-body">
                ${content}
            </div>
        </div>
    `;
    
    modalContainer.appendChild(modal);
    
    // Fechar modal
    const closeBtn = modal.querySelector('.modal-close');
    closeBtn.addEventListener('click', () => {
        modal.remove();
    });
    
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.remove();
        }
    });
}

// ===== CARREGAR PÁGINAS =====
function loadPages() {
    // Carrega páginas iniciais que precisam de conteúdo dinâmico
}

function loadPageContent(pageName, targetElement) {
    switch(pageName) {
        case 'bancas':
            targetElement.innerHTML = getBancasContent();
            setupBancasEvents();
            break;
        case 'editais':
            targetElement.innerHTML = getEditaisContent();
            setupEditaisEvents();
            break;
        case 'planner':
            targetElement.innerHTML = getPlannerContent();
            setupPlannerEvents();
            break;
        case 'boletim':
            targetElement.innerHTML = getBoletimContent();
            break;
        case 'perfil':
            targetElement.innerHTML = getPerfilContent();
            setupPerfilEvents();
            break;
        case 'pagamentos':
            targetElement.innerHTML = getPagamentosContent();
            break;
        case 'configuracoes':
            targetElement.innerHTML = getConfiguracoesContent();
            setupConfiguracoesEvents();
            break;
    }
}

// ===== CÓDIGO ORIGINAL DAS OUTRAS PÁGINAS =====
// (Todo o código de Bancas, Editais, Planner, Boletim, Perfil, Pagamentos e Configurações
// permanece exatamente igual ao código original fornecido)

// [O restante do código JavaScript do arquivo original continua aqui...]
// Por questões de espaço, não vou replicar todo o código original das outras páginas,
// mas ele deve ser mantido EXATAMENTE como estava no arquivo original que você forneceu.
