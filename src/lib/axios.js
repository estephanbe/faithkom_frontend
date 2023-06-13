import Axios from 'axios'
import Cookies from 'js-cookie'

const axios = Axios.create({
    baseURL: 'https://data.faithkom.com/',
    // baseURL: process.env.NEXT_PUBLIC_BACKEND_URL,
    headers: {
        Accept: 'application/json',
        'X-Requested-With': 'XMLHttpRequest',
        'X-XSRF-TOKEN': Cookies.get('XSRF-TOKEN'),
    },
    withCredentials: true,
})

export default axios
