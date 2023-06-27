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
import {AiFillStar} from 'react-icons/ai'
import RatingService from 'components/RatingService'

export default function ServicePage() {

  const { query, push } = useRouter()
  const [ data, setData ] = useState(null)
	const { changeFormatDate } = useFormats()
	const [finished, setFinished] = useState(false)

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

	const findPostulation = () =>{
		const exist = data?.WorkerPostulations.find(worker => worker.worker_dni === user.dni )
		if(exist)
			return true
		else
			return false
	}

	const handleRemovePostulation = () => {
		axios.put(ApiRoutes.services.cancelPostulation, { service_id:data.id, worker_dni: user.dni })
			.then((response)=>{
				toast.success("La cancelación de postulación ha sido exitosa!", {
					position: toast.POSITION.TOP_RIGHT
				});
				push(PageRoutes.dashboard.services.index)
			})
			.catch(()=>{
				console.log(error)
			})
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

	const verificateApprobation = () => {
		if(!user?.is_worker){
			if(data?.approbation_client === 0)
				return true
			else
				return false
		}else{
			if(data?.approbation_worker === 0)
				return true
			else
				return false
		}
	}

	const validateFinishStatus = () => {
		if(data?.approbation_client === 1 && data?.approbation_worker === 1){
			return "SERVICIO FINALIZADO"
		}else if(data?.approbation_client === 1 && data?.approbation_worker === 0){
			return "A LA ESPERA DE FINALIZACIÓN"
		}else if(data?.approbation_client === 0 && data?.approbation_worker === 1){
			return "A LA ESPERA DE FINALIZACIÓN"
		}else if(data?.approbation_client === 0 && data?.approbation_worker === 0){
			return "ASIGNADO A UN TRABAJADOR"
		}
	}

	if(!data)
		return (<div>Loading...</div>)

  return (
    <div className='bg-white py-6 px-6 w-full rounded-xl md:min-w-[450px] md:max-w-[1000px] flex flex-col gap-4'>
			{
				finished &&
				<RatingService id={data.id} setFinished={setFinished}/>
			}
			<div className='flex flex-col gap-4'>
				<div className='flex flex-col gap-2'>
					<div className='flex flex-row items-center justify-between'>
						<div className='flex flex-row items-center justify-between gap-3'>
							<div className='rounded-full w-10 h-10 overflow-hidden'>
								{
									data?.User.profile_picture !== "NN" &&
									<Image src={data?.User.profile_picture} alt="profile photo" width={40} height={40}/>
								}
							</div>
							<div className='font-semibold text-sm flex flex-col'>
								<p>{data?.User.name} {data?.User.last_name}</p>	
								<p className='font-light text-xs'>{changeFormatDate(data?.date_programmed)}</p>
							</div>
						</div>
					</div>
					<div className='px-2 flex flex-col gap-4'>
						<div className='flex gap-3 flex-col'>
							<h1 className='font-bold text-2xl text-gray-darkest'>{data?.service_title}</h1>
							<p className='text-gray-darkest'>{data?.service_description}</p>
						</div>
						<div className='flex flex-col gap-3'>
							<p className='text-gray-darkest font-bold'>Dirrección: <span className='font-normal'>{data?.address}</span></p>
							<p className='text-gray-darkest font-bold'>Estado: <span className='font-normal'>{data?.service_status}</span></p>
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
							<div className='flex flex-col gap-4'>
								{
									findPostulation() &&
									<Button
										onClick={handleRemovePostulation}
										color={'red'}>
										Retirar postulación
									</Button>
								}
								{
									data?.service_status === "Not Assigned" &&
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
								}
							</div>
							:null
						}
					</div>
				</div>
				{
					data?.service_status === "Assigned" &&
					<div className='flex flex-col gap-6'>
						{
							verificateApprobation() &&
							<Button
								color={"green"}
								onClick={()=>setFinished(true)}>
									Terminar servicio
							</Button>
						}
						<p className='text-gray-lightest font-bold py-4 text-center px-2 rounded-md bg-sky-700'>{validateFinishStatus()}</p>
					</div>
				}
				{
					data?.service_status === "Not Assigned" && !user?.is_worker && data?.WorkerPostulations.length > 0 &&
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
				{
					data?.service_status === "Completed" || data?.service_status === "Assigned"  ?
					<div className='flex-col flex gap-4'>
						<h1 className='font-bold text-gray-darkest text-2xl'>Trabajador Asignado:</h1>
						<div className='bg-purple p-4 rounded-xl'>
							<div className='flex flex-row justify-between'>
								<div className='flex flex-row items-center gap-3'>
									<div className='rounded-full w-10 h-10 overflow-hidden'>
										{
											data.Worker.profile_picture !== "NN" &&
											<Image src={data.Worker.profile_picture} alt="profile photo" width={40} height={40}/>
										}
									</div>
									<div className='font-semibold text-lg flex flex-col text-gray-lightest'>
										<p>{data.Worker.name} {data.Worker.last_name}</p>	
									</div>
								</div>
								<div className='flex flex-row items-center justify-center'>
									<p className='flex flex-row gap-1 items-center font-semibold text-gray-lightest'>{data.Worker.score}<span className='text-yellow text-lg mb-1'><AiFillStar/></span></p>
								</div>
							</div>
							<div className='flex flex-col gap-1 mt-3'>
								<p className='text-gray-lightest font-bold'>Email: <span className='font-normal'>{data.Worker.email}</span></p>
								<p className='text-gray-lightest font-bold'>Teléfono: <span className='font-normal'>{data.Worker.phone}</span></p>
								<p className='text-gray-lightest font-bold'>Dirección: <span className='font-normal'>{data.Worker.address}</span></p>
							</div>
						</div>
					</div>
					:null
				}
			</div>
		</div>
  )
}
