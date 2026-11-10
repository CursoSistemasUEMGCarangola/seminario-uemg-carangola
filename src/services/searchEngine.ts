import { Atividade, ApresentacaoOral, FilterState } from '../types';

/**
 * Remove acentuação e converte para minúsculas para busca insensível a diacríticos.
 */
export function normalizeText(text: string): string {
  if (!text) return '';
  return text
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .trim();
}

/**
 * Pré-computa o índice de busca para uma Atividade.
 */
export function indexAtividade(item: Atividade): string {
  const parts = [
    item.id,
    item.proponente,
    ...(item.integrantes || []),
    item.titulo,
    item.tipo,
    item.modalidade,
    item.local,
    item.dia,
    item.horario,
    item.descricao,
  ];
  return normalizeText(parts.join(' '));
}

/**
 * Pré-computa o índice de busca para uma Apresentação Oral.
 */
export function indexApresentacao(item: ApresentacaoOral): string {
  const parts = [
    item.id,
    item.autoria,
    item.titulo,
    item.sala,
    item.mediador,
    item.avaliador,
    item.dia,
  ];
  return normalizeText(parts.join(' '));
}

/**
 * Filtra a lista de Atividades com base nos critérios de busca e filtros ativos.
 */
export function filterAtividades(items: readonly Atividade[], filters: FilterState): Atividade[] {
  const normalizedQuery = normalizeText(filters.searchTerm);
  const searchWords = normalizedQuery.split(/\s+/).filter(Boolean);

  return items.filter((item) => {
    // 1. Filtro por Dia
    if (filters.selectedDia && item.dia !== filters.selectedDia) {
      return false;
    }

    // 2. Filtro por Tipo de Atividade
    if (filters.selectedTipo && item.tipo !== filters.selectedTipo) {
      return false;
    }

    // 3. Filtro por Local
    if (filters.selectedLocalOrSala) {
      if (filters.selectedLocalOrSala === 'ONLINE') {
        if (!/^https?:\/\//i.test(item.local.trim()) && item.modalidade !== 'REMOTA') {
          return false;
        }
      } else if (item.local !== filters.selectedLocalOrSala) {
        return false;
      }
    }

    // 4. Busca textual livre em múltiplos campos
    if (searchWords.length > 0) {
      const idx = item.searchIndex || indexAtividade(item);
      for (const word of searchWords) {
        if (!idx.includes(word)) {
          return false;
        }
      }
    }

    return true;
  });
}

/**
 * Filtra a lista de Apresentações Orais com base nos critérios de busca e filtros ativos.
 */
export function filterApresentacoes(
  items: readonly ApresentacaoOral[],
  filters: FilterState
): ApresentacaoOral[] {
  const normalizedQuery = normalizeText(filters.searchTerm);
  const searchWords = normalizedQuery.split(/\s+/).filter(Boolean);

  return items.filter((item) => {
    // 1. Filtro por Dia
    if (filters.selectedDia && item.dia !== filters.selectedDia) {
      return false;
    }

    // 2. Filtro por Sala
    if (filters.selectedLocalOrSala && item.sala !== filters.selectedLocalOrSala) {
      return false;
    }

    // 3. Busca textual livre em múltiplos campos
    if (searchWords.length > 0) {
      const idx = item.searchIndex || indexApresentacao(item);
      for (const word of searchWords) {
        if (!idx.includes(word)) {
          return false;
        }
      }
    }

    return true;
  });
}
