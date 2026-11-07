import { describe, it, expect } from 'vitest';
import {
  normalizeText,
  filterAtividades,
  filterApresentacoes,
} from '../src/services/searchEngine';
import { isUrl, formatUrl, renderActivityCard } from '../src/components/ActivityCard';
import { renderPresentationCard } from '../src/components/PresentationCard';
import { MODAL_CONTENTS } from '../src/components/Modal';
import { formatBuildDate, renderVersionBar } from '../src/components/VersionBar';
import { Atividade, ApresentacaoOral, FilterState } from '../src/types';

describe('Search Engine & Filtering', () => {
  it('deve normalizar texto removendo acentos e maiúsculas', () => {
    expect(normalizeText('MESA REDONDA')).toBe('mesa redonda');
    expect(normalizeText('Histórico e Campesinato')).toBe('historico e campesinato');
    expect(normalizeText('Matemática em Ação!')).toBe('matematica em acao!');
  });

  const mockAtividades: Atividade[] = [
    {
      id: '1',
      proponente: 'CUSTÓDIO BARBOSA',
      integrantes: [],
      titulo: 'Identidade Campesina',
      tipo: 'Mesa Redonda',
      modalidade: 'Presencial',
      local: 'Auditório',
      dia: '10',
      horario: '19:00',
      descricao: 'Discussão sobre reforma agrária',
    },
    {
      id: '2',
      proponente: 'GLAUBER FLORINDO',
      integrantes: [],
      titulo: 'Análise do Discurso Histórico',
      tipo: 'Minicurso',
      modalidade: 'Presencial',
      local: 'Bloco 2 - Sala 1',
      dia: '11',
      horario: '19:00',
      descricao: 'Luta de classes e ideologia',
    },
  ];

  it('deve buscar atividades sem se importar com acentos ou maiúsculas', () => {
    const filters: FilterState = {
      searchTerm: 'custodio',
      selectedDia: '',
      selectedLocalOrSala: '',
      selectedTipo: '',
    };
    const res = filterAtividades(mockAtividades, filters);
    expect(res.length).toBe(1);
    expect(res[0].id).toBe('1');
  });

  it('deve filtrar atividades por dia e por tipo', () => {
    const filters: FilterState = {
      searchTerm: '',
      selectedDia: '11',
      selectedLocalOrSala: '',
      selectedTipo: 'Minicurso',
    };
    const res = filterAtividades(mockAtividades, filters);
    expect(res.length).toBe(1);
    expect(res[0].id).toBe('2');
  });

  const mockApresentacoes: ApresentacaoOral[] = [
    {
      id: '101',
      autoria: 'SABRINA ALVES BOLDRINI',
      titulo: 'Matemática e Café',
      sala: 'BLOCO 1 - SALA 1',
      mediador: 'SABRINA',
      avaliador: 'LUCAS CANCELA',
      dia: '10',
    },
    {
      id: '102',
      autoria: 'JOÃO SILVA',
      titulo: 'Química do Solo',
      sala: 'BLOCO 2 - SALA 3',
      mediador: 'MARIA',
      avaliador: 'PEDRO',
      dia: '11',
    },
  ];

  it('deve buscar apresentações por avaliador e sala', () => {
    const filters: FilterState = {
      searchTerm: 'cancela',
      selectedDia: '',
      selectedLocalOrSala: 'BLOCO 1 - SALA 1',
      selectedTipo: '',
    };
    const res = filterApresentacoes(mockApresentacoes, filters);
    expect(res.length).toBe(1);
    expect(res[0].id).toBe('101');
  });

  it('deve detectar URL no local da atividade e renderizar link com target=_blank', () => {
    const url = 'HTTPS://CALENDAR.APP.GOOGLE/LN15RCZECRVAFQAY7';
    expect(isUrl(url)).toBe(true);
    expect(formatUrl(url)).toBe('https://calendar.app.google/LN15RCZECRVAFQAY7');

    const onlineActivity: Atividade = {
      id: '273',
      proponente: 'DAYANA BARBOSA FURTADO',
      integrantes: [],
      titulo: 'POLÍTICAS DE INCLUSÃO',
      tipo: 'MINICURSO',
      modalidade: 'REMOTA',
      local: url,
      dia: '12',
      horario: '18:30 às 22:30',
      descricao: 'Descrição do minicurso online',
    };

    const cardHtml = renderActivityCard(onlineActivity, true);
    expect(cardHtml).toContain('target="_blank"');
    expect(cardHtml).toContain('rel="noopener noreferrer"');
    expect(cardHtml).toContain('href="https://calendar.app.google/LN15RCZECRVAFQAY7"');
    expect(cardHtml).toContain('Acessar Link Online');
  });

  it('deve incluir mencao a Coordenacao de Extensao da Unidade Carangola no modal SOBRE', () => {
    const sobreHtml = MODAL_CONTENTS.sobre.bodyHtml;
    expect(sobreHtml).toContain('Coordenação de Extensão da Unidade Carangola');
    expect(sobreHtml).toContain('Iniciativa:');
  });

  it('deve disponibilizar instrucoes no modal de instalacao PWA', () => {
    expect(MODAL_CONTENTS.instalar).toBeDefined();
    expect(MODAL_CONTENTS.instalar.bodyHtml).toContain('No Android');
    expect(MODAL_CONTENTS.instalar.bodyHtml).toContain('No iPhone');
  });

  it('deve exibir os rotulos Mediação e Avaliação nos cards de apresentacoes', () => {
    const cardHtml = renderPresentationCard(mockApresentacoes[0]);
    expect(cardHtml).toContain('Mediação:');
    expect(cardHtml).toContain('Avaliação:');
    expect(cardHtml).not.toContain('Mediador:');
    expect(cardHtml).not.toContain('Avaliador:');
  });

  it('deve formatar data ISO e renderizar barra de versao com botao de atualizacoes', () => {
    const isoString = '2026-11-07T12:39:02.082Z';
    const formatted = formatBuildDate(isoString);
    expect(formatted).toMatch(/\d{2}\/\d{2}\/\d{4} às \d{2}:\d{2}/);

    const fallback = formatBuildDate('data-invalida');
    expect(fallback).toBe('Atualizado recentemente');

    const html = renderVersionBar(isoString);
    expect(html).toContain('Última atualização:');
    expect(html).toContain(formatted);
    expect(html).toContain('id="check-updates-btn"');
    expect(html).toContain('Verificar atualizações');
  });
});

