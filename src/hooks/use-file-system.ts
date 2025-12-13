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
    await Promise.all([
      saveFile(handle, `version_${version.id}_${sanitizedVersion}.xml`, version.xml),
      saveFile(handle, `version_${version.id}_${sanitizedVersion}.xslt`, version.xslt)
    ])
  }, [saveFile])

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

  return {
    folderHandle,
    folderName,
    selectFolder,
    saveCurrentFiles,
    saveVersionFiles,
    saveMetadata,
    loadProject
  }
}
