import NavbarHome from "../componentes/NavbarHome";
import Login from "../componentes/Login";
import {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {clearData} from "../store/User/action";
import {useRouter} from "next/router";

export default function ogin(){

    const dispatch = useDispatch();
    const data = useSelector(state => { return state.LogIn.data });
    const router = useRouter();

    useEffect(()=>{
        if(data){
            router.push("/dashboard")
        }
    },[])

    return(
        <div style={{position: "relative"}}>
            <NavbarHome />
            <div className={"container"}>
                <div className={"formulario"}>
                    <Login />
                </div>
            </div>

            <style jsx>{`

              .container{
                background: linear-gradient(to bottom, rgba(96, 172, 215, 0.68), rgba(18, 137, 211, 0.66)), url("/construction.jpg") no-repeat center center / cover;
                display: flex;
                flex-direction: row;
                align-items: center;
                justify-content: center;
                height: 100vh;
              }
              
              .formulario{
                width: 50%;
                margin-top: 10vh;
                display: flex;
                justify-content: center;
                align-items: center;
              }

            `}</style>
        </div>
    )
}