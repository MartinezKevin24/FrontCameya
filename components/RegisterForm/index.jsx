import React from 'react'
import { Formik, Form, Field } from 'formik'
import Button from 'components/Button'
import FormField from 'components/forms/FormField'
import Link from 'next/link'
import * as Yup from 'yup'

const validationSchema = Yup.object({
	"email": Yup.string()
		.email("Por favor, ingrese un email valido.")
		.required("Este campo es obligatorio."),
	"password": Yup.string()
		.required("Este campo es obligatorio.")
})

export default function RegisterForm() {

  // const dispatch = useDispatch();
	// const { push } = useRouter();
	// const cookies = new Cookies();
	// const data = useSelector(state => { return state});

	const initialValues = {
    "dni": "",
    "dni_type": "",
    "name": "",
    "last_name": "",
    "email": "",
    "password": "",
    "phone": "",
    "address": "",
    "profile_picture": "",
    "birth_date": "",
    "score": 0,
    "is_worker": false
  }

	const onSubmit = async (values) => {
		// axios.post(ApiRoutes.auth.login, values,  { headers: {'Content-Type': 'application/json'} })
		// 	.then((response) => {
		// 		cookies.set("token", response.data.token, { path: '/' });
		// 		dispatch(insertData({data: response.data.message, token: response.data.token}))
		// 		push("/dashboard");
		// 	}).catch((error) => console.log(error))
	}

  return (
    <div className="flex flex-row justify-center md:drop-shadow-lg">
			<div className="bg-white h-screen md:w-110.5 md:h-125 w-full md:rounded-xl flex flex-col justify-between md:gap-0">
				<div className=" px-9 pb-6 flex gap-6 flex-col">
					<h1 className="pt-8 font-bold text-3xl text-center">Unete a nosotros</h1>
					<div className="w-full flex justify-center">
						{/* <GoogleLogin
							onSuccess={credentialResponse => {
								const decode = jwtdecode(credentialResponse.credential)
								axios.post(ApiRoutes.auth.google, decode, { headers: {'Content-Type': 'application/json'}} )
									.then((response) => console.log("Done"))
									.catch((error) => console.log(error))
							}}
							onError={() => {
								console.log('Login Failed');
							}}
						/> */}
					</div>
					<Formik onSubmit={onSubmit} initialValues={initialValues} validationSchema={validationSchema}>
						{
							({values, errors})=>(
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
											placeholder="123xxxxxxxxx"/>
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
											placeholder="317-xxxxxxxx"/>
                    <FormField
											name="address"
                      label="Dirección"
											placeholder="Barrio - Cll xx #xx-xx "/>
										<Button
											type="submit">
												LOG IN
										</Button>
									</div>
								</Form>
							)
						}
					</Formik>
				</div>
				<div className="p-3 border-t-[1px] border-t-gray-dark">
					<p className="text-center">¿No eres miembro? <Link href={"/registrar"}><a className="text-blue">Registrate aquí</a></Link></p>
				</div>
			</div>
		</div>
  )
}
