import Head from 'next/head'
import Link from 'next/link'
import { useAuth } from '@/hooks/auth'
import { useRouter } from 'next/router'
import { useEffect, useRef, useState } from 'react'

const HomeLayout = ({
    children,
    settings,
    navHeight = () => null,
    dividerDisabled = false,
}) => {
    const { user } = useAuth({ middleware: 'guest' })
    const [isHeaderFixed, setIsHeaderFixed] = useState(false)
    const router = useRouter()
    const basePath = router.basePath
    const elementRef = useRef(null)

    useEffect(() => {
        if (elementRef.current) {
            navHeight(elementRef.current.offsetHeight)
        }
    }, [])

    useEffect(() => {
        const handleScroll = () => {
            setIsHeaderFixed(window.scrollY > 0)
        }

        window.addEventListener('scroll', handleScroll)

        return () => {
            window.removeEventListener('scroll', handleScroll)
        }
    }, [])

    return (
        <>
            <Head>
                <title>Faithkom</title>
                <script>{settings.tracking_scripts}</script>
            </Head>

            {/*<div className="relative flex items-top justify-center min-h-screen bg-gray-100 dark:bg-gray-900 sm:items-center sm:pt-0">*/}
            <div
                dir="rtl"
                style={{ fontFamily: "'IBM Plex Sans Arabic', sans-serif" }}>
                <header
                    ref={elementRef}
                    id="faithkom-home-header"
                    className={
                        'shadow-lg z-20 fixed top-0 right-0 px-2 md:px-20 py-4 w-full bg-white sm:block md:flex flex-row items-center gap-20 '
                    }>
                    <>
                        {/* Logo */}
                        <div className="flex-shrink-0 flex items-center justify-between md:justify-center">
                            <Link
                                href={
                                    'https://wa.me/' + settings?.whatsapp_number
                                }
                                className="md:hidden">
                                <img
                                    className="w-auto h-20 fill-current"
                                    src={basePath + '/assets/whatsapp.webp'}
                                    alt="Faithkom"
                                />
                            </Link>

                            <Link href="/">
                                <img
                                    className="block h-16 w-auto fill-current text-gray-600"
                                    src={
                                        basePath +
                                        '/assets/Faithkom-logo-transparant.svg'
                                    }
                                    alt="Faithkom"
                                />
                                {/*<ApplicationLogo className="block h-10 w-auto fill-current text-gray-600" />*/}
                            </Link>
                        </div>

                        <div
                            className={
                                'flex-row items-center gap-8 justify-center md:justify-start pt-2 md:pt-0 ' +
                                (isHeaderFixed ? 'hidden md:flex' : 'flex')
                            }>
                            <Link href="/" className="text-2xl text-green-700 ">
                                الصفحة الرئيسية
                            </Link>
                            <Link
                                href={settings?.beit_el_eman_url || '/'}
                                className="text-2xl text-green-700 text-center">
                                بيت الإيمان
                            </Link>
                            <Link
                                href={
                                    'https://wa.me/' + settings?.whatsapp_number
                                }
                                className="hidden md:block">
                                <img
                                    className="w-auto h-20 fill-current"
                                    src={basePath + '/assets/whatsapp.webp'}
                                    alt="Faithkom"
                                />
                            </Link>
                            {user && (
                                <Link
                                    dir="ltr"
                                    href="/dashboard"
                                    className="text-2xl text-green-700 ">
                                    Back to Dashboard
                                </Link>
                            )}
                        </div>
                    </>
                </header>

                <main className="mt-20">{children}</main>

                <div
                    className={
                        'w-screen bg-green-500 h-5 mt-32 shadow-lg ' +
                        (dividerDisabled ? 'hidden' : '')
                    }
                />

                <footer
                    dir="ltr"
                    className="flex flex-col justify-center items-center py-5">
                    <div className="flex justify-center items-center mb-5">
                        <p className="text-2xl text-center">
                            {settings.footer_text}
                        </p>
                        <Link href={settings?.beit_el_eman_url || '/'}>
                            <img
                                className="w-auto h-30 fill-current"
                                src={basePath + '/assets/bait_al_eman.png'}
                            />
                        </Link>
                    </div>
                    <p>
                        Copyright © {new Date().getFullYear()} Beit El Eman, All
                        Rights Reserved.
                    </p>
                </footer>
            </div>
        </>
    )
}

export default HomeLayout
