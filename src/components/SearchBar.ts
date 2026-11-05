export function renderSearchBar(placeholderText: string, currentVal: string): string {
  const hasValue = currentVal.trim().length > 0;

  return `
    <div class="relative w-full">
      <div class="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
      </div>
      <input 
        type="search" 
        id="main-search-input" 
        value="${currentVal.replace(/"/g, '&quot;')}"
        placeholder="${placeholderText}" 
        autocomplete="off"
        spellcheck="false"
        class="w-full pl-10 pr-10 py-3 rounded-xl border border-slate-300 bg-white text-slate-800 placeholder-slate-400 text-sm focus:outline-none focus:ring-2 focus:ring-uemg-blue/30 focus:border-uemg-blue transition-all shadow-sm"
      />
      <button 
        type="button" 
        id="clear-search-btn" 
        class="absolute inset-y-0 right-0 pr-3.5 flex items-center text-slate-400 hover:text-slate-600 transition-colors ${hasValue ? '' : 'hidden'}"
        title="Limpar pesquisa"
      >
        <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
          <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clip-rule="evenodd" />
        </svg>
      </button>
    </div>
  `;
}

