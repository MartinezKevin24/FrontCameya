import Button from "../Botones/Botones";
import Link from "next/link";

export default function Login(){
    return(
        <div>

            <div className={"container"}>
                <div className={"container-inside"}>
                    <div className="title">
                        <span>Log In</span>
                    </div>
                    <div className="input-name">
                        <p>Email</p>
                        <input type="text"/>
                    </div>
                    <div className="input-password">
                        <p>Contraseña</p>
                        <input type="password"/>
                    </div>
                    <div className="button">
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

            `}</style>
        </div>
    )
}