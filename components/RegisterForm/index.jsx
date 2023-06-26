import React, {useState} from 'react'
import { Formik, Form, Field } from 'formik'
import Button from 'components/Button'
import FormField from 'components/forms/FormField'
import * as Yup from 'yup'
import DateField from 'components/forms/DateField'
import Switch from 'react-switch'
import FormError from 'components/forms/FormError'
import { useRouter } from 'next/router'
import axios from 'axios'
import ApiRoutes from 'constants/routes/api'
import {toast} from 'react-toastify'

const validationSchema = Yup.object({
	name: Yup.string()
		.required('El campo de nombres es obligatorio'),
  last_name: Yup.string()
		.required('El campo de apellidos es obligatorio'),
  dni_type: Yup.string()
		.required('Debe seleccionar un tipo de identificación'),
  dni: Yup.number()
		.required('El campo de número de identificación es obligatorio'),
  email: Yup.string()
		.email('Ingrese un correo electrónico válido')
		.required('El campo de email es obligatorio'),
  password: Yup.string()
		.required('El campo de contraseña es obligatorio')
		.min(8, 'La contraseña debe tener al menos 8 caracteres'),
  phone: Yup.number()
		.required('El campo de teléfono es obligatorio'),
	is_worker: Yup.boolean()
		.required(),
	service_type: Yup.string()
		.when('is_worker', {
			is: true,
			then: ()=>Yup.string().required('El campo de tipo de servicio es obligatorio'),
	}),
	service_detail: Yup.string()
		.when('is_worker', {
			is: true,
			then: ()=>Yup.string().required('El campo de detalle del servicio es obligatorio'),
	}),
  address: Yup.string()
		.required('El campo de dirección es obligatorio'),
	birth_date: Yup
		.date()
		.max(new Date(), 'La fecha no puede ser futura')
		.required('La fecha de nacimiento es obligatoria')
		.test('edad', 'Debes tener al menos 18 años', function (value) {
			const today = new Date();
			const birthDate = new Date(value);
			const age = today.getFullYear() - birthDate.getFullYear();
			const monthDiff = today.getMonth() - birthDate.getMonth();

			if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
				return age - 1 >= 18;
			}

			return age >= 18;
		}),
})

export default function RegisterForm() {

	const { push } = useRouter();

	const [worker, setWorker] = useState(false);
	const [loading, setLoading] = useState(false)

	const initialValues = {
    "dni": "",
    "dni_type": "",
    "name": "",
    "last_name": "",
    "email": "",
    "password": "",
    "phone": "",
    "address": "",
    "profile_picture": null,
    "birth_date": "",
    "score": 4.0,
    "is_worker": false,
		"service_type": "",
		"service_detail": "",
		"rate_hour": 5000
  }

	const onSubmit = async (values) => {
		setLoading(true)
		
		const form_values = {
			...values,
			dni: values.dni.toString(),
			phone: values.phone.toString()
		}

		axios.post(ApiRoutes.auth.register, form_values,  { headers: {'Content-Type': 'application/json'} })
			.then((response) => {
				toast.success("Usuario registrado exitosamente!", {
					position: toast.POSITION.TOP_RIGHT
				});
				setTimeout(()=>{
					push("/login");
				}, 2000)
				setLoading(false)
			}).catch((error) => {
				if(error?.response?.data?.message){
					toast.error(error?.response?.data?.message, {
						position: toast.POSITION.TOP_RIGHT,
					})
				}
				setLoading(false)
			})
	}

  return (
    <div className="flex flex-row justify-center md:drop-shadow-lg">
			<div className="bg-white h-screen md:my-4 md:w-120.4 md:h-full w-full md:rounded-xl flex flex-col justify-between md:gap-0">
				<div className=" px-9 pb-6 flex gap-6 flex-col">
					<h1 className="pt-5 font-bold text-3xl text-center">Unete a nosotros</h1>
					<Formik onSubmit={onSubmit} initialValues={initialValues} validationSchema={validationSchema}>
						{
							({values, setFieldValue})=>(
								<Form>
									<div className="flex flex-col gap-4">
										<FormField
											name="name"
                      label="Nombres"
											placeholder="John"/>
										<FormField
											name="last_name"
                      label="Apellidos"
											placeholder="Doe"/>
                    <div>
                      <label htmlFor="dni_type" className='text-gray-darkest font-bold'>Tipo de identificación</label>
                      <Field as="select" name="dni_type" id="dni_type"
                        className={"border-gray-dark rounded-sm border-[1px] py-[7.5px] w-full outline-none"}>
                        <option disabled value="">Tipo de documento</option>
                        <option value={"CC"}>Cédula de ciudadania</option>
                        <option value={"PS"}>Pasaporte</option>
                        <option value={"CE"}>Cédula de extranjería</option>
                        <option value={"DNI"}>Documento Nacional de Identidad</option>
                      </Field>
                    </div>
                    <FormField
											name="dni"
                      label="Numero de indentificación"
											type="number"
											placeholder="123XXXXXXXX"/>
                    <FormField
											name="email"
                      label="Email"
											placeholder="John@doe.com"/>
                    <FormField
											name="password"
                      label="Contraseña"
                      type="password"
											placeholder="Contraseña"/>
                    <FormField
											name="phone"
                      label="Telefonó"
                      type="number"
											placeholder="317-XXXXXXX"/>
                    <FormField
											name="address"
                      label="Dirección"
											placeholder="Barrio - Cll XX #XX-XX "/>
										<div>
											<label htmlFor="birth_date" className='font-bold text-gray-darkest'>Fecha de nacimiento</label>
											<Field
												name="birth_date"
												component={DateField}/>
										</div>
										<div className='flex flex-row items-center gap-3'>
											<Switch onChange={(value)=>{
												setFieldValue("is_worker", value)
												setWorker(value)
											}} checked={worker} />
											<p className='font-bold text-gray-darkest'>¿Quieres ser trabajador?</p>
										</div>
										{
											worker &&
											<div className='flex flex-col gap-4'>
												<div>
													<label htmlFor="service_type" className='font-bold text-gray-darkest'>Categoría de especialidad</label>
													<Field 
														as="select" 
														name="service_type"
														className='w-full border-[1px] border-gray-darkest px-2 py-2 text-gray-darkest outline-none'>
														<option value="carpinteria">Carpintería</option>
														<option value="plomeria">Plomería</option>
														<option value="electricidad">Electricidad</option>
														<option value="albañileria">Albañilería</option>
														<option value="pintura">Pintura</option>
														<option value="jardineria">Jardinería</option>
														<option value="limpieza">Limpieza</option>
														<option value="cerrajeria">Cerrajería</option>
														<option value="cuidado de mascotas">Cuidado de mascotas</option>
														<option value="llantería">Llantería</option>
													</Field>
													<FormError name={"service_type"}/>
												</div>	
												<div>
													<label htmlFor="service_detail" className='font-bold text-gray-darkest'>Detalle del servicio</label>
													<Field 
														name='service_detail'
														id='service_detail'
														as='textarea'
														placeholder='Detail' 
														className={"w-full outline-none px-2 py-1 border-[1px] border-gray-darkest resize-none h-20 text-gray-darkest"}/>
													<FormError name={"service_detail"}/>
												</div>
											</div>
										}
										<Button
											type="submit">
												{loading ? "Loading..." : "Registrar"}
										</Button>
									</div>
								</Form>
							)
						}
					</Formik>
				</div>
			</div>
		</div>
  )
}
