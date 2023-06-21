import NavbarHome from "components/Main/NavbarHome";
import LoginForm from "components/LoginForm";
import {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import { IoArrowBackOutline } from 'react-icons/io5'
import {useRouter} from "next/router";
import Link from "next/link";
import PageRoutes from "constants/routes/pages";

export default function Login(){

	// const data = useSelector(state => { return state.LogIn.data });
	// const router = useRouter();

	// useEffect(()=>{
	// 	if(data){
	// 		router.push("/dashboard")
	// 	}
	// },[])

	return(
		<div className="min-h-screen flex relative justify-center items-center bg-gradient-to-b from-blue-200 to-blue-300">
			<Link href={"/"} passHref>
				<div className="bg-purple px-2 py-2 text-2xl font-bold text-gray-lightest cursor-pointer absolute 
					top-4 left-4 rounded-lg flex flex-row gap-2">
					<IoArrowBackOutline/> <span className="text-lg md:block hidden">Home</span>
				</div>
			</Link>
			<div className="w-full h-screen md:h-auto">
				<LoginForm/>
			</div>
		</div>
	)
}