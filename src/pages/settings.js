import { useState, useEffect } from 'react'
import axios from '@/lib/axios'
import AppLayout from '@/components/Layouts/AppLayout'
import Head from 'next/head'
import { useRouter } from 'next/router'

const Settings = () => {
    const router = useRouter()
    const [settings, setSettings] = useState([])
    const [formValues, setFormValues] = useState({})

    useEffect(() => {
        const fetchSettings = async () => {
            try {
                const response = await axios.get('/api/settings')
                setSettings(response.data.settings)

                // Populate the form values with the fetched settings
                const initialValues = {}
                response.data.settings.forEach(setting => {
                    initialValues[setting.key] = setting.value
                })
                setFormValues(initialValues)
            } catch (error) {
                /* empty */
            }
        }

        fetchSettings()
    }, [])

    const handleInputChange = e => {
        setFormValues(prevValues => ({
            ...prevValues,
            [e.target.name]: e.target.value,
        }))
    }

    const handleSubmit = async e => {
        e.preventDefault()
        try {
            const response = await axios.put('/api/settings', formValues)
            if (response) {
                router.reload()
            }
            // Display success message or redirect to another page
        } catch (error) {
            /* empty */
        }
    }

    const formatLabel = name => {
        const words = name.split('_')
        return words
            .map(word => word.charAt(0).toUpperCase() + word.slice(1))
            .join(' ')
    }

    const textAreaFields = ['website_intro', 'tracking_scripts']
    const ltrFields = [
        'whatsapp_number',
        'beit_el_eman_url',
        'tracking_scripts',
    ]

    return (
        <AppLayout
            header={
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                    Settings
                </h2>
            }>
            <Head>
                <title>Faithkom - Settings</title>
            </Head>

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <form
                        onSubmit={handleSubmit}
                        className="bg-white shadow-sm sm:rounded-lg p-6">
                        {settings.map(setting => (
                            <div key={setting.key} className="mb-4">
                                <label className="block font-medium mb-1">
                                    {formatLabel(setting.key)}
                                </label>
                                {textAreaFields.includes(setting.key) ? (
                                    <textarea
                                        dir={
                                            ltrFields.includes(setting.key)
                                                ? 'ltr'
                                                : 'rtl'
                                        }
                                        name={setting.key}
                                        value={formValues[setting.key] || ''}
                                        onChange={handleInputChange}
                                        rows="10"
                                        className="border border-gray-300 rounded p-2 w-full"
                                    />
                                ) : (
                                    <input
                                        dir={
                                            ltrFields.includes(setting.key)
                                                ? 'ltr'
                                                : 'rtl'
                                        }
                                        type="text"
                                        name={setting.key}
                                        value={formValues[setting.key] || ''}
                                        onChange={handleInputChange}
                                        className="border border-gray-300 rounded p-2 w-full"
                                    />
                                )}
                            </div>
                        ))}
                        <button
                            type="submit"
                            className="bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-4 rounded">
                            Save Changes
                        </button>

                        <button
                            type="button"
                            onClick={() => router.push('/dashboard')}
                            className="ml-5 bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded">
                            Cancel
                        </button>
                    </form>
                </div>
            </div>
        </AppLayout>
    )
}

export default Settings
