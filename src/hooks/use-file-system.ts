import { useState, useCallback } from 'react'
import type { TransformVersion } from '@/lib/types'

export function useFileSystem() {
  const [folderHandle, setFolderHandle] = useState<FileSystemDirectoryHandle | null>(null)
  const [folderName, setFolderName] = useState<string>('')

  const selectFolder = useCallback(async () => {
    if (!('showDirectoryPicker' in window)) {
      throw new Error('File System Access API is not supported in this browser. Please use Chrome, Edge, or another Chromium-based browser.')
    }

    try {
      const handle = await (window as Window).showDirectoryPicker({ mode: 'readwrite' })
      setFolderHandle(handle)
      setFolderName(handle.name)
      return handle
    } catch (error) {
      if ((error as Error).name !== 'AbortError') {
        throw error
      }
      return null
    }
  }, [])

  const saveFile = useCallback(async (
    handle: FileSystemDirectoryHandle,
    filename: string,
    content: string
  ) => {
    const fileHandle = await handle.getFileHandle(filename, { create: true })
    const writable = await fileHandle.createWritable()
    await writable.write(content)
    await writable.close()
  }, [])

  const readFile = useCallback(async (
    handle: FileSystemDirectoryHandle,
    filename: string
  ): Promise<string | null> => {
    try {
      const fileHandle = await handle.getFileHandle(filename)
      const file = await fileHandle.getFile()
      return await file.text()
    } catch {
      return null
    }
  }, [])

  const saveCurrentFiles = useCallback(async (
    handle: FileSystemDirectoryHandle,
    xml: string,
    xslt: string
  ) => {
    await Promise.all([
      saveFile(handle, 'current.xml', xml),
      saveFile(handle, 'current.xslt', xslt)
    ])
  }, [saveFile])

  const saveVersionFiles = useCallback(async (
    handle: FileSystemDirectoryHandle,
    version: TransformVersion
  ) => {
    const sanitizedVersion = version.version.replace(/[^a-z0-9.-]/gi, '_')
    const versionFolder = `versions`
    
    try {
      const versionDirHandle = await handle.getDirectoryHandle(versionFolder, { create: true })
      
      const versionXmlHandle = await versionDirHandle.getFileHandle(`v${sanitizedVersion}.xml`, { create: true })
      const versionXsltHandle = await versionDirHandle.getFileHandle(`v${sanitizedVersion}.xslt`, { create: true })
      
      const xmlWritable = await versionXmlHandle.createWritable()
      await xmlWritable.write(version.xml)
      await xmlWritable.close()
      
      const xsltWritable = await versionXsltHandle.createWritable()
      await xsltWritable.write(version.xslt)
      await xsltWritable.close()
    } catch (error) {
      console.error('Failed to save version files:', error)
      throw error
    }
  }, [])

  const saveMetadata = useCallback(async (
    handle: FileSystemDirectoryHandle,
    versions: TransformVersion[]
  ) => {
    await saveFile(handle, 'versions.json', JSON.stringify(versions, null, 2))
  }, [saveFile])

  const loadProject = useCallback(async (handle: FileSystemDirectoryHandle) => {
    const [xml, xslt, metadataStr] = await Promise.all([
      readFile(handle, 'current.xml'),
      readFile(handle, 'current.xslt'),
      readFile(handle, 'versions.json')
    ])

    let versions: TransformVersion[] = []
    if (metadataStr) {
      try {
        versions = JSON.parse(metadataStr)
      } catch {
        versions = []
      }
    }

    return { xml, xslt, versions }
  }, [readFile])

  const exportToCSV = useCallback(async (
    handle: FileSystemDirectoryHandle,
    versions: TransformVersion[]
  ) => {
    const headers = 'Version,Description,Created,XSLT_Version,Released,Release_Notes,XML_Lines,XSLT_Lines\n'
    const rows = versions.map(v => {
      const xmlLines = v.xml.split('\n').length
      const xsltLines = v.xslt.split('\n').length
      const created = new Date(v.createdAt).toISOString()
      const description = (v.description || '').replace(/"/g, '""').replace(/\n/g, ' ')
      const releaseNotes = (v.releaseNotes || '').replace(/"/g, '""').replace(/\n/g, ' ')
      return `"${v.version}","${description}","${created}","${v.xsltVersion}","${v.isReleased ? 'Yes' : 'No'}","${releaseNotes}",${xmlLines},${xsltLines}`
    }).join('\n')
    
    const csv = headers + rows
    await saveFile(handle, 'project-export.csv', csv)
  }, [saveFile])

  const generateLaunchers = useCallback(async (
    handle: FileSystemDirectoryHandle,
    appUrl: string = 'https://transio.org'
  ) => {
    const windowsBat = `@echo off
title Transio - XML/XSLT Transformer - Project: ${handle.name}
color 0A

echo ================================================
echo    Transio - XML/XSLT Transformer
echo    Project: ${handle.name}
echo ================================================
echo.
echo Starting application...
echo.

REM Open Transio at transio.org
start "" "${appUrl}"

echo.
echo Application opened in browser.
echo Your project data is in this folder.
echo.
echo Click the Folder button in the app to
echo select this folder and load your project.
echo.
pause
`

    const macLinuxSh = `#!/bin/bash

clear

echo "================================================"
echo "   Transio - XML/XSLT Transformer"
echo "   Project: ${handle.name}"
echo "================================================"
echo ""
echo "Starting application..."
echo ""

# Open Transio at transio.org
if [[ "$OSTYPE" == "darwin"* ]]; then
    open "${appUrl}"
else
    xdg-open "${appUrl}" 2>/dev/null || 
    firefox "${appUrl}" 2>/dev/null ||
    google-chrome "${appUrl}" 2>/dev/null
fi

echo ""
echo "Application opened in browser."
echo "Your project data is in this folder."
echo ""
echo "Click the Folder button in the app to"
echo "select this folder and load your project."
echo ""
echo "Press any key to close..."
read -n 1 -s
`

    await Promise.all([
      saveFile(handle, 'launch-project.bat', windowsBat),
      saveFile(handle, 'launch-project.sh', macLinuxSh)
    ])
  }, [saveFile])

  return {
    folderHandle,
    folderName,
    selectFolder,
    saveCurrentFiles,
    saveVersionFiles,
    saveMetadata,
    loadProject,
    exportToCSV,
    generateLaunchers
  }
}
