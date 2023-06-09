import Boton from "../Button/BotonesNavbar";
import {BiLogOut} from "react-icons/bi";
import {useEffect, useState} from "react";
import {FaUserAlt, FaHandsHelping, FaHome} from "react-icons/fa";
import {clearData} from "../../store/User/action";
import {useDispatch} from "react-redux";
import Cookies from "universal-cookie";
import {useRouter} from "next/router";
import Link from "next/link";

export default function NavbarHome({color, shadow}){

    const [estilos, SetEstilos] = useState({})
    const [state, setState] = useState(false);
    const dispatch = useDispatch();
    const cookie = new Cookies();
    const router = useRouter();

    const logout = async () => {
        await dispatch(clearData());
        setState(true)
    }

    useEffect(()=>{
        if(state){
            cookie.remove("token", {path:"/", domain:"localhost"})
            setTimeout(()=>{
                router.reload();
            },[1000])
        }
    },[state])

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
                        <Link href={"/dashboard"}><a><Boton text={"Home"} icon={<FaHome/>}/></a></Link>
                        <Link href={"/dashboard/perfil"}><a><Boton text={"Perfil"} icon={<FaUserAlt/>}/></a></Link>
                        <Link href={"/dashboard/services"}><a><Boton text={"Servicios"} icon={<FaHandsHelping/>}/></a></Link>
                        <div onClick={logout}><Boton text={"Log Out"} icon={<BiLogOut/>}/></div>
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
                z-index: 900;
              }

              .container-inside {
                display: flex;
                width: 90%;
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