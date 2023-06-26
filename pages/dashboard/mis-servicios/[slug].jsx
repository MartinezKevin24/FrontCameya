import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import axios from 'axios'
import ApiRoutes from 'constants/routes/api'
import Image from 'next/image'
import useFormats from 'hooks/formats/useFormats'
import CardApplication from '@/components/Dashboard/CardApplication'
import Button from 'components/Button'
import { useSelector } from 'react-redux';
import { toast } from "react-toastify";
import PageRoutes from 'constants/routes/pages'

export default function ServicePage() {

  const { query, push } = useRouter()
  const [ data, setData ] = useState(null)
	const { changeFormatDate } = useFormats()
	const user = useSelector(state => state.login.value.data)

  useEffect(() => {

    const cancelTokenSource = axios.CancelToken.source() 

    axios.get(`${ApiRoutes.services.detail}${query.slug}`, {cancelToken: cancelTokenSource.token})
      .then((response) => {
				setData(response.data.message)
			})
      .catch((error) => console.log(error))

    return () =>{
      cancelTokenSource.cancel()
    }

  }, [query])

  console.log(data)

	const findPostulation = () =>{
		const exist = data?.WorkerPostulations.find(worker => worker.worker_dni === user.dni )
		if(exist)
			return true
		else
			return false
	}

	const handlePostulation = () => {
		axios.post(ApiRoutes.services.postulation, { service_id:data.id, worker_dni: user.dni })
			.then((reponse)=>{
				toast.success("Postulación exitosa!", {
					position: toast.POSITION.TOP_RIGHT
				});
				push(PageRoutes.dashboard.index)
			})
			.catch(()=>{
				console.log(error)
			})

	}

	if(!data)
		return (<div>Loading...</div>)

  return (
    <div className='bg-white py-6 px-6 w-full rounded-xl md:min-w-[450px] md:max-w-[1000px] flex flex-col gap-4'>
			<div className='flex flex-col gap-4'>
				<div className='flex flex-col gap-2'>
					<div className='flex flex-row items-center justify-between'>
						<div className='flex flex-row items-center justify-between gap-3'>
							<div className='rounded-full w-10 h-10 overflow-hidden'>
								{
									data.User.profile_picture !== "NN" &&
									<Image src={data.User.profile_picture} alt="profile photo" width={40} height={40}/>
								}
							</div>
							<div className='font-semibold text-sm flex flex-col'>
								<p>{data.User.name} {data.User.last_name}</p>	
								<p className='font-light text-xs'>{changeFormatDate(data.date_programmed)}</p>
							</div>
						</div>
					</div>
					<div className='px-2 flex flex-col gap-4'>
						<div className='flex gap-3 flex-col'>
							<h1 className='font-bold text-2xl text-gray-darkest'>{data.service_title}</h1>
							<p className='text-gray-darkest'>{data.service_description}</p>
						</div>
						<div className='flex flex-col gap-3'>
							<p className='text-gray-darkest font-bold'>Dirrección: <span className='font-normal'>{data.address}</span></p>
							<p className='text-gray-darkest font-bold'>Estado: <span className='font-normal'>{data.service_status}</span></p>
							<p className='text-gray-darkest font-semibold flex items-center gap-2'>Precio inicial: <span className='text-gray-lightest font-bold py-1 px-2 rounded-md bg-lime-600'>$ {data.total_price}</span></p>
							<div className='flex flex-col gap-3'>
								<p className='text-gray-darkest font-bold'>Categorias:</p>
								<div className='flex flex-wrap gap-2 p-3 mb-1 rounded-lg bg-gray-lightestplus w-full min-h-[60px]'>
									{
										data.categories.map((category, i) => (
											<div key={i} className='px-2 py-1 rounded-lg flex flex-row items-center gap-2 bg-blue-200'>
												<p className='text-gray-darkest font-semibold'>{category}</p>
											</div>
										))
									}
								</div>
							</div>
						</div>
					</div>
					<div className='mx-2'>
						{
							user?.is_worker 
							?
							<Button
								onClick={handlePostulation}
								disabled={findPostulation()}
								color={'green'}>
								{
									findPostulation() 
									?
									"Ya estás postulado"
									:
									"Postularme"
								}
							</Button>
							:null
						}
					</div>
				</div>
				{
					data.service_status === "Not Assigned" && !user.is_worker && data.WorkerPostulations.length > 0 &&
					<div className='px-2 flex flex-col gap-4	'>
						<div className='border-b-2 pb-2'>
							<h1 className='font-bold text-gray-darkest text-2xl'>Postulantes</h1>
						</div>
						<div className='flex flex-col gap-3'>
							{
								data?.WorkerPostulations.map((application, i)=><CardApplication key={i} service={data} user={application}/>)
							}
						</div>
					</div>
				}
			</div>
		</div>
  )
}
