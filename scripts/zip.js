import { createWriteStream, readdirSync, statSync, readFileSync } from 'fs'
import { resolve, relative, dirname, join } from 'path'
import { fileURLToPath } from 'url'
import { createDeflateRaw } from 'zlib'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const distDir = resolve(__dirname, '..', 'dist')
const pkg = JSON.parse(readFileSync(resolve(__dirname, '..', 'package.json'), 'utf-8'))
const outputPath = resolve(__dirname, '..', `bilibili-minecraft-font-v${pkg.version}.zip`)

// 简单的 ZIP 创建（使用 archiver 更好，但保持零依赖）
// 实际使用中在 CI 里调用系统 zip 命令
import { execSync } from 'child_process'

try {
  // 尝试使用系统 tar 命令 (Windows/Linux/Mac 都支持)
  process.chdir(distDir)
  
  // 在 Windows 上使用 PowerShell 的 Compress-Archive
  execSync(
    `powershell -Command "Compress-Archive -Path '${distDir}/*' -DestinationPath '${outputPath}' -Force"`,
    { stdio: 'inherit' }
  )
  console.log(`\n✅ 打包完成: bilibili-minecraft-font-v${pkg.version}.zip`)
} catch {
  // 在 Linux/Mac 上使用 zip 命令
  try {
    execSync(`cd "${distDir}" && zip -r "${outputPath}" .`, { stdio: 'inherit' })
    console.log(`\n✅ 打包完成: bilibili-minecraft-font-v${pkg.version}.zip`)
  } catch (e) {
    console.error('❌ 打包失败，请手动压缩 dist 目录')
    process.exit(1)
  }
}
