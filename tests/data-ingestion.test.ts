import { describe, it, expect } from 'vitest';
import fs from 'node:fs';
import path from 'node:path';

describe('Pipeline de Ingestão de Dados e Regras LGPD', () => {
  const dataDir = path.join(process.cwd(), 'src', 'data');
  const atividadesFile = path.join(dataDir, 'atividades.json');
  const apresentacoesFile = path.join(dataDir, 'apresentacoes.json');
  const versionFile = path.join(dataDir, 'version.json');

  it('deve gerar os arquivos JSON na pasta src/data', () => {
    expect(fs.existsSync(atividadesFile)).toBe(true);
    expect(fs.existsSync(apresentacoesFile)).toBe(true);
    expect(fs.existsSync(versionFile)).toBe(true);
  });

  it('deve compilar as atividades ativas preservando acentos em UTF-8', () => {
    const raw = fs.readFileSync(atividadesFile, 'utf8');
    const atividades = JSON.parse(raw);
    expect(atividades.length).toBe(9);

    // Verifica integridade de acentuação
    const primeira = atividades[0];
    expect(primeira.titulo.toLowerCase()).toContain('construção');
    expect(primeira.local.toLowerCase()).toContain('auditório');
    expect(primeira.tipo.toLowerCase()).toBe('mesa redonda');

    // Garante que não há dados pessoais vazados
    for (const item of atividades) {
      expect(item).not.toHaveProperty('email');
      expect(item).not.toHaveProperty('telefone');
      expect(item.titulo.toLowerCase()).not.toContain('cancelado');
    }
  });

  it('deve compilar 101 apresentações orais com expurgo estrito de EMAIL (LGPD)', () => {
    const raw = fs.readFileSync(apresentacoesFile, 'utf8');
    const apresentacoes = JSON.parse(raw);
    expect(apresentacoes.length).toBe(101);

    for (const item of apresentacoes) {
      expect(item).not.toHaveProperty('EMAIL');
      expect(item).not.toHaveProperty('email');
      expect(item.titulo).toBeDefined();
      expect(item.sala).toBeDefined();
    }

    const primeira = apresentacoes[0];
    expect(primeira.titulo).toContain('MATEMÁTICA');
  });

  it('deve calcular o hash de versão SHA-256', () => {
    const raw = fs.readFileSync(versionFile, 'utf8');
    const version = JSON.parse(raw);
    expect(version.version).toBe('1.0.0');
    expect(version.dataHash).toBeDefined();
    expect(version.dataHash.length).toBe(64);
  });
});
