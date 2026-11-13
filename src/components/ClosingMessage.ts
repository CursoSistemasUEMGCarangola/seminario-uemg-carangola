export function renderClosingMessage(): string {
  return `
    <article class="bg-white rounded-3xl border border-slate-200/90 shadow-sm hover:shadow-md transition-shadow duration-300 overflow-hidden">
      <!-- Banner Superior de Destaque -->
      <div class="bg-gradient-to-r from-uemg-blue via-blue-900 to-indigo-950 text-white p-6 sm:p-8 relative overflow-hidden">
        <!-- Detalhe Decorativo de Fundo -->
        <div class="absolute -right-8 -bottom-8 w-40 h-40 bg-uemg-pink/20 rounded-full blur-2xl pointer-events-none"></div>
        <div class="absolute -left-10 -top-10 w-36 h-36 bg-blue-400/20 rounded-full blur-2xl pointer-events-none"></div>

        <div class="relative z-10 flex flex-col gap-3">
          <div class="flex items-center gap-2">
            <span class="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-bold bg-white/15 text-white backdrop-blur-md border border-white/20 uppercase tracking-wider">
              <svg class="w-3.5 h-3.5 text-uemg-pink" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" />
              </svg>
              Encerramento Oficial
            </span>
            <span class="text-xs text-blue-200 font-medium">Novembro / 2026</span>
          </div>

          <h2 class="text-2xl sm:text-3xl font-extrabold tracking-tight text-white leading-tight">
            28º Seminário de Pesquisa e Extensão
          </h2>
          <p class="text-sm sm:text-base text-blue-100 font-medium max-w-xl">
            Universidade do Estado de Minas Gerais — Unidade Carangola
          </p>
        </div>
      </div>

      <!-- Conteúdo da Mensagem de Agradecimento -->
      <div class="p-6 sm:p-8 flex flex-col gap-6 text-slate-700 leading-relaxed text-sm sm:text-base">
        <!-- Introdução -->
        <div class="space-y-3.5 text-slate-800">
          <p class="font-normal">
            Com o encerramento do <strong>28º Seminário de Pesquisa e Extensão da Universidade do Estado de Minas Gerais (UEMG) — Unidade Carangola</strong>, expressamos nosso mais sincero agradecimento a todos que tornaram este evento possível, produtivo e memorável.
          </p>

          <p class="font-normal text-slate-700">
            Ao longo desses três dias de atividades, minicursos, mesas-redondas, palestras e apresentações orais de trabalhos, reafirmamos o compromisso primordial da universidade pública com a produção científica de qualidade, o diálogo social, a democratização do conhecimento e o impacto positivo na nossa região.
          </p>
        </div>

        <!-- Seção de Reconhecimento Especial -->
        <div class="bg-slate-50/80 border border-slate-200/80 rounded-2xl p-5 sm:p-6 space-y-4">
          <div class="flex items-center gap-2 text-uemg-blue font-bold text-sm sm:text-base">
            <svg class="w-5 h-5 text-uemg-pink flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
            </svg>
            <span>Nosso reconhecimento especial a:</span>
          </div>

          <ul class="space-y-3 text-xs sm:text-sm text-slate-700">
            <li class="flex items-start gap-2.5">
              <span class="w-1.5 h-1.5 rounded-full bg-uemg-pink mt-2 flex-shrink-0"></span>
              <div>
                <strong class="text-slate-900 font-semibold">Estudantes, pesquisadores e extensionistas:</strong> pela dedicação, rigor e entusiasmo na apresentação de seus trabalhos e projetos, que representam a força viva da nossa instituição;
              </div>
            </li>

            <li class="flex items-start gap-2.5">
              <span class="w-1.5 h-1.5 rounded-full bg-uemg-pink mt-2 flex-shrink-0"></span>
              <div>
                <strong class="text-slate-900 font-semibold">Docentes, mediadores e avaliadores:</strong> pelo comprometimento técnico, pela generosidade na partilha de saberes e pelo acolhimento formativo dedicado a cada banca e atividade;
              </div>
            </li>

            <li class="flex items-start gap-2.5">
              <span class="w-1.5 h-1.5 rounded-full bg-uemg-pink mt-2 flex-shrink-0"></span>
              <div>
                <strong class="text-slate-900 font-semibold">Palestrantes e proponentes convidados:</strong> por enriquecerem nossa programação com discussões contemporâneas e reflexões indispensáveis;
              </div>
            </li>

            <li class="flex items-start gap-2.5">
              <span class="w-1.5 h-1.5 rounded-full bg-uemg-pink mt-2 flex-shrink-0"></span>
              <div>
                <strong class="text-slate-900 font-semibold">Comissão organizadora, servidores técnico-administrativos e equipes de apoio:</strong> pelo trabalho incansável nos bastidores, no planejamento e na execução impecável da infraestrutura, tecnologia e logística;
              </div>
            </li>

            <li class="flex items-start gap-2.5">
              <span class="w-1.5 h-1.5 rounded-full bg-uemg-pink mt-2 flex-shrink-0"></span>
              <div>
                <strong class="text-slate-900 font-semibold">Toda a comunidade que participou e prestigiou:</strong> presencialmente e de forma remota, fortalecendo a integração entre a UEMG e a sociedade.
              </div>
            </li>
          </ul>
        </div>

        <!-- Conclusão e Frutificação -->
        <p class="font-normal text-slate-800">
          Que as ideias, conexões e projetos germinados neste 28º Seminário continuem a frutificar em nossas salas de aula, laboratórios e ações de extensão.
        </p>

        <!-- Destaque Final de Gratidão -->
        <div class="mt-2 pt-6 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
          <div class="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-uemg-blue/10 via-uemg-pink/10 to-transparent border border-slate-200/80">
            <svg class="w-5 h-5 text-uemg-pink flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
              <path fill-rule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clip-rule="evenodd" />
            </svg>
            <span class="text-base sm:text-lg font-extrabold text-uemg-blue">
              A todos, nosso muito obrigado!
            </span>
          </div>

          <div class="text-xs text-slate-500 font-medium">
            <span class="block font-semibold text-slate-700">Coordenação de Extensão e Pesquisa</span>
            <span>UEMG — Unidade Carangola</span>
          </div>
        </div>
      </div>
    </article>
  `;
}

