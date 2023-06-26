import AdminLoginForm from "components/AdminLoginForm";
import { IoArrowBackOutline } from 'react-icons/io5'
import Link from "next/link";

export default function AdminLogin(){

	return(
		<div className="min-h-screen flex relative justify-center items-center bg-gradient-to-b from-blue-200 to-blue-300">
			<Link href={"/"} passHref>
				<div className="bg-purple px-2 py-2 text-2xl font-bold text-gray-lightest cursor-pointer absolute 
					top-4 left-4 rounded-lg flex flex-row gap-2">
					<IoArrowBackOutline/> <span className="text-lg md:block hidden">Home</span>
				</div>
			</Link>
			<div className="w-full h-screen md:h-auto">
				<AdminLoginForm/>
			</div>
		</div>
	)
}