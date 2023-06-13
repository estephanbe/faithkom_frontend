import { useEffect, useState } from 'react'
import axios from '@/lib/axios'
import { useRouter } from 'next/router'
import HomeLayout from '@/components/Layouts/HomeLayout'
import { NextSeo } from 'next-seo'

export default function Home() {
    const [courses, setCourses] = useState([])
    const [categories, setCategories] = useState([])
    const [filteredCat, setFilteredCat] = useState([])
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

    const fetchCategories = async () => {
        try {
            const response = await axios.get('/api/categories')
            setCategories(response.data.categories)
            if (response) {
                setFilteredCat(1)
            }
        } catch (error) {
            /* empty */
        }
    }

    useEffect(() => {
        fetchCategories()
    }, [])

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

    const handleFilterChange = e => {
        setFilteredCat(e.target.value)
    }

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

            {categories.length && (
                <>
                    <div
                        id="faithkom-courses-list"
                        className="w-full mt-80 px-5 lg:px-0 hidden lg:flex justify-center items-center gap-8">
                        {categories.map(cat => {
                            return (
                                <button
                                    key={cat.id}
                                    onClick={() => {
                                        setFilteredCat(cat.id)
                                    }}
                                    className={
                                        'px-10 py-5 bg-green-600 rounded-lg text-white font-bold hover:rounded-2xl ' +
                                        (filteredCat !== parseInt(cat.id)
                                            ? 'bg-opacity-70'
                                            : 'bg-opacity-90')
                                    }>
                                    {cat.name === 'Uncategorized'
                                        ? 'جميع الدورات'
                                        : cat.name}
                                </button>
                            )
                        })}

                        <hr className="h-px my-8 bg-gray-200 border-0 dark:bg-gray-700" />
                    </div>

                    <div className={'lg:hidden w-full mt-80 px-5'}>
                        <h4 className={'text-center my-5 text-2xl'}>
                            تصنيف الدورات
                        </h4>
                        <select
                            value={filteredCat}
                            id={'course-cat-id'}
                            onChange={handleFilterChange}
                            name={'cat_id'}
                            className={
                                'pr-10 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5'
                            }>
                            {categories.map(cat => {
                                return (
                                    <option key={cat.id} value={cat.id}>
                                        {cat.name === 'Uncategorized'
                                            ? 'جميع الدورات'
                                            : cat.name}
                                    </option>
                                )
                            })}
                        </select>
                    </div>
                </>
            )}

            <div
                id="faithkom-courses-list"
                className="grid grid-cols-1 lg:grid-cols-3 gap-4 w-full lg:w-2/3 m-auto mt-10 px-5 lg:px-0">
                {courses.map(course => {
                    return (
                        (filteredCat == 1 || filteredCat == course.cat_id) && (
                            <div
                                className="rounded-lg mb-10 mt-10"
                                key={course.id}
                                style={{
                                    backgroundColor: course.color,
                                    minHeight: '17rem',
                                    cursor: 'pointer',
                                }}
                                onClick={() =>
                                    router.push('/courses/' + course.slug)
                                }>
                                <div className="flex flex-col justify-center items-center h-full">
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
                            </div>
                        )
                    )
                })}
            </div>
        </HomeLayout>
    )
}
