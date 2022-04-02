import {useState, useEffect} from "react";

export default function Reading({text}){

    let cont = 0;
    const [palabra, SetPalabra] = useState(text[0]);

    useEffect(()=>{
        const interval = setInterval(()=>{
            console.log(cont);
            if(cont != text.length-1){
                SetPalabra(text[++cont])
            }else{
                SetPalabra(text[0])
                cont = 0;
            }
        }, 10000)

        return() => clearInterval(interval);
    },[])

    return(
        <div>

            <div className={"container"}>
                <div className={"container-inside"}>
                    <div className={"inside"}>
                        <p>{palabra}</p>
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
                animation: palabras 5s infinite alternate ;
                overflow: hidden;
                border-right: 4px solid black;
              }

              p {
                color: #212121;
                position: relative;
                font-family: Rubik;
                font-weight: 700;
                font-size: 40px;
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