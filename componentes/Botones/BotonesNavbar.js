export default function BotonesNavbar({text, icon}){
    return(
        <div>

            <div className={"container"}>
                <span className="text">{icon ? <span style={{position: "relative", top: "2px", marginRight: "6px"}}>{icon}</span> : null}{text}</span>
                <div className="efecto"/>
            </div>

            <style jsx>{`

              .container {
                background: transparent;
                padding: 1rem 2rem;
                border-radius: .6rem;
                margin: .6rem .2rem;
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
                color: #FAFAFA;
              }

              .efecto {
                position: absolute;
                width: 10px;
                height: 10px;
                border-radius: 5px;
                background: #ff5454;
                z-index: 0;
                visibility: hidden;
              }

              .container:hover > .text {
                color: #3d3a3a;
              }

              .container:hover > .efecto {
                width: 200px;
                height: 200px;
                border-radius: 100%;
                visibility: visible;
                transition: ease .5s;
              }

            `}</style>
        </div>
    );
}