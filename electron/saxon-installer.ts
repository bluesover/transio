import { app } from 'electron'
import { join } from 'path'
import { existsSync } from 'fs'
import { mkdir, writeFile, chmod } from 'fs/promises'
import { spawn, ChildProcess } from 'child_process'
import https from 'https'
import { createWriteStream } from 'fs'
import { pipeline } from 'stream/promises'
import log from 'electron-log'
import extract from 'extract-zip'

export class SaxonInstaller {
  private serverProcess: ChildProcess | null = null
  private readonly appDataPath: string
  private readonly saxonPath: string
  private readonly jrePath: string
  private readonly serverPath: string

  constructor() {
    this.appDataPath = app.getPath('userData')
    this.saxonPath = join(this.appDataPath, 'saxon')
    this.jrePath = join(this.appDataPath, 'jre')
    this.serverPath = join(app.getAppPath(), 'server')
  }

  async checkInstallation(): Promise<boolean> {
    const saxonJarExists = existsSync(join(this.saxonPath, 'saxon-he-12.3.jar'))
    const jreExists = existsSync(this.jrePath)
    
    log.info(`Saxon-HE installed: ${saxonJarExists}`)
    log.info(`JRE installed: ${jreExists}`)
    
    return saxonJarExists && jreExists
  }

  async install(onProgress?: (progress: { step: string; percent: number }) => void): Promise<void> {
    log.info('Starting Saxon-HE installation...')
    
    try {
      await mkdir(this.saxonPath, { recursive: true })
      await mkdir(this.jrePath, { recursive: true })

      if (!existsSync(join(this.jrePath, 'bin'))) {
        onProgress?.({ step: 'Downloading Java Runtime...', percent: 10 })
        await this.downloadJRE()
        onProgress?.({ step: 'Extracting Java Runtime...', percent: 40 })
        await this.extractJRE()
      }

      if (!existsSync(join(this.saxonPath, 'saxon-he-12.3.jar'))) {
        onProgress?.({ step: 'Downloading Saxon-HE...', percent: 60 })
        await this.downloadSaxon()
      }

      onProgress?.({ step: 'Configuring server...', percent: 80 })
      await this.configureServer()

      onProgress?.({ step: 'Installation complete!', percent: 100 })
      log.info('Saxon-HE installation completed successfully')
    } catch (error) {
      log.error('Saxon-HE installation failed:', error)
      throw error
    }
  }

  private async downloadJRE(): Promise<void> {
    const platform = process.platform
    let jreUrl: string

    if (platform === 'win32') {
      jreUrl = 'https://github.com/adoptium/temurin17-binaries/releases/download/jdk-17.0.9%2B9/OpenJDK17U-jre_x64_windows_hotspot_17.0.9_9.zip'
    } else if (platform === 'darwin') {
      const arch = process.arch === 'arm64' ? 'aarch64' : 'x64'
      jreUrl = `https://github.com/adoptium/temurin17-binaries/releases/download/jdk-17.0.9%2B9/OpenJDK17U-jre_${arch}_mac_hotspot_17.0.9_9.tar.gz`
    } else {
      jreUrl = 'https://github.com/adoptium/temurin17-binaries/releases/download/jdk-17.0.9%2B9/OpenJDK17U-jre_x64_linux_hotspot_17.0.9_9.tar.gz'
    }

    const zipPath = join(this.appDataPath, 'jre-download.zip')
    await this.downloadFile(jreUrl, zipPath)
  }

  private async extractJRE(): Promise<void> {
    const zipPath = join(this.appDataPath, 'jre-download.zip')
    await extract(zipPath, { dir: this.jrePath })
  }

  private async downloadSaxon(): Promise<void> {
    const saxonUrl = 'https://repo1.maven.org/maven2/net/sf/saxon/Saxon-HE/12.3/Saxon-HE-12.3.jar'
    const jarPath = join(this.saxonPath, 'saxon-he-12.3.jar')
    await this.downloadFile(saxonUrl, jarPath)
  }

