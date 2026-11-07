import './styles/main.css';
import rawAtividades from './data/atividades.json';
import rawApresentacoes from './data/apresentacoes.json';
import rawVersion from './data/version.json';
import { Atividade, ApresentacaoOral, TabType, FilterState } from './types';
import {
  indexAtividade,
  indexApresentacao,
  filterAtividades,
  filterApresentacoes,
} from './services/searchEngine';
import { renderHeader } from './components/Header';
import { renderTabs } from './components/Tabs';
import { renderSearchBar } from './components/SearchBar';
import { renderFilters, FilterOptions } from './components/Filters';
import { renderActivityCard } from './components/ActivityCard';
import { renderPresentationCard } from './components/PresentationCard';
import { renderFooter } from './components/Footer';
import { renderModalContainer, MODAL_CONTENTS } from './components/Modal';
import { renderVersionBar } from './components/VersionBar';

// Imutabilidade client-side de dados (Segurança contra adulteração em runtime)
const ATIVIDADES: readonly Atividade[] = Object.freeze(
  (rawAtividades as Atividade[]).map((a) => ({
    ...a,
    searchIndex: indexAtividade(a),
  }))
);

const APRESENTACOES: readonly ApresentacaoOral[] = Object.freeze(
  (rawApresentacoes as ApresentacaoOral[]).map((p) => ({
    ...p,
    searchIndex: indexApresentacao(p),
  }))
);

// Extração de opções para filtros dinâmicos
function extractOptions() {
  const diasAtiv = Array.from(new Set(ATIVIDADES.map((a) => a.dia).filter(Boolean))).sort(
    (a, b) => Number(a) - Number(b)
  );
  const locaisAtiv = Array.from(new Set(ATIVIDADES.map((a) => a.local).filter(Boolean))).sort();
  const tiposAtiv = Array.from(new Set(ATIVIDADES.map((a) => a.tipo).filter(Boolean))).sort();

  const diasApr = Array.from(new Set(APRESENTACOES.map((p) => p.dia).filter(Boolean))).sort(
    (a, b) => Number(a) - Number(b)
  );
  const salasApr = Array.from(new Set(APRESENTACOES.map((p) => p.sala).filter(Boolean))).sort();

  return {
    atividades: { dias: diasAtiv, locaisOuSalas: locaisAtiv, tipos: tiposAtiv } as FilterOptions,
    apresentacoes: { dias: diasApr, locaisOuSalas: salasApr, tipos: [] } as FilterOptions,
  };
}

const FILTER_OPTIONS = extractOptions();

// Estado da aplicação
interface AppState {
  activeTab: TabType;
  filtersAtividades: FilterState;
  filtersApresentacoes: FilterState;
  openActivities: Set<string>;
}

const state: AppState = {
  activeTab: 'atividades',
  filtersAtividades: {
    searchTerm: '',
    selectedDia: '',
    selectedLocalOrSala: '',
    selectedTipo: '',
  },
  filtersApresentacoes: {
    searchTerm: '',
    selectedDia: '',
    selectedLocalOrSala: '',
    selectedTipo: '',
  },
  openActivities: new Set<string>(),
};

// Referência do container principal
const app = document.getElementById('app');
if (!app) {
  throw new Error('Elemento #app não encontrado no DOM');
}
const appContainer = app;

