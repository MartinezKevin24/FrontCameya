import Button from "../Botones/Botones";
import Link from "next/link";
import {useEffect, useState} from "react";
import {useDispatch} from "react-redux";
import {insertData} from "../../store/User/action";
import fetch from "isomorphic-fetch";
import Error from "../Alertas/Error"
import {useRouter} from "next/router";
import Cookies from "universal-cookie"

export default function Login(){

    const dispatch = useDispatch();
    const router = useRouter();
    const cookies = new Cookies();

    const [data, setData] = useState({
        email: "",
        password: "",
        role: "clientes"
    });

    const [error, setError] = useState(null);
    const [success, setSuccess] = useState({
        message: null,
        statusResult: null,
        token: null,
        data:null,
        ready: false
    });

    useEffect(()=> {
        if(success.ready){
            router.push("/dashboard")
        }
    },[success.ready])

    const handleChange = (e) => {
        setData({
            ...data,
            [e.target.name]: e.target.value
        })
    }

    const validar = () => {

        let email = null;

        if(!(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g).test(data.email)){
            email = "Formato de email incorrecto";
        }

        setError(email)

        return !email

    }

    const handleSubmit = async(e) => {

        e.preventDefault();

        let res = null;

        setSuccess({
            ...success,
            message: null,
            statusResult: null,
            token: null,
            data: null
        })

        if(validar()){
            const response = await fetch("http://localhost:8080/login",{
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    email: data.email,
                    password: data.password,
                    table: data.role
                })
            })

            res = await response.json();

            setSuccess({
                ...success,
                message: res.message,
                statusResult: res.success,
                token: res.token,
                data: res.data
            })

            if(res.success){
                cookies.set("token", res.token, { path: '/' });
                await dispatch(insertData({data: res.data, token: res.token}))
                console.log(res)
                setTimeout(()=>{
                    setSuccess({...success, ready: true})
                }, [5000])
            }

        }

    }

    return(
        <div>

            {
                success.statusResult !== null ?
                    <div className={"message"}>
                        <div className="message-inside">
                            <Error Message={success.message} color={success.statusResult}/>
                        </div>
                    </div> : null
            }
            <div className={"container"} >
                <div className={"container-inside"}>
                    <div className="title">
                        <span>Log In</span>
                    </div>
                    <div className="input-name">
                        <p>Email</p>
                        <input type="text" name={"email"} value={data.email} onChange={handleChange}/>
                        {error ? <Error Message={error}/> : null}
                    </div>
                    <div className="input-password">
                        <p>Contraseña</p>
                        <input type="password" name={"password"} value={data.password} onChange={handleChange}/>
                    </div>
                    <div className="form">
                        <p>Rol:</p>
                        <select name={"role"} value={data.role} onChange={handleChange}>
                            <optgroup label="Roles">
                                <option value="clientes">Contratante</option>
                                <option value="trabajadores">Contratista</option>
                            </optgroup>
                        </select>
                    </div>
                    <div className="button" onClick={handleSubmit}>
                        <Button text={"Ingresar"} back={"#ff5454"}/>
                    </div>
                    <div>
                        <p>¿No tienes cuenta? <Link href="/registrar"><a><span className={"singin"}>Regístrate</span></a></Link></p>
                    </div>
                </div>
            </div>
            <style jsx>{`

              .container {
                background: blueviolet;
                width: 25rem;
                background: #e8e9ff;
                font-family: Rubik;
                -webkit-box-shadow: 0px 7px 14px -2px rgba(0,0,0,0.64);
                -moz-box-shadow: 0px 7px 14px -2px rgba(0,0,0,0.64);
                box-shadow: 0px 7px 14px -2px rgba(0,0,0,0.64);
              }

              .container-inside {
                width: 100%;
                display: flex;
                justify-content: center;
                align-items: center;
                flex-direction: column;
                padding: 2rem 0;
              }

              .title {
                font-weight: 700;
                font-size: 28px;
              }

              .input-name, .input-password {
                width: 75%;
                margin: 8px 0;
              }

              .input-name > input, .input-password > input {
                width: 100%;
                height: 30px;
                font-family: Rubik;
                font-size: 18px;
                outline: none;
                background: transparent;
                border: none;
                border-bottom: 2px solid black;
              }

              p {
                margin: 10px 0;
              }
              
              a{
                text-decoration: none;
              }

              .button {
                width: 75%;
                margin: 15px 0;
              }

              .singin {
                font-weight: 500;
                cursor: pointer;
              }
              
              .form {
                margin: 8px 0;
                font-family: Rubik;
                font-size: 14px;
                width: 75%;
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
              
              .message{
                position: absolute;
                z-index: 999;
                top: 1rem;
                left: 30%;
                display: flex;
                justify-content: center;
                width: 40%;
                
              }
              
              .message-inside{
                width: 50%;
                position: relative;
                top: -6rem;
                animation: pop-up 5s ease-in-out;
                animation-iteration-count: 1;
              }
              
              @keyframes pop-up {
                0%{
                  top: -6rem;
                }50%{
                  top: 1rem;
                }100%{
                  top: -6rem;
                }
              }

            `}</style>
        </div>
    )
}