import {FaUserAlt} from "react-icons/fa";
import {BiLogOut} from "react-icons/bi";

export default function routes_sidebar(){

    const routes = [
        {
            path: "/dashboard/perfil",
            icon: FaUserAlt,
            title: "Perfil"
        },
        {
            path: "",
            icon: BiLogOut,
            title: "Log Out"
        }
    ];

    return routes;
}