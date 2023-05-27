import { useEffect, useState } from 'react'
import axios from '@/lib/axios'
import { useRouter } from 'next/router'
import HomeLayout from '@/components/Layouts/HomeLayout'
import { NextSeo } from 'next-seo'

export default function Home() {
    const [courses, setCourses] = useState([])
    // const [isLoading, setIsLoading] = useState(true)
    const router = useRouter()
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
                // setIsLoading(false)
            } catch (error) {
                /* empty */
            }
        }
        fetchSettings()
    }, [])

    useEffect(() => {
        const fetchCourses = async () => {
            try {
                const response = await axios.get('/api/courses')
                setCourses(response.data.courses)
            } catch (error) {
                /* empty */
            }
        }

        fetchCourses()
    }, [])

    // const handleChildData = childData => {
    //     console.log(childData)
    //     setSettings(childData)
    // }

    return (
        <HomeLayout settings={settings}>
            <NextSeo
                title="Faithkom"
                description="دورات مسيحية تدعوا الى تقديم المعرفة لموضيع تتعلق بالإيمان المسيحي"
                canonical={router.basePath}
                additionalMetaTags={[
                    {
                        author: 'BoshDev',
                        name: 'BoshDev',
                        content: 'https://www.boshdev.com',
                    },
                ]}
            />

            {/*{*/}
            {/*    isLoading && <Loading />*/}
            {/*}*/}
            <div
                id="faithkom-hero"
                className="relative flex justify-center items-center"
                style={{
                    backgroundImage: 'url(./assets/home_bg.jpeg)',
                    backgroundSize: 'cover',
                    backgroundPosition: 'left',
                    height: '70vh',
                }}>
                <div className="w-screen z-0 h-full bg-green-700 bg-opacity-50 absolute left-0 top-0" />
                <div className="z-10 bg-white-700 flex flex-col justify-center items-center h-full gap-20 container">
                    <h1 className="lg:text-7xl text-4xl text-white font-bold text-center">
                        {settings?.website_title}
                    </h1>
                    <div
                        className="flex flex-col items-start sm:w-full lg:w-2/3 w-80  lg:p-10 p-5 bg-white rounded-2xl shadow-lg text-right"
                        style={{ marginBottom: '-40vh' }}>
                        <h2 className="lg:text-4xl font-bold text-green-700 my-3">
                            {settings?.website_sub_title}
                        </h2>
                        <p className="lg:text-2xl mt-3 leading-relaxed">
                            {settings?.website_intro}
                        </p>
                    </div>
                </div>
            </div>

            <div
                id="faithkom-courses-list"
                className="grid grid-cols-1 lg:grid-cols-2 gap-4 w-full w-full lg:w-2/3 m-auto mt-52 px-5 lg:px-0">
                {courses.map(course => {
                    return (
                        <div
                            className="grid grid-cols-3 rounded-lg mb-10 mt-32"
                            key={course.id}
                            style={{
                                backgroundColor: course.color,
                                minHeight: '17rem',
                                cursor: 'pointer',
                            }}
                            onClick={() =>
                                router.push('/courses/' + course.slug)
                            }>
                            <div className="col-1 flex flex-col justify-center items-center">
                                <div className="rounded-full bg-white ">
                                    <img
                                        src={
                                            'courses/' +
                                            course.slug +
                                            '/' +
                                            course.icon
                                        }
                                        className="rounded-circle m-5"
                                        style={{
                                            width: '70px',
                                            height: '70px',
                                        }}
                                    />
                                </div>
                                <h3 className="text-4xl font-bold text-white mt-5">
                                    {course.title}
                                </h3>
                            </div>
                            <div className="col-span-2 relative">
                                <img
                                    src={
                                        'courses/' +
                                        course.slug +
                                        '/' +
                                        course.image
                                    }
                                    className="rounded-circle absolute bottom-0 right-5"
                                    style={{ width: '20rem', height: '22rem' }}
                                />
                            </div>
                        </div>
                    )
                })}
            </div>
        </HomeLayout>
    )
}
