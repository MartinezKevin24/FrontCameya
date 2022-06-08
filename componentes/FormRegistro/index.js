import Botones from "../Botones/Botones";
import {useState} from "react";
import {useSelector} from "react-redux";
import Error from "../Alertas/Error";
import fetch from "isomorphic-fetch";
import {useRouter} from "next/router";

export default function FormRegistro(){

    const roles = useSelector(state => { return state.SingUp.role });
    const router = useRouter();
    const d = new Date();

    const [state, setState] = useState({
        nombres: "",
        apellidos: "",
        tipo_id: "CC",
        id: "",
        email: "",
        password: "",
        repeat_password: "",
        tipo_servicio: "",
        detalle_servicio: "",
        tarifa: "",
        celular: "",
        fecha: ""
    })

    const [error, setError] = useState({
        id: "",
        email: "",
        password: "",
        repeat_password: "",
        tipo_servicio: "",
        tarifa: "",
        celular: "",
        fecha: ""
    })

    const [fechaVal, setFechaVal] = useState(false);

    const [result, setResult] = useState({message: "", statusResult: null});

    const handleChange = (e) => {

        if(e.target.name === "fecha"){

            let n = e.target.value;
            let a = n.split("-");
            const f1 = new Date(d.getFullYear()-18, d.getMonth(), d.getDate());
            const f2 = new Date(a[0], a[1]-1, a[2]);

            if(f2 > f1){
                setFechaVal(true);
            }else{
                setFechaVal(false);
                setError({
                    ...error,
                    fecha: ""
                })
            }

        }

        setState({...state,
            [e.target.name]: e.target.value
        });
    }

    const validar = () => {

        let id= null,
            email = null,
            password = null,
            repeat_password = null,
            tarifa = null,
            celular= null,
            fecha = null;

        if(fechaVal){
            fecha = "El usuario debe ser una persona mayor de edad";
        }

        if(!(/^[0-9]+/g).test(state.id)){
            id = "Identificación invalida";
        }

        if(!(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g).test(state.email)){
            email = "Formato de email incorrecto";
        }

        // if(!(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/g).test(state.password)){
        //     password = "La contraseña debe tener\n" +
        //             "- Minimo 8 caracteres\n" +
        //             "- Un caracter en mayuscula y uno en minuscula\n" +
        //             "- Un número";
        //     setState({...state, password: ""})
        // }

        if(roles === "Contratista"){
            if(!(/^\d+/g).test(state.tarifa)){
                tarifa= "Número invalido";
            }
        }

        // if(!(/^3(0[0-5]|1[0-9]|2[0-3]|5[0-1])[0-9]{7}$/).test(state.celular)){
        //     celular = "Ingrese un número telefonico valido de Colombia";
        // }

        if(state.password !== state.repeat_password){
            repeat_password= "Las contraseñas no coinciden";
            setState({...state, repeat_password: ""})
        }

        setError({...error,
            id,
            email,
            password,
            repeat_password,
            tarifa,
            celular,
            fecha
        });

        return !id &&
            !email &&
            !password &&
            !repeat_password &&
            !tarifa &&
            !celular &&
            !fecha;

    }

    const handleSubmit = async (e) => {

        e.preventDefault();

        setResult({
            ...result,
            message: "",
            statusResult: null
        })

        let res = null;

        const validate = validar();

        if(validate){
            if(roles === "Contratante"){

                const response = await fetch("http://localhost:8080/register/client",{
                    method: "POST",
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(
                        {
                            id: state.id,
                            email: state.email,
                            tipoDoc: state.tipo_id,
                            nombres: state.nombres,
                            apellidos: state.apellidos,
                            fechaNacimiento: state.fecha,
                            password: state.password,
                            puntuacion: null,
                            phone: state.celular
                        }
                    )});

                res = await response.json()

                setResult({
                    ...result,
                    message: res.res,
                    statusResult: res.success
                })

            }else if(roles === "Contratista"){
                const response = await fetch("http://localhost:8080/register/worker",{
                    method: "POST",
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        id: state.id,
                        email: state.email,
                        tipoDoc: state.tipo_id,
                        nombres: state.nombres,
                        apellidos: state.apellidos,
                        fechaNacimiento: state.fecha,
                        password: state.password,
                        puntuacion: null,
                        phone: state.celular,
                        tipoServicio: state.tipo_servicio,
                        detalleServicio: state.detalle_servicio,
                        tarifaHora: state.tarifa
                    })
                });

                res = await response.json()

                setResult({
                    ...result,
                    message: res.res,
                    statusResult: res.success
                })

            }
        }

        if(validate){
            setTimeout(()=>{
                router.push("/")
            },[6000])
        }

    }

    return(
        <div className={"formulario"}>
                {
                    result.statusResult !== null ?
                        <div className={"message"}>
                            <div className="message-inside">
                                <Error Message={result.message} color={result.statusResult}/>
                            </div>
                        </div> : null
                }
                <div className="title">
                    <h1>Registro de {roles}</h1>
                </div>
                <div className="data">
                    <div className="form">
                        <p>Nombres:</p>
                        <input type={"text"} name={"nombres"} value={state.nombres} onChange={handleChange}/>
                    </div>
                    <div className="form">
                        <p>Apellidos:</p>
                        <input type="text" name={"apellidos"} value={state.apellidos} onChange={handleChange}/>
                    </div>
                    <div className="form">
                        <p>Tipo de identificación:</p>
                        <select name="tipo_id" value={state.tipo_id} onChange={handleChange}>
                            <optgroup label="Tipo de identificación">
                                <option value="CC">Cédula de ciudadanía</option>
                                <option value="CE">Cédula de extranjería</option>
                                <option value="PA">Pasaporte</option>
                            </optgroup>
                        </select>
                    </div>
                    <div className="form">
                        <p>Número de identificación:</p>
                        <input type="text" name={"id"} value={state.id} onChange={handleChange}/>
                        {error.id ? <Error Message={error.id}/> : null}
                    </div>
                    <div className="form">
                        <p>Fecha de nacimiento:</p>
                        <input type="date" name={"fecha"} value={state.fecha} onChange={handleChange}/>
                        {error.fecha ? <Error Message={error.fecha}/> : null}
                    </div>
                    <div className="form">
                        <p>Email:</p>
                        <input type="text" name={"email"} value={state.email} onChange={handleChange}/>
                        {error.email ? <Error Message={error.email}/> : null}
                    </div>
                    <div className="form">
                        <p>Contraseña:</p>
                        <input type="password" name={"password"} value={state.password} onChange={handleChange}/>
                        {error.password ? <Error Message={error.password}/> : null}
                    </div>
                    <div className="form">
                        <p>Confirmar contraseña:</p>
                        <input type="password" name={"repeat_password"} value={state.repeat_password} onChange={handleChange}/>
                        {error.repeat_password ? <Error Message={error.repeat_password}/> : null}
                    </div>
                    <div className="form">
                        <p>Número celular:</p>
                        <input type="text" name={"celular"} value={state.celular} onChange={handleChange}/>
                        {error.celular ? <Error Message={error.celular}/> : null}
                    </div>
                    { roles.toLowerCase() === "contratista" ?
                        <div>
                            <div className="form">
                                <p>Tipo de servicio:</p>
                                <select name="tipo_servicio" value={state.tipo_servicio} onChange={handleChange}>
                                    <optgroup label="Categoría de servicios">
                                        <option value="Arte">Arte</option>
                                        <option value="Culinario">Culinario</option>
                                        <option value="Tutorias">Tutorías</option>
                                        <option value="Limpieza">Limpieza</option>
                                        <option value="Obrero">Obrero</option>
                                        <option value="Transporte">Transporte</option>
                                    </optgroup>
                                </select>
                            </div>
                            <div className="form">
                                <p>Detalle del servicio:</p>
                                <input type="text" name={"detalle_servicio"} value={state.detalle_servicio} onChange={handleChange}/>
                                {error.tipo_servicio ? <Error Message={error.tipo_servicio}/> : null}
                            </div>
                            <div className="form">
                                <p>Promedio tarifa por hora:</p>
                                <input type="text" name={"tarifa"} value={state.tarifa} onChange={handleChange}/>
                                {error.tarifa ? <Error Message={error.tarifa}/> : null}
                            </div>
                        </div>

                        : null}
                    <div className="form-button" onClick={handleSubmit}>
                        <Botones size={"100%"} text={"Regístrar"} back={"#ff5454"} />
                    </div>
                </div>
            <style jsx>{`

              .formulario {
                background: #bbcaf3;
                padding: 3rem 0;
                display: flex;
                width: 60%;
                flex-direction: column;
                justify-content: center;
                align-items: center;
                -webkit-box-shadow: 0px 7px 14px -2px rgba(0, 0, 0, 0.64);
                -moz-box-shadow: 0px 7px 14px -2px rgba(0, 0, 0, 0.64);
                box-shadow: 0px 7px 14px -2px rgba(0, 0, 0, 0.64);
              }

              .data {
                width: 70%;
                padding: 1rem 0;
              }

              .title {
                font-family: Rubik;
                font-weight: 800;
                color: #505050;
              }

              .form {
                margin: 1.2rem 0;
                font-family: Rubik;
                font-size: 14px;
                width: 100%;
              }

              .form-button {
                margin-top: 2rem;
              }

              select {
                width: 100%;
                height: 2rem;
                font-family: Rubik;
                font-size: 14px;
                font-weight: 500;
                outline: none;
                border: 1px solid #505050;
                padding: 0.2rem 0;
                margin-top: 8px;
              }

              p {
                margin-bottom: .4rem;
                font-weight: 600;
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

