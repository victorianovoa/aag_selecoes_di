// ===== INICIALIZAÇÃO =====
document.addEventListener('DOMContentLoaded', () => {
    initializeApp();
});

function initializeApp() {
    setupNavigation();
    setupThemeToggle();
    setupUserMenu();
    loadPages();
    checkStoredTheme();
}

// ===== NAVEGAÇÃO =====
function setupNavigation() {
    const navLinks = document.querySelectorAll('.nav-link');
    const dropdownLinks = document.querySelectorAll('.dropdown-menu a[data-page]');
    
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
// ===== PÁGINA DE BANCAS =====
const bancasData = [
    {
        id: 'cebraspe',
        nome: 'CEBRASPE',
        logo: '🎓',
        descricao: 'Centro Brasileiro de Pesquisa em Avaliação e Seleção e de Promoção de Eventos',
        criterios: {
            pontuacao: 'Uma errada anula uma certa',
            tipo: 'Objetiva e Discursiva',
            especialidade: 'Direito, Administração, TI'
        },
        editaisAbertos: 3,
        proxProva: '15/12/2025',
        dicas: [
            'Leia atentamente os enunciados, são longos e detalhados',
            'Foco em jurisprudência e doutrina majoritária',
            'Cuidado com as pegadinhas nas assertivas'
        ]
    },
    {
        id: 'fcc',
        nome: 'FCC',
        logo: '📋',
        descricao: 'Fundação Carlos Chagas',
        criterios: {
            pontuacao: 'Sem anulação de questões',
            tipo: 'Objetiva',
            especialidade: 'Tribunais, Bancários, Fiscal'
        },
        editaisAbertos: 5,
        proxProva: '20/12/2025',
        dicas: [
            'Questões diretas e objetivas',
            'Foco em legislação seca',
            'Atenção aos detalhes numéricos'
        ]
    },
    {
        id: 'fgv',
        nome: 'FGV',
        logo: '🏛️',
        descricao: 'Fundação Getúlio Vargas',
        criterios: {
            pontuacao: 'Sem anulação de questões',
            tipo: 'Objetiva e Discursiva',
            especialidade: 'Legislativo, Judiciário, Executivo'
        },
        editaisAbertos: 4,
        proxProva: '28/12/2025',
        dicas: [
            'Questões interpretativas e contextualizadas',
            'Exige raciocínio lógico apurado',
            'Cobra doutrina e jurisprudência recente'
        ]
    },
    {
        id: 'vunesp',
        nome: 'VUNESP',
        logo: '📝',
        descricao: 'Fundação para o Vestibular da UNESP',
        criterios: {
            pontuacao: 'Sem anulação de questões',
            tipo: 'Objetiva',
            especialidade: 'Tribunais SP, Prefeituras, TI'
        },
        editaisAbertos: 6,
        proxProva: '10/01/2026',
        dicas: [
            'Questões claras e diretas',
            'Foco em legislação estadual paulista',
            'Boa distribuição de pontos por matéria'
        ]
    },
    {
        id: 'cesgranrio',
        nome: 'CESGRANRIO',
        logo: '🎯',
        descricao: 'Centro de Seleção de Candidatos ao Ensino Superior do Grande Rio',
        criterios: {
            pontuacao: 'Sem anulação de questões',
            tipo: 'Objetiva e Discursiva',
            especialidade: 'Petrobras, Bancos, Estatais'
        },
        editaisAbertos: 2,
        proxProva: '05/01/2026',
        dicas: [
            'Questões técnicas e específicas',
            'Exige conhecimento profundo da área',
            'Redação tem peso significativo'
        ]
    }
];

function getBancasContent() {
    return `
        <div class="page-header">
            <h2><i class="fas fa-building"></i> Bancas Organizadoras</h2>
            <p>Conheça as principais bancas e seus critérios de avaliação</p>
        </div>
        
        <div class="bancas-grid">
            ${bancasData.map(banca => `
                <div class="banca-card" data-banca="${banca.id}">
                    <div class="banca-header">
                        <div class="banca-logo">${banca.logo}</div>
                        <div class="banca-title">
                            <h3>${banca.nome}</h3>
                            <p>${banca.descricao}</p>
                        </div>
                    </div>
                    <div class="banca-info">
                        <div class="info-item">
                            <i class="fas fa-clipboard-check"></i>
                            <span>${banca.editaisAbertos} editais abertos</span>
                        </div>
                        <div class="info-item">
                            <i class="fas fa-calendar"></i>
                            <span>Próxima prova: ${banca.proxProva}</span>
                        </div>
                    </div>
                    <button class="btn-primary btn-full" onclick="showBancaDetails('${banca.id}')">
                        Ver Detalhes <i class="fas fa-arrow-right"></i>
                    </button>
                </div>
            `).join('')}
        </div>
    `;
}

function setupBancasEvents() {
    // Eventos já são configurados via onclick nos botões
}

window.showBancaDetails = function(bancaId) {
    const banca = bancasData.find(b => b.id === bancaId);
    
    const content = `
        <div class="banca-details">
            <div class="banca-logo-large">${banca.logo}</div>
            <h3>${banca.nome}</h3>
            <p class="banca-description">${banca.descricao}</p>
            
            <div class="criterios-section">
                <h4><i class="fas fa-check-circle"></i> Critérios de Avaliação</h4>
                <div class="criterios-grid">
                    <div class="criterio-item">
                        <strong>Pontuação:</strong>
                        <span>${banca.criterios.pontuacao}</span>
                    </div>
                    <div class="criterio-item">
                        <strong>Tipo de Prova:</strong>
                        <span>${banca.criterios.tipo}</span>
                    </div>
                    <div class="criterio-item">
                        <strong>Especialidade:</strong>
                        <span>${banca.criterios.especialidade}</span>
                    </div>
                </div>
            </div>
            
            <div class="dicas-section">
                <h4><i class="fas fa-lightbulb"></i> Dicas de Estudo</h4>
                <ul class="dicas-list">
                    ${banca.dicas.map(dica => `<li>${dica}</li>`).join('')}
                </ul>
            </div>
            
            <div class="modal-actions">
                <button class="btn-primary" onclick="verEditaisBanca('${banca.id}')">
                    Ver Editais da Banca
                </button>
            </div>
        </div>
    `;
    
    createModal(`Detalhes - ${banca.nome}`, content);
};

window.verEditaisBanca = function(bancaId) {
    document.getElementById('modalContainer').innerHTML = '';
    navigateToPage('editais');
    // Filtrar por banca específica
    setTimeout(() => {
        const filterSelect = document.getElementById('bancaFilter');
        if (filterSelect) {
            filterSelect.value = bancaId;
            filterEditais();
        }
    }, 100);
};

// ===== PÁGINA DE EDITAIS =====
const editaisData = [
    {
        id: 1,
        titulo: 'TJDFT - Analista Judiciário',
        banca: 'cebraspe',
        orgao: 'Tribunal de Justiça do Distrito Federal',
        vagas: 45,
        salario: 'R$ 13.994,78',
        inscricoes: '10/11/2025 - 30/11/2025',
        prova: '15/12/2025',
        status: 'aberto',
        areas: ['Direito', 'Administrativa']
    },
    {
        id: 2,
        titulo: 'Receita Federal - Auditor Fiscal',
        banca: 'cebraspe',
        orgao: 'Secretaria da Receita Federal',
        vagas: 200,
        salario: 'R$ 21.029,09',
        inscricoes: '05/11/2025 - 25/11/2025',
        prova: '22/12/2025',
        status: 'aberto',
        areas: ['Tributário', 'Contabilidade']
    },
    {
        id: 3,
        titulo: 'TRF 1ª Região - Técnico Judiciário',
        banca: 'fcc',
        orgao: 'Tribunal Regional Federal da 1ª Região',
        vagas: 80,
        salario: 'R$ 8.529,65',
        inscricoes: '15/11/2025 - 15/12/2025',
        prova: '20/01/2026',
        status: 'aberto',
        areas: ['Administrativa', 'TI']
    },
    {
        id: 4,
        titulo: 'Banco do Brasil - Escriturário',
        banca: 'cesgranrio',
        orgao: 'Banco do Brasil S.A.',
        vagas: 1500,
        salario: 'R$ 3.622,23',
        inscricoes: '20/11/2025 - 20/12/2025',
        prova: '10/02/2026',
        status: 'aberto',
        areas: ['Bancário']
    },
    {
        id: 5,
        titulo: 'Prefeitura de SP - Fiscal de Rendas',
        banca: 'vunesp',
        orgao: 'Prefeitura Municipal de São Paulo',
        vagas: 50,
        salario: 'R$ 9.876,45',
        inscricoes: '01/12/2025 - 31/12/2025',
        prova: '15/02/2026',
        status: 'aberto',
        areas: ['Tributário', 'Fiscal']
    }
];

function getEditaisContent() {
    return `
        <div class="page-header">
            <h2><i class="fas fa-file-alt"></i> Editais Abertos</h2>
            <p>Confira os concursos públicos disponíveis</p>
        </div>
        
        <div class="editais-filters">
            <div class="filter-group">
                <label><i class="fas fa-search"></i> Buscar</label>
                <input type="text" id="searchEdital" placeholder="Pesquisar edital..." class="filter-input">
            </div>
            <div class="filter-group">
                <label><i class="fas fa-building"></i> Banca</label>
                <select id="bancaFilter" class="filter-select">
                    <option value="">Todas</option>
                    ${bancasData.map(b => `<option value="${b.id}">${b.nome}</option>`).join('')}
                </select>
            </div>
            <div class="filter-group">
                <label><i class="fas fa-filter"></i> Status</label>
                <select id="statusFilter" class="filter-select">
                    <option value="">Todos</option>
                    <option value="aberto">Abertos</option>
                    <option value="previsto">Previstos</option>
                </select>
            </div>
        </div>
        
        <div id="editaisContainer" class="editais-list">
            ${renderEditais(editaisData)}
        </div>
    `;
}

function renderEditais(editais) {
    return editais.map(edital => `
        <div class="edital-card">
            <div class="edital-header">
                <div>
                    <h3>${edital.titulo}</h3>
                    <p class="edital-orgao">${edital.orgao}</p>
                </div>
                <span class="badge-success">${edital.status === 'aberto' ? 'Inscrições Abertas' : 'Previsto'}</span>
            </div>
            <div class="edital-body">
                <div class="edital-info-grid">
                    <div class="info-col">
                        <i class="fas fa-users"></i>
                        <span><strong>Vagas:</strong> ${edital.vagas}</span>
                    </div>
                    <div class="info-col">
                        <i class="fas fa-money-bill-wave"></i>
                        <span><strong>Salário:</strong> ${edital.salario}</span>
                    </div>
                    <div class="info-col">
                        <i class="fas fa-calendar-alt"></i>
                        <span><strong>Inscrições:</strong> ${edital.inscricoes}</span>
                    </div>
                    <div class="info-col">
                        <i class="fas fa-clipboard-check"></i>
                        <span><strong>Prova:</strong> ${edital.prova}</span>
                    </div>
                </div>
                <div class="edital-areas">
                    ${edital.areas.map(area => `<span class="area-tag">${area}</span>`).join('')}
                </div>
            </div>
            <div class="edital-actions">
                <button class="btn-primary" onclick="viewEditalDetails(${edital.id})">
                    Ver Detalhes
                </button>
                <button class="btn-secondary">
                    <i class="fas fa-bell"></i> Acompanhar
                </button>
            </div>
        </div>
    `).join('');
}

function setupEditaisEvents() {
    document.getElementById('searchEdital').addEventListener('input', filterEditais);
    document.getElementById('bancaFilter').addEventListener('change', filterEditais);
    document.getElementById('statusFilter').addEventListener('change', filterEditais);
}

function filterEditais() {
    const search = document.getElementById('searchEdital').value.toLowerCase();
    const banca = document.getElementById('bancaFilter').value;
    const status = document.getElementById('statusFilter').value;
    
    const filtered = editaisData.filter(edital => {
        const matchSearch = edital.titulo.toLowerCase().includes(search) || 
                          edital.orgao.toLowerCase().includes(search);
        const matchBanca = !banca || edital.banca === banca;
        const matchStatus = !status || edital.status === status;
        
        return matchSearch && matchBanca && matchStatus;
    });
    
    document.getElementById('editaisContainer').innerHTML = renderEditais(filtered);
}

window.viewEditalDetails = function(editalId) {
    const edital = editaisData.find(e => e.id === editalId);
    
    const content = `
        <div class="edital-full-details">
            <h3>${edital.titulo}</h3>
            <p class="edital-orgao">${edital.orgao}</p>
            
            <div class="details-grid">
                <div class="detail-item">
                    <strong>Vagas:</strong> ${edital.vagas}
                </div>
                <div class="detail-item">
                    <strong>Salário:</strong> ${edital.salario}
                </div>
                <div class="detail-item">
                    <strong>Período de Inscrições:</strong> ${edital.inscricoes}
                </div>
                <div class="detail-item">
                    <strong>Data da Prova:</strong> ${edital.prova}
                </div>
                <div class="detail-item">
                    <strong>Banca:</strong> ${bancasData.find(b => b.id === edital.banca).nome}
                </div>
                <div class="detail-item">
                    <strong>Status:</strong> <span class="badge-success">Inscrições Abertas</span>
                </div>
            </div>
            
            <div class="modal-actions">
                <button class="btn-primary">
                    <i class="fas fa-external-link-alt"></i> Acessar Edital Completo
                </button>
                <button class="btn-secondary">
                    <i class="fas fa-download"></i> Baixar PDF
                </button>
            </div>
        </div>
    `;
    
    createModal('Detalhes do Edital', content);
};
// ===== PÁGINA DE PLANNER =====
let currentDate = new Date();
let events = [
    {
        id: 1,
        title: 'Prova TJDFT',
        date: '2025-12-15',
        time: '14:00',
        type: 'exam',
        description: 'Prova para Analista Judiciário'
    },
    {
        id: 2,
        title: 'Estudar Constitucional',
        date: '2025-12-01',
        time: '19:00',
        type: 'study',
        description: 'Direitos Fundamentais - Art. 5º'
    },
    {
        id: 3,
        title: 'Vencimento GRU',
        date: '2025-12-01',
        time: '23:59',
        type: 'payment',
        description: 'Pagamento Receita Federal'
    }
];

function getPlannerContent() {
    return `
        <div class="page-header">
            <h2><i class="fas fa-calendar-alt"></i> Planner de Estudos</h2>
            <p>Organize sua rotina e acompanhe seus compromissos</p>
        </div>
        
        <div class="planner-container">
            <div class="planner-sidebar">
                <button class="btn-primary btn-full" onclick="openNewEventModal()">
                    <i class="fas fa-plus"></i> Novo Evento
                </button>
                
                <div class="upcoming-events">
                    <h3>Próximos Eventos</h3>
                    <div id="upcomingEventsList">
                        ${renderUpcomingEvents()}
                    </div>
                </div>
                
                <div class="event-legend">
                    <h4>Legenda</h4>
                    <div class="legend-item">
                        <span class="legend-color exam"></span>
                        <span>Provas</span>
                    </div>
                    <div class="legend-item">
                        <span class="legend-color study"></span>
                        <span>Estudos</span>
                    </div>
                    <div class="legend-item">
                        <span class="legend-color payment"></span>
                        <span>Pagamentos</span>
                    </div>
                    <div class="legend-item">
                        <span class="legend-color other"></span>
                        <span>Outros</span>
                    </div>
                </div>
            </div>
            
            <div class="calendar-container">
                <div class="calendar-header">
                    <button class="btn-icon" onclick="previousMonth()">
                        <i class="fas fa-chevron-left"></i>
                    </button>
                    <h3 id="currentMonthYear"></h3>
                    <button class="btn-icon" onclick="nextMonth()">
                        <i class="fas fa-chevron-right"></i>
                    </button>
                </div>
                
                <div class="calendar-weekdays">
                    <div>Dom</div>
                    <div>Seg</div>
                    <div>Ter</div>
                    <div>Qua</div>
                    <div>Qui</div>
                    <div>Sex</div>
                    <div>Sáb</div>
                </div>
                
                <div id="calendarDays" class="calendar-days"></div>
            </div>
        </div>
    `;
}

function setupPlannerEvents() {
    renderCalendar();
}

function renderCalendar() {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    
    // Atualiza título
    const monthNames = ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho',
                       'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'];
    document.getElementById('currentMonthYear').textContent = `${monthNames[month]} ${year}`;
    
    // Calcula dias
    const firstDay = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const daysInPrevMonth = new Date(year, month, 0).getDate();
    
    let daysHTML = '';
    
    // Dias do mês anterior
    for (let i = firstDay - 1; i >= 0; i--) {
        const day = daysInPrevMonth - i;
        daysHTML += `<div class="calendar-day other-month">${day}</div>`;
    }
    
    // Dias do mês atual
    for (let day = 1; day <= daysInMonth; day++) {
        const dateStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
        const dayEvents = events.filter(e => e.date === dateStr);
        const isToday = new Date().toDateString() === new Date(year, month, day).toDateString();
        
        let dayClass = 'calendar-day';
        if (isToday) dayClass += ' today';
        if (dayEvents.length > 0) dayClass += ' has-events';
        
        daysHTML += `
            <div class="${dayClass}" onclick="showDayEvents('${dateStr}')">
                <span class="day-number">${day}</span>
                ${dayEvents.length > 0 ? `
                    <div class="day-events">
                        ${dayEvents.map(e => `<span class="event-dot ${e.type}"></span>`).join('')}
                    </div>
                ` : ''}
            </div>
        `;
    }
    
    // Dias do próximo mês
    const totalCells = firstDay + daysInMonth;
    const remainingCells = totalCells % 7 === 0 ? 0 : 7 - (totalCells % 7);
    for (let i = 1; i <= remainingCells; i++) {
        daysHTML += `<div class="calendar-day other-month">${i}</div>`;
    }
    
    document.getElementById('calendarDays').innerHTML = daysHTML;
}

