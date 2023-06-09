import {FaHome} from "react-icons/fa";
import Logo from 'assets/logo.png'
import {HiMenu, HiOutlineX} from "react-icons/hi"
import LogoNegativo from 'assets/LogoNegativo.png'
import {BsFillPersonFill} from "react-icons/bs";
import Image from "next/image";
import Link from 'next/link';
import {useState, useRef} from "react";
import classNames from "classnames";

export default function NavbarHome(){

	const [menu, setMenu] = useState(0);
	const containerOptions = useRef(null)

	const handleMenu = () => {

		if(menu === 0)
			setMenu(true)
		else
			setMenu(!menu)

		if(menu){
			setTimeout(() => {
				containerOptions.current.classList.toggle("left-0")
				containerOptions.current.classList.toggle("-left-full")
			}, [500])
		}

	}

	return(
		<div className="fixed z-50 w-full py-4">
			<div className="relative">
				<div className="bg-transparent container w-full">
					<div className="flex container justify-between">
						<div>
							<Image src={LogoNegativo} width={190} height={50} alt={"Cameya Logo"} />
						</div>
						<div className="hidden md:flex md:flex-row">
							<ul className="flex flex-row gap-x-10 items-center">
								<li><Link href="/"><a className="flex flex-row items-center gap-x-2 text-lg text-white font-light"><FaHome/>Home</a></Link></li>
								<li><Link href="/login"><a className="flex flex-row items-center gap-x-2 text-lg text-white font-light"><BsFillPersonFill/>Log In</a></Link></li>
							</ul>
						</div>
						<div className="flex md:hidden items-center">
							<p className="text-white text-3xl cursor-pointer" onClick={()=>handleMenu()}>{menu ? <HiOutlineX/> : <HiMenu/>}</p>
							<div ref={containerOptions} className={classNames(["absolute top-16 left-0", { "hidden" : menu === 0}, { "animate-slideInRight" : !menu }, { "animate-slideInLeft" : menu}])}>
								<ul className="w-screen bg-slate-800 p-5 flex flex-col gap-5">
									<li><Link href="/"><a className="flex flex-row justify-center items-center gap-x-2 text-lg text-white font-light"><FaHome/>Home</a></Link></li>
									<li><Link href="/login"><a className="flex flex-row justify-center items-center gap-x-2 text-lg text-white font-light"><BsFillPersonFill/>Log In</a></Link></li>
								</ul>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}