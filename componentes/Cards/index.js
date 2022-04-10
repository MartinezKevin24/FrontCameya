import Button from "../Botones/Botones";
import {useState} from "react";
import fetch from "isomorphic-fetch";
import Alerta from "../Alertas/Error";
import {useSelector} from "react-redux";
import Cookies from "universal-cookie";
import {useRouter} from "next/router";

export default function Cards({props, eliminate, looks}){

    const [modal, setModal] = useState(false);
    const [state, setState] = useState({
        direccion: "",
        fecha: "",
        horas: 1
    });
    const [success, setSuccess] = useState({
        message: null,
        estado: null
    })
    const cookie = new Cookies();
    const data = useSelector(state => { return state.LogIn.data});
    const [error, setError] = useState(null);
    const router = useRouter();

    const handleChange = (e) => {
        setState({
            ...state,
            [e.target.name]: e.target.value
        });
    }

    const eliminar = async (e) => {

        e.preventDefault();

        setSuccess({...success,
            message: null,
            estado: null
        })

        const response = await fetch(`http://localhost:8080/services/${props.id}`, {
            method: "DELETE",
            headers: {
                'Content-Type': 'application/json',
                'authorization': cookie.get("token")
            }
        });

        const res = await response.json()
        if(res.success){
            router.reload();
        }

    }

    const newService = async (e) => {

        e.preventDefault();

        setSuccess({...success,
            message: null,
            estado: null
        })

        setError(null)

        if(state.direccion.length !==0 && state.fecha.length !==0){
            const response = await fetch("http://localhost:8080/services", {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                    'authorization': cookie.get("token")
                },
                body: JSON.stringify({
                    idCliente: data.cedula,
                    idTrabajador: props.id,
                    direccion: state.direccion,
                    fechaProgramada: state.fecha,
                    horas: state.horas,
                    estado: false,
                })
            });

            const res = await response.json();

            setSuccess({
                ...success,
                message: res.message,
                estado: res.success
            })

        }else{
            setError("Los campos son obligatorios")
        }

        setTimeout(()=>{
            setSuccess({
                ...success,
                message: null,
                estado: null
            })
            setModal(false)
        }, [6000])

    }

    return(
        <div>
            <div className={"container"}>
                {success.estado !== null ? <div className={"message"}>
                    <div className="message-inside">
                        <Alerta Message={success.message} color={success.estado}/>
                    </div>
                </div> : null}
                {eliminate || looks ?
                    <div className="container-inside">
                        <div className="nombre">
                            <p className={"name"}>{props.fecha_programada.slice(0,16)}</p>
                            <p><span>{props.direccion}</span></p>
                        </div>
                        <div className="tipo">
                            {data.role === "clientes" ? <p>Servicio: <span>{props.tipo_servicio}</span></p> : <p>Solicitante: <span>{props.nombres} {props.apellidos}</span></p>}
                        </div>
                        <div className="detalle">
                            {data.role === "clientes" ? <p>Detalle del servicio: <span>{props.detalle_servicio}</span></p> : <p>Contacto: <span>{props.telefono}</span></p>}
                        </div>
                        <div className="tarifa">
                            <p>Total: <span>${props.total}</span></p>
                        </div>
                    </div>
                    : <div className="container-inside">
                    <div className="nombre">
                        <p className={"name"}>{props.nombres} {props.apellidos}</p>
                    </div>
                    <div className="tipo">
                        <p>Servicio: {props.tipo}</p>
                    </div>
                    <div className="detalle">
                        <p>Detalle del servicio: {props.detalle_servicio}</p>
                    </div>
                    <div className="tarifa">
                        <p>Tarifa: ${props.tarifa_hora}</p>
                    </div>
                </div>}
                {eliminate ?
                    <div className="contratar" onClick={eliminar}>
                        <Button text={data.role === "clientes" ? "Cancelar": "Rechazar"} back={"#f12626"}/>
                    </div> : looks ? null :
                    <div className="contratar" onClick={()=>setModal(true)}>
                        <Button text={"Contratar"} back={"#ff5454"}/>
                    </div>}
                {modal ? <div className="container-modal">
                    <div className="container-modal-inside">
                        <div className="info">
                            <div className="form">
                                <p>Dirección:</p>
                                <input name={"direccion"} value={state.direccion} type="text" onChange={handleChange}/>
                            </div>
                            <div className="form">
                                <p>Fecha deseada:</p>
                                <input name={"fecha"} value={state.fecha} type="datetime-local" onChange={handleChange}/>
                            </div>
                            <div className="form">
                                <p>Estime una cantidad de horas a pagar:</p>
                                <input name={"horas"} value={state.horas} type="number" min={"1"} onChange={handleChange}/>
                            </div>
                            {error ? <Alerta Message={error}/> : null}
                            <div className="buttons">
                                <div className="button" onClick={newService}>
                                    <Button text={"Aceptar"} back={"#5db03e"} efect={"#b6f6a2"} size={"12px"}/>
                                </div>
                                <div className="button" onClick={()=>setModal(false)}>
                                    <Button text={"Cancelar"} back={"#fd3535"} efect={"rgba(250,135,135,0.82)"} size={"12px"}/>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>: null}
            </div>
            <style jsx>{`

              .container {
                background: blanchedalmond;
                padding: 1.5rem;
                max-width: 20rem;
                min-width: 20rem;
                -webkit-box-shadow: 0px 7px 14px -2px rgba(0, 0, 0, 0.64);
                -moz-box-shadow: 0px 7px 14px -2px rgba(0, 0, 0, 0.64);
                box-shadow: 0px 7px 14px -2px rgba(0, 0, 0, 0.64);
              }

              .container-modal {
                position: fixed;
                width: 100%;
                height: 100vh;
                background: rgba(63, 53, 53, 0.74);
                top: 0;
                left: 0;
                z-index: 900;
                display: flex;
                justify-content: center;
                align-items: center;
              }

              p {
                margin: .7rem 0;
                font-size: 14px;
                font-weight: 600;
                font-family: Rubik;
              }

              .container-modal-inside {
                width: 30rem;
                background: blanchedalmond;
                display: flex;
                align-items: center;
                justify-content: center;
                flex-direction: column;
                padding: 3rem 0;
                -webkit-box-shadow: 0px 7px 14px -2px rgba(0, 0, 0, 0.64);
                -moz-box-shadow: 0px 7px 14px -2px rgba(0, 0, 0, 0.64);
                box-shadow: 0px 7px 14px -2px rgba(0, 0, 0, 0.64);
              }

              .info {
                width: 70%;
              }

              .form {
                display: flex;
                justify-content: center;
                flex-direction: column;
                margin-bottom: 2rem;
              }

              .buttons {
                display: flex;
                justify-content: center;
                align-items: center;
                flex-direction: row;
              }

              .button {
                margin: 0 .7rem;
                width: 7rem;
              }

              .name {
                font-size: 20px;
                margin-bottom: 0;
              }

              input {
                outline: none;
                height: 18px;
                background: transparent;
                border: none;
                border-bottom: 2px solid #505050;
                padding: 0.2rem 0;
                font-size: 16px;
                width: 100%;
                margin-top: 1rem;
              }

              .contratar {
                margin-top: 1rem;
              }
              
              .message{
                position: fixed;
                z-index: 999;
                top: .0rem;
                left: 30%;
                display: flex;
                justify-content: center;
                width: 40%;
              }
              
              .message-inside{
                position: relative;
                width: 50%;
                top: -4rem;
                animation: pop-up 6s ease-in-out;
                animation-iteration-count: 1;
              }
              
              span{
                font-weight: 400;
              }
              
              @keyframes pop-up {
                0%{
                  top: -3.5rem;
                }50%{
                  top: .0rem;
                }100%{
                  top: -3.5rem;
                }
              }

            `}</style>
        </div>
    )
}