function renderUpcomingEvents() {
    const today = new Date();
    const upcoming = events
        .filter(e => new Date(e.date) >= today)
        .sort((a, b) => new Date(a.date) - new Date(b.date))
        .slice(0, 5);
    
    if (upcoming.length === 0) {
        return '<p class="no-events">Nenhum evento próximo</p>';
    }
    
    return upcoming.map(event => `
        <div class="upcoming-event ${event.type}">
            <div class="event-date">
                <span class="event-day">${new Date(event.date).getDate()}</span>
                <span class="event-month">${new Date(event.date).toLocaleDateString('pt-BR', {month: 'short'})}</span>
            </div>
            <div class="event-info">
                <h4>${event.title}</h4>
                <p><i class="fas fa-clock"></i> ${event.time}</p>
            </div>
        </div>
    `).join('');
}

window.previousMonth = function() {
    currentDate.setMonth(currentDate.getMonth() - 1);
    renderCalendar();
};

window.nextMonth = function() {
    currentDate.setMonth(currentDate.getMonth() + 1);
    renderCalendar();
};

window.showDayEvents = function(dateStr) {
    const dayEvents = events.filter(e => e.date === dateStr);
    
    if (dayEvents.length === 0) {
        openNewEventModal(dateStr);
        return;
    }
    
    const date = new Date(dateStr);
    const formattedDate = date.toLocaleDateString('pt-BR', { 
        day: '2-digit', 
        month: 'long', 
        year: 'numeric' 
    });
    
    const content = `
        <div class="day-events-detail">
            <h3>${formattedDate}</h3>
            <div class="events-list">
                ${dayEvents.map(event => `
                    <div class="event-card ${event.type}">
                        <div class="event-header">
                            <h4>${event.title}</h4>
                            <button class="btn-icon" onclick="deleteEvent(${event.id})">
                                <i class="fas fa-trash"></i>
                            </button>
                        </div>
                        <p><i class="fas fa-clock"></i> ${event.time}</p>
                        <p>${event.description}</p>
                    </div>
                `).join('')}
            </div>
            <button class="btn-secondary btn-full" onclick="openNewEventModal('${dateStr}')">
                <i class="fas fa-plus"></i> Adicionar Evento
            </button>
        </div>
    `;
    
    createModal('Eventos do Dia', content);
};

