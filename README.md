# Desafio Técnico – EasySecrets

## Visão Geral
Dashboard analítico para visualização e gerenciamento de dados de vendas, desenvolvido com Next.js e Tailwind CSS.

Escolhi essas tecnologias por ter mais domínio nelas, o que facilitou as implementações e me permitiu focar mais na parte lógica, visual e na experiência do usuário.
Optei por não utilizar API ou banco de dados, mantendo o foco do desafio em frontend. A persistência dos dados foi feita via localStorage.

## Protótipo no Figma
[Clique aqui para visualizar](https://www.figma.com/design/wKnJEaGswZKhbvL9QDlhvq/Untitled?node-id=0-1&p=f&t=gk3cUI00A9LL6P4j-0)

## Tecnologias Utilizadas

### Next.js
Framework baseado em React que oferece:
- Renderização híbrida (SSR/CSR)
- Otimização de imagens e assets
- Suporte nativo a TypeScript

Escolhi o Next.js por sua flexibilidade e foco em performance, além de facilitar o roteamento e o build da aplicação.

### Tailwind CSS
Framework CSS utilitário que permite:
- Estilização rápida e responsiva
- Consistência visual
- CSS enxuto e reutilizável

Utilizei Tailwind por já ter bastante familiaridade e por ele acelerar bastante a criação de layouts agradáveis e funcionais.

### Redux Toolkit
Gerenciador de estado global com:
- Configuração simplificada
- Boa performance
- Integração com DevTools
- Middleware customizável

Foi útil para centralizar o estado da aplicação, mantendo previsibilidade e organização.

### Recharts
Biblioteca de gráficos com:
- Componentes altamente customizáveis
- Boa performance
- Responsividade nativa

Usei o Recharts para exibir visualizações ricas em dados com interatividade.

### Lucide Icons
Biblioteca de ícones leves e modernos:
- Design minimalista
- Fácil integração com React
- Performance otimizada

### Radix UI
Componentes acessíveis e reutilizáveis:
- Foco em acessibilidade
- Interação nativa e amigável
- Base sólida para UI customizada

## Pré-requisitos
- Node.js 18 ou superior
- npm ou yarn

## Instalação

```bash
# Clone o repositório
git clone https://github.com/PedroLSena/Desafio-tecnico-Easysecrets

# Acesse o diretório
cd desafio-tecnico-easysecrets

# Instale as dependências
npm install
# ou
yarn install

# Inicie o servidor de desenvolvimento
npm run dev
# ou
yarn dev
```

Acesse http://localhost:3000 no navegador.

## Estrutura do Projeto

```
src/
├── app/            → Rotas e páginas da aplicação
├── components/     → Componentes React reutilizáveis
│   └── ui/         → Componentes de UI base (como cards e botões)
├── hooks/          → Hooks personalizados
├── lib/            → Utilitários e configurações globais
├── mock/           → Dados simulados
├── store/          → Configuração do Redux Toolkit
│   └── slices/     → Reducers e actions por domínio
├── types/          → Tipagens TypeScript dos dados
```

## Decisões Técnicas

### 1. Arquitetura
- Estrutura modular organizada por responsabilidade
- Separação clara de domínio em componentes e slices
- Tipagem forte com TypeScript
- Persistência de estado via localStorage

### 2. Escolhas Tecnológicas
- Next.js para SSR/CSR híbrido, performance e produtividade
- Redux Toolkit para estado global mais limpo e eficiente
- Tailwind CSS pela agilidade no design e responsividade
- Recharts para gráficos interativos e práticos
- TypeScript para evitar erros e melhorar a manutenibilidade

## Componentes Principais

### Dashboard
- Visão geral de métricas e gráficos
- Cards informativos e layout responsivo

### MetricCard
- Exibição de KPIs
- Indicadores de crescimento com ícones dinâmicos

### FilterPanel
- Filtros por mês e produto
- Alternância entre tipos de gráfico (linha, barra, pizza)

### SalesChart
- Visualizações dinâmicas e interativas
- Tooltips, legendas, responsividade e personalização

## Diferenciais Implementados

### Performance
- Code splitting e lazy loading de componentes
- Memorização de cálculos
- Renderizações otimizadas

### UX/UI
- Design limpo e responsivo
- Feedback visual com animações
- Acessibilidade com Radix UI

### Funcionalidades
- CRUD de produtos
- Filtros dinâmicos por produto/mês
- Visualizações múltiplas de gráficos
- Exportação de dados para outros formatos

## Fluxo de Dados
- Os dados são carregados inicialmente do mock
- O estado global é gerenciado via Redux Toolkit
- Toda alteração no estado é persistida automaticamente no localStorage
- Os componentes consomem e atualizam o estado de forma reativa

## Preparação para Escala
- Componentes modulares e reutilizáveis
- Código limpo e fácil de dar manutenção
- Boa separação de responsabilidades e domínios

## Licença
Este projeto está sob a licença MIT.
Consulte o arquivo LICENSE para mais detalhes.
