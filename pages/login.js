import NavbarHome from "../componentes/NavbarHome";
import Login from "../componentes/Login";

export default function login(){
    return(
        <div>
            <NavbarHome />
            <div className={"container"}>
                <div className={"formulario"}>
                    <Login/>
                </div>
            </div>

            <style jsx>{`

              .container{
                background: linear-gradient(to bottom, rgba(96, 172, 215, 0.68), rgba(18, 137, 211, 0.66)), url("/construction.jpg") no-repeat center center / cover;
                display: flex;
                flex-direction: row;
                align-items: center;
                justify-content: center;
                height: 100vh;
              }
              
              .formulario{
                width: 50%;
                margin-top: 10vh;
                display: flex;
                justify-content: center;
                align-items: center;
              }

            `}</style>
        </div>
    )
}