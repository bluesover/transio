import { contextBridge, ipcRenderer } from 'electron'

const electronAPI = {
  platform: process.platform,
  
  file: {
    read: (filePath: string) => ipcRenderer.invoke('file:read', filePath),
    write: (filePath: string, content: string) => ipcRenderer.invoke('file:write', filePath, content),
    chooseDirectory: () => ipcRenderer.invoke('file:choose-directory'),
    chooseFile: (filters?: any) => ipcRenderer.invoke('file:choose-file', filters),
    saveFile: (defaultPath: string, content: string) => ipcRenderer.invoke('file:save-file', defaultPath, content),
    watch: (filePath: string) => ipcRenderer.invoke('file:watch', filePath),
    unwatch: (filePath: string) => ipcRenderer.invoke('file:unwatch', filePath),
    exists: (filePath: string) => ipcRenderer.invoke('file:exists', filePath),
    readDirectory: (dirPath: string) => ipcRenderer.invoke('file:read-directory', dirPath),
    onFileChanged: (callback: (filePath: string) => void) => {
      const subscription = (_event: any, filePath: string) => callback(filePath)
      ipcRenderer.on('file:changed', subscription)
      return () => ipcRenderer.removeListener('file:changed', subscription)
    }
  },

  saxon: {
    checkInstallation: () => ipcRenderer.invoke('saxon:check'),
    install: () => ipcRenderer.invoke('saxon:install'),
    startServer: () => ipcRenderer.invoke('saxon:start-server'),
    stopServer: () => ipcRenderer.invoke('saxon:stop-server'),
    getServerStatus: () => ipcRenderer.invoke('saxon:get-status'),
    onInstallProgress: (callback: (progress: any) => void) => {
      const subscription = (_event: any, progress: any) => callback(progress)
      ipcRenderer.on('saxon:install-progress', subscription)
      return () => ipcRenderer.removeListener('saxon:install-progress', subscription)
    }
  },

  project: {
    exportZip: (projectData: any, savePath: string) => ipcRenderer.invoke('project:export-zip', projectData, savePath),
    importZip: (filePath: string) => ipcRenderer.invoke('project:import-zip', filePath)
  },

  app: {
    getVersion: () => ipcRenderer.invoke('app:get-version'),
    checkForUpdates: () => ipcRenderer.invoke('app:check-updates'),
    quitAndInstall: () => ipcRenderer.invoke('app:quit-and-install'),
    showItemInFolder: (path: string) => ipcRenderer.invoke('app:show-item-in-folder', path),
    openExternal: (url: string) => ipcRenderer.invoke('app:open-external', url),
    onUpdateAvailable: (callback: () => void) => {
      ipcRenderer.on('update-available', callback)
      return () => ipcRenderer.removeListener('update-available', callback)
    },
    onUpdateDownloaded: (callback: () => void) => {
      ipcRenderer.on('update-downloaded', callback)
      return () => ipcRenderer.removeListener('update-downloaded', callback)
    }
  },

  dialog: {
    showMessageBox: (options: any) => ipcRenderer.invoke('dialog:show-message-box', options),
    showErrorBox: (title: string, content: string) => ipcRenderer.invoke('dialog:show-error-box', title, content)
  },

  store: {
    get: (key: string) => ipcRenderer.invoke('store:get', key),
    set: (key: string, value: any) => ipcRenderer.invoke('store:set', key, value),
    delete: (key: string) => ipcRenderer.invoke('store:delete', key),
    clear: () => ipcRenderer.invoke('store:clear')
  }
}

contextBridge.exposeInMainWorld('electronAPI', electronAPI)

export type ElectronAPI = typeof electronAPI
