export default function Error({Message, color}){
    return(
        <div>

            <div className="container" style={color ? {background: "rgba(55,255,0,0.53)", border: "1px solid #19850d"} : {}}>
                <div className="container-inside">
                    <span>{Message}</span>
                </div>
            </div>

            <style jsx>{`

              .container {
                width: 100%;
                background: rgba(255, 0, 0, 0.53);
                border: 1px solid #980d0d;
                display: flex;
                border-radius: 5px;
                margin: .7rem 0;
                padding: .6rem 0;
                justify-content: center;
                align-items: center;
              }

              .container-inside {
                width: 90%;
              }

              span {
                font-family: Rubik;
                font-size: 14px;
              }

            `}</style>
        </div>
    )
}