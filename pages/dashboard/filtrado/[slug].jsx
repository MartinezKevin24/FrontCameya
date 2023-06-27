import React, { useEffect, useState, useRef } from 'react'
import axios from 'axios'
import ApiRoutes from 'constants/routes/api'
import Cards from 'components/Dashboard/Cards'
import { useSelector } from 'react-redux';
import SelectField from 'components/forms/SelectField'
import { useRouter } from 'next/router'

export default function Filtrado() {

  const [filtrado, setFiltrado] = useState([]);
  const user = useSelector(state => state.login.value.data)

  const {query} = useRouter()

  useEffect(()=>{

    const cancelTokenSource = axios.CancelToken.source();

    const getServices = () => {
      axios.post(`${ApiRoutes.filtrado}`, { categories: [query?.slug] },{ cancelToken: cancelTokenSource.token })
        .then(response => {
          let array = response.data.message;
          if(array.length > 0){
            array.sort((a, b) => {
              const today = new Date();
              const diferenciaA = Math.abs(new Date(a.date_programmed) - today)
              const diferenciaB = Math.abs(new Date(b.date_programmed) - today)
              return diferenciaA - diferenciaB
            })
          }
            
          setFiltrado(array)

        })
        .catch(error => {
          console.log(error)
        }) 
    }

    getServices()

    return () => {
      cancelTokenSource.cancel();
    }

  }, [query])

  console.log(filtrado)

  return (
    <div className='z-0 sticky overflow-y-auto flex flex-col gap-6 whidth'>
      {
        filtrado.length > 0 ?
        <div>
          <div className='w-96 gap-3 items-center flex flex-row mb-4'>
            <div className='font-bold text-gray-darkest'>Filtrar categorias:</div>
            <SelectField/>
          </div>
          {
            filtrado?.length !== 0 
            ?
            <div className='flex flex-col gap-6'>
              {filtrado?.map((service, i) => <Cards key={i} service={service} user={user}/>)}
            </div>
            :
            <div className='sticky'>
              Ooops, No tenemos servicios disponibles actualmente...
            </div>
          }
        </div>
        :
        <div>
          <div className='w-96 gap-3 items-center flex flex-row mb-4'>
            <div className='font-bold text-gray-darkest'>Filtrar categorias:</div>
            <SelectField/>
          </div>
          <div className='sticky'>
            Ooops, No tenemos servicios disponibles actualmente...
          </div>
        </div>
      }
      <style jsx>{`

        .whidth{
          min-width: calc(100vw - 100px);
        }

        @media (min-width: 768px){
          .whidth{
            min-width: calc(100vw - 320px);
          }
        } 
      
      `}</style>
    </div>
  )
}
