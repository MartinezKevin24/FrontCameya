import NavbarHome from "components/Main/NavbarHome";
import LoginForm from "components/LoginForm";
import {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {clearData} from "../store/User/action";
import {useRouter} from "next/router";

export default function Login(){

	const data = useSelector(state => { return state.LogIn.data });
	const router = useRouter();

	useEffect(()=>{
		if(data){
			router.push("/dashboard")
		}
	},[])

	return(
		<div>
			<div className="min-h-screen flex justify-center items-center bg-gradient-to-b from-blue-200 to-blue-300">
				<div className="w-full h-screen md:h-auto">
					<LoginForm/>
				</div>
			</div>
		</div>
	)
}