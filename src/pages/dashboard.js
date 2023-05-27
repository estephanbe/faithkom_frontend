import AppLayout from '@/components/Layouts/AppLayout'
import Head from 'next/head'
import { useEffect, useState } from 'react'
import axios from '@/lib/axios'
import { useRouter } from 'next/router'
import Loading from '@/components/Loading'

const Dashboard = () => {
    const [courses, setCourses] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    const router = useRouter()

    useEffect(() => {
        const fetchCourses = async () => {
            setIsLoading(true)
            try {
                const response = await axios.get('/api/courses')
                setCourses(response.data.courses)
                setIsLoading(false)
            } catch (error) {
                /* empty */
            }
        }

        fetchCourses()
    }, [])

    const handleDelete = async course => {
        // Prompt the user for confirmation
        const result = confirm(
            'Are you sure you want to delete this course? ' + course.title,
        )
        if (result) {
            try {
                const response = await axios.delete('/api/courses/' + course.id)
                if (response) {
                    router.reload()
                }
            } catch (error) {
                /* empty */
            }
        }
    }

    return (
        <AppLayout
            header={
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                    Dashboard
                </h2>
            }>
            <Head>
                <title>Faithkom - Dashboard</title>
            </Head>

            {isLoading && <Loading />}

            {!isLoading && (
                <div className="py-12">
                    <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                        {courses.length == 0 && (
                            <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                                <div className="p-6 bg-white border-b border-gray-200 text-2xl flex flex-col justify-center items-center gap-5">
                                    There is no courses yet, please go ahead and
                                    create your first course!
                                    <button
                                        onClick={() =>
                                            router.push('/create-course')
                                        }
                                        className="block bg-green-500 hover:bg-green-600 text-lg text-white rounded-2xl p-3">
                                        Create Course
                                    </button>
                                </div>
                            </div>
                        )}
                        {courses.map(course => (
                            <div
                                className="flex bg-white mb-10 rounded shadow-lg sm:rounded-lg"
                                key={course.id}>
                                <div className="flex gap-4 p-6 w-full">
                                    <button
                                        onClick={() =>
                                            router.push(
                                                '/courses/' + course.slug,
                                            )
                                        }
                                        className="bg-green-500 hover:bg-green-600 text-lg text-white rounded-2xl w-24">
                                        View
                                    </button>
                                    <button
                                        onClick={() =>
                                            router.push(
                                                '/courses/edit/' + course.slug,
                                            )
                                        }
                                        className="bg-orange-500 hover:bg-orange-600 text-lg text-white rounded-2xl w-24">
                                        Edit
                                    </button>
                                    <button
                                        onClick={() => {
                                            // setShowConfirmation(true)
                                            handleDelete(course)
                                        }}
                                        className="bg-red-500 hover:bg-red-600 text-lg text-white rounded-2xl w-24">
                                        Delete
                                    </button>
                                    <div className="p-4 text-4xl flex-grow text-center bg-gray-200 rounded-xl">
                                        {course.title}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </AppLayout>
    )
}

export default Dashboard
