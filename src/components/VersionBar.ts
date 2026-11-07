export function formatBuildDate(isoString: string): string {
  try {
    const d = new Date(isoString);
    if (isNaN(d.getTime())) return 'Atualizado recentemente';

    const datePart = new Intl.DateTimeFormat('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    }).format(d);

    const timePart = new Intl.DateTimeFormat('pt-BR', {
      hour: '2-digit',
      minute: '2-digit',
    }).format(d);

    return `${datePart} às ${timePart}`;
  } catch {
    return 'Atualizado recentemente';
  }
}

export function renderVersionBar(buildTimeIso: string): string {
  const formattedDate = formatBuildDate(buildTimeIso);

  return `
    <div class="flex items-center justify-between gap-2 text-[11px] sm:text-xs text-slate-500 bg-white/80 backdrop-blur-sm border border-slate-200/90 px-3 py-2 rounded-xl shadow-xs">
      <div class="flex items-center gap-1.5 truncate">
        <svg class="w-3.5 h-3.5 text-slate-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        <span class="truncate">
          Última atualização: <strong class="text-slate-700 font-semibold">${formattedDate}</strong>
        </span>
      </div>

      <button 
        id="check-updates-btn"
        type="button"
        class="inline-flex items-center gap-1.5 text-uemg-blue hover:text-blue-900 font-semibold transition-all flex-shrink-0 hover:bg-slate-100/70 px-2 py-0.5 rounded-md active:scale-95 group"
        title="Buscar por novas atualizações da programação no servidor"
      >
        <svg id="check-updates-icon" class="w-3.5 h-3.5 text-uemg-pink group-hover:rotate-180 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
        </svg>
        <span id="check-updates-text">Verificar atualizações</span>
      </button>
    </div>
  `;
}
