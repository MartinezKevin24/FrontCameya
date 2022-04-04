import Botones from "../Botones/Botones";

export default function FormRegistro({role}){
    return(
        <div className={"formulario"}>
                <div className="title">
                    <h1>Registro de {role}</h1>
                </div>
                <div className="data">
                    <div className="form">
                        <p>Nombres:</p>
                        <input type={"text"}/>
                    </div>
                    <div className="form">
                        <p>Apellidos:</p>
                        <input type="text"/>
                    </div>
                    <div className="form">
                        <p>Tipo de identificación:</p>
                        <select name="" id="">
                            <optgroup label="Tipo de identificación">
                                <option value="">Cédula de ciudadanía</option>
                                <option value="">Tarjeta de identidad</option>
                                <option value="">Cédula de extranjería</option>
                                <option value="">Pasaporte</option>
                            </optgroup>
                        </select>
                    </div>
                    <div className="form">
                        <p>Número de identificación:</p>
                        <input type="text"/>
                    </div>
                    <div className="form">
                        <p>Email:</p>
                        <input type="text"/>
                    </div>
                    <div className="form">
                        <p>Contraseña:</p>
                        <input type="password"/>
                    </div>
                    <div className="form">
                        <p>Confirmar contraseña:</p>
                        <input type="password"/>
                    </div>
                    <div className="form">
                        <p>Número celular:</p>
                        <input type="text"/>
                    </div>
                    { role.toLowerCase() === "contratista" ?

                        <div>
                            <div className="form">
                                <p>Tipo de servicio:</p>
                                <input type="text"/>
                            </div>

                            <div className="form">
                                <p>Promedio tarifa por hora:</p>
                                <input type="text"/>
                            </div>
                        </div>

                        : null}
                    <div className="form-button">
                        <Botones size={"100%"} text={"Regístrar"} back={"#ff5454"}/>
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

            `}</style>
        </div>
    )
}