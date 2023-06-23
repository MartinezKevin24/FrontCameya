import React, { useEffect, useState, useRef } from 'react'
import axios from 'axios'
import ApiRoutes from 'constants/routes/api'
import Cards from 'components/Dashboard/Cards'
import PostService from 'components/Dashboard/PostService'
import { useSetRecoilState } from 'recoil'
import openPostState from 'atoms/services/openPostState'

export default function Dashboard() {

  const [services, setServices] = useState([]);
  const setOpen = useSetRecoilState(openPostState);
  const refService = useRef()
  const refFather = useRef()

  const handleClickOutside = (e) => {
    if(refService.current && !refService.current.contains(e.target) && refFather.current.contains(e.target))
      setOpen(false)
  }

  useEffect(() => {
    document.addEventListener('click', handleClickOutside);
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, [refService.current]);

  useEffect(()=>{

    const cancelTokenSource = axios.CancelToken.source();

    const getServices = () => {
      axios.get(ApiRoutes.services.all, { cancelToken: cancelTokenSource.token })
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
    }

    getServices()

    return () => {
      cancelTokenSource.cancel();
    }

  }, [])

  return (
    <div className='z-0 sticky overflow-y-auto flex flex-col gap-6 whidth' ref={refFather}>
      <div ref={refService} className='flex md:min-w-[300px] flex-col w-full md:max-w-[1000px]'>
        <PostService ref={refService}/>
      </div>
      {
        services.length > 0 
        ?
        services.map((service, i) => <Cards key={i} service={service}/>)
        :
        <div className='sticky'>
          Loading...
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
