import React, {useEffect} from 'react'
import { useField } from 'formik'
import FormError from 'components/forms/FormError';
import axios from 'axios';
import ApiRoutes from 'constants/routes/api';

export default function CategoryField({name}) {

  const [field, meta, helpers] = useField(name);

  const handleChange = (e) => {
    if(!field.value.includes(e.target.value) && e.target.value !== "")
      helpers.setValue([...field.value, e.target.value])
  }

  const removeOption = (value) =>{
    const updatedArray = field.value.filter(item => item !== value);
    helpers.setValue(updatedArray);
  }

  useEffect(() => {

    const cancelTokenSource = axios.CancelToken.source()

    axios.get(ApiRoutes.categories.index, {cancelToken: cancelTokenSource.token})
      .then((response) => {
        console.log(response)
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
      <div className='flex flex-col gap-4'>
        <select name={name} id={name} onChange={handleChange} className='w-full border-b-[1px] px-2 py-2 text-gray-dark outline-none'>
          <option value="" defaultChecked>Elige una categoría</option>
          <option value={0}>Carpintería</option>
          <option value={1}>Plomería</option>
          <option value={2}>Electricidad</option>
          <option value={3}>Albañilería</option>
          <option value={4}>Pintura</option>
          <option value={5}>Jardinería</option>
          <option value={6}>Limpieza</option>
          <option value={7}>Cerrajería</option>
          <option value={8}>Cuidado de mascotas</option>
          <option value={9}>Llantería</option>
        </select>
        <div className='flex flex-wrap gap-2 p-3 mb-1 rounded-lg bg-gray-lightestplus w-full min-h-[60px]'>
          {
            field.value.map((category, i) => (
              <div key={i} className='px-2 py-1 rounded-lg flex flex-row items-center gap-2 bg-blue-200'>
                <p className='text-gray-darkest font-semibold'>{category}</p>
                <p 
                  onClick={()=>removeOption(category)}
                  className='py-[2x] flex items-center justify-center px-[6px] rounded-full hover:bg-gray 
                  hover:text-gray-dark cursor-pointer text-gray-darkest font-bold text-xs'>
                    x
                </p>
              </div>
            ))
          }
        </div>
      </div>
      <FormError name={name}/>
    </div>
  )
}