window.openNewEventModal = function(dateStr = '') {
    const defaultDate = dateStr || new Date().toISOString().split('T')[0];
    
    const content = `
        <form id="newEventForm" class="event-form">
            <div class="form-group">
                <label>Título do Evento</label>
                <input type="text" id="eventTitle" class="form-input" required>
            </div>
            
            <div class="form-row">
                <div class="form-group">
                    <label>Data</label>
                    <input type="date" id="eventDate" class="form-input" value="${defaultDate}" required>
                </div>
                <div class="form-group">
                    <label>Hora</label>
                    <input type="time" id="eventTime" class="form-input" required>
                </div>
            </div>
            
            <div class="form-group">
                <label>Tipo</label>
                <select id="eventType" class="form-input">
                    <option value="study">Estudo</option>
                    <option value="exam">Prova</option>
                    <option value="payment">Pagamento</option>
                    <option value="other">Outro</option>
                </select>
            </div>
            
            <div class="form-group">
                <label>Descrição</label>
                <textarea id="eventDescription" class="form-input" rows="3"></textarea>
            </div>
            
            <button type="submit" class="btn-primary btn-full">
                <i class="fas fa-check"></i> Salvar Evento
            </button>
        </form>
    `;
    
    createModal('Novo Evento', content);
    
    document.getElementById('newEventForm').addEventListener('submit', (e) => {
        e.preventDefault();
        
        const newEvent = {
            id: events.length + 1,
            title: document.getElementById('eventTitle').value,
            date: document.getElementById('eventDate').value,
            time: document.getElementById('eventTime').value,
            type: document.getElementById('eventType').value,
            description: document.getElementById('eventDescription').value
        };
        
        events.push(newEvent);
        document.getElementById('modalContainer').innerHTML = '';
        
        // Atualiza calendário e lista
        renderCalendar();
        document.getElementById('upcomingEventsList').innerHTML = renderUpcomingEvents();
        
        alert('Evento adicionado com sucesso!');
    });
};

