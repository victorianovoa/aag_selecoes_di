# aag_selecoes_di
AAG Seleções - Sistema de Gestão de Concursos Públicos
📋 Sobre o Projeto
O AAG Seleções é um sistema completo para gestão de estudos e acompanhamento de concursos públicos. Desenvolvido como projeto acadêmico para a disciplina de Desenvolvimento de Interfaces.
🎯 Funcionalidades
1. Página Inicial (Home)

Dashboard com visão geral dos estudos
Alertas importantes sobre vencimentos e provas
Rotina de estudos com progresso
Próximas provas agendadas
Ranking de desempenho

2. Bancas Organizadoras

Listagem de 5 principais bancas (CEBRASPE, FCC, FGV, VUNESP, CESGRANRIO)
Informações detalhadas sobre cada banca
Critérios de avaliação específicos
Dicas de estudo personalizadas
Editais abertos por banca

3. Editais

Lista completa de editais disponíveis
Sistema de filtros (busca, banca, status)
Informações detalhadas (vagas, salário, datas)
Áreas de atuação
Links para documentos oficiais

4. Planner de Estudos

Calendário mensal interativo
Adicionar/remover eventos
Tipos de eventos (Estudo, Prova, Pagamento, Outros)
Lista de próximos eventos
Legenda visual por tipo

5. Boletim de Performance

Estatísticas de horas de estudo
Progresso por disciplina
Histórico de simulados
Ranking geral
Conquistas e medalhas

6. Perfil do Usuário

Informações pessoais completas
Dados de endereço
Preferências de concursos
Áreas de foco
Edição de dados

7. Pagamentos

Inscrições pendentes com alertas
Histórico de pagamentos
Múltiplas formas de pagamento (Boleto, PIX)
Comprovantes para download

8. Configurações

Notificações customizáveis
Alternância de tema (Claro/Escuro)
Segurança e privacidade
Gerenciamento de dados
Alteração de senha

🎨 Características Técnicas
Tecnologias Utilizadas

HTML5: Estrutura semântica
CSS3: Estilização moderna com variáveis CSS
JavaScript (Vanilla): Funcionalidades dinâmicas

Design

Interface responsiva (Desktop e Mobile)
Modo claro e escuro
Animações suaves
Componentes modulares
Paleta de cores moderna

Arquitetura

Separação clara de responsabilidades (HTML, CSS, JS)
Código modular e reutilizável
Sistema de navegação SPA (Single Page Application)
Armazenamento local para preferências

📁 Estrutura de Arquivos
aag-selecoes/
│
├── index.html          # Estrutura HTML principal
├── styles.css          # Estilos completos (juntar parts 1-4)
├── script.js           # JavaScript completo (juntar parts 1-5)
└── README.md           # Este arquivo
🚀 Como Usar
Instalação

Crie a estrutura de arquivos:

   mkdir aag-selecoes
   cd aag-selecoes

Crie os arquivos:

index.html - Cole o conteúdo do HTML principal
styles.css - Junte CSS Parts 1, 2, 3 e 4 em ordem
script.js - Junte JS Parts 1, 2, 3, 4 e 5 em ordem


Abra no navegador:

Clique duas vezes em index.html, ou
Use um servidor local (recomendado)



Servidor Local (Recomendado)
bash# Com Python 3
python -m http.server 8000

# Com Node.js (http-server)
npx http-server

# Com PHP
php -S localhost:8000
Acesse: http://localhost:8000
💡 Funcionalidades em Destaque
Tema Dark/Light

Alternância automática
Persistência de preferência
Ícone dinâmico (lua/sol)

Calendário Interativo

Navegação entre meses
Visualização de eventos
Adição rápida de compromissos
Indicadores visuais por tipo

Sistema de Filtros

Busca em tempo real
Filtros combinados
Resultados instantâneos

Modais Dinâmicos

Criação sob demanda
Conteúdo personalizado
Animações suaves
Fechamento por overlay ou botão

🎓 Créditos Acadêmicos

Disciplina: Desenvolvimento de Interfaces
Instituição: [Sua Instituição]
Desenvolvedor: [Seu Nome]
Data: Dezembro 2025

📝 Notas de Desenvolvimento
Dados Mockados
Todos os dados são estáticos (mockados) para fins de demonstração:

Bancas e editais
Eventos do calendário
Histórico de pagamentos
Estatísticas de desempenho

Melhorias Futuras

Integração com backend real
Sistema de autenticação
Notificações push
Sincronização com calendário do sistema
Exportação de dados (PDF, Excel)
Integração com plataformas de pagamento

🔧 Personalização
Cores
Edite as variáveis CSS em styles.css:
css:root {
    --primary: #6366f1;
    --secondary: #8b5cf6;
    --success: #22c55e;
    --warning: #f59e0b;
    --danger: #ef4444;
}
Fontes
A fonte padrão é "Segoe UI". Para alterar:
cssbody {
    font-family: 'SUA_FONTE', sans-serif;
}
📱 Responsividade
O sistema é totalmente responsivo com breakpoints em:

Desktop: > 1024px
Tablet: 768px - 1024px
Mobile: < 768px

⚠️ Requisitos

Navegador moderno (Chrome, Firefox, Safari, Edge)
JavaScript habilitado
Resolução mínima: 320px

📄 Licença
Projeto acadêmico - Uso educacional

Desenvolvido com 💙 para a disciplina de Desenvolvimento de Interfaces
