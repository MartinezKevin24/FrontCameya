import {useSelector, useDispatch} from "react-redux";
import {useEffect, useState} from "react";
import fetch from "isomorphic-fetch";
import NavbarDashboard from "../../componentes/NavbarDashboard";
import Cookies from "universal-cookie";
import Cards from "../../componentes/Cards";

export default function services(){

    const data = useSelector(state => { return state.LogIn.data});
    const [servicios, setServicios] = useState([]);
    const [tipo, setTipo] = useState("Todos");
    const cookie = new Cookies();

    useEffect(()=>{

        const getData = async () =>{

            const result = await fetch(`http://localhost:8080/services/${data.cedula}/${tipo}`,{
                method: "GET",
                headers: {
                    'Content-Type': 'application/json',
                    'authorization': cookie.get("token"),
                    'role': data.role
                }
            })

            const res = await result.json();
            setServicios(res.data)

        }

        if(data !== null){
            getData();
        }

    },[tipo, data])

    const handleChange = (e) => {
        setTipo(e.target.value);
    }

    return(
        <div>
            <NavbarDashboard color={"#6982f1"} shadow={true}/>
            <div className="container">
                {data ? <div>
                    {data.role === "clientes" ? <div className="categorias">
                        <div className="selector">
                            <select name="tipo" value={tipo} onChange={handleChange}>
                                <option value={null}>Todos</option>
                                <option value="Arte">Arte</option>
                                <option value="Culinario">Culinario</option>
                                <option value="Tutorias">Tutorías</option>
                                <option value="Limpieza">Limpieza</option>
                                <option value="Obrero">Obrero</option>
                                <option value="Transporte">Transporte</option>
                            </select>
                        </div>
                    </div>:null}
                    <div className="container-inside">
                        <div className={servicios ? "services" : "not-found"}>
                            {
                                servicios ?
                                    servicios.map((service, i)=>
                                        <Cards key={i} props={service} eliminate={true}/>
                                    ): <h1>Ups, aún no tienes ningun servicio {data.role === "clientes" ? <span>intenta contratar uno...</span> : <span>vuelve más tarde...</span>}</h1>
                            }
                        </div>
                    </div>
                </div>: null}
            </div>

            <style jsx>{`

              .container {
                display: flex;
                justify-content: center;
                align-items: center;
                width: 100%;
                overflow: hidden;
                padding: 2rem 0;
                flex-direction: column;
              }

              .container-inside {
                width: 90%;
                display: flex;
                justify-content: center;
                align-items: center;
              }
              
              .categorias{
                width: 90%;
                padding: 2rem 0;
                display: flex;
                justify-content: flex-end;
                align-items: center;
                flex-direction: row;
              }
              
              .button{
                width: 10rem;
                margin: 0 1rem;
              }
              
              select {
                width:15rem;
                height: 2rem;
                font-family: Rubik;
                font-size: 14px;
                font-weight: 500;
                outline: none;
                border: 1px solid #505050;
                padding: 0.2rem 0;
                margin-top: 8px;
                border: none;
                border-bottom: 2px solid black;
                background: transparent;
              }
              
              .services{
                display: grid;
                grid-template-columns: 1fr 1fr 1fr 1fr;
                grid-auto-rows: auto;
                grid-gap: 1.5rem;
              }
              
              .not-found{
                display: flex;
                justify-content: center;
                align-items: center;
                margin: 3rem 0;
              }
              
              h1{
                font-family: Rubik;
              }
              
              @media screen and (max-width: 1610px){
                  .services{
                    grid-template-columns: 1fr 1fr 1fr;
                  }
              }
              
              
              @media screen and (max-width: 1299px){
                  .services{
                    grid-template-columns: 1fr 1fr ;
                  }
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