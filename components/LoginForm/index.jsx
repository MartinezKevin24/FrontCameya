import Button from "components/Button";
import Link from "next/link";
import Image from "next/image";
import loginImage from "assets/Login/login-image.jpg"
import FormField from 'components/forms/FormField'
import {useEffect, useState} from "react";
import {useDispatch} from "react-redux";
import {insertData} from "../../store/User/action";
import fetch from "isomorphic-fetch";
import Error from "../Alertas/Error"
import jwtdecode from "jwt-decode";
import { GoogleLogin } from "@react-oauth/google";
import {useRouter} from "next/router";
import Cookies from "universal-cookie"
import { Formik, Form, Field } from 'formik'

export default function LoginForm(){

	const dispatch = useDispatch();
	const router = useRouter();
	const cookies = new Cookies();

	const [data, setData] = useState({
		email: "",
		password: "",
		role: "clientes"
	});

	const initialValues = {
		email: "",
		password: "",
	}

	const [error, setError] = useState(null);
	const [success, setSuccess] = useState({
		message: null,
		statusResult: null,
		token: null,
		data:null,
		ready: false
	});

	useEffect(()=> {
		if(success.ready){
			router.push("/dashboard")
		}
	},[success.ready])

	const handleChange = (e) => {
		setData({
			...data,
			[e.target.name]: e.target.value
		})
	}

	const validar = () => {

		let email = null;

		if(!(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g).test(data.email)){
			email = "Formato de email incorrecto";
		}

		setError(email)

		return !email

	}

	const handleSubmit = async(e) => {

		e.preventDefault();

		let res = null;

		setSuccess({
				...success,
				message: null,
				statusResult: null,
				token: null,
				data: null
		})

		if(validar()){
			const response = await fetch("http://localhost:8080/login",{
				method: "POST",
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({
					email: data.email,
					password: data.password,
					table: data.role
				})
			})

			res = await response.json();

			setSuccess({
				...success,
				message: res.message,
				statusResult: res.success,
				token: res.token,
				data: res.data
			})

			if(res.success){
				cookies.set("token", res.token, { path: '/' });
				await dispatch(insertData({data: res.data, token: res.token}))
				setTimeout(()=>{
						console.log("1x",success)
						setSuccess({
								...success,
								message: res.message,
								statusResult: res.success,
								token: res.token,
								data: res.data,
								ready: true
						})
				}, [2000])
			}

		}

	}

	return(
		<div className="flex flex-row justify-center md:drop-shadow-lg">
			<div className="max-w-[400px] md:w-[290px] lg:w-[350px] h-125 relative overflow-hidden rounded-s-xl">
				<div className="block w-[950px] h-156.5 absolute md:-left-52 lg:-left-40">
					<Image src={loginImage} alt="imagen de logo" width={950} height={626} style={{objectFit: "contain"}}/>
				</div>
			</div>
			<div className="bg-white h-screen md:w-110.5 md:h-125 w-full md:rounded-e-xl flex flex-col justify-between md:gap-0">
				<div className=" px-9 pb-6 flex gap-6 flex-col">
					<h1 className="py-8 font-bold text-3xl text-center">Log In to CameYa</h1>
					<GoogleLogin
						onSuccess={credentialResponse => {
							const decode = jwtdecode(credentialResponse.credential)
							console.log(decode);
						}}
						onError={() => {
							console.log('Login Failed');
						}}
						
					/>
					<div className="relative flex justify-center items-center">
						<span className="w-full h-[1px] bg-gray-dark"/>
						<span className="absolute text-sm bg-white px-2">or</span>
					</div>
					<Formik onSubmit={handleSubmit} initialValues={initialValues}>
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