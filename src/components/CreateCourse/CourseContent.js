import { useState, useCallback } from 'react'
import { useDropzone } from 'react-dropzone'
const CourseContent = ({
    // eslint-disable-next-line no-unused-vars
    disabled = false,
    // eslint-disable-next-line no-unused-vars
    className,
    onFileUpload,
    // eslint-disable-next-line no-unused-vars
    ...props
}) => {
    const [file, setFile] = useState('')

    const onDrop = useCallback(acceptedFiles => {
        // Do something with the uploaded file
        const acceptedFile = acceptedFiles[0]

        if (acceptedFile.type !== 'application/zip') {
            alert('Only .zip files are allowed.')
            return
        }

        setFile(acceptedFile)
        onFileUpload({ content: acceptedFile })
    }, [])

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop,
        accept: 'application/zip',
    })

    return (
        <div
            {...getRootProps()}
            className={`border-2 rounded-md p-4 ${
                isDragActive ? 'bg-gray-200' : 'bg-white'
            }`}>
            <label htmlFor="course-file" className="block mb-2 text-gray-900">
                Course Content (Zip File)
            </label>
            <input {...getInputProps()} />
            {file ? (
                <div className="flex flex-col justify-between">
                    <p>File name: {file.name}</p>
                    <p>File size: {file.size} bytes</p>
                </div>
            ) : (
                <p>
                    Drag and drop a .zip file or click to select a file. Only
                    .zip files are allowed.
                </p>
            )}
        </div>
    )
}

export default CourseContent