// Renderização Principal do Shell
function renderApp() {
  const currentFilters =
    state.activeTab === 'atividades' ? state.filtersAtividades : state.filtersApresentacoes;
  const currentOptions =
    state.activeTab === 'atividades' ? FILTER_OPTIONS.atividades : FILTER_OPTIONS.apresentacoes;

  // Filtragem
  const filteredAtividades = filterAtividades(ATIVIDADES, state.filtersAtividades);
  const filteredApresentacoes = filterApresentacoes(APRESENTACOES, state.filtersApresentacoes);

  const activeCount =
    state.activeTab === 'atividades' ? filteredAtividades.length : filteredApresentacoes.length;
  const totalCount = state.activeTab === 'atividades' ? ATIVIDADES.length : APRESENTACOES.length;

  const searchPlaceholder =
    state.activeTab === 'atividades'
      ? 'Buscar por título, proponente, local...'
      : 'Buscar por trabalho, autor, sala, avaliação...';

  appContainer.innerHTML = `
    ${renderHeader()}

    <main class="flex-1 w-full max-w-3xl mx-auto pt-20 pb-8 px-3.5 sm:px-4 flex flex-col gap-3">
      <!-- Barra de Versão e Atualizações -->
      ${renderVersionBar(rawVersion.buildTime)}

      <!-- Seletor de Abas -->
      ${renderTabs(state.activeTab, filteredAtividades.length, filteredApresentacoes.length)}

      <!-- Barra de Pesquisa e Painel de Filtros -->
      <section class="bg-white rounded-2xl border border-slate-200 shadow-sm p-3.5 flex flex-col gap-2.5">
        ${renderSearchBar(searchPlaceholder, currentFilters.searchTerm)}
        ${renderFilters(state.activeTab, currentFilters, currentOptions)}
      </section>

      <!-- Contador de Resultados -->
      <div class="flex items-center justify-between text-xs text-slate-500 px-1 font-medium">
        <span>
          Exibindo <strong>${activeCount}</strong> de ${totalCount} ${
            state.activeTab === 'atividades' ? 'atividades' : 'apresentações'
          }
        </span>
        ${
          currentFilters.searchTerm ||
          currentFilters.selectedDia ||
          currentFilters.selectedLocalOrSala ||
          currentFilters.selectedTipo
            ? `<button id="reset-filters-btn" class="text-uemg-pink hover:underline font-semibold">Limpar filtros</button>`
            : ''
        }
      </div>

      <!-- Lista de Cards ou Mensagem Vazia -->
      <section id="results-list" class="flex flex-col gap-3">
        ${
          state.activeTab === 'atividades'
            ? filteredAtividades.length > 0
              ? filteredAtividades
                  .map((item) => renderActivityCard(item, state.openActivities.has(item.id)))
                  .join('')
              : renderEmptyState()
            : filteredApresentacoes.length > 0
              ? filteredApresentacoes.map((item) => renderPresentationCard(item)).join('')
              : renderEmptyState()
        }
      </section>
    </main>

    ${renderFooter()}
    ${renderModalContainer()}

    <!-- Toast de Notificação de Nova Programação (PWA Update) -->
    <div id="pwa-update-toast" class="fixed bottom-4 left-4 right-4 max-w-md mx-auto bg-slate-900 text-white rounded-xl shadow-2xl p-4 flex items-center justify-between gap-3 z-50 border border-slate-700 hidden">
      <div class="flex items-center gap-2.5 text-xs">
        <span class="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping"></span>
        <span>Nova programação disponível!</span>
      </div>
      <button 
        id="pwa-reload-btn"
        class="bg-uemg-pink text-white text-xs font-bold px-3 py-1.5 rounded-lg hover:bg-pink-700 transition-colors shadow-sm flex-shrink-0"
      >
        Atualizar
      </button>
    </div>
  `;

  bindEvents();
  updateConnectionBadge();
  updateInstallButton();
}

function renderEmptyState(): string {
  return `
    <div class="bg-white rounded-2xl border border-dashed border-slate-300 p-8 text-center flex flex-col items-center gap-2 my-4">
      <div class="w-12 h-12 rounded-full bg-slate-100 flex items-center justify-center text-slate-400 mb-1">
        <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      </div>
      <h3 class="text-sm font-bold text-slate-800">Nenhum resultado encontrado</h3>
      <p class="text-xs text-slate-500 max-w-xs">
        Tente ajustar o termo de pesquisa ou remover alguns filtros selecionados.
      </p>
    </div>
  `;
}

// Associação dos Eventos
let debounceTimer: ReturnType<typeof setTimeout> | null = null;

// Tipagem e estado do prompt PWA
interface BeforeInstallPromptEvent extends Event {
  readonly platforms: string[];
  readonly userChoice: Promise<{
    outcome: 'accepted' | 'dismissed';
    platform: string;
  }>;
  prompt(): Promise<void>;
}

let deferredInstallPrompt: BeforeInstallPromptEvent | null = null;

/**
 * Detecta se a aplicação está rodando em modo standalone / PWA instalado (ajuste de recursividade).
 */
export function isRunningStandalone(): boolean {
  return (
    window.matchMedia('(display-mode: standalone)').matches ||
    window.matchMedia('(display-mode: fullscreen)').matches ||
    (window.navigator as unknown as { standalone?: boolean }).standalone === true ||
    document.referrer.includes('android-app://')
  );
}

/**
 * Ajusta a visibilidade do botão de instalação considerando a recursividade.
 * Quando o app já está instalado / rodando como PWA, o botão NUNCA deve ser exibido.
 */
function updateInstallButton() {
  const installBtn = document.getElementById('pwa-install-btn');
  if (!installBtn) return;

  if (isRunningStandalone()) {
    installBtn.classList.add('hidden');
    return;
  }

  installBtn.classList.remove('hidden');
}

