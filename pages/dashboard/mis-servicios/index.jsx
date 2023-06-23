import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useSelector } from 'react-redux'
import ApiRoutes from 'constants/routes/api'
import Cards from 'components/Dashboard/Cards'

export default function Servicios() {

  const [services, setServices] = useState([])
  const user = useSelector(state => state.login?.value?.data)

  useEffect(() => {
    const cancelTokenSource = axios.CancelToken.source();

    axios.post(ApiRoutes.services.user, {dni: user.dni}, { cancelToken: cancelTokenSource.token })
        .then(response => {
          let array = response.data.message;
          array.sort((a, b) => {
            const today = new Date();
            const diferenciaA = Math.abs(new Date(a.date_programmed) - today)
            const diferenciaB = Math.abs(new Date(b.date_programmed) - today)
            return diferenciaA - diferenciaB
          })
          setServices(array)
        })
        .catch(error => console.log(error))

    return () => {
      cancelTokenSource.cancel();
    }
  }, [])

  return (
    <div className='z-0 sticky overflow-y-auto flex flex-col gap-6 whidth'>
      <div className='p-2 border-b-2 border-black flex md:min-w-[300px] flex-col w-full md:max-w-[1000px]'>
        <h1 className='text-3xl font-bold text-gray-darkest'>Mis Servicios</h1>
      </div>
      {
        services.length > 0
        ?
        services.map((service, i) => <Cards key={i} service={service}/>)
        :
        <p>Loading...</p>
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
