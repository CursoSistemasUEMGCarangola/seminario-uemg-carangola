export function renderHeader(): string {
  return `
    <header class="fixed top-0 left-0 right-0 h-16 bg-uemg-blue text-white shadow-md z-50 flex items-center justify-between px-4">
      <div class="flex items-center gap-3">
        <img 
          src="/icons/icon-192x192.png" 
          alt="Logo P&e UEMG" 
          class="w-9 h-9 rounded-lg bg-white p-0.5 object-contain shadow-sm border border-blue-900/40"
        />
        <div>
          <h1 class="text-base sm:text-lg font-bold tracking-tight leading-tight">Seminário UEMG Carangola</h1>
          <p class="text-xs text-blue-200 font-medium">Pesquisa & Extensão</p>
        </div>
      </div>
      <div class="flex items-center gap-2">
        <!-- Botão INSTALAR no Header (auto-ocultado em modo standalone / instalado) -->
        <button 
          id="pwa-install-btn" 
          type="button"
          class="hidden px-2.5 sm:px-3 py-1.5 rounded-lg bg-uemg-pink hover:bg-pink-700 text-white text-xs font-bold transition-all shadow-sm flex items-center gap-1.5 border border-pink-400/30 active:scale-95"
          title="Instalar aplicativo no dispositivo"
        >
          <svg class="w-3.5 h-3.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
          </svg>
          <span class="tracking-wide">INSTALAR</span>
        </button>

        <div id="connection-status-badge" class="hidden text-xs bg-amber-500/90 text-white font-medium px-2 py-0.5 rounded-full flex items-center gap-1 shadow-sm">
          <span class="w-1.5 h-1.5 rounded-full bg-white animate-pulse"></span>
          <span>Offline</span>
        </div>
      </div>
    </header>
  `;
}

