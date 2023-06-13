import AppLayout from '@/components/Layouts/AppLayout'
import Head from 'next/head'
import Button from '@/components/Button'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import BasicInfo from '@/components/CreateCourse/BasicInfo'
import CourseContent from '@/components/CreateCourse/CourseContent'
import CourseImage from '@/components/CreateCourse/CourseImage'
import CourseEditor from '@/components/CreateCourse/CourseEditor'
import CourseHeaderImage from '@/components/CreateCourse/CourseHeaderImage'
import axios from 'axios'
import LaravelAxios from 'lib/axios'
// import { useAuth } from '@/hooks/auth'
import CourseIcon from '@/components/CreateCourse/CourseIcon'
import Categories from '@/components/CreateCourse/Categories'

const CreateCourse = () => {
    // const { user } = useAuth({ middleware: 'auth' })
    const router = useRouter()

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
            return ''
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
        formData.append('title', data.title)
        formData.append('short_desc', data.short_desc)
        formData.append('meta_keys', data.meta_keys)
        formData.append('color', data.color)
        formData.append('intro', data.intro)
        formData.append('full_desc', data.full_desc)
        formData.append('cat_id', data.cat_id)
        formData.append(
            'image',
            getExtensionFromMimeType(data.image?.type, 'image'),
        )
        formData.append(
            'header_background_image',
            getExtensionFromMimeType(
                data.header_background_image?.type,
                'header_background_image',
            ),
        )
        formData.append(
            'icon',
            getExtensionFromMimeType(data.icon?.type, 'icon'),
        )

        try {
            course_response = await LaravelAxios.post(
                '/api/courses',
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
                router.push('/dashboard')
            }
        } catch (error) {
            return
        }
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
                                Create
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
                        <div className="p-6 bg-white grid grid-cols-2 gap-3">
                            <div className="mb-4 col-span-2">
                                <CourseHeaderImage
                                    onImageUpload={handleChildData}
                                />
                            </div>
                            <div className="">
                                <Categories onData={handleChildData} />
                                <BasicInfo onData={handleChildData} />
                                <CourseContent onFileUpload={handleChildData} />
                            </div>
                            <div>
                                <div>
                                    <CourseImage
                                        onImageUpload={handleChildData}
                                    />
                                </div>
                                <div className="mt-5">
                                    <CourseIcon
                                        onImageUpload={handleChildData}
                                    />
                                </div>
                            </div>
                            <div className="mb-4 col-span-2">
                                <CourseEditor onData={handleChildData} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AppLayout>
    )
}

export default CreateCourse
