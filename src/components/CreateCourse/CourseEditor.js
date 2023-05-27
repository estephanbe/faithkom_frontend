import { useEffect, useState } from 'react'
import 'react-quill/dist/quill.snow.css'
import dynamic from 'next/dynamic'

const ReactQuill = dynamic(() => import('react-quill'), { ssr: false })

const CourseEditor = ({
    // eslint-disable-next-line no-unused-vars
    disabled = false,
    // eslint-disable-next-line no-unused-vars
    className,
    onData,
    currentData,
    // eslint-disable-next-line no-unused-vars
    ...props
}) => {
    const [content, setContent] = useState({
        full_desc: '',
    })

    useEffect(() => {
        if (currentData) {
            for (const key in currentData) {
                setContent(prevFormData => ({
                    ...prevFormData,
                    [key]: currentData[key],
                }))
            }
        }
    }, [])

    const handleInputChange = value => {
        setContent(prevFormData => ({ ...prevFormData, ['full_desc']: value }))
        onData(content)
    }

    const modules = {
        toolbar: {
            container: [
                [{ align: [] }],
                ['bold', 'italic', 'underline', 'strike'],
                [{ list: 'ordered' }, { list: 'bullet' }],
                // [{ indent: '-1' }, { indent: '+1' }],
                // ['link', 'image'],
                // ['link'],
                // ['clean'],
                // [{ header: [2, 3, 4, 5, 6, false] }], // Add the header dropdown
            ],
        },
    }

    return (
        <>
            <label
                htmlFor="course-long-description"
                className="block mb-2 text-gray-900">
                Full Description
            </label>
            {/*<textarea id="course-long-description" rows="4"*/}
            {/*          className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 "*/}
            {/*          placeholder="The course intro text after the descriptive icons"></textarea>*/}
            <div className='h-64 overflow-auto mb-5"'>
                <ReactQuill
                    value={content.full_desc}
                    onChange={handleInputChange}
                    modules={modules}
                />
            </div>
        </>
    )
}

export default CourseEditor
