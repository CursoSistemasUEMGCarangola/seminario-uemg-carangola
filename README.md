<div align="center">

# 🎓 Seminário de Pesquisa e Extensão — UEMG Carangola
### Progressive Web Application (PWA) • Mobile-First • Offline-First • Custo Zero

[![Vite](https://img.shields.io/badge/Vite-6.0-646CFF?style=flat&logo=vite&logoColor=white)](https://vitejs.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.7-3178C6?style=flat&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.4-38B2AC?style=flat&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![PWA](https://img.shields.io/badge/PWA-Ready-5A0FC8?style=flat&logo=pwa&logoColor=white)](https://web.dev/progressive-web-apps/)
[![Vitest](https://img.shields.io/badge/Vitest-2.1-6E9F18?style=flat&logo=vitest&logoColor=white)](https://vitest.dev/)
[![Vercel](https://img.shields.io/badge/Vercel-Deployed-000000?style=flat&logo=vercel&logoColor=white)](https://vercel.com/)
[![LGPD](https://img.shields.io/badge/LGPD-Compliant-1e3a8a?style=flat)](https://www.planalto.gov.br/ccivil_03/_ato2015-2018/2018/lei/l13709.htm)

<p align="center">
  Aplicativo oficial para consulta rápida, pesquisa instantânea e navegação offline da programação acadêmica de <strong>Atividades</strong> e <strong>Apresentações Orais</strong> do Seminário de Pesquisa e Extensão da Universidade do Estado de Minas Gerais (UEMG) — Unidade Carangola.
</p>

</div>

---

## 📌 Visão Geral

Desenvolvido para atender a alunos, professores, avaliadores e visitantes durante o evento acadêmico no campus, o aplicativo resolve o problema crítico de navegação e localização de salas, horários e bancas — inclusive em locais com sinal fraco ou inexistente de internet (corredores, salas fechadas e auditório).

A aplicação é distribuída através de **QR Code físico** afixado no campus e pode ser instalada diretamente na tela inicial do celular como um aplicativo nativo (Android e iOS).

---

## 🚀 Principais Funcionalidades

* 📱 **Mobile-First & PWA Instalável:** Experiência nativa de aplicativo, com ícones em alta resolução gerados a partir do logotipo oficial (`P&e`), splash screen e tema institucional.
* ⚡ **100% Offline-First:** Toda a aplicação e os dados são pré-cacheados via Service Worker (Workbox). Consultas, filtros e pesquisas funcionam sem internet após o primeiro acesso.
* 🔍 **2 Ambientes de Busca Especializados:**
  * **Aba Atividades:** Palestras, minicursos, oficinas e mesas-redondas com horários, proponentes, locais e accordion expansível com ementas e participantes.
  * **Aba Apresentações:** Trabalhos de pesquisa e extensão com destaque visual para Sala, Dia, Autoria, Mediador e Banca Avaliadora.
* 🧠 **Motor de Busca com Normalização Diacrítica:** Busca instantânea (< 2ms) em memória, insensível a acentuação e maiúsculas/minúsculas (encontra *"custodio"*, *"matematica"*, *"cafe"* ou *"historico"* instantaneamente).
* 🎛️ **Filtros Facetados Combináveis:** Filtre por **Dia** (Dia 10, Dia 11), por **Sala/Local** e por **Tipo de Atividade**, com contadores reativos de resultados.
* 🔄 **Ciclo de Atualização Reativo:** Se a comissão organizadora fizer alterações de última hora na programação, a aplicação detecta a nova compilação silenciosamente e exibe um *toast* discreto: *"Nova programação disponível. [Atualizar]"*, aplicando `skipWaiting` sem travar quem estiver offline.
* 🛡️ **Segurança e Conformidade LGPD (Privacy by Design):** Dados de contato sensíveis (telefones e e-mails pessoais de docentes presentes em planilhas internas) são expurgados no processo de build. Todo o DOM é sanitizado contra XSS e os dados em runtime são congelados (`Object.freeze`).
* 📜 **Rodapé Regulatório e Links Institucionais:** Modais acessíveis para *Sobre*, *Termos de Uso*, *Política de Privacidade (LGPD)* e link oficial do portal da UEMG.

---

## 🏗️ Arquitetura e Stack Tecnológica

| Camada | Tecnologia | Motivação Arquitetural |
| :--- | :--- | :--- |
| **Linguagem** | **TypeScript 5.7 (ES2022)** | Tipagem estática rigorosa para os contratos de dados dos eventos. |
| **Bundler & Build** | **Vite 6** | Compilação instantânea, HMR veloz e geração de assets otimizados. |
| **Interface (UI)** | **Vanilla TypeScript Modular** | Zero sobrecarga de runtime. Elimina o peso de frameworks complexos, garantindo bundle < 25 KB gzipped. |
| **Estilização** | **Tailwind CSS 3.4** | Paleta institucional UEMG (`#1e3a8a` e `#db2777`), layout responsivo e purga no build. |
| **Offline & PWA** | **Vite PWA Plugin + Workbox** | Cache determinístico de 14 ativos e ciclo de vida seguro de Service Worker. |
| **Pipeline de Dados** | **Node.js + iconv-lite + csv-parse** | Decodificação de arquivos Windows-1252/Latin1 e higienização LGPD. |
| **Testes** | **Vitest 2.1** | Execução de testes unitários em milissegundos. |
| **Hospedagem & CI/CD** | **Vercel Free Tier + GitHub** | Custo R$ 0,00, Edge Network global e deploys automáticos a cada commit. |

---

## 📁 Estrutura do Diretório

```
seminario-uemg-carangola/
├── public/                    # Assets estáticos servidos no root do PWA
│   ├── favicon.ico            # Favicon derivado de logo.png
│   └── icons/                 # Ícones PWA (192x192, 512x512, maskable)
├── scripts/                   # Automações de compilação e build
│   ├── compile-data.js        # Pipeline Latin1 -> UTF-8 + Expurgo LGPD
│   └── generate-icons.js      # Gerador de ícones PWA via Sharp
├── src/                       # Código-fonte da aplicação
│   ├── components/            # Componentes visuais desacoplados
│   │   ├── ActivityCard.ts    # Card com accordion expansível
│   │   ├── Filters.ts         # Controles facetados por Dia, Sala e Tipo
│   │   ├── Footer.ts          # Rodapé institucional
│   │   ├── Header.ts          # Cabeçalho fixo com logo e status offline
│   │   ├── Modal.ts           # Modais de Sobre, Termos e LGPD
│   │   ├── PresentationCard.ts# Card otimizado para apresentações orais
│   │   ├── SearchBar.ts       # Barra de busca com debounce
│   │   └── Tabs.ts            # Seletor de abas com contadores
│   ├── data/                  # JSONs imutáveis gerados pelo pipeline
│   │   ├── atividades.json    # Dados higienizados das atividades
│   │   ├── apresentacoes.json # Dados higienizados das apresentações
│   │   └── version.json       # Versão e hash SHA-256 de integridade
│   ├── services/
│   │   └── searchEngine.ts    # Motor de busca em memória e normalização diacrítica
│   ├── styles/
│   │   └── main.css           # Diretivas base do Tailwind CSS
│   ├── types/
│   │   └── index.ts           # Definições de tipos e interfaces
│   ├── main.ts                # Ponto de entrada, orquestração e PWA lifecycle
│   └── vite-env.d.ts          # Tipagens de ambiente e PWA client
├── tests/                     # Suíte de testes automatizados
│   ├── data-ingestion.test.ts # Validação de dados, encoding e regras LGPD
│   └── search-engine.test.ts  # Validação do motor de busca e filtros
├── vercel.json                # Configuração de segurança (CSP, HSTS) e headers de cache
├── tailwind.config.js         # Design system com cores institucionais UEMG
├── tsconfig.json              # Configuração estrita do TypeScript
└── vite.config.ts             # Configuração do Vite e Workbox
```

---

## 🛠️ Como Atualizar a Programação (Guia da Comissão)

Caso ocorram alterações de horários, salas ou palestras:

1. **Substitua o arquivo correspondente na pasta local `conteudos/`:**
   * `conteudos/Atividades.csv` ou `conteudos/Apresentação Oral.csv`
2. **Execute a compilação e teste local:**
   ```bash
   npm run build:data
   npm test
   ```
3. **Envie as alterações para o repositório:**
   ```bash
   git add src/data/
   git commit -m "docs: atualiza programacao do seminario"
   git push origin main
   ```
4. A **Vercel** compilará a nova versão automaticamente em segundos. Os usuários que já estiverem com o app aberto receberão o aviso na tela para atualizar a programação com 1 clique.

---

## 💻 Comandos Disponíveis

| Comando | Descrição |
| :--- | :--- |
| `npm run dev` | Inicia o servidor local de desenvolvimento Vite com Hot Module Replacement. |
| `npm run build:data` | Executa a compilação dos CSVs, higienização LGPD e gera os arquivos JSON em `src/data/`. |
| `npm run build:icons` | Regenera os ícones do PWA e favicon a partir de `conteudos/logo.png`. |
| `npm run build` | Executa o pipeline completo: dados -> checagem de tipos -> empacotamento Vite -> Service Worker. |
| `npm test` | Executa a suíte de testes unitários com o Vitest. |
| `npm run preview` | Pré-visualiza localmente o bundle de produção compilado na pasta `dist/`. |
| `npm run lint` | Executa o ESLint para validação de código estático. |
| `npm run format` | Formata todo o código com o Prettier. |

---

## 🌐 Publicação na Vercel

1. Faça o push do projeto para um repositório no **GitHub**.
2. Acesse [vercel.com](https://vercel.com) e clique em **Add New Project**.
3. Importe o repositório do GitHub.
4. O framework **Vite** será detectado automaticamente.
5. Clique em **Deploy**. A Vercel cuidará do build, geração do PWA, certificados HTTPS e distribuição global via Edge Network.
6. Copie a URL gerada e utilize-a para gerar o **QR Code** impresso nos murais do campus.

---

## 🏛️ Realização e Créditos

* **Instituição:** Universidade do Estado de Minas Gerais (UEMG) — Unidade Carangola
* **Evento:** Seminário de Pesquisa e Extensão
* **Página Oficial:** [uemg.br/pesquisa/seminarios](https://www.uemg.br/pesquisa/seminarios)
* **Licença:** Uso exclusivo acadêmico e institucional.

