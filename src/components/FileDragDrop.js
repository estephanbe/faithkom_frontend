import { useState } from 'react'

const FileDragDrop = () => {
    const [files, setFiles] = useState([])

    const handleDrop = e => {
        e.preventDefault()
        const droppedFiles = [...e.dataTransfer.files]
        setFiles(droppedFiles)
    }

    const handleImageDrop = e => {
        e.preventDefault()
        const imageFile = e.dataTransfer.files[0]
        const reader = new FileReader()
        // reader.onload = event => {
        //     // const imageUrl = event.target.result
        //     // Do something with the image URL
        // }
        reader.readAsDataURL(imageFile)
    }

    return (
        <div>
            <div
                className="w-full h-40 border-2 border-dashed border-gray-400"
                onDrop={handleImageDrop}
                onDragOver={e => e.preventDefault()}>
                Drop your image file here
            </div>
            <div
                className="w-full h-40 border-2 border-dashed border-gray-400"
                onDrop={handleDrop}
                onDragOver={e => e.preventDefault()}>
                Drop your file here
            </div>
            {files.map(file => (
                <div key={file.name}>
                    <p>{file.name}</p>
                    <p>{file.type}</p>
                    <p>{file.size}</p>
                </div>
            ))}
        </div>
    )
}

export default FileDragDrop
