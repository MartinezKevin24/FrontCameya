import React from 'react'
import Image from 'next/image'
import {AiFillStar} from 'react-icons/ai'
import useFormats from 'hooks/formats/useFormats'
import TruncateText from 'components/Dashboard/TruncateText'
import { useRouter } from 'next/router'
import { BiEdit, BiTrash } from 'react-icons/bi'
import PageRoutes from 'constants/routes/pages'
import Link from 'next/link'
import { useRecoilState } from 'recoil';
import editService from 'atoms/services/editService';
import axios from 'axios'
import ApiRoutes from 'constants/routes/api'

export default function Cards({service, setServices, user}) {

	const { changeFormatDate } = useFormats()
	const { pathname, push } = useRouter()
	const [edit, setEdit] = useRecoilState(editService)

	const findPostulation = () =>{
		const exist = service?.WorkerPostulations.find(worker => worker.worker_dni === user.dni )
		if(exist)
			return true
		else
			return false
	}

	console.log(service)

	const handleEdit = () => {
		setEdit({
			service_title: service.service_title,
			service_description: service.service_description,
			categories: service.categories,
			client_dni: service.client_dni,
			date_programmed: service.date_programmed,
			address: service.address,
			total_price: service.total_price,
			service_status: 0,
			id: service.id,
		})
		push(`/dashboard/mis-servicios/edit/${service.id}`)
	}

	const handleRemove = () => {
		axios.delete(ApiRoutes.services.delete, { data: { id: `${service.id}` } })
			.then((response) =>{
				axios.post(ApiRoutes.services.user, { dni: user.id })
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
						setServices(array)
					})
					.catch(error => console.log(error))
			})
			.catch((error) => console.log(error))
	}

	const serviceState = () => {
		switch(service?.service_status){
			case "Not Assigned":
				return (<p className='text-gray-lightest font-bold py-1 px-2 rounded-md bg-orange-500'>NO ASIGNADO</p>)
			case "Assigned":
				return (<p className='text-gray-lightest font-bold py-1 px-2 rounded-md bg-blue-500'>ASIGNADO</p>)
			case "Completed":
				return (<p className='text-gray-lightest font-bold py-1 px-2 rounded-md bg-lime-600'>COMPLETO</p>)
			case "In Progress":
				return (<p className='text-gray-lightest font-bold py-1 px-2 rounded-md bg-gray-500'>EN PROGRESO</p>)
		}
	}

	return (
		<div className='bg-white py-6 px-6 w-full rounded-xl md:min-w-[450px] md:max-w-[1000px] flex flex-col gap-4'>
			<div className='flex flex-row items-center justify-between'>
				<div className='flex flex-row items-center justify-between gap-3'>
					<div className='rounded-full w-10 h-10 overflow-hidden'>
						{
							service.User.profile_picture !== "NN" &&
							<Image src={service.User.profile_picture} alt="profile photo" width={40} height={40}/>
						}
					</div>
					<div className='font-semibold text-sm flex flex-col'>
						<p>{service.User.name} {service.User.last_name} {service.id}</p>	
						<p className='font-light text-xs'>{changeFormatDate(service.date_programmed)}</p>
					</div>
				</div>
				<div className='flex flex-row items-center justify-center'>
					{
						[PageRoutes.dashboard.services.index].includes(pathname)
						?
						<div className='flex flex-row gap-3'>
							<p className='text-2xl text-gray-dark hover:text-red cursor-pointer' onClick={()=>handleRemove()}>
								<BiTrash/>
							</p>
							<p className='text-2xl text-gray-dark hover:text-gray-darkest cursor-pointer' onClick={()=>handleEdit()}>
								<BiEdit/>
							</p>
						</div>
						:
						<p className='flex flex-row gap-1 items-center font-semibold text-gray-dark'>{service.User.score}<span className='text-yellow text-lg mb-1'><AiFillStar/></span></p>
					}
				</div>
			</div>
			<div className='px-2 flex flex-col gap-4'>
				<div className='flex gap-1 flex-col'>
					<Link href={`${PageRoutes.dashboard.services.index}/${service.id}`} passHref>
						<h1 className='font-bold text-2xl text-gray-darkest cursor-pointer hover:text-purple'>{service.service_title}</h1>
					</Link>
					<TruncateText text={service.service_description} maxLength={300}/>
					{
						[PageRoutes.dashboard.services.index].includes(pathname) &&
						<div className='flex gap-2 items-center mb-3'>
							<span className='font-bold text-gray-darkest'>Estado: </span><span>{serviceState()}</span>
						</div>
					}
					{
						[PageRoutes.dashboard.services.index].includes(pathname) && service?.service_status === "Not Assigned" &&
						<p className='font-bold text-gray-darkest'>Postulados: <span className='text-gray-lightest font-bold py-1 px-2 rounded-md bg-purple-dark'>{service.WorkerPostulations.length}</span></p>
					}
				</div>
				<p className='text-gray-darkest font-semibold flex items-center gap-2'>Precio inicial: <span className='text-gray-lightest font-bold py-1 px-2 rounded-md bg-lime-600'>$ {service.total_price}</span></p>
				{
					user?.is_worker && findPostulation() && service?.service_status === "Not Assigned"
					?
					<div className='w-full flex py-4 bg-gray-light text-gray-darkest font-bold justify-center rounded-xl'>
						Ya estas postulado
					</div>
					:null
					}
			</div>
		</div>
	)
}
