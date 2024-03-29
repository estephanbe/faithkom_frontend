import axios from 'axios'
import Cookies from 'js-cookie'

// const token = Cookies.get('laravel_session');

export default axios.create({
    baseURL: 'https://data.faithkom.com/',
    // baseURL: process.env.NEXT_PUBLIC_BACKEND_URL,
    // baseURL: 'http://localhost:3000',
    headers: {
        Accept: 'application/json',
        'X-Requested-With': 'XMLHttpRequest',
        'X-XSRF-TOKEN': Cookies.get('XSRF-TOKEN'),
    },
    withCredentials: true,
})
