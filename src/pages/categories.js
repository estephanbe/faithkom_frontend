import { useState, useEffect } from 'react'
import axios from '@/lib/axios'
import AppLayout from '@/components/Layouts/AppLayout'
import Head from 'next/head'
import Input from '@/components/Input'
import Button from '@/components/Button'

const Categories = () => {
    const [categories, setCategories] = useState([])
    const [editIndex, UpdateEditIndex] = useState(-1)

    const fetchCategories = async () => {
        try {
            const response = await axios.get('/api/categories')
            setCategories(response.data.categories)
        } catch (error) {
            /* empty */
        }
    }

    useEffect(() => {
        fetchCategories()
    }, [])

    const handleNewCat = async e => {
        e.preventDefault()
        try {
            const response = await axios.post(
                '/api/categories',
                JSON.stringify({
                    name: document.getElementById('fkm-new-cat').value,
                }),
                {
                    headers: {
                        'Content-Type': 'application/json',
                    },
                },
            )
            if (response) {
                setCategories([...categories, response.data.category])

                document.getElementById('fkm-new-cat').value = null
            }
            // Display success message or redirect to another page
        } catch (error) {
            /* empty */
        }
    }

    const handleUpdateCat = async e => {
        if (editIndex == -1) {
            alert('Nothing was updated')
            return
        }
        e.preventDefault()
        try {
            const response = await axios.put(
                '/api/categories/' + editIndex,
                JSON.stringify({
                    name: document.getElementById(
                        'fkm-update-input-' + editIndex,
                    ).value,
                }),
                {
                    headers: {
                        'Content-Type': 'application/json',
                    },
                },
            )
            if (response) {
                UpdateEditIndex(-1)
                await fetchCategories()
            }
            // Display success message or redirect to another page
        } catch (error) {
            /* empty */
        }
    }

    const handleDeleteCat = async id => {
        if (!confirm('Are you sure you want to delete the category?')) {
            alert('Nothing was deleted')
            return
        }

        try {
            const response = await axios.delete('/api/categories/' + id)

            if (response) {
                await fetchCategories()
            }
            // Display success message or redirect to another page
        } catch (error) {
            /* empty */
        }
    }

    return (
        <AppLayout
            header={
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                    Categories Management
                </h2>
            }>
            <Head>
                <title>Faithkom - Categories</title>
            </Head>

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <form
                        onSubmit={handleNewCat}
                        className="bg-white shadow-sm sm:rounded-lg p-6">
                        <button
                            type="submit"
                            className="bg-green-500 hover:bg-green-600 text-white font-semibold py-1 px-4 rounded">
                            Create New Category
                        </button>
                        <Input
                            id={'fkm-new-cat'}
                            className={'border ml-5 p-1'}
                            dir={'rtl'}
                            required
                        />
                    </form>

                    <div className="flex flex-col mt-10">
                        <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                            <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
                                <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
                                    <table className="min-w-full divide-y divide-gray-200">
                                        <thead className="bg-gray-50">
                                            <tr>
                                                <th
                                                    scope="col"
                                                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                    Category
                                                </th>
                                                <th
                                                    scope="col"
                                                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                    Action
                                                </th>
                                            </tr>
                                        </thead>
                                        <tbody className="bg-white divide-y divide-gray-200">
                                            {categories.length > 0 &&
                                                categories.map(cat => {
                                                    return (
                                                        cat.id !== 1 && (
                                                            <tr key={cat.id}>
                                                                <td className="px-6 py-4 whitespace-nowrap">
                                                                    <Input
                                                                        id={
                                                                            'fkm-update-input-' +
                                                                            cat.id
                                                                        }
                                                                        className={
                                                                            'text-sm text-gray-900 p-1 text-center ' +
                                                                            (editIndex ===
                                                                            parseInt(
                                                                                cat.id,
                                                                            )
                                                                                ? 'border'
                                                                                : '')
                                                                        }
                                                                        disabled={
                                                                            editIndex !==
                                                                            parseInt(
                                                                                cat.id,
                                                                            )
                                                                        }
                                                                        value={
                                                                            editIndex !==
                                                                            parseInt(
                                                                                cat.id,
                                                                            )
                                                                                ? cat.name
                                                                                : null
                                                                        }
                                                                    />
                                                                </td>
                                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                                    {editIndex !==
                                                                        parseInt(
                                                                            cat.id,
                                                                        ) && (
                                                                        <>
                                                                            <Button
                                                                                onClick={() =>
                                                                                    UpdateEditIndex(
                                                                                        parseInt(
                                                                                            cat.id,
                                                                                        ),
                                                                                    )
                                                                                }
                                                                                variant="yellow"
                                                                                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                                                                                Edit
                                                                            </Button>
                                                                            <Button
                                                                                onClick={() => {
                                                                                    handleDeleteCat(
                                                                                        parseInt(
                                                                                            cat.id,
                                                                                        ),
                                                                                    )
                                                                                }}
                                                                                variant="red"
                                                                                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                                                                                Delete
                                                                            </Button>
                                                                        </>
                                                                    )}

                                                                    {editIndex ===
                                                                        parseInt(
                                                                            cat.id,
                                                                        ) && (
                                                                        <>
                                                                            <Button
                                                                                onClick={
                                                                                    handleUpdateCat
                                                                                }
                                                                                variant="green"
                                                                                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                                                                                Save
                                                                            </Button>
                                                                            <Button
                                                                                onClick={() =>
                                                                                    UpdateEditIndex(
                                                                                        parseInt(
                                                                                            -1,
                                                                                        ),
                                                                                    )
                                                                                }
                                                                                variant="red"
                                                                                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                                                                                Cancel
                                                                            </Button>
                                                                        </>
                                                                    )}
                                                                </td>
                                                            </tr>
                                                        )
                                                    )
                                                })}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AppLayout>
    )
}

export default Categories
