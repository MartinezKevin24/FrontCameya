import {useState, useEffect} from "react";

export default function Reading({text}){

    let cont = 0;
    const [palabra, SetPalabra] = useState(text[0]);

    useEffect(()=>{
        const interval = setInterval(()=>{
            if(cont != text.length-1){
                SetPalabra(text[++cont])
            }else{
                SetPalabra(text[0])
                cont = 0;
            }
        }, 4000)

        return() => clearInterval(interval);
    },[])

    return(
        <div>

            <div className={"container"}>
                <div className={"container-inside"}>
                    <div className={"inside"}>
                        <p className="text-2xl font-bold">{palabra}</p>
                    </div>
                </div>
            </div>

            <style jsx>{`

              .container {
                background: aliceblue;
                margin: 1.5rem 0;
                padding: 0.7rem 0;
                position: relative;
                display: flex;
                justify-content: center;
                border-radius: 1rem;
              }
              
              .container-inside{
                display: flex;
                justify-content: center;
              }
              
              .inside{
                animation: palabras 2s steps(11) infinite alternate ;
                overflow: hidden;
                border-right: 4px solid black;
                margin: 0 1rem;
              }

              p {
                color: #212121;
                position: relative;
                width: calc(100% + 6px);
              }
              
              @keyframes palabras {
                from{
                  width: 0px;
                }to{
                  width: 100%;
                }
              }

            `}</style>
        </div>
    );
}