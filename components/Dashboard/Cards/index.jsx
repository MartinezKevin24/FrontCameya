import Services from '@/pages/dashboard/services'
import React from 'react'
import Image from 'next/image'
import {AiFillStar} from 'react-icons/ai'
import useFormats from 'hooks/formats/useFormats'

export default function Cards({service, iterator}) {

	const { changeFormatDate } = useFormats()

	return (
		<div className='bg-white py-6 px-6 w-full rounded-xl md:min-w-[450px] md:max-w-[650px] flex flex-col gap-4'>
			<div className='flex flex-row items-center justify-between'>
				<div className='flex flex-row items-center justify-between gap-3'>
					<div className='rounded-full w-10 h-10 overflow-hidden'>
						<Image src={service.User.profile_picture} alt="profile photo" width={40} height={40}/>
					</div>
					<div className='font-semibold text-sm flex flex-col'>
						<p>{service.User.name} {service.User.last_name}</p>	
						<p className='font-light text-xs'>{changeFormatDate(service.date_assignment)}</p>
					</div>
				</div>
				<div className='flex flex-row items-center justify-center'>
					<p className='flex flex-row gap-1 items-center font-semibold text-gray-dark'>4.5 <span className='text-yellow text-lg mb-1'><AiFillStar/></span></p>
				</div>
			</div>
			<div className='px-2 flex flex-col gap-4'>
				<div className='flex gap-1 flex-col'>
					<h1 className='font-bold text-2xl text-gray-darkest'>Titulo quemado {iterator + 1}</h1>
					<p className='text-gray-dark'>{service.service_description}</p>
				</div>
				<p className='text-gray-darkest font-semibold flex items-center gap-2'>Precio inicial: <span className='text-gray-lightest font-bold py-1 px-2 rounded-md bg-lime-600'>$ {service.total}</span></p>
			</div>
		</div>
	)
}
