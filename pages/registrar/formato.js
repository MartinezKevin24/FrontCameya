import NavbarHome from "../../componentes/NavbarHome";
import Botones from "../../componentes/Botones/Botones";
import FormRegistro from "../../componentes/FormRegistro";

export default function formulario(){

    return(
        <div>
            <NavbarHome color={"#8599f5"} shadow={true}/>
            <div className={"container"}>
                <div className="container-inside">
                    <FormRegistro role={"Contratista"}/>
                </div>
            </div>
            <style jsx>{`

              .container {
                width: 100%;
                display: flex;
                justify-content: center;
                background: url("/Texture.jpg") repeat;
              }

              .container-inside {
                padding: 12vh 0;
                width: 75%;
                display: flex;
                justify-content: center;
              }

            `}</style>
        </div>
    )
}