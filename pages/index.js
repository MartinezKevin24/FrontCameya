import NavbarHome from "../componentes/NavbarHome";
import Reading from "../componentes/Reading";
import Button from "../componentes/Botones/Botones";

export default function Home() {

    const palabras = ["¡Jardinero!", "¡Cocinero!", "¡Albañil!", "¡Bartender!", "¡Profesor!", "Etc..."];

  return (
    <div>
        <div>
            <NavbarHome/>
            <div className={"containerHero"}>
                <div className={"insideHero"}>
                    <div className={"text"}>
                        <p>Permítenos ayudarte a aprovechar tus habilidades como:</p>
                    </div>
                    <div className={"maquina"}>
                        <Reading text={palabras}/>
                    </div>
                    <div className={"button"}>
                        <Button text={"Regístrate"} back={"#ff5454"} size={25}/>
                    </div>
                </div>
            </div>
        </div>
      <style jsx>{`

        .containerHero {
          background: linear-gradient(to bottom, rgba(96, 172, 215, 0.68), rgba(18, 137, 211, 0.66)), url("/homePage.jpg") no-repeat center center / cover;
          display: flex;
          justify-content: center;
          align-items: center;
          width: 100%;
          height: 85vh;
        }

        .insideHero {
          width: 80%;
          height: 100%;
          margin-top: 5vh;
          display: flex;
          justify-content: center;
          align-items: center;
          flex-direction: column;
        }

        .maquina {
          width: 80%;
        }

        .text {
          font-size: 45px;
          text-align: center;
          font-family: Rubik;
          font-weight: 600;
          color: #FAFAFA;
        }

        .button {
          margin-top: 3rem;
          width: 80%;
          height: 10rem;
        }

      `}</style>
    </div>
  )
}
