import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';
import iconv from 'iconv-lite';
import { parse } from 'csv-parse/sync';

const rootDir = process.cwd();
const conteudosDir = path.join(rootDir, 'conteudos');
const outputDir = path.join(rootDir, 'src', 'data');

if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

console.log('🔄 Executando pipeline de compilação e higienização de dados (LGPD + UTF-8)...');

// 1. Processamento de Atividades.csv
const atividadesCsvPath = path.join(conteudosDir, 'Atividades.csv');
const rawAtividadesBuffer = fs.readFileSync(atividadesCsvPath);
const fullAtividadesText = iconv.decode(rawAtividadesBuffer, 'win1252');

// Localiza o cabeçalho real ignorando eventuais linhas de aviso da planilha
const headerIndex = fullAtividadesText.indexOf('ID;');
const validAtividadesText =
  headerIndex !== -1 ? fullAtividadesText.substring(headerIndex) : fullAtividadesText;

const rawAtividadesRecords = parse(validAtividadesText, {
  columns: true,
  delimiter: ';',
  relax_quotes: true,
  skip_empty_lines: true,
  trim: true,
});

const atividades = [];

for (const row of rawAtividadesRecords) {
  // Localiza campos independentemente de variações sutis no cabeçalho (ex: non-breaking space)
  const getField = (keys) => {
    for (const key of keys) {
      if (row[key] !== undefined) return String(row[key]).trim();
    }
    // Procura por aproximação de chave
    for (const rowKey of Object.keys(row)) {
      const cleanKey = rowKey
        .replace(/[\s\u00a0]+/g, ' ')
        .trim()
        .toLowerCase();
      for (const target of keys) {
        if (cleanKey === target.toLowerCase()) return String(row[rowKey]).trim();
      }
    }
    return '';
  };

  const id = getField(['ID']);
  const titulo = getField(['Título da Atividade', 'TÍTULO', 'TITULO']);

  // Ignora registros cancelados ou linhas vazias
  if (!id || !titulo || titulo.toLowerCase().includes('cancelado')) {
    continue;
  }

  const proponente = getField([
    'Nome Completo do(a) Proponente da Atividade',
    'Nome',
    'PROPONENTE',
  ]);
  const integrantesRaw = getField(['Insira o nome dos integrantes:', 'INTEGRANTES']);
  const integrantes = integrantesRaw
    ? integrantesRaw
        .split(/[,;\n]/)
        .map((s) => s.trim())
        .filter(Boolean)
    : [];

  const tipo = getField(['Natureza da Atividade', 'TIPO']);
  const modalidade = getField(['Modalidade de Oferta da Atividade', 'MODALIDADE']);
  const local = getField(['Local de realização da Atividade', 'LOCAL']);

  // Normalização do dia (ex: "10/nov" -> "10", "11/11" -> "11")
  let dia = getField(['Dia de realização da Atividade', 'DIA']);
  const diaMatch = dia.match(/^(\d{1,2})/);
  if (diaMatch) {
    dia = diaMatch[1];
  }

  const horario = getField(['Horário da Atividade', 'HORÁRIO', 'HORARIO']);
  const descricao = getField([
    'Descreva de forma resumida a sua proposição',
    'Descreva de forma resumida a sua proposição ',
    'DESCRIÇÃO',
    'DESCRICAO',
  ]);

  atividades.push({
    id,
    proponente,
    integrantes,
    titulo,
    tipo,
    modalidade,
    local,
    dia,
    horario,
    descricao,
  });
}

// 2. Processamento de Apresentação Oral.csv
const apresentacoesCsvPath = path.join(conteudosDir, 'Apresentação Oral.csv');
const rawApresentacoesBuffer = fs.readFileSync(apresentacoesCsvPath);
const apresentacoesText = iconv.decode(rawApresentacoesBuffer, 'win1252');

const rawApresentacoesRecords = parse(apresentacoesText, {
  columns: true,
  delimiter: ';',
  relax_quotes: true,
  skip_empty_lines: true,
  trim: true,
});

const apresentacoes = [];

for (const row of rawApresentacoesRecords) {
  const id = String(row.ID || '').trim();
  const titulo = String(row['TÍTULO'] || row.TITULO || '').trim();

  if (!id || !titulo) continue;

  let dia = String(row.DIA || '').trim();
  const diaMatch = dia.match(/^(\d{1,2})/);
  if (diaMatch) {
    dia = diaMatch[1];
  }

  // ATENÇÃO: Regra de Segurança LGPD — Expurgo estrito do campo EMAIL
  apresentacoes.push({
    id,
    autoria: String(row.AUTORIA || '').trim(),
    titulo,
    sala: String(row.SALA || '').trim(),
    mediador: String(row.MEDIADOR || '').trim(),
    avaliador: String(row.AVALIADOR || row['AVALIADOR 1'] || '').trim(),
    dia,
  });
}

// 3. Cálculo de integridade criptográfica
const dataPayload = JSON.stringify({ atividades, apresentacoes });
const dataHash = crypto.createHash('sha256').update(dataPayload).digest('hex');

const versionInfo = {
  version: '1.0.0',
  buildTime: new Date().toISOString(),
  totalAtividades: atividades.length,
  totalApresentacoes: apresentacoes.length,
  dataHash,
};

// 4. Gravação dos arquivos JSON
fs.writeFileSync(
  path.join(outputDir, 'atividades.json'),
  JSON.stringify(atividades, null, 2),
  'utf8'
);
fs.writeFileSync(
  path.join(outputDir, 'apresentacoes.json'),
  JSON.stringify(apresentacoes, null, 2),
  'utf8'
);
fs.writeFileSync(
  path.join(outputDir, 'version.json'),
  JSON.stringify(versionInfo, null, 2),
  'utf8'
);

console.log(`✅ Pipeline de dados concluído com sucesso:`);
console.log(`   - Atividades ativas: ${atividades.length}`);
console.log(`   - Apresentações ativas (LGPD filtrado): ${apresentacoes.length}`);
console.log(`   - Hash SHA-256: ${dataHash.substring(0, 16)}...`);
