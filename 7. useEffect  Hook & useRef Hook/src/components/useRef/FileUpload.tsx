import { useRef, useState } from 'react'

function FileUpload() {
    // File Upload with Preview
    const fileInputRef = useRef<HTMLInputElement>(null)
    const [selectedFile, setSelectedFile] = useState<File | null>(null)
    const [preview, setPreview] = useState<string>('')

    const handleFileSelect = () => {
        fileInputRef.current?.click() // Programmatically trigger the hidden file input
    }

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]
        if (file) {
            setSelectedFile(file)
            const reader = new FileReader()
            reader.onload = (e) => {
                setPreview(e.target?.result as string)
            }
            reader.readAsDataURL(file)
        }
    }

    const clearFile = () => {
        setSelectedFile(null)
        setPreview('')
        if (fileInputRef.current) {
            fileInputRef.current.value = ''
        }
    }

    return (
        <div className="min-h-screen bg-gray-100 p-6">
            <div className="max-w-4xl mx-auto">
                <h1 className="text-4xl font-bold text-center text-gray-800 mb-8">
                    File Upload with useRef
                </h1>
                    <div className="space-y-4">
                        <input
                            ref={fileInputRef}
                            type="file"
                            accept="image/*"
                            onChange={handleFileChange}
                            className="hidden"
                        />

                        <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                            {preview ? (
                                <div className="space-y-2">
                                    <img src={preview} alt="Preview" className="mx-auto max-h-32 rounded" />
                                    <p className="text-sm text-gray-600">{selectedFile?.name}</p>
                                </div>
                            ) : (
                                <div className="space-y-2">
                                    <div className="text-4xl">📁</div>
                                    <p className="text-gray-600">Click to select an image</p>
                                </div>
                            )}
                        </div>

                        <div className="flex gap-2">
                            <button
                                onClick={handleFileSelect}
                                className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
                            >
                                Select File
                            </button>
                            {selectedFile && (
                                <button
                                    onClick={clearFile}
                                    className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
                                >
                                    Clear File
                                </button>
                            )}
                        </div>
                    </div>
                    <div className="mt-4 p-3 bg-indigo-50 rounded-lg text-sm">
                        <strong>Use Case:</strong> Trigger hidden file input and control file selection programmatically
                    </div>
            </div>
        </div>
    )
}

export default FileUpload
