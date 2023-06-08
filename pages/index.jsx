import NavbarHome from "../componentes/NavbarHome";
import Image from "next/image";
import Designerimage from "assets/Home/undraw_designer_re_5v95.svg"
import HireImage from "assets/Home/undraw_hiring_re_yk5n.svg"
import Reading from "../componentes/Reading";
import Button from "../componentes/Botones/Botones";
import Link from "next/link";

//Tener en cuenta color: #B35B8F

export default function Home() {

    const palabras = ["¡Jardinero!", "¡Cocinero!", "¡Albañil!", "¡Bartender!", "¡Profesor!", "Etc..."];

  return (
    <div>
			<div>
				<NavbarHome/>
				<div className={"containerHero"}>
					<div className={"w-full h-[700px] bg-blue-600 flex items-center"}>
						<div className="md:flex md:flex-row md:justify-between w-full container">
							<div className="flex flex-col justify-center gap-y-6">
								<div className={"text-5xl font-bold flex flex-col justify-center text-white leading-tight"}>
									<p>Encuentra el talento <span className="italic font-bold">perfecto</span></p>
									<p>para cada <span className="italic">proyecto</span>.</p>
								</div>
								<div className="w-3/5">
									<Reading text={palabras}/>
								</div>
							</div>
							<div className="relative">
								<div>
									<Image src={Designerimage} alt="Freelance" width={450} height={450}/>
								</div>
								<div className="absolute -bottom-0 -left-36">
									<Image src={HireImage} alt="Hiring" width={290} height={290}/>
								</div>
							</div>
						</div>
						{/* <div className={"maquina"}>
								<Reading text={palabras}/>
						</div> */}
						{/* <div className={"button"}>
								<Link href={"registrar"}><a><Button text={"Regístrate"} back={"#ff5454"} size={25}/></a></Link>
						</div> */}
					</div>
				</div>
			</div>
    </div>
  )
}
