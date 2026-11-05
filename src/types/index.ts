/**
 * Definições de Tipos — Seminário UEMG Carangola PWA
 */

export type TabType = 'atividades' | 'apresentacoes';

export interface Atividade {
  id: string;
  proponente: string;
  integrantes: string[];
  titulo: string;
  tipo: string;
  modalidade: string;
  local: string;
  dia: string;
  horario: string;
  descricao: string;
  searchIndex?: string;
}

export interface ApresentacaoOral {
  id: string;
  autoria: string;
  titulo: string;
  sala: string;
  mediador: string;
  avaliador: string;
  dia: string;
  searchIndex?: string;
}

export interface VersionInfo {
  version: string;
  buildTime: string;
  totalAtividades: number;
  totalApresentacoes: number;
  dataHash: string;
}

export interface FilterState {
  searchTerm: string;
  selectedDia: string;
  selectedLocalOrSala: string;
  selectedTipo: string;
}
