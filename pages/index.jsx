import Image from "next/image";
import Designerimage from "assets/Home/undraw_designer_re_5v95.svg"
import HireImage from "assets/Home/undraw_hiring_re_yk5n.svg"
import Reading from "../components/Reading";
import NavbarHome from "components/Main/NavbarHome";
import FooterHome from "components/Main/FooterHome";
import Link from "next/link";

//Tener en cuenta color: #B35B8F

export default function Home() {

  const palabras = ["¡Jardinero!", "¡Cocineros!", "¡Carpintero!", "¡Bartender!", "¡Mecánicos!"];

  return (
    <div>
			<div>
				<div>
					<NavbarHome/>
				</div>
				<div className="h-[100vh] relative">
					<div className={"w-full h-full bg-gradient-to-b from-blue-900 via-blue-800 to-blue-500 flex items-center relative"}>
						<div className="md:flex md:flex-row md:justify-between w-full container">
							<div className="flex flex-col justify-center gap-y-8 p-6 md:p-0">
								<div className={"text-5xl font-bold flex flex-col justify-center text-white leading-tight"}>
									<p>Encuentra el talento <span className="italic font-bold">perfecto</span></p>
									<p>para cada <span className="italic">proyecto</span>.</p>
								</div>
								<div className="md:w-3/5 w-full">
									<p className="italic text-white leading-[1px]">contacta o empleate como:</p>
									<Reading text={palabras}/>
								</div>
							</div>
							<div className="relative hidden md:flex">
								<div>
									<Image src={Designerimage} alt="Freelance" width={450} height={450}/>
								</div>
								<div className="absolute -bottom-0 -left-36">
									<Image src={HireImage} alt="Hiring" width={290} height={290}/>
								</div>
							</div>
						</div>
						<div className="absolute bottom-0 w-full">
							<FooterHome/>
						</div>
					</div>
				</div>
				<div>
				</div>
			</div>
    </div>
  )
}
