import React, { useEffect } from 'react'
import axios from 'axios'
import ApiRoutes from 'constants/routes/api'

export default function Dashboard() {

  useEffect(()=>{
    axios.get(ApiRoutes.services.all)
      .then(response => console.log(response))
      .catch(error => console.log(error))
  }, [])

  return (
    <div className='z-50 absolute'>
      Hello
    </div>
  )
}