window.deleteEvent = function(eventId) {
    if (confirm('Tem certeza que deseja excluir este evento?')) {
        events = events.filter(e => e.id !== eventId);
        document.getElementById('modalContainer').innerHTML = '';
        renderCalendar();
        document.getElementById('upcomingEventsList').innerHTML = renderUpcomingEvents();
    }
};
// ===== PÁGINA DE BOLETIM =====
const performanceData = {
    horasEstudo: {
        semanal: 18,
        mensal: 72,
        total: 340
    },
    disciplinas: [
        { nome: 'Direito Constitucional', progresso: 85, horasGastas: 120, questoesFeitas: 450, acertos: 78 },
        { nome: 'Direito Administrativo', progresso: 72, horasGastas: 95, questoesFeitas: 380, acertos: 71 },
        { nome: 'Informática', progresso: 90, horasGastas: 80, questoesFeitas: 520, acertos: 85 },
        { nome: 'Português', progresso: 65, horasGastas: 45, questoesFeitas: 200, acertos: 68 }
    ],
    simulados: [
        { data: '2025-11-25', prova: 'TJDFT Simulado 1', nota: 85, acertos: 51, total: 60 },
        { data: '2025-11-18', prova: 'Receita Federal Simulado 2', nota: 78, acertos: 47, total: 60 },
        { data: '2025-11-10', prova: 'TJDFT Simulado 2', nota: 92, acertos: 55, total: 60 }
    ],
    ranking: {
        posicao: 1,
        total: 1247,
        pontos: 98.5,
        percentil: 99.9
    }
};

