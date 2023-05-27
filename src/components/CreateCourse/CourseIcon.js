import { useState, useCallback, useEffect } from 'react'
import { useDropzone } from 'react-dropzone'

const CourseIcon = ({
    // eslint-disable-next-line no-unused-vars
    disabled = false,
    // eslint-disable-next-line no-unused-vars
    className,
    onImageUpload,
    currentData,
    // eslint-disable-next-line no-unused-vars
    ...props
}) => {
    const [image, setImage] = useState({
        icon: '',
    })

    useEffect(() => {
        if (currentData) {
            for (const key in currentData) {
                setImage(prevFormData => ({
                    ...prevFormData,
                    [key]:
                        '/courses/' +
                        currentData['slug'] +
                        '/' +
                        currentData['icon'],
                }))
            }
        }
    }, [])

    const onDrop = useCallback(acceptedFiles => {
        // Do something with the uploaded file
        const file = acceptedFiles[0]
        const reader = new FileReader()
        reader.onload = () => {
            // setImage(reader.result);
            setImage(prevFormData => ({
                ...prevFormData,
                ['icon']: reader.result,
            }))
            onImageUpload({ icon: file })
        }
        reader.readAsDataURL(file)
    }, [])

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop,
        accept: 'image/*',
    })

    return (
        <div
            {...getRootProps()}
            className={`border-2 rounded-md h-full p-4 ${
                isDragActive ? 'bg-gray-200' : 'bg-white'
            }`}>
            <label htmlFor="course-icon" className="block mb-2 text-gray-900">
                Course Icon
            </label>
            <input {...getInputProps()} />
            {image.icon ? (
                <div className="flex flex-col justify-between">
                    <img
                        className="max-h-100 mb-4"
                        src={image.icon}
                        alt="Uploaded Image"
                        width="100"
                        height="100"
                    />
                    <p>
                        You can replace the image by clicking on it or drag and
                        drop new image
                    </p>
                </div>
            ) : (
                <p>Drag and drop an image or click to select a file.</p>
            )}
        </div>
    )

    // return (
    //     <>
    //         <label htmlFor="course-image"
    //                className="block mb-2 text-gray-900">
    //             Course Image</label>
    //     </>
    // )
}

export default CourseIcon
