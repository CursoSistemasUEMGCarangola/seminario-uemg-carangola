import { TabType, FilterState } from '../types';

export interface FilterOptions {
  dias: string[];
  locaisOuSalas: string[];
  tipos: string[];
}

export function renderFilters(
  activeTab: TabType,
  filters: FilterState,
  options: FilterOptions
): string {
  const isAtividades = activeTab === 'atividades';

  return `
    <div class="flex flex-wrap items-center gap-2 pt-1 pb-1">
      <!-- Filtro por Dia -->
      <div class="flex-1 min-w-[130px]">
        <label for="filter-dia-select" class="block text-[11px] font-semibold text-slate-500 uppercase tracking-wider mb-1">
          Dia
        </label>
        <select 
          id="filter-dia-select"
          class="w-full text-xs font-medium py-2 px-2.5 rounded-lg border border-slate-300 bg-white text-slate-700 focus:outline-none focus:ring-1 focus:ring-uemg-blue focus:border-uemg-blue"
        >
          <option value="">Todos os dias</option>
          ${options.dias
            .map(
              (d) =>
                `<option value="${d}" ${filters.selectedDia === d ? 'selected' : ''}>Dia ${d}</option>`
            )
            .join('')}
        </select>
      </div>

      <!-- Filtro por Local ou Sala -->
      <div class="flex-1 min-w-[150px]">
        <label for="filter-local-select" class="block text-[11px] font-semibold text-slate-500 uppercase tracking-wider mb-1">
          ${isAtividades ? 'Local' : 'Sala'}
        </label>
        <select 
          id="filter-local-select"
          class="w-full text-xs font-medium py-2 px-2.5 rounded-lg border border-slate-300 bg-white text-slate-700 focus:outline-none focus:ring-1 focus:ring-uemg-blue focus:border-uemg-blue truncate"
        >
          <option value="">${isAtividades ? 'Todos os locais' : 'Todas as salas'}</option>
          ${options.locaisOuSalas
            .map(
              (l) =>
                `<option value="${l.replace(/"/g, '&quot;')}" ${
                  filters.selectedLocalOrSala === l ? 'selected' : ''
                }>${/^https?:\/\//i.test(l.trim()) ? 'Atividade Online (Link)' : l}</option>`
            )
            .join('')}
        </select>
      </div>

      <!-- Filtro por Tipo (Apenas Atividades) -->
      ${
        isAtividades
          ? `
        <div class="w-full sm:flex-1 min-w-[150px]">
          <label for="filter-tipo-select" class="block text-[11px] font-semibold text-slate-500 uppercase tracking-wider mb-1">
            Tipo de Atividade
          </label>
          <select 
            id="filter-tipo-select"
            class="w-full text-xs font-medium py-2 px-2.5 rounded-lg border border-slate-300 bg-white text-slate-700 focus:outline-none focus:ring-1 focus:ring-uemg-blue focus:border-uemg-blue truncate"
          >
            <option value="">Todos os tipos</option>
            ${options.tipos
              .map(
                (t) =>
                  `<option value="${t.replace(/"/g, '&quot;')}" ${
                    filters.selectedTipo === t ? 'selected' : ''
                  }>${t}</option>`
              )
              .join('')}
          </select>
        </div>
      `
          : ''
      }
    </div>
  `;
}

