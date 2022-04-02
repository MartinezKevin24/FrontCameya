import Boton from "../Botones/BotonesNavbar";
import {FaHome} from "react-icons/fa";
import {BsFillPersonFill} from "react-icons/bs";

export default function NavbarHome(){
    return(
        <div>

            <div className={"container"}>
                <div className={"container-inside"}>
                    <div className={"logo"}>
                        <img src={"/logo.png"} width="250px"/>
                    </div>
                    <div className={"buttons"}>
                        <Boton text={"Home"} icon={<FaHome/>}/>
                        <Boton text={"LogIn"} icon={<BsFillPersonFill/>}/>
                    </div>
                </div>
            </div>

            <style jsx>{`

              .container {
                background: rgba(4, 87, 122, 0);
                width: 100%;
                display: flex;
                justify-content: center;
                align-items: center;
                color: #414141;
                position: fixed;
                z-index: 900;
                
              }

              .container-inside {
                display: flex;
                width: 80%;
                height: 100%;
                flex-direction: row;
                justify-content: space-between;
              }

              .buttons {
                display: flex;
                flex-direction: row;
                align-items: center;
                justify-content: flex-end;
              }

            `}</style>
        </div>
    )
}