import { ApresentacaoOral } from '../types';

function escapeHtml(text: string): string {
  if (!text) return '';
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

export function renderPresentationCard(item: ApresentacaoOral): string {
  return `
    <article 
      data-id="${item.id}"
      class="bg-white rounded-xl border border-slate-200/90 shadow-sm hover:shadow-md transition-shadow duration-200 p-4 flex flex-col gap-2.5"
    >
      <!-- Cabeçalho do Card: ID e Sala -->
      <div class="flex items-center justify-between gap-2 text-xs">
        <span class="inline-flex items-center font-mono font-bold px-2 py-0.5 rounded bg-slate-100 text-slate-600">
          #${escapeHtml(item.id)}
        </span>
        
        <div class="flex items-center gap-1.5">
          <span class="bg-amber-100 text-amber-900 px-2 py-0.5 rounded-md font-bold text-[11px]">
            Dia ${escapeHtml(item.dia)}
          </span>
          <span class="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full font-bold bg-uemg-pink/10 text-uemg-pink border border-uemg-pink/20">
            <svg class="w-3 h-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
            </svg>
            ${escapeHtml(item.sala || 'Sala a definir')}
          </span>
        </div>
      </div>

      <!-- Título do Trabalho -->
      <h3 class="text-sm sm:text-base font-bold text-slate-900 leading-snug">
        ${escapeHtml(item.titulo)}
      </h3>

      <!-- Autoria -->
      <div class="flex items-start gap-1.5 text-xs text-slate-700 bg-slate-50 p-2 rounded-lg border border-slate-100">
        <svg class="w-4 h-4 text-uemg-blue flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
        </svg>
        <div>
          <span class="text-[11px] font-semibold text-slate-500 uppercase tracking-wider block">Autoria:</span>
          <span class="font-medium text-slate-800">${escapeHtml(item.autoria)}</span>
        </div>
      </div>

      <!-- Mediador e Avaliador -->
      <div class="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs pt-1 border-t border-slate-100 text-slate-600">
        ${
          item.mediador
            ? `
          <div class="flex items-center gap-1.5">
            <span class="text-[10px] font-bold text-slate-400 uppercase">Mediador:</span>
            <span class="font-medium text-slate-700 truncate" title="${escapeHtml(item.mediador)}">
              ${escapeHtml(item.mediador)}
            </span>
          </div>
        `
            : ''
        }

        ${
          item.avaliador
            ? `
          <div class="flex items-center gap-1.5">
            <span class="text-[10px] font-bold text-slate-400 uppercase">Avaliador:</span>
            <span class="font-medium text-slate-700 truncate" title="${escapeHtml(item.avaliador)}">
              ${escapeHtml(item.avaliador)}
            </span>
          </div>
        `
            : ''
        }
      </div>
    </article>
  `;
}

