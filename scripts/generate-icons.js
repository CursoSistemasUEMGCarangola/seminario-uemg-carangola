import fs from 'node:fs';
import path from 'node:path';
import sharp from 'sharp';

const rootDir = process.cwd();
const logoSource = path.join(rootDir, 'conteudos', 'logo.png');
const publicIconsDir = path.join(rootDir, 'public', 'icons');

if (!fs.existsSync(publicIconsDir)) {
  fs.mkdirSync(publicIconsDir, { recursive: true });
}

console.log('🎨 Gerando ícones PWA a partir de logo.png...');

async function generateIcons() {
  if (!fs.existsSync(logoSource)) {
    console.error(`❌ Arquivo logo.png não encontrado em ${logoSource}`);
    process.exit(1);
  }

  // 1. Icon 192x192
  await sharp(logoSource)
    .resize(192, 192, { fit: 'contain', background: { r: 248, g: 250, b: 252, alpha: 1 } })
    .png()
    .toFile(path.join(publicIconsDir, 'icon-192x192.png'));

  // 1b. Maskable icon 192x192 (com margem de segurança)
  await sharp(logoSource)
    .resize(154, 154, { fit: 'contain', background: { r: 248, g: 250, b: 252, alpha: 0 } })
    .extend({
      top: 19,
      bottom: 19,
      left: 19,
      right: 19,
      background: { r: 248, g: 250, b: 252, alpha: 1 },
    })
    .png()
    .toFile(path.join(publicIconsDir, 'icon-192x192-maskable.png'));

  // 2. Icon 512x512
  await sharp(logoSource)
    .resize(512, 512, { fit: 'contain', background: { r: 248, g: 250, b: 252, alpha: 1 } })
    .png()
    .toFile(path.join(publicIconsDir, 'icon-512x512.png'));

  // 3. Maskable icon 512x512 (com margem de segurança)
  await sharp(logoSource)
    .resize(410, 410, { fit: 'contain', background: { r: 248, g: 250, b: 252, alpha: 0 } })
    .extend({
      top: 51,
      bottom: 51,
      left: 51,
      right: 51,
      background: { r: 248, g: 250, b: 252, alpha: 1 },
    })
    .png()
    .toFile(path.join(publicIconsDir, 'icon-512x512-maskable.png'));

  // 4. Favicon 32x32 / 64x64
  await sharp(logoSource)
    .resize(64, 64, { fit: 'contain', background: { r: 248, g: 250, b: 252, alpha: 1 } })
    .png()
    .toFile(path.join(rootDir, 'public', 'favicon.ico'));

  console.log('✅ Ícones PWA e Favicon gerados com sucesso em public/icons/!');
}

generateIcons().catch((err) => {
  console.error('❌ Erro na geração dos ícones:', err);
  process.exit(1);
});
