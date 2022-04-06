import NavbarHome from "../../componentes/NavbarHome";
import {useSelector, useDispatch} from "react-redux";
import Button from "../../componentes/Botones/Botones";
import {useRouter} from "next/router";
import {BiLogOut} from "react-icons/bi";
import {clearData} from "../../store/User/action";

export default function index(){

    const data = useSelector(state => { return state.LogIn.data});
    const dispatch = useDispatch();
    const router = useRouter();

    const logout = async () => {
        await dispatch(clearData());
        await router.push("/")
    }

    return(
        <div>
            <NavbarHome color={"#6982f1"} shadow={true}/>
            <div className="container">
                <div className="container-inside">
                    {data !== null ?
                        <div className="container-singup">
                            <p className={"title"}>Perfil del Usuario</p>
                            <div className="singup">
                                <div className="hiring" >
                                    <div className="imagen">
                                        <img src={"/perfil.png"} height={"100%"}/>
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
                                    {data.role === "trabajadores" ? <p>Tarifa: {data.tarifa}</p> : null}
                                    <p>Puntuación: {data.puntuacion}</p>
                                </div>
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
                background: url("/Texture.jpg") repeat;
                padding: 5rem 0;
              }

              .container-inside {
                width: 100%;
                display: flex;
                justify-content: center;
                align-items: center;
                margin-top: 5vh;
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
              }

            `}</style>
        </div>
    )
}