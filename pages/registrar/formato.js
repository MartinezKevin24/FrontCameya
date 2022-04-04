import NavbarHome from "../../componentes/NavbarHome";

export default function formulario({role}){

    return(
        <div>
            <NavbarHome/>
            <div className={"container"}>
                <div className="container-inside">
                    <div className="title">
                        <h1>Registro de {role}</h1>
                    </div>
                    <div className="formulario">
                        <div className="form">
                            <p>Nombres</p>
                            <input type={"text"}/>
                        </div>
                        <div className="form">
                            <p>Apellidos</p>
                            <input type="text"/>
                        </div>
                        <div className="form">
                            <p>Tipo de identificación</p>
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
                            <p>Número de identificación</p>
                            <input type="text"/>
                        </div>
                        <div className="form">
                            <p>Email</p>
                            <input type="text"/>
                        </div>
                        <div className="form">
                            <p>Contraseña</p>
                            <input type="password"/>
                        </div>
                        <div className="form">
                            <p>Confirmar contraseña</p>
                            <input type="password"/>
                        </div>
                        <div className="form">
                            <p>Número celular</p>
                            <input type="text"/>
                        </div>
                    </div>
                </div>
            </div>
            <style jsx>{`

              

            `}</style>
        </div>
    )
}