import { app, BrowserWindow, shell, Menu, ipcMain, dialog } from 'electron'
import { join, dirname } from 'path'
import { fileURLToPath } from 'url'
import { autoUpdater } from 'electron-updater'
import log from 'electron-log'
import Store from 'electron-store'
import { setupIpcHandlers } from './ipc-handlers'
import { createApplicationMenu } from './menu'
import { SaxonInstaller } from './saxon-installer'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const isDev = process.env.NODE_ENV === 'development'
const isMac = process.platform === 'darwin'

const store = new Store()
const saxonInstaller = new SaxonInstaller()

log.transports.file.level = 'info'
autoUpdater.logger = log

let mainWindow: BrowserWindow | null = null
let serverProcess: any = null

function createWindow() {
  const windowState = store.get('windowState', {
    width: 1400,
    height: 900,
    x: undefined,
    y: undefined,
    isMaximized: false
  }) as any

  mainWindow = new BrowserWindow({
    width: windowState.width,
    height: windowState.height,
    x: windowState.x,
    y: windowState.y,
    minWidth: 1024,
    minHeight: 768,
    show: false,
    backgroundColor: '#1a1a2e',
    title: 'Transio - XML/XSLT Transformer',
    icon: join(__dirname, '../desktop-resources/icons/icon.png'),
    webPreferences: {
      preload: join(__dirname, 'preload.js'),
      nodeIntegration: false,
      contextIsolation: true,
      sandbox: true,
      webSecurity: true
    }
  })

  if (windowState.isMaximized) {
    mainWindow.maximize()
  }

  mainWindow.once('ready-to-show', () => {
    mainWindow?.show()
  })

  mainWindow.on('close', () => {
    if (mainWindow) {
      const bounds = mainWindow.getBounds()
      store.set('windowState', {
        width: bounds.width,
        height: bounds.height,
        x: bounds.x,
        y: bounds.y,
        isMaximized: mainWindow.isMaximized()
      })
    }
  })

  mainWindow.webContents.setWindowOpenHandler(({ url }) => {
    shell.openExternal(url)
    return { action: 'deny' }
  })

  if (isDev) {
    mainWindow.loadURL('http://localhost:5173')
    mainWindow.webContents.openDevTools()
  } else {
    mainWindow.loadFile(join(__dirname, '../dist/index.html'))
  }

  const menu = createApplicationMenu(mainWindow)
  Menu.setApplicationMenu(menu)

  setupIpcHandlers(mainWindow, saxonInstaller)
}

app.whenReady().then(async () => {
  createWindow()

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow()
    }
  })

  if (!isDev) {
    autoUpdater.checkForUpdatesAndNotify()
  }

  log.info('Checking Saxon-HE installation...')
  const installed = await saxonInstaller.checkInstallation()
  
  if (!installed) {
    log.info('Saxon-HE not found. Will prompt for installation.')
  } else {
    log.info('Saxon-HE is installed. Starting server...')
    try {
      await saxonInstaller.startServer()
      log.info('Saxon-HE server started successfully')
    } catch (error) {
      log.error('Failed to start Saxon-HE server:', error)
    }
  }
})

app.on('window-all-closed', () => {
  if (!isMac) {
    app.quit()
  }
})

app.on('before-quit', async () => {
  log.info('App quitting, stopping Saxon-HE server...')
  await saxonInstaller.stopServer()
})

autoUpdater.on('update-available', () => {
  log.info('Update available')
  mainWindow?.webContents.send('update-available')
})

autoUpdater.on('update-downloaded', () => {
  log.info('Update downloaded')
  mainWindow?.webContents.send('update-downloaded')
})

ipcMain.handle('app:quit-and-install', () => {
  autoUpdater.quitAndInstall()
})

process.on('uncaughtException', (error) => {
  log.error('Uncaught exception:', error)
})

process.on('unhandledRejection', (error) => {
  log.error('Unhandled rejection:', error)
})
