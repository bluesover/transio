import { Menu, BrowserWindow, shell, app } from 'electron'

const isMac = process.platform === 'darwin'

export function createApplicationMenu(mainWindow: BrowserWindow): Menu {
  const template: any[] = [
    ...(isMac ? [{
      label: app.name,
      submenu: [
        { role: 'about' },
        { type: 'separator' },
        {
          label: 'Check for Updates...',
          click: () => mainWindow.webContents.send('menu:check-updates')
        },
        { type: 'separator' },
        { role: 'services' },
        { type: 'separator' },
        { role: 'hide' },
        { role: 'hideOthers' },
        { role: 'unhide' },
        { type: 'separator' },
        { role: 'quit' }
      ]
    }] : []),
    {
      label: 'File',
      submenu: [
        {
          label: 'New Project',
          accelerator: 'CmdOrCtrl+N',
          click: () => mainWindow.webContents.send('menu:new-project')
        },
        {
          label: 'Open Project...',
          accelerator: 'CmdOrCtrl+O',
          click: () => mainWindow.webContents.send('menu:open-project')
        },
        {
          label: 'Open Recent',
          role: 'recentDocuments',
          submenu: [
            {
              label: 'Clear Recent',
              role: 'clearRecentDocuments'
            }
          ]
        },
        { type: 'separator' },
        {
          label: 'Save Project',
          accelerator: 'CmdOrCtrl+S',
          click: () => mainWindow.webContents.send('menu:save-project')
        },
        { type: 'separator' },
        {
          label: 'Import XML...',
          accelerator: 'CmdOrCtrl+Shift+I',
          click: () => mainWindow.webContents.send('menu:import-xml')
        },
        {
          label: 'Import XSLT...',
          accelerator: 'CmdOrCtrl+Shift+O',
          click: () => mainWindow.webContents.send('menu:import-xslt')
        },
        { type: 'separator' },
        {
          label: 'Export Project...',
          click: () => mainWindow.webContents.send('menu:export-project')
        },
        {
          label: 'Export Output...',
          accelerator: 'CmdOrCtrl+Shift+E',
          click: () => mainWindow.webContents.send('menu:export-output')
        },
        { type: 'separator' },
        ...(isMac ? [] : [{ role: 'quit' }])
      ]
    },
    {
      label: 'Edit',
      submenu: [
        { role: 'undo' },
        { role: 'redo' },
        { type: 'separator' },
        { role: 'cut' },
        { role: 'copy' },
        { role: 'paste' },
        { role: 'selectAll' },
        { type: 'separator' },
        {
          label: 'Find...',
          accelerator: 'CmdOrCtrl+F',
          click: () => mainWindow.webContents.send('menu:find')
        },
        { type: 'separator' },
        {
          label: 'Format XML',
          accelerator: 'CmdOrCtrl+Shift+F',
          click: () => mainWindow.webContents.send('menu:format-xml')
        },
        {
          label: 'Format XSLT',
          accelerator: 'CmdOrCtrl+Shift+G',
          click: () => mainWindow.webContents.send('menu:format-xslt')
        },
        {
          label: 'Format Output',
          accelerator: 'CmdOrCtrl+Shift+H',
          click: () => mainWindow.webContents.send('menu:format-output')
        }
      ]
    },
    {
      label: 'Transform',
      submenu: [
        {
          label: 'Execute Transform',
          accelerator: 'CmdOrCtrl+Enter',
          click: () => mainWindow.webContents.send('menu:transform')
        },
        { type: 'separator' },
        {
          label: 'Set XSLT Version',
          submenu: [
            {
              label: 'XSLT 1.0',
              type: 'radio',
              click: () => mainWindow.webContents.send('menu:set-xslt-version', '1.0')
            },
            {
              label: 'XSLT 2.0',
              type: 'radio',
              click: () => mainWindow.webContents.send('menu:set-xslt-version', '2.0')
            },
            {
              label: 'XSLT 3.0',
              type: 'radio',
              click: () => mainWindow.webContents.send('menu:set-xslt-version', '3.0')
            }
          ]
        },
        { type: 'separator' },
        {
          label: 'Clear Output',
          click: () => mainWindow.webContents.send('menu:clear-output')
        }
      ]
    },
    {
      label: 'View',
      submenu: [
        {
          label: 'Toggle Version Panel',
          accelerator: 'CmdOrCtrl+B',
          click: () => mainWindow.webContents.send('menu:toggle-version-panel')
        },
        {
          label: 'Toggle Activity Log',
          accelerator: 'CmdOrCtrl+L',
          click: () => mainWindow.webContents.send('menu:toggle-activity-log')
        },
        { type: 'separator' },
        {
          label: 'Snippets',
          accelerator: 'CmdOrCtrl+K',
          click: () => mainWindow.webContents.send('menu:open-snippets')
        },
        { type: 'separator' },
        { role: 'reload' },
        { role: 'forceReload' },
        { role: 'toggleDevTools' },
        { type: 'separator' },
        { role: 'resetZoom' },
        { role: 'zoomIn' },
        { role: 'zoomOut' },
        { type: 'separator' },
        { role: 'togglefullscreen' }
      ]
    },
    {
      label: 'Window',
      submenu: [
        { role: 'minimize' },
        { role: 'zoom' },
        ...(isMac ? [
          { type: 'separator' },
          { role: 'front' },
          { type: 'separator' },
          { role: 'window' }
        ] : [
          { role: 'close' }
        ])
      ]
    },
    {
      label: 'Help',
      submenu: [
        {
          label: 'Documentation',
          click: () => shell.openExternal('https://transio.org/docs')
        },
        {
          label: 'Keyboard Shortcuts',
          accelerator: 'CmdOrCtrl+?',
          click: () => mainWindow.webContents.send('menu:keyboard-shortcuts')
        },
        { type: 'separator' },
        {
          label: 'Report Issue',
          click: () => shell.openExternal('https://github.com/bluesover/transio.org/issues')
        },
        {
          label: 'GitHub Repository',
          click: () => shell.openExternal('https://github.com/bluesover/transio.org')
        },
        { type: 'separator' },
        ...(!isMac ? [
          {
            label: 'Check for Updates...',
            click: () => mainWindow.webContents.send('menu:check-updates')
          },
          { type: 'separator' },
          {
            label: `About ${app.name}`,
            click: () => mainWindow.webContents.send('menu:about')
          }
        ] : [])
      ]
    }
  ]

  return Menu.buildFromTemplate(template)
}
