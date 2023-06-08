import Boton from "../Botones/BotonesNavbar";
import {FaHome} from "react-icons/fa";
import Logo from 'assets/logo.png'
import {BsFillPersonFill} from "react-icons/bs";
import Image from "next/image";
import Link from 'next/link';
import {useEffect, useState} from "react";

export default function NavbarHome({color, shadow}){
	return(
		<div className="absolute bg-red w-full">
			<div className={"bg-transparent bg-red container w-full"}>
				<div className={"flex container"}>
          <div className={""}>
						<Image src={Logo} width={190} height={50} alt={"Cameya Logo"} />
					</div>
					<div className={"bg-blue flex flex-row"}>
						<Link href="/"><a><Boton text={"Home"} icon={<FaHome/>}/></a></Link>
						<Link href="/login"><a><Boton text={"Log In"} icon={<BsFillPersonFill/>}/></a></Link>
					</div>
				</div>
			</div>
		</div>
	)
}