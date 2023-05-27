import Navigation from '@/components/Layouts/Navigation'
import { useAuth } from '@/hooks/auth'
import { NextSeo } from 'next-seo'

const AppLayout = ({ header, children }) => {
    const { user } = useAuth({ middleware: 'auth' })

    return (
        <div className="min-h-screen bg-gray-100">
            <NextSeo
                noindex={true}
                nofollow={true}
                robotsProps={{
                    nosnippet: true,
                    notranslate: true,
                    noimageindex: true,
                    noarchive: true,
                    maxSnippet: -1,
                    maxImagePreview: 'none',
                    maxVideoPreview: -1,
                }}
            />
            <Navigation user={user} />

            {/* Page Heading */}
            <header className="bg-white shadow">
                <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
                    {header}
                </div>
            </header>

            {/* Page Content */}
            <main>{children}</main>
        </div>
    )
}

export default AppLayout
