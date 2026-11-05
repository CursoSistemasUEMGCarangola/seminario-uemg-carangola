export function renderFooter(): string {
  return `
    <footer class="mt-auto border-t border-slate-200 bg-white/80 backdrop-blur-sm py-6 px-4 text-xs text-slate-500">
      <div class="max-w-3xl mx-auto flex flex-col items-center gap-3 text-center">
        <!-- Links de Rodapé Obrigatórios -->
        <div class="flex flex-wrap items-center justify-center gap-x-4 gap-y-2 font-medium text-slate-700">
          <button 
            type="button" 
            data-open-modal="sobre"
            class="hover:text-uemg-blue underline underline-offset-4 transition-colors"
          >
            Sobre
          </button>
          <span class="text-slate-300">•</span>
          <button 
            type="button" 
            data-open-modal="termos"
            class="hover:text-uemg-blue underline underline-offset-4 transition-colors"
          >
            Termos de Uso
          </button>
          <span class="text-slate-300">•</span>
          <button 
            type="button" 
            data-open-modal="privacidade"
            class="hover:text-uemg-blue underline underline-offset-4 transition-colors"
          >
            Política de Privacidade
          </button>
          <span class="text-slate-300">•</span>
          <a 
            href="https://www.uemg.br/pesquisa/seminarios" 
            target="_blank" 
            rel="noopener noreferrer"
            class="hover:text-uemg-blue inline-flex items-center gap-1 font-semibold text-uemg-blue transition-colors"
          >
            <span>Página Oficial UEMG</span>
            <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
            </svg>
          </a>
        </div>

        <p class="text-[11px] text-slate-400">
          Seminário de Pesquisa e Extensão da UEMG — Unidade Carangola &copy; ${new Date().getFullYear()}
        </p>
      </div>
    </footer>
  `;
}