function getBoletimContent() {
    return `
        <div class="page-header">
            <h2><i class="fas fa-chart-line"></i> Boletim de Performance</h2>
            <p>Acompanhe seu desempenho e evolução nos estudos</p>
        </div>
        
        <div class="boletim-overview">
            <div class="stat-card-large">
                <i class="fas fa-clock"></i>
                <div>
                    <h3>${performanceData.horasEstudo.semanal}h</h3>
                    <p>Esta semana</p>
                </div>
            </div>
            <div class="stat-card-large">
                <i class="fas fa-calendar-week"></i>
                <div>
                    <h3>${performanceData.horasEstudo.mensal}h</h3>
                    <p>Este mês</p>
                </div>
            </div>
            <div class="stat-card-large">
                <i class="fas fa-book-open"></i>
                <div>
                    <h3>${performanceData.horasEstudo.total}h</h3>
                    <p>Total acumulado</p>
                </div>
            </div>
            <div class="stat-card-large primary">
                <i class="fas fa-trophy"></i>
                <div>
                    <h3>${performanceData.ranking.posicao}º lugar</h3>
                    <p>Entre ${performanceData.ranking.total} alunos</p>
                </div>
            </div>
        </div>
        
        <div class="boletim-grid">
            <div class="card">
                <div class="card-header">
                    <h3><i class="fas fa-book"></i> Progresso por Disciplina</h3>
                </div>
                <div class="card-body">
                    ${performanceData.disciplinas.map(disc => `
                        <div class="disciplina-item">
                            <div class="disciplina-header">
                                <h4>${disc.nome}</h4>
                                <span class="progress-percent">${disc.progresso}%</span>
                            </div>
                            <div class="progress-bar-large">
                                <div class="progress-fill" style="width: ${disc.progresso}%"></div>
                            </div>
                            <div class="disciplina-stats">
                                <span><i class="fas fa-clock"></i> ${disc.horasGastas}h estudadas</span>
                                <span><i class="fas fa-question-circle"></i> ${disc.questoesFeitas} questões</span>
                                <span><i class="fas fa-check-circle"></i> ${disc.acertos}% acertos</span>
                            </div>
                        </div>
                    `).join('')}
                </div>
            </div>
            
            <div class="card">
                <div class="card-header">
                    <h3><i class="fas fa-clipboard-check"></i> Histórico de Simulados</h3>
                </div>
                <div class="card-body">
                    ${performanceData.simulados.map(sim => `
                        <div class="simulado-item">
                            <div class="simulado-header">
                                <h4>${sim.prova}</h4>
                                <span class="nota-badge ${sim.nota >= 80 ? 'excellent' : sim.nota >= 60 ? 'good' : 'poor'}">
                                    ${sim.nota}
                                </span>
                            </div>
                            <p class="simulado-date">${new Date(sim.data).toLocaleDateString('pt-BR')}</p>
                            <div class="simulado-result">
                                <span>${sim.acertos} / ${sim.total} questões corretas</span>
                                <div class="progress-bar-small">
                                    <div class="progress-fill" style="width: ${(sim.acertos/sim.total)*100}%"></div>
                                </div>
                            </div>
                        </div>
                    `).join('')}
                </div>
            </div>
            
            <div class="card">
                <div class="card-header">
                    <h3><i class="fas fa-medal"></i> Seu Ranking</h3>
                </div>
                <div class="card-body">
                    <div class="ranking-card">
                        <div class="ranking-position">
                            <span class="position-number">${performanceData.ranking.posicao}º</span>
                            <p>Posição Geral</p>
                        </div>
                        <div class="ranking-stats-grid">
                            <div class="ranking-stat">
                                <strong>${performanceData.ranking.pontos}</strong>
                                <span>Pontos</span>
                            </div>
                            <div class="ranking-stat">
                                <strong>${performanceData.ranking.percentil}%</strong>
                                <span>Percentil</span>
                            </div>
                            <div class="ranking-stat">
                                <strong>${performanceData.ranking.total}</strong>
                                <span>Total de alunos</span>
                            </div>
                        </div>
                    </div>
                    <div class="achievements">
                        <h4>Conquistas Recentes</h4>
                        <div class="achievement-item">
                            <i class="fas fa-fire"></i>
                            <span>7 dias consecutivos de estudo</span>
                        </div>
                        <div class="achievement-item">
                            <i class="fas fa-star"></i>
                            <span>100 questões respondidas em uma semana</span>
                        </div>
                        <div class="achievement-item">
                            <i class="fas fa-chart-line"></i>
                            <span>Top 1% em Direito Constitucional</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `;
}

// ===== PÁGINA DE PERFIL =====
const userData = {
    nome: 'Fernanda Costa',
    email: 'fernanda.costa@email.com',
    cpf: '123.456.789-00',
    telefone: '(61) 98765-4321',
    dataNascimento: '1995-08-15',
    endereco: {
        cep: '70000-000',
        rua: 'SQN 123 Bloco A',
        cidade: 'Brasília',
        estado: 'DF'
    },
    concursosInteresse: ['TJDFT', 'Receita Federal', 'Banco do Brasil'],
    areasFoco: ['Direito', 'TI', 'Administrativa']
};

