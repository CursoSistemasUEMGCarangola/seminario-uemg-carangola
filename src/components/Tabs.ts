import { TabType } from '../types';

export function renderTabs(
  activeTab: TabType,
  countAtividades: number,
  countApresentacoes: number
): string {
  const isAtividades = activeTab === 'atividades';

  return `
    <nav class="grid grid-cols-2 gap-2 bg-slate-200/80 p-1 rounded-xl shadow-inner text-sm font-semibold">
      <button 
        id="tab-atividades-btn" 
        data-tab="atividades"
        class="py-2.5 px-3 rounded-lg flex items-center justify-center gap-2 transition-all duration-200 ${
          isAtividades
            ? 'bg-white text-uemg-blue shadow-sm font-bold border border-slate-200/60'
            : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100/50'
        }"
      >
        <svg class="w-4 h-4 ${isAtividades ? 'text-uemg-pink' : 'text-slate-400'}" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
        <span>Atividades</span>
        <span class="text-xs px-2 py-0.5 rounded-full ${
          isAtividades ? 'bg-uemg-pink/10 text-uemg-pink font-bold' : 'bg-slate-300 text-slate-700'
        }">
          ${countAtividades}
        </span>
      </button>

      <button 
        id="tab-apresentacoes-btn" 
        data-tab="apresentacoes"
        class="py-2.5 px-3 rounded-lg flex items-center justify-center gap-2 transition-all duration-200 ${
          !isAtividades
            ? 'bg-white text-uemg-blue shadow-sm font-bold border border-slate-200/60'
            : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100/50'
        }"
      >
        <svg class="w-4 h-4 ${!isAtividades ? 'text-uemg-pink' : 'text-slate-400'}" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
        </svg>
        <span>Apresentações</span>
        <span class="text-xs px-2 py-0.5 rounded-full ${
          !isAtividades ? 'bg-uemg-pink/10 text-uemg-pink font-bold' : 'bg-slate-300 text-slate-700'
        }">
          ${countApresentacoes}
        </span>
      </button>
    </nav>
  `;
}
