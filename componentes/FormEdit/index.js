import Botones from "../Botones/Botones";
import {useState} from "react";
import {useSelector, useDispatch} from "react-redux";
import Error from "../Alertas/Error";
import fetch from "isomorphic-fetch";
import {useRouter} from "next/router";
import Cookies from "universal-cookie";
import {insertData} from "../../store/User/action";
import axios from "axios";

export default function FormEdit(){

    const data = useSelector(state => { return state.LogIn.data });
    const dispatch = useDispatch();
    const router = useRouter();
    const cookie = new Cookies();

    const [state, setState] = useState({
        password: "",
        repeat_password: "",
        tipo_servicio: data.tipoServicio,
        detalle_servicio: data.detalleServicio,
        tarifa: data.tarifaHora,
        celular: data.telefono ,
        imagen: data.foto_perfil
    })

    const [error, setError] = useState({
        password: "",
        repeat_password: "",
        tipo_servicio: "",
        tarifa: "",
        celular: "",
        imagen: ""
    })

    const [result, setResult] = useState({message: "", statusResult: null});

    const handleChange = (e) => {

        if(e.target.name === "imagen"){
            setState({...state,
                [e.target.name]: e.target.files
            })
        }else{
            setState({...state,
                [e.target.name]: e.target.value
            });
        }
    }

    const validar = () => {

        let password = null,
            repeat_password = null,
            tarifa = null,
            celular= null,
            imagen = null;

        // if(!(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/g).test(state.password)){
        //     password = "La contraseña debe tener\n" +
        //             "- Minimo 8 caracteres\n" +
        //             "- Un caracter en mayuscula y uno en minuscula\n" +
        //             "- Un número";
        //     setState({...state, password: ""})
        // }

        if(!(/(?:png|jpg|jpeg)/g).test(state.imagen[0].name)){
            imagen = "El formato ingresa de imagen no es valido, intenta " +
                "con un formato: png, jpg o jpeg";
        }

        if(data.role === "trabajadores"){
            if(!(/^\d+/g).test(state.tarifa)){
                tarifa= "Número invalido";
            }
        }

        // if(!(/^3(0[0-5]|1[0-9]|2[0-3]|5[0-1])[0-9]{7}$/).test(state.celular)){
        //     celular = "Ingrese un número telefonico valido de Colombia";
        // }

        if(state.password === ""){
            password = "Campo obligatorio, ingrese una nueva o antigua contraseña";
        }

        if(state.password !== state.repeat_password){
            repeat_password= "Las contraseñas no coinciden";
            setState({...state, repeat_password: ""})
        }

        setError({...error,
            password,
            repeat_password,
            tarifa,
            celular,
            imagen
        });


        return !password &&
            !repeat_password &&
            !tarifa &&
            !celular &&
            !imagen;

    }

    const handleSubmit = async (e) => {

        e.preventDefault();
        console.log("datos ingresados: ",state)

        setResult({
            ...result,
            message: "",
            statusResult: null
        })

        let res = null;

        if(validar()){

            const formData = new FormData();

            if(data.role === "trabajadores"){

                formData.append("id", data.cedula);
                formData.append("password", state.password);
                formData.append("telefono", state.celular);
                formData.append("role", data.role);
                formData.append("image", state.imagen[0]);
                formData.append("tipoServicio", state.tipo_servicio);
                formData.append("detalleServicio", state.detalle_servicio);
                formData.append("tarifaHora", state.tarifa);

                const response = await axios.post("http://localhost:8080/users/edit", formData, {
                    headers:{
                        'authorization': cookie.get("token"),
                        'content-type': 'multipart/form-data'
                    }
                })

                setResult({
                    ...result,
                    message: response.data.message,
                    statusResult: response.data.success
                })

            }else if(data.role === "clientes"){

                formData.append("id", data.cedula);
                formData.append("password", state.password);
                formData.append("telefono", state.celular);
                formData.append("role", data.role);
                formData.append("image", state.imagen[0]);

                const response = await axios.post("http://localhost:8080/users/edit", formData, {
                    headers:{
                        'authorization': cookie.get("token"),
                        'content-type': 'multipart/form-data'
                    }
                })

                setResult({
                    ...result,
                    message: response.data.message,
                    statusResult: response.data.success
                })

            }

            const response = await fetch("http://localhost:8080/login",{
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    email: data.email,
                    password: state.password,
                    table: data.role
                })
            })

            const res = await response.json();

            if(res.success){
                cookie.set("token", res.token, { path: '/' });
                await dispatch(insertData({data: res.data, token: res.token}))
                setTimeout(()=>{
                    router.push("/dashboard/perfil")
                }, [2000])
            }

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
                <h1>Edición de datos personales</h1>
            </div>
            <div className="data">
                <div className="form">
                    <p>Cargar Imagen:</p>
                    <input type="file" name={"imagen"} value={state.image} onChange={handleChange}/>
                    {error.imagen ? <Error Message={error.imagen}/> : null}
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
                { data.role.toLowerCase() === "trabajadores" ?
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
                    <Botones size={"100%"} text={"Listo"} back={"#ff5454"} />
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