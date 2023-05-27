import axios from '@/lib/axios'

let settingsData = null

export const FetchHomeSettings = async () => {
    if (settingsData) {
        return settingsData
    }

    // eslint-disable-next-line no-useless-catch
    try {
        const response = await axios.get('/api/settings')
        settingsData = response.data.settings
        return settingsData
    } catch (error) {
        throw error
    }
}
