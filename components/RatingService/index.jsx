import React from 'react'
import Button from 'components/Button'
import { FaStar } from 'react-icons/fa';
import { useFormik } from 'formik';
import { toast } from 'react-toastify';
import { useSelector } from 'react-redux';
import axios from 'axios'
import ApiRoutes from 'constants/routes/api';
import { useRouter } from 'next/router';
import PageRoutes from 'constants/routes/pages';

export default function RatingService({id, setFinished}) {

  const user = useSelector(state => state?.login?.value?.data)
  const {push} = useRouter()

  const handleFinishService = () => {

		let url;

		if(user?.is_worker)
			url = ApiRoutes.services.terminateWorkerService
		else
			url = ApiRoutes.services.terminateUserService
		
		axios.put(url, {service_id: id})
			.then((response) => {
        toast.success("Gracias por utilizar nuestros servicios 😎.", {
          position: toast.POSITION.TOP_RIGHT
        });
        setFinished(false)
        push(PageRoutes.dashboard.services.index)
			})
			.catch((err) => {
				console.log(err)
			})

	}

  const formik = useFormik({
    initialValues: {
      rating: 0,
    },
    onSubmit: (values) => {

      let url

      if(user?.is_worker)
        url = ApiRoutes.services.ratingWorker
      else
        url = ApiRoutes.services.ratingUser

      axios.put(url, { dni: user.dni, service_id: id, score: values.rating})
        .then(response => {
          handleFinishService()
        })
        .catch(error => {
          console.log(error)
        })

    },
  });

  const handleStarHover = (rating) => {
    formik.setFieldValue('rating', rating);
  };

  return (
    <div className='fixed top-0 left-0 z-50 w-full h-full flex justify-center items-center bg-container'>
      <div className='w-11/12 md:w-4/6 bg-white py-6 px-2 md:px-4 relative rounded-lg'>
        <div className='container'>
          <h1 className='w-full text-gray-darkest font-bold text-center text-2xl'>Por favor, califica el servicio</h1>
        <form onSubmit={formik.handleSubmit}>
          <div className='flex flex-row py-10 w-full justify-center gap-4'>
            {[1, 2, 3, 4, 5].map((rating) => (
              <label key={rating}>
                <input
                  type="radio"
                  name="rating"
                  value={rating}
                  checked={formik.values.rating === rating}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  style={{ display: 'none'}}
                />
                <FaStar
                  className="star-icon hover:cursor-pointer"
                  size={24}
                  color={rating <= formik.values.rating ? '#ffc107' : '#e4e5e9'}
                  onMouseEnter={() => handleStarHover(rating)}
                  onMouseLeave={() => handleStarHover(formik.values.rating)}
                />
              </label>
            ))}
          </div>
        <Button 
          color={"green"}
          type={"submit"}>
          Calificar
        </Button>
      </form>
        </div>
      </div>
      <style jsx>{`

        .bg-container{
          background: rgba(20, 20, 20, 0.50);
        }

      `}</style>
    </div>
  )
}
