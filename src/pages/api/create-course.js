import formidable from 'formidable'
import axios from 'axios'
export const config = {
    api: {
        bodyParser: false,
    },
}

export default async function handler(req, res) {
    if (req.method === 'POST') {
        const form = new formidable.IncomingForm()
        // eslint-disable-next-line no-unused-vars
        form.parse(req, async (err, fields, files) => {
            if (err) {
                res.status(500).end() // Internal Server Error
                return
            }
            // =====================================================================================================
            const laravelSessionCookie = req.cookies['laravel_session'] // adjust this to match the actual session cookie key
            const xsrfToken = req.cookies['XSRF-TOKEN'] // adjust this to match the actual session cookie key
            try {
                const laravel_create_course = await axios.post(
                    process.env.NEXT_PUBLIC_BACKEND_URL + '/api/courses',
                    fields,
                    {
                        headers: {
                            Accept: 'application/json',
                            'X-Requested-With': 'XMLHttpRequest',
                            'X-XSRF-TOKEN': xsrfToken,
                            Cookie: `laravel_session=${laravelSessionCookie}; XSRF-TOKEN=${xsrfToken}`,
                        },
                        withCredentials: true,
                    },
                )
                res.status(200).json(laravel_create_course)
            } catch (error) {
                res.status(500).json(error)
                return
            }
            // =====================================================================================================
        })
    } else {
        res.setHeader('Allow', ['POST'])
        res.status(405).end(`Method ${req.method} Not Allowed`)
    }
}
