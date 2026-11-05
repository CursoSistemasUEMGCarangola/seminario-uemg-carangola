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
      <div id="connection-status-badge" class="hidden text-xs bg-amber-500/90 text-white font-medium px-2 py-0.5 rounded-full flex items-center gap-1 shadow-sm">
        <span class="w-1.5 h-1.5 rounded-full bg-white animate-pulse"></span>
        <span>Offline</span>
      </div>
    </header>
  `;
}