  private async downloadFile(url: string, dest: string): Promise<void> {
    return new Promise((resolve, reject) => {
      https.get(url, (response) => {
        if (response.statusCode === 302 || response.statusCode === 301) {
          https.get(response.headers.location!, (redirectResponse) => {
            const fileStream = createWriteStream(dest)
            redirectResponse.pipe(fileStream)
            fileStream.on('finish', () => {
              fileStream.close()
              resolve()
            })
            fileStream.on('error', reject)
          })
        } else {
          const fileStream = createWriteStream(dest)
          response.pipe(fileStream)
          fileStream.on('finish', () => {
            fileStream.close()
            resolve()
          })
          fileStream.on('error', reject)
        }
      }).on('error', reject)
    })
  }

  private async configureServer(): Promise<void> {
    const platform = process.platform
    const scriptPath = platform === 'win32' 
      ? join(this.saxonPath, 'start-server.bat')
      : join(this.saxonPath, 'start-server.sh')

    let javaExec: string
    if (platform === 'win32') {
      javaExec = join(this.jrePath, 'bin', 'java.exe')
    } else {
      const jreSubdir = await this.findJRESubdir()
      javaExec = join(this.jrePath, jreSubdir, 'bin', 'java')
    }

    const saxonJar = join(this.saxonPath, 'saxon-he-12.3.jar')
    
    let scriptContent: string
    if (platform === 'win32') {
      scriptContent = `@echo off
cd /d "${this.serverPath}"
"${javaExec}" -jar "${saxonJar}" -cp node_modules npm start
`
    } else {
      scriptContent = `#!/bin/bash
cd "${this.serverPath}"
"${javaExec}" -jar "${saxonJar}" -cp node_modules npm start
`
    }

    await writeFile(scriptPath, scriptContent, 'utf-8')
    
    if (platform !== 'win32') {
      await chmod(scriptPath, 0o755)
    }

    log.info(`Server startup script created at: ${scriptPath}`)
  }

  private async findJRESubdir(): Promise<string> {
    const { readdir } = await import('fs/promises')
    const contents = await readdir(this.jrePath)
    const jreDir = contents.find(item => item.startsWith('jdk-') || item.startsWith('jre-'))
    return jreDir || ''
  }

  async startServer(): Promise<void> {
    if (this.serverProcess) {
      log.info('Server already running')
      return
    }

    const installed = await this.checkInstallation()
    if (!installed) {
      throw new Error('Saxon-HE not installed. Please run installation first.')
    }

    log.info('Starting Saxon-HE server...')

    const platform = process.platform
    const scriptPath = platform === 'win32' 
      ? join(this.saxonPath, 'start-server.bat')
      : join(this.saxonPath, 'start-server.sh')

    this.serverProcess = spawn(
      platform === 'win32' ? scriptPath : 'sh',
      platform === 'win32' ? [] : [scriptPath],
      {
        cwd: this.serverPath,
        env: { ...process.env, PORT: '3001' },
        detached: false,
        stdio: 'pipe'
      }
    )

    this.serverProcess.stdout?.on('data', (data) => {
      log.info(`Server: ${data.toString()}`)
    })

    this.serverProcess.stderr?.on('data', (data) => {
      log.error(`Server Error: ${data.toString()}`)
    })

    this.serverProcess.on('exit', (code) => {
      log.info(`Server exited with code ${code}`)
      this.serverProcess = null
    })

    await this.waitForServer()
    log.info('Saxon-HE server started successfully')
  }

  private async waitForServer(maxAttempts = 30): Promise<void> {
    for (let i = 0; i < maxAttempts; i++) {
      try {
        const response = await fetch('http://localhost:3001/api/health')
        if (response.ok) {
          return
        }
      } catch (error) {
        await new Promise(resolve => setTimeout(resolve, 1000))
      }
    }
    throw new Error('Server failed to start within 30 seconds')
  }

  async stopServer(): Promise<void> {
    if (!this.serverProcess) {
      return
    }

    log.info('Stopping Saxon-HE server...')
    
    this.serverProcess.kill('SIGTERM')
    
    await new Promise(resolve => setTimeout(resolve, 2000))
    
    if (this.serverProcess && !this.serverProcess.killed) {
      this.serverProcess.kill('SIGKILL')
    }
    
    this.serverProcess = null
    log.info('Saxon-HE server stopped')
  }

  getStatus(): { running: boolean; installed: boolean } {
    return {
      running: this.serverProcess !== null,
      installed: existsSync(join(this.saxonPath, 'saxon-he-12.3.jar'))
    }
  }
}
