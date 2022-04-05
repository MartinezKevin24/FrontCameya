export const OPTION_CLIENT = "OPTION_CLIENT";
export const OPTION_WORKER = "OPTION_WORKER";

export const roleClient = () => {
    return{
        type: OPTION_CLIENT,
        payload: "Contratante"
    }
}

export const roleWorker = () => {
    return{
        type: OPTION_WORKER,
        payload: "Contratista"
    }
}