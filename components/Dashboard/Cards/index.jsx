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

export default function Cards({service}) {

	const { changeFormatDate } = useFormats()
	const { pathname, push } = useRouter()
	const [edit, setEdit] = useRecoilState(editService)

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
						<p>{service.User.name} {service.User.last_name}</p>	
						<p className='font-light text-xs'>{changeFormatDate(service.date_programmed)}</p>
					</div>
				</div>
				<div className='flex flex-row items-center justify-center'>
					{
						[PageRoutes.dashboard.services].includes(pathname)
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
					<Link href={`${PageRoutes.dashboard.services}/${service.id}`} passHref>
						<h1 className='font-bold text-2xl text-gray-darkest cursor-pointer hover:text-purple'>{service.service_title}</h1>
					</Link>
					<TruncateText text={service.service_description} maxLength={300}/>
				</div>
				<p className='text-gray-darkest font-semibold flex items-center gap-2'>Precio inicial: <span className='text-gray-lightest font-bold py-1 px-2 rounded-md bg-lime-600'>$ {service.total_price}</span></p>
			</div>
		</div>
	)
}
