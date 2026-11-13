import './styles/main.css';
import rawVersion from './data/version.json';
import { renderHeader } from './components/Header';
import { renderClosingMessage } from './components/ClosingMessage';
import { renderFooter } from './components/Footer';
import { renderModalContainer, MODAL_CONTENTS } from './components/Modal';

// Referência do container principal
const app = document.getElementById('app');
if (!app) {
  throw new Error('Elemento #app não encontrado no DOM');
}
const appContainer = app;

// Renderização Principal do Shell
function renderApp() {
  appContainer.innerHTML = `
    ${renderHeader()}

    <main class="flex-1 w-full max-w-3xl mx-auto pt-20 pb-8 px-3.5 sm:px-4 flex flex-col gap-4">
      <!-- Mensagem Oficial de Encerramento e Agradecimento -->
      ${renderClosingMessage()}
    </main>

    ${renderFooter()}
    ${renderModalContainer()}

    <!-- Toast de Notificação de Nova Programação (PWA Update) -->
    <div id="pwa-update-toast" class="fixed bottom-4 left-4 right-4 max-w-md mx-auto bg-slate-900 text-white rounded-xl shadow-2xl p-4 flex items-center justify-between gap-3 z-50 border border-slate-700 hidden">
      <div class="flex items-center gap-2.5 text-xs">
        <span class="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping"></span>
        <span>Nova versão disponível!</span>
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

  // 1. Modais Informativos (Sobre, Termos, Privacidade)
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
