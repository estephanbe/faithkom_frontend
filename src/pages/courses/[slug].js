import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import axios from '@/lib/axios'
import HomeLayout from '@/components/Layouts/HomeLayout'
import { NextSeo } from 'next-seo'

const CoursePage = () => {
    const router = useRouter()
    const { slug } = router.query
    const [course, setCourse] = useState(null)
    const [html, setHTML] = useState(null)
    const [settings, setSettings] = useState({
        website_title: null,
        website_sub_title: null,
        website_intro: null,
        whatsapp_number: null,
        footer_text: null,
        tracking_scripts: null,
        beit_el_eman_url: null,
    })

    useEffect(() => {
        const fetchSettings = async () => {
            try {
                const response = await axios.get('/api/settings')
                response.data.settings.map(item => {
                    setSettings(prevSettings => ({
                        ...prevSettings,
                        [item.key]: item.value,
                    }))
                })
            } catch (error) {
                /* empty */
            }
        }
        fetchSettings()
    }, [])

    useEffect(() => {
        const fetchCourse = async () => {
            try {
                const response = await axios.get(`/api/courses/${slug}`)
                setCourse(response.data.course)
                setHTML(
                    response.data.course.full_desc.replace(
                        /<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi,
                        '',
                    ),
                )
            } catch (error) {
                /* empty */
            }
        }

        if (slug) {
            fetchCourse()
        }
    }, [slug])

    if (!course) {
        return <div>Loading...</div>
    }

    return (
        <HomeLayout settings={settings}>
            <NextSeo
                title={course.title + ' - Faithkom'}
                description={course.description}
                canonical={`${router.basePath}/courses/${course.slug}`}
                openGraph={{
                    title: course.title,
                    description: course.description,
                    images: [
                        {
                            url:
                                router.basePath +
                                '/assets/Faithkom-logo-transparant.svg',
                            alt: course.title,
                        },
                    ],
                    type: 'article',
                }}
                // twitter={{
                //     handle: '@yourtwitterhandle',
                //     site: '@yoursite',
                //     cardType: 'summary',
                // }}
                additionalMetaTags={[
                    {
                        name: 'keywords',
                        content: course.meta_keys,
                    },
                    {
                        name: 'author',
                        content: 'Faithkom',
                    },
                ]}
            />
            <div
                id="faithkom-course-hero"
                className="relative flex justify-center items-center mt-36 md:mt-28"
                style={{
                    backgroundImage:
                        'url(../courses/' +
                        course.slug +
                        '/' +
                        course.header_background_image +
                        ')',
                    backgroundSize: 'cover',
                    backgroundPosition: 'left',
                    height: '70vh',
                }}>
                <div
                    className="w-screen z-0 h-full absolute left-0 top-0"
                    style={{
                        backgroundColor: course.color,
                        opacity: 0.8,
                    }}
                />
                <div className="z-10 relative bg-white-700 flex justify-center md:justify-start items-center h-full w-full lg:px-20 container">
                    <div className="md:text-right text-center md:w-3/6 w-full text-white">
                        <h1 className="md:text-8xl text-6xl mb-12 font-bold">
                            {course.title}
                        </h1>
                        <p className="md:text-2xl text-xl mb-5 leading-relaxed font-bold">
                            {course.intro}
                        </p>
                        <button
                            onClick={() =>
                                router.push('/courses/show/' + course.slug)
                            }
                            className="bg-gray-700 hover:bg-gray-600 text-white font-semibold py-3 px-6 rounded-lg">
                            الدخول إلى الدورة
                        </button>
                    </div>
                    <img
                        src={'../courses/' + course.slug + '/' + course.image}
                        className="rounded-circle absolute bottom-0 left-0 hidden md:block"
                        style={{ width: '35rem', height: '37rem' }}
                    />
                </div>
            </div>

            <div className="flex justify-center mt-20">
                <div className="w-2/3">
                    <div className="w-full flex justify-center items-center md:gap-10 gap-3">
                        <div
                            style={{ backgroundColor: course.color }}
                            className="md:w-32 w-36 md:h-32 h-26 md:p-6 p-4 md:pt-8 pt-5 rounded-full">
                            <svg
                                fill="#fff"
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 73.83 56.69">
                                <g id="Draw_layer">
                                    <path d="m72.72,0h-32.94c-1.13,0-2.14.48-2.87,1.23-.72-.76-1.74-1.23-2.87-1.23H1.11C.5,0,0,.5,0,1.11v54.47c0,.61.5,1.11,1.11,1.11h32.94c1.13,0,2.14-.48,2.87-1.23.72.76,1.74,1.23,2.87,1.23h32.94c.61,0,1.11-.5,1.11-1.11V1.11c0-.61-.5-1.11-1.11-1.11Zm-26.2,38.55c.21-.16.41-.33.6-.5.27-.23.53-.48.78-.73.16-.16.31-.32.46-.48.12-.13.26-.25.37-.39l8.28,8.28-2.47,2.47-8.37-8.37c.12-.09.22-.19.33-.28Zm1.13-4.32c-.08.11-.17.21-.25.31-.24.31-.49.61-.76.89-.08.09-.17.17-.25.26-.26.26-.52.51-.79.74-.12.1-.24.2-.36.3-.23.19-.47.36-.72.53-.17.12-.34.24-.52.36-1.79,1.12-3.82,1.8-5.97,1.98V12.98c6.85.57,12.26,6.32,12.26,13.32,0,2.89-.91,5.63-2.63,7.94Zm-11.85,5.38c-6.85-.57-12.26-6.32-12.26-13.32,0-3.71,1.57-7.29,4.3-9.82,2.2-2.04,5-3.26,7.97-3.5v26.64Zm-1.76,14.86H2.22V2.22h31.82c.97,0,1.76.79,1.76,1.75v6.77c-3.53.25-6.86,1.67-9.48,4.09-3.18,2.95-5.01,7.12-5.01,11.45,0,8.23,6.4,14.97,14.49,15.54v10.88c0,.97-.79,1.75-1.76,1.75Zm37.56,0h-31.82c-.97,0-1.76-.79-1.76-1.75v-10.89c2.21-.16,4.32-.76,6.23-1.78l9.52,9.52c.22.22.5.33.79.33s.57-.11.79-.33l4.04-4.04c.43-.43.43-1.14,0-1.57l-9.31-9.31c1.59-2.49,2.43-5.35,2.43-8.34,0-8.22-6.4-14.96-14.48-15.54V3.98c0-.97.79-1.75,1.76-1.75h31.82v52.24Z" />
                                </g>
                            </svg>
                        </div>

                        <div
                            style={{ backgroundColor: course.color }}
                            className="md:w-32 w-36 md:h-32 h-26 md:p-6 p-4 md:pt-8 pt-5 rounded-full">
                            <svg
                                fill="#fff"
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 82.85 68.03">
                                <g>
                                    <path d="m82.35,34.99l-4.73-6.38c-.37-.5-.64-1.08-.78-1.71C73.08,9.87,67.61,0,50.83,0c-6.73-.05-13.77,2.13-18.77,6.79-16.8-.02-22.31,9.86-26.06,26.91-.14.62-.4,1.2-.77,1.7L.49,41.79c-.92,1.19-.51,3.07.83,3.76,0,0,4.65,2.54,4.65,2.54l1.43,8.64c.42,2.6,2.47,4.57,5.06,4.92l7.47,1.01c.91.12,1.64.81,1.82,1.7l.76,3.68h2.26l-.84-4.12c-.37-1.82-1.86-3.21-3.7-3.46l-7.47-1.01c-1.64-.22-2.9-1.46-3.17-3.07l-1.6-9.72-5.6-3.05c-.12-.06-.15-.16-.17-.22-.01-.05-.02-.16.06-.26l4.73-6.39c.56-.74.95-1.63,1.16-2.55,3.93-17.8,9.55-24.47,21.77-25.1h0c-2.89,3.62-4.69,8.37-4.69,14.31,0,8.72,3.41,13.4,7.21,17.81,2.75,3.19,4.08,7.28,3.66,11.15-.15.85-3.9,13.17-4.61,15.69h2.31c.3-1.03,4.3-13.99,4.5-15.4.5-4.54-1.02-9.24-4.17-12.9-3.65-4.23-6.67-8.39-6.67-16.35,0-6.19,2.09-10.94,5.38-14.36h0c11.31.22,22.52,6.79,22.52,21.15,0,7.97-3.02,12.13-6.67,16.36-3.14,3.66-4.67,8.36-4.17,12.88.04.42.58,2.82,1.9,8.54l.02.07h2.28c-.46-2.02-1.88-8.07-2-8.85-.42-3.92.91-8,3.66-11.2,3.8-4.41,7.21-9.09,7.21-17.81,0-14.76-11.1-22.14-22.37-23.23,4.34-3.25,10.01-4.76,15.63-4.72,13.64,0,19.68,6.39,23.83,25.16.2.92.6,1.8,1.15,2.55l4.73,6.38c.08.11.07.21.06.27-.01.05-.05.15-.16.21l-5.61,3.06-1.6,9.71c-.26,1.63-1.54,2.86-3.17,3.08l-7.46,1.01c-1.85.24-3.33,1.63-3.71,3.46l-2.23,10.91h2.27l2.14-10.47c.18-.9.91-1.59,1.82-1.71l7.47-1c2.6-.35,4.64-2.33,5.06-4.92l1.43-8.65,4.65-2.53c1.34-.71,1.75-2.57.83-3.77Z" />
                                    <path d="m49.82,22.01c-1.95-2.03-5.45-1.99-7.39.04,0,0-1.08,1.09-1.08,1.09l-.97-.97c-3.09-3.23-8.64-1.29-9,3.07-.15,1.57.39,3.1,1.51,4.21l7.59,7.59.59,1.17,8.76-8.82c2.04-2.05,2.03-5.37,0-7.39Zm-1.58,5.82l-6.89,6.95-6.9-6.9c-1.86-1.73-.51-5.19,2.06-5.11.82,0,1.66.33,2.29.98l2.55,2.55,2.66-2.68c2.86-2.76,6.97,1.32,4.23,4.21Z" />
                                </g>
                            </svg>
                        </div>

                        <div
                            style={{ backgroundColor: course.color }}
                            className="md:w-32 w-36 md:h-32 h-26 md:p-6 p-4 md:pt-8 pt-5 rounded-full">
                            <svg
                                fill="#fff"
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 70.87 64.61">
                                <g>
                                    <path d="m68.76,12.48h-32.1L22.05.53c-.72-.58-1.73-.7-2.59-.29-.75.35-1.21,1.05-1.21,1.82v10.41s-16.15,0-16.15,0c-1.16,0-2.1.94-2.1,2.1v35.45c0,1.16.94,2.1,2.1,2.1h16.15v10.41c0,.77.46,1.47,1.21,1.82.84.4,1.87.3,2.59-.29l14.61-11.94h32.1c1.16,0,2.1-.94,2.1-2.1V14.58c0-1.16-.94-2.1-2.1-2.1ZM20.45,2.21c.07-.02.16-.02.21.02l12.52,10.24h-12.73V2.21Zm15.42,12.46l21.56,17.63-21.56,17.63h-15.42V14.68s15.42,0,15.42,0ZM2.2,49.93V14.68h16.05v35.25s-16.05,0-16.05,0Zm18.46,12.44s-.14.04-.21.03v-10.26s12.73,0,12.73,0l-12.52,10.24Zm48.01-12.44h-29.31l19.69-16.1c.47-.39.75-.95.75-1.53,0-.58-.27-1.14-.75-1.53l-19.69-16.1h29.31v35.25Z" />
                                </g>
                            </svg>
                        </div>
                    </div>

                    <p className="mt-10 md:text-3xl text-xl text-center leading-relaxed">
                        {course.short_desc}
                    </p>

                    <div
                        className="mt-20 md:p-10 p-5 rounded-lg grid grid-cols-8"
                        style={{ backgroundColor: course.color }}>
                        <p className="text-white text-2xl leading-relaxed md:col-span-6 col-span-8">
                            عندما تنتهي من الدورة، نحن نحثك على متابعة البحث في
                            هذا الموضوع عن طريق التحدث مع أشخاص مسيحيين. أنهم
                            يستطيعون تقديم رؤية أوضح وسيمدون لك يد العون في
                            مسيرة نموك في الإيمان
                        </p>
                        <svg
                            fill={course.color}
                            className="col-span-2 w-52 m-auto hidden md:block"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 55.08 70.87"
                            style={{
                                marginBottom: '-9rem',
                                filter: 'brightness(1.3)',
                            }}>
                            <g>
                                <path d="m47.33,46.52c4.79-4.96,7.75-11.7,7.75-19.12C53.57-9.13,1.51-9.14,0,27.4c0,7.42,2.96,14.17,7.75,19.12-1.13,3.11-6.03,16.58-6.03,16.58-.28.72.31,1.53,1.08,1.49l9.44-.33,7.02,6.33c.56.53,1.55.28,1.79-.45,0,0,5.54-15.22,5.54-15.22.63.03,1.26.03,1.89,0,.5,1.38,5.54,15.22,5.54,15.22.24.72,1.23.97,1.79.45,0,0,7.02-6.33,7.02-6.33l9.44.33c.78.04,1.36-.78,1.08-1.49l-6.03-16.58Zm-27.8,21.31l-6.13-5.52c-.21-.19-.48-.28-.78-.29l-8.25.29,5.14-14.12c4.06,3.53,9.17,5.89,14.78,6.55l-4.76,13.09ZM2.22,27.4c1.4-33.59,49.25-33.57,50.63,0-1.39,33.58-49.24,33.59-50.63,0Zm40.24,34.62c-.3,0-.57.09-.78.29l-6.13,5.52-4.76-13.09c5.62-.66,10.72-3.02,14.78-6.55l5.14,14.12-8.25-.29Z" />
                                <path d="m38.85,20.01l-3.33-.69c-.8-.17-1.49-.67-1.89-1.37l-1.69-2.96c-.91-1.6-2.56-2.55-4.4-2.55-1.84,0-3.49.95-4.4,2.55l-1.69,2.96c-.4.71-1.09,1.21-1.89,1.37l-3.33.69c-3.75.64-5.37,5.64-2.72,8.37l2.29,2.52c.55.6.81,1.41.72,2.22l-.37,3.38c-.41,2.91,2.13,5.68,5.02,5.63,1.41.12,3.93-1.35,5.2-1.86.74-.34,1.59-.34,2.34,0l3.1,1.4c1.68.76,3.57.56,5.06-.52,1.49-1.08,2.26-2.82,2.06-4.65l-.37-3.38c-.09-.81.17-1.62.72-2.22l2.29-2.52c2.65-2.73,1.03-7.72-2.72-8.37Zm1.07,6.87l-2.29,2.52c-.98,1.08-1.45,2.52-1.29,3.96l.37,3.38c.31,2.11-2.08,3.84-3.99,2.9-1.3-.53-3.74-1.94-5.19-1.85-1.46-.11-3.86,1.32-5.19,1.85-1.91.95-4.3-.79-3.99-2.9l.37-3.38c.16-1.44-.31-2.89-1.29-3.96l-2.29-2.52c-1.49-1.53-.58-4.33,1.53-4.69,0,0,3.33-.69,3.33-.69,1.42-.3,2.65-1.19,3.37-2.45l1.69-2.96c.51-.9,1.43-1.43,2.47-1.43,1.03,0,1.96.54,2.47,1.43l1.69,2.96c.72,1.26,1.95,2.15,3.37,2.45l3.33.69c2.1.36,3.02,3.17,1.53,4.69Z" />
                            </g>
                        </svg>
                    </div>

                    <div className="mt-32">
                        <h2 className="text-4xl text-center md:text-right">
                            تفاصيل الدورة
                        </h2>
                        <div
                            className="mt-10 text-lg leading-relaxed"
                            dangerouslySetInnerHTML={{ __html: html }}
                        />
                    </div>

                    <p
                        className="mt-32 text-center text-5xl leading-tight"
                        style={{ color: course.color }}>
                        نحن نقدر جهدك في التعلم معنا. نحن نأمل أن يساعدك هذا
                        التدريب الصغير على تنمية فهمك عن المواضيع المسيحية
                    </p>
                </div>
            </div>
        </HomeLayout>
    )
}

export default CoursePage