function getPerfilContent() {
    return `
        <div class="page-header">
            <h2><i class="fas fa-user"></i> Meu Perfil</h2>
            <p>Gerencie suas informações pessoais</p>
        </div>
        
        <div class="perfil-container">
            <div class="perfil-sidebar">
                <div class="profile-avatar">
                    <img src="https://ui-avatars.com/api/?name=Fernanda+Costa&background=6366f1&color=fff&size=200" alt="Avatar">
                    <button class="btn-secondary btn-full">
                        <i class="fas fa-camera"></i> Alterar Foto
                    </button>
                </div>
                
                <div class="profile-stats">
                    <div class="stat-item">
                        <i class="fas fa-calendar-alt"></i>
                        <div>
                            <strong>Membro desde</strong>
                            <span>Janeiro 2025</span>
                        </div>
                    </div>
                    <div class="stat-item">
                        <i class="fas fa-trophy"></i>
                        <div>
                            <strong>Ranking</strong>
                            <span>1º lugar</span>
                        </div>
                    </div>
                    <div class="stat-item">
                        <i class="fas fa-check-circle"></i>
                        <div>
                            <strong>Conquistas</strong>
                            <span>12 medalhas</span>
                        </div>
                    </div>
                </div>
            </div>
            
            <div class="perfil-main">
                <div class="card">
                    <div class="card-header">
                        <h3>Informações Pessoais</h3>
                        <button class="btn-text" onclick="editProfile()">
                            <i class="fas fa-edit"></i> Editar
                        </button>
                    </div>
                    <div class="card-body">
                        <div class="info-grid">
                            <div class="info-item">
                                <label>Nome Completo</label>
                                <p>${userData.nome}</p>
                            </div>
                            <div class="info-item">
                                <label>E-mail</label>
                                <p>${userData.email}</p>
                            </div>
                            <div class="info-item">
                                <label>CPF</label>
                                <p>${userData.cpf}</p>
                            </div>
                            <div class="info-item">
                                <label>Telefone</label>
                                <p>${userData.telefone}</p>
                            </div>
                            <div class="info-item">
                                <label>Data de Nascimento</label>
                                <p>${new Date(userData.dataNascimento).toLocaleDateString('pt-BR')}</p>
                            </div>
                        </div>
                    </div>
                </div>
                
                <div class="card">
                    <div class="card-header">
                        <h3>Endereço</h3>
                        <button class="btn-text" onclick="editAddress()">
                            <i class="fas fa-edit"></i> Editar
                        </button>
                    </div>
                    <div class="card-body">
                        <div class="info-grid">
                            <div class="info-item">
                                <label>CEP</label>
                                <p>${userData.endereco.cep}</p>
                            </div>
                            <div class="info-item">
                                <label>Endereço</label>
                                <p>${userData.endereco.rua}</p>
                            </div>
                            <div class="info-item">
                                <label>Cidade</label>
                                <p>${userData.endereco.cidade}</p>
                            </div>
                            <div class="info-item">
                                <label>Estado</label>
                                <p>${userData.endereco.estado}</p>
                            </div>
                        </div>
                    </div>
                </div>
                
                <div class="card">
                    <div class="card-header">
                        <h3>Preferências de Concursos</h3>
                    </div>
                    <div class="card-body">
                        <div class="preference-section">
                            <h4>Concursos de Interesse</h4>
                            <div class="tags-container">
                                ${userData.concursosInteresse.map(c => `
                                    <span class="preference-tag">${c} <i class="fas fa-times"></i></span>
                                `).join('')}
                                <button class="btn-text">+ Adicionar</button>
                            </div>
                        </div>
                        
                        <div class="preference-section">
                            <h4>Áreas de Foco</h4>
                            <div class="tags-container">
                                ${userData.areasFoco.map(a => `
                                    <span class="preference-tag">${a} <i class="fas fa-times"></i></span>
                                `).join('')}
                                <button class="btn-text">+ Adicionar</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `;
}

function setupPerfilEvents() {
    // Eventos já configurados via onclick
}

window.editProfile = function() {
    const content = `
        <form id="editProfileForm" class="profile-form">
            <div class="form-group">
                <label>Nome Completo</label>
                <input type="text" class="form-input" value="${userData.nome}" required>
            </div>
            <div class="form-group">
                <label>E-mail</label>
                <input type="email" class="form-input" value="${userData.email}" required>
            </div>
            <div class="form-row">
                <div class="form-group">
                    <label>CPF</label>
                    <input type="text" class="form-input" value="${userData.cpf}" readonly>
                </div>
                <div class="form-group">
                    <label>Telefone</label>
                    <input type="tel" class="form-input" value="${userData.telefone}" required>
                </div>
            </div>
            <div class="form-group">
                <label>Data de Nascimento</label>
                <input type="date" class="form-input" value="${userData.dataNascimento}" required>
            </div>
            <button type="submit" class="btn-primary btn-full">
                <i class="fas fa-save"></i> Salvar Alterações
            </button>
        </form>
    `;
    
    createModal('Editar Perfil', content);
    
    document.getElementById('editProfileForm').addEventListener('submit', (e) => {
        e.preventDefault();
        alert('Perfil atualizado com sucesso!');
        document.getElementById('modalContainer').innerHTML = '';
    });
};

window.editAddress = function() {
    alert('Função de editar endereço - implementar conforme necessidade');
};
// ===== PÁGINA DE PAGAMENTOS =====
const paymentData = {
    inscricoes: [
        { 
            id: 1, 
            titulo: 'TJDFT - Analista', 
            valor: 150.00, 
            vencimento: '2025-12-01', 
            status: 'pendente',
            boleto: 'GRU-2399002100'
        },
        { 
            id: 2, 
            titulo: 'Receita Federal', 
            valor: 85.00, 
            vencimento: '2025-12-05', 
            status: 'pendente',
            boleto: 'GRU-2399002101'
        },
        { 
            id: 3, 
            titulo: 'TRF 1ª Região', 
            valor: 120.00, 
            vencimento: '2025-11-25', 
            status: 'pago',
            boleto: 'GRU-2399002099',
            dataPagamento: '2025-11-23'
        }
    ],
    historico: [
        { data: '2025-11-23', descricao: 'Inscrição TRF 1ª Região', valor: -120.00 },
        { data: '2025-11-15', descricao: 'Inscrição Banco do Brasil', valor: -60.00 },
        { data: '2025-11-01', descricao: 'Material de Estudo', valor: -89.90 }
    ],
    total: {
        pendente: 235.00,
        pago: 269.90
    }
};

