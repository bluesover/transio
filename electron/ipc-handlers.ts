import { ipcMain, dialog, shell, BrowserWindow, app } from 'electron'
import { readFile, writeFile, readdir, stat, watch } from 'fs/promises'
import { existsSync } from 'fs'
import { join } from 'path'
import Store from 'electron-store'
import type { SaxonInstaller } from './saxon-installer'
import { createWriteStream } from 'fs'
import { pipeline } from 'stream/promises'
import archiver from 'archiver'
import extract from 'extract-zip'

const store = new Store()
const fileWatchers = new Map()

export function setupIpcHandlers(mainWindow: BrowserWindow, saxonInstaller: SaxonInstaller) {
  
  ipcMain.handle('file:read', async (_event, filePath: string) => {
    try {
      const content = await readFile(filePath, 'utf-8')
      return { success: true, content }
    } catch (error: any) {
      return { success: false, error: error.message }
    }
  })

  ipcMain.handle('file:write', async (_event, filePath: string, content: string) => {
    try {
      await writeFile(filePath, content, 'utf-8')
      return { success: true }
    } catch (error: any) {
      return { success: false, error: error.message }
    }
  })

  ipcMain.handle('file:choose-directory', async () => {
    const result = await dialog.showOpenDialog(mainWindow, {
      properties: ['openDirectory', 'createDirectory']
    })

    if (result.canceled || result.filePaths.length === 0) {
      return { success: false, canceled: true }
    }

    return { success: true, path: result.filePaths[0] }
  })

  ipcMain.handle('file:choose-file', async (_event, filters?: any) => {
    const result = await dialog.showOpenDialog(mainWindow, {
      properties: ['openFile'],
      filters: filters || [
        { name: 'XML Files', extensions: ['xml'] },
        { name: 'XSLT Files', extensions: ['xsl', 'xslt'] },
        { name: 'All Files', extensions: ['*'] }
      ]
    })

    if (result.canceled || result.filePaths.length === 0) {
      return { success: false, canceled: true }
    }

    const filePath = result.filePaths[0]
    const content = await readFile(filePath, 'utf-8')
    return { success: true, path: filePath, content }
  })

  ipcMain.handle('file:save-file', async (_event, defaultPath: string, content: string) => {
    const result = await dialog.showSaveDialog(mainWindow, {
      defaultPath,
      filters: [
        { name: 'XML Files', extensions: ['xml'] },
        { name: 'XSLT Files', extensions: ['xsl', 'xslt'] },
        { name: 'HTML Files', extensions: ['html'] },
        { name: 'Text Files', extensions: ['txt'] },
        { name: 'All Files', extensions: ['*'] }
      ]
    })

    if (result.canceled || !result.filePath) {
      return { success: false, canceled: true }
    }

    await writeFile(result.filePath, content, 'utf-8')
    return { success: true, path: result.filePath }
  })

  ipcMain.handle('file:exists', async (_event, filePath: string) => {
    return existsSync(filePath)
  })

  ipcMain.handle('file:read-directory', async (_event, dirPath: string) => {
    try {
      const files = await readdir(dirPath)
      const fileStats = await Promise.all(
        files.map(async (file) => {
          const filePath = join(dirPath, file)
          const stats = await stat(filePath)
          return {
            name: file,
            path: filePath,
            isDirectory: stats.isDirectory(),
            size: stats.size,
            modified: stats.mtime.getTime()
          }
        })
      )
      return { success: true, files: fileStats }
    } catch (error: any) {
      return { success: false, error: error.message }
    }
  })

  ipcMain.handle('file:watch', async (_event, filePath: string) => {
    if (fileWatchers.has(filePath)) {
      return { success: true, alreadyWatching: true }
    }

    try {
      const watcher = watch(filePath)
      fileWatchers.set(filePath, watcher)

      ;(async () => {
        for await (const event of watcher) {
          if (event.eventType === 'change') {
            mainWindow.webContents.send('file:changed', filePath)
          }
        }
      })()

      return { success: true }
    } catch (error: any) {
      return { success: false, error: error.message }
    }
  })

  ipcMain.handle('file:unwatch', async (_event, filePath: string) => {
    const watcher = fileWatchers.get(filePath)
    if (watcher) {
      await watcher.close()
      fileWatchers.delete(filePath)
    }
    return { success: true }
  })

  ipcMain.handle('saxon:check', async () => {
    return await saxonInstaller.checkInstallation()
  })

  ipcMain.handle('saxon:install', async () => {
    try {
      await saxonInstaller.install((progress) => {
        mainWindow.webContents.send('saxon:install-progress', progress)
      })
      return { success: true }
    } catch (error: any) {
      return { success: false, error: error.message }
    }
  })

  ipcMain.handle('saxon:start-server', async () => {
    try {
      await saxonInstaller.startServer()
      return { success: true }
    } catch (error: any) {
      return { success: false, error: error.message }
    }
  })

  ipcMain.handle('saxon:stop-server', async () => {
    try {
      await saxonInstaller.stopServer()
      return { success: true }
    } catch (error: any) {
      return { success: false, error: error.message }
    }
  })

  ipcMain.handle('saxon:get-status', async () => {
    return saxonInstaller.getStatus()
  })

  ipcMain.handle('project:export-zip', async (_event, projectData: any, savePath: string) => {
    try {
      const output = createWriteStream(savePath)
      const archive = archiver('zip', { zlib: { level: 9 } })

      archive.pipe(output)

      archive.append(projectData.xml, { name: 'current.xml' })
      archive.append(projectData.xslt, { name: 'current.xslt' })
      archive.append(JSON.stringify(projectData.metadata, null, 2), { name: 'project.json' })

      if (projectData.versions && projectData.versions.length > 0) {
        projectData.versions.forEach((version: any) => {
          archive.append(version.xml, { name: `versions/${version.id}.xml` })
          archive.append(version.xslt, { name: `versions/${version.id}.xslt` })
        })
      }

      await archive.finalize()
      return { success: true, path: savePath }
    } catch (error: any) {
      return { success: false, error: error.message }
    }
  })

  ipcMain.handle('project:import-zip', async (_event, filePath: string) => {
    try {
      const tempDir = join(app.getPath('temp'), `transio-import-${Date.now()}`)
      await extract(filePath, { dir: tempDir })

      const xml = await readFile(join(tempDir, 'current.xml'), 'utf-8')
      const xslt = await readFile(join(tempDir, 'current.xslt'), 'utf-8')
      const metadata = JSON.parse(await readFile(join(tempDir, 'project.json'), 'utf-8'))

      const versions: any[] = []
      const versionsDir = join(tempDir, 'versions')
      if (existsSync(versionsDir)) {
        const versionFiles = await readdir(versionsDir)
        for (const file of versionFiles) {
          if (file.endsWith('.xml')) {
            const id = file.replace('.xml', '')
            const versionXml = await readFile(join(versionsDir, file), 'utf-8')
            const versionXslt = await readFile(join(versionsDir, `${id}.xslt`), 'utf-8')
            versions.push({ id, xml: versionXml, xslt: versionXslt })
          }
        }
      }

      return {
        success: true,
        project: { xml, xslt, metadata, versions }
      }
    } catch (error: any) {
      return { success: false, error: error.message }
    }
  })

  ipcMain.handle('app:get-version', () => {
    return app.getVersion()
  })

  ipcMain.handle('app:check-updates', async () => {
    try {
      const result = await require('electron-updater').autoUpdater.checkForUpdates()
      return { success: true, updateInfo: result.updateInfo }
    } catch (error: any) {
      return { success: false, error: error.message }
    }
  })

  ipcMain.handle('app:show-item-in-folder', (_event, path: string) => {
    shell.showItemInFolder(path)
    return { success: true }
  })

  ipcMain.handle('app:open-external', async (_event, url: string) => {
    await shell.openExternal(url)
    return { success: true }
  })

  ipcMain.handle('dialog:show-message-box', async (_event, options: any) => {
    const result = await dialog.showMessageBox(mainWindow, options)
    return result
  })

  ipcMain.handle('dialog:show-error-box', (_event, title: string, content: string) => {
    dialog.showErrorBox(title, content)
    return { success: true }
  })

  ipcMain.handle('store:get', (_event, key: string) => {
    return store.get(key)
  })

  ipcMain.handle('store:set', (_event, key: string, value: any) => {
    store.set(key, value)
    return { success: true }
  })

  ipcMain.handle('store:delete', (_event, key: string) => {
    store.delete(key)
    return { success: true }
  })

  ipcMain.handle('store:clear', () => {
    store.clear()
    return { success: true }
  })
}
