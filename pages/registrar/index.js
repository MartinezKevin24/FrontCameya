import NavbarHome from "../../componentes/NavbarHome";

export default function index(){
    return(
        <div>
            <NavbarHome color={"#6982f1"} shadow={true}/>
            <div className="container">
                <div className="container-inside">
                    <div className="container-singup">
                        <p className={"title"}>Únete como contratante o contratista</p>
                        <div className="singup">
                            <div className="hiring">
                                <div className="imagen">
                                    <img src={"/hiring.svg"} height={"100%"}/>
                                </div>
                                <p>¿En busca de talentos?</p>
                            </div>
                            <div className="freelancer">
                                <div className="imagen">
                                    <img src={"/resume.svg"} height={"100%"}/>
                                </div>
                                <p>¿En busca de proyectos?</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <style jsx>{`

              .container {
                display: flex;
                justify-content: center;
                align-items: center;
                width: 100%;
                height: 100vh;
                overflow: hidden;
                background: url("/Texture.jpg") repeat;
              }

              .container-inside {
                width: 100%;
                display: flex;
                justify-content: center;
                align-items: center;
                height: 100vh;
                margin-top: 5vh;
              }

              .container-singup {
                width: 60%;
                display: flex;
                justify-content: center;
                align-items: center;
                flex-direction: column;
                padding: 2rem;
                background: #bbcaf3;
                -webkit-box-shadow: 0px 7px 14px -2px rgba(0, 0, 0, 0.64);
                -moz-box-shadow: 0px 7px 14px -2px rgba(0, 0, 0, 0.64);
                box-shadow: 0px 7px 14px -2px rgba(0, 0, 0, 0.64);
              }

              .title {
                font-family: Rubik;
                font-size: 22px;
                font-weight: 600;
                margin-bottom: 2rem;
              }

              .singup {
                width: 100%;
                display: grid;
                grid-template:
                "hiring freelancer" 100%
                /50% 50%;
                margin-bottom: 1.5rem;
              }

              .hiring {
                grid-area: hiring;
              }

              .freelancer {
                grid-area: freelancer;
              }

              .hiring, .freelancer {
                width: 80%;
                justify-self: center;
                font-family: Rubik;
                font-size: 14px;
                display: flex;
                padding: 1.8rem 0;
                justify-content: center;
                align-items: center;
                flex-direction: column;
                font-weight: 500;
                border: 2px dashed black;
                background: #ff625f;
                cursor: pointer;
              }

              .hiring:hover, .freelancer:hover {
                background: #c04545;
                color: aliceblue;
              }

              .imagen {
                width: 80%;
                height: 7rem;
                display: flex;
                justify-content: center;
              }

              p {
                margin-top: 1.5rem;
                font-size: 16px;
              }

            `}</style>
        </div>
    )
}