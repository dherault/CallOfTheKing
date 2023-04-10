import { useCallback } from 'react'
import { ArrowUpTrayIcon, XMarkIcon } from '@heroicons/react/24/outline'
import { useDropzone } from 'react-dropzone'
import _ from 'clsx'

type ImageDropPropsType = {
  file: File | null
  setFile: (file: File | null) => void
  className?: string
}

function ImageDrop({ file, setFile, className }: ImageDropPropsType) {
  const onDrop = useCallback((acceptedFiles: File[]) => {
    setFile(acceptedFiles[0])
  }, [setFile])

  const onDiscardLogo = useCallback(() => {
    setFile(null)
  }, [setFile])

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    maxFiles: 1,
    maxSize: 1024 * 1024 * 10,
    accept: {
      'image/jpeg': ['.jpg', '.jpeg'],
      'image/png': ['.png'],
      'image/webp': ['.webp'],
      'image/tiff': ['.tiff'],
      'image/gif': ['.gif'],
    },
  })

  return (
    <>
      {!file && (
        <div className="flex items-center justify-center w-full">
          <label
            htmlFor="dropzone-file"
            className={_('flex flex-col items-center justify-center w-full h-32 text-gray-500 dark:text-gray-400 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600', {
              'border-green-300': isDragActive,
              [className ?? '']: !!className,
            })}
          >
            <div
              className="flex flex-col items-center justify-center pt-5 pb-6"
              {...getRootProps()}
            >
              <ArrowUpTrayIcon width={24} />
              <p className="my`-2 text-sm">
                <span className="font-semibold">Click to upload</span>
                {' '}
                or drag and drop
              </p>
              <p className="text-xs">PNG, JPG, WEBP, TIFF or GIF (max 10MB)</p>
            </div>
            <input
              id="dropzone-file"
              {...getInputProps()}
            />
          </label>
        </div>
      )}
      {!!file && (
        <div className="flex items-center justify-center relative">
          <div className="relative w-32">
            <img
              src={URL.createObjectURL(file)}
              className="w-full"
            />
            <div
              className="absolute inset-0 opacity-0 hover:opacity-100 flex items-center justify-center bg-gray-200 bg-opacity-50 cursor-pointer"
              onClick={onDiscardLogo}
            >
              <XMarkIcon
                width={24}
                className="text-gray-900"
              />
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default ImageDrop
