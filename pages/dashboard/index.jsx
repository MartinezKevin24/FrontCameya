import React, { useEffect, useState } from 'react'
import axios from 'axios'
import ApiRoutes from 'constants/routes/api'
import Cards from 'components/Dashboard/Cards'
import PostService from 'components/Dashboard/PostService'

export default function Dashboard() {

  const [services, setServices] = useState([])

  useEffect(()=>{

    const cancelTokenSource = axios.CancelToken.source();

    const getServices = () => {
      axios.get(ApiRoutes.services.all, { cancelToken: cancelTokenSource.token })
      .then(response => setServices(response.data.message))
      .catch(error => console.log(error))
    }

    getServices()

    return () => {
      cancelTokenSource.cancel();
    }

  }, [])

  if(services.length == 0)
    return (
      <div className='z-50 absolute'>
        Loading...
      </div>
    )

  return (
    <div className='z-0 sticky overflow-y-auto flex flex-col gap-6 whidth'>
      <PostService/>
      {
        services.map((service, i) => <Cards key={i} iterator={i} service={service}/>)
      }
      <style jsx>{`

        .whidth{
          min-width: calc(100vw - 90px);
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
