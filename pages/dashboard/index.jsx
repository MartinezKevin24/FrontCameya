import React, { useEffect, useState, useRef } from 'react'
import axios from 'axios'
import ApiRoutes from 'constants/routes/api'
import Cards from 'components/Dashboard/Cards'
import PostService from 'components/Dashboard/PostService'
import { useSetRecoilState, useRecoilState } from 'recoil'
import openPostState from 'atoms/services/openPostState'
import servicesState from 'atoms/services/servicesState'
import pageState from 'atoms/services/pageState'

export default function Dashboard() {

  const [services, setServices] = useRecoilState(servicesState);
  const setOpen = useSetRecoilState(openPostState);
  const [page, setPage] = useRecoilState  (pageState);
  const [lastPage, setLastPage] = useState(false)
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
      axios.get(`${ApiRoutes.services.all}/${page}`, { cancelToken: cancelTokenSource.token })
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
          
          if(array.length < 10)
            setLastPage(true)
          else
            setLastPage(false)

          const data = services.concat(array)
          setServices(data)

        })
        .catch(error => console.log(error))
    }

    getServices()

    return () => {
      cancelTokenSource.cancel();
    }

  }, [page])

  return (
    <div className='z-0 sticky overflow-y-auto flex flex-col gap-6 whidth' ref={refFather}>
      <div ref={refService} className='flex md:min-w-[300px] flex-col w-full md:max-w-[1000px]'>
        <PostService ref={refService}/>
      </div>
      {
        services.length > 0 
        ?
        <div className='flex flex-col gap-6'>
          {services.map((service, i) => <Cards key={i} service={service}/>)}
          {
            !lastPage &&
            <div 
              className='w-full cursor-pointer bg-white hover:bg-slate-300 text-gray-darkest flex justify-center rounded-full py-2'
              onClick={()=>setPage(page + 1)}>
              <p className='font-bold'>Ver más </p>
            </div>
          }
        </div>
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
