import Button from "components/Button";
import React, {useState} from "react";
import Link from "next/link";
import Image from "next/image";
import loginImage from "assets/Login/login-image.jpg"
import FormField from 'components/forms/FormField'
import { useDispatch } from "react-redux";
import { insertData } from "store/User/reducer"; 
import ApiRoutes from "constants/routes/api"
import jwtdecode from "jwt-decode";
import { GoogleLogin } from "@react-oauth/google";
import {useRouter} from "next/router";
import Cookies from "universal-cookie"
import axios from "axios";
import { Formik, Form } from 'formik'
import {useSelector} from "react-redux";
import * as Yup from "yup"
import { toast } from "react-toastify";

const validationSchema = Yup.object({
	"email": Yup.string()
		.email("Por favor, ingrese un email valido.")
		.required("Este campo es obligatorio."),
	"password": Yup.string()
		.required("Este campo es obligatorio.")
})

export default function LoginForm(){

	const dispatch = useDispatch();
	const { push } = useRouter();
	const cookies = new Cookies();
	const data = useSelector(state => { return state});
	const [loading, setLoading] = useState(false)

	const initialValues = {
		"email": "",
		"password": "",
	}

	const onSubmit = async (values) => {
		setLoading(true)
		axios.post(ApiRoutes.auth.login, values,  { headers: {'Content-Type': 'application/json'} })
			.then((response) => {
				cookies.set("token", response.data.token, { path: '/' });
				dispatch(insertData({data: response.data.message, token: response.data.token}))
				setLoading(false)
				push("/dashboard");
			}).catch((error) => {
				toast.error("Email o contraseña incorrectos.", {
					position: toast.POSITION.TOP_RIGHT
				});
				setLoading(false)
			})
	}

	return(
		<div className="flex flex-row justify-center md:drop-shadow-lg">
			<div className="max-w-[400px] md:w-[290px] lg:w-[350px] h-125 relative overflow-hidden rounded-s-xl">
				<div className="block w-[950px] h-156.5 absolute md:-left-52 lg:-left-40">
					<Image src={loginImage} alt="imagen de cameya" width={950} height={626} style={{objectFit: "contain"}}/>
				</div>
			</div>
			<div className="bg-white h-screen md:w-110.5 md:h-125 w-full md:rounded-e-xl flex flex-col justify-between md:gap-0">
				<div className=" px-9 pb-6 flex gap-6 flex-col">
					<h1 className="pt-8 font-bold text-3xl text-center">Log In to CameYa</h1>
					<div className="w-full flex justify-center">
						<GoogleLogin
							onSuccess={credentialResponse => {
								const decode = jwtdecode(credentialResponse.credential)
								axios.post(ApiRoutes.auth.google, decode, { headers: {'Content-Type': 'application/json'}} )
									.then((response) => console.log("Done"))
									.catch((error) => console.log(error))
							}}
							onError={() => {
								console.log('Login Failed');
							}}
						/>
					</div>
					<div className="relative flex justify-center items-center">
						<span className="w-full h-[1px] bg-gray-dark"/>
						<span className="absolute text-sm bg-white px-2">or</span>
					</div>
					<Formik onSubmit={onSubmit} initialValues={initialValues} validationSchema={validationSchema}>
						{
							({values, errors})=>(
								<Form>
									<div className="flex flex-col gap-4">
										<FormField
											name="email"
											placeholder="john@doe.com"/>
										<FormField
											name="password"
											type="password"
											placeholder="password"/>
										<Button
											loading={loading}
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