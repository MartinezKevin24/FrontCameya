import Boton from "../Botones/BotonesNavbar";
import {BiLogOut} from "react-icons/bi";
import {useEffect, useState} from "react";
import {FaUserAlt, FaHandsHelping} from "react-icons/fa";
import {clearData} from "../../store/User/action";
import {useDispatch} from "react-redux";
import Cookies from "universal-cookie";

export default function NavbarHome({color, shadow}){

    const [estilos, SetEstilos] = useState({})
    const [state, setState] = useState(false);
    const dispatch = useDispatch();
    const cookie = new Cookies();

    const logout = async () => {
        await dispatch(clearData());
        setState(true)
    }

    useEffect(()=>{
        if(state){
            cookie.remove("token")
            router.reload();
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
                        <Boton text={"Perfil"} icon={<FaUserAlt/>}/>
                        <Boton text={"Servicios"} icon={<FaHandsHelping/>}/>
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