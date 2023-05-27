import '../styles/globals.css'
import 'tailwindcss/tailwind.css'
import { DefaultSeo } from 'next-seo'

const App = ({ Component, pageProps }) => {
    return (
        <>
            <DefaultSeo
                openGraph={{
                    type: 'website',
                    locale: 'ar_AR',
                    url: 'https://www.faithkom.com/',
                    siteName: 'Faithkom',
                }}
                twitter={{
                    handle: '@handle',
                    site: '@site',
                    cardType: 'summary_large_image',
                }}
            />
            <Component {...pageProps} />
        </>
    )
}

export default App
