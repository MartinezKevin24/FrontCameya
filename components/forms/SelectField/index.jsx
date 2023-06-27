import React, {useState, useEffect} from 'react'
import axios from 'axios'
import ApiRoutes from 'constants/routes/api'
import { useRouter } from 'next/router'

export default function SelectField({name}) {

  const [categories, setCategories] = useState([])
  const { push } = useRouter()

  const handleChange = (e) => {
    if(e.target.value !== "")
      push(`/dashboard/filtrado/${e.target.value}`)
  }

  useEffect(() => {

    const cancelTokenSource = axios.CancelToken.source()

    axios.get(ApiRoutes.categories.index, {cancelToken: cancelTokenSource.token})
      .then((response) => {
        setCategories(response.data.message)
      })
      .catch((error) => {
        console.log(error)
      })

    return () =>{
      cancelTokenSource.cancel();
    }

  }, [])

  return (
    <div>
      <select name={name} id={name} onChange={handleChange} className='w-full border-b-[1px] px-2 py-2 text-gray-dark outline-none'>
          <option value="" defaultChecked>Elige una categoría</option>
          {
            categories.map((category, i)=><option key={i} value={category.name}>{category.name}</option>)
          }
        </select>
    </div>
  )
}
