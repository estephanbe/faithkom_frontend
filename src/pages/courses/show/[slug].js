import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import axios from '@/lib/axios'
import HomeLayout from '@/components/Layouts/HomeLayout'
import Button from '@/components/Button'
import { NextSeo } from 'next-seo'

const CoursePage = () => {
    const router = useRouter()
    const { slug } = router.query
    const [course, setCourse] = useState(null)
    const [navHeight, setNavHeight] = useState(null)
    const [screenHeight, setScreenHeight] = useState(null)
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
            } catch (error) {
                /* empty */
            }
        }

        if (slug) {
            fetchCourse()
        }
    }, [slug])

    useEffect(() => {
        setScreenHeight(window.innerHeight)
    }, [])

    const handleNavHeight = height => {
        setNavHeight(height)
    }

    if (!course) {
        return <div>Loading...</div>
    }

    return (
        <HomeLayout
            settings={settings}
            navHeight={handleNavHeight}
            dividerDisabled={true}>
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
            <div className="">
                <iframe
                    src={`/courses/${slug}/content/story.html`}
                    title="Course Story"
                    className="w-screen shadow-lg"
                    style={{
                        marginTop: navHeight + 'px',
                        height: screenHeight - navHeight + 'px',
                    }}
                />
            </div>

            <div className="flex justify-end pt-5 pl-5">
                <Button
                    variant="green"
                    className="text-xl"
                    onClick={() => router.push('/courses/' + course.slug)}>
                    العودة
                </Button>
            </div>
        </HomeLayout>
    )
}

export default CoursePage
