import sharp from 'sharp'
import { mkdirSync, existsSync } from 'fs'
import { resolve, dirname } from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

// 生成 Minecraft 苦力怕风格 SVG 图标
function generateIcon(size) {
  const pixelSize = size / 16

  // 苦力怕脸像素图案 (16x16 grid)
  const face = [
    '0000000000000000',
    '0111111111111110',
    '0111111111111110',
    '0111221111221110',
    '0111221111221110',
    '0111221111221110',
    '0111111111111110',
    '0111111221111110',
    '0111122222211110',
    '0111122222211110',
    '0111122112211110',
    '0111122112211110',
    '0111111111111110',
    '0111111111111110',
    '0111111111111110',
    '0000000000000000',
  ]

  const colors = {
    '0': '#3D6B1E',
    '1': '#5B8731',
    '2': '#1A1A1A',
  }

  let pixels = ''
  for (let y = 0; y < 16; y++) {
    for (let x = 0; x < 16; x++) {
      const char = face[y][x]
      const color = colors[char] || '#5B8731'
      pixels += `<rect x="${x * pixelSize}" y="${y * pixelSize}" width="${pixelSize}" height="${pixelSize}" fill="${color}"/>`
    }
  }

  return `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 ${size} ${size}">${pixels}</svg>`
}

const iconsDir = resolve(__dirname, '..', 'public', 'icons')
if (!existsSync(iconsDir)) {
  mkdirSync(iconsDir, { recursive: true })
}

for (const size of [16, 48, 128]) {
  const svg = generateIcon(size)
  const outputPath = resolve(iconsDir, `icon${size}.png`)
  
  await sharp(Buffer.from(svg))
    .png()
    .toFile(outputPath)
  
  console.log(`✅ 生成 icon${size}.png (${size}x${size})`)
}

console.log('\n🎮 所有图标已生成！')
