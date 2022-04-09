export default function Cards({nombre, apellido, tipo, detalle, tarifa}){
    return(
        <div>

            <div className={"container"}>
                <div className="container-inside">
                    <div className="nombre">
                        <p>{nombre} {apellido}</p>
                    </div>
                    <div className="tipo">
                        <p>{tipo}</p>
                    </div>
                    <div className="detalle">
                        <p>{detalle}</p>
                    </div>
                    <div className="tarifa">
                        <p>${tarifa}</p>
                    </div>
                </div>
                <div className="contratar">

                </div>
            </div>
            <style jsx>{`

              

            `}</style>
        </div>
    )
}