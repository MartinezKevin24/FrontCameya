import NavbarDashboard from "../../../components/NavbarDashboard"
import {useSelector, useDispatch} from "react-redux";
import Button from "../../../components/Button";
import {useRouter} from "next/router";
import {BiLogOut, BiEdit} from "react-icons/bi";
import {clearData} from "../../../store/User/action";
import {useEffect, useState} from "react";
import fetch from "isomorphic-fetch";
import Cookies from "universal-cookie"

export default function index(){

    const data = useSelector(state => { return state.LogIn.data});
    const [state, setState] = useState(false);
    const dispatch = useDispatch();
    const router = useRouter();
    const cookie = new Cookies();

    useEffect(()=>{
        if(state){
            cookie.remove("token", {path:"/", domain:"localhost"})
            setTimeout(()=>{
                router.reload();
            },[1000])
        }
    },[state])

    const logout = async () => {
        await dispatch(clearData());
        setState(true)
    }

    const edit = () => {
        router.push("/dashboard/perfil/edit")
    }

    return(
        <div>
            <NavbarDashboard color={"#6982f1"} shadow={true}/>
            <div className="container">
                <div className="container-inside" style={data === null ? {height: "100vh", padding: "0"} : null}>
                    {data !== null ?
                        <div className="container-singup">
                            <p className={"title"}>Perfil del Usuario</p>
                            <div className="singup">
                                <div className="hiring" >
                                    <div className="imagen">
                                        <img src={data.fotoPerfil != "null" ? data.fotoPerfil : "/perfil.png"} height={"100%"}/>
                                    </div>
                                </div>
                                <div className="freelancer">
                                    <p>Nombres: {data.nombres}</p>
                                    <p>Apellidos: {data.apellidos}</p>
                                    <p>Tipo de ID: {data.tipoDocumento}</p>
                                    <p>Identificación: {data.cedula}</p>
                                    <p>Fecha Nacimiento: {data.fechaNacimiento}</p>
                                    <p>Email: {data.email}</p>
                                    <p>Telefono: {data.telefono}</p>
                                    {data.role === "trabajadores" ? <p>Tipo de Servicio: {data.tipoServicio}</p> : null}
                                    {data.role === "trabajadores" ? <p>Detalle del Servicio: {data.detalleServicio}</p> : null}
                                    {data.role === "trabajadores" ? <p>Tarifa: {data.tarifaHora}</p> : null}
                                    <p>Puntuación: {data.puntuacion}</p>
                                </div>
                            </div>
                            <div className="button" onClick={edit}>
                                <Button text={"Editar perfil"} icon={<BiEdit/>} back={"#5db03e"} efect={"#b6f6a2"}/>
                            </div>
                            <div className="button" onClick={logout}>
                                <Button text={"Cerrar Sesión"} icon={<BiLogOut/>} back={"#ff5454"}/>
                            </div>
                        </div>
                        : null}
                </div>
            </div>

            <style jsx>{`

              .container {
                display: flex;
                justify-content: center;
                align-items: center;
                width: 100%;
                overflow: hidden;
                padding: 2rem 0;
              }

              .container-inside {
                width: 100%;
                display: flex;
                justify-content: center;
                align-items: center;
              }

              .container-singup {
                width: 60%;
                display: flex;
                justify-content: center;
                align-items: center;
                flex-direction: column;
                padding: 2rem;
                background: #bbcaf3;
                -webkit-box-shadow: 0px 7px 14px -2px rgba(0, 0, 0, 0.64);
                -moz-box-shadow: 0px 7px 14px -2px rgba(0, 0, 0, 0.64);
                box-shadow: 0px 7px 14px -2px rgba(0, 0, 0, 0.64);
              }

              .title {
                font-family: Rubik;
                font-size: 25px;
                font-weight: 600;
                margin-bottom: 2rem;
              }

              .singup {
                width: 100%;
                display: grid;
                grid-template:
                "hiring freelancer" 100%
                /50% 50%;
                margin-bottom: 1.5rem;
              }

              .hiring {
                grid-area: hiring;
              }

              .freelancer {
                grid-area: freelancer;
              }

              .hiring, .freelancer {
                width: 100%;
                justify-self: center;
                font-family: Rubik;
                font-size: 14px;
                display: flex;
                padding: 1.8rem 0;
                align-items: center;
                flex-direction: column;
                font-weight: 500;
              }
              
              .freelancer{
                align-items: flex-start;
              }
              
              .hiring {
                justify-content: center;
              }

              .imagen {
                height: 20rem;
                width: 20rem;
                overflow: hidden;
                display: flex;
                justify-content: center;
                background: darkgray;
                border-radius: 10rem;
              }

              p {
                margin: 1rem 0;
                font-size: 16px;
              }

              a {
                text-decoration: none;
                color: #2d2d2d;
                display: flex;
                justify-content: center;
                align-items: center;
              }
              
              .button{
                width: 90%;
                margin: .8rem 0;
              }

            `}</style>
        </div>
    )
}

export async function getServerSideProps(context) {

    if(context.req.headers.cookie === undefined){
        return{
            redirect: {
                destination: '/',
                permanent: false,
            }
        }
    }

    const token = context.req.headers.cookie.slice(context.req.headers.cookie.indexOf("=")+1);

    const response = await fetch("http://localhost:8080/users/auth",{
        method: "GET",
        headers: {
            'Content-Type': 'application/json',
            'authorization': token
        }
    })

    if(response.status !== 200){
        return{
            redirect: {
                destination: '/',
                permanent: false,
            }
        }
    }

    return {
        props: {}, // will be passed to the page component as props
    }
}