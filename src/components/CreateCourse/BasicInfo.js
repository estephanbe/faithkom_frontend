import LabelLarge from '@/components/LabelLarge'
import Input from '@/components/Input'
import { useEffect, useState } from 'react'

const BasicInfo = ({
    // eslint-disable-next-line no-unused-vars
    disabled = false,
    // eslint-disable-next-line no-unused-vars
    className,
    onData,
    currentData,
    // eslint-disable-next-line no-unused-vars
    ...props
}) => {
    const [formData, setFormData] = useState({
        title: '',
        short_desc: '',
        intro: '',
        meta_keys: '',
        color: '',
    })

    useEffect(() => {
        if (currentData) {
            for (const key in currentData) {
                setFormData(prevFormData => ({
                    ...prevFormData,
                    [key]: currentData[key],
                }))
            }
        }
    }, [])

    const handleInputChange = e => {
        const { name, value } = e.target
        setFormData(prevFormData => ({ ...prevFormData, [name]: value }))
        onData(formData)
    }

    return (
        <>
            <div className="mb-4">
                <LabelLarge htmlFor="course-title" className="pb-2">
                    Course Title
                </LabelLarge>
                <Input
                    id="course-title"
                    className="w-full border p-1"
                    type="text"
                    name="title"
                    value={formData.title}
                    onChange={handleInputChange}
                />
            </div>
            <div className="mb-4">
                <LabelLarge htmlFor="course-meta" className="pb-2">
                    Meta Keys
                </LabelLarge>
                <Input
                    id="course-meta"
                    className="w-full border p-1"
                    type="text"
                    name="meta_keys"
                    value={formData.meta_keys}
                    onChange={handleInputChange}
                />
            </div>
            <div className="mb-4">
                <LabelLarge htmlFor="course-color" className="pb-2">
                    Course Color
                </LabelLarge>
                <Input
                    id="course-color"
                    className="h-20 w-20 border p-1"
                    type="color"
                    name="color"
                    value={formData.color}
                    onChange={handleInputChange}
                />
            </div>
            <div className="mb-4">
                <label
                    htmlFor="course-description"
                    className="block mb-2 text-gray-900">
                    Course Short Description
                </label>
                <textarea
                    id="course-description"
                    rows="4"
                    name="short_desc"
                    value={formData.short_desc}
                    onChange={handleInputChange}
                    className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 "
                    placeholder="The course short description"
                />
            </div>
            <div className="mb-4">
                <label
                    htmlFor="course-intro-text"
                    className="block mb-2 text-gray-900">
                    Intro Text
                </label>
                <textarea
                    id="course-intro-text"
                    rows="4"
                    name="intro"
                    value={formData.intro}
                    onChange={handleInputChange}
                    className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 "
                    placeholder="The course intro text after the descriptive icons"
                />
            </div>
        </>
    )
}

export default BasicInfo
