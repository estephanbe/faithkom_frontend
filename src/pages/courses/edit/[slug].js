import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import Button from '@/components/Button'
import Head from 'next/head'
import CourseHeaderImage from '@/components/CreateCourse/CourseHeaderImage'
import BasicInfo from '@/components/CreateCourse/BasicInfo'
import CourseContent from '@/components/CreateCourse/CourseContent'
import CourseImage from '@/components/CreateCourse/CourseImage'
import CourseIcon from '@/components/CreateCourse/CourseIcon'
import CourseEditor from '@/components/CreateCourse/CourseEditor'
import AppLayout from '@/components/Layouts/AppLayout'
import LaravelAxios from '@/lib/axios'
import axios from 'axios'
import Categories from "@/components/CreateCourse/Categories";

const EditCoursePage = () => {
    const router = useRouter()
    const { slug } = router.query
    const [course, setCourse] = useState(null)

    const [data, setData] = useState({
        title: '',
        short_desc: '',
        meta_keys: '',
        color: '',
        cat_id: '',
        intro: '',
        image: '',
        header_background_image: '',
        icon: '',
        full_desc: '',
        content: '',
    })

    const [isHeaderFixed, setIsHeaderFixed] = useState(false)

    useEffect(() => {
        const fetchCourse = async () => {
            try {
                const response = await LaravelAxios.get(`/api/courses/${slug}`)

                if (response) {
                    setCourse(response.data.course)
                    setData(response.data.course)
                }
            } catch (error) {
                /* empty */
            }
        }

        if (slug) {
            fetchCourse()
        }
    }, [slug])

    useEffect(() => {
        const handleScroll = () => {
            setIsHeaderFixed(window.scrollY > 0)
        }

        window.addEventListener('scroll', handleScroll)

        return () => {
            window.removeEventListener('scroll', handleScroll)
        }
    }, [])

    const handleChildData = childData => {
        setData(prevData => ({ ...prevData, ...childData }))
    }

    const getExtensionFromMimeType = (mimeType, fileName) => {
        if (mimeType == undefined) {
            return null
        }
        const parts = mimeType.split('/')
        if (parts.length === 2) {
            return fileName + '.' + parts[1].split('+')[0]
        }
        return ''
    }

    const SubmitCourse = async () => {
        let course_response = null
        const formData = new FormData()
        let image = getExtensionFromMimeType(data.image?.type, 'image')
        let header_background_image = getExtensionFromMimeType(
            data.header_background_image?.type,
            'header_background_image',
        )
        let icon = getExtensionFromMimeType(data.icon?.type, 'icon')

        formData.append('_method', 'put')
        formData.append('title', data.title)
        formData.append('short_desc', data.short_desc)
        formData.append('meta_keys', data.meta_keys)
        formData.append('color', data.color)
        formData.append('intro', data.intro)
        formData.append('full_desc', data.full_desc)
        formData.append('cat_id', data.cat_id)

        if (image == null) {
            // that means the image wasn't updated as it is not a file object
            image = data.image
        }

        if (header_background_image == null) {
            header_background_image = data.header_background_image
        }

        if (icon == null) {
            icon = data.icon
        }

        formData.append('image', image)
        formData.append('header_background_image', header_background_image)
        formData.append('icon', icon)

        try {
            course_response = await LaravelAxios.post(
                '/api/courses/' + course.id,
                formData,
                {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                },
            )
        } catch (error) {
            return
        }

        const formFiles = new FormData()

        formFiles.append(
            'created_course',
            JSON.stringify(course_response.data.course),
        )
        formFiles.append('image', data.image)
        formFiles.append(
            'header_background_image',
            data.header_background_image,
        )
        formFiles.append('icon', data.icon)
        formFiles.append('content', data.content)

        try {
            course_response = await axios.post('/api/extract-zip', formFiles, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            })
            if (course_response.status == 200) {
                router.reload()
            }
        } catch (error) {
            return
        }
    }

    if (!course) {
        return <div>Loading...</div>
    }

    return (
        <AppLayout
            header={
                <div
                    className={`${
                        isHeaderFixed
                            ? 'fk-sticky-header bg-white shadow mx-auto py-6 px-4 sm:px-6 lg:px-72'
                            : ''
                    }`}>
                    <div className="flex justify-between items-center">
                        <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                            Create Course
                        </h2>
                        <div>
                            <Button
                                type="button"
                                className="mr-2"
                                variant="red"
                                onClick={() => router.push('/dashboard')}>
                                Cancel
                            </Button>
                            <Button
                                type="button"
                                variant="green"
                                onClick={SubmitCourse}>
                                Update
                            </Button>
                        </div>
                    </div>
                </div>
            }>
            <Head>
                <title>Faithkom - Create Course</title>
            </Head>

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-auto shadow-sm sm:rounded-lg">
                        <div
                            className="bg-yellow-100 border border-yellow-400 text-yellow-700 px-4 py-3 rounded relative m-6"
                            role="alert">
                            <strong className="font-bold mr-3">Alert!</strong>
                            <span className="block sm:inline">
                                If you uploaded new course .zip file or any
                                image, it will be overridden automatically after
                                you save.
                            </span>
                        </div>

                        <div className="p-6 bg-white grid grid-cols-2 gap-3">
                            <div className="mb-4 col-span-2">
                                <CourseHeaderImage
                                    currentData={course}
                                    onImageUpload={handleChildData}
                                />
                            </div>
                            <div className="">
                                <Categories
                                    onData={handleChildData}
                                    CurrentCat={course.cat_id}
                                />
                                <BasicInfo
                                    currentData={course}
                                    onData={handleChildData}
                                />
                                <CourseContent
                                    currentData={course}
                                    onFileUpload={handleChildData}
                                />
                            </div>
                            <div>
                                <div>
                                    <CourseImage
                                        currentData={course}
                                        onImageUpload={handleChildData}
                                    />
                                </div>
                                <div className="mt-5">
                                    <CourseIcon
                                        currentData={course}
                                        onImageUpload={handleChildData}
                                    />
                                </div>
                            </div>
                            <div className="mb-4 col-span-2">
                                <CourseEditor
                                    currentData={course}
                                    onData={handleChildData}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AppLayout>
    )
}

export default EditCoursePage