function bindEvents() {
  // 0. Botão INSTALAR no Header (com ajuste de recursividade)
  const installBtn = document.getElementById('pwa-install-btn');
  installBtn?.addEventListener('click', async () => {
    if (deferredInstallPrompt) {
      await deferredInstallPrompt.prompt();
      const choice = await deferredInstallPrompt.userChoice;
      if (choice.outcome === 'accepted') {
        deferredInstallPrompt = null;
        updateInstallButton();
      }
    } else {
      // Dispositivos que não suportam prompt direto (ex: Safari iOS) ou prompt já consumido
      openModal(MODAL_CONTENTS.instalar.title, MODAL_CONTENTS.instalar.bodyHtml);
    }
  });

  // 0b. Botão Verificar Atualizações da Programação
  const checkUpdatesBtn = document.getElementById('check-updates-btn');
  const checkUpdatesIcon = document.getElementById('check-updates-icon');
  const checkUpdatesText = document.getElementById('check-updates-text');

  checkUpdatesBtn?.addEventListener('click', async () => {
    if (!navigator.onLine) {
      if (checkUpdatesText) {
        checkUpdatesText.textContent = 'Dispositivo offline';
        setTimeout(() => {
          checkUpdatesText.textContent = 'Verificar atualizações';
        }, 2500);
      }
      return;
    }

    if (checkUpdatesIcon && checkUpdatesText) {
      checkUpdatesIcon.classList.add('animate-spin');
      checkUpdatesText.textContent = 'Verificando...';
    }

    try {
      if ('serviceWorker' in navigator) {
        const registration = await navigator.serviceWorker.getRegistration();
        if (registration) {
          await registration.update();
        }
      }

      setTimeout(() => {
        if (checkUpdatesIcon && checkUpdatesText) {
          checkUpdatesIcon.classList.remove('animate-spin');
          checkUpdatesText.textContent = 'Programação atualizada ✓';
          setTimeout(() => {
            checkUpdatesText.textContent = 'Verificar atualizações';
          }, 3000);
        }
      }, 700);
    } catch {
      if (checkUpdatesIcon && checkUpdatesText) {
        checkUpdatesIcon.classList.remove('animate-spin');
        checkUpdatesText.textContent = 'Tentar novamente';
        setTimeout(() => {
          checkUpdatesText.textContent = 'Verificar atualizações';
        }, 2500);
      }
    }
  });

  // 1. Troca de Abas
  const tabAtivBtn = document.getElementById('tab-atividades-btn');
  const tabAprBtn = document.getElementById('tab-apresentacoes-btn');

  tabAtivBtn?.addEventListener('click', () => {
    if (state.activeTab !== 'atividades') {
      state.activeTab = 'atividades';
      renderApp();
    }
  });

  tabAprBtn?.addEventListener('click', () => {
    if (state.activeTab !== 'apresentacoes') {
      state.activeTab = 'apresentacoes';
      renderApp();
    }
  });

  // 2. Campo de Pesquisa com Debounce
  const searchInput = document.getElementById('main-search-input') as HTMLInputElement | null;
  const clearBtn = document.getElementById('clear-search-btn');

  searchInput?.addEventListener('input', (e) => {
    const val = (e.target as HTMLInputElement).value;
    if (debounceTimer) clearTimeout(debounceTimer);
    debounceTimer = setTimeout(() => {
      if (state.activeTab === 'atividades') {
        state.filtersAtividades.searchTerm = val;
      } else {
        state.filtersApresentacoes.searchTerm = val;
      }
      renderApp();
      // Restaura o foco e cursor no input após render
      const newInput = document.getElementById('main-search-input') as HTMLInputElement | null;
      if (newInput) {
        newInput.focus();
        newInput.setSelectionRange(newInput.value.length, newInput.value.length);
      }
    }, 120);
  });

  clearBtn?.addEventListener('click', () => {
    if (state.activeTab === 'atividades') {
      state.filtersAtividades.searchTerm = '';
    } else {
      state.filtersApresentacoes.searchTerm = '';
    }
    renderApp();
  });

  // 3. Filtros
  const diaSelect = document.getElementById('filter-dia-select') as HTMLSelectElement | null;
  diaSelect?.addEventListener('change', (e) => {
    const val = (e.target as HTMLSelectElement).value;
    if (state.activeTab === 'atividades') {
      state.filtersAtividades.selectedDia = val;
    } else {
      state.filtersApresentacoes.selectedDia = val;
    }
    renderApp();
  });

  const localSelect = document.getElementById('filter-local-select') as HTMLSelectElement | null;
  localSelect?.addEventListener('change', (e) => {
    const val = (e.target as HTMLSelectElement).value;
    if (state.activeTab === 'atividades') {
      state.filtersAtividades.selectedLocalOrSala = val;
    } else {
      state.filtersApresentacoes.selectedLocalOrSala = val;
    }
    renderApp();
  });

  const tipoSelect = document.getElementById('filter-tipo-select') as HTMLSelectElement | null;
  tipoSelect?.addEventListener('change', (e) => {
    const val = (e.target as HTMLSelectElement).value;
    state.filtersAtividades.selectedTipo = val;
    renderApp();
  });

  // 4. Limpar Filtros
  const resetBtn = document.getElementById('reset-filters-btn');
  resetBtn?.addEventListener('click', () => {
    if (state.activeTab === 'atividades') {
      state.filtersAtividades = {
        searchTerm: '',
        selectedDia: '',
        selectedLocalOrSala: '',
        selectedTipo: '',
      };
    } else {
      state.filtersApresentacoes = {
        searchTerm: '',
        selectedDia: '',
        selectedLocalOrSala: '',
        selectedTipo: '',
      };
    }
    renderApp();
  });

  // 5. Accordion das Atividades
  document.querySelectorAll<HTMLElement>('.activity-card-header').forEach((el) => {
    el.addEventListener('click', () => {
      const id = el.getAttribute('data-toggle-id');
      if (id) {
        if (state.openActivities.has(id)) {
          state.openActivities.delete(id);
        } else {
          state.openActivities.add(id);
        }
        renderApp();
      }
    });
  });

  // 6. Modais Informativos (Sobre, Termos, Privacidade)
  document.querySelectorAll<HTMLElement>('[data-open-modal]').forEach((el) => {
    el.addEventListener('click', () => {
      const modalKey = el.getAttribute('data-open-modal');
      if (modalKey && MODAL_CONTENTS[modalKey]) {
        openModal(MODAL_CONTENTS[modalKey].title, MODAL_CONTENTS[modalKey].bodyHtml);
      }
    });
  });

  const closeModalBtn = document.getElementById('close-modal-btn');
  const modalOkBtn = document.getElementById('modal-ok-btn');
  const modalContainer = document.getElementById('app-modal');

  closeModalBtn?.addEventListener('click', closeModal);
  modalOkBtn?.addEventListener('click', closeModal);
  modalContainer?.addEventListener('click', (e) => {
    if (e.target === modalContainer) {
      closeModal();
    }
  });
}

