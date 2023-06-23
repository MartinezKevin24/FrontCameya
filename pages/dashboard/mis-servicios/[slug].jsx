import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import axios from 'axios'
import ApiRoutes from 'constants/routes/api'
import Image from 'next/image'
import useFormats from 'hooks/formats/useFormats'
import CardApplication from '@/components/Dashboard/CardApplication'

export default function ServicePage() {

  const { query } = useRouter()
  const [data, setData] = useState(null)
	const { changeFormatDate } = useFormats()

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

	const postulantes = [
		{
			name: "John",
			last_name: "Doe",
			email: "john@doe.com",
			phone: "3214567823",
			profile_picture: "https://res.cloudinary.com/aarnedoe/image/upload/v1686880006/profile_pictures/123456789.jpg",
			service_type: "carpintero",
			score: 4.8,
			service_detail: 'et odio pellentesque diam volutpat commodo sed egestas egestas fringilla phasellus faucibus scelerisque eleifend donec pretium vulputate sapien nec sagittis aliquam malesuada bibendum arcu vitae elementum curabitur vitae nunc sed velit dignissim sodales ut eu sem integer vitae justo eget magna fermentum iaculis eu non diam phasellus vestibulum lorem sed'
		},
		{
			name: "John 1",
			last_name: "Doe 1",
			email: "john1@doe.com",
			phone: "3214567823",
			profile_picture: "https://res.cloudinary.com/aarnedoe/image/upload/v1686880006/profile_pictures/123456789.jpg",
			service_type: "Pintor",
			score: 4.8,
			service_detail: 'et odio pellentesque diam volutpat commodo sed egestas egestas fringilla phasellus faucibus scelerisque eleifend donec pretium vulputate sapien nec sagittis aliquam malesuada bibendum arcu vitae elementum curabitur vitae nunc sed velit dignissim sodales ut eu sem integer vitae justo eget magna fermentum iaculis eu non diam phasellus vestibulum lorem sed'
		}
	]

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
				</div>
				{
					data.service_status === "Not Assigned" &&
					<div className='px-2 flex flex-col gap-4	'>
						<div className='border-b-2 pb-2'>
							<h1 className='font-bold text-gray-darkest text-2xl'>Postulantes</h1>
						</div>
						<div className='flex flex-col gap-3'>
							{
								postulantes.map((application, i)=><CardApplication key={i} user={application}/>)
							}
						</div>
					</div>
				}
			</div>
		</div>
  )
}
