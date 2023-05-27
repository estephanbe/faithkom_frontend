import Axios from 'axios'

const axios = Axios.create({
    baseURL: 'https://faithkom.com/data',
    // baseURL: process.env.NEXT_PUBLIC_BACKEND_URL,
    headers: {
        'X-Requested-With': 'XMLHttpRequest',
    },
    withCredentials: true,
})

export default axios
