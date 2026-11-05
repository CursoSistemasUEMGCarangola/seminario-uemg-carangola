export interface ModalContent {
  title: string;
  bodyHtml: string;
}

export function renderModalContainer(): string {
  return `
    <div id="app-modal" class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm hidden opacity-0 transition-opacity duration-200">
      <div 
        id="app-modal-panel"
        class="bg-white rounded-2xl shadow-xl max-w-lg w-full max-h-[85vh] flex flex-col overflow-hidden transform scale-95 transition-transform duration-200"
      >
        <!-- Header do Modal -->
        <div class="px-5 py-4 border-b border-slate-200 flex items-center justify-between bg-slate-50">
          <h3 id="app-modal-title" class="text-base font-bold text-uemg-blue"></h3>
          <button 
            type="button" 
            id="close-modal-btn"
            class="text-slate-400 hover:text-slate-600 p-1.5 rounded-lg hover:bg-slate-200/60 transition-colors"
            title="Fechar modal"
          >
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <!-- Conteúdo do Modal -->
        <div id="app-modal-body" class="p-5 overflow-y-auto text-sm text-slate-700 leading-relaxed space-y-3">
        </div>

        <!-- Rodapé do Modal -->
        <div class="px-5 py-3 border-t border-slate-200 bg-slate-50 flex justify-end">
          <button 
            type="button" 
            id="modal-ok-btn"
            class="px-4 py-2 bg-uemg-blue text-white text-xs font-bold rounded-lg hover:bg-blue-900 transition-colors shadow-sm"
          >
            Entendido
          </button>
        </div>
      </div>
    </div>
  `;
}

export const MODAL_CONTENTS: Record<string, ModalContent> = {
  sobre: {
    title: 'Sobre o Seminário UEMG Carangola',
    bodyHtml: `
      <p class="font-medium text-slate-800">
        O <strong>Seminário de Pesquisa e Extensão da Universidade do Estado de Minas Gerais (UEMG) — Unidade Carangola</strong> é o principal evento de divulgação científica e extensionista da instituição no município.
      </p>
      <p>
        Esta aplicação é uma iniciativa da <strong>Coordenação de Extensão da Unidade Carangola</strong>, projetada no formato <strong>Progressive Web Application (PWA)</strong> para oferecer acesso rápido, mobile-first e 100% autônomo (offline) à programação acadêmica de <strong>Atividades</strong> (palestras, minicursos, mesas-redondas) e <strong>Apresentações Orais</strong> dos trabalhos.
      </p>
      <div class="bg-blue-50 border border-blue-200 p-3 rounded-lg text-xs text-blue-900 mt-2 space-y-1">
        <div><strong>Iniciativa:</strong> Coordenação de Extensão — UEMG Unidade Carangola.</div>
        <div><strong>Local:</strong> Praça dos Estudantes, 23 - Carangola/MG.</div>
        <div><strong>Finalidade:</strong> Disseminação científica, extensão universitária e apoio à comunidade acadêmica.</div>
      </div>
    `,
  },
  instalar: {
    title: 'Como Instalar o Aplicativo',
    bodyHtml: `
      <p class="text-xs sm:text-sm text-slate-700">
        Você pode instalar o aplicativo do Seminário diretamente na tela inicial do seu dispositivo para acesso rápido e funcionamento 100% offline:
      </p>
      <div class="space-y-3 pt-1 text-xs text-slate-700">
        <div class="p-3 bg-slate-50 border border-slate-200 rounded-lg">
          <strong class="text-uemg-blue block mb-1">No Android (Google Chrome):</strong>
          Toque no botão <strong>"INSTALAR"</strong> no topo da página ou abra o menu do navegador (três pontinhos no canto superior direito) e selecione <strong>"Instalar aplicativo"</strong> ou <strong>"Adicionar à tela inicial"</strong>.
        </div>
        <div class="p-3 bg-slate-50 border border-slate-200 rounded-lg">
          <strong class="text-uemg-blue block mb-1">No iPhone / iPad (Safari):</strong>
          Toque no botão de <strong>Compartilhar</strong> (ícone de um quadrado com uma seta apontando para cima) na barra inferior do Safari e, em seguida, toque em <strong>"Adicionar à Tela de Início"</strong>.
        </div>
        <div class="p-3 bg-amber-50 border border-amber-200 rounded-lg text-amber-950">
          <strong class="text-amber-900 block mb-1">Dica para Android 15 / 16:</strong>
          Caso o sistema bloqueie a instalação informando que o app <em>"foi desenvolvido para versão mais antiga"</em>, isso decorre do serviço de empacotamento temporário WebAPK da Google. Para contornar e instalar de imediato sem o bloqueio, basta abrir o menu do Chrome (três pontinhos) e tocar em <strong>"Adicionar à tela inicial"</strong> (como atalho web) ou certificar-se de atualizar o app Google Chrome na Play Store. O aplicativo funcionará normalmente em tela cheia e com acesso offline.
        </div>
      </div>
    `,
  },
  termos: {
    title: 'Termos de Uso',
    bodyHtml: `
      <p>
        Bem-vindo à aplicação do Seminário UEMG Carangola. Ao utilizar este aplicativo, você concorda com as seguintes condições:
      </p>
      <ul class="list-disc pl-5 space-y-1.5 text-xs text-slate-700">
        <li><strong>Finalidade Informativa:</strong> Os dados de horários, salas, mediadores e bancas têm caráter estritamente orientador e de apoio aos participantes.</li>
        <li><strong>Fonte Oficial Primária:</strong> Em caso de divergências ou imprevistos de última hora, as listas e avisos afixados nos murais físicos e comunicados da Coordenação de Pesquisa prevalecem como referência oficial.</li>
        <li><strong>Integridade e Uso Indevido:</strong> É terminantemente proibido tentar forjar ou adulterar as visualizações exibidas no dispositivo para tentar comprovar participação ou aprovação indevida.</li>
      </ul>
    `,
  },
  privacidade: {
    title: 'Política de Privacidade (LGPD)',
    bodyHtml: `
      <p>
        Esta aplicação foi concebida com base no princípio da <strong>Privacidade por Padrão (Privacy by Design)</strong> e em estrito cumprimento à Lei Geral de Proteção de Dados Pessoais (Lei nº 13.709/2018 - LGPD):
      </p>
      <ul class="list-disc pl-5 space-y-1.5 text-xs text-slate-700">
        <li><strong>Sem Coleta de Dados:</strong> O aplicativo não exige cadastro, login, nem coleta dados cadastrais dos usuários.</li>
        <li><strong>Sem Rastreamento:</strong> Não são utilizados cookies de rastreamento, scripts de publicidade ou ferramentas de telemetria invasiva.</li>
        <li><strong>Proteção dos Docentes e Avaliadores:</strong> Dados de contato pessoal (como e-mails pessoais e telefones) presentes em planilhas administrativas internas foram expurgados no processo de compilação pública.</li>
        <li><strong>Armazenamento Local:</strong> Os arquivos da programação e preferências de tela são armazenados exclusivamente na memória de cache do seu navegador/dispositivo para viabilizar o funcionamento offline.</li>
      </ul>
    `,
  },
};

