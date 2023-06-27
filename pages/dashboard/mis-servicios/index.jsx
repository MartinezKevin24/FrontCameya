import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useSelector } from 'react-redux'
import ApiRoutes from 'constants/routes/api'
import Cards from 'components/Dashboard/Cards'

export default function Servicios() {

  const [services, setServices] = useState([])
  const user = useSelector(state => state.login?.value?.data)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const cancelTokenSource = axios.CancelToken.source();

    let url;

    if(user?.is_worker)
      url = ApiRoutes.services.worker
    else
      url = ApiRoutes.services.user

    axios.post(url, {dni: user?.dni}, { cancelToken: cancelTokenSource.token })
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

  if(loading){
    return(
      <div className='z-0 sticky overflow-y-auto flex flex-col gap-6 whidth'>
        <div className='p-2 border-b-2 border-black flex md:min-w-[300px] flex-col w-full md:max-w-[1000px]'>
          <h1 className='text-3xl font-bold text-gray-darkest'>Mis Servicios</h1>
        </div>
        <div className='sticky'>
          Loading...
        </div>
      </div>
    )
  }

  if(services.length === 0){
    return(
      <div className='z-0 sticky overflow-y-auto flex flex-col gap-6 whidth'>
        <div className='p-2 border-b-2 border-black flex md:min-w-[300px] flex-col w-full md:max-w-[1000px]'>
          <h1 className='text-3xl font-bold text-gray-darkest'>Mis Servicios</h1>
        </div>
        <div className='sticky'>
          No tienes servicios aún...
        </div>
      </div>
    )
  }

  return (
    <div className='z-0 sticky overflow-y-auto flex flex-col gap-6 whidth'>
      <div className='p-2 border-b-2 border-black flex md:min-w-[300px] flex-col w-full md:max-w-[1000px]'>
        <h1 className='text-3xl font-bold text-gray-darkest'>Mis Servicios</h1>
      </div>
      {
        services.map((service, i) => <Cards key={i} service={service} setServices={setServices} user={user}/>)
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
