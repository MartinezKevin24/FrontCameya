import Boton from "../Botones/BotonesNavbar";
import {FaHome} from "react-icons/fa";
import {BsFillPersonFill} from "react-icons/bs";
import Link from 'next/link';
import {useEffect, useState} from "react";

export default function NavbarHome({color, shadow}){

    const [estilos, SetEstilos] = useState({})

    useEffect(()=>{
        if(shadow){
            SetEstilos({
                boxShadow: "0px 7px 14px -2px rgba(0,0,0,0.45)",
                background: `${color}`
            })
        }else{
            SetEstilos({
                background: `${color}`
            })
        }
    },[])

    return(
        <div>

            <div className={"container"} style={estilos}>
                <div className={"container-inside"}>
                    <div className={"logo"}>
                        <img src={"/logo.png"} width="250px"/>
                    </div>
                    <div className={"buttons"}>
                        <Link href="/"><a><Boton text={"Home"} icon={<FaHome/>}/></a></Link>
                        <Link href="/login"><a><Boton text={"Log In"} icon={<BsFillPersonFill/>}/></a></Link>
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
              
              a{
                text-decoration: none;
              }

            `}</style>
        </div>
    )
}