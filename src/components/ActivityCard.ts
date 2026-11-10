import { Atividade } from '../types';

function escapeHtml(text: string): string {
  if (!text) return '';
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

export function isUrl(text: string): boolean {
  if (!text) return false;
  return /^https?:\/\//i.test(text.trim());
}

export function formatUrl(text: string): string {
  const trimmed = text.trim();
  try {
    const parsed = new URL(trimmed);
    return parsed.href;
  } catch {
    return trimmed;
  }
}

export function renderActivityCard(item: Atividade, isOpen: boolean): string {
  const hasDescription = Boolean(item.descricao && item.descricao.trim().length > 0);
  const hasIntegrantes = Boolean(item.integrantes && item.integrantes.length > 0);
  const isLocalUrl = isUrl(item.local);
  const formattedUrl = isLocalUrl ? formatUrl(item.local) : '';
  const isYouTube = /youtube\.com|youtu\.be/i.test(formattedUrl);
  const linkBtnText = isYouTube ? 'Assistir Transmissão (YouTube)' : 'Acessar Link Online';
  const accordionBtnText = isYouTube ? 'Assistir no YouTube' : 'Acessar Link Online';

  return `
    <article 
      data-id="${item.id}"
      class="bg-white rounded-xl border border-slate-200/90 shadow-sm hover:shadow-md transition-shadow duration-200 overflow-hidden"
    >
      <div 
        class="p-4 cursor-pointer select-none activity-card-header flex flex-col gap-2.5"
        data-toggle-id="${item.id}"
      >
        <!-- Badges Superiores -->
        <div class="flex flex-wrap items-center justify-between gap-1.5 text-xs">
          <div class="flex items-center gap-1.5 flex-wrap">
            <span class="inline-flex items-center px-2.5 py-0.5 rounded-full font-semibold bg-uemg-blue/10 text-uemg-blue">
              ${escapeHtml(item.tipo || 'Atividade')}
            </span>
            ${
              item.modalidade
                ? `<span class="inline-flex items-center px-2 py-0.5 rounded-full font-medium bg-slate-100 text-slate-700">
                    ${escapeHtml(item.modalidade)}
                   </span>`
                : ''
            }
          </div>
          <div class="flex items-center gap-1 text-slate-500 font-semibold">
            <span class="bg-amber-100 text-amber-900 px-2 py-0.5 rounded-md text-[11px] font-bold">
              Dia ${escapeHtml(item.dia)}
            </span>
            <span class="text-xs bg-slate-100 px-2 py-0.5 rounded-md">
              ${escapeHtml(item.horario)}
            </span>
          </div>
        </div>

        <!-- Título -->
        <h3 class="text-sm sm:text-base font-bold text-slate-900 leading-snug">
          ${escapeHtml(item.titulo)}
        </h3>

        <!-- Proponente & Local -->
        <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-1 text-xs text-slate-600 pt-1">
          <div class="flex items-center gap-1.5">
            <svg class="w-3.5 h-3.5 text-uemg-pink flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
              <path fill-rule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clip-rule="evenodd" />
            </svg>
            <span class="font-medium text-slate-800">
              ${escapeHtml(item.proponente)}
            </span>
          </div>

          <div class="flex items-center gap-1.5 text-slate-600">
            <svg class="w-3.5 h-3.5 text-slate-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            ${
              isLocalUrl
                ? `<a 
                    href="${escapeHtml(formattedUrl)}" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    class="font-bold text-uemg-blue hover:text-blue-900 underline inline-flex items-center gap-1 py-0.5"
                    onclick="event.stopPropagation()"
                    title="Abrir link da atividade em nova aba"
                  >
                    <span>${linkBtnText}</span>
                    <svg class="w-3 h-3 text-uemg-pink" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                  </a>`
                : `<span class="font-semibold text-slate-700">
                    ${escapeHtml(item.local)}
                  </span>`
            }
          </div>
        </div>

        <!-- Botão sutil de expansão -->
        <div class="flex items-center justify-end pt-1">
          <span class="text-[11px] font-medium text-uemg-blue flex items-center gap-1">
            <span>${isOpen ? 'Ocultar detalhes' : 'Ver detalhes'}</span>
            <svg class="w-3.5 h-3.5 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
            </svg>
          </span>
        </div>
      </div>

      <!-- Accordion Expansível -->
      <div class="border-t border-slate-100 bg-slate-50/70 transition-all duration-300 ${isOpen ? 'block p-4' : 'hidden'}">
        ${
          isLocalUrl
            ? `
          <div class="mb-3.5 p-3.5 bg-blue-50 border border-blue-200 rounded-xl flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-sm">
            <div class="min-w-0">
              <span class="text-[11px] font-bold uppercase text-uemg-blue tracking-wider block mb-0.5">
                Link de Transmissão / Agendamento:
              </span>
              <span class="text-xs text-blue-900 break-all font-mono font-medium">
                ${escapeHtml(formattedUrl)}
              </span>
            </div>
            <a 
              href="${escapeHtml(formattedUrl)}" 
              target="_blank" 
              rel="noopener noreferrer"
              class="inline-flex items-center justify-center gap-1.5 px-4 py-2 bg-uemg-blue text-white rounded-lg text-xs font-bold hover:bg-blue-900 transition-colors shadow-sm flex-shrink-0"
            >
              <span>${accordionBtnText}</span>
              <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
            </a>
          </div>
        `
            : ''
        }
        ${
          hasIntegrantes
            ? `
          <div class="mb-3">
            <h4 class="text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">Integrantes / Participantes:</h4>
            <div class="flex flex-wrap gap-1">
              ${item.integrantes
                .map(
                  (integ) =>
                    `<span class="inline-block bg-white border border-slate-200 text-slate-700 text-xs px-2 py-0.5 rounded-md font-medium">${escapeHtml(
                      integ
                    )}</span>`
                )
                .join('')}
            </div>
          </div>
        `
            : ''
        }

        ${
          hasDescription
            ? `
          <div>
            <h4 class="text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">Descrição:</h4>
            <p class="text-xs sm:text-sm text-slate-700 whitespace-pre-line leading-relaxed">
              ${escapeHtml(item.descricao)}
            </p>
          </div>
        `
            : '<p class="text-xs text-slate-500 italic">Sem descrição adicional informada.</p>'
        }
      </div>
    </article>
  `;
}