function openModal(title: string, bodyHtml: string) {
  const modal = document.getElementById('app-modal');
  const modalPanel = document.getElementById('app-modal-panel');
  const modalTitle = document.getElementById('app-modal-title');
  const modalBody = document.getElementById('app-modal-body');

  if (modal && modalTitle && modalBody && modalPanel) {
    modalTitle.textContent = title;
    modalBody.innerHTML = bodyHtml;
    modal.classList.remove('hidden');
    requestAnimationFrame(() => {
      modal.classList.remove('opacity-0');
      modalPanel.classList.remove('scale-95');
    });
  }
}

function closeModal() {
  const modal = document.getElementById('app-modal');
  const modalPanel = document.getElementById('app-modal-panel');
  if (modal && modalPanel) {
    modal.classList.add('opacity-0');
    modalPanel.classList.add('scale-95');
    setTimeout(() => {
      modal.classList.add('hidden');
    }, 200);
  }
}

// Status de Conexão Online/Offline
function updateConnectionBadge() {
  const badge = document.getElementById('connection-status-badge');
  if (badge) {
    if (!navigator.onLine) {
      badge.classList.remove('hidden');
    } else {
      badge.classList.add('hidden');
    }
  }
}

window.addEventListener('online', updateConnectionBadge);
window.addEventListener('offline', updateConnectionBadge);

// Listeners do Ciclo de Vida da Instalação PWA
window.addEventListener('beforeinstallprompt', (e) => {
  e.preventDefault();
  deferredInstallPrompt = e as BeforeInstallPromptEvent;
  updateInstallButton();
});

window.addEventListener('appinstalled', () => {
  deferredInstallPrompt = null;
  updateInstallButton();
});

// Listener para mudanças dinâmicas no modo de exibição (standalone)
if (window.matchMedia) {
  window.matchMedia('(display-mode: standalone)').addEventListener('change', () => {
    updateInstallButton();
  });
}

// Inicialização da Aplicação
renderApp();
console.log(
  `🚀 Seminário UEMG Carangola PWA v${rawVersion.version} carregado. Hash: ${rawVersion.dataHash.substring(
    0,
    8
  )}`
);

// Registro do Service Worker e Notificação de Nova Versão (PWA Update Lifecycle)
import('virtual:pwa-register')
  .then(({ registerSW }) => {
    const updateSW = registerSW({
      onNeedRefresh() {
        const toast = document.getElementById('pwa-update-toast');
        toast?.classList.remove('hidden');
        const reloadBtn = document.getElementById('pwa-reload-btn');
        reloadBtn?.addEventListener('click', () => {
          updateSW(true);
        });
      },
      onOfflineReady() {
        console.log('📱 Seminário UEMG: App pronto para operação 100% offline.');
      },
    });
  })
  .catch((err) => {
    console.warn('Registro de Service Worker ignorado em ambiente de desenvolvimento:', err);
  });
