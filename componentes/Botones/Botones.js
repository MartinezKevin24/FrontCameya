export default function Botones({text, icon, back, size, efect}){
    return(
        <div>

            <div className={"container"} style={{background: `${back}`}}>
                <span className="text" style={{fontSize: `${size}`}}>{icon ? <span style={{position: "relative", top: "2px", marginRight: "6px"}}>{icon}</span> : null}{text}</span>
                <div className="efecto" style={{background: `${efect}`}}/>
            </div>

            <style jsx>{`

              .container {
                background: transparent;
                width: 100%;
                padding: 1rem 0;
                border-radius: .6rem;
                position: relative;
                display: flex;
                justify-content: center;
                align-items: center;
                cursor: pointer;
                overflow: hidden;
              }

              .text {
                position: relative;
                z-index: 1;
                font-family: Rubik;
                font-size: 16px;
                font-weight: 700;
                color: #FAFAFA;
              }

              .efecto {
                position: absolute;
                width: 10px;
                height: 10px;
                border-radius: 5px;
                background: #ff7575;
                z-index: 0;
                visibility: hidden;
              }

              .container:hover > .text {
                color: #363636;
              }

              .container:hover > .efecto {
                width: 150%;
                height: 1300px;
                border-radius: 200%;
                visibility: visible;
                transition: ease .8s;
              }

            `}</style>
        </div>
    );
}