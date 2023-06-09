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
		<div className="flex flex-row">
			<div className="w-103 h-156.5 relative overflow-hidden rounded-s-xl">
				<div className="block w-[950px] h-156.5 absolute -left-24">
					<Image src={loginImage} alt="imagen de logo" width={950} height={626} style={{objectFit: "contain"}}/>
				</div>
			</div>
			<div className="bg-white md:w-110.5 h-156.5 rounded-e-xl">
				<div className=" px-9 pb-6">
					<h1 className="py-8 font-bold text-3xl text-center">Log In to CameYa</h1>
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