function getPagamentosContent() {
    return `
        <div class="page-header">
            <h2><i class="fas fa-credit-card"></i> Pagamentos</h2>
            <p>Gerencie suas inscrições e pagamentos</p>
        </div>
        
        <div class="payments-summary">
            <div class="summary-card warning">
                <i class="fas fa-exclamation-triangle"></i>
                <div>
                    <h3>R$ ${paymentData.total.pendente.toFixed(2)}</h3>
                    <p>Pagamentos Pendentes</p>
                </div>
            </div>
            <div class="summary-card success">
                <i class="fas fa-check-circle"></i>
                <div>
                    <h3>R$ ${paymentData.total.pago.toFixed(2)}</h3>
                    <p>Total Pago</p>
                </div>
            </div>
        </div>
        
        <div class="payments-container">
            <div class="card">
                <div class="card-header">
                    <h3><i class="fas fa-file-invoice-dollar"></i> Inscrições Pendentes</h3>
                </div>
                <div class="card-body">
                    ${paymentData.inscricoes
                        .filter(i => i.status === 'pendente')
                        .map(inscricao => {
                            const vencimento = new Date(inscricao.vencimento);
                            const hoje = new Date();
                            const diasRestantes = Math.ceil((vencimento - hoje) / (1000 * 60 * 60 * 24));
                            const isUrgent = diasRestantes <= 3;
                            
                            return `
                        <div class="payment-item ${isUrgent ? 'urgent' : ''}">
                            <div class="payment-info">
                                <h4>${inscricao.titulo}</h4>
                                <p class="payment-code">${inscricao.boleto}</p>
                                <div class="payment-details">
                                    <span><i class="fas fa-money-bill-wave"></i> R$ ${inscricao.valor.toFixed(2)}</span>
                                    <span class="${isUrgent ? 'text-danger' : ''}">
                                        <i class="fas fa-calendar-alt"></i> 
                                        Vence em ${diasRestantes} ${diasRestantes === 1 ? 'dia' : 'dias'}
                                    </span>
                                </div>
                            </div>
                            <div class="payment-actions">
                                <button class="btn-primary" onclick="pagarInscricao(${inscricao.id})">
                                    <i class="fas fa-barcode"></i> Pagar
                                </button>
                                <button class="btn-secondary" onclick="copiarBoleto('${inscricao.boleto}')">
                                    <i class="fas fa-copy"></i> Copiar Código
                                </button>
                            </div>
                        </div>
                    `}).join('') || '<p class="no-data">Nenhum pagamento pendente</p>'}
                </div>
            </div>
            
            <div class="card">
                <div class="card-header">
                    <h3><i class="fas fa-check-double"></i> Pagamentos Realizados</h3>
                </div>
                <div class="card-body">
                    ${paymentData.inscricoes
                        .filter(i => i.status === 'pago')
                        .map(inscricao => `
                        <div class="payment-item paid">
                            <div class="payment-info">
                                <h4>${inscricao.titulo}</h4>
                                <p class="payment-code">${inscricao.boleto}</p>
                                <div class="payment-details">
                                    <span><i class="fas fa-money-bill-wave"></i> R$ ${inscricao.valor.toFixed(2)}</span>
                                    <span class="text-success">
                                        <i class="fas fa-check-circle"></i> 
                                        Pago em ${new Date(inscricao.dataPagamento).toLocaleDateString('pt-BR')}
                                    </span>
                                </div>
                            </div>
                            <button class="btn-text" onclick="baixarComprovante(${inscricao.id})">
                                <i class="fas fa-download"></i> Comprovante
                            </button>
                        </div>
                    `).join('')}
                </div>
            </div>
            
            <div class="card">
                <div class="card-header">
                    <h3><i class="fas fa-history"></i> Histórico de Transações</h3>
                </div>
                <div class="card-body">
                    ${paymentData.historico.map(item => `
                        <div class="transaction-item">
                            <div class="transaction-info">
                                <h4>${item.descricao}</h4>
                                <p>${new Date(item.data).toLocaleDateString('pt-BR')}</p>
                            </div>
                            <span class="transaction-value ${item.valor < 0 ? 'negative' : 'positive'}">
                                ${item.valor < 0 ? '-' : '+'} R$ ${Math.abs(item.valor).toFixed(2)}
                            </span>
                        </div>
                    `).join('')}
                </div>
            </div>
        </div>
    `;
}

window.pagarInscricao = function(id) {
    const inscricao = paymentData.inscricoes.find(i => i.id === id);
    
    const content = `
        <div class="payment-modal">
            <h3>Pagamento - ${inscricao.titulo}</h3>
            <div class="payment-info-modal">
                <p><strong>Código do Boleto:</strong> ${inscricao.boleto}</p>
                <p><strong>Valor:</strong> R$ ${inscricao.valor.toFixed(2)}</p>
                <p><strong>Vencimento:</strong> ${new Date(inscricao.vencimento).toLocaleDateString('pt-BR')}</p>
            </div>
            
            <div class="payment-methods">
                <button class="payment-method-btn" onclick="alert('Abrindo código de barras...')">
                    <i class="fas fa-barcode"></i>
                    <span>Código de Barras</span>
                </button>
                <button class="payment-method-btn" onclick="alert('Abrindo PIX...')">
                    <i class="fas fa-qrcode"></i>
                    <span>PIX</span>
                </button>
                <button class="payment-method-btn" onclick="alert('Baixando boleto...')">
                    <i class="fas fa-file-pdf"></i>
                    <span>Baixar Boleto</span>
                </button>
            </div>
        </div>
    `;
    
    createModal('Realizar Pagamento', content);
};

window.copiarBoleto = function(codigo) {
    navigator.clipboard.writeText(codigo).then(() => {
        alert('Código copiado para a área de transferência!');
    });
};

window.baixarComprovante = function(id) {
    alert('Baixando comprovante...');
};

