import LabelLarge from '@/components/LabelLarge'
import { useEffect, useState } from 'react'
import axios from '@/lib/axios'

const Categories = ({
    // eslint-disable-next-line no-unused-vars
    disabled = false,
    // eslint-disable-next-line no-unused-vars
    className,
    onData,
    // eslint-disable-next-line no-unused-vars
    currentData,
    CurrentCat = -1,
    // eslint-disable-next-line no-unused-vars
    ...props
}) => {
    const [categories, setCategories] = useState([])
    const [selectedCat, setSelectedCat] = useState(-1)

    const fetchCategories = async () => {
        try {
            const response = await axios.get('/api/categories')
            setCategories(response.data.categories)
        } catch (error) {
            /* empty */
        }
    }

    useEffect(() => {
        if (CurrentCat !== -1) {
            setSelectedCat(CurrentCat)
        }
        fetchCategories()
    }, [])

    useEffect(() => {
        onData({
            cat_id: selectedCat,
        })
    }, [selectedCat])

    const handleInputChange = e => {
        setSelectedCat(e.target.value)
    }

    return (
        <div className="mb-4">
            <LabelLarge htmlFor="course-title" className="pb-2">
                Course Category
            </LabelLarge>
            <select
                value={selectedCat}
                id={'course-cat-id'}
                onChange={handleInputChange}
                name={'cat_id'}
                className={
                    'bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5'
                }>
                {categories.map(cat => {
                    return (
                        <option key={cat.id} value={cat.id}>
                            {cat.name}
                        </option>
                    )
                })}
            </select>
        </div>
    )
}

export default Categories
