import {useSelector, useDispatch} from "react-redux";
import {useEffect, useState} from "react";
import fetch from "isomorphic-fetch";
import NavbarDashboard from "../../componentes/NavbarDashboard";
import Cookies from "universal-cookie";
import Cards from "../../componentes/Cards";

export default function index(){

    const data = useSelector(state => { return state.LogIn.data});
    const [servicios, setServicios] = useState([]);
    const cookie = new Cookies();

    useEffect(()=>{
        const getData = async () =>{
            const result = await fetch("http://localhost:8080/search",{
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                    'authorization': cookie.get("token")
                },
                body: JSON.stringify({
                    tipoServicio: null
                })
            })

            const res = await result.json();
            setServicios(res.data)
        }

        console.log(servicios)

    },[servicios])

    return(
        <div>
            <NavbarDashboard color={"#6982f1"} shadow={true}/>
            <div className="container">
                <div className="container-inside">
                    {
                        servicios.length > 0 ?
                            servicios.map((service, key)=>{
                                <div id={key}>
                                    <Cards nombre={service.nombres} apellido={service.apellidos} tipo={service.tipoServicio} detalle={service.detalle_servicio} tarifa={service.tarifa}/>
                                </div>
                            }):null
                    }
                </div>
            </div>

            <style jsx>{`

              .container {
                display: flex;
                justify-content: center;
                align-items: center;
                width: 100%;
                overflow: hidden;
                padding: 5rem 0;
              }

              .container-inside {
                width: 100%;
                display: flex;
                margin-top: 10rem;
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