// ===== PÁGINA DE CONFIGURAÇÕES =====
function getConfiguracoesContent() {
    return `
        <div class="page-header">
            <h2><i class="fas fa-cog"></i> Configurações</h2>
            <p>Personalize sua experiência no AAG Seleções</p>
        </div>
        
        <div class="settings-container">
            <div class="card">
                <div class="card-header">
                    <h3><i class="fas fa-bell"></i> Notificações</h3>
                </div>
                <div class="card-body">
                    <div class="setting-item">
                        <div class="setting-info">
                            <h4>Alertas de Vencimento</h4>
                            <p>Receba notificações sobre prazos e vencimentos</p>
                        </div>
                        <label class="toggle-switch">
                            <input type="checkbox" checked>
                            <span class="slider"></span>
                        </label>
                    </div>
                    
                    <div class="setting-item">
                        <div class="setting-info">
                            <h4>Novos Editais</h4>
                            <p>Seja notificado quando novos editais forem publicados</p>
                        </div>
                        <label class="toggle-switch">
                            <input type="checkbox" checked>
                            <span class="slider"></span>
                        </label>
                    </div>
                    
                    <div class="setting-item">
                        <div class="setting-info">
                            <h4>Lembretes de Estudo</h4>
                            <p>Receba lembretes diários sobre sua rotina de estudos</p>
                        </div>
                        <label class="toggle-switch">
                            <input type="checkbox">
                            <span class="slider"></span>
                        </label>
                    </div>
                    
                    <div class="setting-item">
                        <div class="setting-info">
                            <h4>E-mail Marketing</h4>
                            <p>Receba dicas e novidades sobre concursos</p>
                        </div>
                        <label class="toggle-switch">
                            <input type="checkbox" checked>
                            <span class="slider"></span>
                        </label>
                    </div>
                </div>
            </div>
            
            <div class="card">
                <div class="card-header">
                    <h3><i class="fas fa-palette"></i> Aparência</h3>
                </div>
                <div class="card-body">
                    <div class="setting-item">
                        <div class="setting-info">
                            <h4>Tema</h4>
                            <p>Escolha entre tema claro ou escuro</p>
                        </div>
                        <select class="setting-select" id="themeSelect">
                            <option value="light">Claro</option>
                            <option value="dark">Escuro</option>
                            <option value="auto">Automático</option>
                        </select>
                    </div>
                    
                    <div class="setting-item">
                        <div class="setting-info">
                            <h4>Tamanho da Fonte</h4>
                            <p>Ajuste o tamanho do texto</p>
                        </div>
                        <select class="setting-select">
                            <option value="small">Pequeno</option>
                            <option value="medium" selected>Médio</option>
                            <option value="large">Grande</option>
                        </select>
                    </div>
                </div>
            </div>
            
            <div class="card">
                <div class="card-header">
                    <h3><i class="fas fa-lock"></i> Segurança e Privacidade</h3>
                </div>
                <div class="card-body">
                    <div class="setting-item clickable" onclick="alterarSenha()">
                        <div class="setting-info">
                            <h4>Alterar Senha</h4>
                            <p>Atualize sua senha de acesso</p>
                        </div>
                        <i class="fas fa-chevron-right"></i>
                    </div>
                    
                    <div class="setting-item clickable">
                        <div class="setting-info">
                            <h4>Autenticação em Duas Etapas</h4>
                            <p>Adicione uma camada extra de segurança</p>
                        </div>
                        <i class="fas fa-chevron-right"></i>
                    </div>
                    
                    <div class="setting-item clickable">
                        <div class="setting-info">
                            <h4>Dispositivos Conectados</h4>
                            <p>Gerencie os dispositivos com acesso à sua conta</p>
                        </div>
                        <i class="fas fa-chevron-right"></i>
                    </div>
                </div>
            </div>
            
            <div class="card">
                <div class="card-header">
                    <h3><i class="fas fa-database"></i> Dados e Privacidade</h3>
                </div>
                <div class="card-body">
                    <div class="setting-item clickable">
                        <div class="setting-info">
                            <h4>Exportar Dados</h4>
                            <p>Baixe uma cópia de todos os seus dados</p>
                        </div>
                        <i class="fas fa-download"></i>
                    </div>
                    
                    <div class="setting-item clickable danger">
                        <div class="setting-info">
                            <h4>Excluir Conta</h4>
                            <p>Remova permanentemente sua conta e dados</p>
                        </div>
                        <i class="fas fa-trash"></i>
                    </div>
                </div>
            </div>
        </div>
    `;
}

function setupConfiguracoesEvents() {
    const themeSelect = document.getElementById('themeSelect');
    if (themeSelect) {
        const currentTheme = localStorage.getItem('theme') || 'light';
        themeSelect.value = currentTheme;
        
        themeSelect.addEventListener('change', (e) => {
            if (e.target.value === 'dark') {
                document.body.classList.add('dark-mode');
                localStorage.setItem('theme', 'dark');
            } else {
                document.body.classList.remove('dark-mode');
                localStorage.setItem('theme', 'light');
            }
        });
    }
}

window.alterarSenha = function() {
    const content = `
        <form id="changePasswordForm" class="password-form">
            <div class="form-group">
                <label>Senha Atual</label>
                <input type="password" class="form-input" required>
            </div>
            <div class="form-group">
                <label>Nova Senha</label>
                <input type="password" class="form-input" required>
            </div>
            <div class="form-group">
                <label>Confirmar Nova Senha</label>
                <input type="password" class="form-input" required>
            </div>
            <button type="submit" class="btn-primary btn-full">
                <i class="fas fa-save"></i> Alterar Senha
            </button>
        </form>
    `;
    
    createModal('Alterar Senha', content);
    
    document.getElementById('changePasswordForm').addEventListener('submit', (e) => {
        e.preventDefault();
        alert('Senha alterada com sucesso!');
        document.getElementById('modalContainer').innerHTML = '';
    });
};
